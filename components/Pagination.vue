<template>
  <div class="flex items-center justify-center space-x-2 mt-4">
    <button @click="prevPage" :disabled="currentPage === 1"
      class="bg-primary text-black px-3 py-1 rounded disabled:bg-gray-400">
      Previous
    </button>

    <div v-for="page in totalPages" :key="page" class="flex items-center">
      <button @click="changePage(page)"
        :class="[currentPage !== page ? 'bg-primary' : '', currentPage == page ? ' border-gray-300 ' : '']"
        class="border px-3 py-1 rounded">
        {{ page }}
      </button>
    </div>

    <button @click="nextPage" :disabled="currentPage === totalPages"
      class="bg-primary text-black px-3 py-1 rounded disabled:bg-gray-400">
      Next
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['changePage'])

function changePage(page) {
  if (page !== props.currentPage) {
    emit('changePage', page)
  }
}

function prevPage() {
  if (props.currentPage > 1) {
    emit('changePage', props.currentPage - 1)
  }
}

function nextPage() {
  if (props.currentPage < props.totalPages) {
    emit('changePage', props.currentPage + 1)
  }
}
</script>