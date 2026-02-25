"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Cookie, Settings, Info, Check } from "lucide-react";
import Link from "next/link";

const cookieTypes = [
  {
    title: "Essential Cookies",
    description: "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
    required: true,
  },
  {
    title: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
    required: false,
  },
  {
    title: "Functionality Cookies",
    description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
    required: false,
  },
];

export default function CookiePolicy() {
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
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Cookie className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Cookie Policy</h1>
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
            This Cookie Policy explains how IT Club SMEAS uses cookies and similar technologies 
            to recognize you when you visit our website. It explains what these technologies are 
            and why we use them, as well as your rights to control our use of them.
          </p>
        </motion.div>

        {/* What are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Info className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">What Are Cookies?</h2>
              <p className="text-slate-600 leading-relaxed">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
                as well as to provide reporting information.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Types of Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Types of Cookies We Use</h2>
          </div>

          <div className="space-y-4">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{type.title}</h3>
                  {type.required && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-slate-600">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to Control Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4">How to Control Cookies</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            You can set or amend your web browser controls to accept or refuse cookies. If you choose to 
            reject cookies, you may still use our website though your access to some functionality and 
            areas may be restricted.
          </p>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">Browser Settings:</h4>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <strong>Chrome:</strong> Settings → Privacy and security → Cookies
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <strong>Firefox:</strong> Options → Privacy & Security → Cookies
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <strong>Safari:</strong> Preferences → Privacy → Cookies
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-amber-900 mb-2">Updates to This Policy</h3>
          <p className="text-amber-800">
            We may update this Cookie Policy from time to time to reflect changes in technology, 
            regulation, or our business practices. Any changes will be posted on this page with 
            an updated revision date.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 bg-slate-900 rounded-2xl text-center"
        >
          <h3 className="text-xl font-bold text-white mb-2">Questions About Cookies?</h3>
          <p className="text-slate-300 mb-4">
            If you have any questions about our use of cookies, please contact us.
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
