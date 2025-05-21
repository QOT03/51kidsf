import React from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { CartItem } from '../../types';

interface CartItemProps {
  item: CartItem;
  index: number;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  index,
  onUpdateQuantity,
  onRemove,
}) => {
  // Find the selected size object to get its count
  const selectedSize = item.product.sizes.find(size => size.name === item.selectedSize);
  const availableCount = selectedSize?.count || 0;

  const handleIncrement = () => {
    if (item.quantity < availableCount) {
      onUpdateQuantity(index, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(index, item.quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200 last:border-b-0">
      <div className="flex-shrink-0 sm:mr-6 mb-4 sm:mb-0">
        <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-md border border-gray-200">
          {item.product.images.length > 0 ? (
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="h-full w-full object-contain object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=No+Image';
              }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-500 text-xs">No image</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">{item.product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">Code: {item.product.code}</p>
            <p className="mt-1 text-sm text-gray-500">Size: {item.selectedSize}</p>
            <p className="mt-1 text-sm text-gray-500">Age Range: {item.product.ageRange}</p>
          </div>
          <p className="text-right font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border border-gray-300 rounded">
            <button
              type="button"
              className="p-2 text-gray-600 hover:bg-gray-100"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
            <button
              type="button"
              className="p-2 text-gray-600 hover:bg-gray-100"
              onClick={handleIncrement}
              disabled={item.quantity >= availableCount}
            >
              <Plus size={14} />
            </button>
          </div>
          
          <div className="flex items-center">
            {availableCount > 0 && (
              <span className="text-sm text-gray-500 mr-4">
                {availableCount} available
              </span>
            )}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-600 hover:text-red-800 focus:outline-none flex items-center gap-1"
            >
              <Trash size={16} />
              <span className="hidden sm:inline">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;