export const API_URL = 'http://localhost:3001'

export const endpoints = {
  products: `${API_URL}/products`,
  product: (id: number) => `${API_URL}/products/${id}`,
  comments: `${API_URL}/comments`,
  commentsByProduct: (productId: number) => `${API_URL}/comments?productId=${productId}`,
}