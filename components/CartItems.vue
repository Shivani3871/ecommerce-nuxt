<template>
  <div class="space-y-4">
    <div v-for="item in items" :key="item.id"
      class="border p-4 rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:space-x-4">
      <!-- Product Image -->
      <div class="w-full md:w-1/4 mb-4 md:mb-0">
        <img :src="item.thumbnail || 'default-thumbnail.png'" alt="Product Image"
          class="w-full h-24 object-cover rounded-lg" />
      </div>
      <!-- Product Details -->
      <div class="w-full md:w-3/4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 md:items-center">
          <h2 class="text-xl font-semibold">{{ item.title }}</h2>
          <p class="text-gray-700">Price: ${{ item.price.toFixed(2) }}</p>
          <p class="text-gray-600 mt-2">Total: ${{ (item.price * item.cart_quantity).toFixed(2) }}</p>
          <p class="text-gray-700">In Stock: {{ item.stock }}</p>
        </div>
        <div class="flex items-center space-x-4 mt-2 md:mt-0">
          <p class="text-gray-700">Qty:</p>
          <input type="number" min="1" :max="item.stock" v-model.number="item.cart_quantity"
            @input="updateQuantity(item)" class="border rounded px-2 py-1 w-20" />
          <button @click="removeFromCartHandler(item.id)"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Remove
          </button>
        </div>

      </div>
    </div>
    <Notification v-if="showNotification" :message="notificationMessage" :type="notificationType" />

  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue'
import { removeFromCart, updateCartQuantity } from '~/services/cartService'
import Notification from '~/components/Notification.vue'

const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success')

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits()

const showNotificationWithReset = (message, type) => {
  showNotification.value = false
  notificationMessage.value = message
  notificationType.value = type
  setTimeout(() => {
    showNotification.value = true
  }, 10)
}


const updateQuantity = (item) => {
  if (item.cart_quantity < item.minimumOrderQuantity) {
    item.cart_quantity = item.minimumOrderQuantity
    showNotificationWithReset(`Minimum ${item.minimumOrderQuantity} units of " ${item.title} " required for purchase.`, 'info')
  }
  else if (item.cart_quantity > item.stock) {
    item.cart_quantity = item.stock
    showNotificationWithReset(`Max quantity of product for " ${item.title} " is ${item.info}.`, 'info')
  }
  else {
    showNotificationWithReset(`Product quantity has been updated for " ${item.title} " .`, 'success')
  }
}

const removeFromCartHandler = (id) => {
  removeFromCart(id)
  showNotificationWithReset(`Product has been successfully removed from cart.`, 'success')
  emit('cart-updated')
}
</script>