"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Dewi Putri",
    role: "Frontend Developer",
    company: "TechCorp Indonesia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    content: "Joining IT Club was the best decision I made in high school. The mentorship and hands-on projects helped me land my first internship at a top tech company.",
    rating: 5,
    memberSince: "2023",
  },
  {
    id: 2,
    name: "Andi Wijaya",
    role: "Software Engineer",
    company: "Gojek",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    content: "IT Club gave me the skills and confidence to pursue computer science in university. The hackathons and workshops were game-changers for my career.",
    rating: 5,
    memberSince: "2022",
  },
  {
    id: 3,
    name: "Maya Sari",
    role: "Product Designer",
    company: "Tokopedia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    content: "The learning environment at IT Club is amazing. From complete beginner to building full-stack applications! The community support is incredible.",
    rating: 5,
    memberSince: "2022",
  },
  {
    id: 4,
    name: "Rizky Pratama",
    role: "Data Scientist",
    company: "Shopee",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    content: "The AI and ML workshops opened my eyes to the world of data science. Now I'm working with machine learning models that impact millions of users.",
    rating: 5,
    memberSince: "2021",
  },
  {
    id: 5,
    name: "Sarah Chen",
    role: "Full Stack Developer",
    company: "Grab",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    content: "What sets IT Club apart is the hands-on approach. We don't just learn theory - we build real projects that solve real problems. Highly recommended!",
    rating: 5,
    memberSince: "2023",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const AUTO_PLAY_INTERVAL = 5000;
  const PROGRESS_INTERVAL = 50;

  const getVisibleIndices = useCallback(() => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const next = (currentIndex + 1) % testimonials.length;
    return [prev, currentIndex, next];
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / (AUTO_PLAY_INTERVAL / PROGRESS_INTERVAL));
      });
    }, PROGRESS_INTERVAL);

    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPaused, nextSlide]);

  const [prevIndex, current, nextIndex] = getVisibleIndices();

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-slate-900 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Quote className="absolute top-20 left-10 w-64 h-64 text-white/[0.02] rotate-12" />
        <Quote className="absolute bottom-20 right-10 w-48 h-48 text-white/[0.02] -rotate-12" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            {t("badge")}
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="relative h-[500px] md:h-[450px]">
          <AnimatePresence mode="popLayout">
            {[prevIndex, current, nextIndex].map((index, position) => {
              const testimonial = testimonials[index];
              const isCenter = position === 1;
              
              let xOffset = "0%";
              let scale = 1;
              let zIndex = 10;
              let opacity = 1;
              let rotateY = 0;
              
              if (position === 0) {
                xOffset = "-70%";
                scale = 0.85;
                zIndex = 5;
                opacity = 0.5;
                rotateY = 25;
              } else if (position === 2) {
                xOffset = "70%";
                scale = 0.85;
                zIndex = 5;
                opacity = 0.5;
                rotateY = -25;
              }

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: xOffset,
                    scale,
                    opacity,
                    rotateY,
                    zIndex,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg ${
                    isCenter ? "cursor-default" : "cursor-pointer"
                  }`}
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => !isCenter && goToSlide(index)}
                >
                  <div
                    className={`bg-white rounded-3xl p-8 md:p-10 shadow-2xl transition-shadow duration-300 ${
                      isCenter ? "shadow-sky-500/20" : ""
                    }`}
                  >
                    <Quote className="absolute -top-4 -left-4 w-12 h-12 text-yellow-400 fill-yellow-400" />
                    
                    <div className="mb-6">
                      <StarRating rating={testimonial.rating} />
                    </div>

                    <p className={`text-slate-700 leading-relaxed mb-8 ${
                      isCenter ? "text-lg md:text-xl" : "text-base line-clamp-4"
                    }`}>
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={isCenter ? 64 : 56}
                          height={isCenter ? 64 : 56}
                          className={`rounded-full object-cover border-4 border-yellow-400 shrink-0 ${isCenter ? "w-16 h-16" : "w-14 h-14"}`}
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-bold text-slate-900 ${
                          isCenter ? "text-xl" : "text-lg"
                        }`}>
                          {testimonial.name}
                        </h4>
                        <p className="text-sky-600 font-medium text-sm">
                          {testimonial.role}
                        </p>
                        <p className="text-slate-400 text-xs mt-0.5">
                          {testimonial.company} • Member since {testimonial.memberSince}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="w-full max-w-md flex items-center gap-3">
            <span className="text-slate-400 text-sm">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-yellow-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0 }}
              />
            </div>
            <span className="text-slate-400 text-sm">
              {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex 
                      ? "bg-yellow-400 w-8" 
                      : "bg-white/30 w-2 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <p className="text-slate-500 text-sm">
            {isPaused ? t("paused") : t("autoPlaying")}
          </p>
        </div>
      </div>
    </section>
  );
}
