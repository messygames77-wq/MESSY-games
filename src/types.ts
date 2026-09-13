export type Page =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'confirmation'
  | 'profile'
  | 'order-detail'
  | 'wishlist'
  | 'about'
  | 'contact'
  | 'faq'
  | 'search'
  | 'admin';

export type ProductCategory = 'All' | 'Party' | 'Mystery' | 'Competitive' | 'Group' | 'Quick';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice: number;
  category: 'Party' | 'Mystery' | 'Competitive' | 'Group' | 'Quick';
  players: string;
  time: string;
  age: string;
  shortDescription: string;
  fullDescription: string;
  howToPlay: string[];
  whatsInside: string[];
  details: {
    language: string;
    cardCount: number;
    difficulty: string;
    reusability: string;
  };
  availability: string;
  badge?: string;
  accentColor: string; // e.g. '#FACC15', '#A855F7', '#3B82F6'
  gradient: string; // e.g. 'from-amber-400 to-yellow-600'
  cardVisualSvg: string; // identifier or visual layout
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'ORDER RECEIVED' | 'PREPARING' | 'SHIPPED' | 'DELIVERED';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  area: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  accentColor: string;
  category: string;
}

export interface Order {
  id: string; // e.g. "MG-4891"
  date: string; // ISO date string
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  customer: OrderCustomer;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  isLoggedIn: boolean;
}
