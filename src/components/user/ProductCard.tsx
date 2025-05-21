import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Calculate total inventory
  const totalInventory = product.sizes.reduce((sum, size) => sum + size.count, 0);
  const isOutOfStock = totalInventory === 0;

  return (
    <Link to={`/products/${product.id}`} className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-full aspect-square relative bg-gray-100 rounded-t-lg">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-gray-500 text-sm">No image available</span>
          </div>
        )}
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
            <p className="mt-1 text-base font-semibold text-red-600">${product.price.toFixed(2)}</p>
          </div>
          <div className={`flex-shrink-0 p-2 rounded-full ${
            isOutOfStock 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-red-100 text-red-600 transition-colors duration-200 group-hover:bg-red-600 group-hover:text-white'
          }`}>
            <ShoppingCart size={16} />
          </div>
        </div>

        <div className="mt-2">
          <div className="flex flex-wrap items-center text-xs text-gray-600 gap-x-2 gap-y-1">
            <span className="capitalize">{product.category}</span>
            <span>•</span>
            <span className="capitalize">{product.gender}</span>
            <span>•</span>
            <span>{product.ageRange}</span>
          </div>
        </div>

        {product.sizes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.sizes.map((size) => (
              <span
                key={size.name}
                className={`inline-flex items-center text-xs px-1.5 py-0.5 rounded ${
                  size.count > 0
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {size.name}
                <span className="ml-1 text-xs">
                  ({size.count})
                </span>
              </span>
            ))}
          </div>
        )}

        <div className="mt-2">
          <p className={`text-xs ${
            isOutOfStock 
              ? 'text-red-600 font-medium' 
              : totalInventory < 10
                ? 'text-yellow-600 font-medium'
                : 'text-green-600 font-medium'
          }`}>
            {isOutOfStock 
              ? 'Out of Stock' 
              : totalInventory < 10
                ? `Only ${totalInventory} left`
                : `${totalInventory} in stock`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;