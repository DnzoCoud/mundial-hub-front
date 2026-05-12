import { env } from "@/app/config/env"
import axios from "axios"

export const httpClient = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" }
})

// Interceptor directo (sin importar otro archivo)
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});