/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Loader2
} from "lucide-react";
import CategorySelector, { CategoryItem } from "./shared/CategorySelector";
import ResultGrid, { GridItem } from "./shared/ResultGrid";
import GenerateMoreButton from "./shared/GenerateMoreButton";

export interface QuoteItem {
  id: number;
  english: string;
  malayalam: string;
  author: string;
  category: string;
  categories: string[];
  source?: string;
  translation_credit?: string;
  translation_reviewed?: boolean;
}

interface MalayalamQuotesProps {
  onSuccessMessage: (msg: string) => void;
  favourites?: string[];
  onToggleFavourite?: (text: string) => void;
  onOpenStoryModal?: (text: string) => void;
}

const CATEGORY_MAP: Record<string, { en: string; ml: string; emoji: string }> = {
  all: { en: "All Quotes", ml: "എല്ലാ ഉദ്ധരണികളും", emoji: "✨" },
  general: { en: "General", ml: "പൊതുവായത്", emoji: "📌" },
  motivation: { en: "Motivation", ml: "പ്രചോദനം", emoji: "🔥" },
  success: { en: "Success", ml: "വിജയം", emoji: "🏆" },
  life: { en: "Life", ml: "ജീവിതം", emoji: "🌿" },
  love: { en: "Love", ml: "പ്രണയം", emoji: "💖" },
  friendship: { en: "Friendship", ml: "സൗഹൃദം", emoji: "🤝" },
  happiness: { en: "Happiness", ml: "സന്തോഷം", emoji: "😊" },
  wisdom: { en: "Wisdom", ml: "ജ്ഞാനം", emoji: "🦉" },
  courage: { en: "Courage", ml: "ധൈര്യം", emoji: "🦁" },
  time: { en: "Time", ml: "സമയം", emoji: "⏳" },
  change: { en: "Change", ml: "മാറ്റം", emoji: "🔄" },
  education: { en: "Education", ml: "വിദ്യാഭ്യാസം", emoji: "🎓" },
  spirituality: { en: "Spirituality", ml: "ആത്മീയം", emoji: "🕉️" },
  "positive-thinking": { en: "Positive Thinking", ml: "ശുഭചിന്ത", emoji: "🌞" },
  creativity: { en: "Creativity", ml: "സൃഷ്ടിപരത", emoji: "🎨" },
  peace: { en: "Peace", ml: "സമാധാനം", emoji: "🕊️" }
};

const CARD_THEMES = [
  { id: "vamozhi", name: "Vamozhi Gradient", bgGrad: "from-purple-950 via-purple-900 to-pink-900", cardBg: "#1e1b4b", textCol: "#ffffff", authorCol: "#fde68a" },
  { id: "heritage", name: "Kerala Heritage", bgGrad: "from-amber-950 via-yellow-950 to-stone-900", cardBg: "#fef3c7", textCol: "#451a03", authorCol: "#92400e" },
  { id: "dark", name: "Dark Premium", bgGrad: "from-slate-950 via-zinc-900 to-neutral-950", cardBg: "#0f172a", textCol: "#ffffff", authorCol: "#fbbf24" },
  { id: "minimal", name: "Minimal White", bgGrad: "from-slate-100 via-stone-100 to-neutral-100", cardBg: "#ffffff", textCol: "#0f172a", authorCol: "#6b21a8" },
  { id: "nature", name: "Nature Emerald", bgGrad: "from-emerald-950 via-teal-950 to-slate-950", cardBg: "#064e3b", textCol: "#ffffff", authorCol: "#6ee7b7" },
  { id: "romantic", name: "Romantic Rose", bgGrad: "from-rose-950 via-pink-950 to-purple-950", cardBg: "#881337", textCol: "#ffffff", authorCol: "#fbcfe8" },
  { id: "spiritual", name: "Spiritual Gold", bgGrad: "from-amber-900 via-orange-950 to-amber-950", cardBg: "#78350f", textCol: "#ffffff", authorCol: "#fef08a" }
];

