import type { ComponentChild } from "@app/app/types/basic.type";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: ComponentChild) {

  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}