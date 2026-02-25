"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import ContactModal from "./components/ContactModal";
import ToastProvider from "./components/ToastProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Team from "./sections/Team";
import Achievements from "./sections/Achievements";
import Projects from "./sections/Projects";
import Events from "./sections/Events";
import Gallery from "./sections/Gallery";
import Blog from "./sections/Blog";
import Testimonials from "./sections/Testimonials";
import Alumni from "./sections/Alumni";
import Partners from "./sections/Partners";
import FAQ from "./sections/FAQ";
import Registration from "./sections/Registration";
import Contact from "./sections/Contact";
import Merchandise from "./sections/Merchandise";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    // Contact modal trigger
    const handleContactClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const contactBtn = target.closest('[data-contact]');
      if (contactBtn) {
        e.preventDefault();
        setIsContactOpen(true);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("click", handleContactClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("click", handleContactClick);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <SmoothScroll>
      <main className="relative overflow-hidden bg-white">
        <ScrollProgress />
        <ToastProvider />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        
        <Navbar />
        <Hero />
        <About />
        <Team />
        <Achievements />
        <Projects />
        <Events />
        <Gallery />
        <Blog />
        <Testimonials />
        <Alumni />
        <Partners />
        <Merchandise />
        <FAQ />
        <Registration />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
