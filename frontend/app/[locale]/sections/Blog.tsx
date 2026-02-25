"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  User,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

// Authors data
const authors = {
  budi: {
    name: "Budi Santoso",
    role: "Frontend Lead",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    bio: "React enthusiast & UI/UX lover",
  },
  sarah: {
    name: "Sarah Chen",
    role: "AI Researcher",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    bio: "Machine learning expert & tech writer",
  },
  ahmad: {
    name: "Ahmad Rizki",
    role: "Backend Developer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    bio: "API architect & database guru",
  },
  dewi: {
    name: "Dewi Putri",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    bio: "Design systems & user experience",
  },
};

// Categories with translation keys
const categories = [
  { id: "all", color: "bg-slate-900" },
  { id: "tutorial", color: "bg-sky-500" },
  { id: "ai", color: "bg-purple-500" },
  { id: "backend", color: "bg-green-500" },
  { id: "frontend", color: "bg-orange-500" },
  { id: "career", color: "bg-rose-500" },
];

// Extended blog posts
const allPosts = [
  {
    id: 1,
    title: "Getting Started with React: A Complete Guide for Beginners",
    excerpt: "Learn the fundamentals of React, including components, props, state, and hooks. This comprehensive guide will take you from zero to hero in modern React development.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
    date: "Feb 20, 2025",
    readTime: 8,
    category: "frontend",
    author: "budi",
    tags: ["React", "JavaScript", "Tutorial", "Beginner"],
    featured: true,
  },
  {
    id: 2,
    title: "The Future of AI in Education",
    excerpt: "Exploring how AI is transforming education and technology. From personalized learning to automated grading.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    date: "Feb 18, 2025",
    readTime: 6,
    category: "ai",
    author: "sarah",
    tags: ["AI", "Education", "Machine Learning"],
    featured: false,
  },
  {
    id: 3,
    title: "Building Scalable REST APIs with Node.js",
    excerpt: "Best practices for designing RESTful APIs that can handle millions of requests. Includes caching, rate limiting, and database optimization.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    date: "Feb 15, 2025",
    readTime: 12,
    category: "backend",
    author: "ahmad",
    tags: ["Node.js", "API", "Backend", "Database"],
    featured: false,
  },
  {
    id: 4,
    title: "Mastering Tailwind CSS: Tips and Tricks",
    excerpt: "Advanced techniques to write cleaner, more maintainable CSS with Tailwind. Custom plugins, dark mode, and component extraction.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800",
    date: "Feb 12, 2025",
    readTime: 5,
    category: "frontend",
    author: "budi",
    tags: ["CSS", "Tailwind", "Design"],
    featured: false,
  },
  {
    id: 5,
    title: "Database Design Best Practices",
    excerpt: "How to design efficient databases: normalization, indexing, and query optimization for PostgreSQL and MongoDB.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    date: "Feb 5, 2025",
    readTime: 9,
    category: "backend",
    author: "ahmad",
    tags: ["Database", "PostgreSQL", "MongoDB"],
    featured: false,
  },
  {
    id: 6,
    title: "Creating Accessible Web Applications",
    excerpt: "Why accessibility matters and how to implement ARIA labels, keyboard navigation, and screen reader support.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800",
    date: "Feb 3, 2025",
    readTime: 6,
    category: "frontend",
    author: "dewi",
    tags: ["Accessibility", "A11y", "UX"],
    featured: false,
  },
];

// Tag colors
const tagColors: Record<string, string> = {
  React: "bg-cyan-100 text-cyan-800",
  JavaScript: "bg-yellow-100 text-yellow-800",
  Tutorial: "bg-green-100 text-green-800",
  Beginner: "bg-blue-100 text-blue-800",
  AI: "bg-purple-100 text-purple-800",
  "Machine Learning": "bg-indigo-100 text-indigo-800",
  "Education": "bg-pink-100 text-pink-800",
  "Data Science": "bg-violet-100 text-violet-800",
  "Node.js": "bg-green-100 text-green-800",
  API: "bg-orange-100 text-orange-800",
  Backend: "bg-slate-100 text-slate-800",
  Database: "bg-amber-100 text-amber-800",
  CSS: "bg-sky-100 text-sky-800",
  Tailwind: "bg-cyan-100 text-cyan-800",
  Design: "bg-rose-100 text-rose-800",
  Career: "bg-emerald-100 text-emerald-800",
  Interview: "bg-lime-100 text-lime-800",
  Tips: "bg-teal-100 text-teal-800",
  Python: "bg-blue-100 text-blue-800",
  PostgreSQL: "bg-blue-100 text-blue-800",
  MongoDB: "bg-green-100 text-green-800",
  Accessibility: "bg-red-100 text-red-800",
  A11y: "bg-orange-100 text-orange-800",
  UX: "bg-purple-100 text-purple-800",
};

