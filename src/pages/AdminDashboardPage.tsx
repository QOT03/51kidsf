import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AdminDashboard from '../components/admin/AdminDashboard';
import { useAuth } from '../context/AuthContext';

const AdminDashboardPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <AdminDashboard />
    </Layout>
  );
};

export default AdminDashboardPage;