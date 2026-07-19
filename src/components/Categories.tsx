/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, FolderHeart } from "lucide-react";

interface CategoriesProps {
  onSelectCategory: (catId: string) => void;
}

const CATEGORY_ITEMS = [
  { id: "love", name: "Love", emoji: "💖", desc: "Romantic, deep, and cute captions for couples.", color: "from-pink-500 to-rose-500" },
  { id: "attitude", name: "Attitude", emoji: "😎", desc: "Bold, mass, and classy lines to express yourself.", color: "from-purple-600 to-indigo-600" },
  { id: "travel", name: "Travel", emoji: "✈️", desc: "Wanderlust lines for wanderers and road trips.", color: "from-teal-500 to-emerald-500" },
  { id: "friendship", name: "Friendship", emoji: "👬", desc: "Savage, emotional, and fun words for chanks.", color: "from-yellow-400 to-orange-500" },
  { id: "wedding", name: "Wedding", emoji: "💍", desc: "Traditional Kerala wedding and bridegroom quotes.", color: "from-pink-400 to-purple-500" },
  { id: "self-love", name: "Self-Love", emoji: "🌸", desc: "Peaceful lines celebrating your unique vibe.", color: "from-fuchsia-400 to-pink-500" },
  { id: "motivation", name: "Motivation", emoji: "🎯", desc: "Empowering hustle quotes to fuel your dreams.", color: "from-red-500 to-orange-500" },
  { id: "aesthetic", name: "Aesthetic", emoji: "🍂", desc: "Cozy elements pairing tea, rain, and quietness.", color: "from-amber-600 to-stone-500" },
  { id: "funny", name: "Funny", emoji: "🤪", desc: "Relatable humor, exams, diet jokes, and trolls.", color: "from-lime-500 to-yellow-500" },
  { id: "kerala", name: "Kerala", emoji: "🌴", desc: "Traditional, backwaters, sadyas, and local pride.", color: "from-emerald-600 to-teal-700" },
  { id: "photography", name: "Photography", emoji: "📸", desc: "Frames, camera angles, and captured moments.", color: "from-blue-500 to-indigo-500" },
  { id: "business", name: "Business", emoji: "💼", desc: "Professional, startup, and customer trust values.", color: "from-slate-700 to-zinc-900" }
];

export default function Categories({ onSelectCategory }: CategoriesProps) {
  return (
    <section className="py-16 bg-[#faf9f6]" id="categories">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-center mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-slate-200">
              <FolderHeart className="w-5.5 h-5.5" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight" id="categories-heading">
            Explore Caption Categories
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Click on any category to load custom curated templates directly into the generator studio.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="categories-grid-container">
          {CATEGORY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className="group bg-white rounded-[24px] p-5 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between text-left relative overflow-hidden"
              id={`category-card-${item.id}`}
            >
              {/* Corner Color Dot */}
              <div className={`absolute top-0 right-0 w-3 h-3 bg-gradient-to-br ${item.color} rounded-bl-xl opacity-80 group-hover:w-full group-hover:h-1 group-hover:rounded-none transition-all duration-300`} />

              <div>
                <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform origin-left">
                  {item.emoji}
                </span>
                <h3 className="font-extrabold text-neutral-800 text-sm md:text-base group-hover:text-purple-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-extrabold text-purple-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Generate Captions
                <span className="text-xs">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
