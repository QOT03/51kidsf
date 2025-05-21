import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AdminLogin from '../components/admin/AdminLogin';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <AdminLogin />
      </div>
    </Layout>
  );
};

export default AdminLoginPage;