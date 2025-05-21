export interface Product {
  id: string;
  name: string;
  price: number;
  code: string;
  sizes: Array<{
    name: string;
    count: number;
  }>;
  ageRange: string;
  description: string;
  images: string[];
  category: string;
  gender: string;
}

export interface Supply {
  id: string;
  name: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  category: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface AuthState {
  isAuthenticated: boolean;
}

export interface AuthDevice {
  deviceId: string;
  lastLogin: number;
}