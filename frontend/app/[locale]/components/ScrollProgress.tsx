"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Progress circle
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate stroke dash offset for circle progress
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-purple-500 to-yellow-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Back to Top Button with Circular Progress */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 group"
            aria-label="Back to top"
          >
            {/* Circular Progress SVG */}
            <div className="relative w-14 h-14">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
                {/* Background circle */}
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-100"
                />
              </svg>
              
              {/* Center button */}
              <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center group-hover:bg-sky-500 transition-colors shadow-lg">
                <svg
                  className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
            </div>

            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Back to top
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
