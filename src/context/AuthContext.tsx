import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState } from '../types';
import { isAuthenticated, setAuthenticated } from '../utils/storage';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
  });

  useEffect(() => {
    const authStatus = isAuthenticated();
    setAuth({ isAuthenticated: authStatus });
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === '51KidsAndToysRY' && password === '51KidsAndToysRY5115') {
      setAuthenticated(true);
      setAuth({ isAuthenticated: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthenticated(false);
    setAuth({ isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};