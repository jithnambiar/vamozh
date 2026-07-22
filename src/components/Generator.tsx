import { useState, useEffect, FormEvent } from "react";
import { generateCaptions } from "../data/captions";
import { 
  Sparkles, 
  AlignLeft, 
  Globe, 
  MessageSquare, 
  Loader2,
  Mic,
  RotateCcw
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";


interface GeneratorProps {
  onGenerate: (results: Array<{ text: string; hashtags: string[]; id: string }>) => void;
  onSuccessMessage: (msg: string) => void;
  currentPath: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const PLATFORMS = [
  { id: "instagram", name: "Instagram 📸" },
  { id: "facebook", name: "Facebook 👥" },
  { id: "whatsapp", name: "WhatsApp 💬" },
  { id: "snapchat", name: "Snapchat 👻" },
  { id: "tiktok", name: "TikTok 🎵" },
  { id: "bumble", name: "Bumble 🐝" },
  { id: "matrimony", name: "Matrimony 💍" }
] as const;

const CATEGORIES = [
  { id: "love", name: "Love 💖 (പ്രണയം)" },
  { id: "attitude", name: "Attitude 😎 (ആറ്റിറ്റ്യൂഡ്)" },
  { id: "life", name: "Life 🌿 (ജീവിതം)" },
  { id: "motivation", name: "Motivation 🎯 (പ്രചോദനം)" },
  { id: "friendship", name: "Friendship 👬 (സൗഹൃദം)" },
  { id: "travel", name: "Travel ✈️ (യാത്ര)" },
  { id: "wedding", name: "Wedding 💍 (വിവാഹം)" },
  { id: "birthday", name: "Birthday 🎂 (ജന്മദിനം)" },
  { id: "funny", name: "Funny 🤪 (തമാശ)" },
  { id: "reels", name: "Reels 🎬 (റീൽസ്)" },
  { id: "kerala", name: "Kerala 🌴 (കേരളം)" },
  { id: "nature", name: "Nature 🍃 (പ്രകൃതി)" },
  { id: "happiness", name: "Happiness 😊 (സന്തോഷം)" },
  { id: "sadness", name: "Sadness 🌧️ (വിഷാദം)" },
  { id: "breakup", name: "Breakup 💔 (വിരഹം)" },
  { id: "family", name: "Family 🏡 (കുടുംബം)" },
  { id: "success", name: "Success 🏆 (വിജയം)" },
  { id: "self-love", name: "Self Love ✨ (സ്വയംസ്നേഹം)" },
  { id: "spirituality", name: "Spirituality 🕉️ (ആത്മീയം)" },
  { id: "festivals", name: "Festivals 🎆 (ആഘോഷങ്ങൾ)" },
  { id: "good-morning", name: "Good Morning 🌅 (സുപ്രഭാതം)" },
  { id: "good-night", name: "Good Night 🌙 (ശുഭരാത്രി)" },
  { id: "photography", name: "Photography 📸 (ഫോട്ടോഗ്രഫി)" },
  { id: "nostalgia", name: "Nostalgia 📻 (ഓർമ്മകൾ)" },
  { id: "rain", name: "Rain ☔ (മഴ)" }
] as const;

export default function Generator({ 
  onGenerate, 
  onSuccessMessage, 
  currentPath,
  selectedCategory,
  onCategoryChange
}: GeneratorProps) {
  const { t, language: uiLang } = useLanguage();
  
  // Main states
  const [contentType, setContentType] = useState<string>("photo-caption");
  const [platform, setPlatform] = useState<string>("instagram");
  const [language, setLanguage] = useState<"malayalam" | "manglish">("malayalam");
  const category = selectedCategory;
  const setCategory = onCategoryChange;
  const [keyword, setKeyword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListeningKeyword, setIsListeningKeyword] = useState(false);

  const toggleKeywordSpeech = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onSuccessMessage("Speech Recognition is not supported in this browser. Try Google Chrome.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "ml-IN"; // Malayalam Voice recognition
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => {
      setIsListeningKeyword(true);
      onSuccessMessage("Listening... Speak a keyword in Malayalam 🎙️");
    };

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setKeyword(transcript);
        onSuccessMessage(`Recognized: "${transcript}" ✨`);
      }
    };

    rec.onerror = (event: any) => {
      console.error(event);
      setIsListeningKeyword(false);
    };

    rec.onend = () => {
      setIsListeningKeyword(false);
    };

    try {
      rec.start();
    } catch (err) {
      console.error(err);
      setIsListeningKeyword(false);
    }
  };

  // Monitor path changes to pre-configure appropriate presets
  useEffect(() => {
    if (!currentPath) return;

    if (currentPath === "/instagram-caption-generator") {
      setContentType("photo-caption");
      setPlatform("instagram");
    } else if (currentPath === "/facebook-caption-generator") {
      setContentType("photo-caption");
      setPlatform("facebook");
    } else if (currentPath === "/whatsapp-status-generator") {
      setContentType("photo-caption");
      setPlatform("whatsapp");
    } else if (currentPath === "/snapchat-caption-generator") {
      setContentType("photo-caption");
      setPlatform("snapchat");
    } else if (currentPath === "/tiktok-caption-generator") {
      setContentType("photo-caption");
      setPlatform("tiktok");
    } else if (currentPath === "/malayalam-reel-hooks") {
      setContentType("hook");
      setPlatform("instagram");
    }
  }, [currentPath]);

  // Live matching Effect - instantly generates matching presets on selection change
  useEffect(() => {
    const localResult = generateCaptions({
      platform,
      contentType: contentType === "hashtag_set" ? "hashtag_set" : contentType,
      language: language as any,
      category,
      mood: "cheerful",
      occasion: "general",
      tone: "classy",
      length: "medium",
      emojiSetting: "minimal",
      resultsCount: 12,
      keyword,
      hashtagCount: "5"
    });
    onGenerate(localResult.results);
  }, [platform, contentType, language, category, keyword]);

  const handleNormalGenerate = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const localResult = generateCaptions({
        platform,
        contentType: contentType === "hashtag_set" ? "hashtag_set" : contentType,
        language: language as any,
        category,
        mood: "cheerful",
        occasion: "general",
        tone: "classy",
        length: "medium",
        emojiSetting: "minimal",
        resultsCount: 12,
        keyword,
        hashtagCount: "5"
      });
      onGenerate(localResult.results);
      setIsLoading(false);
      onSuccessMessage(uiLang === 'en' ? "Matched hand-curated premium presets! ⚡" : "തിരഞ്ഞെടുത്ത പ്രീമിയം വരികൾ തയ്യാറാക്കിയിരിക്കുന്നു! ⚡");
      
      // Scroll to result list smoothly
      setTimeout(() => {
        const element = document.getElementById("results-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }, 400);
  };

  const handleVamozhiAiGenerate = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      platform,
      contentType,
      language,
      category,
      mood: "cheerful",
      occasion: "general",
      tone: "classy",
      length: "medium",
      emojiSetting: "minimal",
      resultsCount: 12,
      keyword,
      hashtagCount: "5"
    };

    try {
      // Call production-ready API route
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        onGenerate(data.results);
        onSuccessMessage(data.message || `Generated ${data.results.length} Vamozhi AI captions successfully! ✨`);
      } else {
        throw new Error("Server generation returned non-200 state");
      }
    } catch (err) {
      console.warn("Vamozhi AI API failed or key missing, falling back to curated presets:", err);
      // Client-side scoring engine fallback
      const localResult = generateCaptions({
        platform,
        contentType,
        language: language as any,
        category,
        mood: "cheerful",
        occasion: "general",
        tone: "classy",
        length: "medium",
        emojiSetting: "minimal",
        resultsCount: 5,
        keyword,
        hashtagCount: "5"
      });
      onGenerate(localResult.results);
      onSuccessMessage(uiLang === 'en' ? "Offline curated presets matched successfully!" : "ഓഫ്‌ലൈൻ വരികൾ വിജയകരമായി തയ്യാറാക്കി!");
    } finally {
      setIsLoading(false);

      // Scroll to result list smoothly
      setTimeout(() => {
        const element = document.getElementById("results-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handleReset = () => {
    setContentType("photo-caption");
    setPlatform("instagram");
    setLanguage("malayalam");
    onCategoryChange("love");
    setKeyword("");
    onSuccessMessage(uiLang === 'en' ? "Reset caption generator filters! 🔄" : "ഫിൽട്ടറുകൾ റീസെറ്റ് ചെയ്തിരിക്കുന്നു! 🔄");
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto" id="generator">
      
      {/* Dynamic Header based on route */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900" id="generator-heading">
          {contentType === "hook" ? (uiLang === 'en' ? "Malayalam Reel Hooks Creator" : "മലയാളം റീൽ ഹൂക്ക്സ് ക്രിയേറ്റർ") : 
           (uiLang === 'en' ? "Social Caption Generator" : "സോഷ്യൽ ക്യാപ്ഷൻ ജനറേറ്റർ")}
        </h2>
      </div>

      {/* Main Form Glass Bento Layout */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-200 relative"
        id="generator-form"
      >
        {/* Loading Spinner Overlays */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs z-30 flex flex-col items-center justify-center gap-3 rounded-[32px] animate-fade-in" id="loading-overlay">
            <Loader2 className="w-10 h-10 text-purple-800 animate-spin" />
            <span className="text-xs font-extrabold text-purple-950 uppercase tracking-widest animate-pulse">
              {t("generating")}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-6 text-left">
          
          {/* CORE FIELDS (Simple, high-impact grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="core-fields-grid">
            
            {/* 1. Content Type */}
            <div className="flex flex-col gap-1.5" id="field-content-type">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-purple-700" />
                {t("step1")}
              </label>
              <div className="grid grid-cols-2 gap-2" id="input-content-type">
                {[
                  { id: "photo-caption", label: uiLang === 'en' ? "Photo Caption" : "ഫോട്ടോ ക്യാപ്ഷൻ" },
                  { id: "hook", label: uiLang === 'en' ? "Reel Hook" : "റീൽ ഹൂക്ക്" }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setContentType(type.id)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
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

            {/* 2. Language Selector */}
            <div className="flex flex-col gap-1.5" id="field-language">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-purple-700" />
                {t("step3")}
              </label>
              <div className="grid grid-cols-2 gap-2" id="input-language">
                {[
                  { id: "malayalam", label: "മലയാളം" },
                  { id: "manglish", label: "Manglish" }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setLanguage(lang.id as any)}
                    className={`py-2.5 px-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
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

            {/* 3. Keyword */}
            <div className="flex flex-col gap-1.5" id="field-keyword">
              <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 justify-between">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-700" />
                  {t("step6")}
                </span>
              </label>
              <div className="relative flex items-center w-full">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={uiLang === 'en' ? "E.g., tea, rain, kochi, puzha" : "ഉദാ: ചായ, മഴ, കൊച്ചി, പുഴ"}
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400 h-[46px]"
                  id="input-keyword"
                />
                <button
                  type="button"
                  onClick={toggleKeywordSpeech}
                  className={`absolute right-2 p-2 rounded-lg transition-all cursor-pointer ${
                    isListeningKeyword 
                      ? "bg-red-600 text-white animate-pulse" 
                      : "text-slate-400 hover:text-purple-700 hover:bg-slate-150"
                  }`}
                  title="Speak keyword in Malayalam"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          <div className="text-center mt-2" id="info-live-matching-banner">
            <span className="text-[10px] text-slate-500 font-bold bg-slate-50 border border-slate-100 rounded-full py-1 px-4 inline-block">
              💡 {uiLang === 'en' ? "Presets matching your choices are shown instantly below. Click below to generate fresh, custom AI ideas." : "തെരഞ്ഞെടുത്ത വരികൾ താഴെ തത്സമയം നൽകിയിട്ടുണ്ട്. ജെമിനി AI വഴി പുതിയ വരികൾ നിർമ്മിക്കാൻ താഴെയുള്ള ബട്ടൺ ക്ലിക്ക് ചെയ്യുക."}
            </span>
          </div>

        </div>

        {/* Generate CTA Trigger */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleNormalGenerate}
            className="w-full sm:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider border border-slate-200"
            id="btn-normal-generate"
          >
            <AlignLeft className="w-4.5 h-4.5 text-purple-700" />
            {uiLang === 'en' ? "Normal Generate" : "സാധാരണ ജനറേറ്റ് ചെയ്യുക"}
          </button>

          <button
            type="button"
            onClick={handleVamozhiAiGenerate}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-800 via-pink-600 to-orange-500 hover:scale-[0.98] text-white text-sm font-extrabold rounded-2xl transition-all shadow-md shadow-pink-100 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            id="btn-vamozhi-ai-generate"
          >
            <Sparkles className="w-4.5 h-4.5 animate-pulse" />
            {uiLang === 'en' ? "Vamozhi AI" : "വമൊഴി AI 🪄"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider border border-slate-200"
            id="btn-reset-generator"
            title="Reset all filters to defaults"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            {uiLang === 'en' ? "Reset" : "റീസെറ്റ്"}
          </button>
        </div>

      </form>
    </section>
  );
}
