/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Heart, 
  RefreshCw, 
  Zap, 
  Film, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  ImageIcon,
  Search,
  Filter,
  ArrowRight,
  Layers,
  HelpCircle,
  Video,
  Hash
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import reelHooksData from "../data/vamozhi-malayalam-reel-hooks-content-240.json";

interface Category {
  slug: string;
  name_en: string;
  name_ml: string;
  priority: number;
  hook_count: number;
  content_idea_count: number;
}

interface HookItem {
  id: string;
  hook_ml: string;
  category_slug: string;
  hook_type: string;
  tone_slug: string;
  language: string;
  source: string;
  copyright: string;
}

interface ContentIdeaItem {
  id: string;
  title_ml: string;
  idea_ml: string;
  category_slug: string;
  content_format: string;
  difficulty: string;
  suggested_hook_ids: string[];
  language: string;
  source: string;
  copyright: string;
}

interface ReelHooksPageProps {
  onSuccessMessage?: (msg: string) => void;
  onToggleFavourite?: (fullText: string) => void;
  favourites?: string[];
  onOpenStoryModal?: (text: string) => void;
}

const FAQS = [
  {
    q: "What is a Reel hook? (എന്താണ് ഒരു റീൽ ഹുക്ക്?)",
    a: "ഒരു വീഡിയോയുടെ ആദ്യ 3 സെക്കൻഡിൽ കാണുന്നയാളുടെ ശ്രദ്ധ പിടിച്ചുപറ്റുന്ന ആകർഷകമായ വാക്കുകളോ ചോദ്യങ്ങളോ ആണ് റീൽ ഹുക്ക് (Reel Hook). കാഴ്ചക്കാർ വീഡിയോ മുഴുവനായി കാണാൻ ഇത് സഹായിക്കുന്നു."
  },
  {
    q: "How do Malayalam Reel hooks improve engagement?",
    a: "മലയാളികളുടെ സംസാരശൈലിയും ചോദ്യരൂപത്തിലുള്ള അവതരണവും റീലിന്റെ റിറ്റൻഷൻ (Retention) വർദ്ധിപ്പിക്കുകയും കൂടുതൽ ആളുകൾ കമന്റ് ചെയ്യാനും ഷെയർ ചെയ്യാനും പ്രേരിപ്പിക്കുകയും ചെയ്യുന്നു."
  },
  {
    q: "Can businesses use these content ideas? (ബിസിനസുകൾക്ക് ഇത് ഉപയോഗിക്കാമോ?)",
    a: "തീർച്ചയായും! ബ്യൂട്ടി പാർലറുകൾ, റെസ്റ്റോറന്റുകൾ, ക്ലിനിക്കുകൾ, ഇൻസ്റ്റാഗ്രാം ഷോപ്പുകൾ, റിയൽ എസ്റ്റേറ്റ് തുടങ്ങി വിവിധ ബിസിനസ് മേഖലകൾക്കായി പ്രത്യേകം തയ്യാറാക്കിയ കണ്ടന്റ് ആശയങ്ങളാണ് ഇവ."
  },
  {
    q: "Are the hooks free to use? (ഇവ സൗജന്യമാണോ?)",
    a: "അതെ, വമൊഴിയിൽ ലഭ്യമായ എല്ലാ റീൽ ഹുക്കുകളും കണ്ടന്റ് ആശയങ്ങളും പൂർണ്ണമായും സൗജന്യമായി ഉപയോഗിക്കാം. ക്രെഡിറ്റോ പണമോ നൽകേണ്ടതില്ല."
  },
  {
    q: "How do I choose the right hook for my business?",
    a: "നിങ്ങളുടെ ബിസിനസ് കാറ്റഗറി തിരഞ്ഞെടുത്ത ശേഷം നിങ്ങളുടെ വീഡിയോയുടെ സന്ദേശത്തിന് ഏറ്റവും അനുയോജ്യമായ ചോദ്യരൂപത്തിലുള്ളതോ (Question) സർപ്രൈസ് നല്കുന്നതോ (Curiosity) ആയ ഹുക്ക് തിരഞ്ഞെടുക്കുക."
  },
  {
    q: "Can I copy and customise the generated hooks?",
    a: "തീർച്ചയായും! വമൊഴിയിലെ കോപ്പി ബട്ടൺ ഉപയോഗിച്ച് വരികൾ പകർത്തി നിങ്ങളുടെ ബ്രാൻഡിന്റെ രീതിക്കനുസരിച്ച് തിരുത്തി ഉപയോഗിക്കാവുന്നതാണ്."
  }
];

