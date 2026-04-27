<<<<<<< HEAD
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient, setTokens, clearTokens } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import type { User, Role } from "@/types";
=======
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
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
<<<<<<< HEAD
  login: (email: string, motDePasse: string) => Promise<void>;
  register: (data: {
    email: string; motDePasse: string; prenom: string; nom: string;
    role: Role; nomBoutique?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSeller: boolean;
  isCustomer: boolean;
=======
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin?: boolean;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
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
<<<<<<< HEAD
          const res = await apiClient.get<User>("/auth/me");
          setUser(res.data);
=======
          const response = await apiClient.get("/auth/me");
          setUser(response.data);
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
        } catch {
          clearTokens();
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

<<<<<<< HEAD
  const login = async (email: string, motDePasse: string) => {
    const res = await apiClient.post<{
      accessToken: string; refreshToken: string;
      userId: number; email: string; prenom: string; nom: string; role: Role;
    }>("/auth/login", { email, motDePasse });
    const { accessToken, refreshToken, userId, email: e, prenom, nom, role } = res.data;
    setTokens(accessToken, refreshToken);
    setUser({ id: userId, email: e, prenom, nom, role, actif: true });
    router.push(role === "ADMIN" ? "/admin" : role === "SELLER" ? "/seller" : "/");
  };

  const register = async (data: {
    email: string; motDePasse: string; prenom: string; nom: string;
    role: Role; nomBoutique?: string;
  }) => {
    const res = await apiClient.post<{
      accessToken: string; refreshToken: string;
      userId: number; email: string; prenom: string; nom: string; role: Role;
    }>("/auth/register", data);
    const { accessToken, refreshToken, userId, email, prenom, nom, role } = res.data;
    setTokens(accessToken, refreshToken);
    setUser({ id: userId, email, prenom, nom, role, actif: true });
    router.push(role === "SELLER" ? "/seller" : "/");
  };

  const logout = async () => {
    try { await apiClient.post("/auth/logout"); } catch {}
=======
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
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
    clearTokens();
    setUser(null);
    router.push("/");
  };

  return (
<<<<<<< HEAD
    <AuthContext.Provider value={{
      user, isLoading,
      login, register, logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === "ADMIN",
      isSeller: user?.role === "SELLER",
      isCustomer: user?.role === "CUSTOMER",
    }}>
=======
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
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
