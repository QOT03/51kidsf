import React, { useEffect } from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;