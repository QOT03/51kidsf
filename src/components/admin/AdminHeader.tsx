import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const AdminHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/products');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/products" className="flex items-center">
              <img 
                src="/51-kids-toys-logo.png" 
                alt="51KidsAndToys" 
                className="h-12 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://raw.githubusercontent.com/51KidsAndToys/51KidsAndToys/main/51-kids-toys-logo.png";
                  target.onerror = null;
                }}
              />
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/admin/dashboard" 
                className={`font-medium ${
                  location.pathname === '/admin/dashboard' 
                    ? 'text-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/products" 
                className={`font-medium flex items-center gap-2 ${
                  location.pathname.includes('/admin/products') 
                    ? 'text-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                <Package size={18} />
                Products
              </Link>
            </nav>
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-1"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;