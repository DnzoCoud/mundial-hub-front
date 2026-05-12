import PublicLayout from "@/layouts/PublicLayout";
import { lazy } from "react";
import GuestGuard from "../guards/GuestGuard";
import type { AppRoute } from "../types/route.type";

export const publicRoutes: AppRoute[] = [
  {
    path: "/",
    element: lazy(() => import("@/pages/RegisterPage")),
    layout: PublicLayout,
    guard: GuestGuard,   
  },
  {
    path: "/login",
    element: lazy(() => import("@/pages/LoginPage")),
    layout: PublicLayout,
    guard: GuestGuard,
  },
];