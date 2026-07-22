/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CategoryChip from "./shared/CategoryChip";

interface CategoriesProps {
  onSelectCategory: (catId: string) => void;
}

export const ALL_25_CATEGORIES = [
  // Popular first (Top 10)
  { id: "love", name: "Love", mlName: "പ്രണയം", emoji: "💖", desc: "Romantic, deep, and cute captions for couples." },
  { id: "attitude", name: "Attitude", mlName: "ആറ്റിറ്റ്യൂഡ്", emoji: "😎", desc: "Bold, mass, and classy lines to express yourself." },
  { id: "life", name: "Life", mlName: "ജീവിതം", emoji: "🌿", desc: "Thoughtful reflections on life and personal growth." },
  { id: "motivation", name: "Motivation", mlName: "പ്രചോദനം", emoji: "🎯", desc: "Empowering hustle quotes to fuel your dreams." },
  { id: "friendship", name: "Friendship", mlName: "സൗഹൃദം", emoji: "👬", desc: "Savage, emotional, and fun words for chanks." },
  { id: "travel", name: "Travel", mlName: "യാത്ര", emoji: "✈️", desc: "Wanderlust lines for wanderers and road trips." },
  { id: "wedding", name: "Wedding", mlName: "വിവാഹം", emoji: "💍", desc: "Traditional Kerala wedding and bridal captions." },
  { id: "birthday", name: "Birthday", mlName: "ജന്മദിനം", emoji: "🎂", desc: "Warm birthday wishes for friends and family." },
  { id: "funny", name: "Funny", mlName: "തമാശ", emoji: "🤪", desc: "Relatable humor, exams, diet jokes, and trolls." },
  { id: "reels", name: "Reels", mlName: "റീൽസ്", emoji: "🎬", desc: "Catchy Instagram reel hooks and viral video captions." },

  // Remaining 15 Categories
  { id: "kerala", name: "Kerala", mlName: "കേരളം", emoji: "🌴", desc: "Traditional, backwaters, sadyas, and local pride." },
  { id: "nature", name: "Nature", mlName: "പ്രകൃതി", emoji: "🍃", desc: "Rain, mountains, greenery, and serene peace." },
  { id: "happiness", name: "Happiness", mlName: "സന്തോഷം", emoji: "😊", desc: "Positive thoughts and joy in simple things." },
  { id: "sadness", name: "Sadness", mlName: "വിഷാദം", emoji: "🌧️", desc: "Deep emotional lines for quiet, reflective moments." },
  { id: "breakup", name: "Breakup", mlName: "വിരഹം", emoji: "💔", desc: "Heartbreak, moving on, and healing thoughts." },
  { id: "family", name: "Family", mlName: "കുടുംബം", emoji: "🏡", desc: "Home, parents, siblings, and family togetherness." },
  { id: "success", name: "Success", mlName: "വിജയം", emoji: "🏆", desc: "Hard work, victory, and achievement milestones." },
  { id: "self-love", name: "Self Love", mlName: "സ്വയംസ്നേഹം", emoji: "✨", desc: "Confidence, self-care, and accepting yourself." },
  { id: "spirituality", name: "Spirituality", mlName: "ആത്മീയം", emoji: "🕉️", desc: "Inner peace, faith, and spiritual reflection." },
  { id: "festivals", name: "Festivals", mlName: "ആഘോഷങ്ങൾ", emoji: "🎆", desc: "Onam, Vishu, Eid, Christmas, and festival wishes." },
  { id: "good-morning", name: "Good Morning", mlName: "സുപ്രഭാതം", emoji: "🌅", desc: "Fresh morning greetings to start the day right." },
  { id: "good-night", name: "Good Night", mlName: "ശുഭരാത്രി", emoji: "🌙", desc: "Peaceful nighttime quotes and warm wishes." },
  { id: "photography", name: "Photography", mlName: "ഫോട്ടോഗ്രഫി", emoji: "📸", desc: "Lens angles, frames, and captured memories." },
  { id: "nostalgia", name: "Nostalgia", mlName: "ഓർമ്മകൾ", emoji: "📻", desc: "90s childhood memories and sweet retro times." },
  { id: "rain", name: "Rain", mlName: "മഴ", emoji: "☔", desc: "Monsoon vibes, hot chai, and soothing rain." }
];

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState<string>("love");

  // Popular first (Top 10 visible by default, expandable to 25)
  const visibleCategories = showAll ? ALL_25_CATEGORIES : ALL_25_CATEGORIES.slice(0, 10);

  return (
    <section className="py-6 bg-[#faf9f6] text-neutral-800" id="explore-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flexible & Responsive Category Chips Container */}
        <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {visibleCategories.map((cat) => (
              <CategoryChip
                key={cat.id}
                id={cat.id}
                nameEn={cat.name}
                nameMl={cat.mlName}
                emoji={cat.emoji}
                isSelected={selectedCat === cat.id}
                onClick={() => {
                  setSelectedCat(cat.id);
                  onSelectCategory(cat.id);
                }}
              />
            ))}
          </div>

          {/* Toggle Show All 25 Categories Button */}
          <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 bg-slate-100 dark:bg-neutral-800 hover:bg-purple-100 text-purple-950 dark:hover:bg-neutral-700 dark:text-neutral-200 text-xs font-black rounded-2xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>{showAll ? "കുറച്ചു കാണിക്കുക (Show Popular Only)" : "എല്ലാ 25 വിഭാഗങ്ങളും കാണുക (Show All 25 Categories)"}</span>
              {showAll ? <ChevronUp className="w-4 h-4 text-purple-600" /> : <ChevronDown className="w-4 h-4 text-purple-600" />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
