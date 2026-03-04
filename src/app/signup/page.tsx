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
  User,
  Building2,
  Check,
} from "lucide-react";

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
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

/* ─── Visual: Animated Stats Grid ─── */
const statsData = [
  { label: "Stores Active", value: "2,400+", color: "text-cream" },
  { label: "Zones Tracked", value: "100K+", color: "text-primary" },
  { label: "Detection Rate", value: "99.2%", color: "text-cream" },
  { label: "Avg Revenue Lift", value: "+47%", color: "text-primary" },
];

const featureChecks = [
  "Real-time heatmap analytics",
  "AI-powered layout insights",
  "Unlimited session uploads",
  "Team collaboration tools",
];

/* ─── Heatmap for visual ─── */
function generateHeatCells() {
  const cells = [];
  const hotspots = [
    { x: 3, y: 1, radius: 3, intensity: 0.95 },
    { x: 6, y: 4, radius: 2.8, intensity: 0.85 },
    { x: 1, y: 6, radius: 2.2, intensity: 0.7 },
    { x: 5, y: 7, radius: 2.5, intensity: 0.65 },
  ];
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 8; col++) {
      let heat = 0;
      for (const spot of hotspots) {
        const dist = Math.sqrt((col - spot.x) ** 2 + (row - spot.y) ** 2);
        heat += Math.max(0, spot.intensity * (1 - dist / spot.radius));
      }
      heat = Math.min(1, heat + Math.random() * 0.06);
      cells.push({ heat: Math.max(0.02, heat), delay: (row + col) * 0.03 });
    }
  }
  return cells;
}

