"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  LayoutDashboard,
  Video,
  Upload,
  BarChart3,
  BrainCircuit,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Sessions",
    href: "/dashboard/sessions",
    icon: Video,
  },
  {
    label: "Upload",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "AI Insights",
    href: "/dashboard/insights",
    icon: BrainCircuit,
  },
];

const bottomItems = [
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div
      className={`flex flex-col h-full bg-surface border-r border-edge/40 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-16 lg:h-[72px] border-b border-edge/30">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/20">
            <Layers className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <span className="text-[17px] font-semibold text-cream tracking-tight">
              Velora
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-7 h-7 items-center justify-center rounded-md hover:bg-elevated/80 text-muted hover:text-cream transition-colors"
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-medium text-muted/50 uppercase tracking-[0.2em] px-3 mb-3">
            Menu
          </p>
        )}
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 group ${
                active
                  ? "bg-primary/10 text-cream border border-primary/15"
                  : "text-muted hover:text-cream hover:bg-elevated/60 border border-transparent"
              }`}
            >
              <item.icon
                className={`w-[18px] h-[18px] shrink-0 ${
                  active
                    ? "text-primary"
                    : "text-muted/70 group-hover:text-cream"
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
              {active && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-3 space-y-1 border-t border-edge/30 pt-3">
        {bottomItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 group ${
                active
                  ? "bg-primary/10 text-cream border border-primary/15"
                  : "text-muted hover:text-cream hover:bg-elevated/60 border border-transparent"
              }`}
            >
              <item.icon
                className={`w-[18px] h-[18px] shrink-0 ${
                  active
                    ? "text-primary"
                    : "text-muted/70 group-hover:text-cream"
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* User profile */}
        <div
          className={`flex items-center gap-3 px-3 py-3 mt-2 rounded-lg bg-void/40 border border-edge/20 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-primary">JD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-cream truncate">
                John Doe
              </p>
              <p className="text-[11px] text-muted/60 truncate">
                Store Manager
              </p>
            </div>
          )}
          {!collapsed && (
            <button className="text-muted/50 hover:text-cream transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 h-screen z-40">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-void/60 backdrop-blur-sm z-40"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden fixed top-0 left-0 h-screen z-50"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
