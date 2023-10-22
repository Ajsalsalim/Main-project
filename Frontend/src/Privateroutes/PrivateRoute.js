import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import { useSelector } from "react-redux"

const PrivateRoute = () => {
  const isAuthenticated = useSelector(state => state.adminauth.isAuthenticated);

  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Outlet/>;
  } else {
    return <Navigate to="/admin" />;
  }
};

export default PrivateRoute;
