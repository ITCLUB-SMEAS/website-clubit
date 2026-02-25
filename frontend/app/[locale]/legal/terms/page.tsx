"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText, Scale, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: CheckCircle,
    title: "Acceptance of Terms",
    content: `By accessing or using IT Club SMEAS services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.

    These terms apply to all members, visitors, and others who access or use our services.`,
  },
  {
    icon: FileText,
    title: "Membership Requirements",
    content: `To become a member of IT Club SMEAS, you must:
    • Be currently enrolled as a student
    • Provide accurate and complete registration information
    • Be at least 15 years of age
    • Agree to abide by our Code of Conduct
    
    We reserve the right to refuse membership to anyone for any reason at any time.`,
  },
  {
    icon: Scale,
    title: "Code of Conduct",
    content: `All members are expected to:
    • Treat fellow members with respect and inclusivity
    • Maintain academic integrity in all activities
    • Respect intellectual property rights
    • Not engage in harassment, discrimination, or harmful behavior
    • Follow safety guidelines during events and workshops
    
    Violation of these guidelines may result in termination of membership.`,
  },
  {
    icon: AlertCircle,
    title: "Intellectual Property",
    content: `The content, organization, graphics, design, and other matters related to our services are protected under applicable copyrights, trademarks, and other proprietary rights.

    Projects developed during IT Club activities remain the property of their respective creators, unless otherwise agreed upon in writing.`,
  },
];

export default function TermsOfService() {
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
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Terms of Service</h1>
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
            Please read these Terms of Service carefully before using our website and services. 
            By using our services, you agree to be bound by these terms.
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
                  <section.icon className="w-6 h-6 text-purple-600" />
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

        {/* Changes to Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-yellow-900 mb-2">Changes to Terms</h3>
          <p className="text-yellow-800">
            We reserve the right to update or modify these terms at any time. We will notify 
            members of any material changes via email or through our website. Continued use 
            of our services after changes constitutes acceptance of the new terms.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-6 bg-slate-900 rounded-2xl text-center"
        >
          <h3 className="text-xl font-bold text-white mb-2">Questions about our Terms?</h3>
          <p className="text-slate-300 mb-4">
            If you have any questions about these Terms of Service, please contact us.
          </p>
          <a
            href="mailto:legal@itclub.id"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors"
          >
            Contact Legal Team
          </a>
        </motion.div>
      </div>
    </div>
  );
}
