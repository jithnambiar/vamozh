/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Instagram, 
  MessageCircle, 
  Send, 
  Heart, 
  Bookmark, 
  Copy, 
  Check, 
  Zap, 
  TrendingUp,
  Flame,
  Coffee,
  HeartHandshake,
  Palmtree,
  Smile
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

const HERO_PREVIEWS = [
  {
    id: "rain",
    tag: "Aesthetic / Rain",
    emoji: "☕☔",
    textMl: "മഴയും ഒരു കപ്പ് കട്ടൻ ചായയും... കൂടെ പ്രിയപ്പെട്ട നിന്റെ ഓർമ്മകളും. ☕☔️",
    textManglish: "Mazhayum oru cup kattan chayayum... koode priyapetta ninte ormakalum. ☕☔️",
    hashtags: "#chayavibes #keralarain #monsoon",
    bg: "from-indigo-950 via-purple-900 to-pink-800",
    likes: "8,492"
  },
  {
    id: "attitude",
    tag: "Attitude / Class",
    emoji: "😎🔥",
    textMl: "സ്വന്തം വഴികളിലൂടെ ഒറ്റയ്ക്ക് നടന്നു തീർത്തവനാണ് മറ്റുള്ളവരുടെ വിജയം കണ്ട് അസൂയപ്പെടാത്തത്. 🔥👑",
    textManglish: "Swantham vazhikaliloode ottaykku nadannu theerthavanu mattullavarude vijayam kandu asooyappedathathu. 🔥👑",
    hashtags: "#attitude #keralaboy #classy",
    bg: "from-zinc-950 via-slate-900 to-purple-950",
    likes: "12,340"
  },
  {
    id: "love",
    tag: "Love / Romantic",
    emoji: "💖🌸",
    textMl: "ചിലർ കടന്നു വരുന്നത് നമ്മുടെ ആകാശത്തിലെ മനോഹരമായ മഴവില്ലാവാനാണ്... 🌸✨",
    textManglish: "Chilar kadannu varunnathu nammude aakashathile manoharamaaya mazhavillavaanaanu... 🌸✨",
    hashtags: "#lovequotes #malayalamlove #chank",
    bg: "from-rose-950 via-pink-900 to-purple-900",
    likes: "15,810"
  },
  {
    id: "kerala",
    tag: "Kerala Pride",
    emoji: "🌴🚣",
    textMl: "പച്ചപ്പും നീലാകാശവും കയലോളങ്ങളും... ഇത് എന്റെ സ്വന്തം ദൈവാധീനമുള്ള നാട്! 🌴💚",
    textManglish: "Pachappum neelaakashavum kayalolangalum... ithu ente swantham god's own country! 🌴💚",
    hashtags: "#godsowncountry #keralagallery #backwaters",
    bg: "from-emerald-950 via-teal-900 to-cyan-950",
    likes: "9,920"
  }
];

const VIBE_CHIPS = [
  { label: "☕ Kattans & Rain", keyword: "chaya rain", icon: Coffee },
  { label: "🌴 Kerala Pride", keyword: "kerala", icon: Palmtree },
  { label: "😎 Attitude Lines", keyword: "attitude", icon: Flame },
  { label: "💖 Love & Romance", keyword: "love", icon: HeartHandshake },
  { label: "🤪 Funny & Trolls", keyword: "funny", icon: Smile },
];

