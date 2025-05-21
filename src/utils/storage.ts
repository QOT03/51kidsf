import { Product, CartItem, AuthDevice } from '../types';

// Generate a unique device ID
const generateDeviceId = (): string => {
  const nav = window.navigator;
  const screen = window.screen;
  const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  
  return btoa(`${nav.userAgent}${screen.height}${screen.width}${guid}`);
};

// Auth Storage
const MAX_DEVICES = 5;

export const getAuthDevices = (): AuthDevice[] => {
  const devices = localStorage.getItem('authDevices');
  return devices ? JSON.parse(devices) : [];
};

export const addAuthDevice = (deviceId: string): void => {
  const devices = getAuthDevices();
  const now = Date.now();
  
  // Remove device if it already exists
  const filteredDevices = devices.filter(d => d.deviceId !== deviceId);
  
  // Add new device
  const newDevices = [...filteredDevices, { deviceId, lastLogin: now }]
    .sort((a, b) => b.lastLogin - a.lastLogin) // Sort by most recent login
    .slice(0, MAX_DEVICES); // Keep only the most recent devices
  
  localStorage.setItem('authDevices', JSON.stringify(newDevices));
};

export const removeAuthDevice = (deviceId: string): void => {
  const devices = getAuthDevices();
  const filteredDevices = devices.filter(d => d.deviceId !== deviceId);
  localStorage.setItem('authDevices', JSON.stringify(filteredDevices));
};

export const isDeviceAuthorized = (deviceId: string): boolean => {
  const devices = getAuthDevices();
  return devices.some(d => d.deviceId === deviceId);
};

export const getCurrentDeviceId = (): string => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

export const isAuthenticated = (): boolean => {
  const authStatus = localStorage.getItem('isAuthenticated') === 'true';
  const deviceId = getCurrentDeviceId();
  return authStatus && isDeviceAuthorized(deviceId);
};

export const setAuthenticated = (value: boolean): void => {
  const deviceId = getCurrentDeviceId();
  
  if (value) {
    const devices = getAuthDevices();
    if (devices.length >= MAX_DEVICES && !isDeviceAuthorized(deviceId)) {
      throw new Error('Maximum number of devices reached');
    }
    
    localStorage.setItem('isAuthenticated', 'true');
    addAuthDevice(deviceId);
  } else {
    localStorage.removeItem('isAuthenticated');
    removeAuthDevice(deviceId);
  }
};

// Product Storage
export const getProducts = (): Product[] => {
  const products = localStorage.getItem('products');
  if (!products) return [];
  return JSON.parse(products);
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem('products', JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now().toString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (product: Product): Product => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === product.id);
  if (index !== -1) {
    products[index] = product;
    saveProducts(products);
  }
  return product;
};

export const deleteProduct = (id: string): void => {
  const products = getProducts();
  const filteredProducts = products.filter((p) => p.id !== id);
  saveProducts(filteredProducts);
};

// Cart Storage
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (item: CartItem): void => {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
};

export const updateCartItem = (index: number, item: CartItem): void => {
  const cart = getCart();
  cart[index] = item;
  saveCart(cart);
};

export const removeCartItem = (index: number): void => {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
};

export const clearCart = (): void => {
  localStorage.removeItem('cart');
};