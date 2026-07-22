"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import Sidebar from "@/components/Sidebar";
import FloatingSearchButton from "@/components/FloatingSearchButton";
import { cn } from "@/lib/utils";

/**
 * AppShell — The main layout wrapper that orchestrates:
 *   • Desktop: Sidebar (left) + content
 *   • Mobile: Header (top) + content + BottomNavigation (bottom)
 *   • FloatingSearchButton (mobile only, on scroll)
 */
export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <div
        className={cn(
          "transition-all duration-[--duration-slow] ease-[--ease-out]",
          /* Push content right on desktop when sidebar is visible */
          "lg:ml-[240px]",
          sidebarCollapsed && "lg:ml-[72px]"
        )}
      >
        {/* Mobile Header (hidden on desktop — sidebar has its own logo/nav) */}
        <div className="lg:hidden">
          <Header />
        </div>

        {/* Page Content */}
        <main className="pb-24 lg:pb-8">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />

      {/* Mobile Floating Search */}
      <FloatingSearchButton />
    </div>
  );
}
