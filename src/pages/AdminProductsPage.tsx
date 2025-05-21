import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductSections from '../components/admin/ProductSections';
import { useAuth } from '../context/AuthContext';
import { getProducts, deleteProduct } from '../utils/storage';
import { Product } from '../types';

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    
    setProducts(getProducts());
  }, [isAuthenticated, navigate]);

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Manage Products</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <ProductSections products={products} onDelete={handleDeleteProduct} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProductsPage;