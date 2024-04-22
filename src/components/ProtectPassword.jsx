import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children }) => {
  const auth = useSelector(state=>state.auth.newpassword);

  return auth ? (
    <>{children}</>    
  ) : (
   <Navigate to="/"></Navigate>
  );
};

export default ProtectedRoute;