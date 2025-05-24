import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { userToken, isAdmin } = useSelector((state) => state.auth);
  
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default AdminRoute;