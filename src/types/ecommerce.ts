export type Currency = 'RON' | 'EUR';

export interface Product {
  id: string;
  name: string;
  category: 'polo_caps' | 'footwear' | 'essentials' | 'apparel' | 'twill' | 'corduroy' | 'mineral' | 'limited' | 'personalizat';
  categoryLabel: string;
  subtitle: string;
  priceRon: number;
  priceEur: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  image: string;
  description: string;
  materials: string[];
  dimensions: string;
  warranty: string;
  origin: string;
  features: string[];
  sku: string;
  colors?: string[];
  isUserProduct?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type DeliveryMethodId = 'fan_courier' | 'sameday_easybox' | 'curier_vip';

export interface DeliveryOption {
  id: DeliveryMethodId;
  name: string;
  description: string;
  priceRon: number;
  priceEur: number;
  estimatedDays: string;
}

export type PaymentMethodId = 'card' | 'apple_pay' | 'google_pay' | 'cod' | 'revolut_pay';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  notes?: string;
}

export interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  saveCard?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  giftWrappingCost: number;
  discount: number;
  couponCode?: string;
  total: number;
  currency: Currency;
  customer: CustomerDetails;
  deliveryMethod: DeliveryOption;
  paymentMethod: PaymentMethodId;
  paymentStatus: 'paid' | 'pending_cod';
  orderStatus: 'confirmed' | 'preparing' | 'in_transit' | 'delivered';
  trackingNumber: string;
}
