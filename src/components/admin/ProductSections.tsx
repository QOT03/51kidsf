import React, { useState } from 'react';
import { Product } from '../../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { Package, BarChart2, AlertTriangle } from 'lucide-react';

// Import sections
import AdminProductList from './AdminProductList';
import InventorySummarySection from './InventorySummarySection';
import ProductCategoriesSection from './ProductCategoriesSection';

interface ProductSectionsProps {
  products: Product[];
  onDelete: (id: string) => void;
}

const ProductSections: React.FC<ProductSectionsProps> = ({ products, onDelete }) => {
  const [activeTab, setActiveTab] = useState('all-products');

  // Filter products for different tabs
  const lowInventoryThreshold = 10;
  const lowStockProducts = products.filter(product => {
    const totalCount = product.sizes.reduce((sum, size) => sum + size.count, 0);
    return totalCount < lowInventoryThreshold && totalCount > 0;
  });
  
  const outOfStockProducts = products.filter(product => 
    product.sizes.every(size => size.count === 0)
  );

  return (
    <div>
      <Tabs defaultValue="all-products" onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
          <TabsTrigger value="all-products" className="flex items-center gap-2">
            <Package size={16} />
            <span>All Products</span>
            <span className="ml-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
              {products.length}
            </span>
          </TabsTrigger>
          
          <TabsTrigger value="low-stock" className="flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>Low Stock</span>
            <span className="ml-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">
              {lowStockProducts.length}
            </span>
          </TabsTrigger>
          
          <TabsTrigger value="out-of-stock" className="flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>Out of Stock</span>
            <span className="ml-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">
              {outOfStockProducts.length}
            </span>
          </TabsTrigger>
          
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart2 size={16} />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-products">
          <AdminProductList products={products} onDelete={onDelete} />
        </TabsContent>
        
        <TabsContent value="low-stock">
          {lowStockProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-2">No products with low stock</p>
              <p className="text-gray-400 text-sm">All your products have sufficient inventory</p>
            </div>
          ) : (
            <AdminProductList products={lowStockProducts} onDelete={onDelete} />
          )}
        </TabsContent>
        
        <TabsContent value="out-of-stock">
          {outOfStockProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-2">No products out of stock</p>
              <p className="text-gray-400 text-sm">All your products have inventory available</p>
            </div>
          ) : (
            <AdminProductList products={outOfStockProducts} onDelete={onDelete} />
          )}
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InventorySummarySection products={products} />
            <ProductCategoriesSection products={products} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductSections;