"use client";

import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { footer } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 px-6 md:px-12 py-16">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <span className="font-display font-bold text-2xl text-white">{footer.logo}</span>
              <p className="text-white/30 text-sm mt-1">{footer.tagline}</p>
            </div>

            <ul className="flex flex-wrap gap-6">
              {footer.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-white/40 text-sm hover:text-white transition-colors duration-200"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-white/20 text-xs">{footer.copyright}</p>
            <p className="text-white/20 text-xs">Built with Next.js · Deployed on Vercel</p>
          </div>
        </SectionReveal>
      </div>
    </footer>
  );
}
