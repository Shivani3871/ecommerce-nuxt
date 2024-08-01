<template>
    <div v-if="visible" :class="notificationClass" class="fixed top-0 right-0 m-4 p-4 rounded shadow-md z-50 transition-opacity duration-500 ease-in-out">
      <div class="flex justify-between items-center">
        <span>{{ message }}</span>
        <button @click="closeNotification" class="text-lg font-bold ml-4">&times;</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue'
  
  const props = defineProps({
    message: String,
    type: {
      type: String,
      default: 'success', // success, error, info
    },
    duration: {
      type: Number,
      default: 3000, // in milliseconds
    },
  })
  
  const visible = ref(true)
  let timeoutId = null
  
  const closeNotification = () => {
    visible.value = false
    clearTimeout(timeoutId)
  }
  
  // Automatically close the notification after a certain duration
  onMounted(() => {
    timeoutId = setTimeout(closeNotification, props.duration)
  })
  
  onUnmounted(() => {
    clearTimeout(timeoutId)
  })
  
  // Reset the timeout when the message changes
  watch(() => props.message, () => {
    clearTimeout(timeoutId)
    visible.value = true
    timeoutId = setTimeout(closeNotification, props.duration)
  })
  
  const notificationClass = computed(() => {
    switch (props.type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'info':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  })
  </script>