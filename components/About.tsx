"use client";

import { motion } from "framer-motion";
import { about } from "@/data/content";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function About() {
  return (
    <section id="about" className="bg-dark py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
          <div>
            <motion.p
              className="text-accent text-xs font-medium tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.5 }}
            >
              Who we are
            </motion.p>
            <motion.h2
              className="font-display font-extrabold text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.45, ease }}
            >
              {about.heading}
            </motion.h2>
          </div>

          <motion.p
            className="text-white/60 text-lg leading-relaxed self-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{ duration: 0.45, ease, delay: 0.2 }}
          >
            {about.story}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {about.team.map((member, i) => (
            <motion.div
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 0.4, ease, delay: i * 0.1 }}
            >
              <div className="aspect-square bg-white/5 rounded-sm mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="flex items-center justify-center h-full">
                  <span className="font-display font-bold text-white/20 text-5xl">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              </div>
              <h3 className="font-display font-semibold text-white text-sm">{member.name}</h3>
              <p className="text-white/40 text-xs mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
