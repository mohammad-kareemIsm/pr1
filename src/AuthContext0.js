import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from './authService';
import { setAuthToken } from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      // Optionally, you can fetch user data here
      // fetchUser Data(token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginService(email, password);
    localStorage.setItem('token', data.access); // Save the token in localStorage
    setAuthToken(data.access);
    setUser (data.user); // Store user data including role
  };

  const logout = () => {
    logoutService();
    localStorage.removeItem('token'); // Remove the token from localStorage
    setUser (null);
  };

  const isTeacher = () => user && user.role === 'teacher';
  const isStudent = () => user && user.role === 'student';

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isTeacher, isStudent }}>
      {children}
    </AuthContext.Provider>
  );
};