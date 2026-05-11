import { httpClient } from "../httpClient";

httpClient.interceptors.request.use((config) => {
  const token = null
  if (token)
    config.headers.Authorization = `Bearer ${token}`;

  return config
})