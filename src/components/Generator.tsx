/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { generateCaptions } from "../data/captions";
import { 
  Sparkles, 
  HelpCircle, 
  AlignLeft, 
  Globe, 
  Filter, 
  MessageSquare, 
  Flame, 
  Smile, 
  Activity, 
  Hash, 
  Compass, 
  Loader2 
} from "lucide-react";

interface GeneratorProps {
  onGenerate: (results: Array<{ text: string; hashtags: string[]; id: string }>) => void;
  onSuccessMessage: (msg: string) => void;
  currentPath: string;
}

const PLATFORMS = [
  { id: "instagram", name: "Instagram 📸" },
  { id: "facebook", name: "Facebook 👥" },
  { id: "whatsapp", name: "WhatsApp 💬" },
  { id: "snapchat", name: "Snapchat 👻" },
  { id: "tiktok", name: "TikTok 🎵" },
  { id: "arike", name: "Arike Dating 💖" },
  { id: "bumble", name: "Bumble 🐝" },
  { id: "matrimony", name: "Matrimony 💍" }
] as const;

const CATEGORIES = [
  { id: "love", name: "Love 💖" },
  { id: "attitude", name: "Attitude 😎" },
  { id: "travel", name: "Travel ✈️" },
  { id: "friendship", name: "Friendship 👬" },
  { id: "wedding", name: "Wedding 💍" },
  { id: "self-love", name: "Self-Love 🌸" },
  { id: "motivation", name: "Motivation 🎯" },
  { id: "aesthetic", name: "Aesthetic 🍂" },
  { id: "funny", name: "Funny 🤪" },
  { id: "kerala", name: "Kerala 🌴" },
  { id: "photography", name: "Photography 📸" },
  { id: "business", name: "Business 💼" }
] as const;

const TONES = [
  { id: "short", name: "Short ⚡" },
  { id: "emotional", name: "Emotional 🥺" },
  { id: "classy", name: "Classy ✨" },
  { id: "cute", name: "Cute 🥰" },
  { id: "bold", name: "Bold 🔥" },
  { id: "funny", name: "Funny 😂" },
  { id: "romantic", name: "Romantic ❤️" },
  { id: "professional", name: "Professional 💼" }
] as const;

const MOODS = [
  { id: "cheerful", name: "Cheerful ☀️" },
  { id: "calm", name: "Calm 🍃" },
  { id: "sarcastic", name: "Sarcastic 😏" },
  { id: "romantic", name: "Romantic 💕" },
  { id: "motivational", name: "Motivational 🏆" },
  { id: "emotional", name: "Emotional 🥺" }
] as const;

const OCCASIONS = [
  { id: "general", name: "General Occasion 🌟" },
  { id: "festival", name: "Festival / Onam / Vishu 🪔" },
  { id: "birthday", name: "Birthday 🎂" },
  { id: "anniversary", name: "Anniversary 🎉" },
  { id: "weekend", name: "Weekend Vibe 🏖️" }
] as const;

