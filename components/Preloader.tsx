"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const duration = 1600;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease in-out cubic
      const eased =
        progress < 0.5
          ? 4 * progress ** 3
          : 1 - (-2 * progress + 2) ** 3 / 2;

      setCount(Math.round(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(100);
        // Pause at 100 briefly, then exit
        setTimeout(() => setLeaving(true), 400);
        setTimeout(() => onComplete(), 1400);
      }
    };

    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] bg-dark flex flex-col justify-between p-8 md:p-14"
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Logo */}
          <motion.span
            className="font-display font-bold text-xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Lumin
          </motion.span>

          {/* Counter */}
          <div className="flex items-end justify-between">
            <motion.p
              className="text-white/30 text-sm tracking-[0.2em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading
            </motion.p>

            <motion.div
              className="font-display font-extrabold leading-none text-white tabular-nums"
              style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {count}
              <span className="text-accent">%</span>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <motion.div
              className="h-full bg-accent origin-left"
              style={{ scaleX: count / 100, transformOrigin: "left" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
