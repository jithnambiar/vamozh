/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { generateCaptions } from "../data/captions";
import { Sparkles, HelpCircle, AlignLeft, Globe, Filter, MessageSquare, Flame } from "lucide-react";

interface GeneratorProps {
  onGenerate: (results: Array<{ text: string; hashtags: string[]; id: string }>) => void;
  onSuccessMessage: (msg: string) => void;
}

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

export default function Generator({ onGenerate, onSuccessMessage }: GeneratorProps) {
  // Select state values
  const [contentType, setContentType] = useState<'caption' | 'bio' | 'hook' | 'hashtag_set'>('caption');
  const [language, setLanguage] = useState<'malayalam' | 'manglish' | 'mixed'>('malayalam');
  const [category, setCategory] = useState<typeof CATEGORIES[number]['id']>('love');
  const [tone, setTone] = useState<typeof TONES[number]['id']>('classy');
  const [keyword, setKeyword] = useState<string>("");
  const [emojiSetting, setEmojiSetting] = useState<'none' | 'minimal' | 'more'>('minimal');
  const [resultsCount, setResultsCount] = useState<number>(5);

  const handleGenerateClick = (e: FormEvent) => {
    e.preventDefault();
    
    const results = generateCaptions({
      contentType,
      language,
      category,
      tone,
      keyword,
      emojiSetting,
      resultsCount
    });

    onGenerate(results);
    onSuccessMessage(`Generated ${results.length} original captions successfully!`);
    
    // Smooth scroll down to the results block
    setTimeout(() => {
      const element = document.getElementById("results-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto" id="generator">
      {/* Visual Anchor Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-black tracking-tight text-neutral-900" id="generator-heading">
          Caption Generation Studio
        </h2>
        <p className="text-sm text-neutral-500 mt-2">
          Configure your preferences below and let CaptionMallu weave the perfect words for your posts.
        </p>
      </div>

      {/* Main Generator Glass Form Card */}
      <form
        onSubmit={handleGenerateClick}
        className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-200 relative overflow-hidden"
        id="generator-form"
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Left Inputs Block */}
          <div className="flex flex-col gap-5 text-left" id="inputs-left">
            
            {/* Control 1: Content Type */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-slate-800 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlignLeft className="w-4 h-4 text-slate-700" />
                1. What are you writing?
              </label>
              <div className="grid grid-cols-2 gap-2" id="input-content-type">
                {(
                  [
                    { id: "caption", label: "Instagram Caption" },
                    { id: "bio", label: "Profile Bio" },
                    { id: "hook", label: "Reel Hook" },
                    { id: "hashtag_set", label: "Hashtags Only" }
                  ] as const
                ).map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setContentType(type.id)}
                    className={`py-3 px-4 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
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

            {/* Control 2: Language */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-slate-800 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-slate-700" />
                2. Caption Language
              </label>
              <div className="grid grid-cols-3 gap-2" id="input-language">
                {(
                  [
                    { id: "malayalam", label: "മലയാളം" },
                    { id: "manglish", label: "Manglish" },
                    { id: "mixed", label: "Mixed 🇬🇧" }
                  ] as const
                ).map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setLanguage(lang.id)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
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

            {/* Control 3: Keyword Search */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-slate-800 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-slate-700" />
                3. Optional Keyword or Topic
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="E.g., tea, rain, bff, kochi, etc."
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400"
                id="input-keyword"
              />
              <span className="text-[10px] text-slate-400 leading-normal">
                Leave empty for general category captions. We'll inject keywords organically when entered.
              </span>
            </div>

          </div>

          {/* Right Inputs Block */}
          <div className="flex flex-col gap-5 text-left" id="inputs-right">
            
            {/* Control 4: Category Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-slate-800 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-slate-700" />
                4. Select Vibe Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof CATEGORIES[number]['id'])}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                id="input-category-select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Control 5: Tone Select */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-extrabold text-slate-800 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-slate-700" />
                5. Expressive Tone Style
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
                    title={t.name}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 6: Emoji & Count Row */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-extrabold text-slate-800 dark:text-neutral-300 uppercase tracking-wider">
                  6. Emoji Settings
                </label>
                <select
                  value={emojiSetting}
                  onChange={(e) => setEmojiSetting(e.target.value as 'none' | 'minimal' | 'more')}
                  className="w-full px-3 py-3.5 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer text-slate-800"
                  id="input-emoji-setting"
                >
                  <option value="none">No Emojis 🚫</option>
                  <option value="minimal">Minimal ✨</option>
                  <option value="more">More 🥳🔥</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-extrabold text-slate-800 dark:text-neutral-300 uppercase tracking-wider">
                  7. Results Count
                </label>
                <div className="flex gap-1" id="input-results-count">
                  {([5, 10, 20] as const).map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setResultsCount(num)}
                      className={`flex-1 py-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        resultsCount === num
                          ? "border-slate-900 bg-slate-900 text-white font-extrabold shadow-sm"
                          : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Generate Trigger Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4.5 bg-gradient-to-r from-purple-800 to-pink-600 hover:scale-[0.98] text-white text-base font-extrabold rounded-2xl transition-all shadow-md shadow-pink-100 flex items-center justify-center gap-2.5 cursor-pointer"
            id="btn-trigger-generate"
          >
            <Sparkles className="w-5.5 h-5.5 animate-pulse" />
            Generate Captions Now
          </button>
        </div>

      </form>
    </section>
  );
}
