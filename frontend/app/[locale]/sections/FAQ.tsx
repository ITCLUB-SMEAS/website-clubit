"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  HelpCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("faq");
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [openId, setOpenId] = useState<string | null>("g1");

  const categories = [
    { id: "general", label: t("categories.general") },
    { id: "membership", label: t("categories.membership") },
    { id: "events", label: t("categories.events") },
    { id: "projects", label: t("categories.projects") },
  ];

  const faqData: Record<string, Array<{ id: string; question: string; answer: string }>> = {
    general: [
      {
        id: "g1",
        question: t("items.general.0.question"),
        answer: t("items.general.0.answer"),
      },
      {
        id: "g2",
        question: t("items.general.1.question"),
        answer: t("items.general.1.answer"),
      },
      {
        id: "g3",
        question: t("items.general.2.question"),
        answer: t("items.general.2.answer"),
      },
    ],
    membership: [
      {
        id: "m1",
        question: t("items.membership.0.question"),
        answer: t("items.membership.0.answer"),
      },
      {
        id: "m2",
        question: t("items.membership.1.question"),
        answer: t("items.membership.1.answer"),
      },
      {
        id: "m3",
        question: t("items.membership.2.question"),
        answer: t("items.membership.2.answer"),
      },
    ],
    events: [
      {
        id: "e1",
        question: t("items.events.0.question"),
        answer: t("items.events.0.answer"),
      },
      {
        id: "e2",
        question: t("items.events.1.question"),
        answer: t("items.events.1.answer"),
      },
      {
        id: "e3",
        question: t("items.events.2.question"),
        answer: t("items.events.2.answer"),
      },
    ],
    projects: [
      {
        id: "p1",
        question: t("items.projects.0.question"),
        answer: t("items.projects.0.answer"),
      },
      {
        id: "p2",
        question: t("items.projects.1.question"),
        answer: t("items.projects.1.answer"),
      },
      {
        id: "p3",
        question: t("items.projects.2.question"),
        answer: t("items.projects.2.answer"),
      },
    ],
  };

  const currentFaqs = faqData[activeCategory] || [];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-bold mb-4">
            <HelpCircle className="w-4 h-4" />
            {t("badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-600 text-lg">
            {t("description")}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-10 p-1 bg-slate-100 rounded-full w-fit mx-auto"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenId(null);
              }}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeCategory === cat.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {currentFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-sky-200 transition-colors"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-slate-900 pr-4">{faq.question}</span>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    openId === faq.id
                      ? "bg-sky-500 text-white rotate-0"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {openId === faq.id ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="h-px bg-slate-100 mb-4" />
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 bg-slate-50 rounded-3xl"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {t("stillHaveQuestions")}
          </h3>
          <p className="text-slate-600 mb-6">
            {t("contactText")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@itclub.sch.id"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-full font-bold hover:bg-sky-600 transition-colors"
            >
              {t("emailUs")}
            </a>
            <a
              href="https://wa.me/6281234567890"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-colors"
            >
              {t("whatsapp")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
