"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-surface/20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl border border-edge/40"
        >
          <div className="absolute inset-0 bg-void" />
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/[0.05] rounded-full blur-[100px] animate-drift" />
          <div className="absolute bottom-0 right-1/3 w-60 h-60 bg-accent/[0.03] rounded-full blur-[80px] animate-drift-slow" />

          <div className="relative text-center py-16 lg:py-20 px-8 lg:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl lg:text-4xl font-bold text-cream mb-5"
            >
              Ready to See What You&apos;ve Been Missing?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted text-[15px] max-w-lg mx-auto mb-10 leading-relaxed"
            >
              Start analyzing your store traffic today. Free setup, no credit
              card required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/signup"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold bg-primary hover:bg-primary-light text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#product"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium border border-edge/50 hover:border-muted/30 text-cream rounded-xl transition-all duration-300 hover:bg-surface/30"
              >
                See the Dashboard
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
