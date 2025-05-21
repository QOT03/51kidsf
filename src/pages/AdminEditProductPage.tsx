import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductForm from '../components/admin/ProductForm';
import { useAuth } from '../context/AuthContext';
import { getProducts, updateProduct } from '../utils/storage';
import { Product } from '../types';

const AdminEditProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    if (id) {
      const products = getProducts();
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/admin/products');
      }
    }
  }, [id, isAuthenticated, navigate]);

  const handleUpdateProduct = (updatedProduct: Product) => {
    updateProduct(updatedProduct);
    navigate('/admin/products');
  };

  if (!isAuthenticated || !product) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Product</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <ProductForm product={product} onSubmit={handleUpdateProduct} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminEditProductPage;