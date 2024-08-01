<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="product in products" :key="product.id"
      class="border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img :src="product.thumbnail" alt="Product Image" class="w-full h-48 object-cover">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-2">{{ product.title }}</h2>
        <p class="text-gray-700 mb-2">{{ product.description }}</p>
        <p class="text-lg font-bold mb-2">${{ product.price.toFixed(2) }}</p>
        <div class="flex items-center mb-2">
          <span class="inline-block bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
            Rating: {{ product.rating }}
          </span>
          <span class="inline-block bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            Stock: {{ product.stock }}
          </span>
        </div>
        <p class="text-gray-600 mb-4">
          <span class="font-semibold">Category:</span> {{ product.category }}
        </p>
        <div class="flex justify-between items-center">
          <NuxtLink :to="`/product/${product.id}`" class="text-blue-500 hover:underline">
            View Product
          </NuxtLink>
          <button v-if="product?.minimumOrderQuantity <= product?.stock" @click="addToCartP(product)"
            class="bg-primary text-black px-4 py-2 rounded hover:bg-primary-dark">
            Add to Cart
          </button>
        </div>
        <small v-if="product?.minimumOrderQuantity <= product?.stock" class="text-end">(Minimun quantity for purchase
          order is : {{ product?.minimumOrderQuantity }} )</small>
        <small v-else>(Product is out of stock for now)</small>
      </div>
    </div>
    <Notification v-if="showNotification" :message="notificationMessage" :type="notificationType" />
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from 'vue'
import { addToCart } from '~/services/cartService'
import Notification from '~/components/Notification.vue'

const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success')

const props = defineProps({
  products: Array
})

const showNotificationWithReset = (message, type) => {
  showNotification.value = false
  notificationMessage.value = message
  notificationType.value = type
  setTimeout(() => {
    showNotification.value = true
  }, 10)
}


const addToCartP = (product) => {
  addToCart(product)

  showNotificationWithReset(`Product "${product.title}" has been successfully added to cart.`, 'success')

}
</script>