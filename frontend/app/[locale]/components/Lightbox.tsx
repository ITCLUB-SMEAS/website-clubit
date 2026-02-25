"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string; title?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const currentImage = images[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          navigatePrev();
          break;
        case "ArrowRight":
          navigateNext();
          break;
        case "+":
        case "=":
          zoomIn();
          break;
        case "-":
          zoomOut();
          break;
        case "0":
          resetZoom();
          break;
      }
    },
    [isOpen, currentIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useBodyScrollLock(isOpen);

  // Reset zoom on close
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  const navigatePrev = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      resetZoom();
    }
  };

  const navigateNext = () => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
      resetZoom();
    }
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse drag for panning when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
            {/* Image Counter */}
            <div className="text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
              {currentImage.title && (
                <span className="ml-4 text-white/70">{currentImage.title}</span>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomOut();
                }}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white text-sm font-medium min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomIn();
                }}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              {/* Download */}
              <a
                href={currentImage.src}
                download
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all ml-2"
                aria-label="Download"
              >
                <Download className="w-5 h-5" />
              </a>

              {/* Close */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all ml-2"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigatePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {currentIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image Container */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            onClick={onClose}
            onWheel={handleWheel}
          >
            <motion.img
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-[90vw] max-h-[85vh] object-contain cursor-grab active:cursor-grabbing"
              style={{
                scale,
                x: position.x,
                y: position.y,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              draggable={false}
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center justify-center gap-2 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(index);
                      resetZoom();
                    }}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      index === currentIndex
                        ? "ring-2 ring-white scale-110"
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
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-xs">
            Use ← → to navigate • +/- to zoom • ESC to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
