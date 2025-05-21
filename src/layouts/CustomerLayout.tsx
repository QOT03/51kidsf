import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerHeader from '../components/customer/CustomerHeader';

const CustomerLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;