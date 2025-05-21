import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    
    try {
      const success = login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
        setPassword('');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message === 'Maximum number of devices reached' 
          ? 'Maximum number of devices (5) reached. Please log out from another device.'
          : 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred');
      }
      setPassword('');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-red-100 rounded-full">
          <Lock className="h-8 w-8 text-red-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            autoComplete="off"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            autoComplete="off"
          />
        </div>
        
        <Button type="submit" fullWidth>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;