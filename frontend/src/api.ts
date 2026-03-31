import axios from "axios";
import type { Product, CartItem } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/api/products");
  return data;
}

export async function fetchProduct(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/api/products/${id}`);
  return data;
}

export async function fetchCart(): Promise<CartItem[]> {
  const { data } = await api.get<CartItem[]>("/api/cart");
  return data;
}

export async function addToCart(
  productId: number,
  quantity: number
): Promise<void> {
  await api.post("/api/cart", { product_id: productId, quantity });
}

export async function removeFromCart(id: number): Promise<void> {
  await api.delete(`/api/cart/${id}`);
}

export async function clearCart(): Promise<void> {
  await api.delete("/api/cart");
}
