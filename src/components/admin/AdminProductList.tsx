import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash, Plus, Filter, Search } from 'lucide-react';
import { Product } from '../../types';
import Button from '../ui/Button';

interface AdminProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

const AdminProductList: React.FC<AdminProductListProps> = ({ products, onDelete }) => {
  // Calculate total inventory for each product
  const getProductInventory = (product: Product): number => {
    return product.sizes.reduce((total, size) => total + size.count, 0);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  // Extract unique categories, genders, and age ranges
  const categories = ['all', ...Array.from(new Set(products.map(product => product.category)))];
  const genders = ['all', ...Array.from(new Set(products.map(product => product.gender)))];
  const ageRanges = ['all', ...Array.from(new Set(products.map(product => product.ageRange)))];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           product.code.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      // Gender filter
      const matchesGender = selectedGender === 'all' || product.gender === selectedGender;
      
      // Age range filter
      const matchesAgeRange = selectedAgeRange === 'all' || product.ageRange === selectedAgeRange;
      
      return matchesSearch && matchesCategory && matchesGender && matchesAgeRange;
    })
    .sort((a, b) => {
      // Sort products
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'inventory-low':
          return getProductInventory(a) - getProductInventory(b);
        case 'inventory-high':
          return getProductInventory(b) - getProductInventory(a);
        default:
          return 0;
      }
    });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Products ({products.length})</h2>
        <Link to="/admin/products/add">
          <Button size="sm" className="flex items-center gap-1">
            <Plus size={16} />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col space-y-4">
          {/* Search */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
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

            {/* Gender Filter */}
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

            {/* Age Range Filter */}
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

          {/* Sort */}
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sort-by"
              className="px-4 py-2 w-full md:w-auto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="inventory-low">Inventory: Low to High</option>
              <option value="inventory-high">Inventory: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No products found</p>
          <Link to="/admin/products/add">
            <Button size="sm" className="flex items-center gap-1 mx-auto">
              <Plus size={16} />
              Add Your First Product
            </Button>
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
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age Range
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sizes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inventory
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
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
                    <div className="text-sm text-gray-900 capitalize">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{product.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.ageRange}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((size) => (
                        <span
                          key={`${product.id}-${size.name}`}
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            size.count > 0 
                              ? 'bg-gray-100 text-gray-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {size.name} ({size.count})
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getProductInventory(product)} items
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProductList;