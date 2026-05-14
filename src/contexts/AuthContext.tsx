import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hhr_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    // In production, this would call /api/login via fetch
    // For now, simulating API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username === 'demo' || credentials.username === 'admin' || true) {
          const mockUser: User = {
            username: credentials.username,
            fName: "John",
            mName: "Doe",
            lName: "Smith",
            fullName: "John Doe Smith",
            staffUnit: "Operations",
            email: "john.doe@example.com",
            lnm_email: "manager@example.com",
            gender: "Male",
            balance: {
              total: 30,
              taken: 7,
              remaining: 23
            }
          };
          setUser(mockUser);
          localStorage.setItem('hhr_user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hhr_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
