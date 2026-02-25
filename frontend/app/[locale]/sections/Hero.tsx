"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const floatingAvatars = [
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", style: "top-[15%] left-[8%]", delay: 0 },
  { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", style: "top-[20%] right-[12%]", delay: 0.2 },
  { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", style: "bottom-[25%] left-[5%]", delay: 0.4 },
  { img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", style: "top-[40%] right-[8%]", delay: 0.6 },
];

export default function Hero() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );

      // Floating avatars animation
      gsap.utils.toArray<HTMLElement>(".floating-avatar").forEach((el, i) => {
        gsap.to(el, {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          rotation: "random(-5, 5)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-50/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-sky-50/50 to-transparent" />
      </div>

      {/* Floating Avatars */}
      {floatingAvatars.map((avatar, index) => (
        <div
          key={index}
          className={`floating-avatar absolute ${avatar.style} w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white shadow-xl z-10 hidden md:block`}
        >
          <Image
            src={avatar.img}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      ))}

      {/* Purple Shape Badge */}
      <div className="floating-avatar absolute top-[35%] left-[15%] w-24 h-24 bg-purple-500 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] flex items-center justify-center shadow-lg hidden lg:flex">
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      {/* Yellow Star Badge */}
      <div className="floating-avatar absolute top-[25%] right-[20%] w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg rotate-12 hidden lg:flex">
        <Sparkles className="w-8 h-8 text-white" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={titleRef} className="opacity-0">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            <span className="inline-block">{t("title1")}</span>
            <br />
            <span className="inline-flex items-center gap-2">
              {t("title2")}
              {/* Avatar in text */}
              <span className="inline-block w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg relative">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </span>
            </span>
            <br />
            <span className="inline-flex items-center gap-2">
              {/* Purple Badge in text */}
              <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-purple-500 rounded-[40%_60%_60%_40%/60%_40%_60%_40%] shadow-lg">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              {t("title3")}
            </span>
          </h1>
        </div>
      </div>

    </section>
  );
}
