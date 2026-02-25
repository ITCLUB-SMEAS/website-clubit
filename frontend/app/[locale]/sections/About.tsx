"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import AnimatedCounter from "../components/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 500, label: t("stats.members"), suffix: "+" },
    { value: 50, label: t("stats.projects"), suffix: "+" },
    { value: 100, label: t("stats.workshops"), suffix: "+" },
    { value: 4, label: t("stats.partners"), suffix: "" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-animate").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(el, 
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: "power3.out" }
            );
          },
          once: true,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Small Label */}
        <div className="about-animate opacity-0 mb-8">
          <span className="text-sky-500 font-bold tracking-wider uppercase text-sm">
            {t("badge")}
          </span>
        </div>

        {/* Big Typography */}
        <div className="about-animate opacity-0 mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            {t("title")}
          </h2>
        </div>

        {/* Description */}
        <div className="about-animate opacity-0 mb-16 max-w-3xl">
          <p className="text-xl text-slate-600 leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* CTA Button */}
        <div className="about-animate opacity-0 mb-20">
          <a
            href="#register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors group"
          >
            {t("cta", { defaultValue: "Join Our Community" })}
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Animated Stats */}
        <div className="about-animate opacity-0 border-t border-slate-100 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-black text-slate-900 mb-2">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    className="text-slate-900"
                  />
                </div>
                <p className="text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
