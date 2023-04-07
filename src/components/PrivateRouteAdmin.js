import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRouteAdmin({ children }) {
  const authRole = useAuth();
  return authRole !== undefined && authRole === "admin" ? (
    children
  ) : (
    <Navigate to="/admin" />
  );
}
