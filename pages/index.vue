<template>
  <h1>Home Page</h1>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

router.push('/product')
</script>