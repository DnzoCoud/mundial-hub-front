import PublicLayout from "@app/layouts/PublicLayout";
import { lazy } from "react";
import GuestGuard from "../guards/GuestGuard";
import type { AppRoute } from "../types/route.type";

export const publicRoutes: AppRoute[] = [
  {
    path: "/",
    element: lazy(() => import("@app/pages/RegisterPage")),
    layout: PublicLayout,
  },

  {
    path: "/login",
    element: lazy(() => import("@app/pages/LoginPage")),
    layout: PublicLayout,
    guard: GuestGuard,
  },
];