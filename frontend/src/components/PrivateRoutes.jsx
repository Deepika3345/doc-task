import React from "react";

import useAuthStatus from "../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  const { isLoggedIn, checkedIn } = useAuthStatus();

  if (checkedIn) {
    return (
      <div className="container p-5 text-align-center">
        <h1 className="display-1 text-secondary">Loading...</h1>
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'}/>;
};

export default PrivateRoutes;
