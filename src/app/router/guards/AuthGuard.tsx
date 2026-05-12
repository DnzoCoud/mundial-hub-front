import { Navigate } from "react-router-dom";
import type { ComponentChild } from "@/app/types/basic.type";

export default function AuthGuard({ children }: ComponentChild) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}