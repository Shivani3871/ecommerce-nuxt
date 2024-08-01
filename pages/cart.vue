<template>
  <div class="p-4 mx-auto">
    <h1 class="text-2xl mb-4">Your Cart</h1>
    <CartItems :items="cartItems" @cart-updated="fetchCartItems" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CartItems from '~/components/CartItems.vue'
import { getCart } from '~/services/cartService'

const cartItems = ref([])

const fetchCartItems = () => {
  cartItems.value = getCart()
}

onMounted(() => {
  fetchCartItems()
})
</script>