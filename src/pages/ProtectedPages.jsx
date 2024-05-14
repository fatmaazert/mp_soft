import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/navComponents/Navbar";

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  } else {
    // RETURN THE ADMIN DASH

    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }
};

export default ProtectedRoutes;
