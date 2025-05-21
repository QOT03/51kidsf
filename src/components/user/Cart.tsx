import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import CartItemComponent from './CartItem';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
  const { items, removeItem, updateItem, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const productsList = items.map(
      (item) => `*${item.product.name}*\nSize: ${item.selectedSize}\nQuantity: ${item.quantity}\nPrice: $${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n\n');
    
    const totalMessage = `\n\n*Total Price: $${totalPrice.toFixed(2)}*`;
    const message = `Hello, I would like to order the following items:\n\n${productsList}${totalMessage}`;
    const phoneNumber = '00962791417774';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleRemoveItem = (index: number) => {
    removeItem(index);
    if (items.length === 1) {
      navigate('/products');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
          <div className="mt-6">
            <Link to="/products">
              <Button type="button" variant="outline" className="flex items-center justify-center mx-auto">
                <ArrowLeft size={16} className="mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item, index) => (
                <li key={`${item.product.id}-${item.selectedSize}`} className="py-6">
                  <CartItemComponent
                    item={item}
                    index={index}
                    onUpdateQuantity={updateItem}
                    onRemove={handleRemoveItem}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between">
              <dt className="text-base font-medium text-gray-900">Total</dt>
              <dd className="text-base font-medium text-gray-900">${totalPrice.toFixed(2)}</dd>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Shipping and taxes calculated at checkout
            </p>
          </div>
          
          <div className="mt-6">
            <Button
              onClick={handleCheckout}
              fullWidth
              size="lg"
              className="flex items-center justify-center"
            >
              <MessageCircle size={18} className="mr-2" />
              Checkout via WhatsApp
            </Button>
            
            <div className="mt-4">
              <Link to="/products">
                <Button type="button" variant="outline" fullWidth>
                  <ArrowLeft size={16} className="mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;