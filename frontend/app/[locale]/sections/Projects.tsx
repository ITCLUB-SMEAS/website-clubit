"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Eye,
  ChevronLeft,
  ChevronRight,
  Code2,
  Layers,
  Zap,
  ArrowUpRight,
  X,
  Play,
  Info,
  Calendar,
  Users,
  Clock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Tech Stack dengan icon dan warna
const techStack = {
  React: { color: "#61DAFB", icon: "⚛️", bg: "bg-cyan-100" },
  "Next.js": { color: "#000000", icon: "▲", bg: "bg-slate-100" },
  "Node.js": { color: "#339933", icon: "🟢", bg: "bg-green-100" },
  TypeScript: { color: "#3178C6", icon: "📘", bg: "bg-blue-100" },
  Tailwind: { color: "#06B6D4", icon: "🌊", bg: "bg-cyan-100" },
  MongoDB: { color: "#47A248", icon: "🍃", bg: "bg-green-100" },
  PostgreSQL: { color: "#336791", icon: "🐘", bg: "bg-blue-100" },
  Python: { color: "#3776AB", icon: "🐍", bg: "bg-blue-100" },
  TensorFlow: { color: "#FF6F00", icon: "🔶", bg: "bg-orange-100" },
  Flutter: { color: "#02569B", icon: "💙", bg: "bg-blue-100" },
  Firebase: { color: "#FFCA28", icon: "🔥", bg: "bg-yellow-100" },
  AWS: { color: "#FF9900", icon: "☁️", bg: "bg-orange-100" },
};

const projects = [
  {
    id: 1,
    title: "E-Learning Platform",
    description: "A comprehensive online learning platform with video courses, interactive quizzes, and real-time progress tracking. Built with scalability in mind.",
    shortDesc: "Online learning platform with video courses and quizzes",
    images: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200",
    ],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind"],
    githubUrl: "https://github.com/itclub/elearning",
    demoUrl: "https://elearning.itclub.com",
    featured: true,
    stats: { stars: 245, forks: 67, views: "12.5k" },
    year: "2024",
    duration: "3 months",
    team: ["Ahmad Rizki", "Sarah Chen", "Budi Santoso"],
    highlights: [
      "Real-time video streaming with adaptive bitrate",
      "AI-powered quiz generation",
      "Gamification system with badges and leaderboards",
      "Mobile-responsive PWA",
    ],
  },
  {
    id: 2,
    title: "Smart Campus App",
    description: "Mobile application for campus navigation, schedule management, and facility booking. Features indoor maps and AR navigation.",
    shortDesc: "Campus navigation app with AR and indoor maps",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200",
    ],
    tech: ["Flutter", "Firebase", "Google Maps API", "TensorFlow"],
    githubUrl: "https://github.com/itclub/smartcampus",
    demoUrl: "https://smartcampus.itclub.com",
    featured: true,
    stats: { stars: 189, forks: 45, views: "8.2k" },
    year: "2024",
    duration: "4 months",
    team: ["Fajar Pratama", "Dewi Putri"],
    highlights: [
      "AR navigation using ARCore/ARKit",
      "Indoor positioning system",
      "Real-time facility booking",
      "Offline-first architecture",
    ],
  },
  {
    id: 3,
    title: "AI Chat Assistant",
    description: "An intelligent chatbot powered by machine learning for student support, answering FAQs, and providing academic guidance.",
    shortDesc: "AI-powered chatbot for student support",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200",
    ],
    tech: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/itclub/aichat",
    demoUrl: "https://aichat.itclub.com",
    featured: false,
    stats: { stars: 312, forks: 89, views: "15.7k" },
    year: "2023",
    duration: "5 months",
    team: ["Budi Santoso", "Lisa Anggraini"],
    highlights: [
      "Natural language processing with BERT",
      "Multi-language support",
      "Context-aware responses",
      "Integration with university systems",
    ],
  },
  {
    id: 4,
    title: "Inventory Management",
    description: "Web-based system for tracking and managing school inventory and assets with barcode scanning and automated reports.",
    shortDesc: "Inventory tracking system with barcode scanning",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    githubUrl: "https://github.com/itclub/inventory",
    demoUrl: "https://inventory.itclub.com",
    featured: false,
    stats: { stars: 156, forks: 34, views: "6.8k" },
    year: "2023",
    duration: "2 months",
    team: ["Dimas Setiawan"],
    highlights: [
      "Barcode and QR code scanning",
      "Automated email notifications",
      "Role-based access control",
      "Export to PDF and Excel",
    ],
  },
  {
    id: 5,
    title: "Health Tracker",
    description: "Personal health monitoring application with workout plans, nutrition tracking, and health analytics dashboard.",
    shortDesc: "Health monitoring app with workout and nutrition tracking",
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200",
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200",
    ],
    tech: ["React Native", "Node.js", "Firebase", "TensorFlow"],
    githubUrl: "https://github.com/itclub/healthtracker",
    demoUrl: "https://health.itclub.com",
    featured: false,
    stats: { stars: 203, forks: 56, views: "9.1k" },
    year: "2023",
    duration: "6 months",
    team: ["Rina Kusuma", "Ahmad Rizki"],
    highlights: [
      "Wearable device integration",
      "AI workout recommendations",
      "Nutrition analysis with camera",
      "Social challenges and sharing",
    ],
  },
  {
    id: 6,
    title: "Event Management",
    description: "Platform for organizing and managing school events, registrations, and ticketing with payment integration.",
    shortDesc: "Event management platform with ticketing",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200",
    ],
    tech: ["Next.js", "Prisma", "Stripe", "Tailwind"],
    githubUrl: "https://github.com/itclub/events",
    demoUrl: "https://events.itclub.com",
    featured: false,
    stats: { stars: 178, forks: 42, views: "7.5k" },
    year: "2023",
    duration: "3 months",
    team: ["Sarah Chen", "Dimas Setiawan"],
    highlights: [
      "Stripe payment integration",
      "QR code check-in system",
      "Real-time attendance tracking",
      "Email and SMS notifications",
    ],
  },
];

