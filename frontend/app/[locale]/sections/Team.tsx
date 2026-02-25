"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Github, Mail, Crown, Code2, Palette, Megaphone, ChevronLeft, ChevronRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "Ahmad Rizki",
    role: "Ketua Umum",
    division: "leadership",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Passionate about building tech communities and empowering students to reach their full potential through technology.",
    skills: ["Leadership", "Strategy", "Public Speaking", "Team Building"],
    quote: "Code is poetry, community is family.",
    socials: { instagram: "#", linkedin: "#", github: "#", email: "ahmad@itclub.com" },
    isLeader: true,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Wakil Ketua",
    division: "leadership",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bio: "Full-stack developer with a love for clean code and coffee. Leading by example and inspiring others to code.",
    skills: ["Management", "Node.js", "React", "System Design"],
    quote: "Innovation starts with a single line of code.",
    socials: { instagram: "#", linkedin: "#", github: "#", email: "sarah@itclub.com" },
    isLeader: true,
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Head of Tech",
    division: "tech",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    bio: "AI enthusiast and competitive programmer. Always exploring new technologies and sharing knowledge.",
    skills: ["Python", "Machine Learning", "Algorithms", "Data Science"],
    quote: "Keep learning, keep growing.",
    socials: { instagram: "#", linkedin: "#", github: "#", email: "budi@itclub.com" },
    isLeader: false,
  },
  {
    id: 4,
    name: "Dewi Putri",
    role: "UI/UX Lead",
    division: "design",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    bio: "Designing experiences that matter and inspire. Believes in user-centered design approach.",
    skills: ["Figma", "UI Design", "User Research", "Prototyping"],
    quote: "Good design is obvious, great design is transparent.",
    socials: { instagram: "#", linkedin: "#", github: "#", email: "dewi@itclub.com" },
    isLeader: false,
  },
  {
    id: 5,
    name: "Fajar Pratama",
    role: "Mobile Dev Lead",
    division: "tech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "Flutter enthusiast and mobile-first advocate. Building beautiful mobile experiences.",
    skills: ["Flutter", "Dart", "Firebase", "iOS/Android"],
    quote: "Mobile is the future.",
    socials: { instagram: "#", linkedin: "#", github: "#", email: "fajar@itclub.com" },
    isLeader: false,
  },
  {
    id: 6,
    name: "Lisa Anggraini",
    role: "Creative Director",
    division: "design",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    bio: "Bringing ideas to life through visual storytelling and creative design solutions.",
    skills: ["Branding", "Motion Graphics", "Illustration", "Adobe CC"],
    quote: "Creativity is intelligence having fun.",
    socials: { instagram: "#", linkedin: "#", github: "#", email: "lisa@itclub.com" },
    isLeader: false,
  },
  {
    id: 7,
    name: "Dimas Setiawan",
    role: "PR Manager",
    division: "marketing",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    bio: "Connecting communities through effective communication and event planning.",
    skills: ["Communication", "Event Planning", "Networking", "Copywriting"],
    quote: "Every connection starts with a conversation.",
    socials: { instagram: "#", linkedin: "#", github: "#", email: "dimas@itclub.com" },
    isLeader: false,
  },
  {
    id: 8,
    name: "Rina Kusuma",
    role: "Content Strategist",
    division: "marketing",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    bio: "Crafting stories that resonate and inspire action. Content is king!",
    skills: ["Content Writing", "SEO", "Social Media", "Analytics"],
    quote: "Content is king, but context is god.",
    socials: { instagram: "#", linkedin: "#", github: "#", email: "rina@itclub.com" },
    isLeader: false,
  },
];

