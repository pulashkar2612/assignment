import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Return true if token exists, false otherwise
};

const ProtectedRoute = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? element : <Navigate to="/" replace />} 
    />
  );
};

export default ProtectedRoute;