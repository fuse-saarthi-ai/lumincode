"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { hero } from "@/data/content";
import MagneticButton from "./MagneticButton";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] },
  },
};

const wordVariants: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.55 + 0.04 * i,
    },
  }),
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  let wordIndex = 0;

  return (
    <section className="relative min-h-screen bg-dark flex flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Top rule that draws in — triggers the headline reveal */}
        <div className="overflow-hidden mb-8">
          <div className="flex items-center gap-6">
            <motion.div
              className="h-[1px] bg-white/20 origin-left flex-1"
              variants={lineVariants}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
            />
            <motion.p
              className="text-accent text-xs font-medium tracking-[0.3em] uppercase shrink-0"
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              Digital Studio
            </motion.p>
          </div>
        </div>

        {/* Headline — word-by-word reveal after line draws in */}
        <h1
          className="font-display font-extrabold leading-[0.9] tracking-tight text-white mb-10"
          style={{ fontSize: "clamp(3.2rem, 10vw, 9rem)" }}
        >
          {hero.headline.map((line) => (
            <div key={line} className="flex flex-wrap gap-x-[0.22em] mb-2">
              {line.split(" ").map((word) => {
                const idx = wordIndex++;
                return (
                  <span key={`${line}-${word}-${idx}`} className="inline-block overflow-hidden leading-[1.0]">
                    <motion.span
                      className="inline-block"
                      variants={wordVariants}
                      initial="hidden"
                      animate={mounted ? "visible" : "hidden"}
                      custom={idx}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </div>
          ))}
        </h1>

        {/* Bottom rule + subtext + CTA */}
        <motion.div
          className="h-[1px] bg-white/10 origin-left mb-8"
          initial={{ scaleX: 0 }}
          animate={mounted ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number,number,number,number], delay: 0.85 }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <motion.p
            className="text-white/50 text-lg md:text-xl max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease, delay: 0.9 }}
          >
            {hero.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease, delay: 1.0 }}
          >
            <MagneticButton>
              <a
                href="#contact"
                onClick={handleCTA}
                className="group inline-flex items-center gap-3 bg-accent text-dark font-display font-bold text-base px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
              >
                {hero.cta.label}
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  →
                </motion.span>
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            className="w-[1px] h-10 bg-white/15 origin-top"
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
