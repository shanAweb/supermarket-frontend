"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Layers,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

/* ─── Heatmap Visual ─── */
function generateHeatCells() {
  const cells = [];
  const hotspots = [
    { x: 4, y: 2, radius: 3.5, intensity: 1 },
    { x: 1, y: 5, radius: 2.5, intensity: 0.75 },
    { x: 6, y: 5, radius: 2.8, intensity: 0.9 },
    { x: 3, y: 7, radius: 2, intensity: 0.6 },
  ];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let heat = 0;
      for (const spot of hotspots) {
        const dist = Math.sqrt((col - spot.x) ** 2 + (row - spot.y) ** 2);
        heat += Math.max(0, spot.intensity * (1 - dist / spot.radius));
      }
      heat = Math.min(1, heat + Math.random() * 0.08);
      cells.push({ heat: Math.max(0.03, heat), delay: (row + col) * 0.04 });
    }
  }
  return cells;
}

function getCellColor(heat: number): string {
  if (heat > 0.7) return `rgba(244, 63, 94, ${0.55 + heat * 0.4})`;
  if (heat > 0.4) return `rgba(244, 63, 94, ${0.15 + heat * 0.3})`;
  if (heat > 0.15) return `rgba(148, 163, 184, ${0.1 + heat * 0.2})`;
  return `rgba(148, 163, 184, 0.05)`;
}

/* ─── Social Icons ─── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-cream">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const cells = useMemo(() => generateHeatCells(), []);

  return (
    <div className="min-h-screen bg-void flex">
      {/* ─── Left: Visual Panel ─── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[120px] animate-drift" />
          <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] animate-drift-slow" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #FAFAFA 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col justify-between w-full p-12 xl:p-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center transition-colors group-hover:bg-primary/20">
              <Layers className="w-4.5 h-4.5 text-primary" />
            </div>
            <span className="text-lg font-semibold text-cream tracking-tight">
              Velora
            </span>
          </Link>

          {/* Central visual */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-md w-full"
            >
              {/* Glow behind card */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/[0.08] via-transparent to-accent/[0.04] rounded-3xl blur-2xl" />

              {/* Heatmap card */}
              <div className="relative bg-elevated/60 backdrop-blur-xl border border-edge/50 rounded-2xl overflow-hidden shadow-2xl shadow-void/60">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-edge/40">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-edge/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-edge/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-[11px] text-muted/50 font-mono">
                      velora.io/analytics
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                      <span className="text-sm font-medium text-cream">
                        Live Zone Analysis
                      </span>
                    </div>
                    <span className="text-[10px] text-muted/40 font-mono">
                      8x8 Grid
                    </span>
                  </div>

                  {/* Animated heatmap grid */}
                  <div className="grid grid-cols-8 gap-[3px]">
                    {cells.map((cell, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.8 + cell.delay,
                          ease: "easeOut",
                        }}
                        className="aspect-square rounded-[3px]"
                      >
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
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

                  {/* Mini stats */}
                  <div className="mt-5 pt-4 border-t border-edge/30 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[10px] text-muted/50">Active Now</p>
                      <p className="text-lg font-bold text-cream">34</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted/50">Hot Zone</p>
                      <p className="text-lg font-bold text-primary">E3</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-muted/50">Coverage</p>
                      <p className="text-lg font-bold text-accent">81%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
                className="absolute -right-6 top-1/4 bg-elevated border border-edge/50 rounded-xl p-3.5 shadow-xl shadow-void/60"
              >
                <p className="text-[10px] text-muted/50 mb-0.5">
                  Revenue Uplift
                </p>
                <p className="text-base font-bold text-cream">+47%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 2.3 }}
                className="absolute -left-6 bottom-1/4 bg-elevated border border-edge/50 rounded-xl p-3.5 shadow-xl shadow-void/60"
              >
                <p className="text-[10px] text-muted/50 mb-0.5">Accuracy</p>
                <p className="text-base font-bold text-primary">99.2%</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            <div className="border-t border-edge/30 pt-6">
              <p className="text-[14px] text-muted/70 leading-relaxed italic max-w-md">
                &ldquo;Velora transformed how we understand customer flow.
                Revenue is up 34% since we optimized based on their
                heatmaps.&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/15 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-primary">
                    MC
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-cream">
                    Marcus Chen
                  </p>
                  <p className="text-[11px] text-muted/50">
                    VP Operations, NovaMart
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Right: Login Form ─── */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center px-6 py-12 lg:px-12 xl:px-20 relative">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-void lg:bg-transparent overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px]" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <motion.div variants={itemVariants} className="lg:hidden mb-10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Layers className="w-4.5 h-4.5 text-primary" />
              </div>
              <span className="text-lg font-semibold text-cream tracking-tight">
                Velora
              </span>
            </Link>
          </motion.div>

          {/* Back to home */}
          <motion.div variants={itemVariants}>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[12px] text-muted/50 hover:text-cream transition-colors mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-[28px] lg:text-[32px] font-bold text-cream leading-tight mb-2">
              Welcome back
            </h1>
            <p className="text-[15px] text-muted leading-relaxed">
              Sign in to your account to continue analyzing your store traffic.
            </p>
          </motion.div>

          {/* Social buttons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-3 mb-6"
          >
            <button className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-surface/60 border border-edge/40 hover:border-edge/70 hover:bg-surface transition-all duration-200 group">
              <GoogleIcon />
              <span className="text-[13px] font-medium text-cream/80 group-hover:text-cream">
                Google
              </span>
            </button>
            <button className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-surface/60 border border-edge/40 hover:border-edge/70 hover:bg-surface transition-all duration-200 group">
              <GitHubIcon />
              <span className="text-[13px] font-medium text-cream/80 group-hover:text-cream">
                GitHub
              </span>
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 mb-6"
          >
            <div className="flex-1 h-px bg-edge/40" />
            <span className="text-[11px] text-muted/40 uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-edge/40" />
          </motion.div>

          {/* Form */}
          <form className="space-y-4">
            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-[12px] font-medium text-muted/70 mb-2 uppercase tracking-wider">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-surface/50 border border-edge/40 rounded-xl pl-11 pr-4 py-3 text-[14px] text-cream placeholder:text-muted/30 focus:outline-none focus:border-primary/40 focus:bg-surface/80 focus:ring-1 focus:ring-primary/10 transition-all duration-200"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[12px] font-medium text-muted/70 uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[12px] text-primary/70 hover:text-primary transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-surface/50 border border-edge/40 rounded-xl pl-11 pr-12 py-3 text-[14px] text-cream placeholder:text-muted/30 focus:outline-none focus:border-primary/40 focus:bg-surface/80 focus:ring-1 focus:ring-primary/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/40 hover:text-cream transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Remember me */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2.5"
            >
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-edge/50 bg-surface/50 text-primary focus:ring-primary/20 focus:ring-offset-0 accent-primary"
              />
              <label
                htmlFor="remember"
                className="text-[13px] text-muted/60 cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </motion.div>

            {/* Submit */}
            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 text-[14px] font-semibold bg-primary hover:bg-primary-light text-white rounded-xl transition-all duration-300 animate-glow group"
              >
                Sign In
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-[13px] text-muted/50">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary/80 hover:text-primary font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </motion.div>

          {/* Terms */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-[11px] text-muted/30 text-center leading-relaxed"
          >
            By signing in, you agree to our{" "}
            <a href="#" className="text-muted/50 hover:text-cream transition-colors underline underline-offset-2">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-muted/50 hover:text-cream transition-colors underline underline-offset-2">
              Privacy Policy
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
