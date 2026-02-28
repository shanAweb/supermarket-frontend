"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

function generateHeatCells() {
  const cells = [];
  const hotspots = [
    { x: 5, y: 2, radius: 3, intensity: 1 },
    { x: 2, y: 5, radius: 2.5, intensity: 0.8 },
    { x: 6, y: 6, radius: 2, intensity: 0.9 },
  ];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let heat = 0;
      for (const spot of hotspots) {
        const dist = Math.sqrt((col - spot.x) ** 2 + (row - spot.y) ** 2);
        heat += Math.max(0, spot.intensity * (1 - dist / spot.radius));
      }
      heat = Math.min(1, heat + Math.random() * 0.1);
      const cascadeDelay = (row + col) * 0.06;
      cells.push({ heat: Math.max(0.03, heat), cascadeDelay });
    }
  }
  return cells;
}

function getCellColor(heat: number): string {
  if (heat > 0.7) return `rgba(244, 63, 94, ${0.6 + heat * 0.35})`;
  if (heat > 0.4) return `rgba(244, 63, 94, ${0.2 + heat * 0.3})`;
  if (heat > 0.15) return `rgba(148, 163, 184, ${0.15 + heat * 0.25})`;
  return `rgba(148, 163, 184, 0.06)`;
}

export default function Hero() {
  const cells = useMemo(() => generateHeatCells(), []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] animate-drift" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[100px] animate-drift-slow" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #FAFAFA 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={lineVariants}>
              <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-edge bg-surface/60 text-[13px] text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                AI-Powered Retail Analytics
              </span>
            </motion.div>

            <div className="space-y-1">
              <motion.h1
                variants={lineVariants}
                className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-tight text-cream"
              >
                Transform Customer
              </motion.h1>
              <motion.h1
                variants={lineVariants}
                className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-tight text-cream"
              >
                Traffic Into
              </motion.h1>
              <motion.h1
                variants={lineVariants}
                className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-tight"
              >
                <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent animate-shimmer">
                  Actionable Intelligence
                </span>
              </motion.h1>
            </div>

            <motion.p
              variants={lineVariants}
              className="text-[17px] text-muted max-w-lg leading-relaxed"
            >
              Computer vision heatmap analytics that reveals how customers move
              through your store. Optimize layouts, increase revenue, and make
              every square foot count.
            </motion.p>

            <motion.div
              variants={lineVariants}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a
                href="/signup"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold bg-primary hover:bg-primary-light text-white rounded-xl transition-all duration-300 animate-glow"
              >
                Start Analyzing
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-medium border border-edge hover:border-muted/50 text-cream rounded-xl transition-all duration-300 hover:bg-surface/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="w-3.5 h-3.5 text-primary ml-0.5" />
                </div>
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Heatmap Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="hidden lg:block"
            style={{ perspective: "1200px" }}
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 rounded-3xl blur-3xl" />

              <div className="relative bg-surface/90 backdrop-blur border border-edge/60 rounded-2xl overflow-hidden shadow-2xl shadow-void/50">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-edge/60">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-edge" />
                    <div className="w-2.5 h-2.5 rounded-full bg-edge" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="text-[11px] text-muted/60 font-mono">
                      velora.io/live
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                      </span>
                      <span className="text-sm font-medium text-cream">
                        Live Heatmap
                      </span>
                    </div>
                    <span className="text-[11px] text-muted font-mono">
                      Zone Analysis
                    </span>
                  </div>

                  {/* Heatmap Grid with cascade animation */}
                  <div className="grid grid-cols-8 gap-1">
                    {cells.map((cell, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 1 + cell.cascadeDelay,
                          ease: "easeOut",
                        }}
                        className="aspect-square rounded-[3px]"
                      >
                        <motion.div
                          animate={{
                            opacity: [1, 0.5, 1],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                          className="w-full h-full rounded-[3px]"
                          style={{ backgroundColor: getCellColor(cell.heat) }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="mt-4 pt-3 border-t border-edge/40 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[11px] text-muted">Visitors</p>
                      <p className="text-lg font-bold text-cream">47</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] text-muted">Peak Zone</p>
                      <p className="text-lg font-bold text-primary">A3</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-muted">Coverage</p>
                      <p className="text-lg font-bold text-accent">73%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
                className="absolute -right-4 top-1/4 bg-surface border border-edge rounded-lg p-3 shadow-xl shadow-void/60"
              >
                <p className="text-[10px] text-muted mb-0.5">Detection Rate</p>
                <p className="text-sm font-bold text-cream">99.2%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2.3 }}
                className="absolute -left-4 bottom-1/4 bg-surface border border-edge rounded-lg p-3 shadow-xl shadow-void/60"
              >
                <p className="text-[10px] text-muted mb-0.5">Avg Dwell</p>
                <p className="text-sm font-bold text-cream">4.2m</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[11px] text-muted/40 tracking-wider uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-edge/50 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-muted/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
