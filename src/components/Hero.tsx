/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight, Instagram, MessageCircle, Send, Heart, Bookmark } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 px-4" id="hero-section">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-purple-300/30 blur-3xl -z-10" />
      <div className="absolute top-1/3 right-1/10 w-96 h-96 rounded-full bg-pink-300/20 blur-3xl -z-10" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left" id="hero-left-content">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider"
            id="hero-badge"
          >
            <Sparkles className="w-3.5 h-3.5" />
            100% Free & No Login Needed
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight italic"
            id="hero-title"
          >
            Free Malayalam <br />
            <span className="bg-gradient-to-r from-purple-800 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Instagram Caption
            </span>{" "}
            Generator.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-xl font-medium leading-relaxed"
            id="hero-description"
          >
            Create bios, hooks and hashtags in seconds. Fast, original, and 100% Mallu. Supercharge your social media game with authentic Kerala vibes!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2"
            id="hero-buttons"
          >
            <button
              onClick={() => scrollToId("generator")}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-bold shadow-lg shadow-pink-200/50 hover:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              id="btn-hero-generate"
            >
              Generate Caption
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToId("categories")}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              id="btn-hero-categories"
            >
              Explore Categories
            </button>
          </motion.div>

          {/* Social Stats Proofing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-6 mt-4 border-t border-neutral-200/50 pt-6 w-full"
            id="hero-proof"
          >
            <div className="flex -space-x-2">
              <div className="w-9 h-9 rounded-full ring-2 ring-white bg-purple-500 flex items-center justify-center text-white text-xs font-bold">K</div>
              <div className="w-9 h-9 rounded-full ring-2 ring-white bg-pink-500 flex items-center justify-center text-white text-xs font-bold">M</div>
              <div className="w-9 h-9 rounded-full ring-2 ring-white bg-orange-500 flex items-center justify-center text-white text-xs font-bold">A</div>
            </div>
            <p className="text-sm text-neutral-500 font-medium text-left">
              Loved by <span className="text-purple-600 font-extrabold">10,000+</span> Kerala creators, influencers and local brands.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Visual Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
          id="hero-right-preview"
        >
          <div className="relative w-full max-w-sm rounded-3xl bg-neutral-900 text-white p-1 shadow-2xl border border-neutral-800 shadow-purple-500/5 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-orange-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center text-xs font-extrabold text-pink-500">
                    CM
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-black tracking-wide flex items-center gap-1">
                    caption_mallu
                    <span className="inline-block w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white">✓</span>
                  </h4>
                  <p className="text-[9px] font-medium text-neutral-400">Kochi, Kerala</p>
                </div>
              </div>
              <Instagram className="w-5 h-5 text-neutral-400" />
            </div>

            {/* Post Image Mockup */}
            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-800 flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 text-[10px] bg-neutral-950/40 backdrop-blur-sm text-neutral-200 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Kerala Aesthetics
              </div>
              
              <div className="flex flex-col items-center gap-4 max-w-xs z-10">
                <p className="text-lg md:text-xl font-medium text-cream leading-relaxed text-neutral-100 font-sans tracking-wide">
                  "മഴയും ഒരു കപ്പ് കട്ടൻ ചായയും... കൂടെ പ്രിയപ്പെട്ട നിന്റെ ഓർമ്മകളും. ☕☔️"
                </p>
                <div className="h-0.5 w-12 bg-pink-500 rounded-full" />
                <p className="text-xs font-mono text-neutral-300">#chayavibes #keralarain</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between px-4 py-3.5 border-t border-neutral-800">
              <div className="flex items-center gap-4 text-neutral-400">
                <Heart className="w-5.5 h-5.5 hover:text-red-500 hover:fill-red-500 cursor-pointer transition-colors" />
                <MessageCircle className="w-5.5 h-5.5 hover:text-neutral-200 cursor-pointer transition-colors" />
                <Send className="w-5.5 h-5.5 hover:text-neutral-200 cursor-pointer transition-colors" />
              </div>
              <Bookmark className="w-5.5 h-5.5 text-neutral-400 hover:text-neutral-200 cursor-pointer transition-colors" />
            </div>

            {/* Caption & Comments Area */}
            <div className="px-4 pb-4 text-left border-t border-neutral-800 pt-3">
              <p className="text-[11px] text-neutral-400 font-medium">
                Liked by <span className="text-neutral-100 font-bold">kochi_creators</span> and <span className="text-neutral-100 font-bold">8,492 others</span>
              </p>
              <p className="text-xs mt-1.5 leading-relaxed text-neutral-200">
                <span className="font-bold text-neutral-100 mr-1.5">caption_mallu</span>
                മഴയുള്ള വൈകുന്നേരങ്ങളിൽ ഇതിൽ കൂടുതൽ മറ്റെന്ത് വേണം! ഈ മനോഹരമായ ക്യാപ്ഷൻ ഇഷ്ടപ്പെട്ടെങ്കിൽ CaptionMallu ഉപയോഗിച്ച് സൗജന്യമായി കൂടുതൽ കണ്ടെത്തൂ! 🌸✨
              </p>
              <p className="text-[10px] text-neutral-500 mt-2 font-semibold">2 HOURS AGO</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
