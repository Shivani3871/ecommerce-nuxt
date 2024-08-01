<template>
  <div>
    <div class="mb-4 flex flex-col sm:flex-row gap-4">
      <input v-model="searchQuery" @input="fetchProducts" placeholder="Search products"
        class="border p-2 rounded flex-1" />
      <select v-model="selectedCategory" @change="filterProductByCategory" class="border p-2 rounded flex-1">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <select v-model="selectedSortBy" @change="fetchProducts" class="border p-2 rounded flex-1">
        <option value="">Sort By</option>
        <option value="title">Name</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
    </div>
    <ProductList :products="products" />
    <Pagination v-if="products?.length" :totalPages="totalPages" :currentPage="currentPage" @changePage="changePage" />
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import ProductList from '~/components/ProductList.vue'
import Pagination from '~/components/Pagination.vue'
import { fetchProductsList, fetchCategories, searchProductsList, filterhProductByCat } from '~/services/productService'

const currentPage = ref(1)
const productsPerPage = 30

const searchQuery = ref('');
const selectedCategory = ref('');
const products = ref([])
const total = ref(0)
const categories = ref([]);
const selectedSortBy = ref('');

async function fetchProducts() {
  try {
    let params = {
      limit: productsPerPage,
      skip: (currentPage.value - 1) * productsPerPage
    };

    selectedCategory.value = ''

    if (searchQuery.value) {
      params = { ...params, q: searchQuery.value }
    }

    if (selectedSortBy.value) {
      params = { ...params, sortBy: selectedSortBy.value, order: 'asc' }
    }

    const { data } = searchQuery.value != '' ? await searchProductsList(params) : await fetchProductsList(params)
    products.value = data.products
    total.value = data.total
  } catch (error) {
    console.error('Failed to fetch product details:', error)
  }
}

async function filterProductByCategory() {
  try {

    if (selectedCategory.value != '') {
      searchQuery.value = ''
      selectedSortBy.value = ''
      let params = {
        limit: productsPerPage,
        skip: 0,
        category: selectedCategory.value
      };

      const { data } = await filterhProductByCat(params)

      products.value = data.products
      total.value = data.total
    }
    else {
      fetchProducts()
    }

  } catch (error) {
    console.error('Failed to fetch product details:', error)
  }
}

const fetchCategoriesAndBrands = async () => {
  try {
    const categoriesResponse = await fetchCategories();
    categories.value = categoriesResponse;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

watchEffect(() => {
  fetchProducts()
})

onMounted(() => {
  fetchCategoriesAndBrands();
  fetchProducts();
});

const totalPages = computed(() => Math.ceil(total.value / productsPerPage))

function changePage(page) {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page
  }
}

</script>
