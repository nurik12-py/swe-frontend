import { Navigate } from "react-router-dom";
import * as auth from "../services/auth";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }): JSX.Element => {
  if (auth.getJwt()) return <>{children}</>;
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
