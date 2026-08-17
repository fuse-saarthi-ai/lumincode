"use client";

import { motion } from "framer-motion";
import { marquee } from "@/data/content";

export default function Marquee() {
  return (
    <div className="bg-dark border-y border-white/10 py-5 overflow-hidden select-none">
      <div className="flex">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="flex shrink-0 items-center gap-12 pr-12"
            animate={{ x: [0, "-100%"] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {marquee.items.map((item, idx) => (
              <span
                key={`${i}-${idx}`}
                className="font-display font-semibold text-sm tracking-widest text-white/25 uppercase whitespace-nowrap"
              >
                {item}
                <span className="mx-8 text-accent opacity-60">·</span>
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
