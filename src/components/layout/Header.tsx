import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, Shirt, Baby, User, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { totalItems } = useCart();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link to="/products" className="flex items-center">
            <img 
              src="/51-kids-toys-logo.png" 
              alt="51KidsAndToys" 
              className="h-16 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://raw.githubusercontent.com/51KidsAndToys/51KidsAndToys/main/51-kids-toys-logo.png";
                target.onerror = null;
              }}
            />
          </Link>

          <div className="flex items-center gap-4">
            {!isAdminRoute && (
              <Link to="/cart" className="relative">
                <ShoppingCart className="text-gray-700 hover:text-red-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 font-medium text-gray-700 hover:text-red-600"
            >
              <Menu size={18} />
              <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/products?category=toys"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Baby size={16} />
                  Toys Section
                </Link>
                <Link
                  to="/products?category=clothes&gender=male"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Shirt size={16} />
                  Boys Section
                </Link>
                <Link
                  to="/products?category=clothes&gender=female"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Shirt size={16} />
                  Girls Section
                </Link>
                <Link
                  to="/products?category=clothes&gender=unisex"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Shirt size={16} />
                  Unisex Section
                </Link>
                <Link
                  to="/products?category=supplies"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 border-t border-gray-100 mt-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Package size={16} />
                  Supplies Section
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 border-t border-gray-100 mt-1"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User size={16} />
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-4 py-4 border-t border-gray-200 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/products?category=toys"
                className="flex items-center gap-2 text-gray-700"
                onClick={toggleMenu}
              >
                <Baby size={18} />
                Toys Section
              </Link>
              <Link
                to="/products?category=clothes&gender=male"
                className="flex items-center gap-2 text-gray-700"
                onClick={toggleMenu}
              >
                <Shirt size={18} />
                Boys Section
              </Link>
              <Link
                to="/products?category=clothes&gender=female"
                className="flex items-center gap-2 text-gray-700"
                onClick={toggleMenu}
              >
                <Shirt size={18} />
                Girls Section
              </Link>
              <Link
                to="/products?category=clothes&gender=unisex"
                className="flex items-center gap-2 text-gray-700"
                onClick={toggleMenu}
              >
                <Shirt size={18} />
                Unisex Section
              </Link>
              <Link
                to="/products?category=supplies"
                className="flex items-center gap-2 text-gray-700"
                onClick={toggleMenu}
              >
                <Package size={18} />
                Supplies Section
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-2 text-gray-700 border-t border-gray-200 pt-4 mt-4"
                onClick={toggleMenu}
              >
                <User size={18} />
                Admin Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;