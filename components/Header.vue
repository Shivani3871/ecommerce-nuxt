<template>
  <header class="bg-white shadow-md">
    <nav class="container mx-auto px-4 py-2 flex justify-between items-center">
      <div class="text-xl font-bold">
        <nuxt-link to="/" class="hover:text-gray-700">E-Commerce Products</nuxt-link>
      </div>
      <div class="hidden md:flex space-x-4">
        <nuxt-link to="/" class="text-gray-600 hover:text-gray-900">Home</nuxt-link>
        <nuxt-link to="/product" class="text-gray-600 hover:text-gray-900">Product</nuxt-link>
        <nuxt-link to="/cart" class="text-gray-600 hover:text-gray-900">Cart</nuxt-link>
      </div>
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-gray-600 hover:text-gray-900 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>
    <div v-if="isMenuOpen" class="md:hidden bg-gray-100 py-2">
      <div class="container mx-auto px-4">
        <nuxt-link to="/" class="block py-1 text-gray-600 hover:text-gray-900">Home</nuxt-link>
        <nuxt-link to="/product" class="block py-1 text-gray-600 hover:text-gray-900">Product</nuxt-link>
        <nuxt-link to="/cart" class="block py-1 text-gray-600 hover:text-gray-900">Cart</nuxt-link>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>