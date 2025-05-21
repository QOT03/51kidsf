import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductForm from '../components/admin/ProductForm';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import { Product } from '../types';
import Button from '../components/ui/Button';

const AdminAddProductPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [multipleMode, setMultipleMode] = useState(false);

  const handleAddProducts = async (products: Array<Omit<Product, 'id'> | Product>) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert(products);

      if (error) throw error;
      navigate('/admin/products');
    } catch (err) {
      console.error('Error adding products:', err);
      // Handle error appropriately
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {multipleMode ? 'Add Multiple Products' : 'Add New Product'}
          </h1>
          <Button
            variant="outline"
            onClick={() => setMultipleMode(!multipleMode)}
          >
            {multipleMode ? 'Single Product Mode' : 'Multiple Products Mode'}
          </Button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <ProductForm 
              onSubmit={handleAddProducts}
              multipleMode={multipleMode}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAddProductPage;