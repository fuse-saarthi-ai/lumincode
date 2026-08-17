"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

// One distinct visual identity per service
const VISUALS = [
  { bg: "#0a0a0a", accent: "#e8ff47", shape: "circle" },
  { bg: "#111827", accent: "#ffffff", shape: "square" },
  { bg: "#1c1917", accent: "#fb923c", shape: "triangle" },
  { bg: "#0f172a", accent: "#38bdf8", shape: "circle" },
  { bg: "#1e1b4b", accent: "#a78bfa", shape: "square" },
  { bg: "#0f1f0f", accent: "#4ade80", shape: "triangle" },
] as const;

export default function Services() {
  const [hovered, setHovered] = useState<number>(0);

  return (
    <section id="services" className="bg-light py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <motion.h2
            className="font-display font-extrabold text-dark leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{ duration: 0.45, ease }}
          >
            {services.heading}
          </motion.h2>
          <motion.p
            className="text-dark/40 text-sm tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            Six disciplines
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 lg:gap-20 items-start">
          {/* Left: numbered list */}
          <div className="border-t border-dark/10">
            {services.items.map((service, i) => (
              <ServiceRow
                key={service.number}
                service={service}
                index={i}
                isActive={hovered === i}
                onEnter={() => setHovered(i)}
              />
            ))}
          </div>

          {/* Right: sticky image panel — desktop only */}
          <div className="hidden lg:block sticky top-28">
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={hovered}
                  className="absolute inset-0 flex flex-col justify-between p-8"
                  style={{ backgroundColor: VISUALS[hovered].bg }}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease }}
                >
                  {/* Abstract shape */}
                  <AbstractShape
                    shape={VISUALS[hovered].shape}
                    accent={VISUALS[hovered].accent}
                    number={services.items[hovered].number}
                  />

                  {/* Service info at bottom */}
                  <div>
                    <p
                      className="font-display text-xs font-bold tracking-[0.2em] uppercase mb-3"
                      style={{ color: VISUALS[hovered].accent, opacity: 0.6 }}
                    >
                      {services.items[hovered].number}
                    </p>
                    <h3
                      className="font-display font-bold leading-tight mb-3"
                      style={{ color: VISUALS[hovered].accent, fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                    >
                      {services.items[hovered].title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: `${VISUALS[hovered].accent}80` }}>
                      {services.items[hovered].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AbstractShape({
  shape,
  accent,
  number,
}: {
  shape: "circle" | "square" | "triangle";
  accent: string;
  number: string;
}) {
  return (
    <div className="flex items-center justify-center flex-1 py-8">
      {shape === "circle" && (
        <div
          className="rounded-full border-2"
          style={{
            width: "180px",
            height: "180px",
            borderColor: `${accent}30`,
            boxShadow: `0 0 80px ${accent}18`,
          }}
        />
      )}
      {shape === "square" && (
        <div
          className="border-2 rotate-12"
          style={{
            width: "160px",
            height: "160px",
            borderColor: `${accent}30`,
          }}
        />
      )}
      {shape === "triangle" && (
        <div
          className="font-display font-extrabold select-none"
          style={{ fontSize: "12rem", lineHeight: 1, color: `${accent}12` }}
        >
          {number}
        </div>
      )}
    </div>
  );
}

function ServiceRow({
  service,
  index,
  isActive,
  onEnter,
}: {
  service: (typeof services.items)[0];
  index: number;
  isActive: boolean;
  onEnter: () => void;
}) {
  return (
    <motion.div
      className="border-b border-dark/10 py-7 flex items-center gap-6 cursor-default"
      onMouseEnter={onEnter}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{ duration: 0.4, ease, delay: index * 0.06 }}
    >
      {/* Number */}
      <motion.span
        className="font-display text-xs font-bold tracking-[0.2em] w-8 shrink-0"
        animate={{ color: isActive ? "#0a0a0a" : "rgba(10,10,10,0.2)" }}
        transition={{ duration: 0.2 }}
      >
        {service.number}
      </motion.span>

      {/* Title */}
      <motion.h3
        className="font-display font-bold text-dark flex-1"
        style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
        animate={{ x: isActive ? 6 : 0, opacity: isActive ? 1 : 0.65 }}
        transition={{ duration: 0.3, ease }}
      >
        {service.title}
      </motion.h3>

      {/* Arrow — appears on active */}
      <motion.span
        className="text-dark font-display text-lg shrink-0"
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
        transition={{ duration: 0.25 }}
      >
        →
      </motion.span>
    </motion.div>
  );
}
