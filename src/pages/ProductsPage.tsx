import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/user/ProductCard';
import { getProducts } from '../utils/storage';
import { Product } from '../types';
import { Filter, Search } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>('all');

  useEffect(() => {
    const loadProducts = () => {
      try {
        const loadedProducts = getProducts();
        setProducts(loadedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    window.addEventListener('storage', loadProducts);
    return () => window.removeEventListener('storage', loadProducts);
  }, []);

  // Extract unique categories, genders, and age ranges
  const categories = ['all', ...Array.from(new Set(products.map(product => product.category)))];
  const genders = ['all', ...Array.from(new Set(products.map(product => product.gender)))];
  const ageRanges = ['all', ...Array.from(new Set(products.map(product => product.ageRange)))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesGender = selectedGender === 'all' || product.gender === selectedGender;
    const matchesAgeRange = selectedAgeRange === 'all' || product.ageRange === selectedAgeRange;
    
    return matchesSearch && matchesCategory && matchesGender && matchesAgeRange;
  });

  return (
    <Layout>
      <div className="container mx-auto py-4 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-8">Our Products</h1>
        
        <div className="mb-6 sm:mb-8 bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter size={18} className="text-gray-400" />
                  </div>
                  <select
                    id="category-filter"
                    className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="gender-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter size={18} className="text-gray-400" />
                  </div>
                  <select
                    id="gender-filter"
                    className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                  >
                    {genders.map(gender => (
                      <option key={gender} value={gender}>
                        {gender === 'all' ? 'All Genders' : gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="age-range-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Age Range
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter size={18} className="text-gray-400" />
                  </div>
                  <select
                    id="age-range-filter"
                    className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                    value={selectedAgeRange}
                    onChange={(e) => setSelectedAgeRange(e.target.value)}
                  >
                    {ageRanges.map(ageRange => (
                      <option key={ageRange} value={ageRange}>
                        {ageRange === 'all' ? 'All Age Ranges' : ageRange}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
            <p className="text-base sm:text-lg text-gray-500">No products found</p>
            <p className="text-sm sm:text-base text-gray-400 mt-2">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div>
            {selectedCategory === 'all' && !searchTerm && selectedGender === 'all' && selectedAgeRange === 'all' ? (
              <>
                {categories.filter(cat => cat !== 'all').map(category => {
                  const categoryProducts = products.filter(product => product.category === category);
                  if (categoryProducts.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-8 sm:mb-12">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 capitalize">{category}</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
                        {categoryProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;