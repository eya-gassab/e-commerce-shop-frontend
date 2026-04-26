// src/lib/api.ts
import { apiClient } from './api-client';
import * as T from '@/types'; // Make sure you have types defined

// ========== AUTH ==========
export const auth = {
  login: (email: string, password: string) =>
    apiClient.post<T.LoginResponse>('/auth/login', { email, password }),
  register: (data: T.RegisterRequest) =>
    apiClient.post('/auth/register', data),
  refresh: (refreshToken: string) =>
    apiClient.post<{ access_token: string; refresh_token: string }>('/auth/refresh', { refreshToken }),
  getMe: () =>
    apiClient.get<T.User>('/auth/me'),
  logout: () =>
    apiClient.post('/auth/logout'),
};

// ========== PRODUCTS ==========
export const products = {
  getAll: (params?: { page?: number; size?: number; category?: number; minPrice?: number; maxPrice?: number; search?: string; promo?: boolean; seller?: number }) =>
    apiClient.get<{ content: T.Product[]; totalPages: number; totalElements: number }>('/products', { params }),
  getOne: (id: number) =>
    apiClient.get<T.Product>(`/products/${id}`),
  create: (data: FormData) =>
    apiClient.post<T.Product>('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: number, data: FormData) =>
    apiClient.put<T.Product>(`/products/${id}`, data),
  delete: (id: number) =>
    apiClient.delete(`/products/${id}`),
  topSelling: () =>
    apiClient.get<T.Product[]>('/products/top-selling'),
};

// ========== CATEGORIES ==========
export const categories = {
  getAll: () =>
    apiClient.get<T.Category[]>('/categories'),
  create: (data: { name: string; description?: string; parentId?: number }) =>
    apiClient.post<T.Category>('/categories', data),
  update: (id: number, data: any) =>
    apiClient.put<T.Category>(`/categories/${id}`, data),
  delete: (id: number) =>
    apiClient.delete(`/categories/${id}`),
};

// ========== CART ==========
export const cartApi = {
  get: () =>
    apiClient.get<T.Cart>('/cart'),
  addItem: (productId: number, variantId?: number, quantity = 1) =>
    apiClient.post('/cart/items', { productId, variantId, quantity }),
  updateItem: (itemId: number, quantity: number) =>
    apiClient.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId: number) =>
    apiClient.delete(`/cart/items/${itemId}`),
  applyCoupon: (code: string) =>
    apiClient.post<T.Cart>('/cart/coupon', { code }),
  removeCoupon: () =>
    apiClient.delete('/cart/coupon'),
};

// ========== ORDERS ==========
export const orders = {
  createFromCart: (addressId: number) =>
    apiClient.post<T.Order>('/orders', { addressId }),
  getMyOrders: () =>
    apiClient.get<T.Order[]>('/orders/my'),
  getOne: (id: number) =>
    apiClient.get<T.Order>(`/orders/${id}`),
  updateStatus: (id: number, status: string) =>
    apiClient.put(`/orders/${id}/status`, { status }),
  cancel: (id: number) =>
    apiClient.put(`/orders/${id}/cancel`),
  getAllAdmin: () =>
    apiClient.get<T.Order[]>('/orders'),
};

// ========== ADDRESSES ==========
export const addresses = {
  getAll: () =>
    apiClient.get<T.Address[]>('/addresses'),
  create: (data: Omit<T.Address, 'id'>) =>
    apiClient.post<T.Address>('/addresses', data),
  update: (id: number, data: Partial<T.Address>) =>
    apiClient.put<T.Address>(`/addresses/${id}`, data),
  delete: (id: number) =>
    apiClient.delete(`/addresses/${id}`),
  setPrimary: (id: number) =>
    apiClient.put(`/addresses/${id}/primary`),
};

// ========== REVIEWS ==========
export const reviews = {
  create: (productId: number, rating: number, comment: string) =>
    apiClient.post('/reviews', { productId, rating, comment }),
  getForProduct: (productId: number) =>
    apiClient.get<T.Review[]>(`/reviews/product/${productId}`),
  approve: (id: number) =>
    apiClient.put(`/reviews/${id}/approve`),
};

// ========== DASHBOARD ==========
export const dashboard = {
  admin: () =>
    apiClient.get<T.DashboardAdmin>('/dashboard/admin'),
  seller: () =>
    apiClient.get<T.DashboardSeller>('/dashboard/seller'),
};

// ========== COUPONS ==========
export const coupons = {
  getAll: () =>
    apiClient.get<T.Coupon[]>('/coupons'),
  create: (data: any) =>
    apiClient.post<T.Coupon>('/coupons', data),
  update: (id: number, data: any) =>
    apiClient.put<T.Coupon>(`/coupons/${id}`, data),
  delete: (id: number) =>
    apiClient.delete(`/coupons/${id}`),
  validate: (code: string) =>
    apiClient.get<T.Coupon>(`/coupons/validate/${code}`),
};