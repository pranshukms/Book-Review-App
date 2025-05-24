import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.auth);
  
  return userToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;