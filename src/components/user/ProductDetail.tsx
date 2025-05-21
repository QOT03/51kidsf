import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import Button from '../ui/Button';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeName, setSelectedSizeName] = useState('');
  const { addToCart } = useCart();

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const incrementQuantity = () => {
    const selectedSize = product.sizes.find(size => size.name === selectedSizeName);
    if (selectedSize && quantity < selectedSize.count) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSizeName) {
      return;
    }

    const selectedSize = product.sizes.find(size => size.name === selectedSizeName);
    if (!selectedSize || selectedSize.count < quantity) {
      return;
    }

    addToCart(product, quantity, selectedSizeName);
  };

  const selectedSize = product.sizes.find(size => size.name === selectedSizeName);
  const availableCount = selectedSize?.count || 0;
  const isOutOfStock = !selectedSizeName || availableCount === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 relative">
            {product.images.length > 0 ? (
              <img 
                src={product.images[selectedImage]} 
                alt={`${product.name}`}
                className="h-full w-full object-contain object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image';
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
            
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-0 inset-y-0 px-4 text-white bg-black bg-opacity-30 rounded-l-lg focus:outline-none hover:bg-opacity-50"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-0 inset-y-0 px-4 text-white bg-black bg-opacity-30 rounded-r-lg focus:outline-none hover:bg-opacity-50"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          
          <div className="flex -mx-2 mb-4 overflow-x-auto py-2">
            {product.images.map((image, i) => (
              <div 
                key={i} 
                className={`px-2 cursor-pointer ${selectedImage === i ? 'ring-2 ring-red-500 rounded-md' : ''}`}
                onClick={() => setSelectedImage(i)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${i+1}`} 
                  className="h-16 w-16 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=Error';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:flex-1 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-4">Product Code: {product.code}</p>
          
          <div className="flex mb-4">
            <div className="mr-4">
              <span className="font-bold text-gray-700">Price:</span>
              <span className="text-2xl font-bold text-red-600 ml-2">${product.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <span className="font-bold text-gray-700">Category:</span>
            <span className="text-gray-600 ml-2 capitalize">{product.category}</span>
          </div>
          
          <div className="mb-4">
            <span className="font-bold text-gray-700">Gender:</span>
            <span className="text-gray-600 ml-2 capitalize">{product.gender}</span>
          </div>
          
          <div className="mb-4">
            <span className="font-bold text-gray-700">Age Range:</span>
            <span className="text-gray-600 ml-2">{product.ageRange}</span>
          </div>
          
          <div className="mb-4">
            <span className="font-bold text-gray-700">Select Size:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size.name}
                  className={`py-2 px-4 border rounded-md ${
                    selectedSizeName === size.name
                      ? 'bg-red-600 text-white border-red-600'
                      : size.count > 0 
                        ? 'border-gray-300 text-gray-700 hover:border-red-400'
                        : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-100'
                  }`}
                  onClick={() => {
                    if (size.count > 0) {
                      setSelectedSizeName(size.name);
                      setQuantity(1);
                    }
                  }}
                  disabled={size.count === 0}
                >
                  {size.name}
                  <span className="ml-1 text-xs">
                    ({size.count > 0 ? `${size.count} available` : 'Out of stock'})
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <span className="font-bold text-gray-700">Description:</span>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>
          
          <div className="flex mb-6">
            <div className="flex items-center border-gray-300 border rounded-md">
              <button 
                onClick={decrementQuantity} 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-1 text-gray-800">{quantity}</span>
              <button 
                onClick={incrementQuantity} 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
                disabled={isOutOfStock || quantity >= availableCount}
              >
                <Plus size={16} />
              </button>
            </div>
            {selectedSize && (
              <div className="ml-4 flex items-center text-sm text-gray-500">
                {availableCount > 0 ? (
                  <span>{availableCount} items available</span>
                ) : (
                  <span className="text-red-500">Out of stock</span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={handleAddToCart} 
              disabled={!selectedSizeName || isOutOfStock}
              fullWidth
              size="lg"
              className="flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;