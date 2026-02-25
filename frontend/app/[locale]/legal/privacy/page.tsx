"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye, Database, Share2, Lock } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: `We collect information you provide directly to us when you:
    • Register for an account
    • Fill out forms or surveys
    • Participate in events or workshops
    • Contact us for support
    
    This may include your name, email address, school/university, grade level, and areas of interest in technology.`,
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    content: `We use the information we collect to:
    • Provide and maintain our services
    • Process your registration and participation
    • Send you updates about events and activities
    • Improve our programs and offerings
    • Communicate with you about IT Club initiatives`,
  },
  {
    icon: Share2,
    title: "Information Sharing",
    content: `We do not sell or rent your personal information to third parties. We may share information with:
    • Event partners and sponsors (with your consent)
    • Service providers who assist our operations
    • When required by law or to protect our rights`,
  },
  {
    icon: Lock,
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-sky-600" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Privacy Policy</h1>
            <p className="text-slate-600">Last updated: February 2025</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-slate max-w-none mb-12"
        >
          <p className="text-lg text-slate-600 leading-relaxed">
            IT Club SMEAS (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you use our website and services.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <section.icon className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h2>
                  <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-slate-900 rounded-2xl text-center"
        >
          <h3 className="text-xl font-bold text-white mb-2">Questions?</h3>
          <p className="text-slate-300 mb-4">
            If you have any questions about this Privacy Policy, please contact us.
          </p>
          <a
            href="mailto:privacy@itclub.id"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
}
