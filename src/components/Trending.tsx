/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sparkles, Copy, Share2, Heart, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface TrendingItem {
  id: string;
  categoryKey: string;
  categoryLabel: string;
  text: string;
  hashtags: string[];
}

const TRENDING_CATEGORIES = [
  { key: "aesthetic", label: "Aesthetic Malayalam" },
  { key: "love", label: "Malayalam Love" },
  { key: "attitude", label: "Attitude Malayalam" },
  { key: "short", label: "Short Malayalam" },
  { key: "girls", label: "Malayalam for Girls" },
  { key: "boys", label: "Malayalam for Boys" },
  { key: "travel", label: "Kerala Travel" },
  { key: "wedding", label: "Wedding Malayalam" },
  { key: "manglish", label: "Manglish Captions" },
  { key: "bio", label: "Instagram Bio Ideas" }
] as const;

const TRENDING_CAPTIONS: TrendingItem[] = [
  // Aesthetic Malayalam
  {
    id: "t_aes_1",
    categoryKey: "aesthetic",
    categoryLabel: "Aesthetic Malayalam captions",
    text: "മൗനം ചിലപ്പോൾ കവിതയേക്കാൾ മനോഹരമായി സംസാരിക്കും. നമ്മുടെ ലോകം അത് കേൾക്കട്ടെ. 🍂🌊",
    hashtags: ["#aestheticmalayalam", "#chayavibes", "#sunsetkerala"]
  },
  {
    id: "t_aes_2",
    categoryKey: "aesthetic",
    categoryLabel: "Aesthetic Malayalam captions",
    text: "മഴയോടൊപ്പം പെയ്യുന്ന ഓരോ ഓർമ്മകളും എന്റെ കാപ്പിയുടെ മധുരം കൂട്ടുന്നു. ☕☔️",
    hashtags: ["#rain_aesthetic", "#keralarain", "#vintage_kerala"]
  },
  {
    id: "t_aes_3",
    categoryKey: "aesthetic",
    categoryLabel: "Aesthetic Malayalam captions",
    text: "അലസമായ സായാഹ്നങ്ങളും പതുക്കെ മണ്ണിൽ വീഴുന്ന പൂക്കളും പ്രകൃതിയുടെ മാന്ത്രികതയാണ്. 🌾🌅",
    hashtags: ["#sunsetclick", "#minimalism_kerala", "#naturelovers"]
  },

  // Malayalam Love
  {
    id: "t_love_1",
    categoryKey: "love",
    categoryLabel: "Malayalam love captions",
    text: "നിന്റെ ചിരിയാണ് എന്റെ ലോകത്തിലെ ഏറ്റവും മനോഹരമായ കാഴ്ച. നീയില്ലാത്ത ജീവിതം എനിക്ക് അന്യമാണ്. ❤️💑",
    hashtags: ["#malayalampranayam", "#lovequotes", "#keralalove"]
  },
  {
    id: "t_love_2",
    categoryKey: "love",
    categoryLabel: "Malayalam love captions",
    text: "ചില ബന്ധങ്ങൾ അങ്ങനെയാണ്, വാക്കുകൾ കൊണ്ടല്ല കണ്ണുകൾ കൊണ്ടാണ് ഹൃദയത്തോട് സംസാരിക്കുക. 🔐🌸",
    hashtags: ["#togetherforever", "#soulmate", "#pranayamquotes"]
  },
  {
    id: "t_love_3",
    categoryKey: "love",
    categoryLabel: "Malayalam love captions",
    text: "എന്റെ സന്തോഷങ്ങളുടെയെല്ലാം ഒരേയൊരു വിലാസം നീ മാത്രമാണ്. എന്നെന്നും എന്റെ സ്വന്തമായിരിക്കുക. 🥰💘",
    hashtags: ["#myeverything", "#couplegoals", "#keralalovestatus"]
  },

  // Attitude Malayalam
  {
    id: "t_att_1",
    categoryKey: "attitude",
    categoryLabel: "Attitude captions Malayalam",
    text: "സ്വഭാവം നോക്കി പെരുമാറുക, കാരണം എന്റെ നിലപാട് എപ്പോഴും എന്റേത് മാത്രമാണ്. ആർക്കും വിട്ടുകൊടുക്കില്ല. 😎🔥",
    hashtags: ["#malayalamattitude", "#massquotes", "#proudme"]
  },
  {
    id: "t_att_2",
    categoryKey: "attitude",
    categoryLabel: "Attitude captions Malayalam",
    text: "തളർത്താൻ നോക്കിയവരുടെ മുന്നിൽ തലയുയർത്തി എന്റെ ജയം ആഘോഷിക്കുന്നതാണ് എന്റെ ശീലം. 👑🦁",
    hashtags: ["#kingoflife", "#unstoppable", "#attitude_malayalam"]
  },
  {
    id: "t_att_3",
    categoryKey: "attitude",
    categoryLabel: "Attitude captions Malayalam",
    text: "എന്റെ വഴികൾ എന്റേതാണ്, ആരുടെയും ഉപദേശങ്ങൾക്ക് ഇവിടെ യാതൊരു സ്ഥാനവുമില്ല. സ്വന്തം സ്റ്റൈൽ മാത്രം. ⚔️⚡",
    hashtags: ["#myrules", "#independent", "#boldmalayali"]
  },

  // Short Malayalam
  {
    id: "t_short_1",
    categoryKey: "short",
    categoryLabel: "Short Malayalam captions",
    text: "കൂട്ടായ യാത്രകൾ, മായാത്ത ഓർമ്മകൾ! 🏍️🌾",
    hashtags: ["#roadtrip", "#chankbuddies", "#lifeisgood"]
  },
  {
    id: "t_short_2",
    categoryKey: "short",
    categoryLabel: "Short Malayalam captions",
    text: "നിറഞ്ഞ പുഞ്ചിരി, ലളിതമായ ജീവിതം. 😊✨",
    hashtags: ["#simplelife", "#happiness", "#keepsmiling"]
  },
  {
    id: "t_short_3",
    categoryKey: "short",
    categoryLabel: "Short Malayalam captions",
    text: "ഇന്നത്തെ ചുവടുകൾ നാളത്തെ വിജയങ്ങൾ! 🎯💪",
    hashtags: ["#motivation", "#dreambig", "#focus"]
  },

  // Malayalam for Girls
  {
    id: "t_girls_1",
    categoryKey: "girls",
    categoryLabel: "Malayalam captions for girls",
    text: "കാത്തു സൂക്ഷിച്ച കൺകോണിലെ ചിരിയിൽ ഒതുങ്ങുന്നു എന്റെ മനോഹരമായ ആകാശം. 🌸✨",
    hashtags: ["#keralagirls", "#sareelove", "#traditionalbeauty"]
  },
  {
    id: "t_girls_2",
    categoryKey: "girls",
    categoryLabel: "Malayalam captions for girls",
    text: "മറ്റുള്ളവർ എന്നെപ്പറ്റി എന്ത് ചിന്തിക്കും എന്നത് എന്റെ വിഷയമല്ല, ഞാൻ എന്റെ ലോകത്ത് സന്തുഷ്ടയാണ്. 💁‍♀️💅",
    hashtags: ["#independentgirl", "#selflove", "#girlpower"]
  },

  // Malayalam for Boys
  {
    id: "t_boys_1",
    categoryKey: "boys",
    categoryLabel: "Malayalam captions for boys",
    text: "തോളോട് തോൾ ചേർന്ന് നിൽക്കാൻ ഒപ്പമുള്ള എന്റെ ചങ്കുകൾ ഉണ്ടെങ്കിൽ ഞാൻ എവിടെയും കട്ടയ്ക്ക് നിൽക്കും. 🤙⚔️",
    hashtags: ["#keralaboys", "#brotherhood", "#chanksquad"]
  },
  {
    id: "t_boys_2",
    categoryKey: "boys",
    categoryLabel: "Malayalam captions for boys",
    text: "ലക്ഷ്യങ്ങൾ മനസ്സിലുണ്ടെങ്കിൽ വഴിയിലെ തടസ്സങ്ങൾ ഒന്നും തടസ്സങ്ങളല്ല, തകർത്തു മുന്നേറും. 😎🔥",
    hashtags: ["#hustle", "#malayali_da", "#motorider"]
  },

  // Kerala Travel
  {
    id: "t_travel_1",
    categoryKey: "travel",
    categoryLabel: "Kerala travel captions",
    text: "മനസ്സ് വീണ്ടും വണ്ടികയറുന്നു, ലക്ഷ്യം കുളിർമഴ പെയ്യുന്ന നമ്മടെ പച്ചപ്പുള്ള ഇടുക്കി മലനിരകൾ! ⛰️🚗",
    hashtags: ["#keralatravel", "#idukkichuram", "#scenickerala"]
  },
  {
    id: "t_travel_2",
    categoryKey: "travel",
    categoryLabel: "Kerala travel captions",
    text: "കായലിലൂടെ പതുക്കെ നീങ്ങുന്ന വള്ളവും കൂടെ നാടൻ കൊഞ്ചു പൊള്ളിച്ചതും... ഇതാണ് സ്വർഗ്ഗം! 🌴🛶🥥",
    hashtags: ["#backwaters", "#alappuzha", "#godsowncountry"]
  },

  // Wedding Malayalam
  {
    id: "t_wedding_1",
    categoryKey: "wedding",
    categoryLabel: "Wedding captions Malayalam",
    text: "രണ്ടു മനസ്സുകൾ ഒന്നായി കൈകോർക്കുന്ന നിമിഷം, ഇനിയുള്ള ജീവിതയാത്ര നിന്റെ നിഴലായി. 💒💍💑",
    hashtags: ["#keralawedding", "#manavalanandmanavatti", "#happilyeverafter"]
  },
  {
    id: "t_wedding_2",
    categoryKey: "wedding",
    categoryLabel: "Wedding captions Malayalam",
    text: "സദ്യയും മാലയിടലും കഴിഞ്ഞ് എന്റെ സ്വന്തം പെണ്ണായി നീ മാറിയ സുന്ദരമായ ആ നിമിഷം! 👰🤵🌹",
    hashtags: ["#kasavusaree", "#mullappoo", "#traditionalcouple"]
  },

  // Manglish Captions
  {
    id: "t_mang_1",
    categoryKey: "manglish",
    categoryLabel: "Manglish Instagram captions",
    text: "Ente life, ente ishtangal. Arodum chodichittalla jeevikkunnath, kooduthal parayan varalle! 😎✌️",
    hashtags: ["#manglishquotes", "#attitudequotes", "#keralagram"]
  },
  {
    id: "t_mang_2",
    categoryKey: "manglish",
    categoryLabel: "Manglish Instagram captions",
    text: "Nee illatha oru divasatte kurich polum aalochikkaan vayya ente muthe. You are my vibe! ❤️💑",
    hashtags: ["#pranayam", "#lovequotes", "#keralacouples"]
  },

  // Bio Ideas
  {
    id: "t_bio_1",
    categoryKey: "bio",
    categoryLabel: "Malayalam Instagram bio ideas",
    text: "🌴 ദൈവത്തിന്റെ സ്വന്തം നാട്ടിലെ ഒരു നാടൻ പയ്യൻ/പെണ്ണ് | ☕ ചായ പ്രണയി | 🏍️ യാത്രകൾ ജീവൻ 🌍",
    hashtags: ["#malayali", "#keralite", "#profilebio"]
  },
  {
    id: "t_bio_2",
    categoryKey: "bio",
    categoryLabel: "Malayalam Instagram bio ideas",
    text: "🔥 Rule #1: Be original and trust your vibe 👑 | 💻 Techie & Dreamer 🌟 | 🤙 കട്ട ചങ്ക് ഗാംഗ്",
    hashtags: ["#hustler", "#uniquevibe", "#biostyle"]
  }
];

