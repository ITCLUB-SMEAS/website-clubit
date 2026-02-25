"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing!");
      setEmail("");
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Newsletter Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12"
        >
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            {t("subscribe")}
            <Send className="w-4 h-4" />
          </button>
        </motion.form>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm"
        >
          <a
            href="mailto:hello@itclub.id"
            className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors"
          >
            <Mail className="w-4 h-4" />
            hello@itclub.id
          </a>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            Jakarta, Indonesia
          </span>
        </motion.div>
      </div>
    </section>
  );
}
