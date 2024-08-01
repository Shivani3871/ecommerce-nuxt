<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="w-full md:w-1/2">
        <div class="relative">
          <img :src="currentImage" alt="Product Image" class="w-full h-auto rounded-lg shadow-lg" />
          <div class="flex space-x-2 overflow-x-auto mt-4">
            <img v-for="(image, index) in uniqueImages" :key="index" :src="image" alt="Product Thumbnail"
              class="w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer" @click="currentImage = image" />
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 md:pl-4">
        <h1 class="text-3xl font-bold mb-2">{{ product.title || 'Product Title' }}</h1>
        <p class="text-gray-700 mb-4">{{ product.description || 'Product description not available.' }}</p>
        <p class="text-lg font-semibold mb-4">Price: ${{ product.price ? product.price.toFixed(2) : 'N/A' }}</p>
        <p class="text-sm text-gray-600 mb-2">Brand: {{ product.brand || 'Unknown' }}</p>
        <p class="text-sm text-gray-600 mb-2">Category: {{ product.category || 'Uncategorized' }}</p>
        <p class="text-sm text-gray-600 mb-2">SKU: {{ product.sku || 'N/A' }}</p>
        <p class="text-sm text-gray-600 mb-2">Stock: {{ product.stock || 'Out of stock' }}</p>
        <p class="text-sm text-gray-600 mb-4">Dimensions: {{ product.dimensions ? `${product.dimensions.width} x
          ${product.dimensions.height} x ${product.dimensions.depth} cm` : 'N/A' }}</p>
        <p class="text-sm text-gray-600 mb-4">Warranty: {{ product.warrantyInformation || 'N/A' }}</p>
        <p class="text-sm text-gray-600 mb-4">Shipping Information: {{ product.shippingInformation || 'N/A' }}</p>
        <p class="text-sm text-gray-600 mb-4">Availability Status: {{ product.availabilityStatus || 'N/A' }}</p>
        <button v-if="product?.minimumOrderQuantity <= product?.stock" @click="addToCartP(product)"
          class="bg-primary text-black px-4 py-2 rounded mt-4 hover:bg-primary-dark transition">
          Add to Cart
        </button>
        <br>
        <small v-if="product?.minimumOrderQuantity <= product?.stock">(Minimun quantity for purchase order is : {{
            product?.minimumOrderQuantity }} )</small>
        <small v-else>(Product is out of stock for now)</small>

        <div v-if="product.reviews.length > 0" class="mt-6">
          <h2 class="text-xl font-semibold mb-2">Reviews</h2>
          <div v-for="review in product.reviews" :key="review.date" class="border-t pt-2 mb-2">
            <p class="font-semibold">{{ review.reviewerName }}</p>
            <p class="text-sm text-gray-600">{{ new Date(review.date).toLocaleDateString() }}</p>
            <p class="text-sm">{{ review.comment }}</p>
            <p class="text-sm font-semibold">Rating: {{ review.rating }} / 5</p>
          </div>
        </div>
      </div>
    </div>
    <Notification v-if="showNotification" :message="notificationMessage" :type="notificationType" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchProductDetails } from '~/services/productService'
import { addToCart } from '~/services/cartService'
import Notification from '~/components/Notification.vue'

const route = useRoute()
const productId = parseInt(route.params.id, 10)
const product = ref({
  price: 0,
  title: '',
  description: '',
  images: [],
  thumbnail: '',
  brand: '',
  category: '',
  sku: '',
  stock: 0,
  dimensions: { width: 0, height: 0, depth: 0 },
  warrantyInformation: '',
  shippingInformation: '',
  availabilityStatus: '',
  reviews: []
})
const currentImage = ref('')

const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success')

const uniqueImages = computed(() => {
  const allImages = [...product.value.images, product.value.thumbnail]
  return Array.from(new Set(allImages))
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

onMounted(async () => {
  try {
    const data = await fetchProductDetails(productId)
    product.value = data
    currentImage.value = data?.images[0] || data?.thumbnail
  } catch (error) {
    console.error('Error fetching product:', error)
  }
})
</script>

<style scoped>
img {
  object-fit: cover;
}

img.cursor-pointer:hover {
  opacity: 0.8;
  transition: opacity 0.3s;
}
</style>
