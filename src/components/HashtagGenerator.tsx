import { useState, useEffect, FormEvent } from "react";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Heart, 
  Search, 
  TrendingUp, 
  Share2, 
  Loader2,
  Hash
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HashtagSet {
  id: string;
  name: string;
  category: string;
  tags: string[];
  reach: string;
  description: string;
}

// Hand-curated, highly viral real Kerala/Malayalam hashtags with reach estimates
const PRESET_HASHTAGS: HashtagSet[] = [
  {
    id: "kerala_nature",
    name: "Scenic Kerala & Nature 🌴💚",
    category: "kerala",
    tags: ["#kerala", "#godsowncountry", "#keralatourism", "#keralagram", "#entekeralam", "#naturekerala", "#keralagallery", "#scenickerala", "#keralavibes", "#keralaphotography"],
    reach: "45M+ Posts",
    description: "Perfect for backwaters, rain, green landscapes, and village scenery."
  },
  {
    id: "mallu_swag",
    name: "Mallu Pride & Swag 😎⚡",
    category: "attitude",
    tags: ["#mallu", "#malayali", "#malluswag", "#keralaattitude", "#massentry", "#malayaliwear", "#keralagram", "#kochi", "#keralaonline", "#malluproud"],
    reach: "30M+ Posts",
    description: "Best for high-energy selfies, mass entries, and styling posts."
  },
  {
    id: "pranayam_love",
    name: "Pranayam & Romance 💖✨",
    category: "love",
    tags: ["#pranayam", "#lovequotes", "#keralalove", "#mallulove", "#malayalamstatus", "#romancekerala", "#keraladiaries", "#puzha", "#kozhikode", "#chunkz"],
    reach: "18M+ Posts",
    description: "Tailor-made for couple photos, love letters, and romantic tracks."
  },
  {
    id: "kerala_travel",
    name: "Kerala Travel & Backpacking ✈️🎒",
    category: "travel",
    tags: ["#keralatravel", "#travelkerala", "#wayanad", "#munnar", "#vagamon", "#varkala", "#godsowncountry", "#keralatourism", "#wanderlustkerala", "#exploringkerala"],
    reach: "25M+ Posts",
    description: "Excellent for scenic roadtrips, hillstations, and beaches."
  },
  {
    id: "malayali_chunkz",
    name: "Chunkz & Friendship Vibes 👬🍻",
    category: "friendship",
    tags: ["#chunkz", "#keralafriends", "#friendshipgoals", "#malayalamcomedy", "#mallumusketeers", "#collegelife", "#schoolmemories", "#chunkzforever", "#keralagram", "#buddies"],
    reach: "15M+ Posts",
    description: "Dedicated to your best friends, college reunions, and trip buddies."
  },
  {
    id: "kerala_trolls",
    name: "Chiri & Funny Slangs 🤪😂",
    category: "funny",
    tags: ["#keralacomedy", "#mallucomedy", "#trollkerala", "#keralatrolls", "#chiri", "#funnymalayalam", "#mallugram", "#keralagram", "#slangkerala", "#humorkerala"],
    reach: "22M+ Posts",
    description: "Use for hilarious reels, memes, comedic voiceovers, and trolls."
  },
  {
    id: "aesthetic_nostalgia",
    name: "Vintage Nostalgia & Aesthetics 🍂📻",
    category: "nostalgia",
    tags: ["#keralanostalgia", "#vintagekerala", "#oldschoolkerala", "#aesthetic", "#keraladiaries", "#pazhayasongs", "#ormakal", "#kozhikode", "#nostalgiakerala", "#vintagevibes"],
    reach: "12M+ Posts",
    description: "Best for old songs, cassettes, tea shops, and golden retro vibes."
  },
  {
    id: "kerala_motivation",
    name: "Motivation & Inspiration 🎯🏆",
    category: "motivation",
    tags: ["#keralamotivation", "#malayalamquotes", "#chintha", "#vijayam", "#shakthi", "#keralaspeech", "#inspirationalmalayalam", "#keralaproud", "#positivevibes", "#targetkerala"],
    reach: "8M+ Posts",
    description: "Perfect for daily quotes, fitness goals, and success captions."
  },
  {
    id: "traditional_festive",
    name: "Kerala Traditional & Festive 🪔🌾",
    category: "aesthetic",
    tags: ["#onamvibes", "#vishuvibes", "#saree", "#mundu", "#keralatradition", "#traditionalkerala", "#onamcelebration", "#keralapiravi", "#keralasaree", "#traditionalwear"],
    reach: "10M+ Posts",
    description: "Great for Onam, Vishu, temple visits, and ethnic outfits."
  }
];

const PLATFORMS_HASHTAGS: Record<string, string[]> = {
  instagram: ["#reelsinstagram", "#explorepage", "#viralreels", "#trendingnow"],
  youtube: ["#shorts", "#youtubeshorts", "#viralshorts", "#trending"],
  tiktok: ["#tiktokviral", "#foryoupage", "#fyp", "#trendingvideo"],
  facebook: ["#facebookpost", "#viralpost", "#trendingpost", "#fbfeed"]
};

