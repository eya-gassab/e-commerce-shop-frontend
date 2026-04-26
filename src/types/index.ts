// src/types/index.ts

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'SELLER' | 'CUSTOMER';
  active: boolean;
  createdAt: string;
}

export interface SellerProfile {
  id: number;
  shopName: string;
  description: string;
  logo?: string;
  rating: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  parent?: Category;
  subCategories?: Category[];
}

export interface ProductVariant {
  id: number;
  attribute: string; // e.g., "Taille"
  value: string;     // e.g., "M"
  extraStock: number;
  priceDelta: number;
}

export interface Review {
  id: number;
  customer: User;
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  stock: number;
  active: boolean;
  createdAt: string;
  seller: SellerProfile;
  categories: Category[];
  images: string[];
  variants: ProductVariant[];
  reviews: Review[];
  averageRating: number;
}

export interface Address {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
}

export interface CartItem {
  id: number;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  coupon?: Coupon;
}

export interface Coupon {
  id: number;
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: number;
  expirationDate: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  address: Address;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export interface DashboardAdmin {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  topProducts: Product[];
  topSellers: SellerProfile[];
  recentOrders: Order[];
}

export interface DashboardSeller {
  revenue: number;
  pendingOrders: number;
  lowStockProducts: Product[];
  recentOrders: Order[];
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'CUSTOMER' | 'SELLER';
  shopName?: string;
  shopDescription?: string;
}