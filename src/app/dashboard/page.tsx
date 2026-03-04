"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MapPin,
  BarChart3,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Upload,
  Play,
  Eye,
  Zap,
  Activity,
  ChevronRight,
} from "lucide-react";

/* ─── Animated number counter ─── */
function AnimatedNumber({
  value,
  duration = 1500,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const hasDecimal = value % 1 !== 0;

  useEffect(() => {
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };
    requestAnimationFrame(tick);
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {hasDecimal ? display.toFixed(1) : Math.floor(display).toLocaleString()}
    </span>
  );
}

/* ─── KPI Data ─── */
const kpis = [
  {
    icon: Users,
    label: "Total Visitors",
    value: 3847,
    displayValue: "3,847",
    change: 12.3,
    positive: true,
    period: "vs last week",
  },
  {
    icon: MapPin,
    label: "Active Zones",
    value: 78,
    displayValue: "78",
    change: 5.4,
    positive: true,
    period: "of 100",
  },
  {
    icon: Clock,
    label: "Avg Dwell Time",
    value: 4.2,
    displayValue: "4.2m",
    change: -2.1,
    positive: false,
    period: "per zone",
  },
  {
    icon: TrendingUp,
    label: "Conversion Rate",
    value: 67,
    displayValue: "67%",
    change: 8.7,
    positive: true,
    period: "checkout",
  },
];

/* ─── Heatmap Data (10x10 grid) ─── */
const heatData = [
  [15, 22, 45, 67, 78, 82, 71, 55, 38, 20],
  [18, 35, 52, 73, 85, 91, 88, 62, 41, 25],
  [12, 28, 48, 65, 72, 79, 75, 58, 35, 18],
  [8, 20, 38, 55, 63, 68, 62, 48, 30, 14],
  [10, 25, 42, 58, 68, 74, 69, 52, 33, 16],
  [14, 30, 50, 70, 80, 86, 82, 60, 40, 22],
  [20, 38, 55, 75, 88, 95, 90, 68, 45, 28],
  [16, 32, 48, 65, 74, 80, 76, 58, 38, 22],
  [10, 22, 35, 50, 58, 64, 60, 45, 28, 15],
  [6, 15, 25, 38, 45, 50, 46, 35, 22, 10],
];

function getHeatColor(value: number): string {
  if (value > 80) return "rgba(244, 63, 94, 0.85)";
  if (value > 60) return "rgba(244, 63, 94, 0.5)";
  if (value > 40) return "rgba(244, 63, 94, 0.25)";
  if (value > 20) return "rgba(148, 163, 184, 0.2)";
  return "rgba(148, 163, 184, 0.07)";
}

/* ─── Hot Zones ─── */
const hotZones = [
  { zone: "G7", value: 95, label: "Main Entrance", trend: "up" as const },
  { zone: "F6", value: 91, label: "Checkout Area", trend: "up" as const },
  { zone: "B7", value: 88, label: "Produce Section", trend: "down" as const },
  { zone: "E6", value: 86, label: "Dairy Aisle", trend: "up" as const },
  { zone: "G5", value: 82, label: "Bakery Corner", trend: "up" as const },
];

/* ─── Recent Sessions ─── */
const sessions = [
  {
    id: "#S-0048",
    date: "Mar 3, 2026",
    duration: "2h 34m",
    visitors: 412,
    peakZone: "G7",
    status: "completed" as const,
  },
  {
    id: "#S-0047",
    date: "Mar 2, 2026",
    duration: "3h 12m",
    visitors: 538,
    peakZone: "F6",
    status: "completed" as const,
  },
  {
    id: "#S-0046",
    date: "Mar 1, 2026",
    duration: "1h 55m",
    visitors: 287,
    peakZone: "B7",
    status: "completed" as const,
  },
  {
    id: "#S-0045",
    date: "Feb 28, 2026",
    duration: "4h 08m",
    visitors: 693,
    peakZone: "G7",
    status: "completed" as const,
  },
  {
    id: "#S-0044",
    date: "Feb 27, 2026",
    duration: "2h 47m",
    visitors: 365,
    peakZone: "E6",
    status: "processing" as const,
  },
];

/* ─── Traffic Chart Data (last 7 days) ─── */
const trafficData = [
  { day: "Mon", visitors: 312, peak: 78 },
  { day: "Tue", visitors: 428, peak: 85 },
  { day: "Wed", visitors: 395, peak: 72 },
  { day: "Thu", visitors: 467, peak: 91 },
  { day: "Fri", visitors: 538, peak: 88 },
  { day: "Sat", visitors: 693, peak: 95 },
  { day: "Sun", visitors: 412, peak: 82 },
];

/* ─── Quick Actions ─── */
const quickActions = [
  {
    icon: Upload,
    label: "Upload Video",
    description: "Process a new session",
    href: "/dashboard/upload",
  },
  {
    icon: Play,
    label: "Live Stream",
    description: "Start real-time tracking",
    href: "/dashboard/sessions",
  },
  {
    icon: Eye,
    label: "View Reports",
    description: "Export analytics data",
    href: "/dashboard/analytics",
  },
  {
    icon: Zap,
    label: "Ask AI",
    description: "Get instant insights",
    href: "/dashboard/insights",
  },
];

/* ─── Animation Variants ─── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const maxVisitors = Math.max(...trafficData.map((d) => d.visitors));

  return (
    <div className="space-y-6">
      {/* ─── Welcome Banner ─── */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface via-surface to-elevated border border-edge/30 p-6 lg:p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <p className="text-[11px] font-medium text-primary/80 uppercase tracking-[0.25em] mb-2">
            Overview
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-cream mb-1">
            Good evening, John
          </h2>
          <p className="text-[14px] text-muted leading-relaxed">
            Your store had{" "}
            <span className="text-cream font-medium">3,847 visitors</span> this
            week — <span className="text-primary">12.3% more</span> than last
            week.
          </p>
        </div>
      </motion.div>

      {/* ─── KPI Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.05 + i * 0.05 }}
            className="group p-4 lg:p-5 rounded-xl bg-surface/60 border border-edge/30 hover:border-primary/15 hover:bg-surface/80 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/[0.07] border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                <kpi.icon className="w-4 h-4 text-primary/80" />
              </div>
              <div
                className={`flex items-center gap-0.5 text-[11px] font-medium ${
                  kpi.positive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {kpi.positive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {Math.abs(kpi.change)}%
              </div>
            </div>
            <p className="text-2xl lg:text-[28px] font-bold text-cream mb-0.5">
              <AnimatedNumber value={kpi.value} />
              {kpi.label === "Avg Dwell Time"
                ? "m"
                : kpi.label === "Conversion Rate"
                ? "%"
                : ""}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-muted/60">{kpi.label}</p>
              <p className="text-[10px] text-muted/40">{kpi.period}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Main Grid: Heatmap + Hot Zones + Traffic ─── */}
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Heatmap Panel */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 rounded-xl bg-surface/40 border border-edge/30 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-edge/20">
            <div>
              <h3 className="text-[15px] font-semibold text-cream">
                Zone Heatmap
              </h3>
              <p className="text-[11px] text-muted/50 mt-0.5">
                Latest session — Session #S-0048
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-400">
                  Live
                </span>
              </span>
            </div>
          </div>

          <div className="p-5">
            {/* Grid labels */}
            <div className="flex items-end gap-1 mb-1">
              <div className="w-6" />
              {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map(
                (col) => (
                  <div
                    key={col}
                    className="flex-1 text-center text-[9px] text-muted/30 font-mono"
                  >
                    {col}
                  </div>
                )
              )}
            </div>

            {/* Heatmap grid */}
            <div className="space-y-[2px]">
              {heatData.map((row, ri) => (
                <div key={ri} className="flex items-center gap-[2px]">
                  <div className="w-6 text-right text-[9px] text-muted/30 font-mono pr-1">
                    {ri + 1}
                  </div>
                  {row.map((val, ci) => (
                    <div
                      key={ci}
                      className="flex-1 aspect-square rounded-[2px] hover:ring-1 hover:ring-cream/20 transition-all cursor-pointer"
                      style={{ backgroundColor: getHeatColor(val) }}
                      title={`Zone ${String.fromCharCode(65 + ci)}${
                        ri + 1
                      }: ${val}%`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-edge/20">
              <span className="text-[10px] text-muted/40">Low traffic</span>
              <div className="flex gap-0.5">
                {[10, 30, 50, 70, 90].map((v) => (
                  <div
                    key={v}
                    className="w-6 h-1.5 rounded-sm"
                    style={{ backgroundColor: getHeatColor(v) }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-muted/40">High traffic</span>
            </div>
          </div>
        </motion.div>

        {/* Hot Zones Panel */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-xl bg-surface/40 border border-edge/30 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-edge/20">
            <h3 className="text-[15px] font-semibold text-cream">Hot Zones</h3>
            <button className="text-[11px] text-primary/70 hover:text-primary transition-colors">
              View all
            </button>
          </div>

          <div className="p-5 space-y-4">
            {hotZones.map((z, i) => (
              <motion.div
                key={z.zone}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center text-[12px] font-mono font-bold text-primary shrink-0">
                  {z.zone}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] text-cream/90 truncate font-medium">
                      {z.label}
                    </span>
                    <div className="flex items-center gap-1 ml-2">
                      {z.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-400" />
                      )}
                      <span className="text-[12px] font-semibold text-primary/90">
                        {z.value}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-edge/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${z.value}%` }}
                      transition={{
                        duration: 1,
                        delay: 0.5 + i * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-primary/50 to-primary"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Traffic Chart + Quick Actions ─── */}
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-5">
        {/* Traffic Chart */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 rounded-xl bg-surface/40 border border-edge/30 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-edge/20">
            <div>
              <h3 className="text-[15px] font-semibold text-cream">
                Weekly Traffic
              </h3>
              <p className="text-[11px] text-muted/50 mt-0.5">
                Visitors per day — last 7 days
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary/80" />
                <span className="text-[10px] text-muted/60">Visitors</span>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-end gap-2 lg:gap-3 h-[180px]">
              {trafficData.map((d, i) => {
                const height = (d.visitors / maxVisitors) * 100;
                return (
                  <div
                    key={d.day}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-medium text-cream/70 tabular-nums">
                      {d.visitors}
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4 + i * 0.08,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="w-full rounded-t-md bg-gradient-to-t from-primary/40 to-primary/70 hover:from-primary/60 hover:to-primary transition-colors cursor-pointer relative group"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-elevated border border-edge/40 text-[10px] text-cream opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Peak: {d.peak}%
                      </div>
                    </motion.div>
                    <span className="text-[11px] text-muted/50 font-medium">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="rounded-xl bg-surface/40 border border-edge/30 overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-edge/20">
            <h3 className="text-[15px] font-semibold text-cream">
              Quick Actions
            </h3>
          </div>

          <div className="p-3 space-y-1.5">
            {quickActions.map((action, i) => (
              <motion.a
                key={action.label}
                href={action.href}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-elevated/60 border border-transparent hover:border-edge/20 transition-all duration-200 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/[0.07] border border-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-200">
                  <action.icon className="w-4 h-4 text-primary/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-cream">
                    {action.label}
                  </p>
                  <p className="text-[11px] text-muted/50">
                    {action.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted/30 group-hover:text-muted/60 transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Recent Sessions Table ─── */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="rounded-xl bg-surface/40 border border-edge/30 overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-edge/20">
          <div>
            <h3 className="text-[15px] font-semibold text-cream">
              Recent Sessions
            </h3>
            <p className="text-[11px] text-muted/50 mt-0.5">
              Latest processed video sessions
            </p>
          </div>
          <a
            href="/dashboard/sessions"
            className="text-[12px] text-primary/70 hover:text-primary transition-colors flex items-center gap-1"
          >
            View all
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-edge/15">
                <th className="text-left text-[11px] font-medium text-muted/50 uppercase tracking-wider px-5 py-3">
                  Session
                </th>
                <th className="text-left text-[11px] font-medium text-muted/50 uppercase tracking-wider px-5 py-3">
                  Date
                </th>
                <th className="text-left text-[11px] font-medium text-muted/50 uppercase tracking-wider px-5 py-3">
                  Duration
                </th>
                <th className="text-left text-[11px] font-medium text-muted/50 uppercase tracking-wider px-5 py-3">
                  Visitors
                </th>
                <th className="text-left text-[11px] font-medium text-muted/50 uppercase tracking-wider px-5 py-3">
                  Peak Zone
                </th>
                <th className="text-left text-[11px] font-medium text-muted/50 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <motion.tr
                  key={s.id}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                  className="border-b border-edge/10 last:border-0 hover:bg-elevated/30 transition-colors cursor-pointer group"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] font-mono font-medium text-cream group-hover:text-primary transition-colors">
                      {s.id}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] text-muted/70">{s.date}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] text-muted/70 font-mono">
                      {s.duration}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] text-cream font-medium">
                      {s.visitors}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[12px] font-mono font-medium text-primary/80 bg-primary/[0.07] px-2 py-0.5 rounded">
                      {s.peakZone}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                        s.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/15"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          s.status === "completed"
                            ? "bg-emerald-400"
                            : "bg-amber-400 animate-pulse"
                        }`}
                      />
                      {s.status === "completed" ? "Completed" : "Processing"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden p-4 space-y-3">
          {sessions.map((s, i) => (
            <motion.div
              key={s.id}
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
              className="p-4 rounded-lg bg-void/40 border border-edge/20 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-mono font-medium text-cream">
                  {s.id}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    s.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  <span
                    className={`w-1 h-1 rounded-full ${
                      s.status === "completed"
                        ? "bg-emerald-400"
                        : "bg-amber-400 animate-pulse"
                    }`}
                  />
                  {s.status === "completed" ? "Done" : "Processing"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-[11px]">
                <div>
                  <p className="text-muted/40 mb-0.5">Date</p>
                  <p className="text-cream/70">{s.date}</p>
                </div>
                <div>
                  <p className="text-muted/40 mb-0.5">Visitors</p>
                  <p className="text-cream font-medium">{s.visitors}</p>
                </div>
                <div>
                  <p className="text-muted/40 mb-0.5">Peak</p>
                  <p className="text-primary/80 font-mono font-medium">
                    {s.peakZone}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── Activity Indicator ─── */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center justify-center gap-2 py-4 text-[11px] text-muted/30"
      >
        <Activity className="w-3.5 h-3.5" />
        <span>Last updated 2 minutes ago</span>
      </motion.div>
    </div>
  );
}
