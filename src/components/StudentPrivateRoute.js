import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function StudentPrivateRoute({ children }) {
  const checkRole = useAuth();
  return checkRole !== undefined && checkRole === "student" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
