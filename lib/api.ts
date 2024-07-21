import type { Product } from "./types"

const API_URL = "https://fakestoreapi.com"

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getProduct(productId: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${productId}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}