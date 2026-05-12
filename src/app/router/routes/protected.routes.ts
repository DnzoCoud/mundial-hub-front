import { lazy } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthGuard from "../guards/AuthGuard";
import type { AppRoute } from "../types/route.type";

export const protectedRoutes: AppRoute[] = [
  {
    path: "/",
    element: lazy(() => import("@/pages/DashboardHome")),
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/dashboard",
    element: lazy(() => import("@/pages/DashboardHome")),
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/agenda",
    element: lazy(() => import("@/pages/AgendaPage")),
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/pollas",
    element: lazy(() => import("@/pages/PollsPage")),
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/album",
    element: lazy(() => import("@/pages/AlbumPage")),
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/grupos",
    element: lazy(() => import("@/pages/GroupsPage")),
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/preferencias",
    element: lazy(() => import("@/pages/PreferencesPage")),
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/perfil",
    element: lazy(() => import("@/pages/ProfilePage")),
    layout: DashboardLayout,
    guard: AuthGuard,
  },
];