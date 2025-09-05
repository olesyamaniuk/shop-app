// export const API_URL = 'http://localhost:3001';

// export const endpoints = {
//   products: `${API_URL}/products`,
//   product: (id: number) => `${API_URL}/products/${id}`,
//   comments: `${API_URL}/comments`,
//   commentsByProduct: (productId: number) => `${API_URL}/comments?productId=${productId}`,
// };

import { Product } from './types'

const STORAGE_KEY = 'products'

export const fetchProducts = async (): Promise<Product[]> => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const addProduct = async (product: Product) => {
  const products = await fetchProducts()
  const newProducts = [...products, product]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts))
  return product
}

export const updateProduct = async (updated: Product) => {
  const products = await fetchProducts()
  const newProducts = products.map(p => p.id === updated.id ? updated : p)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts))
  return updated
}

export const deleteProduct = async (id: number) => {
  const products = await fetchProducts()
  const newProducts = products.filter(p => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts))
  return id
}
