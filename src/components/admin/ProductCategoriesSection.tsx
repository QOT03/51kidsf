import React from 'react';
import { Product } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ProductCategoriesSectionProps {
  products: Product[];
}

const ProductCategoriesSection: React.FC<ProductCategoriesSectionProps> = ({ products }) => {
  // Category data
  const categoryData = [
    {
      name: 'Toys',
      value: products.filter(product => product.category === 'toys').length
    },
    {
      name: 'Clothes',
      value: products.filter(product => product.category === 'clothes').length
    }
  ].filter(item => item.value > 0);
  
  // Gender data
  const genderData = [
    {
      name: 'Male',
      value: products.filter(product => product.gender === 'male').length
    },
    {
      name: 'Female',
      value: products.filter(product => product.gender === 'female').length
    },
    {
      name: 'Unisex',
      value: products.filter(product => product.gender === 'unisex').length
    }
  ].filter(item => item.value > 0);
  
  // Age range data
  const ageRanges = Array.from(new Set(products.map(product => product.ageRange)));
  const ageRangeData = ageRanges.map(ageRange => {
    const count = products.filter(product => product.ageRange === ageRange).length;
    return {
      name: ageRange,
      value: count
    };
  }).sort((a, b) => b.value - a.value);
  
  // Colors for the pie charts
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Categories</h2>
      
      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products have been added yet</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Category Breakdown */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Category Breakdown</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              {categoryData.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-600 capitalize">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{category.value} products</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gender Breakdown */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Gender Breakdown</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              {genderData.map((gender, index) => (
                <div key={gender.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[(index + 2) % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-600 capitalize">{gender.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{gender.value} products</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Age Range Breakdown */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Age Range Breakdown</h3>
            <div className="mt-2 space-y-2">
              {ageRangeData.map((ageRange, index) => (
                <div key={ageRange.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-600">{ageRange.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{ageRange.value} products</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategoriesSection;