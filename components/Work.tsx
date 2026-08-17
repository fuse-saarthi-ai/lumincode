"use client";

import { motion } from "framer-motion";
import { work } from "@/data/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Work() {
  return (
    <section className="bg-dark py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <motion.h2
            className="font-display font-extrabold text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{ duration: 0.45, ease }}
          >
            {work.heading}
          </motion.h2>
          <motion.p
            className="text-white/30 text-sm tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            2023 – 2024
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {work.items.map((item, i) => (
            <WorkCard key={item.number} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ item, index }: { item: (typeof work.items)[0]; index: number }) {
  return (
    /* Outer: scroll entrance */
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.5, ease, delay: (index % 2) * 0.1 }}
      className="overflow-hidden rounded-sm"
      style={{ aspectRatio: "4/3" }}
    >
      {/* Inner: hover state owner */}
      <motion.div
        className="relative w-full h-full"
        style={{ backgroundColor: item.bg }}
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Decorative background number */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.6, ease }}
        >
          <span
            className="font-display font-extrabold leading-none"
            style={{ color: item.accent, fontSize: "clamp(8rem, 22vw, 20rem)", opacity: 0.08 }}
          >
            {item.number}
          </span>
        </motion.div>

        {/* Permanent bottom label — fades out on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-7 flex items-end justify-between"
          variants={{ rest: { opacity: 1, y: 0 }, hover: { opacity: 0, y: 8 } }}
          transition={{ duration: 0.25 }}
        >
          <h3
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
          >
            {item.title}
          </h3>
          <span className="text-white/30 text-xs tracking-widest uppercase ml-4 shrink-0">
            {item.category}
          </span>
        </motion.div>

        {/* Hover overlay — slides up from bottom */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-7"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          variants={{ rest: { opacity: 0, y: 16 }, hover: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.35, ease }}
        >
          <p className="text-white/40 text-xs tracking-widest uppercase mb-3">
            {item.category} · {item.year}
          </p>
          <h3
            className="font-display font-bold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
          >
            {item.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
            {item.description}
          </p>
          <span
            className="inline-flex items-center gap-2 text-sm font-display font-medium"
            style={{ color: item.accent }}
          >
            View case study →
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
