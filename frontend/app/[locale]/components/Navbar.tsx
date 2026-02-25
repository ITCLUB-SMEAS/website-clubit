"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingBag, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/config";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t("home"), href: "#home", id: "home" },
    { name: t("about"), href: "#about", id: "about" },
    { name: t("team"), href: "#team", id: "team" },
    { name: t("projects"), href: "#projects", id: "projects" },
    { name: t("gallery"), href: "#gallery", id: "gallery" },
    { name: t("blog"), href: "#blog", id: "blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy — update active section based on viewport
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ESC key closes mobile menu and lang dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsLangOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside closes lang dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsLangOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                IT Club
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative font-medium transition-colors text-sm ${
                      isActive ? "text-sky-600" : "text-slate-600 hover:text-slate-900"
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-500 rounded-full"
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Cart, Language & CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <motion.button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  aria-label="Switch language"
                  aria-expanded={isLangOpen}
                  aria-haspopup="listbox"
                  className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium"
                  whileHover={{ y: -2 }}
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span className="uppercase">{locale}</span>
                </motion.button>
                
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 py-1 bg-white rounded-xl shadow-lg border border-slate-100 min-w-[100px]"
                    >
                      {routing.locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => switchLocale(loc)}
                          className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-slate-50 transition-colors ${
                            loc === locale ? "text-sky-600 bg-sky-50" : "text-slate-700"
                          }`}
                        >
                          {loc === "en" ? "English" : "Bahasa Indonesia"}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.a
                href="#merchandise"
                className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </motion.a>
              <motion.a
                href="#register"
                className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("register")}
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 pt-24"
            >
              <div className="flex flex-col gap-4">
                {/* Language Switcher Mobile */}
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                  <Globe className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-500">Language:</span>
                  <div className="flex gap-2">
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                          loc === locale 
                            ? "bg-sky-500 text-white" 
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {loc === "en" ? "EN" : "ID"}
                      </button>
                    ))}
                  </div>
                </div>

                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-bold py-2 border-b border-slate-100 ${
                        isActive ? "text-sky-600" : "text-slate-900"
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
                <motion.a
                  href="#merchandise"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-slate-100"
                >
                  <span className="text-lg font-bold text-slate-900">Cart</span>
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">0</span>
                </motion.a>
                <motion.a
                  href="#register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-full font-bold"
                >
                  {t("register")}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
