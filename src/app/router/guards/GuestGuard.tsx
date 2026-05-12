import { Navigate } from "react-router-dom";
import type { ComponentChild } from "@/app/types/basic.type";

export default function GuestGuard({ children }: ComponentChild) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}