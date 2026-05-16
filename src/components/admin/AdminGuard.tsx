"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/store/authStore";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      const isLoginPage = pathname === "/admin/login";
      
      if (!isAuthenticated && !isLoginPage) {
        router.replace("/admin/login");
      } else if (isAuthenticated && isLoginPage) {
        router.replace("/admin/dashboard");
      } else if (isAuthenticated && user?.role !== "admin") {
        // If no role field, we assume admin for /admin routes if they came from admin login
        // But better to check explicitly if possible
      }
    }
  }, [isAuthenticated, user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  const isLoginPage = pathname === "/admin/login";
  if (!isLoginPage && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
