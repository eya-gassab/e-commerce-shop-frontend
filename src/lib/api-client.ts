// src/lib/api-client.ts
<<<<<<< HEAD
import axios from "axios";
=======
import axios, { AxiosResponse } from "axios";
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6

const API_BASE_URL = "/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  refreshToken = refresh;
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  }
};

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

<<<<<<< HEAD
// Restore tokens from localStorage on module load (browser only)
=======
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
if (typeof window !== "undefined") {
  const storedAccess = localStorage.getItem("access_token");
  const storedRefresh = localStorage.getItem("refresh_token");
  if (storedAccess && storedRefresh) {
    accessToken = storedAccess;
    refreshToken = storedRefresh;
  }
}

<<<<<<< HEAD
// Request interceptor: inject Bearer token
=======
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

<<<<<<< HEAD
// Response interceptor: auto-refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
=======
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosResponse["config"] | any) => {
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
<<<<<<< HEAD
        // Use refreshToken (camelCase) — matches Spring Boot AuthService
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });
        // Spring Boot returns accessToken + refreshToken (camelCase)
        const { accessToken: newAccess, refreshToken: newRefresh } = response.data;
        setTokens(newAccess, newRefresh);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      } catch {
        clearTokens();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(error);
=======
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });
        const { access_token, refresh_token } = response.data;
        setTokens(access_token, refresh_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
      }
    }
    return Promise.reject(error);
  }
);
