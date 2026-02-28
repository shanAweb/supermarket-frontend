"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const companies = [
  "Metro Fresh",
  "NorthStar Grocers",
  "PrimeCart",
  "Urban Harvest",
  "FreshField Markets",
  "CityGrocer Co.",
  "GreenLeaf Stores",
  "BrightMart",
];

export default function LogoStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="py-14 border-y border-edge/30 overflow-hidden"
    >
      <p className="text-center text-[11px] text-muted/50 uppercase tracking-[0.25em] mb-8">
        Trusted by leading retailers
      </p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...companies, ...companies].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-10 lg:mx-14 text-lg font-semibold text-muted/20 tracking-tight select-none flex-shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