export default function MalayalamQuotes({ onSuccessMessage, favourites = [], onToggleFavourite, onOpenStoryModal }: MalayalamQuotesProps) {
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedThemeIndex, setSelectedThemeIndex] = useState<number>(0);
  const [showEnglish, setShowEnglish] = useState<boolean>(false);

  // Grid results visible count state (initial 6 results)
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const categorySelectorItems: CategoryItem[] = useMemo(() => {
    return Object.entries(CATEGORY_MAP).map(([id, meta]) => ({
      id,
      nameEn: meta.en,
      nameMl: meta.ml,
      emoji: meta.emoji
    }));
  }, []);

  // Filtered pool of quotes based on category and search query
  const filteredQuotes = useMemo(() => {
    if (!quotes.length) return [];
    
    return quotes.filter((q) => {
      // Category check
      const matchesCategory = 
        selectedCategory === "all" || 
        q.category === selectedCategory || 
        (Array.isArray(q.categories) && q.categories.includes(selectedCategory));

      // Search query check (author or keywords)
      const qLower = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !qLower || 
        q.malayalam.toLowerCase().includes(qLower) || 
        q.english.toLowerCase().includes(qLower) || 
        (q.author && q.author.toLowerCase().includes(qLower));

      return matchesCategory && matchesSearch;
    });
  }, [quotes, selectedCategory, searchQuery]);

  const gridQuoteItems: GridItem[] = useMemo(() => {
    return filteredQuotes.slice(0, visibleCount).map((q) => ({
      id: q.id,
      text: q.malayalam,
      englishText: q.english,
      author: q.author || "അജ്ഞാതൻ",
      categoryBadge: CATEGORY_MAP[q.category]?.ml || q.category
    }));
  }, [filteredQuotes, visibleCount]);

  // Active Quote State
  const [currentQuote, setCurrentQuote] = useState<QuoteItem | null>(null);
  const [recentHistory, setRecentHistory] = useState<number[]>([]);
  const [copiedType, setCopiedType] = useState<"quote" | "withAuthor" | null>(null);
  const [isFav, setIsFav] = useState<boolean>(false);

  // 1. In-memory single load of JSON file
  useEffect(() => {
    let isMounted = true;
    const fetchQuotes = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        // Fetch cached static JSON
        const response = await fetch("/data/vamozhi-malayalam-quotes.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const loadedQuotes: QuoteItem[] = Array.isArray(data) ? data : (data.quotes || []);

        if (isMounted) {
          setQuotes(loadedQuotes);
          setIsLoading(false);
          if (loadedQuotes.length > 0) {
            const firstIndex = Math.floor(Math.random() * loadedQuotes.length);
            const firstQuote = loadedQuotes[firstIndex];
            setCurrentQuote(firstQuote);
            setRecentHistory([firstQuote.id]);
          }
        }
      } catch (err) {
        console.error("Failed to load Malayalam quotes JSON:", err);
        if (isMounted) {
          setIsLoading(false);
          setLoadError("ഉദ്ധരണികൾ ലോഡ് ചെയ്യുന്നതിൽ തടസ്സം നേരിട്ടു. വീണ്ടും ശ്രമിക്കുക.");
        }
      }
    };

    fetchQuotes();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync favourite status
  useEffect(() => {
    if (currentQuote) {
      const fullText = `"${currentQuote.malayalam}" — ${currentQuote.author || "അജ്ഞാതൻ"}`;
      setIsFav(favourites.includes(fullText) || favourites.includes(currentQuote.malayalam));
    }
  }, [currentQuote, favourites]);

  // Pick a new random quote from filtered pool without recent repetitions
  const handleGenerateNextQuote = () => {
    if (!filteredQuotes.length) return;

    // Filter out recently seen quotes
    let eligible = filteredQuotes.filter((q) => !recentHistory.includes(q.id));

    // Reset history if eligible pool is exhausted
    if (eligible.length === 0) {
      eligible = filteredQuotes;
      setRecentHistory([]);
    }

    const randomIndex = Math.floor(Math.random() * eligible.length);
    const nextQuote = eligible[randomIndex];
    setCurrentQuote(nextQuote);

    // Keep up to 50 recent quote IDs
    setRecentHistory((prev) => [...prev.slice(-50), nextQuote.id]);
    onSuccessMessage("പുതിയ ഉദ്ധരണി കണ്ടെത്തി! ✨");
  };

  // Copy raw Malayalam quote text
  const handleCopyQuoteOnly = () => {
    if (!currentQuote) return;
    navigator.clipboard.writeText(currentQuote.malayalam);
    setCopiedType("quote");
    setTimeout(() => setCopiedType(null), 2500);
    onSuccessMessage("ഉദ്ധരണി പകർത്തി! 📋");
  };

  // Copy quote with author attribution
  const handleCopyQuoteWithAuthor = () => {
    if (!currentQuote) return;
    const authorText = currentQuote.author ? `— ${currentQuote.author}` : "— അജ്ഞാതൻ";
    const textToCopy = `"${currentQuote.malayalam}"\n\n${authorText}\n(വായിക്കുക: Vamozhi.com)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedType("withAuthor");
    setTimeout(() => setCopiedType(null), 2500);
    onSuccessMessage("ഉദ്ധരണിയും രചയിതാവും പകർത്തി! 📋");
  };

  // Share via WhatsApp
  const handleWhatsappShare = () => {
    if (!currentQuote) return;
    const authorText = currentQuote.author ? `— ${currentQuote.author}` : "— അജ്ഞാതൻ";
    const shareText = `"${currentQuote.malayalam}"\n\n${authorText}\n\n✨ കൂടുതൽ ഉദ്ധരണികൾക്ക്: https://vamozhi.com`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, "_blank");
    onSuccessMessage("WhatsApp-ലേക്ക് പങ്കിടുന്നു...");
  };

  // Share via Facebook
  const handleFacebookShare = () => {
    if (!currentQuote) return;
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://vamozhi.com")}&quote=${encodeURIComponent(`"${currentQuote.malayalam}" — ${currentQuote.author || "അജ്ഞാതൻ"}`)}`;
    window.open(fbUrl, "_blank");
    onSuccessMessage("Facebook-ലേക്ക് പങ്കിടുന്നു...");
  };

  // Toggle Favourite
  const handleFavouriteClick = () => {
    if (!currentQuote) return;
    const fullText = `"${currentQuote.malayalam}" — ${currentQuote.author || "അജ്ഞാതൻ"}`;
    if (onToggleFavourite) {
      onToggleFavourite(fullText);
    }
  };

  // Canvas Image PNG Download Generator with 7 Themes
  const handleDownloadQuoteCard = () => {
    if (!currentQuote) return;

    const theme = CARD_THEMES[selectedThemeIndex] || CARD_THEMES[0];
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Theme Background Rendering
    if (theme.id === "minimal") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1080, 1080);
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 12;
      ctx.strokeRect(40, 40, 1000, 1000);
    } else if (theme.id === "heritage") {
      const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
      grad.addColorStop(0, "#fef3c7");
      grad.addColorStop(1, "#fde68a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1080);
      
      // Double traditional gold border
      ctx.strokeStyle = "#b45309";
      ctx.lineWidth = 16;
      ctx.strokeRect(40, 40, 1000, 1000);
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, 960, 960);
    } else {
      const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
      if (theme.id === "dark") {
        grad.addColorStop(0, "#0f172a");
        grad.addColorStop(1, "#020617");
      } else if (theme.id === "nature") {
        grad.addColorStop(0, "#064e3b");
        grad.addColorStop(1, "#022c22");
      } else if (theme.id === "romantic") {
        grad.addColorStop(0, "#881337");
        grad.addColorStop(1, "#4c0519");
      } else if (theme.id === "spiritual") {
        grad.addColorStop(0, "#78350f");
        grad.addColorStop(1, "#451a03");
      } else {
        grad.addColorStop(0, "#1e1b4b");
        grad.addColorStop(1, "#831843");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1080);

      // Frame border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, 1000, 1000);

      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, 960, 960);
    }

    // Top Header Branding
    ctx.textAlign = "center";
    ctx.font = "900 48px sans-serif";
    ctx.fillStyle = theme.id === "minimal" ? "#6b21a8" : "#ffffff";
    ctx.fillText("VAMOZHI", 540, 160);

    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = theme.id === "minimal" ? "#9333ea" : "#fde68a";
    ctx.fillText("MALAYALAM QUOTES", 540, 195);

    // Decorative Line
    ctx.strokeStyle = theme.id === "minimal" ? "#d8b4fe" : "rgba(251, 191, 36, 0.8)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(420, 230);
    ctx.lineTo(660, 230);
    ctx.stroke();

    // Large Quotation Mark
    ctx.font = "900 110px Georgia, serif";
    ctx.fillStyle = theme.id === "minimal" ? "#c084fc" : "#f59e0b";
    ctx.fillText("“", 540, 340);

    // Main Malayalam Quote Text Dynamic Wrapping
    const textToRender = currentQuote.malayalam;
    const getLines = (fSize: number) => {
      ctx.font = `bold ${fSize}px sans-serif`;
      const words = textToRender.split(" ");
      const linesArray: string[] = [];
      let currentLine = "";
      const maxWidth = 800;
      for (let n = 0; n < words.length; n++) {
        const testLine = currentLine + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          linesArray.push(currentLine.trim());
          currentLine = words[n] + " ";
        } else {
          currentLine = testLine;
        }
      }
      linesArray.push(currentLine.trim());
      return linesArray;
    };

    let fontSize = 48;
    let lineHeight = 72;
    let lines = getLines(fontSize);

    if (lines.length > 4) {
      fontSize = 38;
      lineHeight = 58;
      lines = getLines(fontSize);
    }
    if (lines.length > 6) {
      fontSize = 32;
      lineHeight = 50;
      lines = getLines(fontSize);
    }

    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = theme.textCol;

    const totalTextHeight = lines.length * lineHeight;
    const startY = 560 - (totalTextHeight / 2) + (lineHeight / 2);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 540, startY + (i * lineHeight));
    }

    // Author Name Below
    const authorName = currentQuote.author ? `— ${currentQuote.author}` : "— അജ്ഞാതൻ";
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = theme.authorCol;
    const authorY = Math.min(startY + (lines.length * lineHeight) + 50, 850);
    ctx.fillText(authorName, 540, authorY);

    // Footer Attribution Notice
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = theme.id === "minimal" ? "#64748b" : "rgba(255, 255, 255, 0.75)";
    ctx.fillText("Malayalam Translation © vamozhi.com", 540, 960);

    // Download PNG
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `vamozhi-quote-${currentQuote.id}.png`;
    link.href = image;
    link.click();
    onSuccessMessage("ഡൗൺലോഡ് ചെയ്ത ചിത്ര കാർഡ് തയാറായി! 🖼️");
  };

  const currentTheme = CARD_THEMES[selectedThemeIndex] || CARD_THEMES[0];

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto" id="malayalam-quotes-generator">
      
      {/* Search & Category Filter Section */}
      <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-6 shadow-sm space-y-5">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ഉദ്ധരണികൾ അല്ലെങ്കിൽ രചയിതാവിൻ്റെ പേര് തിരയൂ... (Search quotes or authors)"
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-2xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Malayalam Category Filter Pills */}
        <CategorySelector
          categories={categorySelectorItems}
          selectedCategory={selectedCategory}
          onSelectCategory={(catKey) => {
            setSelectedCategory(catKey);
            setVisibleCount(6);
            setTimeout(() => handleGenerateNextQuote(), 50);
          }}
        />

        {/* Counter Badge */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-neutral-800 text-xs text-slate-500">
          <span>
            {selectedCategory === "all" && !searchQuery ? (
              <>ആകെ ഉദ്ധരണികൾ: <strong className="text-purple-950 dark:text-purple-300 font-extrabold">{quotes.length || 1655}</strong></>
            ) : (
              <>തിരഞ്ഞെടുത്ത വിഭാഗത്തിൽ ലഭ്യമായത്: <strong className="text-purple-950 dark:text-purple-300 font-extrabold">{filteredQuotes.length}</strong> (ആകെ {quotes.length || 1655}-ൽ)</>
            )}
          </span>
          {searchQuery && (
            <span className="text-purple-700 dark:text-purple-400 font-bold">
              തിരച്ചിൽ ഫലങ്ങൾ (Search Results)
            </span>
          )}
        </div>

      </div>

      {/* Loading & Error States */}
      {isLoading ? (
        <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-12 text-center space-y-4">
          <Loader2 className="w-10 h-10 text-purple-600 animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            മലയാളം ഉദ്ധരണികൾ ശേഖരിക്കുന്നു...
          </p>
        </div>
      ) : loadError ? (
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-3xl p-8 text-center space-y-3">
          <p className="text-sm font-black text-rose-700 dark:text-rose-300">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
          >
            വീണ്ടും ശ്രമിക്കുക
          </button>
        </div>
      ) : (
        /* 2-Column Desktop / 1-Column Mobile Quotes Grid */
        <div className="space-y-6" id="quotes-result-grid-section">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-neutral-800 pb-3">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              മലയാളം ഉദ്ധരണികൾ (Malayalam Quotes)
            </h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-neutral-800 px-3 py-1 rounded-xl">
              {gridQuoteItems.length} of {filteredQuotes.length}
            </span>
          </div>

          <ResultGrid
            type="quote"
            items={gridQuoteItems}
            favourites={favourites}
            onSuccessMessage={onSuccessMessage}
            onToggleFavourite={onToggleFavourite}
            onOpenStoryModal={onOpenStoryModal}
          />

          {/* Generate More Button */}
          <GenerateMoreButton
            onGenerateMore={() => {
              setVisibleCount(prev => prev + 6);
              onSuccessMessage("6 കൂടുതൽ ഉദ്ധരണികൾ കൂടി ചേർത്തു! ✨");
            }}
            onReset={() => {
              setVisibleCount(6);
              onSuccessMessage("6 ഉദ്ധരണികളിലേക്ക് തിരിച്ചു വന്നു.");
            }}
            canReset={visibleCount > 6}
          />
        </div>
      )}

    </div>
  );
}
