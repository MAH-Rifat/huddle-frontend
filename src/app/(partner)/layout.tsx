"use client";

import React, { useState } from "react";
import { PartnerSidebar } from "@/components/layout/PartnerSidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen w-screen flex bg-[#fffdf7] text-[#242220] overflow-hidden select-none">
      {/* Sticky Full Height Sidebar with smooth cubic bezier width transition */}
      <div
        className={`h-full shrink-0 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          sidebarCollapsed ? "w-[72px]" : "w-[240px]"
        }`}
      >
        <PartnerSidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#fffdf7]">
        {/* Fixed Top Navbar */}
        <TopNavbar portalType="partner" />

        {/* Scrollable Main Body */}
        <main className="flex-1 px-6 lg:px-8 py-6 w-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