export default function Hero() {
  const { t, language } = useLanguage();
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [scriptMode, setScriptMode] = useState<"ml" | "manglish">("ml");

  const currentPreview = HERO_PREVIEWS[activePreviewIndex];

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

  const handleCopyPreview = () => {
    const textToCopy = scriptMode === "ml" ? currentPreview.textMl : currentPreview.textManglish;
    navigator.clipboard.writeText(`${textToCopy}\n${currentPreview.hashtags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 md:pt-8 md:pb-20 px-4 sm:px-6 lg:px-8" id="hero-section">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-purple-300/30 blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-1/10 w-[500px] h-[500px] rounded-full bg-pink-300/25 blur-3xl -z-10" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4 md:gap-6 text-left" id="hero-left-content">
            
            {/* Live Indicator Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-orange-900/10 border border-purple-200/80 shadow-sm"
              id="hero-badge"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-600"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-purple-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                {t("heroBadge")}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] font-sans"
              id="hero-title"
            >
              {t("heroTitleFirst")} <br />
              <span className="bg-gradient-to-r from-purple-950 via-pink-600 to-amber-600 bg-clip-text text-transparent italic font-serif">
                {t("heroTitleSecond")}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed"
              id="hero-description"
            >
              {t("heroSubtitle")}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mt-2"
              id="hero-buttons"
            >
              <button
                onClick={() => scrollToId("generator")}
                className="px-8 py-4 bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white rounded-2xl font-bold shadow-xl shadow-purple-950/20 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group cursor-pointer text-sm md:text-base uppercase tracking-wider"
                id="btn-hero-generate"
              >
                <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                {t("btnFindPerfect")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToId("categories")}
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md text-sm md:text-base uppercase tracking-wider"
                id="btn-hero-categories"
              >
                {language === 'en' ? "Explore Categories" : "വിഭാഗങ്ങൾ കാണുക"}
              </button>
            </motion.div>

            {/* Quick Vibe Chips Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full pt-2"
            >
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                ⚡ Instant Vibe Launcher:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {VIBE_CHIPS.map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={chip.label}
                      onClick={() => {
                        scrollToId("generator");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white border border-slate-200/80 hover:border-purple-300 text-slate-700 hover:text-purple-900 rounded-xl text-xs font-semibold shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
                    >
                      <Icon className="w-3.5 h-3.5 text-pink-500 group-hover:scale-110 transition-transform" />
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Social Proof & Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/70 w-full mt-2"
              id="hero-proof"
            >
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-1">
                  10,000+
                  <TrendingUp className="w-4 h-4 text-emerald-500 inline-block" />
                </span>
                <span className="text-xs text-slate-500 font-medium">Kerala Creators</span>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  100% Free
                </span>
                <span className="text-xs text-slate-500 font-medium">No Sign-up Needed</span>
              </div>

              <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="text-2xl md:text-3xl font-black text-purple-900 tracking-tight">
                  0.2s
                </span>
                <span className="text-xs text-slate-500 font-medium">Instant Generation</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
            id="hero-right-preview"
          >
            {/* Floating Badge 1 */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="hidden sm:flex absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 items-center gap-2.5 max-w-[180px]"
            >
              <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-black text-slate-900 leading-tight">Manglish Transliterated</p>
                <p className="text-[9px] text-slate-500 font-medium">Safe local typing</p>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="hidden sm:flex absolute -bottom-4 -right-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 items-center gap-2.5 max-w-[190px]"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-black text-slate-900 leading-tight">1-Click Instagram Copy</p>
                <p className="text-[9px] text-slate-500 font-medium">Ready with hashtags</p>
              </div>
            </motion.div>

            {/* Phone Card Shell */}
            <div className="relative w-full max-w-sm rounded-[32px] bg-slate-950 text-white p-1.5 shadow-2xl border border-slate-800 shadow-purple-950/20 overflow-hidden">
              
              {/* Phone Top Header */}
              <div className="flex items-center justify-between p-3.5 border-b border-slate-800/80 bg-slate-950/90">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-black text-pink-400">
                      VM
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-black tracking-wide flex items-center gap-1">
                      vamozhi.app
                      <span className="inline-block w-3.5 h-3.5 bg-blue-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">✓</span>
                    </h4>
                    <p className="text-[9px] font-semibold text-slate-400">Live Interactive Preview</p>
                  </div>
                </div>

                {/* Script Switcher inside phone header */}
                <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setScriptMode("ml")}
                    className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase transition-all cursor-pointer ${
                      scriptMode === "ml" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    മലയാളം
                  </button>
                  <button
                    onClick={() => setScriptMode("manglish")}
                    className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase transition-all cursor-pointer ${
                      scriptMode === "manglish" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Manglish
                  </button>
                </div>
              </div>

              {/* Dynamic Preset Tabs Bar */}
              <div className="flex items-center justify-around bg-slate-900/90 border-b border-slate-800/60 p-1.5">
                {HERO_PREVIEWS.map((prev, idx) => (
                  <button
                    key={prev.id}
                    onClick={() => setActivePreviewIndex(idx)}
                    className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activePreviewIndex === idx
                        ? "bg-white/15 text-white ring-1 ring-white/20 shadow-xs"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span>{prev.emoji}</span>
                    <span className="hidden xs:inline">{prev.tag.split(" / ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Post Canvas Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPreview.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className={`aspect-square relative overflow-hidden bg-gradient-to-br ${currentPreview.bg} flex flex-col justify-between p-6 text-center shadow-inner`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Top Tag Pill */}
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] bg-slate-950/60 backdrop-blur-md text-purple-200 px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold border border-white/10">
                      {currentPreview.tag}
                    </span>
                    <span className="text-[10px] bg-amber-500/20 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                      🔥 Trending
                    </span>
                  </div>

                  {/* Caption Text Box */}
                  <div className="my-auto z-10 px-2">
                    <p className="text-base sm:text-lg font-medium leading-relaxed text-white drop-shadow-sm font-sans tracking-wide">
                      "{scriptMode === "ml" ? currentPreview.textMl : currentPreview.textManglish}"
                    </p>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto my-3 rounded-full opacity-80" />
                    <p className="text-xs font-mono text-purple-200/90 font-medium">
                      {currentPreview.hashtags}
                    </p>
                  </div>

                  {/* Copy Button overlay */}
                  <div className="z-10 flex justify-center">
                    <button
                      onClick={handleCopyPreview}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border border-white/20 active:scale-95 shadow-md"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-white" />
                          <span>Copy Caption</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Icons Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 bg-slate-950">
                <div className="flex items-center gap-4 text-slate-400">
                  <Heart className="w-5 h-5 hover:text-red-500 hover:fill-red-500 cursor-pointer transition-colors" />
                  <MessageCircle className="w-5 h-5 hover:text-slate-200 cursor-pointer transition-colors" />
                  <Send className="w-5 h-5 hover:text-slate-200 cursor-pointer transition-colors" />
                </div>
                <Bookmark className="w-5 h-5 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors" />
              </div>

              {/* Mock Social Footer */}
              <div className="px-4 pb-4 text-left border-t border-slate-900 bg-slate-950 pt-2.5">
                <p className="text-[11px] text-slate-400 font-medium">
                  Liked by <span className="text-slate-100 font-bold">kerala_creators</span> and <span className="text-slate-100 font-bold">{currentPreview.likes} others</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tap "Generate" below to search 1,000+ custom Malayalam captions!
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

