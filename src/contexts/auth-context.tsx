"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient, setTokens, clearTokens } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import type { User, Role } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
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
          const res = await apiClient.get<User>("/auth/me");
          setUser(res.data);
        } catch {
          clearTokens();
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

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
    clearTokens();
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{
      user, isLoading,
      login, register, logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === "ADMIN",
      isSeller: user?.role === "SELLER",
      isCustomer: user?.role === "CUSTOMER",
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
