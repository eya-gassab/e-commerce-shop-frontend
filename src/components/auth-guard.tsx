"use client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Role } from "@/types";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: Role;
}

export default function AuthGuard({ children, requiredRole = "ADMIN" }: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // wait for auth to resolve
    if (!isAuthenticated) { router.push("/login"); return; }
    if (requiredRole && user?.role !== requiredRole) { router.push("/"); return; }
  }, [isLoading, isAuthenticated, user, requiredRole, router]);

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) return null;
  return <>{children}</>;
}
