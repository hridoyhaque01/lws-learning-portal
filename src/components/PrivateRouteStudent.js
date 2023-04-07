import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRouteStudent({ children }) {
  const authRole = useAuth();
  return authRole !== undefined && authRole === "student" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
