/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sparkles, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface CategoriesProps {
  onSelectCategory: (catId: string) => void;
}

export const ALL_25_CATEGORIES = [
  // Popular first (Top 10)
  { id: "love", name: "Love", mlName: "പ്രണയം", emoji: "💖", desc: "Romantic, deep, and cute captions for couples.", color: "from-pink-500 to-rose-500", tag: "Romance" },
  { id: "attitude", name: "Attitude", mlName: "ആറ്റിറ്റ്യൂഡ്", emoji: "😎", desc: "Bold, mass, and classy lines to express yourself.", color: "from-purple-600 to-indigo-600", tag: "Expressive" },
  { id: "life", name: "Life", mlName: "ജീവിതം", emoji: "🌿", desc: "Thoughtful reflections on life and personal growth.", color: "from-emerald-600 to-teal-700", tag: "Lifestyle" },
  { id: "motivation", name: "Motivation", mlName: "പ്രചോദനം", emoji: "🎯", desc: "Empowering hustle quotes to fuel your dreams.", color: "from-red-500 to-orange-500", tag: "Expressive" },
  { id: "friendship", name: "Friendship", mlName: "സൗഹൃദം", emoji: "👬", desc: "Savage, emotional, and fun words for chanks.", color: "from-yellow-400 to-orange-500", tag: "Social" },
  { id: "travel", name: "Travel", mlName: "യാത്ര", emoji: "✈️", desc: "Wanderlust lines for wanderers and road trips.", color: "from-teal-500 to-emerald-500", tag: "Lifestyle" },
  { id: "wedding", name: "Wedding", mlName: "വിവാഹം", emoji: "💍", desc: "Traditional Kerala wedding and bridal captions.", color: "from-amber-500 to-rose-600", tag: "Celebration" },
  { id: "birthday", name: "Birthday", mlName: "ജന്മദിനം", emoji: "🎂", desc: "Warm birthday wishes for friends and family.", color: "from-pink-400 to-purple-600", tag: "Celebration" },
  { id: "funny", name: "Funny", mlName: "തമാശ", emoji: "🤪", desc: "Relatable humor, exams, diet jokes, and trolls.", color: "from-lime-500 to-yellow-500", tag: "Social" },
  { id: "reels", name: "Reels", mlName: "റീൽസ്", emoji: "🎬", desc: "Catchy Instagram reel hooks and viral video captions.", color: "from-purple-600 to-pink-600", tag: "Trendy" },

  // Remaining 15 Categories
  { id: "kerala", name: "Kerala", mlName: "കേരളം", emoji: "🌴", desc: "Traditional, backwaters, sadyas, and local pride.", color: "from-emerald-600 to-teal-800", tag: "Lifestyle" },
  { id: "nature", name: "Nature", mlName: "പ്രകൃതി", emoji: "🍃", desc: "Rain, mountains, greenery, and serene peace.", color: "from-green-600 to-emerald-600", tag: "Lifestyle" },
  { id: "happiness", name: "Happiness", mlName: "സന്തോഷം", emoji: "😊", desc: "Positive thoughts and joy in simple things.", color: "from-amber-400 to-yellow-500", tag: "Lifestyle" },
  { id: "sadness", name: "Sadness", mlName: "വിഷാദം", emoji: "🌧️", desc: "Deep emotional lines for quiet, reflective moments.", color: "from-slate-600 to-indigo-900", tag: "Expressive" },
  { id: "breakup", name: "Breakup", mlName: "വിരഹം", emoji: "💔", desc: "Heartbreak, moving on, and healing thoughts.", color: "from-rose-700 to-slate-900", tag: "Expressive" },
  { id: "family", name: "Family", mlName: "കുടുംബം", emoji: "🏡", desc: "Home, parents, siblings, and family togetherness.", color: "from-amber-600 to-orange-700", tag: "Social" },
  { id: "success", name: "Success", mlName: "വിജയം", emoji: "🏆", desc: "Hard work, victory, and achievement milestones.", color: "from-yellow-500 to-amber-600", tag: "Expressive" },
  { id: "self-love", name: "Self Love", mlName: "സ്വയംസ്നേഹം", emoji: "✨", desc: "Confidence, self-care, and accepting yourself.", color: "from-fuchsia-500 to-pink-600", tag: "Expressive" },
  { id: "spirituality", name: "Spirituality", mlName: "ആത്മീയം", emoji: "🕉️", desc: "Inner peace, faith, and spiritual reflection.", color: "from-amber-700 to-yellow-800", tag: "Lifestyle" },
  { id: "festivals", name: "Festivals", mlName: "ആഘോഷങ്ങൾ", emoji: "🎆", desc: "Onam, Vishu, Eid, Christmas, and festival wishes.", color: "from-red-600 to-amber-500", tag: "Celebration" },
  { id: "good-morning", name: "Good Morning", mlName: "സുപ്രഭാതം", emoji: "🌅", desc: "Fresh morning greetings to start the day right.", color: "from-orange-400 to-amber-500", tag: "Social" },
  { id: "good-night", name: "Good Night", mlName: "ശുഭരാത്രി", emoji: "🌙", desc: "Peaceful nighttime quotes and warm wishes.", color: "from-indigo-900 to-purple-950", tag: "Social" },
  { id: "photography", name: "Photography", mlName: "ഫോട്ടോഗ്രഫി", emoji: "📸", desc: "Lens angles, frames, and captured memories.", color: "from-blue-500 to-indigo-500", tag: "Social" },
  { id: "nostalgia", name: "Nostalgia", mlName: "ഓർമ്മകൾ", emoji: "📻", desc: "90s childhood memories and sweet retro times.", color: "from-amber-500 to-yellow-600", tag: "Expressive" },
  { id: "rain", name: "Rain", mlName: "മഴ", emoji: "☔", desc: "Monsoon vibes, hot chai, and soothing rain.", color: "from-cyan-700 to-indigo-900", tag: "Lifestyle" }
];

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const { language } = useLanguage();
  const [showAll, setShowAll] = useState<boolean>(false);

  // Popular first (Top 10 visible by default)
  const visibleCategories = showAll ? ALL_25_CATEGORIES : ALL_25_CATEGORIES.slice(0, 10);

  return (
    <section className="py-12 bg-[#faf9f6] text-neutral-800" id="explore-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1 bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-200 dark:border-purple-900 inline-block mb-3">
            25 Categorized Collections 📚
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {language === 'en' ? "Explore Caption Categories" : "വിഭാഗങ്ങൾ തിരെഞ്ഞെടുക്കൂ"}
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-2">
            {language === 'en' 
              ? "Browse over 1,000+ Malayalam captions categorized across 25 popular themes." 
              : "നിങ്ങളുടെ ഫോട്ടോകൾക്കും റീൽസുകൾക്കും അനുയോജ്യമായ 25 ജനപ്രിയ വിഭാഗങ്ങൾ."}
          </p>
        </div>

        {/* Responsive Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {visibleCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 hover:shadow-xl hover:border-purple-300 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full text-left"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{cat.emoji}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900 group-hover:text-purple-950 transition-colors">
                    {language === 'en' ? cat.name : cat.mlName}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 block">
                    {cat.mlName}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Show All 25 Categories Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 bg-white border border-slate-300 hover:border-purple-600 text-purple-950 text-xs font-black rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>{showAll ? "കുറച്ചു കാണിക്കുക (Show Popular Only)" : "എല്ലാ 25 വിഭാഗങ്ങളും കാണുക (Show All 25 Categories)"}</span>
            {showAll ? <ChevronUp className="w-4 h-4 text-purple-600" /> : <ChevronDown className="w-4 h-4 text-purple-600" />}
          </button>
        </div>

      </div>
    </section>
  );
}
