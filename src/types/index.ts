<<<<<<< HEAD
// src/types/index.ts — aligned with Spring Boot backend field names

export type Role = "ADMIN" | "SELLER" | "CUSTOMER";
export type OrderStatus = "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
=======
// src/types/index.ts
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6

export interface User {
  id: number;
  email: string;
<<<<<<< HEAD
  prenom: string;
  nom: string;
  role: Role;
  actif: boolean;
  dateCreation?: string;
=======
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'SELLER' | 'CUSTOMER';
  active: boolean;
  createdAt: string;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
}

export interface SellerProfile {
  id: number;
<<<<<<< HEAD
  nomBoutique: string;
  description: string;
  logo?: string;
  note: number;
=======
  shopName: string;
  description: string;
  logo?: string;
  rating: number;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
}

export interface Category {
  id: number;
<<<<<<< HEAD
  nom: string;
=======
  name: string;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
  description?: string;
  parent?: Category;
  subCategories?: Category[];
}

export interface ProductVariant {
  id: number;
<<<<<<< HEAD
  attribut: string;
  valeur: string;
  stockSupplementaire: number;
  prixDelta: number;
=======
  attribute: string; // e.g., "Taille"
  value: string;     // e.g., "M"
  extraStock: number;
  priceDelta: number;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
}

export interface Review {
  id: number;
  customer: User;
<<<<<<< HEAD
  note: number;
  commentaire: string;
  dateCreation: string;
  approuve: boolean;
=======
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
}

export interface Product {
  id: number;
<<<<<<< HEAD
  nom: string;
  description: string;
  prix: number;
  prixPromo?: number;
  stock: number;
  actif: boolean;
  dateCreation: string;
=======
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  stock: number;
  active: boolean;
  createdAt: string;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
  seller: SellerProfile;
  categories: Category[];
  images: string[];
  variants: ProductVariant[];
  reviews: Review[];
  averageRating: number;
}

export interface Address {
  id: number;
<<<<<<< HEAD
  rue: string;
  ville: string;
  codePostal: string;
  pays: string;
  principal: boolean;
=======
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
}

export interface CartItem {
  id: number;
  product: Product;
  variant?: ProductVariant;
<<<<<<< HEAD
  quantite: number;
=======
  quantity: number;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
}

export interface Cart {
  id: number;
<<<<<<< HEAD
  lignes: CartItem[];
  sousTotal: number;
  fraisLivraison: number;
  totalTTC: number;
=======
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
  coupon?: Coupon;
}

export interface Coupon {
  id: number;
  code: string;
<<<<<<< HEAD
  type: "PERCENT" | "FIXED";
  valeur: number;
  dateExpiration: string;
=======
  type: 'PERCENT' | 'FIXED';
  value: number;
  expirationDate: string;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
}

export interface OrderItem {
  id: number;
  product: Product;
  variant?: ProductVariant;
<<<<<<< HEAD
  quantite: number;
  prixUnitaire: number;
=======
  quantity: number;
  unitPrice: number;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
}

export interface Order {
  id: number;
<<<<<<< HEAD
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
=======
  orderNumber: string;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  address: Address;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
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

<<<<<<< HEAD
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  email: string;
  prenom: string;
  nom: string;
  role: Role;
}
=======
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
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
