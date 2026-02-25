"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Search, Code2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <div className="w-32 h-32 bg-sky-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-sky-500/30 mx-auto">
              <Code2 className="w-16 h-16 text-white" />
            </div>
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-12 h-12 bg-yellow-400 rounded-xl -rotate-12 hidden md:block"
          />
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute bottom-0 right-1/4 w-10 h-10 bg-purple-500 rounded-full hidden md:block"
          />
        </div>

        {/* Error Code */}
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-8xl md:text-9xl font-black text-slate-900 mb-4"
        >
          4<span className="text-sky-500">0</span>4
        </motion.h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
          Oops! Looks like this page took a coffee break. Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all hover:scale-105 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back Home
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold border-2 border-slate-200 hover:border-sky-500 hover:text-sky-600 transition-all"
          >
            <Search className="w-5 h-5" />
            Try Again
          </button>
        </div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-white rounded-2xl shadow-sm inline-block"
        >
          <p className="text-sm text-slate-500">
            <span className="font-bold text-sky-500">Fun Fact:</span> The first computer bug was an actual bug! A moth was found in the Harvard Mark II computer in 1947.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