interface HashtagGeneratorProps {
  onSuccessMessage: (msg: string) => void;
  onToggleFavourite: (caption: string) => void;
  favourites: string[];
}

export default function HashtagGenerator({ onSuccessMessage, onToggleFavourite, favourites }: HashtagGeneratorProps) {
  const { language: uiLang } = useLanguage();
  
  // Filtering states
  const [platform, setPlatform] = useState<string>("instagram");
  const [category, setCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<{ id: string; name: string; tags: string[]; description: string } | null>(null);

  // Auto scroll to results when AI hashtags are generated
  useEffect(() => {
    if (aiResult) {
      setTimeout(() => {
        const element = document.getElementById("ai-hashtag-result");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [aiResult]);

  const handleCopy = (id: string, tags: string[]) => {
    const text = tags.join(" ");
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onSuccessMessage("Hashtag set copied to clipboard! 📋✨");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleFavSet = (tags: string[]) => {
    const setStr = tags.join(" ");
    onToggleFavourite(setStr);
  };

  const handleAiGenerateHashtags = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAiResult(null);

    const payload = {
      platform,
      contentType: "hashtag_set",
      language: "malayalam",
      category: category === "all" ? "kerala" : category,
      mood: "cheerful",
      occasion: "general",
      tone: "classy",
      length: "medium",
      emojiSetting: "minimal",
      resultsCount: 1,
      keyword: keyword,
      hashtagCount: "15"
    };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const rawTags = data.results[0].text;
          // Parse tags back into array
          const generatedTags = rawTags.split(/\s+/).filter((t: string) => t.startsWith("#"));
          
          setAiResult({
            id: "ai_generation",
            name: `✨ AI Custom Hashtags for "${keyword || category}"`,
            tags: generatedTags.length > 0 ? generatedTags : ["#kerala", "#vamozhi", "#viral", "#reach"],
            description: `Dynamically optimized with Gemini AI for highest reach on ${platform}.`
          });
          onSuccessMessage("AI Custom Hashtags generated successfully! 🔥");
        }
      } else {
        throw new Error("Failed to call AI");
      }
    } catch (err) {
      console.error(err);
      // Fallback
      const baseCategoryTags = PRESET_HASHTAGS.find(p => p.category === category)?.tags || PRESET_HASHTAGS[0].tags;
      const combined = [...new Set([...baseCategoryTags, `#${keyword || "vamozhivibes"}`.toLowerCase().replace(/[^#a-z0-9_]/g, ""), ...PLATFORMS_HASHTAGS[platform]])];
      
      setAiResult({
        id: "ai_generation_fallback",
        name: `💡 Instant Hybrid Hashtags for "${keyword || category}"`,
        tags: combined,
        description: "Optimized offline using local reach patterns and platform tags."
      });
      onSuccessMessage("Local optimized hashtags generated! ✨");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter presets based on Category and Search Query
  const filteredPresets = PRESET_HASHTAGS.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 px-4 sm:px-6 max-w-6xl mx-auto" id="hashtag-generator-section">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-black tracking-widest uppercase inline-block mb-3">
          Maximum Reach Engine 🚀
        </span>
        <h2 className="text-3xl font-black tracking-tight text-neutral-900" id="hashtag-header">
          {uiLang === 'en' ? "Kerala Hashtag Generator" : "കേരളാ ഹാഷ്‌ടാഗ് ജനറേറ്റർ"}
        </h2>
        <p className="text-sm text-neutral-500 mt-2">
          {uiLang === 'en' ? "Get real, active regional hashtags with high reach estimation. Optimize instantly for Instagram, YouTube Shorts, or TikTok." : "സോഷ്യൽ മീഡിയയിൽ ഉയർന്ന റീച്ച് ലഭിക്കുന്നതിന് യഥാർത്ഥ കേരളാ ഹാഷ്‌ടാഗുകൾ കണ്ടെത്തുക. ഇൻസ്റ്റാഗ്രാം, യൂട്യൂബ് എന്നിവയ്ക്ക് അനുയോജ്യമായ രീതിയിൽ തിരഞ്ഞെടുക്കാം."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Configuration Panel */}
        <div className="lg:col-span-5 bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm relative">
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs z-30 flex flex-col items-center justify-center gap-3 rounded-[32px] animate-fade-in">
              <Loader2 className="w-10 h-10 text-purple-800 animate-spin" />
              <span className="text-xs font-extrabold text-purple-950 uppercase tracking-widest animate-pulse">
                Analyzing Reach...
              </span>
            </div>
          )}

          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-700" />
            Reach Settings
          </h3>

          <form onSubmit={handleAiGenerateHashtags} className="flex flex-col gap-5 text-left">
            
            {/* Platform Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                1. Target Platform
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "instagram", name: "Instagram 📸" },
                  { id: "youtube", name: "YouTube 📺" },
                  { id: "tiktok", name: "TikTok 🎵" },
                  { id: "facebook", name: "Facebook 👥" }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      platform === p.id
                        ? "bg-purple-50 text-purple-700 border-purple-500 font-extrabold shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Vibe Category selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                2. Vibe Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer text-slate-800"
              >
                <option value="all">All Categories (എല്ലാ ഇനങ്ങളും)</option>
                <option value="kerala">Kerala & Nature (കേരളം)</option>
                <option value="attitude">Attitude (ആറ്റിറ്റ്യൂഡ്)</option>
                <option value="love">Romance (പ്രണയം)</option>
                <option value="travel">Travel (യാത്ര)</option>
                <option value="friendship">Friendship (ചങ്ക്സ്)</option>
                <option value="funny">Funny (തമാശ)</option>
                <option value="nostalgia">Nostalgia (ഓർമ്മകൾ)</option>
                <option value="motivation">Motivation (പ്രചോദനം)</option>
                <option value="aesthetic">Aesthetic (തനിമ)</option>
              </select>
            </div>

            {/* Seed Topic Keyword */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                3. Seed Topic / Custom Keyword
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="E.g., rain, food, kochi, photoshoot"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 text-slate-800 placeholder:text-slate-400"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 bg-gradient-to-r from-purple-800 via-pink-600 to-orange-500 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider hover:scale-[0.99] transition-all shadow-md shadow-purple-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              ✨ Generate Custom AI Hashtags
            </button>

          </form>

          {/* Preset Search bar */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-1.5 text-left">
            <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              Quick Filter Curated Presets
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hand-crafted sets..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 text-slate-800 placeholder:text-slate-400"
            />
          </div>

        </div>

        {/* Right Side: Hashtags Grid / Results */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* AI Custom Result Card (Glows and shown on top if generated) */}
          {aiResult && (
            <div 
              id="ai-hashtag-result"
              className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-[32px] p-6 border border-purple-800 shadow-xl relative overflow-hidden text-left ring-4 ring-purple-600/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -mr-8 -mt-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full blur-xl -ml-6 -mb-6" />

              <div className="flex justify-between items-start gap-4 mb-3 relative z-10">
                <div>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500 text-[9px] font-black uppercase tracking-wider inline-block mb-1.5">
                    Recommended AI Set 🔥
                  </span>
                  <h4 className="text-base font-black tracking-tight">{aiResult.name}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleFavSet(aiResult.tags)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                    title="Save Set"
                  >
                    <Heart className={`w-4 h-4 ${favourites.includes(aiResult.tags.join(" ")) ? "fill-red-500 text-red-500" : "text-white"}`} />
                  </button>
                  <button
                    onClick={() => handleCopy(aiResult.id, aiResult.tags)}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-purple-950 font-black text-xs flex items-center gap-1 cursor-pointer hover:bg-purple-50 transition-colors"
                  >
                    {copiedId === aiResult.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Set
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-purple-200 mb-4">{aiResult.description}</p>

              <div className="bg-black/20 rounded-2xl p-4 border border-white/5 font-mono text-xs text-purple-100 flex flex-wrap gap-2 leading-relaxed selection:bg-purple-500">
                {aiResult.tags.map((tag, i) => (
                  <span key={i} className="hover:text-white transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Curated Preset Hashtag Sets Header */}
          <div className="text-left">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Hash className="w-5 h-5 text-purple-700" />
              {category === "all" ? "All Hand-Crafted Viral Sets" : `${category.toUpperCase()} Curated Viral Sets`}
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                {filteredPresets.length} sets
              </span>
            </h3>
          </div>

          {/* Preset Cards Grid */}
          {filteredPresets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPresets.map((preset) => {
                const combinedTags = [...preset.tags, ...PLATFORMS_HASHTAGS[platform]];
                const isFavorite = favourites.includes(combinedTags.join(" "));

                return (
                  <div
                    key={preset.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs tracking-tight group-hover:text-purple-900 transition-colors">
                            {preset.name}
                          </h4>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mt-0.5">
                            🔥 {preset.reach}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleFavSet(combinedTags)}
                            className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Save Set"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                          </button>
                          <button
                            onClick={() => handleCopy(preset.id, combinedTags)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              copiedId === preset.id 
                                ? "bg-green-50 text-green-600" 
                                : "hover:bg-slate-50 text-slate-500 hover:text-purple-700"
                            }`}
                            title="Copy Set"
                          >
                            {copiedId === preset.id ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-normal mb-3 font-medium">
                        {preset.description}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 font-mono text-[10px] text-slate-600 flex flex-wrap gap-1.5 leading-relaxed mt-auto max-h-24 overflow-y-auto">
                      {combinedTags.map((tag, i) => (
                        <span key={i} className="hover:text-purple-800 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 text-center text-slate-500">
              <Hash className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider">No matching sets found</p>
              <p className="text-[11px] text-slate-400 mt-1">Try changing your search query or choosing another category.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
