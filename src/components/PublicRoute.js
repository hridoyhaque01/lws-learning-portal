import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const checkRole = useAuth();
  return checkRole === undefined ? (
    children
  ) : checkRole === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/course" />
  );
}
