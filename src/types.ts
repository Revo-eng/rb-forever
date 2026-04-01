export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  stock: number;
  isTrending?: boolean;
  isLimited?: boolean;
  createdAt: number;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: 'mobile_money' | 'card';
  deliveryMethod: 'standard' | 'express';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  createdAt: number;
}
