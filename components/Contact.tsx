"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { contact } from "@/data/content";
import MagneticButton from "./MagneticButton";

type FormStatus = "idle" | "loading" | "success" | "error";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent transition-colors duration-200";

  return (
    <section id="contact" className="bg-dark py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <div>
            <motion.p
              className="text-accent text-xs font-medium tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.5 }}
            >
              Get in touch
            </motion.p>
            <motion.h2
              className="font-display font-extrabold text-white leading-none tracking-tight mb-8"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.45, ease }}
            >
              {contact.heading}
            </motion.h2>
            <motion.p
              className="text-white/50 text-base mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.4, ease, delay: 0.2 }}
            >
              {contact.subtext}
            </motion.p>
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <p className="text-white/40 text-sm">{contact.email}</p>
              <p className="text-white/40 text-sm">{contact.location}</p>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{ duration: 0.45, ease, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputBase}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputBase}
              />
            </div>

            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className={`${inputBase} appearance-none`}
            >
              <option value="" disabled>
                Service you need
              </option>
              {contact.services.map((s) => (
                <option key={s} value={s} className="bg-dark text-white">
                  {s}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Tell us about your project"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`${inputBase} resize-none`}
            />

            <div className="flex items-center gap-6">
              <MagneticButton>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex items-center gap-3 bg-accent text-dark font-display font-bold text-sm px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Send message"}
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </button>
              </MagneticButton>

              {status === "success" && (
                <motion.p
                  className="text-accent text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Message sent — we'll be in touch!
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  className="text-red-400 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Something went wrong. Try again.
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
