"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Testimonials() {
  return (
    <section className="bg-light py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          className="font-display font-extrabold text-dark leading-none tracking-tight mb-16"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.45, ease }}
        >
          {testimonials.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dark/10">
          {testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              className="bg-light p-10 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 0.4, ease, delay: i * 0.12 }}
            >
              <span className="font-display text-accent text-5xl leading-none mb-6">"</span>
              <p className="text-dark text-base leading-relaxed flex-1 mb-8">{item.quote}</p>
              <div className="border-t border-dark/10 pt-6">
                <p className="font-display font-bold text-dark text-sm">{item.author}</p>
                <p className="text-dark/50 text-xs mt-1">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
