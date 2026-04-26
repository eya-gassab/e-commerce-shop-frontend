// src/contexts/auth-context.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient, setTokens, clearTokens } from "@/lib/api-client";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  active: boolean;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "CUSTOMER" | "SELLER";
  shopName?: string;
  shopDescription?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const response = await apiClient.get("/auth/me");
          setUser(response.data);
        } catch {
          clearTokens();
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", { email, password });
    const { access_token, refresh_token, user: userData } = response.data;
    setTokens(access_token, refresh_token);
    setUser(userData);
    router.push("/");
  };

  const register = async (data: RegisterRequest) => {
    await apiClient.post("/auth/register", data);
    router.push("/login?registered=true");
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch {}
    clearTokens();
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
