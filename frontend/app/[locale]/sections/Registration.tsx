"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  Check,
  User,
  Mail,
  School,
  BookOpen,
  Sparkles,
  ArrowRight,
  Users,
  Trophy,
  Briefcase,
  Lightbulb,
  Heart,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { submitRegistration } from "../lib/api";

const interests = [
  "Web Development",
  "Mobile Apps",
  "AI & ML",
  "Data Science",
  "UI/UX Design",
  "Cybersecurity",
];

const benefits = [
  { icon: Users, key: "networking", color: "bg-blue-500" },
  { icon: Lightbulb, key: "learning", color: "bg-yellow-500" },
  { icon: Trophy, key: "competitions", color: "bg-purple-500" },
  { icon: Briefcase, key: "career", color: "bg-green-500" },
];

// Floating Label Input Component
function FloatingInput({
  id,
  label,
  icon: Icon,
  type = "text",
  required = false,
  value,
  onChange,
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;

  return (
    <div className="relative">
      <div
        className={`absolute left-4 transition-all duration-200 ${
          isActive ? "top-3" : "top-1/2 -translate-y-1/2"
        }`}
      >
        <Icon
          aria-hidden="true"
          className={`w-5 h-5 transition-colors ${
            isActive ? "text-sky-500" : "text-slate-400"
          }`}
        />
      </div>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-12 pr-4 pt-6 pb-3 bg-white border-2 border-slate-100 rounded-xl focus:outline-none focus:border-sky-500 transition-colors peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute left-12 transition-all duration-200 pointer-events-none ${
          isActive
            ? "top-2 text-xs text-sky-500 font-medium"
            : "top-1/2 -translate-y-1/2 text-slate-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function Registration() {
  const t = useTranslations("registration");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    school: "",
    grade: "",
    interests: [] as string[],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await submitRegistration({
        fullName: formData.fullName,
        email: formData.email,
        school: formData.school,
        grade: formData.grade,
        interests: formData.interests,
      });
      setIsSubmitted(true);
      toast.success(t("form.success"));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <section id="register" className="py-32 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-50/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-purple-50/50 to-transparent" />
        
        {/* Floating Shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            {t("badge")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              {t("benefitsTitle")}
            </h3>

            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{t(`benefits.${benefit.key}.title`)}</h4>
                  <p className="text-slate-600 text-sm">{t(`benefits.${benefit.key}.description`)}</p>
                </div>
              </motion.div>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <p className="text-3xl font-black text-sky-500">1000+</p>
                <p className="text-sm text-slate-600">{t("stats.members")}</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <p className="text-3xl font-black text-purple-500">50+</p>
                <p className="text-sm text-slate-600">{t("stats.events")}</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-2xl">
                <p className="text-3xl font-black text-green-500">98%</p>
                <p className="text-sm text-slate-600">{t("stats.satisfaction")}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {t("form.success")} 🎉
                    </h3>
                    <p className="text-slate-600 mb-6">
                      {t("form.successMessage")}
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: "",
                          email: "",
                          school: "",
                          grade: "",
                          interests: [],
                        });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-full font-bold hover:bg-slate-200 transition-colors"
                    >
                      {t("form.registerAnother")}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-6">
                      {t("form.createAccount")}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FloatingInput
                        id="reg-fullName"
                        label={t("form.fullName")}
                        icon={User}
                        required
                        value={formData.fullName}
                        onChange={(v) => setFormData({ ...formData, fullName: v })}
                      />
                      <FloatingInput
                        id="reg-email"
                        label={t("form.email")}
                        icon={Mail}
                        type="email"
                        required
                        value={formData.email}
                        onChange={(v) => setFormData({ ...formData, email: v })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FloatingInput
                        id="reg-school"
                        label={t("form.school")}
                        icon={School}
                        required
                        value={formData.school}
                        onChange={(v) => setFormData({ ...formData, school: v })}
                      />
                      <div className="relative">
                        <div className="absolute left-4 top-3">
                          <BookOpen className="w-5 h-5 text-sky-500" aria-hidden="true" />
                        </div>
                        <select
                          id="reg-grade"
                          required
                          value={formData.grade}
                          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                          className="w-full pl-12 pr-4 pt-6 pb-3 bg-white border-2 border-slate-100 rounded-xl focus:outline-none focus:border-sky-500 appearance-none cursor-pointer"
                        >
                          <option value="">{t("form.selectYear")}</option>
                          <option value="1">{t("form.year1")}</option>
                          <option value="2">{t("form.year2")}</option>
                          <option value="3">{t("form.year3")}</option>
                          <option value="4">{t("form.year4")}</option>
                        </select>
                        <label htmlFor="reg-grade" className="absolute left-12 top-2 text-xs text-sky-500 font-medium pointer-events-none">
                          {t("form.grade")}
                        </label>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="pt-2">
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        {t("form.interests")}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => {
                          const isSelected = formData.interests.includes(interest);
                          return (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggleInterest(interest)}
                              aria-pressed={isSelected}
                              className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                isSelected
                                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                              )}
                              {interest}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        required
                        id="terms"
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                      />
                      <label htmlFor="terms" className="text-sm text-slate-600">
                        {t("form.terms")}
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("form.loading")}
                        </>
                      ) : (
                        <>
                          <Heart className="w-5 h-5" />
                          {t("form.submit")}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-sm text-slate-500">
                      {t("form.freeMembership")}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
