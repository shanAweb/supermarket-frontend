"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Flame,
  ScanEye,
  Grid3x3,
  BrainCircuit,
  FolderOpen,
  GitCompareArrows,
} from "lucide-react";

function MiniHeatmap() {
  const cells = Array.from({ length: 36 }, (_, i) => {
    const row = Math.floor(i / 6);
    const col = i % 6;
    const dist = Math.sqrt((row - 2) ** 2 + (col - 3) ** 2);
    const heat = Math.max(0, 1 - dist / 3.5) + Math.random() * 0.1;
    const clamped = Math.min(1, heat);
    return clamped;
  });

  return (
    <div className="grid grid-cols-6 gap-0.5 mt-5 opacity-50">
      {cells.map((heat, i) => (
        <div
          key={i}
          className="aspect-square rounded-[2px]"
          style={{
            backgroundColor:
              heat > 0.5
                ? `rgba(244, 63, 94, ${heat * 0.7})`
                : `rgba(148, 163, 184, ${heat * 0.4})`,
          }}
        />
      ))}
    </div>
  );
}

function MiniChat() {
  return (
    <div className="mt-5 space-y-2.5 opacity-60">
      <div className="flex gap-2">
        <div className="w-5 h-5 rounded-full bg-primary/20 shrink-0 mt-0.5" />
        <div className="bg-void/60 rounded-lg rounded-tl-sm px-3 py-2 text-[11px] text-muted/80">
          Which zones had the highest dwell time last week?
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <div className="bg-primary/10 border border-primary/10 rounded-lg rounded-tr-sm px-3 py-2 text-[11px] text-cream/60 max-w-[85%]">
          Zones D4-D6 (Dairy Aisle) averaged 3.8 minutes dwell time, up 22%
          from the prior week...
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Flame,
    title: "Real-Time Heatmaps",
    description:
      "Live traffic visualization with Gaussian heat accumulation. Watch patterns emerge as customers move through your store.",
    large: true,
    visual: "heatmap" as const,
  },
  {
    icon: ScanEye,
    title: "Person Detection",
    description:
      "YOLOv8 + DeepSORT multi-object tracking with 99.2% accuracy across frames.",
    large: false,
    visual: null,
  },
  {
    icon: Grid3x3,
    title: "Zone Analytics",
    description:
      "10x10 grid with per-cell heat percentages and automated zone classification.",
    large: false,
    visual: null,
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Insights",
    description:
      "Ask questions in natural language about traffic patterns. Get intelligent, context-aware answers powered by RAG.",
    large: true,
    visual: "chat" as const,
  },
  {
    icon: FolderOpen,
    title: "Session Management",
    description:
      "Upload, process, and archive video sessions with full analytics history and exportable reports.",
    large: false,
    visual: null,
  },
  {
    icon: GitCompareArrows,
    title: "Compare Sessions",
    description:
      "Measure impact of layout changes, promotions, and seasonal shifts across time periods.",
    large: false,
    visual: null,
  },
];

export default function BentoFeatures() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="features" ref={ref} className="py-24 lg:py-32 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[11px] font-medium text-primary/80 uppercase tracking-[0.25em] mb-4">
            Capabilities
          </p>
          <h2 className="text-3xl lg:text-[40px] font-bold text-cream leading-tight mb-5">
            Built for Serious Retail Analytics
          </h2>
          <p className="text-muted text-[15px] leading-relaxed">
            Every tool you need to understand, analyze, and optimize customer
            flow — from detection to decision.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className={`group relative p-6 lg:p-7 rounded-xl border border-edge/40 bg-void/40 hover:bg-void/70 hover:border-primary/15 transition-all duration-500 overflow-hidden ${
                f.large ? "sm:col-span-2" : ""
              }`}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.07] border border-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                  <f.icon className="w-5 h-5 text-primary/80" />
                </div>
                <h3 className="text-lg font-semibold text-cream mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {f.description}
                </p>

                {f.visual === "heatmap" && <MiniHeatmap />}
                {f.visual === "chat" && <MiniChat />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
