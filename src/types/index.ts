// src/types/index.ts — aligned with Spring Boot backend field names

export type Role = "ADMIN" | "SELLER" | "CUSTOMER";
export type OrderStatus = "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";

export interface User {
  id: number;
  email: string;
  prenom: string;
  nom: string;
  role: Role;
  actif: boolean;
  dateCreation?: string;
}

export interface SellerProfile {
  id: number;
  nomBoutique: string;
  description: string;
  logo?: string;
  note: number;
}

export interface Category {
  id: number;
  nom: string;
  description?: string;
  parent?: Category;
  subCategories?: Category[];
}

export interface ProductVariant {
  id: number;
  attribut: string;
  valeur: string;
  stockSupplementaire: number;
  prixDelta: number;
}

export interface Review {
  id: number;
  customer: User;
  note: number;
  commentaire: string;
  dateCreation: string;
  approuve: boolean;
}

export interface Product {
  id: number;
  nom: string;
  description: string;
  prix: number;
  prixPromo?: number;
  stock: number;
  actif: boolean;
  dateCreation: string;
  seller: SellerProfile;
  categories: Category[];
  images: string[];
  variants: ProductVariant[];
  reviews: Review[];
  averageRating: number;
}

export interface Address {
  id: number;
  rue: string;
  ville: string;
  codePostal: string;
  pays: string;
  principal: boolean;
}

export interface CartItem {
  id: number;
  product: Product;
  variant?: ProductVariant;
  quantite: number;
}

export interface Cart {
  id: number;
  lignes: CartItem[];
  sousTotal: number;
  fraisLivraison: number;
  totalTTC: number;
  coupon?: Coupon;
}

export interface Coupon {
  id: number;
  code: string;
  type: "PERCENT" | "FIXED";
  valeur: number;
  dateExpiration: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  variant?: ProductVariant;
  quantite: number;
  prixUnitaire: number;
}

export interface Order {
  id: number;
  numeroCommande: string;
  statut: OrderStatus;
  adresseLivraison: Address;
  sousTotal: number;
  fraisLivraison: number;
  totalTTC: number;
  dateCommande: string;
  lignes: OrderItem[];
  customer?: User;
}

export interface PagedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
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

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  email: string;
  prenom: string;
  nom: string;
  role: Role;
}
