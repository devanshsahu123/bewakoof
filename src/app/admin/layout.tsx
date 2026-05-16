"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader  from "@/components/admin/AdminHeader";
import AdminGuard from "@/components/admin/AdminGuard";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <AdminGuard>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <AdminHeader onMenuToggle={() => setSidebarOpen((p) => !p)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}

