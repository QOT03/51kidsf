import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminAddProductPage from './pages/AdminAddProductPage';
import AdminEditProductPage from './pages/AdminEditProductPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import CustomerLayout from './layouts/CustomerLayout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Customer Routes */}
            <Route element={<CustomerLayout />}>
              <Route index element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/products/add" element={<AdminAddProductPage />} />
              <Route path="/admin/products/edit/:id" element={<AdminEditProductPage />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;