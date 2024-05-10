import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/navComponents/Navbar";

const ReglePage = React.lazy(() => import("./responsablePages/ReglePage"));

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  console.log({ user });
  if (!user) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  } else if (user?.roles[0] == "ROLE_ADMIN") {
    // RETURN THE ADMIN DASH
    return (
      <>
        <Navbar />
        <h1>hello world this is the Admin page</h1>;
      </>
    );
  } else if (user?.roles[0] == "ROLE_RESPONSABLE") {
    // return RESPONSABLE
    return (
      <>
        <Navbar />
        <h1>hello world this is the RESPONSABLE page</h1>;
      </>
    );
  } else if (user.roles[0] == "ROLE_GESTIONNAIRE") {
    // return GESTIONNAIRE
    return (
      <>
        <Navbar />
        <ReglePage />;
      </>
    );
  }
};

export default ProtectedRoutes;
