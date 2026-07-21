/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { FolderHeart, Sparkles, ArrowUpRight, Compass } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface CategoriesProps {
  onSelectCategory: (catId: string) => void;
}

const CATEGORY_ITEMS = [
  { id: "love", name: "Love", emoji: "💖", desc: "Romantic, deep, and cute captions for couples.", color: "from-pink-500 to-rose-500", tag: "Romance", count: "120+" },
  { id: "attitude", name: "Attitude", emoji: "😎", desc: "Bold, mass, and classy lines to express yourself.", color: "from-purple-600 to-indigo-600", tag: "Expressive", count: "150+" },
  { id: "travel", name: "Travel", emoji: "✈️", desc: "Wanderlust lines for wanderers and road trips.", color: "from-teal-500 to-emerald-500", tag: "Lifestyle", count: "90+" },
  { id: "friendship", name: "Friendship", emoji: "👬", desc: "Savage, emotional, and fun words for chanks.", color: "from-yellow-400 to-orange-500", tag: "Social", count: "110+" },
  { id: "motivation", name: "Motivation", emoji: "🎯", desc: "Empowering hustle quotes to fuel your dreams.", color: "from-red-500 to-orange-500", tag: "Expressive", count: "80+" },
  { id: "aesthetic", name: "Aesthetic", emoji: "🍂", desc: "Cozy elements pairing tea, rain, and quietness.", color: "from-amber-600 to-stone-500", tag: "Lifestyle", count: "130+" },
  { id: "funny", name: "Funny", emoji: "🤪", desc: "Relatable humor, exams, diet jokes, and trolls.", color: "from-lime-500 to-yellow-500", tag: "Social", count: "95+" },
  { id: "kerala", name: "Kerala", emoji: "🌴", desc: "Traditional, backwaters, sadyas, and local pride.", color: "from-emerald-600 to-teal-700", tag: "Lifestyle", count: "140+" },
  { id: "photography", name: "Photography", emoji: "📸", desc: "Frames, camera angles, and captured moments.", color: "from-blue-500 to-indigo-500", tag: "Social", count: "75+" },
  { id: "business", name: "Business", emoji: "💼", desc: "Professional, startup, and customer trust values.", color: "from-slate-700 to-zinc-900", tag: "Social", count: "65+" },
  { id: "makeover_artist", name: "Makeover Artists", emoji: "✨", desc: "Bridal, photoshoot glam, freelance artists.", color: "from-violet-400 to-fuchsia-600", tag: "Lifestyle", count: "85+" },
  { id: "techie", name: "Techie", emoji: "💻", desc: "Gadget reviews, tech tips, and phone hacks.", color: "from-blue-600 to-indigo-600", tag: "Social", count: "60+" },
  { id: "nostalgia", name: "Nostalgia", emoji: "📻", desc: "90s childhood memories and sweet retro times.", color: "from-amber-500 to-yellow-600", tag: "Expressive", count: "100+" }
];

const CATEGORY_TRANSLATIONS: Record<string, { name: string, desc: string }> = {
  love: {
    name: "പ്രണയം",
    desc: "പ്രിയപ്പെട്ടവർക്കായി മനോഹരമായ പ്രണയ വരികൾ."
  },
  attitude: {
    name: "ആറ്റിറ്റ്യൂഡ്",
    desc: "ധീരവും വ്യത്യസ്തവുമായ മാസ് വരികൾ."
  },
  travel: {
    name: "യാത്രകൾ",
    desc: "വഴി ദൂരങ്ങളും യാത്രാ വൈബുകളും പങ്കുവെക്കാം."
  },
  friendship: {
    name: "സൗഹൃദം",
    desc: "ചങ്കുകൾക്കായുള്ള അടിച്ചുപൊളി വരികൾ."
  },
  motivation: {
    name: "പ്രചോദനം",
    desc: "സ്വപ്നങ്ങളിലേക്ക് കുതിക്കാൻ പോസിറ്റീവ് ചിന്തകൾ."
  },
  aesthetic: {
    name: "ആസ്വാദനം",
    desc: "മഴയും ചായയും പ്രകൃതിയും നിറഞ്ഞ മനോഹരമായ വരികൾ."
  },
  funny: {
    name: "തമാശകൾ",
    desc: "പൊട്ടിച്ചിരിപ്പിക്കുന്ന തമാശകളും ട്രോളുകളും."
  },
  kerala: {
    name: "കേരളം",
    desc: "നാട്ടുവിശേഷങ്ങളും കേരളാ തനിമയും."
  },
  photography: {
    name: "ഫോട്ടോഗ്രഫി",
    desc: "ക്യാമറക്കണ്ണിലൂടെ കണ്ടെത്തിയ നിമിഷങ്ങൾ."
  },
  business: {
    name: "ബിസിനസ്സ്",
    desc: "വിശ്വാസ്യതയും പ്രൊഫഷണൽ രീതികളും."
  },
  makeover_artist: {
    name: "മേക്കപ്പ് ആർട്ടിസ്റ്റുകൾ",
    desc: "ബ്രൈഡൽ മേക്കപ്പ്, ഫോട്ടോഷൂട്ട് ഗ്ലാം, ഫ്രീലാൻസ് വർക്കുകൾ."
  },
  techie: {
    name: "ടെക്കി",
    desc: "ഗാഡ്‌ജെറ്റ് റിവ്യൂകളും അടിപൊളി ടെക് ടിപ്പുകളും."
  },
  nostalgia: {
    name: "നൊസ്റ്റാൾജിയ",
    desc: "90കളിലെ ആ സുന്ദര പഴയ ഓർമ്മകൾ."
  }
};

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", "Romance", "Expressive", "Lifestyle", "Social"];

  const filteredCategories = activeFilter === "All"
    ? CATEGORY_ITEMS
    : CATEGORY_ITEMS.filter(cat => cat.tag === activeFilter);

  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-[#faf9f6] via-slate-50/50 to-[#faf9f6]" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 text-purple-900 text-xs font-black uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-purple-700" />
              Curated Mood Library
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" id="categories-heading">
              {language === 'en' ? "Explore Caption Categories" : "വിഭാഗങ്ങൾ കണ്ടെത്തൂ"}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 font-medium">
              {language === 'en' ? "Select any category to auto-load handcrafted Malayalam & Manglish captions into the Generator Studio." : "കൂടുതൽ വരികൾ ജനറേറ്ററിലേക്ക് ലോഡ് ചെയ്യുന്നതിനായി ഏതെങ്കിലും ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക."}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                  activeFilter === filter
                    ? "bg-purple-950 text-white shadow-md shadow-purple-950/10 scale-[1.02]"
                    : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5" id="categories-grid-container">
          {filteredCategories.map((item) => {
            const translation = CATEGORY_TRANSLATIONS[item.id];
            const name = language === 'en' || !translation ? item.name : translation.name;
            const desc = language === 'en' || !translation ? item.desc : translation.desc;

            return (
              <div
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className="group bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 hover:border-purple-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between text-left relative overflow-hidden"
                id={`category-card-${item.id}`}
              >
                {/* Top Subtle Gradient Stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-80 group-hover:h-1.5 transition-all duration-300`} />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl sm:text-4xl block group-hover:scale-110 transition-transform origin-left">
                      {item.emoji}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {item.count}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-purple-900 transition-colors flex items-center gap-1">
                    {name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                    {desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-black text-purple-900 uppercase tracking-wider group-hover:text-pink-600 transition-colors">
                  <span>{language === 'en' ? "Open Studio" : "തുടങ്ങാം"}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

