import api, { setAuthToken } from './api';

// Function to log in
export const login = async (email, password) => {
  const response = await api.post('/jwt/create/', {
    email,
    password,
  });
  return response.data;
};

// Function to log out
export const logout = () => {
  setAuthToken(null); // Remove token from headers
};