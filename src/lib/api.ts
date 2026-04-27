// src/lib/api.ts — all backend endpoints, aligned with Spring Boot DTOs
import { apiClient } from "./api-client";
import type * as T from "@/types";

export const auth = {
  login: (email: string, motDePasse: string) =>
    apiClient.post<T.AuthResponse>("/auth/login", { email, motDePasse }),
  register: (data: { email: string; motDePasse: string; prenom: string; nom: string; role: T.Role; nomBoutique?: string }) =>
    apiClient.post<T.AuthResponse>("/auth/register", data),
  refresh: (refreshToken: string) =>
    apiClient.post<T.AuthResponse>("/auth/refresh", { refreshToken }),
  getMe: () => apiClient.get<T.User>("/auth/me"),
  logout: () => apiClient.post("/auth/logout"),
  updateProfile: (data: { prenom: string; nom: string }) =>
    apiClient.put<T.User>("/auth/profile", data),
};

export const products = {
  getAll: (params?: { page?: number; size?: number; categorieId?: number; minPrix?: number; maxPrix?: number; q?: string; promo?: boolean }) =>
    apiClient.get<T.PagedResponse<T.Product>>("/products", { params }),
  getOne: (id: number) => apiClient.get<T.Product>(`/products/${id}`),
  create: (data: object) => apiClient.post<T.Product>("/products", data),
  update: (id: number, data: object) => apiClient.put<T.Product>(`/products/${id}`, data),
  delete: (id: number) => apiClient.delete(`/products/${id}`),
  topSelling: () => apiClient.get<T.Product[]>("/products/top-selling"),
  search: (q: string) => apiClient.get<T.PagedResponse<T.Product>>(`/products/search?q=${q}`),
};

export const categories = {
  getAll: () => apiClient.get<T.Category[]>("/categories"),
};

export const cartApi = {
  get: () => apiClient.get<T.Cart>("/cart"),
  addItem: (productId: number, quantity = 1, variantId?: number) =>
    apiClient.post("/cart/items", { productId, variantId, quantity }),
  updateItem: (itemId: number, quantity: number) =>
    apiClient.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId: number) => apiClient.delete(`/cart/items/${itemId}`),
  applyCoupon: (code: string) => apiClient.post<T.Cart>("/cart/coupon", { code }),
  removeCoupon: () => apiClient.delete("/cart/coupon"),
};

export const orders = {
  createFromCart: (adresseId: number) =>
    apiClient.post<T.Order>("/orders", { adresseId }),
  getMyOrders: () => apiClient.get<T.Order[]>("/orders/my"),
  getOne: (id: number) => apiClient.get<T.Order>(`/orders/${id}`),
  updateStatus: (id: number, statut: string) =>
    apiClient.put(`/orders/${id}/status`, { statut }),
  cancel: (id: number) => apiClient.put(`/orders/${id}/cancel`),
  getAllAdmin: () => apiClient.get<T.Order[]>("/orders"),
};

export const addresses = {
  getAll: () => apiClient.get<T.Address[]>("/addresses"),
  create: (data: { rue: string; ville: string; codePostal: string; pays: string }) =>
    apiClient.post<T.Address>("/addresses", data),
  update: (id: number, data: Partial<T.Address>) =>
    apiClient.put<T.Address>(`/addresses/${id}`, data),
  delete: (id: number) => apiClient.delete(`/addresses/${id}`),
  setPrincipal: (id: number) => apiClient.put(`/addresses/${id}/principal`),
};

export const reviewsApi = {
  create: (productId: number, note: number, commentaire: string) =>
    apiClient.post("/reviews", { productId, note, commentaire }),
  getForProduct: (productId: number) =>
    apiClient.get<T.Review[]>(`/reviews/product/${productId}`),
  approve: (id: number) => apiClient.put(`/reviews/${id}/approve`),
};

export const dashboard = {
  admin: () => apiClient.get<T.DashboardAdmin>("/dashboard/admin"),
  seller: () => apiClient.get<T.DashboardSeller>("/dashboard/seller"),
};

export const coupons = {
  validate: (code: string) => apiClient.get<T.Coupon>(`/coupons/validate/${code}`),
  getAll: () => apiClient.get<T.Coupon[]>("/coupons"),
};
