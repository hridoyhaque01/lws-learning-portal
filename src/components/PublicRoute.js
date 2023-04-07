import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const authRole = useAuth();
  return authRole === undefined ? (
    children
  ) : authRole === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/courses" />
  );
}
