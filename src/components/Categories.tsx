/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, FolderHeart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

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
  { id: "business", name: "Business", emoji: "💼", desc: "Professional, startup, and customer trust values.", color: "from-slate-700 to-zinc-900" },
  { id: "makeover_artist", name: "Makeover Artists", emoji: "✨", desc: "Bridal, photoshoot glam, freelance artists.", color: "from-violet-400 to-fuchsia-600" },
  { id: "fashion", name: "Fashion & Style", emoji: "👗", desc: "Clothing boutique, trendy outfits, lifestyle.", color: "from-rose-400 to-red-600" },
  { id: "techie", name: "Techie", emoji: "💻", desc: "Gadget reviews, tech tips, and phone hacks.", color: "from-blue-600 to-indigo-600" },
  { id: "coder", name: "Coder", emoji: "🚀", desc: "Programming, late night debugging, and code life.", color: "from-slate-600 to-zinc-800" },
  { id: "nostalgia", name: "Nostalgia", emoji: "📻", desc: "90s childhood memories and sweet retro times.", color: "from-amber-500 to-yellow-600" }
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
  wedding: {
    name: "കല്യാണം",
    desc: "കേരളാ തനിമയുള്ള കല്യാണ വരികൾ."
  },
  "self-love": {
    name: "സ്വയം സ്നേഹം",
    desc: "സ്വന്തം സന്തോഷവും സമാധാനവും ആഘോഷിക്കാം."
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
  fashion: {
    name: "ഫാഷൻ & സ്റ്റൈൽ",
    desc: "ട്രെൻഡിങ് വസ്ത്രങ്ങൾ, ബോട്ടിക് കളക്ഷനുകൾ."
  },
  techie: {
    name: "ടെക്കി",
    desc: "ഗാഡ്‌ജെറ്റ് റിവ്യൂകളും അടിപൊളി ടെക് ടിപ്പുകളും."
  },
  coder: {
    name: "കോഡർ",
    desc: "കോഡിംഗും ലേറ്റ് നൈറ്റ് ബഗ് ഫിക്സിംഗും."
  },
  nostalgia: {
    name: "നൊസ്റ്റാൾജിയ",
    desc: "90കളിലെ ആ സുന്ദര പഴയ ഓർമ്മകൾ."
  }
};

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const { t, language } = useLanguage();

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
            {language === 'en' ? "Explore Caption Categories" : "വിഭാഗങ്ങൾ കണ്ടെത്തൂ"}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {language === 'en' ? "Click on any category to load custom curated templates directly into the generator studio." : "കൂടുതൽ വരികൾ ജനറേറ്ററിലേക്ക് ലോഡ് ചെയ്യുന്നതിനായി ഏതെങ്കിലും ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക."}
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="categories-grid-container">
          {CATEGORY_ITEMS.map((item) => {
            const translation = CATEGORY_TRANSLATIONS[item.id];
            const name = language === 'en' || !translation ? item.name : translation.name;
            const desc = language === 'en' || !translation ? item.desc : translation.desc;

            return (
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
                    {name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                    {desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-extrabold text-purple-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  {language === 'en' ? "Generate Captions" : "ക്യാപ്ഷൻ തയ്യാറാക്കുക"}
                  <span className="text-xs">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

