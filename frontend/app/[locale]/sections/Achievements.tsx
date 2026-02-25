"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  Star,
  Calendar,
  MapPin,
  Users,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  ZoomIn,
  Download,
  ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "all", label: "All Achievements", icon: Trophy },
  { id: "national", label: "National", icon: Medal, color: "bg-yellow-500" },
  { id: "regional", label: "Regional", icon: Award, color: "bg-sky-500" },
  { id: "provincial", label: "Provincial", icon: Star, color: "bg-purple-500" },
  { id: "school", label: "School", icon: Trophy, color: "bg-green-500" },
];

const achievementTypes = [
  { id: "all", label: "All Types" },
  { id: "competition", label: "Competition" },
  { id: "hackathon", label: "Hackathon" },
  { id: "certification", label: "Certification" },
  { id: "publication", label: "Publication" },
];

const achievements = [
  {
    id: 1,
    title: "National Programming Champion",
    competition: "OSN Informatika 2024",
    level: "national",
    type: "competition",
    year: "2024",
    date: "March 15, 2024",
    location: "Jakarta",
    team: ["Ahmad Rizki", "Budi Santoso"],
    medal: "gold",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
    certificate: "https://images.unsplash.com/photo-1589330694653-1a6fadd1f43d?w=800",
    videoUrl: "#",
    description: "Developed an AI-powered education platform that helps students learn programming through gamification.",
    featured: true,
  },
  {
    id: 2,
    title: "2nd Place Web Development",
    competition: "TechFest Hackathon",
    level: "regional",
    type: "hackathon",
    year: "2024",
    date: "February 20, 2024",
    location: "Bandung",
    team: ["Sarah Chen", "Dewi Putri", "Fajar Pratama"],
    medal: "silver",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    certificate: "https://images.unsplash.com/photo-1589330694653-1a6fadd1f43d?w=800",
    videoUrl: null,
    description: "Built a smart campus navigation system using React and Node.js in 48 hours.",
    featured: false,
  },
  {
    id: 3,
    title: "Best Innovation Award",
    competition: "Student Innovation Expo",
    level: "national",
    type: "competition",
    year: "2023",
    date: "November 10, 2023",
    location: "Yogyakarta",
    team: ["Lisa Anggraini", "Rina Kusuma"],
    medal: "gold",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    certificate: "https://images.unsplash.com/photo-1589330694653-1a6fadd1f43d?w=800",
    videoUrl: "#",
    description: "Created an IoT-based smart farming solution for urban agriculture.",
    featured: false,
  },
  {
    id: 4,
    title: "1st Place Mobile App",
    competition: "Digital Innovation Challenge",
    level: "provincial",
    type: "competition",
    year: "2023",
    date: "September 5, 2023",
    location: "Surabaya",
    team: ["Dimas Setiawan"],
    medal: "gold",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    certificate: "https://images.unsplash.com/photo-1589330694653-1a6fadd1f43d?w=800",
    videoUrl: null,
    description: "Developed a mental health tracking app for students using Flutter.",
    featured: false,
  },
  {
    id: 5,
    title: "Google Cloud Certification",
    competition: "Google Cloud Platform",
    level: "certification",
    type: "certification",
    year: "2024",
    date: "January 20, 2024",
    location: "Online",
    team: ["Budi Santoso", "Fajar Pratama"],
    medal: null,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    certificate: "https://images.unsplash.com/photo-1589330694653-1a6fadd1f43d?w=800",
    videoUrl: null,
    description: "Professional Cloud Architect certification achieved by 5 team members.",
    featured: false,
  },
  {
    id: 6,
    title: "Published Research Paper",
    competition: "IEEE Conference",
    level: "national",
    type: "publication",
    year: "2023",
    date: "July 15, 2023",
    location: "Bali",
    team: ["Ahmad Rizki", "Sarah Chen"],
    medal: null,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
    certificate: "https://images.unsplash.com/photo-1589330694653-1a6fadd1f43d?w=800",
    videoUrl: null,
    description: "Research on 'Machine Learning Applications in Education' published in IEEE Xplore.",
    featured: false,
  },
];

const medalColors = {
  gold: "from-yellow-400 to-amber-500",
  silver: "from-slate-300 to-slate-400",
  bronze: "from-orange-400 to-orange-600",
};

