"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, Cpu, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Footage",
    description:
      "Drop in your store surveillance video. We handle all major formats — no preprocessing needed. Your data stays encrypted end-to-end.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Processes In Real-Time",
    description:
      "YOLOv8 detects every person. DeepSORT tracks their path. Our engine generates a precision heatmap frame by frame, streamed live to your dashboard.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Act on the Insights",
    description:
      "Get zone-level analytics, AI-generated recommendations, and historical comparisons. Optimize layouts, measure impact, and grow revenue.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="process" ref={ref} className="py-24 lg:py-32 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-[11px] font-medium text-primary/80 uppercase tracking-[0.25em] mb-4">
            How It Works
          </p>
          <h2 className="text-3xl lg:text-[40px] font-bold text-cream leading-tight mb-5">
            From Footage to Insights in Minutes
          </h2>
        </motion.div>

        <div className="space-y-5 lg:space-y-6 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative flex gap-5 lg:gap-6 p-6 lg:p-8 rounded-xl border border-edge/40 bg-void/40 hover:border-primary/15 transition-all duration-500"
            >
              <div className="shrink-0">
                <div className="relative w-14 h-14 rounded-xl bg-primary/[0.07] border border-primary/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary/80" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-[11px] font-bold text-white flex items-center justify-center shadow-md shadow-primary/30">
                    {step.step}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cream mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
