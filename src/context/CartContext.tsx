import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { getCart, saveCart, addToCart as addToCartStorage, removeCartItem, updateCartItem, clearCart } from '../utils/storage';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, selectedSize: string) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = () => {
      try {
        const cartItems = getCart();
        setItems(cartItems);
      } catch (error) {
        console.error('Error loading cart:', error);
        setItems([]);
      }
    };

    loadCart();
    
    // Add event listener for storage changes
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const addToCart = (product: Product, quantity: number, selectedSize: string) => {
    try {
      const sizeObj = product.sizes.find(size => size.name === selectedSize);
      
      if (!sizeObj || sizeObj.count < quantity) {
        console.error('Not enough inventory available');
        return;
      }
      
      const newItem: CartItem = { product, quantity, selectedSize };
      
      const existingIndex = items.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      let updatedItems: CartItem[];
      if (existingIndex !== -1) {
        const newQuantity = items[existingIndex].quantity + quantity;
        if (sizeObj.count < newQuantity) {
          console.error('Not enough inventory available for the combined quantity');
          return;
        }
        
        updatedItems = [...items];
        updatedItems[existingIndex].quantity = newQuantity;
      } else {
        updatedItems = [...items, newItem];
      }

      setItems(updatedItems);
      saveCart(updatedItems);
      
      if (existingIndex !== -1) {
        updateCartItem(existingIndex, updatedItems[existingIndex]);
      } else {
        addToCartStorage(newItem);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeItem = (index: number) => {
    try {
      if (index < 0 || index >= items.length) {
        console.error('Invalid index for cart removal');
        return;
      }

      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
      removeCartItem(index);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateItem = (index: number, quantity: number) => {
    try {
      if (index < 0 || index >= items.length) {
        console.error('Invalid index for cart update');
        return;
      }

      const item = items[index];
      const sizeObj = item.product.sizes.find(size => size.name === item.selectedSize);
      
      if (!sizeObj || sizeObj.count < quantity) {
        console.error('Not enough inventory available');
        return;
      }
      
      const updatedItems = [...items];
      updatedItems[index] = { ...item, quantity };
      setItems(updatedItems);
      updateCartItem(index, updatedItems[index]);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const clear = () => {
    try {
      setItems([]);
      clearCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeItem, 
        updateItem, 
        clear, 
        totalItems, 
        totalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};