function getCellColor(heat: number): string {
  if (heat > 0.7) return `rgba(244, 63, 94, ${0.5 + heat * 0.4})`;
  if (heat > 0.4) return `rgba(244, 63, 94, ${0.15 + heat * 0.3})`;
  if (heat > 0.15) return `rgba(148, 163, 184, ${0.08 + heat * 0.18})`;
  return `rgba(148, 163, 184, 0.04)`;
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

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const cells = useMemo(() => generateHeatCells(), []);

  return (
    <div className="min-h-screen bg-void flex">
      {/* ─── Left: Visual Panel ─── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-1/4 -right-10 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[120px] animate-drift" />
          <div className="absolute top-1/3 -left-10 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] animate-drift-slow" />
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
          <div className="flex-1 flex items-center justify-center py-10">
            <div className="w-full max-w-lg space-y-8">
              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <p className="text-[11px] font-medium text-primary/80 uppercase tracking-[0.25em] mb-3">
                  Start Free Today
                </p>
                <h2 className="text-3xl xl:text-[36px] font-bold text-cream leading-tight mb-3">
                  Turn foot traffic into
                  <br />
                  <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent animate-shimmer">
                    revenue growth
                  </span>
                </h2>
                <p className="text-[15px] text-muted leading-relaxed max-w-md">
                  Join 2,400+ retail stores using AI-powered heatmap analytics
                  to optimize layouts and boost sales.
                </p>
              </motion.div>

              {/* Mini heatmap preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-elevated/40 backdrop-blur border border-edge/40 rounded-xl p-4 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    <span className="text-[12px] font-medium text-cream/80">
                      Sample Store Heatmap
                    </span>
                  </div>
                  <span className="text-[10px] text-muted/40 font-mono">
                    10x8 Grid
                  </span>
                </div>
                <div className="grid grid-cols-8 gap-[2px]">
                  {cells.map((cell, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.9 + cell.delay }}
                      className="aspect-square rounded-[2px]"
                      style={{ backgroundColor: getCellColor(cell.heat) }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Stats grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-2 gap-3"
              >
                {statsData.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                    className="px-4 py-3 rounded-xl bg-void/30 border border-edge/20"
                  >
                    <p className="text-[10px] text-muted/50 mb-0.5">
                      {stat.label}
                    </p>
                    <p className={`text-lg font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Feature checklist */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="space-y-2.5"
              >
                {featureChecks.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.3 + i * 0.08 }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-[13px] text-muted/70">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom trust signal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="border-t border-edge/30 pt-6"
          >
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {["SB", "MC", "DO", "JK"].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 border-2 border-surface flex items-center justify-center"
                    style={{ zIndex: 4 - i }}
                  >
                    <span className="text-[9px] font-bold text-primary/80">
                      {initials}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[13px] font-medium text-cream">
                  Trusted by 2,400+ stores
                </p>
                <p className="text-[11px] text-muted/50">
                  Join retail leaders worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Right: Signup Form ─── */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center px-6 py-10 lg:px-12 xl:px-20 relative">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-void lg:bg-transparent overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px]" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <motion.div variants={itemVariants} className="lg:hidden mb-8">
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
              className="inline-flex items-center gap-1.5 text-[12px] text-muted/50 hover:text-cream transition-colors mb-7 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-7">
            <h1 className="text-[28px] lg:text-[32px] font-bold text-cream leading-tight mb-2">
              Create your account
            </h1>
            <p className="text-[15px] text-muted leading-relaxed">
              Start your free 14-day trial. No credit card required.
            </p>
          </motion.div>

          {/* Social buttons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-3 mb-5"
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
            className="flex items-center gap-4 mb-5"
          >
            <div className="flex-1 h-px bg-edge/40" />
            <span className="text-[11px] text-muted/40 uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-edge/40" />
          </motion.div>

          {/* Form */}
          <form className="space-y-3.5">
            {/* Name row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3"
            >
              <div>
                <label className="block text-[12px] font-medium text-muted/70 mb-1.5 uppercase tracking-wider">
                  First name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-surface/50 border border-edge/40 rounded-xl pl-11 pr-4 py-3 text-[14px] text-cream placeholder:text-muted/30 focus:outline-none focus:border-primary/40 focus:bg-surface/80 focus:ring-1 focus:ring-primary/10 transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-muted/70 mb-1.5 uppercase tracking-wider">
                  Last name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-surface/50 border border-edge/40 rounded-xl pl-4 pr-4 py-3 text-[14px] text-cream placeholder:text-muted/30 focus:outline-none focus:border-primary/40 focus:bg-surface/80 focus:ring-1 focus:ring-primary/10 transition-all duration-200"
                  />
                </div>
              </div>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants}>
              <label className="block text-[12px] font-medium text-muted/70 mb-1.5 uppercase tracking-wider">
                Company name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                <input
                  type="text"
                  placeholder="Your store or company"
                  className="w-full bg-surface/50 border border-edge/40 rounded-xl pl-11 pr-4 py-3 text-[14px] text-cream placeholder:text-muted/30 focus:outline-none focus:border-primary/40 focus:bg-surface/80 focus:ring-1 focus:ring-primary/10 transition-all duration-200"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-[12px] font-medium text-muted/70 mb-1.5 uppercase tracking-wider">
                Work email
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
              <label className="block text-[12px] font-medium text-muted/70 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
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

            {/* Confirm Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-[12px] font-medium text-muted/70 mb-1.5 uppercase tracking-wider">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  className="w-full bg-surface/50 border border-edge/40 rounded-xl pl-11 pr-12 py-3 text-[14px] text-cream placeholder:text-muted/30 focus:outline-none focus:border-primary/40 focus:bg-surface/80 focus:ring-1 focus:ring-primary/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted/40 hover:text-cream transition-colors"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Terms checkbox */}
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-2.5 pt-1"
            >
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-0.5 rounded border-edge/50 bg-surface/50 text-primary focus:ring-primary/20 focus:ring-offset-0 accent-primary"
              />
              <label
                htmlFor="terms"
                className="text-[12px] text-muted/50 leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-muted/70 hover:text-cream transition-colors underline underline-offset-2"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-muted/70 hover:text-cream transition-colors underline underline-offset-2"
                >
                  Privacy Policy
                </a>
              </label>
            </motion.div>

            {/* Submit */}
            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 text-[14px] font-semibold bg-primary hover:bg-primary-light text-white rounded-xl transition-all duration-300 animate-glow group"
              >
                Create Account
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-7 text-center">
            <p className="text-[13px] text-muted/50">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary/80 hover:text-primary font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
