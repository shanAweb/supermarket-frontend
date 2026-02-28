"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Velora transformed how we approach store layout decisions. The heatmap data revealed traffic patterns we never knew existed, leading to a 35% increase in product discovery across all our locations.",
    name: "Marcus Chen",
    role: "Director of Operations",
    company: "Metro Fresh Markets",
    featured: true,
  },
  {
    quote:
      "The real-time analytics capability is a game-changer. We see the impact of display changes within hours instead of weeks. Saves our team countless hours of manual analysis.",
    name: "Sarah Blackwood",
    role: "VP of Retail Strategy",
    company: "NorthStar Grocers",
    featured: false,
  },
  {
    quote:
      "Implementing Velora across 12 locations gave us consistent, comparable data for the first time. The zone comparison feature alone justified the investment.",
    name: "David Okafor",
    role: "Chief Analytics Officer",
    company: "PrimeCart Supermarkets",
    featured: false,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const featured = testimonials.find((t) => t.featured)!;
  const others = testimonials.filter((t) => !t.featured);

  return (
    <section id="testimonials" ref={ref} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[11px] font-medium text-primary/80 uppercase tracking-[0.25em] mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl lg:text-[40px] font-bold text-cream leading-tight">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Featured testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="p-8 lg:p-10 rounded-2xl border border-edge/40 bg-surface/30 flex flex-col justify-between"
          >
            <p className="text-lg lg:text-xl text-cream/90 leading-relaxed mb-8 font-light">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-sm font-semibold text-cream">
                {featured.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-cream">
                  {featured.name}
                </p>
                <p className="text-xs text-muted">
                  {featured.role}, {featured.company}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Other testimonials stacked */}
          <div className="flex flex-col gap-5">
            {others.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + i * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="p-6 rounded-xl border border-edge/40 bg-void/40 flex-1"
              >
                <p className="text-sm text-muted leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-xs font-semibold text-cream">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cream">{t.name}</p>
                    <p className="text-[11px] text-muted">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
