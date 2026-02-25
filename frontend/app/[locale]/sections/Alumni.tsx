"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Linkedin,
  Briefcase,
  GraduationCap,
  X,
  MapPin,
  Mail,
  Award,
  Sparkles,
  Filter,
} from "lucide-react";

const alumniData = [
  {
    id: 1,
    name: "Fajar Pratama",
    graduationYear: "2023",
    currentPosition: "Software Engineer",
    company: "Tokopedia",
    location: "Jakarta",
    email: "fajar.pratama@email.com",
    bio: "From IT Club member to tech industry professional. The foundation I built here was invaluable.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    achievements: ["Best Project Award 2023", "Hackathon Winner"],
  },
  {
    id: 2,
    name: "Lisa Anggraini",
    graduationYear: "2022",
    currentPosition: "Product Designer",
    company: "Gojek",
    location: "Jakarta",
    email: "lisa.anggraini@email.com",
    bio: "IT Club taught me that design and technology go hand in hand. Now I'm creating user experiences at scale.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    achievements: ["Design Excellence 2022"],
  },
  {
    id: 3,
    name: "Dimas Setiawan",
    graduationYear: "2024",
    currentPosition: "Data Scientist",
    company: "Grab",
    location: "Singapore",
    email: "dimas.setiawan@email.com",
    bio: "The data science workshops at IT Club sparked my passion. Now I work with data that impacts millions.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    achievements: ["ML Competition Winner", "Research Publication"],
  },
  {
    id: 4,
    name: "Rina Kusuma",
    graduationYear: "2021",
    currentPosition: "Full Stack Developer",
    company: "Shopee",
    location: "Jakarta",
    email: "rina.kusuma@email.com",
    bio: "Started with zero coding knowledge, now building complex systems. IT Club changed my life trajectory.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    achievements: ["Rising Star 2021"],
  },
  {
    id: 5,
    name: "Budi Santoso",
    graduationYear: "2023",
    currentPosition: "Frontend Engineer",
    company: "Bukalapak",
    location: "Bandung",
    email: "budi.santoso@email.com",
    bio: "The frontend workshops here gave me the confidence to pursue my dream career.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    achievements: ["Best UI Implementation"],
  },
  {
    id: 6,
    name: "Sarah Chen",
    graduationYear: "2022",
    currentPosition: "Tech Lead",
    company: "Traveloka",
    location: "Jakarta",
    email: "sarah.chen@email.com",
    bio: "From junior developer to tech lead in 2 years. The leadership skills I learned at IT Club were crucial.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    achievements: ["Tech Excellence 2022"],
  },
];

const years = ["all", "2024", "2023", "2022", "2021"];

const companyColors: Record<string, string> = {
  Tokopedia: "bg-green-500",
  Gojek: "bg-green-600",
  Grab: "bg-green-700",
  Shopee: "bg-orange-500",
  Bukalapak: "bg-red-500",
  Traveloka: "bg-blue-500",
};

function AlumniModal({ alumni, isOpen, onClose, t }: { alumni: typeof alumniData[0] | null; isOpen: boolean; onClose: () => void; t: (key: string) => string }) {
  if (!alumni) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl overflow-hidden w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48">
              <Image src={alumni.avatar} alt={alumni.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">{t("classOf")} {alumni.graduationYear}</span>
                <h2 className="text-2xl font-black text-white mt-2">{alumni.name}</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
                <div className={`w-12 h-12 ${companyColors[alumni.company] || "bg-slate-500"} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                  {alumni.company.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{alumni.currentPosition}</p>
                  <p className="text-sky-600 text-sm">{alumni.company}</p>
                </div>
              </div>
              <p className="text-slate-600 mb-4">&ldquo;{alumni.bio}&rdquo;</p>
              <div className="flex gap-2 mb-4">
                {alumni.achievements.map((a, i) => (
                  <span key={i} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">🏆 {a}</span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href="#" className="flex-1 py-3 bg-sky-500 text-white rounded-xl font-bold text-center">{t("connect")}</a>
                <a href={`mailto:${alumni.email}`} className="flex-1 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold text-center">{t("email")}</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Alumni() {
  const t = useTranslations("alumni");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedAlumni, setSelectedAlumni] = useState<typeof alumniData[0] | null>(null);

  const filteredAlumni = selectedYear === "all" 
    ? alumniData 
    : alumniData.filter((a) => a.graduationYear === selectedYear);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/50 to-white" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            {t("badge")}
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet our graduates who have gone on to achieve great things in the tech industry.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-full mr-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600">{t("filters.label")}</span>
          </div>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                selectedYear === year
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {year === "all" ? t("filters.all") : year}
            </button>
          ))}
        </motion.div>

        {/* Grid - Simple 3 columns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAlumni.map((alumni, index) => (
              <motion.div
                key={alumni.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedAlumni(alumni)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-slate-100"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image src={alumni.avatar} alt={alumni.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 rounded-full text-xs font-semibold">
                    <GraduationCap className="w-3 h-3" />
                    {alumni.graduationYear}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white">{alumni.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${companyColors[alumni.company] || "bg-slate-500"} rounded-lg flex items-center justify-center text-white font-bold`}>
                      {alumni.company.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{alumni.currentPosition}</p>
                      <p className="text-sky-600 text-xs">{alumni.company}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-2">&ldquo;{alumni.bio}&rdquo;</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty */}
        {filteredAlumni.length === 0 && (
          <div className="text-center py-16">
            <GraduationCap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">{t("noAlumni")}</p>
          </div>
        )}
      </div>

      <AlumniModal alumni={selectedAlumni} isOpen={!!selectedAlumni} onClose={() => setSelectedAlumni(null)} t={t} />
    </section>
  );
}