export default function Generator({ onGenerate, onSuccessMessage, currentPath }: GeneratorProps) {
  // Main states
  const [contentType, setContentType] = useState<string>("photo-caption");
  const [platform, setPlatform] = useState<string>("instagram");
  const [language, setLanguage] = useState<"malayalam" | "manglish" | "mixed">("malayalam");
  const [category, setCategory] = useState<string>("love");
  const [mood, setMood] = useState<string>("cheerful");
  const [occasion, setOccasion] = useState<string>("general");
  const [tone, setTone] = useState<string>("classy");
  const [length, setLength] = useState<"one-line" | "short" | "medium" | "detailed">("medium");
  const [emojiSetting, setEmojiSetting] = useState<"none" | "minimal" | "more">("minimal");
  const [hashtagCount, setHashtagCount] = useState<"none" | "5" | "10" | "15">("5");
  const [resultsCount, setResultsCount] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Monitor path changes to pre-configure appropriate presets
  useEffect(() => {
    if (!currentPath) return;

    if (currentPath === "/instagram-caption-generator") {
      setContentType("photo-caption");
      setPlatform("instagram");
    } else if (currentPath === "/facebook-caption-generator") {
      setContentType("photo-caption");
      setPlatform("facebook");
    } else if (currentPath === "/whatsapp-status-generator") {
      setContentType("photo-caption");
      setPlatform("whatsapp");
    } else if (currentPath === "/snapchat-caption-generator") {
      setContentType("photo-caption");
      setPlatform("snapchat");
    } else if (currentPath === "/tiktok-caption-generator") {
      setContentType("photo-caption");
      setPlatform("tiktok");
    } else if (currentPath === "/malayalam-instagram-bio") {
      setContentType("bio");
      setPlatform("instagram");
    } else if (currentPath === "/malayalam-reel-hooks") {
      setContentType("hook");
      setPlatform("instagram");
    } else if (currentPath === "/arike-bio-generator") {
      setContentType("bio");
      setPlatform("arike");
      setCategory("love");
    } else if (currentPath === "/bumble-bio-generator") {
      setContentType("bio");
      setPlatform("bumble");
      setCategory("love");
    } else if (currentPath === "/matrimony-bio-generator") {
      setContentType("bio");
      setPlatform("matrimony");
      setCategory("wedding");
    } else if (currentPath === "/malayalam-hashtags") {
      setContentType("hashtag_set");
    }
  }, [currentPath]);

  const handleGenerateClick = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      platform,
      contentType,
      language,
      category,
      mood,
      occasion,
      tone,
      length,
      emojiSetting,
      resultsCount,
      keyword,
      hashtagCount
    };

    try {
      // Call production-ready API route
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        onGenerate(data.results);
        onSuccessMessage(data.message || `Generated ${data.results.length} original captions successfully!`);
      } else {
        throw new Error("Server generation returned non-200 state");
      }
    } catch (err) {
      console.warn("API route failed or key missing, falling back to client-side database:", err);
      // Client-side scoring engine fallback
      const localResult = generateCaptions({
        platform,
        contentType,
        language: language === "mixed" ? "mixed" : language,
        category,
        mood,
        occasion,
        tone,
        length,
        emojiSetting,
        resultsCount,
        keyword,
        hashtagCount
      });
      onGenerate(localResult.results);
      onSuccessMessage(localResult.message || `Generated ${localResult.results.length} offline captions!`);
    } finally {
      setIsLoading(false);

      // Scroll to result list smoothly
      setTimeout(() => {
        const element = document.getElementById("results-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto" id="generator">
      
      {/* Dynamic Header based on route */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-black tracking-widest uppercase inline-block mb-3">
          Interactive Writing Studio
        </span>
        <h2 className="text-3xl font-black tracking-tight text-neutral-900" id="generator-heading">
          {contentType === "bio" ? "Malayalam Profile Bio Creator" : 
           contentType === "hook" ? "Malayalam Reel Hooks Creator" : 
           contentType === "hashtag_set" ? "Kerala Social Hashtags Generator" : 
           "Social Caption Generator"}
        </h2>
        <p className="text-sm text-neutral-500 mt-2">
          Fine-tune the custom filters below. Vamozhi automatically matches and scores hundreds of handwritten, family-safe captions.
        </p>
      </div>

      {/* Main Form Glass Bento Layout */}
      <form
        onSubmit={handleGenerateClick}
        className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-200 relative"
        id="generator-form"
      >
        {/* Loading Spinner Overlays */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs z-30 flex flex-col items-center justify-center gap-3 rounded-[32px] animate-fade-in" id="loading-overlay">
            <Loader2 className="w-10 h-10 text-purple-800 animate-spin" />
            <span className="text-xs font-extrabold text-purple-950 uppercase tracking-widest animate-pulse">
              Generating Malayalam Masterpieces...
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
          
          {/* LEFT BENTO BLOCK */}
          <div className="flex flex-col gap-5">
            
            {/* 1. Content Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-purple-700" />
                1. What are you writing?
              </label>
              <div className="grid grid-cols-2 gap-2" id="input-content-type">
                {[
                  { id: "photo-caption", label: "Instagram Caption" },
                  { id: "bio", label: "Profile Bio" },
                  { id: "hook", label: "Reel Hook" },
                  { id: "hashtag_set", label: "Hashtags Only" }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setContentType(type.id)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      contentType === type.id
                        ? "bg-slate-900 text-white border-transparent shadow-sm"
                        : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Platform */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-purple-700" />
                2. Target Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                id="input-platform-select"
              >
                {PLATFORMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Language Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-purple-700" />
                3. Script & Language
              </label>
              <div className="grid grid-cols-3 gap-2" id="input-language">
                {[
                  { id: "malayalam", label: "മലയാളം" },
                  { id: "manglish", label: "Manglish" },
                  { id: "mixed", label: "Mixed 🇬🇧" }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setLanguage(lang.id as any)}
                    className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      language === lang.id
                        ? "border-purple-600 bg-purple-50 text-purple-700 font-extrabold"
                        : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Keyword */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-purple-700" />
                4. Keyword to Weave In
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="E.g., tea, rain, kochi, kalyanam"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400"
                id="input-keyword"
              />
            </div>

          </div>

          {/* RIGHT BENTO BLOCK */}
          <div className="flex flex-col gap-5">
            
            {/* 5. Vibe Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-purple-700" />
                5. Vibe Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                id="input-category-select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 6. Expressive Tone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-purple-700" />
                6. Expressive Tone Style
              </label>
              <div className="grid grid-cols-4 gap-1.5" id="input-tone-grid">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id)}
                    className={`py-2 rounded-lg border text-[10px] font-bold transition-all cursor-pointer truncate ${
                      tone === t.id
                        ? "border-slate-900 bg-slate-50 text-slate-900 font-extrabold"
                        : "bg-white hover:bg-slate-50 text-slate-500 border-slate-200"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. Mood & Occasion */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                  <Smile className="w-3.5 h-3.5 text-purple-600" />
                  Mood Vibe
                </label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                >
                  {MOODS.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-purple-600" />
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                >
                  {OCCASIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 8. Length & Emojis */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                  Output Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value as any)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                >
                  <option value="one-line">One-liner ⚡</option>
                  <option value="short">Short (1-2 sentences)</option>
                  <option value="medium">Medium (standard)</option>
                  <option value="detailed">Detailed (blog/post style)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                  Emoji Level
                </label>
                <select
                  value={emojiSetting}
                  onChange={(e) => setEmojiSetting(e.target.value as any)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                >
                  <option value="none">No Emojis 🚫</option>
                  <option value="minimal">Minimal ✨</option>
                  <option value="more">More 🥳🔥</option>
                </select>
              </div>
            </div>

            {/* 9. Hashtags & Result Counts */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5 text-purple-600" />
                  Hashtag Count
                </label>
                <select
                  value={hashtagCount}
                  onChange={(e) => setHashtagCount(e.target.value as any)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                >
                  <option value="none">No Hashtags</option>
                  <option value="5">5 Tags</option>
                  <option value="10">10 Tags</option>
                  <option value="15">15 Tags</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                  Options Count
                </label>
                <select
                  value={resultsCount}
                  onChange={(e) => setResultsCount(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                >
                  <option value={5}>5 Options</option>
                  <option value={10}>10 Options</option>
                  <option value={20}>20 Options</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Generate CTA Trigger */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-purple-800 via-pink-600 to-orange-500 hover:scale-[0.98] text-white text-sm font-extrabold rounded-2xl transition-all shadow-md shadow-pink-100 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            id="btn-trigger-generate"
          >
            <Sparkles className="w-4.5 h-4.5 animate-pulse" />
            Generate Captions
          </button>
        </div>

      </form>
    </section>
  );
}
