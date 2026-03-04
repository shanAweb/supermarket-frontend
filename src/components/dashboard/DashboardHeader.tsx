"use client";

import { Search, Bell, Menu } from "lucide-react";

export default function DashboardHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 bg-void/80 backdrop-blur-2xl border-b border-edge/40">
      <div className="flex items-center justify-between h-16 lg:h-[72px] px-5 lg:px-8">
        {/* Left: mobile menu + title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-elevated/60 text-muted hover:text-cream transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-cream">Dashboard</h1>
            <p className="text-[11px] text-muted/60 hidden sm:block">
              Welcome back, John
            </p>
          </div>
        </div>

        {/* Center: search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
            <input
              type="text"
              placeholder="Search sessions, zones, analytics..."
              className="w-full bg-surface/60 border border-edge/30 rounded-lg pl-10 pr-4 py-2 text-[13px] text-cream placeholder:text-muted/40 focus:outline-none focus:border-primary/30 focus:bg-surface transition-all duration-200"
            />
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-elevated/60 text-muted hover:text-cream transition-colors">
            <Search className="w-[18px] h-[18px]" />
          </button>
          <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-elevated/60 text-muted hover:text-cream transition-colors">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary border-2 border-void" />
          </button>
          <div className="hidden sm:flex items-center gap-2.5 ml-2 pl-3 border-l border-edge/30">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-[11px] font-bold text-primary">JD</span>
            </div>
            <div className="hidden lg:block">
              <p className="text-[13px] font-medium text-cream">John Doe</p>
              <p className="text-[10px] text-muted/50">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
