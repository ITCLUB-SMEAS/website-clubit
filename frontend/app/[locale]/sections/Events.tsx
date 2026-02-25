"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowUpRight,
  Users,
  Clock,
  MapPin,
  X,
  ChevronRight,
  Share2,
  Ticket,
  Star,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

// Event categories with colors
const categories = [
  { id: "all", color: "bg-slate-900" },
  { id: "workshop", color: "bg-purple-500" },
  { id: "hackathon", color: "bg-amber-500" },
  { id: "seminar", color: "bg-sky-500" },
  { id: "competition", color: "bg-rose-500" },
];

// Helper function to get category color
const getCategoryColor = (categoryId: string) => {
  return categories.find(c => c.id === categoryId)?.color || "bg-slate-500";
};

// Event data with dates for countdown
const eventsData = [
  {
    id: 1,
    title: "Web Development Workshop",
    date: "2025-03-15",
    displayDate: "March 15, 2025",
    time: "09:00 - 16:00",
    location: "Computer Lab 3",
    participants: 50,
    maxParticipants: 50,
    category: "workshop",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
    description: "Learn modern web development with React, Next.js, and Tailwind CSS. Hands-on coding session with real projects.",
    speaker: {
      name: "Budi Santoso",
      role: "Senior Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    agenda: [
      { time: "09:00", activity: "Opening & Introduction" },
      { time: "10:00", activity: "React Fundamentals" },
      { time: "12:00", activity: "Lunch Break" },
      { time: "13:00", activity: "Next.js Deep Dive" },
      { time: "15:00", activity: "Build Your First App" },
      { time: "16:00", activity: "Closing & Networking" },
    ],
    highlights: ["Certificate of Completion", "Free E-book", "Networking Session"],
  },
  {
    id: 2,
    title: "Hackathon 2025",
    date: "2025-04-05",
    displayDate: "April 5-7, 2025",
    time: "48 Hours",
    location: "Main Auditorium",
    participants: 180,
    maxParticipants: 200,
    category: "hackathon",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    description: "48-hour coding marathon! Build innovative solutions, win prizes, and network with industry professionals.",
    speaker: {
      name: "IT Club Team",
      role: "Organizers",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200",
    },
    agenda: [
      { time: "Day 1", activity: "Opening Ceremony & Team Formation" },
      { time: "Day 1", activity: "Hacking Begins!" },
      { time: "Day 2", activity: "Mentoring Sessions" },
      { time: "Day 3", activity: "Final Presentations" },
      { time: "Day 3", activity: "Awards Ceremony" },
    ],
    highlights: ["Rp 10M Total Prizes", "Mentorship from Experts", "Internship Opportunities"],
  },
  {
    id: 3,
    title: "AI & ML Seminar",
    date: "2025-03-28",
    displayDate: "March 28, 2025",
    time: "13:00 - 17:00",
    location: "Conference Room A",
    participants: 65,
    maxParticipants: 80,
    category: "seminar",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    description: "Explore the world of Artificial Intelligence and Machine Learning. From basics to advanced implementations.",
    speaker: {
      name: "Dr. Sarah Chen",
      role: "AI Researcher",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    agenda: [
      { time: "13:00", activity: "AI Landscape Overview" },
      { time: "14:00", activity: "Machine Learning Basics" },
      { time: "15:00", activity: "Deep Learning Applications" },
      { time: "16:00", activity: "Q&A Session" },
    ],
    highlights: ["Research Insights", "Demo Sessions", "Resource Kit"],
  },
  {
    id: 4,
    title: "UI/UX Design Competition",
    date: "2025-04-20",
    displayDate: "April 20, 2025",
    time: "09:00 - 18:00",
    location: "Design Studio",
    participants: 45,
    maxParticipants: 60,
    category: "competition",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    description: "Showcase your design skills! Create stunning interfaces and compete for the best designer title.",
    speaker: {
      name: "Dewi Putri",
      role: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    },
    agenda: [
      { time: "09:00", activity: "Design Challenge Reveal" },
      { time: "10:00", activity: "Design Sprint Begins" },
      { time: "15:00", activity: "Submission Deadline" },
      { time: "16:00", activity: "Presentations" },
      { time: "18:00", activity: "Winners Announcement" },
    ],
    highlights: ["Design Tools License", "Portfolio Review", "Job Referrals"],
  },
  {
    id: 5,
    title: "Mobile App Development",
    date: "2025-05-10",
    displayDate: "May 10, 2025",
    time: "10:00 - 16:00",
    location: "Computer Lab 2",
    participants: 30,
    maxParticipants: 40,
    category: "workshop",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    description: "Build cross-platform mobile apps with Flutter. One codebase, iOS and Android.",
    speaker: {
      name: "Fajar Pratama",
      role: "Mobile Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
    agenda: [
      { time: "10:00", activity: "Flutter Introduction" },
      { time: "11:00", activity: "Widgets & Layouts" },
      { time: "13:00", activity: "State Management" },
      { time: "15:00", activity: "Build To-Do App" },
    ],
    highlights: ["Source Code Access", "Flutter Cheat Sheet", "Community Access"],
  },
];

// Countdown Component
function Countdown({ targetDate, t }: { targetDate: string; t: (key: string) => string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate);
      target.setHours(9, 0, 0, 0); // Event starts at 9 AM
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: t("days"), value: timeLeft.days },
    { label: t("hours"), value: timeLeft.hours },
    { label: t("mins"), value: timeLeft.minutes },
    { label: t("secs"), value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-black text-white">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <p className="text-xs text-white/80 mt-1">{unit.label}</p>
          {index < timeUnits.length - 1 && (
            <span className="hidden sm:inline text-white/60 absolute -right-2 top-1/2 -translate-y-1/2">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

// Event Modal Component
interface EventModalProps {
  event: typeof eventsData[0] | null;
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

function EventModal({ event, isOpen, onClose, t }: EventModalProps) {
  useBodyScrollLock(isOpen);

  if (!event) {
    return null;
  }

  const handleRegister = () => {
    toast.success(t("registrationSuccess"));
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t("linkCopied"));
  };

  const slotsLeft = event.maxParticipants - event.participants;
  const progressPercent = (event.participants / event.maxParticipants) * 100;
  const isFull = slotsLeft === 0;
  const isNearFull = slotsLeft <= 10;
  const categoryColor = getCategoryColor(event.category);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="event-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          
          <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 overflow-y-auto">
            <motion.div
              key="event-modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl my-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <Image src={event.image} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColor} text-white`}>
                      {t(`categories.${event.category}`)}
                    </span>
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                      {event.displayDate}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{event.title}</h2>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-3">{t("about")}</h3>
                      <p className="text-slate-600 leading-relaxed">{event.description}</p>
                    </div>

                    {/* Agenda */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-sky-500" />
                        {t("agenda")}
                      </h3>
                      <div className="space-y-3">
                        {event.agenda.map((item, i) => (
                          <div key={i} className="flex gap-4 p-3 bg-slate-50 rounded-xl">
                            <span className="text-sky-600 font-bold min-w-[60px]">{item.time}</span>
                            <span className="text-slate-700">{item.activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                        {t("whatYouWillGet")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {event.highlights.map((highlight, i) => (
                          <span key={i} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">
                            ✨ {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-5">
                    {/* Speaker */}
                    <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">{t("speaker")}</h3>
                      <div className="flex items-center gap-3">
                        <Image src={event.speaker.avatar} alt={event.speaker.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900">{event.speaker.name}</p>
                          <p className="text-sm text-slate-500">{event.speaker.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">{t("details")}</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-sky-500" />
                          <span className="text-slate-700">{event.displayDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-sky-500" />
                          <span className="text-slate-700">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-sky-500" />
                          <span className="text-slate-700">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-sky-500" />
                          <span className="text-slate-700">{event.participants} {t("registered")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Registration Progress */}
                    <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-slate-900">{t("registration")}</span>
                        <span className={`text-xs font-bold ${isNearFull ? "text-rose-500" : "text-green-600"}`}>
                          {isFull ? t("full") : `${slotsLeft} ${t("spotsLeft")}`}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${isNearFull ? "bg-rose-500" : "bg-green-500"}`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        {event.participants} {t("of")} {event.maxParticipants} {t("participants")}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={handleRegister}
                        disabled={isFull}
                        className={`w-full py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                          isFull 
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                            : "bg-sky-500 text-white hover:bg-sky-600"
                        }`}
                      >
                        <Ticket className="w-5 h-5" />
                        {isFull ? t("eventFull") : t("registerNow")}
                      </button>
                      <button
                        onClick={handleShare}
                        className="w-full py-3 sm:py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-5 h-5" />
                        {t("shareEvent")}
                      </button>
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

export default function Events() {
  const t = useTranslations("events");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<typeof eventsData[0] | null>(null);

  // Find featured event (nearest upcoming)
  const featuredEvent = eventsData.reduce((nearest, event) => {
    const eventDate = new Date(event.date);
    const nearestDate = new Date(nearest.date);
    const now = new Date();
    
    if (eventDate > now && eventDate < nearestDate) return event;
    return nearest;
  }, eventsData[0]);

  // Filter other events
  const otherEvents = eventsData.filter(e => e.id !== featuredEvent.id);
  const filteredEvents = activeCategory === "all" 
    ? otherEvents 
    : otherEvents.filter(e => e.category === activeCategory);



  return (
    <section id="events" ref={sectionRef} className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-sky-50/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-purple-50/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-bold mb-4"
            >
              {t("badge")}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-slate-900 leading-tight"
            >
              {t("title").split(" & ").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </motion.h2>
          </div>
          <motion.a 
            href="#" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
          >
            {t("viewAll")}
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Featured Event - Hero Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">{t("featuredEvent")}</span>
          </div>
          
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-64 lg:h-auto lg:min-h-[400px]">
                <Image
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/50 lg:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent lg:hidden" />
              </div>
              
              {/* Content Side */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(featuredEvent.category)} text-white`}>
                    {t(`categories.${featuredEvent.category}`)}
                  </span>
                  {featuredEvent.participants >= featuredEvent.maxParticipants - 10 && (
                    <span className="px-3 py-1 bg-rose-500 text-white rounded-full text-xs font-bold animate-pulse">
                      {t("almostFull")}
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
                  {featuredEvent.title}
                </h3>
                
                <p className="text-slate-300 mb-6 line-clamp-2">{featuredEvent.description}</p>
                
                {/* Event Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-slate-300 mb-6">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {featuredEvent.displayDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featuredEvent.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {featuredEvent.location}
                  </span>
                </div>
                
                {/* Countdown */}
                <div className="mb-6">
                  <p className="text-sm text-slate-400 mb-3">{t("startsIn")}</p>
                  <Countdown targetDate={featuredEvent.date} t={t} />
                </div>
                
                {/* CTA */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedEvent(featuredEvent)}
                    className="flex-1 py-3 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {t("viewDetails")}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
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
              {t(`categories.${category.id}`)}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event, index) => {
              const slotsLeft = event.maxParticipants - event.participants;
              const isNearFull = slotsLeft <= 10;
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 ${getCategoryColor(event.category)} rounded-full text-xs font-bold text-white`}>
                        {t(`categories.${event.category}`)}
                      </span>
                      {isNearFull && slotsLeft > 0 && (
                        <span className="px-3 py-1 bg-rose-500 text-white rounded-full text-xs font-bold animate-pulse">
                          {slotsLeft} {t("left")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {event.displayDate}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4 text-slate-400" />
                        {event.participants} / {event.maxParticipants} {t("participants")}
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="w-full py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      {t("details")}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t("noEvents")}</h3>
            <p className="text-slate-600">{t("tryDifferentCategory")}</p>
          </div>
        )}
      </div>

      {/* Event Modal */}
      <EventModal 
        event={selectedEvent} 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)}
        t={t}
      />
    </section>
  );
}
