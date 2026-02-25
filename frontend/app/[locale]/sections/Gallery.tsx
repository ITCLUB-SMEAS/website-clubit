"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  ZoomIn,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  Grid3X3,
  Image as ImageIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Extended gallery data
const allGalleryItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200", title: "Web Development Workshop", category: "workshop", size: "large" },
  { id: 2, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800", title: "Hackathon 2024", category: "competition", size: "medium" },
  { id: 3, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", title: "Tech Talk Session", category: "seminar", size: "medium" },
  { id: 4, image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800", title: "Team Building Day", category: "social", size: "small" },
  { id: 5, image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800", title: "AI Workshop", category: "workshop", size: "small" },
  { id: 6, image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200", title: "Coding Competition", category: "competition", size: "large" },
  { id: 7, image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800", title: "Public Speaking Seminar", category: "seminar", size: "medium" },
  { id: 8, image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800", title: "Club Gathering", category: "social", size: "small" },
  { id: 9, image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800", title: "React Advanced Workshop", category: "workshop", size: "medium" },
  { id: 10, image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800", title: "Design Competition", category: "competition", size: "small" },
  { id: 11, image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200", title: "Industry Expert Talk", category: "seminar", size: "large" },
  { id: 12, image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800", title: "Mobile Dev Workshop", category: "workshop", size: "medium" },
];

// Enhanced Lightbox Component
function EnhancedLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: {
  images: { src: string; alt: string; title: string; category: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      setIsFullscreen(false);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          if (isZoomed) {
            setIsZoomed(false);
          } else {
            onClose();
          }
          break;
        case "ArrowLeft":
          if (!isZoomed) onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
          break;
        case "ArrowRight":
          if (!isZoomed) onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case " ":
          e.preventDefault();
          toggleZoom();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, isZoomed, onNavigate, onClose]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Ignore fullscreen errors
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (isZoomed) {
      setZoomPosition({ x: 50, y: 50 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(images[currentIndex].src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${images[currentIndex].title.replace(/\s+/g, "_")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(images[currentIndex].src, "_blank");
    }
  };

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/95"
        >
          {/* Toolbar */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
            <div className="text-white">
              <h3 className="font-bold text-lg">{currentImage.title}</h3>
              <p className="text-sm text-white/70">{currentImage.category}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Zoom Toggle */}
              <button
                onClick={toggleZoom}
                className={`p-2 rounded-full transition-colors ${isZoomed ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"}`}
                title="Zoom (Space)"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              
              {/* Download */}
              <button
                onClick={handleDownload}
                className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
              
              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                title="Fullscreen (F)"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              
              {/* Close */}
              <button
                onClick={onClose}
                className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors ml-2"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-32"
            onClick={() => !isZoomed && onClose()}
          >
            <motion.div
              className={`relative overflow-hidden ${isZoomed ? "cursor-move" : "cursor-zoom-in"}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              onMouseMove={handleMouseMove}
              style={{
                width: isZoomed ? "100%" : "auto",
                height: isZoomed ? "100%" : "auto",
              }}
            >
              <motion.img
                ref={imageRef}
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-full object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transform: isZoomed ? "scale(2.5)" : "scale(1)",
                  transition: "transform 0.3s ease-out",
                }}
                draggable={false}
              />
            </motion.div>
          </div>

          {/* Navigation */}
          {!isZoomed && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Thumbnails */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex justify-center gap-2 max-w-4xl mx-auto overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(index);
                  }}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex
                      ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-black"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
            
            {/* Counter */}
            <div className="text-center text-white/70 text-sm mt-2">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Gallery Card with 3D Tilt
function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: typeof allGalleryItems[0];
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (up to 12 degrees for subtle but noticeable effect)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setTilt({ rotateX, rotateY, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2 h-72 md:h-[600px]",
    medium: "h-72",
    small: "h-56",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={sizeClasses[item.size as keyof typeof sizeClasses] || "h-72"}
    >
      <div
        ref={cardRef}
        className="group relative w-full h-full rounded-2xl cursor-pointer"
        style={{
          perspective: "1000px",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Image */}
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold mb-2">
              {item.category}
            </span>
            <h3 className="text-lg font-bold text-white line-clamp-2">{item.title}</h3>
          </div>

          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
            <ZoomIn className="w-5 h-5 text-white" />
          </div>

          {/* Shine Effect */}
          <div 
            className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              transform: "translateZ(1px)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const t = useTranslations("gallery");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Gallery categories with translation keys
  const categories = [
    { id: "all", label: t("filters.all"), count: 12 },
    { id: "workshop", label: t("filters.workshop"), count: 4 },
    { id: "competition", label: t("filters.competition"), count: 3 },
    { id: "seminar", label: t("filters.seminar"), count: 3 },
    { id: "social", label: t("filters.social"), count: 2 },
  ];

  // Filter items
  const filteredItems = activeCategory === "all" 
    ? allGalleryItems 
    : allGalleryItems.filter(item => item.category === activeCategory);
  
  const displayedItems = filteredItems.slice(0, displayCount);
  const hasMore = displayCount < filteredItems.length;

  // Reset display count when category changes
  useEffect(() => {
    setDisplayCount(6);
  }, [activeCategory]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 3, filteredItems.length));
      setIsLoading(false);
    }, 500);
  };

  // Prepare lightbox images from currently filtered items
  const lightboxImages = filteredItems.map(item => ({
    src: item.image,
    alt: item.title,
    title: item.title,
    category: item.category,
  }));

  return (
    <section id="gallery" ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-50/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-sky-50/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-8">
          <div>
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
              className="text-5xl md:text-6xl font-black text-slate-900 leading-tight"
            >
              {t("title")}
            </motion.h2>
          </div>
          <motion.a 
            href="#" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-sky-600 transition-colors"
          >
            <ImageIcon className="w-5 h-5" />
            {t("viewAll")}
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeCategory === category.id
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              {category.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeCategory === category.id ? "bg-white/20" : "bg-slate-200"
              }`}>
                {category.id === "all" 
                  ? allGalleryItems.length 
                  : allGalleryItems.filter(i => i.category === category.id).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto"
          >
            {displayedItems.map((item, index) => (
              <GalleryCard
                key={`${activeCategory}-${item.id}`}
                item={item}
                index={index}
                onClick={() => openLightbox(filteredItems.findIndex(i => i.id === item.id))}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t("noPhotos")}</h3>
            <p className="text-slate-600">{t("tryDifferent")}</p>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  {t("loading")}
                </>
              ) : (
                <>
                  {t("loadMore")}
                  <span className="text-slate-500">({filteredItems.length - displayCount} {t("remaining")})</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Lightbox */}
      <EnhancedLightbox
        images={lightboxImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
      />
    </section>
  );
}
