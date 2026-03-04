"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area - offset by sidebar width on desktop */}
      <div className="lg:pl-[260px] transition-all duration-300">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
