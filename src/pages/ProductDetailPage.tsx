import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductDetail from '../components/user/ProductDetail';
import { getProducts } from '../utils/storage';
import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const products = getProducts();
    const foundProduct = products.find((p) => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/products');
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Layout>
      <ProductDetail product={product} />
    </Layout>
  );
};

export default ProductDetailPage;