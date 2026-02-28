"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart3, Users, MapPin, TrendingUp } from "lucide-react";

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

const metrics = [
  { icon: Users, label: "Total Visitors", value: "1,247", change: "+12.3%" },
  { icon: MapPin, label: "Peak Zone", value: "F7", change: "Aisle 3" },
  { icon: BarChart3, label: "Avg Dwell Time", value: "4.2m", change: "+8.1%" },
  { icon: TrendingUp, label: "Store Coverage", value: "73%", change: "+5.4%" },
];

const hotZones = [
  { zone: "F7", value: 95, label: "Main Entrance" },
  { zone: "E6", value: 91, label: "Checkout Area" },
  { zone: "G5", value: 88, label: "Produce" },
  { zone: "D6", value: 86, label: "Dairy Aisle" },
  { zone: "E5", value: 82, label: "Bakery" },
];

export default function DashboardPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="product" ref={ref} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[11px] font-medium text-primary/80 uppercase tracking-[0.25em] mb-4">
            The Platform
          </p>
          <h2 className="text-3xl lg:text-[40px] font-bold text-cream leading-tight mb-5">
            See Your Store Like Never Before
          </h2>
          <p className="text-muted text-[15px] leading-relaxed">
            Real-time heatmap visualization, zone analytics, and AI-powered
            insights — all in one unified dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative"
        >
          <div className="absolute -inset-3 bg-gradient-to-b from-primary/[0.06] via-transparent to-transparent rounded-3xl blur-2xl" />

          <div className="relative bg-surface border border-edge/60 rounded-2xl overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-edge/40 bg-elevated/30">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-void/60 text-[11px] text-muted/60 font-mono">
                  dashboard.velora.io
                </div>
              </div>
            </div>

            <div className="p-5 lg:p-6">
              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3.5 rounded-xl bg-void/60 border border-edge/30"
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <m.icon className="w-3.5 h-3.5 text-muted/60" />
                      <span className="text-[11px] text-muted/70">
                        {m.label}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-cream">{m.value}</p>
                    <p className="text-[11px] text-primary/80 mt-0.5">
                      {m.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Heatmap + sidebar */}
              <div className="grid lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 p-4 rounded-xl bg-void/50 border border-edge/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-cream">
                      Zone Heatmap
                    </span>
                    <span className="text-[11px] text-muted/60 font-mono">
                      Session #042
                    </span>
                  </div>
                  <div className="grid grid-cols-10 gap-[2px]">
                    {heatData.flat().map((val, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-[2px]"
                        style={{ backgroundColor: getHeatColor(val) }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-edge/20">
                    <span className="text-[10px] text-muted/50">Low</span>
                    <div className="flex gap-0.5">
                      {[10, 30, 50, 70, 90].map((v) => (
                        <div
                          key={v}
                          className="w-5 h-1.5 rounded-sm"
                          style={{ backgroundColor: getHeatColor(v) }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted/50">High</span>
                  </div>
                </div>

                {/* Hot zones sidebar */}
                <div className="p-4 rounded-xl bg-void/50 border border-edge/30">
                  <h4 className="text-sm font-medium text-cream mb-4">
                    Hot Zones
                  </h4>
                  <div className="space-y-3">
                    {hotZones.map((z) => (
                      <div key={z.zone} className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-[11px] font-mono font-bold text-primary shrink-0">
                          {z.zone}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] text-cream/80 truncate">
                              {z.label}
                            </span>
                            <span className="text-[11px] font-medium text-primary/80 ml-2">
                              {z.value}%
                            </span>
                          </div>
                          <div className="h-1 rounded-full bg-edge/40 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                              style={{ width: `${z.value}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
