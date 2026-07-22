/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  BookOpen,
  Hash,
  Menu,
  X,
  Keyboard,
  GraduationCap,
  Award,
  ShieldCheck,
  Search,
  ChevronRight,
  Heart,
  Info,
  Mail,
  Home,
  ChevronDown,
  Film
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { AnimatePresence, motion } from "motion/react";

interface NavbarProps {
  favouritesCount: number;
  onOpenFavourites: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const ALL_SEARCHABLE_TOOLS = [
  { name: "Instagram Caption Generator", path: "/instagram-caption-generator" },
  { name: "Malayalam Reel Hooks & Content Ideas (റീൽ ഹുക്കുകളും ആശയങ്ങളും)", path: "/malayalam-reel-hooks" },
  { name: "Facebook Post Generator", path: "/facebook-caption-generator" },
  { name: "WhatsApp Status Generator", path: "/whatsapp-status-generator" },
  { name: "Snapchat Caption Creator", path: "/snapchat-caption-generator" },
  { name: "TikTok Video Caption", path: "/tiktok-caption-generator" },
  { name: "Manglish to Malayalam Typing", path: "/manglish-to-malayalam" },
  { name: "Malayalam Dictionary Search", path: "/malayalam-dictionary" },
  { name: "Malayalam Reel Hooks", path: "/malayalam-reel-hooks" },
  { name: "Malayalam Quotes (മലയാളം ഉദ്ധരണികൾ)", path: "/malayalam-quotes" },
  { name: "Learn Malayalam Alphabet", path: "/learn-malayalam" },
  { name: "Malayalam Numbers & Quiz", path: "/malayalam-numbers" }
];

export default function Navbar({ favouritesCount, onOpenFavourites, currentPath, onNavigate }: NavbarProps) {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCreatorSubmenuOpen, setIsCreatorSubmenuOpen] = useState(false);
  const creatorSubmenuRef = useRef<HTMLDivElement>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ name: string; path: string }[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside click to close search suggestions and creator menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (creatorSubmenuRef.current && !creatorSubmenuRef.current.contains(event.target as Node)) {
        setIsCreatorSubmenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = ALL_SEARCHABLE_TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(val.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleSearchResultClick = (path: string) => {
    onNavigate(path);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    onNavigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isCreatorToolsActive = 
    currentPath === "/malayalam-caption-generator" ||
    currentPath === "/malayalam-quotes" ||
    currentPath === "/malayalam-reel-hooks" ||
    currentPath === "/instagram-caption-generator" ||
    currentPath === "/facebook-caption-generator" ||
    currentPath === "/whatsapp-status-generator" ||
    currentPath === "/snapchat-caption-generator" ||
    currentPath === "/tiktok-caption-generator" ||
    currentPath === "/malayalam-instagram-bio" ||
    currentPath === "/arike-bio-generator" ||
    currentPath === "/bumble-bio-generator" ||
    currentPath === "/matrimony-bio-generator";

  const isTypingActive = currentPath === "/manglish-to-malayalam";
  const isDictionaryActive = currentPath === "/malayalam-dictionary";
  const isLearnActive = currentPath === "/learn-malayalam" || currentPath === "/malayalam-numbers";
  const isHashtagsActive = currentPath === "/malayalam-hashtags";

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-2"
          : "bg-white/90 backdrop-blur-lg border-b border-slate-100 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Pro App Brand Logo */}
          <a
            href="/"
            className="brand-logo cursor-pointer shrink-0"
            aria-label="Vamozhi Home"
            onClick={(e) => {
              e.preventDefault();
              handleLogoClick();
            }}
            id="nav-brand-logo"
          >
            <img
              src="/assets/vamozhi-va-animated-logo.svg"
              alt=""
              width="48"
              height="48"
              className="brand-logo__icon shrink-0"
            />
            <div className="brand-logo__wordmark text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent uppercase block leading-none">
                  VAMOZHI
                </span>
                <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 leading-none">.com</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" title="Live Server Ready" />
              </div>
              <span className="text-[8px] font-extrabold text-pink-600 dark:text-pink-400 tracking-wider uppercase block mt-0.5">
                Your Vibe. Your Words.
              </span>
            </div>
          </a>

          {/* Unified Desktop Navigation Bar with SEPARATE Typing and Dictionary */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60" id="desktop-unified-nav">
            <button
              onClick={handleLogoClick}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                currentPath === "/"
                  ? "bg-purple-950 text-white shadow-sm"
                  : "text-slate-600 hover:text-purple-950 hover:bg-white/60"
              }`}
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              Home
            </button>

            {/* Creator Dropdown Menu */}
            <div 
              className="relative"
              ref={creatorSubmenuRef}
              onMouseEnter={() => setIsCreatorSubmenuOpen(true)}
              onMouseLeave={() => setIsCreatorSubmenuOpen(false)}
            >
              <button
                onClick={() => setIsCreatorSubmenuOpen(!isCreatorSubmenuOpen)}
                aria-haspopup="true"
                aria-expanded={isCreatorSubmenuOpen}
                aria-label="Creator tools menu"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                  isCreatorToolsActive
                    ? "bg-purple-950 text-white shadow-sm"
                    : "text-slate-600 hover:text-purple-950 hover:bg-white/60"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Creator</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isCreatorSubmenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Accessible Submenu */}
              {isCreatorSubmenuOpen && (
                <div 
                  className="absolute top-full left-0 pt-1.5 w-60 z-[100] before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="bg-white dark:bg-neutral-900 border border-slate-200/90 dark:border-neutral-800 rounded-2xl shadow-2xl py-2 text-left">
                    <div className="px-3.5 py-1 text-[9px] font-black text-purple-700 dark:text-purple-400 uppercase tracking-widest border-b border-slate-100 dark:border-neutral-800 mb-1">
                      Creator Suite
                    </div>

                    <button
                      onClick={() => { onNavigate("/malayalam-caption-generator"); setIsCreatorSubmenuOpen(false); }}
                      role="menuitem"
                      className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                        currentPath === "/malayalam-caption-generator"
                          ? "bg-purple-50 text-purple-950 dark:bg-neutral-800 dark:text-purple-300 font-black"
                          : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-950 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                        <div className="flex flex-col">
                          <span>Caption Creator</span>
                          <span className="text-[10px] font-normal text-slate-400">ക്യാപ്ഷൻ ക്രിയേറ്റർ</span>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => { onNavigate("/malayalam-quotes"); setIsCreatorSubmenuOpen(false); }}
                      role="menuitem"
                      className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                        currentPath === "/malayalam-quotes"
                          ? "bg-purple-50 text-purple-950 dark:bg-neutral-800 dark:text-purple-300 font-black"
                          : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-950 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-purple-500 shrink-0" />
                        <div className="flex flex-col">
                          <span>Quote Creator</span>
                          <span className="text-[10px] font-normal text-slate-400">മലയാളം ഉദ്ധരണികൾ</span>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => { onNavigate("/malayalam-reel-hooks"); setIsCreatorSubmenuOpen(false); }}
                      role="menuitem"
                      className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                        currentPath === "/malayalam-reel-hooks"
                          ? "bg-purple-50 text-purple-950 dark:bg-neutral-800 dark:text-purple-300 font-black"
                          : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-950 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Film className="w-4 h-4 text-pink-500 shrink-0" />
                        <div className="flex flex-col">
                          <span>Reel Hooks & Ideas 🎬</span>
                          <span className="text-[10px] font-normal text-slate-400">റീൽ ഹുക്കുകളും ആശയങ്ങളും</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate("/manglish-to-malayalam")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                isTypingActive
                  ? "bg-purple-950 text-white shadow-sm"
                  : "text-slate-600 hover:text-purple-950 hover:bg-white/60"
              }`}
            >
              <Keyboard className="w-3.5 h-3.5 text-pink-400" />
              Typing
            </button>

            <button
              onClick={() => onNavigate("/malayalam-dictionary")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                isDictionaryActive
                  ? "bg-purple-950 text-white shadow-sm"
                  : "text-slate-600 hover:text-purple-950 hover:bg-white/60"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Dictionary
            </button>

            <button
              onClick={() => onNavigate("/learn-malayalam")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                isLearnActive
                  ? "bg-purple-950 text-white shadow-sm"
                  : "text-slate-600 hover:text-purple-950 hover:bg-white/60"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              Learn
            </button>

            <button
              onClick={() => onNavigate("/malayalam-hashtags")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                isHashtagsActive
                  ? "bg-purple-950 text-white shadow-sm"
                  : "text-slate-600 hover:text-purple-950 hover:bg-white/60"
              }`}
            >
              <Hash className="w-3.5 h-3.5 text-pink-400" />
              Hashtags
            </button>
          </div>

          {/* Quick Search Input (Desktop) */}
          <div ref={searchRef} className="hidden md:block relative max-w-[180px] lg:max-w-[210px] w-full" id="nav-search-container">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search tools..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Instant Search Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50 text-left">
                <span className="block px-4 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                  Tools
                </span>
                {searchResults.map((tool) => (
                  <button
                    key={tool.name}
                    onClick={() => handleSearchResultClick(tool.path)}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-900 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    {tool.name}
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions: Saved Items & Menu Drawer Trigger */}
          <div className="flex items-center gap-1.5" id="nav-actions">
            <button
              onClick={onOpenFavourites}
              className="relative p-2 bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-pink-600 rounded-xl border border-slate-200/60 transition-colors group cursor-pointer"
              aria-label="Saved items"
              id="btn-nav-fav"
            >
              <Heart className={`w-4.5 h-4.5 group-hover:text-pink-600 transition-colors ${favouritesCount > 0 ? 'fill-pink-600 text-pink-600' : ''}`} />
              {favouritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {favouritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200/60 cursor-pointer"
              aria-label="Open menu"
              id="btn-mobile-menu"
            >
              {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Slide-Over Drawer with SEPARATE Typing and Dictionary */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:max-w-sm bg-white z-50 flex flex-col h-full shadow-2xl overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                <span className="text-sm font-black uppercase tracking-wider text-slate-800">
                  Vamozhi Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* Search */}
                <div className="space-y-1.5">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Quick Search
                  </span>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search tools..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                  {searchQuery && searchResults.length > 0 && (
                    <div className="border border-slate-100 rounded-xl bg-slate-50 p-1 space-y-1 max-h-40 overflow-y-auto">
                      {searchResults.map((tool) => (
                        <button
                          key={tool.name}
                          onClick={() => handleSearchResultClick(tool.path)}
                          className="w-full text-left px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-between"
                        >
                          {tool.name}
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Primary Section Links - Separate Typing and Dictionary */}
                <div className="space-y-1">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Features & Tools
                  </span>
                  {[
                    { name: "Caption Creator ✨", path: "/malayalam-caption-generator", icon: Sparkles },
                    { name: "Quote Creator ✍️", path: "/malayalam-quotes", icon: BookOpen },
                    { name: "Reel Hooks & Ideas 🎬", path: "/malayalam-reel-hooks", icon: Film },
                    { name: "Manglish Typing ⌨️", path: "/manglish-to-malayalam", icon: Keyboard },
                    { name: "Malayalam Dictionary 📖", path: "/malayalam-dictionary", icon: BookOpen },
                    { name: "Learn Malayalam 🎓", path: "/learn-malayalam", icon: GraduationCap },
                    { name: "Hashtag Generator 🏷️", path: "/malayalam-hashtags", icon: Hash }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => { onNavigate(item.path); setIsOpen(false); }}
                        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-between transition-colors ${
                          currentPath === item.path
                            ? "bg-purple-50 text-purple-950 font-black"
                            : "text-slate-700 hover:bg-purple-50 hover:text-purple-950"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-purple-600" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    );
                  })}
                </div>

                {/* Information Pages */}
                <div className="pt-3 border-t border-slate-100 space-y-1">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Platform Info
                  </span>
                  <button
                    onClick={() => { onNavigate("/about"); setIsOpen(false); }}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-600 hover:text-purple-900 flex items-center gap-2"
                  >
                    <Info className="w-3.5 h-3.5 text-purple-500" />
                    About VAMOZHI
                  </button>
                  <button
                    onClick={() => { onNavigate("/contact"); setIsOpen(false); }}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-600 hover:text-pink-900 flex items-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-pink-500" />
                    Contact & Feedback
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
