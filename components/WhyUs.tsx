"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { whyUs } from "@/data/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function useCounter(end: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [trigger, end, duration]);
  return count;
}

function StatCell({ stat, index }: { stat: { value: string; label: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  // Parse numeric value for animation
  const numMatch = stat.value.match(/[\d.]+/);
  const numericPart = numMatch ? parseFloat(numMatch[0]) : 0;
  const prefix = stat.value.replace(/[\d.]+.*/, "");
  const suffix = stat.value.replace(/^[^0-9]*[\d.]+/, "");
  const isDecimal = stat.value.includes(".");

  const count = useCounter(numericPart, 1.4, inView);
  const displayValue = isDecimal
    ? (count / 10).toFixed(1)
    : `${prefix}${count}${suffix}`;

  return (
    <motion.div
      ref={ref}
      className="bg-light p-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.35, ease, delay: index * 0.1 }}
    >
      <div
        className="font-display font-extrabold text-dark leading-none mb-2"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
      >
        {inView ? displayValue : stat.value}
      </div>
      <div className="text-dark/50 text-sm tracking-wide uppercase">{stat.label}</div>
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    <section className="bg-light py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          className="font-display font-extrabold text-dark leading-none tracking-tight mb-20"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.45, ease }}
        >
          {whyUs.heading}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dark/10 mb-px">
          {whyUs.stats.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <div className="mt-20 flex flex-col border-t border-dark/10">
          {whyUs.statements.map((statement, i) => (
            <motion.div
              key={i}
              className="border-b border-dark/10 py-8 flex items-start gap-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px 0px" }}
              transition={{ duration: 0.4, ease, delay: i * 0.1 }}
            >
              <span className="font-display text-accent text-xl mt-1 shrink-0">—</span>
              <p
                className="font-display font-semibold text-dark leading-snug"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
              >
                {statement}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
