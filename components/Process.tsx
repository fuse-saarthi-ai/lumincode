"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { process } from "@/data/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const x = useTransform<number, string>(smoothProgress, [0, 1], ["0vw", "-225vw"]);

  // Active step index (0-based)
  const activeStepValue = useTransform<number, number>(
    scrollYProgress,
    (v) => Math.min(Math.floor(v * process.steps.length), process.steps.length - 1)
  );

  return (
    <>
      {/* ── Desktop: scroll-linked horizontal track ── */}
      <section
        ref={containerRef}
        className="relative bg-dark hidden md:block"
        style={{ height: "320vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-12 pt-28 pb-10 flex items-end justify-between shrink-0">
            <div>
              <motion.p
                className="text-accent text-xs font-medium tracking-[0.3em] uppercase mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Our process
              </motion.p>
              <motion.h2
                className="font-display font-extrabold text-white leading-none tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease }}
              >
                {process.heading}
              </motion.h2>
            </div>

            <StepCounter activeStep={activeStepValue} total={process.steps.length} />
          </div>

          {/* Horizontal track */}
          <div className="flex-1 flex items-center overflow-hidden px-12">
            <motion.div className="flex items-stretch gap-0" style={{ x }}>
              {process.steps.map((step, i) => (
                <HorizontalStepCard key={step.number} step={step} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Progress ticks */}
          <div className="px-12 pb-10 shrink-0 flex gap-2">
            {process.steps.map((_, i) => (
              <ProgressTick
                key={i}
                index={i}
                activeStep={activeStepValue}
                total={process.steps.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile: vertical stack ── */}
      <section className="bg-dark py-24 px-6 md:hidden">
        <motion.p
          className="text-accent text-xs font-medium tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our process
        </motion.p>
        <motion.h2
          className="font-display font-extrabold text-white leading-none tracking-tight mb-16"
          style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
        >
          {process.heading}
        </motion.h2>
        <div className="flex flex-col border-t border-white/10">
          {process.steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="border-b border-white/10 py-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px 0px" }}
              transition={{ duration: 0.4, ease, delay: i * 0.08 }}
            >
              <span className="font-display text-xs font-bold tracking-[0.2em] text-accent/50 uppercase block mb-4">
                {step.number}
              </span>
              <h3 className="font-display font-bold text-white text-2xl mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

function HorizontalStepCard({
  step,
  index,
}: {
  step: (typeof process.steps)[0];
  index: number;
}) {
  return (
    <div
      className="shrink-0 flex flex-col justify-end border-r border-white/10 pr-16 mr-16"
      style={{ width: "75vw" }}
    >
      <div className="max-w-lg">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-display text-xs font-bold tracking-[0.25em] text-accent/50 uppercase">
            {step.number}
          </span>
          {index < process.steps.length - 1 && (
            <div className="flex-1 h-[1px] bg-white/10" />
          )}
        </div>
        <h3
          className="font-display font-bold text-white leading-tight mb-5"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          {step.title}
        </h3>
        <p
          className="text-white/50 leading-relaxed"
          style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

function StepCounter({
  activeStep,
  total,
}: {
  activeStep: MotionValue<number>;
  total: number;
}) {
  const [display, setDisplay] = useState(1);

  useMotionValueEvent(activeStep, "change", (v) => {
    setDisplay(Math.min(v + 1, total));
  });

  return (
    <p className="font-display font-bold text-white/20 text-sm tabular-nums">
      0{display} / 0{total}
    </p>
  );
}

function ProgressTick({
  index,
  activeStep,
  total,
}: {
  index: number;
  activeStep: MotionValue<number>;
  total: number;
}) {
  const [active, setActive] = useState(false);

  useMotionValueEvent(activeStep, "change", (v) => {
    setActive(Math.min(v, total - 1) >= index);
  });

  return (
    <motion.div
      className="flex-1 h-[2px] rounded-full"
      animate={{ backgroundColor: active ? "#e8ff47" : "rgba(255,255,255,0.1)" }}
      transition={{ duration: 0.3 }}
    />
  );
}
