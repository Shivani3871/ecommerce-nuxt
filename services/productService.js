import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function fetchProductsList(params) {
  const response = await apiClient.get(`/products`,{
      params: params
    })
  return response || null
}

export async function searchProductsList(params) {
  const response = await apiClient.get(`/products/search`,{
      params: params
    })
  return response || null
}

export async function filterhProductByCat(params) {
  const response = await apiClient.get(`/products/category/${params?.category}`,{
      params: params
    })
  return response || null
}

export async function fetchProductDetails(productId) {
  try {
    const response = await apiClient.get(`/products/${productId}`)
    return response?.data || null
  } catch (error) {
    console.error('Failed to fetch product details:', error)
    throw error
  }
}

export async function fetchCategories() {
  try {
    const response = await apiClient.get('/products/category-list');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
}

export async function fetchProductsByCategory(category) {
  try {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    throw error;
  }
}