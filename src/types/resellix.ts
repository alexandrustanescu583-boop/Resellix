export type BrandName = 
  | 'Nike' 
  | 'Jordan'
  | 'Adidas' 
  | 'Yeezy'
  | 'New Balance' 
  | 'Puma' 
  | 'Asics' 
  | 'Polo Ralph Lauren' 
  | 'Fear of God';

export type ProductCategory = 'Sneakers' | 'Îmbrăcăminte' | 'Accesorii';

export type ProductStatus = 'disponibil' | 'epuizat' | 'ascuns';

export type ProductTag = 'Nou' | 'Popular' | 'Reducere';

export interface SizeStock {
  size: string; // e.g., 'EU 40', 'EU 41', 'EU 42', 'M', 'L'
  stock: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: BrandName;
  model: string;
  category: ProductCategory;
  priceRon: number;
  originalPriceRon?: number;
  sizes: SizeStock[];
  images: string[];
  description: string;
  status: ProductStatus;
  tag?: ProductTag;
  rating: number;
  reviewCount: number;
  condition: string;
  materials: string[];
  isDemonstrative?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface CustomerShipping {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode?: string;
  notes?: string;
}

export type OrderStatus = 
  | 'în așteptare' 
  | 'plătită' 
  | 'în procesare' 
  | 'expediată' 
  | 'livrată' 
  | 'anulată' 
  | 'rambursată';

export type PaymentStatus = 'paid' | 'pending_cod' | 'refunded' | 'failed';

export type PaymentMethod = 'card' | 'apple_pay' | 'google_pay' | 'cod' | 'revolut_pay';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  customer: CustomerShipping;
  deliveryMethod: {
    id: string;
    name: string;
    priceRon: number;
    estimatedDays: string;
  };
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  isTestOrder?: boolean;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  savedAddresses: string[];
  ordersCount: number;
}

export interface StorePaymentSettings {
  ownerName: string;
  bankName: string;
  iban: string;
  revolutTag: string;
  enableCod: boolean;
  enableCard: boolean;
  enableRevolut: boolean;
}