// Blog Card Component
function BlogCard({
  post,
  index,
  variant = "default",
}: {
  post: typeof allPosts[0];
  index: number;
  variant?: "featured" | "default";
}) {
  const author = authors[post.author as keyof typeof authors];
  const t = useTranslations("blog");

  if (variant === "featured") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group lg:row-span-2 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        {/* Image */}
        <div className="relative h-64 lg:h-80 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
            <Sparkles className="w-3 h-3 inline mr-1" />
            {t("featured")}
          </div>
          

        </div>

        {/* Content */}
        <div className="p-8">
          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-bold">
              {t(`filters.${post.category}`)}
            </span>
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[tag] || "bg-slate-100 text-slate-700"}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors leading-tight">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 mb-6 line-clamp-3">{post.excerpt}</p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            {/* Author */}
            <div className="flex items-center gap-3">
              <Image
                src={author.avatar}
                alt={author.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">{author.name}</p>
                <p className="text-xs text-slate-500">{author.role}</p>
              </div>
            </div>

            {/* Date & Read Time */}
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} {t("readTime")}
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white rounded-2xl overflow-hidden p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative w-full sm:w-40 h-48 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, 160px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col py-1">
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-sky-600 font-bold text-xs">
            {t(`filters.${post.category}`)}
          </span>
          <span className="text-slate-300">|</span>
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tagColors[tag] || "bg-slate-100 text-slate-700"}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-3 flex-1">{post.excerpt}</p>

        {/* Meta Footer */}
        <div className="flex items-center gap-3 mt-auto pt-2">
          <Image
            src={author.avatar}
            alt={author.name}
            width={28}
            height={28}
            className="w-7 h-7 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-700 truncate">{author.name}</p>
            <p className="text-xs text-slate-400">{post.date} · {post.readTime}{t("readTimeShort")}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Blog Modal Component
function BlogModal({
  post,
  isOpen,
  onClose,
}: {
  post: typeof allPosts[0] | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("blog");

  useBodyScrollLock(isOpen);

  if (!post) return null;

  const author = authors[post.author as keyof typeof authors];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="absolute inset-0 flex items-start justify-center p-4 pt-20 sm:pt-24 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative h-64 sm:h-80">
                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="px-3 py-1 bg-sky-500 text-white rounded-full text-xs font-bold">
                    {t(`filters.${post.category}`)}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">{post.title}</h2>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Image src={author.avatar} alt={author.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">{author.name}</p>
                    <p className="text-sm text-slate-500">{author.role} · {post.date}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">{post.excerpt}</p>
                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className={`px-3 py-1 rounded-full text-sm font-medium ${tagColors[tag] || "bg-slate-100 text-slate-700"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Blog() {
  const t = useTranslations("blog");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof allPosts[0] | null>(null);

  // Filter posts
  const filteredPosts = activeCategory === "all"
    ? allPosts
    : allPosts.filter((post) => post.category === activeCategory);

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);
  const displayedPosts = otherPosts.slice(0, displayCount);
  const hasMore = displayCount < otherPosts.length;

  // Reset display count when category changes
  useEffect(() => {
    setDisplayCount(4);
  }, [activeCategory]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 3, otherPosts.length));
      setIsLoading(false);
    }, 500);
  };

  return (
    <section id="blog" ref={sectionRef} className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-rose-50/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-sky-50/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-bold mb-4"
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
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-lg scale-105`
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t(`filters.${category.id}`)}
            </button>
          ))}
        </motion.div>

        {/* Featured Post - Full Width */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div 
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 cursor-pointer"
              onClick={() => setSelectedPost(featuredPost)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                      {t("featured")}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-bold">
                      {t(`filters.${featuredPost.category}`)}
                    </span>
                    {featuredPost.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${tagColors[tag] || "bg-slate-100 text-slate-700"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <Image
                        src={authors[featuredPost.author as keyof typeof authors].avatar}
                        alt={authors[featuredPost.author as keyof typeof authors].name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">
                          {authors[featuredPost.author as keyof typeof authors].name}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {featuredPost.date} · {featuredPost.readTime} {t("readTime")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post, index) => (
            <div key={post.id} onClick={() => setSelectedPost(post)} className="cursor-pointer">
              <BlogCard post={post} index={index} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t("noArticles")}</h3>
            <p className="text-slate-600">{t("tryDifferentCategory")}</p>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors disabled:opacity-50 shadow-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  {t("loading")}
                </>
              ) : (
                <>
                  {t("loadMore")}
                  <span className="text-slate-500">({otherPosts.length - displayCount} {t("remaining")})</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Blog Modal */}
        <BlogModal 
          post={selectedPost} 
          isOpen={!!selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      </div>
    </section>
  );
}
