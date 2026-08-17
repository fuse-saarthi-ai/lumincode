"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <div style={{ opacity: ready ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Work />
          <Services />
          <Process />
          <WhyUs />
          <About />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
