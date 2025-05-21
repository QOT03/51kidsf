import React, { useState, useEffect } from 'react';
import { Package, DollarSign, ShoppingBag, Layers, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../utils/storage';
import { Product } from '../../types';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;
  const uniqueSizes = [...new Set(products.flatMap(product => product.sizes.map(size => size.name)))].length;
  
  // Calculate inventory statistics
  const totalInventory = products.reduce((sum, product) => 
    sum + product.sizes.reduce((sizeSum, size) => sizeSum + size.count, 0), 0);
  
  const lowInventoryThreshold = 10; // Consider products with less than 10 items as low inventory
  const lowInventoryProducts = products.filter(product => 
    product.sizes.reduce((sum, size) => sum + size.count, 0) < lowInventoryThreshold && 
    product.sizes.reduce((sum, size) => sum + size.count, 0) > 0
  );
  
  const outOfStockProducts = products.filter(product => 
    product.sizes.every(size => size.count === 0)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-medium">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
            </div>
          </div>
        </div>
        
        {/* Total Value */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-medium">Total Value</p>
              <p className="text-2xl font-bold text-gray-800">${totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        {/* Total Inventory */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 mr-4">
              <ShoppingBag className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-medium">Total Inventory</p>
              <p className="text-2xl font-bold text-gray-800">{totalInventory} items</p>
            </div>
          </div>
        </div>
        
        {/* Total Unique Sizes */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <Layers className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-medium">Unique Sizes</p>
              <p className="text-2xl font-bold text-gray-800">{uniqueSizes}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Low Inventory Alert */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Low Inventory Alert</h2>
            <div className="p-2 rounded-full bg-yellow-100">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
          
          {lowInventoryProducts.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No products with low inventory</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inventory
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lowInventoryProducts.slice(0, 5).map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {product.images.length > 0 ? (
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={product.images[0]}
                                alt={product.name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=N/A';
                                }}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-xs">N/A</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-yellow-600 font-medium">
                          {product.sizes.reduce((sum, size) => sum + size.count, 0)} items left
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {lowInventoryProducts.length > 5 && (
                <div className="mt-4 text-right">
                  <Link
                    to="/admin/products"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    View All Low Inventory
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Out of Stock Products */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Out of Stock Products</h2>
            <div className="p-2 rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </div>
          
          {outOfStockProducts.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No products out of stock</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {outOfStockProducts.slice(0, 5).map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {product.images.length > 0 ? (
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={product.images[0]}
                                alt={product.name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=N/A';
                                }}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-xs">N/A</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {outOfStockProducts.length > 5 && (
                <div className="mt-4 text-right">
                  <Link
                    to="/admin/products"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    View All Out of Stock
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Products</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No products have been added yet</p>
            <Link 
              to="/admin/products/add"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age Range
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inventory
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {product.images.length > 0 ? (
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={product.images[0]}
                              alt={product.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=N/A';
                              }}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">N/A</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.ageRange}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${
                        product.sizes.reduce((sum, size) => sum + size.count, 0) === 0 
                          ? 'text-red-600 font-medium' 
                          : product.sizes.reduce((sum, size) => sum + size.count, 0) < 10
                            ? 'text-yellow-600 font-medium'
                            : 'text-green-600 font-medium'
                      }`}>
                        {product.sizes.reduce((sum, size) => sum + size.count, 0)} items
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {products.length > 5 && (
              <div className="mt-4 text-right">
                <Link
                  to="/admin/products"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  View All Products
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;