// 3D Tilt Card Component
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Project Card Component
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const t = useTranslations("projects");
  const [currentImage, setCurrentImage] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <>
      <TiltCard className="h-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 h-full flex flex-col"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Image Gallery */}
          <div className="relative h-56 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={project.images[currentImage]}
                alt={project.title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Image Navigation */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImage(i);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentImage ? "bg-white w-4" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <Star className="w-3.5 h-3.5 fill-current" />
                {t("featured")}
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-sky-500 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project.shortDesc}</p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.slice(0, 4).map((tech) => (
                <div
                  key={tech}
                  className="relative"
                  onMouseEnter={() => setHoveredTech(tech)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      techStack[tech as keyof typeof techStack]?.bg || "bg-slate-100"
                    } text-slate-700 cursor-help transition-transform hover:scale-105`}
                  >
                    <span>{techStack[tech as keyof typeof techStack]?.icon || "💻"}</span>
                    {tech}
                  </span>
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredTech === tech && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg whitespace-nowrap z-10"
                      >
                        {tech}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {project.tech.length > 4 && (
                <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>

            {/* GitHub Stats */}
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {project.stats.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {project.stats.forks}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {project.stats.views}
              </span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDetail(true)}
                className="flex-1 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Info className="w-4 h-4" />
                {t("details")}
              </button>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                {t("liveDemo")}
              </a>
            </div>
          </div>
        </motion.div>
      </TiltCard>

      {/* Detail Modal - Rendered via Portal-like behavior */}
      <ProjectModal project={project} isOpen={showDetail} onClose={() => setShowDetail(false)} />
    </>
  );
}

// Separate Modal Component
function ProjectModal({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: typeof projects[0]; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const t = useTranslations("projects");
  const modalContentRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Container - Centered with scroll */}
          <div 
            className="absolute inset-0 flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 overflow-y-auto"
            style={{ overscrollBehavior: 'contain' }}
          >
            <motion.div
              ref={modalContentRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-3xl overflow-hidden w-full max-w-5xl shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero Image */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    {project.featured && (
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                        {t("featuredProject")}
                      </span>
                    )}
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">{project.title}</h2>
                  <p className="text-slate-300 text-base sm:text-lg">{project.shortDesc}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
                  <div className="p-3 sm:p-4 bg-slate-50 rounded-2xl text-center">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mx-auto mb-2" />
                    <p className="text-xl sm:text-2xl font-black text-slate-900">{project.stats.stars}</p>
                    <p className="text-xs sm:text-sm text-slate-500">{t("stars")}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-slate-50 rounded-2xl text-center">
                    <GitFork className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500 mx-auto mb-2" />
                    <p className="text-xl sm:text-2xl font-black text-slate-900">{project.stats.forks}</p>
                    <p className="text-xs sm:text-sm text-slate-500">{t("forks")}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-slate-50 rounded-2xl text-center">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-xl sm:text-2xl font-black text-slate-900">{project.stats.views}</p>
                    <p className="text-xs sm:text-sm text-slate-500">{t("views")}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-slate-50 rounded-2xl text-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-xl sm:text-2xl font-black text-slate-900">{project.duration}</p>
                    <p className="text-xs sm:text-sm text-slate-500">{t("duration")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-sky-500" />
                        {t("aboutProject")}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{project.description}</p>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        {t("keyFeatures")}
                      </h3>
                      <ul className="space-y-3">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                              {i + 1}
                            </span>
                            <span className="text-slate-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Gallery */}
                    {project.images.length > 1 && (
                      <div>
                        <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-purple-500" />
                          {t("gallery")}
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {project.images.map((img, i) => (
                            <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
                              <Image
                                src={img}
                                alt={`${project.title} screenshot ${i + 1}`}
                                fill
                                className="object-cover hover:scale-110 transition-transform"
                                sizes="33vw"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Tech Stack */}
                    <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">
                        {t("techStack")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold ${
                              techStack[tech as keyof typeof techStack]?.bg || "bg-slate-200"
                            } text-slate-700`}
                          >
                            <span className="text-lg">
                              {techStack[tech as keyof typeof techStack]?.icon || "💻"}
                            </span>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Team */}
                    <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {t("team")}
                      </h3>
                      <div className="space-y-2">
                        {project.team.map((member, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold text-sm">
                              {member.charAt(0)}
                            </div>
                            <span className="text-slate-700 font-medium">{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {t("timeline")}
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">{t("year")}</span>
                          <span className="font-bold text-slate-900">{project.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">{t("durationLabel")}</span>
                          <span className="font-bold text-slate-900">{project.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 sm:py-4 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-5 h-5" />
                        {t("viewLiveDemo")}
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 sm:py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <Github className="w-5 h-5" />
                        {t("viewGithub")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-50/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-purple-50/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-bold mb-4"
          >
            {t("badge")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6"
          >
            {t("title").split(" ")[0]} <span className="text-sky-500">{t("title").split(" ").slice(1).join(" ")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <h3 className="text-xl font-black text-slate-900">{t("featured")}</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-sky-500" />
              <h3 className="text-xl font-black text-slate-900">{t("allProjects")}</h3>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
            >
              {t("viewGithub")}
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + featuredProjects.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
