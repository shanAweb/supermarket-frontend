"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const numbers = [
  { value: 99.2, suffix: "%", prefix: "", label: "Detection Accuracy" },
  { value: 10, suffix: "x", prefix: "", label: "Zone Grid Resolution" },
  { value: 47, suffix: "%", prefix: "", label: "Avg Revenue Uplift" },
  { value: 100, suffix: "ms", prefix: "<", label: "Processing Latency" },
];

function AnimatedNumber({
  value,
  suffix,
  prefix,
  inView,
}: {
  value: number;
  suffix: string;
  prefix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const hasDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span>
      {prefix}
      {hasDecimal ? display.toFixed(1) : Math.floor(display)}
      {suffix}
    </span>
  );
}

export default function ImpactNumbers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-medium text-primary/80 uppercase tracking-[0.25em] mb-4">
            Performance
          </p>
          <h2 className="text-3xl lg:text-[40px] font-bold text-cream leading-tight">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-edge/30 rounded-2xl overflow-hidden border border-edge/30">
          {numbers.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="bg-void p-8 lg:p-10 text-center"
            >
              <p className="text-4xl lg:text-5xl font-bold text-cream mb-2 tabular-nums">
                <AnimatedNumber
                  value={n.value}
                  suffix={n.suffix}
                  prefix={n.prefix}
                  inView={inView}
                />
              </p>
              <p className="text-sm text-muted/60">{n.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
