"use client";

import React from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar portalType="admin" />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
