import React from 'react';
import { Product } from '../../types';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

interface InventorySummarySectionProps {
  products: Product[];
}

const InventorySummarySection: React.FC<InventorySummarySectionProps> = ({ products }) => {
  // Calculate inventory statistics
  const totalInventory = products.reduce((sum, product) => 
    sum + product.sizes.reduce((sizeSum, size) => sizeSum + size.count, 0), 0);
  
  const lowInventoryThreshold = 10; // Consider products with less than 10 items as low inventory
  const lowInventoryProducts = products.filter(product => {
    const totalCount = product.sizes.reduce((sum, size) => sum + size.count, 0);
    return totalCount < lowInventoryThreshold && totalCount > 0;
  });
  
  const outOfStockProducts = products.filter(product => 
    product.sizes.every(size => size.count === 0)
  );
  
  const lowInventoryPercentage = products.length > 0 
    ? (lowInventoryProducts.length / products.length) * 100 
    : 0;
  
  const outOfStockPercentage = products.length > 0 
    ? (outOfStockProducts.length / products.length) * 100 
    : 0;
  
  const healthyInventoryPercentage = 100 - lowInventoryPercentage - outOfStockPercentage;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory Summary</h2>
      
      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products have been added yet</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Total Items in Inventory</span>
              <span className="text-sm font-medium text-gray-800">{totalInventory} items</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Low Inventory Products</span>
              <span className="text-sm font-medium text-yellow-600">{lowInventoryProducts.length} products</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Out of Stock Products</span>
              <span className="text-sm font-medium text-red-600">{outOfStockProducts.length} products</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-2">Inventory Health</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-l-full" style={{ width: `${healthyInventoryPercentage}%` }}></div>
              <div className="bg-yellow-500 h-2.5" style={{ width: `${lowInventoryPercentage}%`, marginLeft: `${healthyInventoryPercentage}%` }}></div>
              <div className="bg-red-500 h-2.5 rounded-r-full" style={{ width: `${outOfStockPercentage}%` }}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Healthy</span>
              <span>Low Stock</span>
              <span>Out of Stock</span>
            </div>
          </div>
          
          {(lowInventoryProducts.length > 0 || outOfStockProducts.length > 0) && (
            <div className="border-t pt-4">
              <div className="flex items-center text-yellow-600 mb-2">
                <AlertTriangle size={16} className="mr-2" />
                <h3 className="text-md font-medium">Attention Required</h3>
              </div>
              
              <ul className="space-y-2 text-sm">
                {lowInventoryProducts.slice(0, 3).map(product => (
                  <li key={product.id} className="flex justify-between items-center">
                    <span className="text-gray-600">{product.name}</span>
                    <span className="text-yellow-600 font-medium">
                      {product.sizes.reduce((sum, size) => sum + size.count, 0)} left
                    </span>
                  </li>
                ))}
                
                {outOfStockProducts.slice(0, 3).map(product => (
                  <li key={product.id} className="flex justify-between items-center">
                    <span className="text-gray-600">{product.name}</span>
                    <span className="text-red-600 font-medium">Out of stock</span>
                  </li>
                ))}
                
                {(lowInventoryProducts.length > 3 || outOfStockProducts.length > 3) && (
                  <li className="text-center mt-2">
                    <Link 
                      to="/admin/products" 
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      View all issues
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InventorySummarySection;