const medalIcons = {
  gold: "🥇",
  silver: "🥈",
  bronze: "🥉",
};

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(
    null
  );
  const [showCertificate, setShowCertificate] = useState(false);

  const years = [...new Set(achievements.map((a) => a.year))].sort().reverse();

  const filteredAchievements = achievements.filter((a) => {
    const categoryMatch = selectedCategory === "all" || a.level === selectedCategory;
    const typeMatch = selectedType === "all" || a.type === selectedType;
    const yearMatch = selectedYear === "all" || a.year === selectedYear;
    return categoryMatch && typeMatch && yearMatch;
  });

  const featuredAchievement = achievements.find((a) => a.featured);
  const regularAchievements = filteredAchievements.filter((a) => !a.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".achievement-card").forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: "power3.out" }
            );
          },
          once: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredAchievements]);

  const getCategoryColor = (level: string) => {
    const cat = categories.find((c) => c.id === level);
    return cat?.color || "bg-slate-500";
  };

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-32 bg-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-yellow-50/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-4"
          >
            Our Pride
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6"
          >
            Achievements & <span className="text-sky-500">Awards</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Celebrating excellence and dedication of our members in various competitions
            and tech events.
          </motion.p>
        </div>

        {/* Hall of Fame - Featured Achievement */}
        {featuredAchievement && selectedCategory === "all" && selectedType === "all" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-20"
          >
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <h3 className="text-xl font-black text-slate-900">Hall of Fame</h3>
            </div>

            <div
              className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
              onClick={() => setSelectedAchievement(featuredAchievement)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <Image
                    src={featuredAchievement.image}
                    alt={featuredAchievement.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent lg:bg-gradient-to-l" />
                  
                  {/* Medal */}
                  <div className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                    {medalIcons[featuredAchievement.medal as keyof typeof medalIcons]}
                  </div>

                  {/* Play Button if video */}
                  {featuredAchievement.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`px-3 py-1 ${getCategoryColor(
                        featuredAchievement.level
                      )} text-white rounded-full text-xs font-bold`}
                    >
                      {featuredAchievement.level.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium">
                      {featuredAchievement.type}
                    </span>
                  </div>

                  <h4 className="text-3xl lg:text-4xl font-black text-white mb-3">
                    {featuredAchievement.title}
                  </h4>

                  <p className="text-slate-300 text-lg mb-6">
                    {featuredAchievement.competition}
                  </p>

                  <p className="text-slate-400 mb-8">{featuredAchievement.description}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredAchievement.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {featuredAchievement.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {featuredAchievement.team.length} members
                    </span>
                  </div>

                  {/* CTA */}
                  <button className="mt-8 inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300 transition-colors">
                    View Details
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {/* Category Filter */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat.id
                    ? `${cat.color} text-white`
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            {achievementTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-translate-x-1/2" />

          {/* Achievements List */}
          <div className="space-y-12">
            {regularAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`achievement-card relative flex flex-col md:flex-row items-start gap-6 md:gap-12 pt-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Container */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center z-10">
                  {/* Year Badge - Above */}
                  <div
                    className={`px-3 py-1 ${getCategoryColor(
                      achievement.level
                    )} text-white rounded-full text-xs font-bold mb-3 whitespace-nowrap shadow-md`}
                  >
                    {achievement.year}
                  </div>
                  
                  {/* Timeline Dot */}
                  <div
                    className={`w-4 h-4 rounded-full border-4 border-white shadow-lg ${getCategoryColor(
                      achievement.level
                    )}`}
                  />
                </div>

                {/* Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-4rem)] ${
                    index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                  }`}
                >
                  <div
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border border-slate-100"
                    onClick={() => setSelectedAchievement(achievement)}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={achievement.image}
                        alt={achievement.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

                      {/* Medal */}
                      {achievement.medal && (
                        <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br rounded-full flex items-center justify-center text-2xl shadow-lg">
                          {medalIcons[achievement.medal as keyof typeof medalIcons]}
                        </div>
                      )}

                      {/* Certificate Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAchievement(achievement);
                          setShowCertificate(true);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
                      >
                        <Award className="w-5 h-5" />
                      </button>

                      {/* Type Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full text-xs font-bold">
                          {achievement.type}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-slate-500 text-sm mb-3">
                        {achievement.competition}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {achievement.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {achievement.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {achievement.team.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {regularAchievements.length === 0 && (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No achievements found for selected filters.</p>
          </div>
        )}
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setSelectedAchievement(null);
              setShowCertificate(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedAchievement(null);
                  setShowCertificate(false);
                }}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {showCertificate ? (
                // Certificate View
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-slate-900">Certificate</h3>
                    <button
                      onClick={() => setShowCertificate(false)}
                      className="text-sky-500 font-bold hover:text-sky-600"
                    >
                      Back to Details
                    </button>
                  </div>
                  <div className="relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden">
                    <Image
                      src={selectedAchievement.certificate}
                      alt="Certificate"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors">
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors">
                      <ZoomIn className="w-5 h-5" />
                      Zoom
                    </button>
                  </div>
                </div>
              ) : (
                // Detail View
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image
                      src={selectedAchievement.image}
                      alt={selectedAchievement.title}
                      fill
                      className="object-cover"
                      sizes="50vw"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                    
                    {/* Medal */}
                    {selectedAchievement.medal && (
                      <div className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
                        {medalIcons[selectedAchievement.medal as keyof typeof medalIcons]}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 p-8">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span
                        className={`px-3 py-1 ${getCategoryColor(
                          selectedAchievement.level
                        )} text-white rounded-full text-xs font-bold`}
                      >
                        {selectedAchievement.level.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                        {selectedAchievement.type}
                      </span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                        {selectedAchievement.year}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                      {selectedAchievement.title}
                    </h3>
                    <p className="text-lg text-sky-600 font-medium mb-4">
                      {selectedAchievement.competition}
                    </p>

                    <p className="text-slate-600 mb-6">
                      {selectedAchievement.description}
                    </p>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-sky-500" />
                        <div>
                          <p className="text-xs text-slate-400">Date</p>
                          <p className="text-sm font-bold text-slate-700">
                            {selectedAchievement.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-sky-500" />
                        <div>
                          <p className="text-xs text-slate-400">Location</p>
                          <p className="text-sm font-bold text-slate-700">
                            {selectedAchievement.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Team */}
                    <div className="mb-6">
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Team Members
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedAchievement.team.map((member, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setShowCertificate(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
                      >
                        <Award className="w-5 h-5" />
                        View Certificate
                      </button>
                      {selectedAchievement.videoUrl && (
                        <button className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors">
                          <Play className="w-5 h-5" />
                          Watch Video
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
