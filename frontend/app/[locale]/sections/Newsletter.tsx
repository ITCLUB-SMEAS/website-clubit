"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { subscribeNewsletter } from "../lib/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await subscribeNewsletter(email);
      setIsSubscribed(true);
      toast.success("Successfully subscribed! Welcome aboard!");
      setEmail("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Subscription failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-32 bg-yellow-400 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-5xl md:text-6xl font-black text-yellow-900 mb-6">
          Stay in the Loop
        </h2>
        <p className="text-xl text-yellow-800 mb-10 max-w-2xl mx-auto">
          Subscribe to our newsletter and never miss out on the latest events and workshops.
        </p>

        {isSubscribed ? (
          <div className="flex items-center justify-center gap-3 text-yellow-900">
            <CheckCircle className="w-8 h-8" />
            <span className="text-xl font-bold">You&apos;re subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 bg-white rounded-full text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-4 focus:ring-yellow-500/30"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Subscribe
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