const TRENDING_CATEGORIES_TRANSLATIONS: Record<string, string> = {
  aesthetic: "ആസ്വാദനം",
  love: "പ്രണയം",
  attitude: "ആറ്റിറ്റ്യൂഡ്",
  short: "ചെറിയ വരികൾ",
  girls: "പെൺകുട്ടികൾക്കായി",
  boys: "ആൺകുട്ടികൾക്കായി",
  travel: "യാത്രകൾ",
  wedding: "കല്യാണം",
  manglish: "മാംഗ്ലീഷ്",
  bio: "പ്രൊഫൈൽ ബയോ"
};

export default function Trending({
  onToggleFavourite,
  favourites,
  onSuccessMessage
}: {
  onToggleFavourite: (caption: string) => void;
  favourites: string[];
  onSuccessMessage: (msg: string) => void;
}) {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("aesthetic");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    onSuccessMessage(language === 'en' ? "Copied trending caption to clipboard! 📋" : "ക്യാപ്ഷൻ കോപ്പി ചെയ്തു! 📋");
  };

  const handleShare = (text: string) => {
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/?text=${encodedText}`;
    window.open(waUrl, "_blank");
    onSuccessMessage(language === 'en' ? "Opening WhatsApp to share..." : "വാട്സാപ്പ് തുറക്കുന്നു...");
  };

  const filteredCaptions = TRENDING_CAPTIONS.filter(
    (item) => item.categoryKey === activeCategory
  );

  return (
    <section className="py-16 bg-white border-t border-slate-200" id="trending">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-slate-200">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'en' ? "Highly Curated & family-safe" : "ഉയർന്ന നിലവാരമുള്ളവ"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900" id="trending-heading">
            {language === 'en' ? "Trending Malayalam Captions" : "ഇപ്പോൾ ട്രെൻഡിംഗ് ആയവ"}
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
            {language === 'en' ? "Explore organic, highly searched, and highly engaging Malayalam and Manglish captions for social media platforms." : "സോഷ്യൽ മീഡിയകളിൽ ഇപ്പോൾ തരംഗമായിക്കൊണ്ടിരിക്കുന്ന മലയാളം, മാംഗ്ലീഷ് ക്യാപ്ഷനുകൾ താഴെ വിഭാഗങ്ങളിൽ നിന്നും തിരഞ്ഞെടുത്ത് കാണാം."}
          </p>
        </div>

        {/* Filter Badges Category Selection Slider */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" id="trending-categories-tabs">
          {TRENDING_CATEGORIES.map((cat) => {
            const label = language === 'en' ? cat.label : (TRENDING_CATEGORIES_TRANSLATIONS[cat.key] || cat.label);
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-slate-900 text-white border-transparent shadow-sm"
                    : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800"
                }`}
                id={`tab-trending-${cat.key}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Trending items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" id="trending-cards-grid">
          {filteredCaptions.map((item) => {
            const isSaved = favourites.includes(item.text);
            const categoryLabel = language === 'en' ? item.categoryLabel : (TRENDING_CATEGORIES_TRANSLATIONS[item.categoryKey] || item.categoryLabel);
            return (
              <div
                key={item.id}
                className="bg-white rounded-[24px] p-6 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between text-left"
                id={`trending-card-${item.id}`}
              >
                <div>
                  <span className="text-[9px] font-black tracking-wider uppercase text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full inline-block mb-3 border border-slate-100">
                    {categoryLabel}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed font-sans">
                    "{item.text}"
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.hashtags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono font-bold text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(item.text)}
                      className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-full cursor-pointer transition-colors"
                      title="Copy raw text"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleShare(item.text)}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-full cursor-pointer transition-colors"
                      title="Share to WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onToggleFavourite(item.text)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-extrabold transition-colors cursor-pointer ${
                      isSaved
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-slate-50 border-slate-200 text-slate-400 hover:text-red-500"
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                    {isSaved ? (language === 'en' ? "SAVED" : "സേവ് ചെയ്തവ") : (language === 'en' ? "SAVE" : "സേവ് ചെയ്യുക")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