// Team Card Component with Modal
function TeamCard({ member, divisionColor, getDivisionLabel, t }: { 
  member: typeof teamMembers[0]; 
  divisionColor: string;
  getDivisionLabel: (id: string) => string;
  t: (key: string) => string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          
          {/* Crown for leaders */}
          {member.isLeader && (
            <div className="absolute top-3 left-3 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <Crown className="w-5 h-5 text-yellow-900" />
            </div>
          )}

          {/* Division Badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 ${divisionColor} text-white rounded-full text-xs font-bold`}>
            {getDivisionLabel(member.division)}
          </div>

          {/* Basic Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h4 className="text-lg font-bold text-white">{member.name}</h4>
            <p className="text-sky-300 text-sm">{member.role}</p>
            <p className="text-white/60 text-xs mt-1 italic line-clamp-1">&quot;{member.quote}&quot;</p>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-sky-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-bold flex items-center gap-2">
            {t("viewProfile")}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Image Side */}
                <div className="md:w-2/5 relative">
                  <div className="relative aspect-square md:aspect-auto md:h-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
                  </div>
                  
                  {/* Division Badge on Image */}
                  <div className={`absolute top-4 left-4 px-3 py-1 ${divisionColor} text-white rounded-full text-xs font-bold`}>
                    {getDivisionLabel(member.division)}
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:w-3/5 p-6 md:p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">{member.name}</h3>
                    <p className={`text-lg font-medium ${divisionColor.replace('bg-', 'text-')}`}>{member.role}</p>
                  </div>

                  {/* Quote */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-xl border-l-4 border-sky-500">
                    <p className="text-slate-600 italic">&quot;{member.quote}&quot;</p>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t("about")}</h4>
                    <p className="text-slate-600 leading-relaxed">{member.bio}</p>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">{t("skills")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">{t("connect")}</h4>
                    <div className="flex gap-3">
                      {Object.entries(member.socials).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {platform === "instagram" && <Instagram className="w-5 h-5" />}
                          {platform === "linkedin" && <Linkedin className="w-5 h-5" />}
                          {platform === "github" && <Github className="w-5 h-5" />}
                          {platform === "email" && <Mail className="w-5 h-5" />}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Leader Card Component
function LeaderCard({ member, divisionColor, getDivisionLabel, t }: { 
  member: typeof teamMembers[0]; 
  divisionColor: string;
  getDivisionLabel: (id: string) => string;
  t: (key: string) => string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative h-80 overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
          
          {/* Crown Badge */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <Crown className="w-6 h-6 text-yellow-900" />
          </div>

          {/* Division Badge */}
          <div className={`absolute top-4 right-4 px-4 py-2 ${divisionColor} text-white rounded-full text-sm font-bold`}>
            {getDivisionLabel(member.division)}
          </div>

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
            <p className="text-sky-300 font-medium text-lg">{member.role}</p>
            <p className="text-white/70 text-sm mt-2 italic">&quot;{member.quote}&quot;</p>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-sky-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white font-bold text-lg flex items-center gap-2">
            {t("viewFullProfile")}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </motion.div>

      {/* Modal - Same as TeamCard but larger */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative">
                  <div className="relative aspect-square md:aspect-auto md:h-full">
                    <Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                  </div>
                  <div className={`absolute top-4 left-4 px-3 py-1 ${divisionColor} text-white rounded-full text-xs font-bold`}>
                    {getDivisionLabel(member.division)}
                  </div>
                  {/* Crown on modal too */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Crown className="w-5 h-5 text-yellow-900" />
                  </div>
                </div>

                <div className="md:w-3/5 p-6 md:p-8">
                  <div className="mb-6">
                    <h3 className="text-3xl font-black text-slate-900 mb-1">{member.name}</h3>
                    <p className={`text-xl font-medium ${divisionColor.replace('bg-', 'text-')}`}>{member.role}</p>
                  </div>

                  <div className="mb-6 p-4 bg-slate-50 rounded-xl border-l-4 border-yellow-400">
                    <p className="text-slate-600 italic text-lg">&quot;{member.quote}&quot;</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t("about")}</h4>
                    <p className="text-slate-600 leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">{t("skills")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">{t("connect")}</h4>
                    <div className="flex gap-3">
                      {Object.entries(member.socials).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-sky-500 hover:text-white transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {platform === "instagram" && <Instagram className="w-5 h-5" />}
                          {platform === "linkedin" && <Linkedin className="w-5 h-5" />}
                          {platform === "github" && <Github className="w-5 h-5" />}
                          {platform === "email" && <Mail className="w-5 h-5" />}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Team() {
  const t = useTranslations("team");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const divisions = [
    { id: "all", label: t("filters.all"), color: "bg-slate-900" },
    { id: "leadership", label: t("filters.leadership"), color: "bg-yellow-500", icon: Crown },
    { id: "tech", label: t("filters.tech"), color: "bg-sky-500", icon: Code2 },
    { id: "design", label: t("filters.design"), color: "bg-purple-500", icon: Palette },
    { id: "marketing", label: t("filters.marketing"), color: "bg-rose-500", icon: Megaphone },
  ];

  const getDivisionLabel = (divisionId: string) => {
    const div = divisions.find((d) => d.id === divisionId);
    return div?.label || divisionId;
  };

  const getDivisionColor = (divisionId: string) => {
    const div = divisions.find((d) => d.id === divisionId);
    return div?.color || "bg-slate-500";
  };

  const filteredMembers =
    selectedDivision === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.division === selectedDivision);

  const leaders = filteredMembers.filter((m) => m.isLeader);
  const regularMembers = filteredMembers.filter((m) => !m.isLeader);

  const totalPages = Math.ceil(regularMembers.length / itemsPerPage);
  const paginatedMembers = regularMembers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedDivision]);

  return (
    <section id="team" ref={sectionRef} className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-10">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#0ea5e9" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
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
            className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Division Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {divisions.map((division) => (
            <button
              key={division.id}
              onClick={() => setSelectedDivision(division.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold transition-all ${
                selectedDivision === division.id
                  ? `${division.color} text-white shadow-lg scale-105`
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {division.icon && <division.icon className="w-4 h-4" />}
              {division.label}
            </button>
          ))}
        </motion.div>

        {/* Leaders Section */}
        {leaders.length > 0 && (
          <div className="mb-16">
            <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-8">
              {t("leadershipTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {leaders.map((member) => (
                <LeaderCard
                  key={member.id}
                  member={member}
                  divisionColor={getDivisionColor(member.division)}
                  getDivisionLabel={getDivisionLabel}
                  t={t}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Members Grid */}
        {paginatedMembers.length > 0 && (
          <div>
            <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-8">
              {t("membersTitle")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedMembers.map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  divisionColor={getDivisionColor(member.division)}
                  getDivisionLabel={getDivisionLabel}
                  t={t}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentPage === i ? "bg-sky-500 w-8" : "bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