export default function ReelHooksPage({
  onSuccessMessage,
  onToggleFavourite,
  favourites = [],
  onOpenStoryModal
}: ReelHooksPageProps) {
  const [activeTab, setActiveTab] = useState<"hooks" | "ideas">("hooks");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleHooksCount, setVisibleHooksCount] = useState<number>(6);
  const [visibleIdeasCount, setVisibleIdeasCount] = useState<number>(6);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Loaded data from JSON
  const categories: Category[] = reelHooksData.categories;
  const allHooks: HookItem[] = reelHooksData.hooks;
  const allIdeas: ContentIdeaItem[] = reelHooksData.content_ideas;

  // Category Lookup Map for quick name lookup
  const categoryMap = useMemo(() => {
    const map: Record<string, Category> = {};
    categories.forEach((c) => {
      map[c.slug] = c;
    });
    return map;
  }, [categories]);

  // Hook Lookup Map for suggested hook resolving
  const hookMap = useMemo(() => {
    const map: Record<string, HookItem> = {};
    allHooks.forEach((h) => {
      map[h.id] = h;
    });
    return map;
  }, [allHooks]);

  // SEO setup
  useEffect(() => {
    document.title = "Malayalam Reel Hooks & Content Ideas for Creators | Vamozhi";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Discover Malayalam Reel hooks and practical content ideas for beauty parlours, makeup artists, clinics, restaurants, online businesses, creators and more.");
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://vamozhi.com/malayalam-reel-hooks");

    window.scrollTo(0, 0);
  }, []);

  // Filtering Reel Hooks
  const filteredHooks = useMemo(() => {
    return allHooks.filter((hook) => {
      const matchesCat = selectedCategory === "all" || hook.category_slug === selectedCategory;
      const matchesSearch = !searchQuery.trim() || 
        hook.hook_ml.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hook.hook_type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [allHooks, selectedCategory, searchQuery]);

  // Filtering Content Ideas
  const filteredIdeas = useMemo(() => {
    return allIdeas.filter((idea) => {
      const matchesCat = selectedCategory === "all" || idea.category_slug === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        idea.title_ml.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.idea_ml.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [allIdeas, selectedCategory, searchQuery]);

  // Visible lists
  const visibleHooks = useMemo(() => {
    return filteredHooks.slice(0, visibleHooksCount);
  }, [filteredHooks, visibleHooksCount]);

  const visibleIdeas = useMemo(() => {
    return filteredIdeas.slice(0, visibleIdeasCount);
  }, [filteredIdeas, visibleIdeasCount]);

  // Handle Load More
  const handleLoadMoreHooks = () => {
    if (visibleHooksCount < filteredHooks.length) {
      setVisibleHooksCount((prev) => prev + 6);
      if (onSuccessMessage) onSuccessMessage("6 കൂടുതൽ റീൽ ഹുക്കുകൾ കൂടി ചേർത്തു! ✨");
    }
  };

  const handleLoadMoreIdeas = () => {
    if (visibleIdeasCount < filteredIdeas.length) {
      setVisibleIdeasCount((prev) => prev + 6);
      if (onSuccessMessage) onSuccessMessage("6 കൂടുതൽ കണ്ടന്റ് ആശയങ്ങൾ കൂടി ചേർത്തു! ✨");
    }
  };

  const handleReset = () => {
    setVisibleHooksCount(6);
    setVisibleIdeasCount(6);
    setSearchQuery("");
    if (onSuccessMessage) onSuccessMessage("ഫലങ്ങൾ പുനഃക്രമീകരിച്ചു.");
  };

  // Copy helper
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onSuccessMessage) onSuccessMessage("പകർത്തി ✨");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Share helper
  const handleShareText = (text: string) => {
    if (navigator.share) {
      navigator.share({
        title: "Vamozhi Malayalam Reel Hooks",
        text: text
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      if (onSuccessMessage) onSuccessMessage("പകർത്തി ✨");
    }
  };

  // Schema JSON-LD
  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://vamozhi.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Malayalam Reel Hooks & Content Ideas",
        "item": "https://vamozhi.com/malayalam-reel-hooks"
      }
    ]
  };

  const schemaFaqs = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-8 px-4 sm:px-6 lg:px-8 text-left" id="reel-hooks-page">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaqs) }} />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-neutral-400" aria-label="Breadcrumb">
          <a href="/" className="hover:text-purple-900 dark:hover:text-purple-300 transition-colors">Home</a>
          <span>/</span>
          <span className="text-purple-900 dark:text-purple-300 font-bold">Reel Hooks & Ideas</span>
        </nav>

        {/* Hero Header Section */}
        <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl -z-0" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-pink-300">
              <Film className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>Trending Content & Creative Prompts</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Malayalam Reel Hooks and Content Ideas
              <span className="block text-xl sm:text-2xl font-bold text-amber-300 font-serif mt-1">
                മലയാളം റീൽ ഹുക്കുകളും കണ്ടന്റ് ആശയങ്ങളും
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
              Create attention-grabbing Malayalam Reel hooks and practical content ideas for beauty, healthcare, food, fashion, e-commerce, real estate, education, travel and other businesses.
            </p>
            <p className="text-xs sm:text-sm text-purple-200 font-medium">
              ബിസിനസുകൾക്കും ക്രിയേറ്റർമാർക്കും അനുയോജ്യമായ മലയാളം റീൽ ഹുക്കുകളും പ്രായോഗിക കണ്ടന്റ് ആശയങ്ങളും കണ്ടെത്താം.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* 1. Reel Hooks Button */}
              <button
                onClick={() => {
                  setActiveTab("hooks");
                  const el = document.getElementById("generator-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>റീൽ ഹുക്കുകൾ സൃഷ്ടിക്കൂ</span>
              </button>

              {/* 2. Content Ideas Button (In-between) */}
              <button
                onClick={() => {
                  setActiveTab("ideas");
                  const el = document.getElementById("generator-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                <Lightbulb className="w-4 h-4 text-amber-300" />
                <span>കണ്ടന്റ് ആശയങ്ങൾ 💡</span>
              </button>

              {/* 3. Generate Hashtags Button */}
              <button
                onClick={() => {
                  window.history.pushState(null, "", "/malayalam-hashtags");
                  window.dispatchEvent(new Event("popstate"));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                <Hash className="w-4 h-4 text-pink-300" />
                <span>ഹാഷ്‌ടാഗ് സൃഷ്ടിക്കൂ 🏷️</span>
              </button>
            </div>
          </div>
        </div>

        {/* Indexable Introductory Paragraph */}
        <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Film className="w-5 h-5 text-purple-600" />
            <span>High-Performing Malayalam Social Media Reel Prompts</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            വമൊഴി റീൽ ഹുക്ക് ജനറേറ്റർ ഉപയോഗിച്ച് നിങ്ങളുടെ ഇൻസ്റ്റാഗ്രാം റീലുകൾക്കും ഫേസ്ബുക്ക് വീഡിയോകൾക്കും യൂട്യൂബ് ഷോർട്ട്സുകൾക്കും അനുയോജ്യമായ വാചകങ്ങൾ കണ്ടെത്താം. ബ്യൂട്ടി പാർലർ, റെസ്റ്റോറന്റ്, സ്കിൻകെർ ക്ലിനിക്ക്, റിയൽ എസ്റ്റേറ്റ് തുടങ്ങി 16 ബിസിനസ്സ് വിഭാഗങ്ങളിലെ 240+ ഹുക്കുകളും ആശയങ്ങളും ഇവിടെ ലഭ്യമാണ്.
          </p>
        </div>

        {/* Generator Main Container */}
        <div className="space-y-6" id="generator-section">
          
          {/* 3. Generator Modes Switcher Bar */}
          <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 p-2 rounded-2xl shadow-xs flex items-center gap-2">
            <button
              onClick={() => { setActiveTab("hooks"); setVisibleHooksCount(6); }}
              className={`flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "hooks"
                  ? "bg-purple-950 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-neutral-800"
              }`}
              id="tab-reel-hooks"
            >
              <Film className="w-4 h-4 text-pink-400" />
              <span>Reel Hooks (റീൽ ഹുക്കുകൾ)</span>
            </button>

            <button
              onClick={() => { setActiveTab("ideas"); setVisibleIdeasCount(6); }}
              className={`flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "ideas"
                  ? "bg-purple-950 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-neutral-800"
              }`}
              id="tab-content-ideas"
            >
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Content Ideas (കണ്ടന്റ് ആശയങ്ങൾ)</span>
            </button>
          </div>

          {/* 4. Category Selector Section */}
          <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 p-6 rounded-3xl shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black text-purple-700 dark:text-purple-400 uppercase tracking-widest block">
                  Step 1: Choose Business Category
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Choose Your Business Category (ബിസിനസ് വിഭാഗം തിരഞ്ഞെടുക്കൂ)
                </h2>
              </div>

              {/* Search Filter */}
              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="വരികളിൽ തിരയുക..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-neutral-800 text-xs font-semibold rounded-xl border border-slate-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-600/30 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Dynamic Category Chips Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1" id="reel-category-chips">
              <button
                onClick={() => { setSelectedCategory("all"); setVisibleHooksCount(6); setVisibleIdeasCount(6); }}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-purple-950 text-white shadow-sm ring-2 ring-purple-400"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-neutral-700"
                }`}
              >
                ✨ എല്ലാ വിഭാഗങ്ങളും (All Categories)
              </button>

              {categories.map((cat) => {
                const isSel = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => { setSelectedCategory(cat.slug); setVisibleHooksCount(6); setVisibleIdeasCount(6); }}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSel
                        ? "bg-purple-950 text-white shadow-sm ring-2 ring-purple-400"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-neutral-700"
                    }`}
                  >
                    <span>{cat.name_ml}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                      isSel ? "bg-purple-800 text-purple-100" : "bg-slate-200 dark:bg-neutral-700 text-slate-600 dark:text-neutral-300"
                    }`}>
                      {activeTab === "hooks" ? cat.hook_count : cat.content_idea_count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5 & 6. Results Display Grid Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] font-black text-purple-700 dark:text-purple-400 uppercase tracking-widest block">
                  Step 2: Generated Results
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  {activeTab === "hooks" ? "Generate Malayalam Reel Hooks" : "Content Ideas for Business Creators"}
                </h2>
              </div>
              
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-neutral-800 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-neutral-700">
                {activeTab === "hooks" ? visibleHooks.length : visibleIdeas.length} of {activeTab === "hooks" ? filteredHooks.length : filteredIdeas.length}
              </span>
            </div>

            {/* Reel Hooks Mode */}
            {activeTab === "hooks" && (
              <>
                {visibleHooks.length === 0 ? (
                  <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-10 text-center space-y-3">
                    <p className="text-sm font-extrabold text-slate-600 dark:text-slate-300">
                      ഈ വിഭാഗത്തിൽ ഉള്ളടക്കം ലഭ്യമല്ല. (No matching reel hooks found)
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="hooks-grid">
                    {visibleHooks.map((hook) => {
                      const isFav = favourites.includes(hook.hook_ml);
                      const catName = categoryMap[hook.category_slug]?.name_ml || hook.category_slug;

                      return (
                        <div
                          key={hook.id}
                          className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-block text-[10px] font-black text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 border border-purple-200/80 dark:border-purple-800 px-2.5 py-1 rounded-xl uppercase tracking-wider">
                                📌 {catName}
                              </span>

                              {hook.hook_type && (
                                <span className="inline-block text-[10px] font-black text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 border border-amber-200/80 dark:border-amber-800 px-2 py-0.5 rounded-lg uppercase tracking-wider">
                                  {hook.hook_type}
                                </span>
                              )}
                            </div>

                            <p className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-relaxed font-sans">
                              "{hook.hook_ml}"
                            </p>
                          </div>

                          {/* Action Footer */}
                          <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                            <span className="text-[10px] text-slate-400 font-medium">
                              © vamozhi.com
                            </span>

                            <div className="flex items-center gap-1.5">
                              {onOpenStoryModal && (
                                <button
                                  onClick={() => onOpenStoryModal(hook.hook_ml)}
                                  className="px-2.5 py-1.5 bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-950 hover:to-indigo-950 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                                  title="Download Story Image"
                                >
                                  <ImageIcon className="w-3.5 h-3.5 text-pink-300" />
                                  <span>Download 🖼️</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleCopyText(hook.hook_ml, hook.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                  copiedId === hook.id
                                    ? "bg-emerald-600 text-white"
                                    : "bg-slate-100 hover:bg-purple-100 text-slate-800 hover:text-purple-950 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700"
                                }`}
                              >
                                {copiedId === hook.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-white" />
                                    <span>പകർത്തി</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => handleShareText(hook.hook_ml)}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 rounded-xl transition-colors cursor-pointer"
                                title="Share Hook"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>

                              {onToggleFavourite && (
                                <button
                                  onClick={() => {
                                    onToggleFavourite(hook.hook_ml);
                                    if (onSuccessMessage) onSuccessMessage(isFav ? "സേവ് നീക്കം ചെയ്തു" : "സേവ് ചെയ്തു");
                                  }}
                                  className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                                    isFav
                                      ? "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400"
                                      : "bg-slate-100 hover:bg-pink-50 text-slate-500 dark:bg-neutral-800 dark:text-slate-300"
                                  }`}
                                  title={isFav ? "Remove Favourite" : "Save Favourite"}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-pink-600 text-pink-600' : ''}`} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Generate More / Reset Bar */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {visibleHooksCount < filteredHooks.length ? (
                    <button
                      onClick={handleLoadMoreHooks}
                      className="px-8 py-3.5 bg-purple-950 hover:bg-purple-900 text-white rounded-2xl font-extrabold shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <RefreshCw className="w-4 h-4 text-amber-400" />
                      <span>കൂടുതൽ സൃഷ്ടിക്കൂ (Generate More)</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-neutral-800 px-4 py-2 rounded-xl">
                      ഈ വിഭാഗത്തിലെ എല്ലാ ഫലങ്ങളും നിങ്ങൾ കണ്ടു. (All results displayed)
                    </span>
                  )}

                  <button
                    onClick={handleReset}
                    className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 dark:bg-neutral-800 dark:text-slate-200 dark:border-neutral-700 rounded-2xl font-bold transition-all cursor-pointer text-xs sm:text-sm"
                  >
                    പുതിയത് തുടങ്ങാം (Reset)
                  </button>
                </div>
              </>
            )}

            {/* Content Ideas Mode */}
            {activeTab === "ideas" && (
              <>
                {visibleIdeas.length === 0 ? (
                  <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-10 text-center space-y-3">
                    <p className="text-sm font-extrabold text-slate-600 dark:text-slate-300">
                      ഈ വിഭാഗത്തിൽ ഉള്ളടക്കം ലഭ്യമല്ല. (No matching content ideas found)
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="ideas-grid">
                    {visibleIdeas.map((idea) => {
                      const fullTextToFav = `${idea.title_ml}\n${idea.idea_ml}`;
                      const isFav = favourites.includes(fullTextToFav);
                      const catName = categoryMap[idea.category_slug]?.name_ml || idea.category_slug;

                      return (
                        <div
                          key={idea.id}
                          className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
                        >
                          <div className="space-y-4">
                            {/* Badges */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-block text-[10px] font-black text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 border border-purple-200/80 dark:border-purple-800 px-2.5 py-1 rounded-xl uppercase tracking-wider">
                                💡 {catName}
                              </span>

                              <div className="flex items-center gap-1.5">
                                {idea.content_format && (
                                  <span className="text-[10px] font-black text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-lg uppercase">
                                    {idea.content_format}
                                  </span>
                                )}
                                {idea.difficulty && (
                                  <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-lg uppercase">
                                    {idea.difficulty}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Content Idea Title */}
                            <div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                                Content Idea Title
                              </span>
                              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                                {idea.title_ml}
                              </h3>
                            </div>

                            {/* What to Create Explanation */}
                            <div className="bg-slate-50 dark:bg-neutral-800/80 p-3.5 rounded-2xl border border-slate-100 dark:border-neutral-700">
                              <span className="text-[10px] font-black text-purple-700 dark:text-purple-300 uppercase tracking-widest block mb-1">
                                What to Create (നിർമ്മിക്കേണ്ട രീതി):
                              </span>
                              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                                {idea.idea_ml}
                              </p>
                            </div>

                            {/* Suggested Opening Hooks */}
                            {idea.suggested_hook_ids && idea.suggested_hook_ids.length > 0 && (
                              <div className="space-y-2">
                                <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest block">
                                  Suggested Opening Hooks (തുടക്കത്തിലെ ഹുക്കുകൾ):
                                </span>
                                <div className="space-y-1.5">
                                  {idea.suggested_hook_ids.map((hId) => {
                                    const resolvedHook = hookMap[hId];
                                    if (!resolvedHook) return null;
                                    return (
                                      <div
                                        key={hId}
                                        className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/60 p-2.5 rounded-xl flex items-center justify-between gap-2"
                                      >
                                        <p className="text-xs font-extrabold text-amber-950 dark:text-amber-200 leading-snug">
                                          "{resolvedHook.hook_ml}"
                                        </p>
                                        <button
                                          onClick={() => handleCopyText(resolvedHook.hook_ml, hId)}
                                          className="p-1 text-[10px] font-black bg-amber-200/80 hover:bg-amber-300 text-amber-950 rounded-lg shrink-0 cursor-pointer"
                                          title="Copy Hook"
                                        >
                                          {copiedId === hId ? "Copied!" : "Copy"}
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Action Footer */}
                          <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                            <span className="text-[10px] text-slate-400 font-medium">
                              © vamozhi.com
                            </span>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleCopyText(`${idea.title_ml}\n${idea.idea_ml}`, idea.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                  copiedId === idea.id
                                    ? "bg-emerald-600 text-white"
                                    : "bg-slate-100 hover:bg-purple-100 text-slate-800 hover:text-purple-950 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700"
                                }`}
                              >
                                {copiedId === idea.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-white" />
                                    <span>പകർത്തി</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Copy Complete Idea</span>
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => handleShareText(`${idea.title_ml}\n${idea.idea_ml}`)}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 rounded-xl transition-colors cursor-pointer"
                                title="Share Idea"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>

                              {onToggleFavourite && (
                                <button
                                  onClick={() => {
                                    onToggleFavourite(fullTextToFav);
                                    if (onSuccessMessage) onSuccessMessage(isFav ? "സേവ് നീക്കം ചെയ്തു" : "സേവ് ചെയ്തു");
                                  }}
                                  className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                                    isFav
                                      ? "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400"
                                      : "bg-slate-100 hover:bg-pink-50 text-slate-500 dark:bg-neutral-800 dark:text-slate-300"
                                  }`}
                                  title={isFav ? "Remove Favourite" : "Save Favourite"}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-pink-600 text-pink-600' : ''}`} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Generate More / Reset Bar */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {visibleIdeasCount < filteredIdeas.length ? (
                    <button
                      onClick={handleLoadMoreIdeas}
                      className="px-8 py-3.5 bg-purple-950 hover:bg-purple-900 text-white rounded-2xl font-extrabold shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <RefreshCw className="w-4 h-4 text-amber-400" />
                      <span>കൂടുതൽ സൃഷ്ടിക്കൂ (Generate More)</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-neutral-800 px-4 py-2 rounded-xl">
                      ഈ വിഭാഗത്തിലെ എല്ലാ ഫലങ്ങളും നിങ്ങൾ കണ്ടു. (All results displayed)
                    </span>
                  )}

                  <button
                    onClick={handleReset}
                    className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 dark:bg-neutral-800 dark:text-slate-200 dark:border-neutral-700 rounded-2xl font-bold transition-all cursor-pointer text-xs sm:text-sm"
                  >
                    പുതിയത് തുടങ്ങാം (Reset)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Educational Section: How to Use Reel Hooks */}
        <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            How to Use Reel Hooks (റീൽ ഹുക്കുകൾ എങ്ങനെ ഉപയോഗിക്കാം?)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50/50 dark:bg-neutral-800 rounded-2xl border border-purple-100 dark:border-neutral-700 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-purple-900 text-white font-black text-xs flex items-center justify-center">1</span>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">ആദ്യ 3 സെക്കൻഡ്</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                വീഡിയോ ആരംഭിക്കുമ്പോൾ തന്നെ പ്രധാന ഹുക്ക് ടെക്സ്റ്റ് വോയ്‌സ് നൽകി സ്ക്രീനിൽ വ്യക്തമായി കാണിക്കുക.
              </p>
            </div>
            <div className="p-4 bg-pink-50/50 dark:bg-neutral-800 rounded-2xl border border-pink-100 dark:border-neutral-700 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-pink-900 text-white font-black text-xs flex items-center justify-center">2</span>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">വിഷ്വൽ മാറ്റങ്ങൾ</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                ഹുക്ക് പറയുമ്പോൾ തന്നെ ബിഫോർ-ആഫ്റ്റർ അല്ലെങ്കിൽ ആകർഷകമായ ആക്ഷൻ വിഷ്വലുകൾ ഉൾപ്പെടുത്തുക.
              </p>
            </div>
            <div className="p-4 bg-amber-50/50 dark:bg-neutral-800 rounded-2xl border border-amber-100 dark:border-neutral-700 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-amber-900 text-white font-black text-xs flex items-center justify-center">3</span>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">കോൾ ടു ആക്ഷൻ (CTA)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                വീഡിയോയുടെ അവസാന ഭാഗത്ത് ഫോളോ ചെയ്യാനോ കമന്റ് ബോക്സിൽ മറുപടി നൽകാനോ ആളുകളോട് ആവശ്യപ്പെടുക.
              </p>
            </div>
          </div>
        </div>

        {/* 11. Interactive FAQ Section */}
        <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-purple-700 dark:text-purple-400 uppercase tracking-widest block">
              Knowledge Base & Support
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-purple-600" />
              <span>Frequently Asked Questions (പതിവ് ചോദ്യങ്ങൾ)</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200/80 dark:border-neutral-800 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-neutral-800 flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-purple-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-neutral-850 border-t border-slate-100 dark:border-neutral-800 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
