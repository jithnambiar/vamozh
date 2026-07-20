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
  Hash, 
  Compass, 
  Loader2,
  Mic
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";


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
  { id: "business", name: "Business 💼" },
  { id: "makeover_artist", name: "Makeover Artist ✨" },
  { id: "fashion", name: "Fashion & Style 👗" },
  { id: "techie", name: "Techie 💻" },
  { id: "coder", name: "Coder 🚀" },
  { id: "nostalgia", name: "Nostalgia 📻" }
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
  const { t, language: uiLang } = useLanguage();
  // Main states

  const [contentType, setContentType] = useState<string>("photo-caption");
  const [platform, setPlatform] = useState<string>("instagram");
  const [language, setLanguage] = useState<"malayalam" | "manglish" | "english" | "mixed">("malayalam");
  const [category, setCategory] = useState<string>("love");
  const [mood, setMood] = useState<string>("cheerful");
  const [occasion, setOccasion] = useState<string>("general");
  const [tone, setTone] = useState<string>("classy");
  const [length, setLength] = useState<"one-line" | "short" | "medium" | "detailed">("medium");
  const [emojiSetting, setEmojiSetting] = useState<"none" | "minimal" | "more">("minimal");
  const [hashtagCount, setHashtagCount] = useState<"none" | "5" | "10" | "15">("5");
  const [resultsCount, setResultsCount] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListeningKeyword, setIsListeningKeyword] = useState(false);

  const toggleKeywordSpeech = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onSuccessMessage("Speech Recognition is not supported in this browser. Try Google Chrome.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "ml-IN"; // Malayalam Voice recognition
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => {
      setIsListeningKeyword(true);
      onSuccessMessage("Listening... Speak a keyword in Malayalam 🎙️");
    };

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setKeyword(transcript);
        onSuccessMessage(`Recognized: "${transcript}" ✨`);
      }
    };

    rec.onerror = (event: any) => {
      console.error(event);
      setIsListeningKeyword(false);
    };

    rec.onend = () => {
      setIsListeningKeyword(false);
    };

    try {
      rec.start();
    } catch (err) {
      console.error(err);
      setIsListeningKeyword(false);
    }
  };

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
          {uiLang === 'en' ? "Interactive Writing Studio" : "ഇന്ററാക്ടീവ് റൈറ്റിംഗ് സ്റ്റുഡിയോ"}
        </span>
        <h2 className="text-3xl font-black tracking-tight text-neutral-900" id="generator-heading">
          {contentType === "bio" ? (uiLang === 'en' ? "Malayalam Profile Bio Creator" : "മലയാളം പ്രൊഫൈൽ ബയോ ക്രിയേറ്റർ") : 
           contentType === "hook" ? (uiLang === 'en' ? "Malayalam Reel Hooks Creator" : "മലയാളം റീൽ ഹൂക്ക്സ് ക്രിയേറ്റർ") : 
           contentType === "hashtag_set" ? (uiLang === 'en' ? "Kerala Social Hashtags Generator" : "കേരളാ ഹാഷ്‌ടാഗ് ജനറേറ്റർ") : 
           (uiLang === 'en' ? "Social Caption Generator" : "സോഷ്യൽ ക്യാപ്ഷൻ ജനറേറ്റർ")}
        </h2>
        <p className="text-sm text-neutral-500 mt-2">
          {uiLang === 'en' ? "Fine-tune the custom filters below. Vamozhi automatically matches and scores hundreds of handwritten, family-safe captions." : "താഴെയുള്ള ഫിൽട്ടറുകൾ ക്രമീകരിക്കുക. വമൊഴി നിങ്ങൾക്കായി ഏറ്റവും മികച്ചതും കുടുംബത്തോടൊപ്പം വായിക്കാൻ കഴിയുന്നതുമായ യഥാർത്ഥ വരികൾ നൽകുന്നു."}
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
              {t("generating")}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-6 text-left">
          
          {/* CORE FIELDS (Simple, high-impact grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="core-fields-grid">
            
            {/* 1. Content Type */}
            <div className="flex flex-col gap-1.5" id="field-content-type">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-purple-700" />
                {t("step1")}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2" id="input-content-type">
                {[
                  { id: "photo-caption", label: uiLang === 'en' ? "Photo Caption" : "ഫോട്ടോ ക്യാപ്ഷൻ" },
                  { id: "bio", label: uiLang === 'en' ? "Profile Bio" : "പ്രൊഫൈൽ ബയോ" },
                  { id: "hook", label: uiLang === 'en' ? "Reel Hook" : "റീൽ ഹൂക്ക്" },
                  { id: "pickup_line", label: uiLang === 'en' ? "Pickup Line 💬" : "പിക്ക്അപ്പ് ലൈൻ 💬" },
                  { id: "hashtag_set", label: uiLang === 'en' ? "Hashtags only" : "ഹാഷ്‌ടാഗുകൾ മാത്രം" }
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

            {/* 2. Vibe Category */}
            <div className="flex flex-col gap-1.5" id="field-vibe-category">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-purple-700" />
                {t("step4")}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800 h-[46px]"
                id="input-category-select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {t("cat_" + cat.id.replace("-", ""))}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Language Selector */}
            <div className="flex flex-col gap-1.5" id="field-language">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-purple-700" />
                {t("step3")}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" id="input-language">
                {[
                  { id: "malayalam", label: "മലയാളം" },
                  { id: "manglish", label: "Manglish" },
                  { id: "english", label: "English" },
                  { id: "mixed", label: uiLang === 'en' ? "Mixed 🇬🇧" : "മിക്സഡ് 🇬🇧" }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setLanguage(lang.id as any)}
                    className={`py-2.5 px-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
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
            <div className="flex flex-col gap-1.5" id="field-keyword">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 justify-between">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-700" />
                  {t("step6")}
                </span>
              </label>
              <div className="relative flex items-center w-full">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={uiLang === 'en' ? "E.g., tea, rain, kochi, kalyanam" : "ഉദാ: ചായ, മഴ, കൊച്ചി, കല്യാണം"}
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400 h-[46px]"
                  id="input-keyword"
                />
                <button
                  type="button"
                  onClick={toggleKeywordSpeech}
                  className={`absolute right-2 p-2 rounded-lg transition-all cursor-pointer ${
                    isListeningKeyword 
                      ? "bg-red-600 text-white animate-pulse" 
                      : "text-slate-400 hover:text-purple-700 hover:bg-slate-150"
                  }`}
                  title="Speak keyword in Malayalam"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* ADVANCED COLLAPSIBLE CONTROL BUTTON */}
          <div className="flex justify-center border-t border-slate-100 pt-4" id="advanced-toggle-bar">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-700 transition-all cursor-pointer py-1 px-3.5 rounded-full hover:bg-slate-50 border border-slate-200 shadow-sm"
              id="btn-toggle-advanced"
            >
              <span>{showAdvanced ? "Hide Advanced Fine-Tuning ⚙️" : "Customize Style & Settings (Tone, Length, Emojis) ⚙️"}</span>
            </button>
          </div>

          {/* ADVANCED FIELDS (Collapsible panel) */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50/70 dark:bg-neutral-900/40 rounded-3xl border border-slate-200/60 transition-all duration-300" id="advanced-fields-panel">
              
              {/* Target Platform */}
              <div className="flex flex-col gap-1.5" id="field-platform">
                <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-purple-700" />
                  {uiLang === 'en' ? "Target Platform" : "സോഷ്യൽ മീഡിയ പ്ലാറ്റ്‌ഫോം"}
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

              {/* Expressive Tone Style */}
              <div className="flex flex-col gap-1.5" id="field-tone">
                <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-purple-700" />
                  {uiLang === 'en' ? "Expressive Tone Style" : "എഴുത്ത് രീതി (Tone)"}
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

              {/* Length & Emojis */}
              <div className="grid grid-cols-2 gap-3" id="field-length-emojis-grid">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                    {uiLang === 'en' ? "Output Length" : "വരികളുടെ നീളം"}
                  </label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value as any)}
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                  >
                    <option value="one-line">{uiLang === 'en' ? "One-liner ⚡" : "ഒറ്റ വരിയിൽ ⚡"}</option>
                    <option value="short">{uiLang === 'en' ? "Short (1-2 sentences)" : "ചെറുത് (1-2 വാക്യങ്ങൾ)"}</option>
                    <option value="medium">{uiLang === 'en' ? "Medium (standard)" : "സാധാരണ അളവിൽ"}</option>
                    <option value="detailed">{uiLang === 'en' ? "Detailed (blog/post style)" : "വിശദമായി (കൂടുതൽ വരികൾ)"}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                    {uiLang === 'en' ? "Emoji Level" : "ഇമോജി അളവ്"}
                  </label>
                  <select
                    value={emojiSetting}
                    onChange={(e) => setEmojiSetting(e.target.value as any)}
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                  >
                    <option value="none">{uiLang === 'en' ? "No Emojis 🚫" : "ഇമോജി വേണ്ട 🚫"}</option>
                    <option value="minimal">{uiLang === 'en' ? "Minimal ✨" : "കുറച്ചു മതി ✨"}</option>
                    <option value="more">{uiLang === 'en' ? "More 🥳🔥" : "കൂടുതൽ വേണം 🥳🔥"}</option>
                  </select>
                </div>
              </div>

              {/* Hashtags & Result Counts */}
              <div className="grid grid-cols-2 gap-3" id="field-hashtags-count-grid">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-purple-600" />
                    {uiLang === 'en' ? "Hashtag Count" : "ഹാഷ്‌ടാഗ് എണ്ണം"}
                  </label>
                  <select
                    value={hashtagCount}
                    onChange={(e) => setHashtagCount(e.target.value as any)}
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                  >
                    <option value="none">{uiLang === 'en' ? "No Hashtags" : "ഹാഷ്‌ടാഗ് വേണ്ട"}</option>
                    <option value="5">{uiLang === 'en' ? "5 Tags" : "5 ടാഗുകൾ"}</option>
                    <option value="10">{uiLang === 'en' ? "10 Tags" : "10 ടാഗുകൾ"}</option>
                    <option value="15">{uiLang === 'en' ? "15 Tags" : "15 ടാഗുകൾ"}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                    {uiLang === 'en' ? "Options Count" : "ഓപ്ഷൻ എണ്ണം"}
                  </label>
                  <select
                    value={resultsCount}
                    onChange={(e) => setResultsCount(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                  >
                    <option value={5}>{uiLang === 'en' ? "5 Options" : "5 എണ്ണം"}</option>
                    <option value={10}>{uiLang === 'en' ? "10 Options" : "10 എണ്ണം"}</option>
                    <option value={20}>{uiLang === 'en' ? "20 Options" : "20 എണ്ണം"}</option>
                  </select>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Generate CTA Trigger */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-purple-800 via-pink-600 to-orange-500 hover:scale-[0.98] text-white text-sm font-extrabold rounded-2xl transition-all shadow-md shadow-pink-100 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            id="btn-trigger-generate"
          >
            <Sparkles className="w-4.5 h-4.5 animate-pulse" />
            {t("step8")}
          </button>
        </div>

      </form>
    </section>
  );
}
