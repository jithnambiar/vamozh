/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  X, 
  Heart, 
  Search, 
  Smartphone, 
  Sparkles, 
  BookOpen, 
  ChevronRight,
  Info,
  Mail,
  Globe
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";


interface NavbarProps {
  favouritesCount: number;
  onOpenFavourites: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const SOCIAL_APPS_TOOLS = [
  { name: "Instagram Captions", path: "/instagram-caption-generator" },
  { name: "Facebook Posts", path: "/facebook-caption-generator" },
  { name: "WhatsApp Status", path: "/whatsapp-status-generator" },
  { name: "Snapchat Captions", path: "/snapchat-caption-generator" },
  { name: "TikTok Captions", path: "/tiktok-caption-generator" }
];

const ALL_SEARCHABLE_TOOLS = [
  { name: "Instagram Caption Generator", path: "/instagram-caption-generator" },
  { name: "Facebook Post Generator", path: "/facebook-caption-generator" },
  { name: "WhatsApp Status Generator", path: "/whatsapp-status-generator" },
  { name: "Snapchat Caption Creator", path: "/snapchat-caption-generator" },
  { name: "TikTok Video Caption", path: "/tiktok-caption-generator" },
  { name: "Arike Dating Bio", path: "/arike-bio-generator" },
  { name: "Bumble Profile Bio", path: "/bumble-bio-generator" },
  { name: "Matrimony Bio Generator", path: "/matrimony-bio-generator" },
  { name: "Manglish to Malayalam Typing", path: "/manglish-to-malayalam" },
  { name: "Instagram Reel Hooks", path: "/malayalam-reel-hooks" },
  { name: "Malayalam Hashtag Sets", path: "/malayalam-hashtags" }
];

export default function Navbar({ favouritesCount, onOpenFavourites, currentPath, onNavigate }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ name: string; path: string }[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside click to close search suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search typing
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

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2.5"
          : "bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo / Branding */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={handleLogoClick}
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-950 via-[#911b5a] to-[#ff2a6d] rounded-xl flex items-center justify-center text-[#fffef0] font-black text-xl shadow-md transform -rotate-3 group-hover:rotate-0 transition-all font-sans">
              വാ
            </div>
            <div className="text-left">
              <span className="text-xl font-black tracking-tight text-purple-950 uppercase block leading-none">
                VAMOZHI
              </span>
              <span className="text-[9px] font-extrabold text-pink-600 tracking-wider uppercase block mt-1">
                Your Vibe. Your Words.
              </span>
            </div>
          </div>

           {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5" id="desktop-nav-menu">
            <button
              onClick={() => onNavigate("/")}
              className={`text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                currentPath === "/" ? "text-purple-900 font-black border-b-2 border-purple-800 pb-0.5" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              {t("home")}
            </button>

            <button
              onClick={() => onNavigate("/manglish-to-malayalam")}
              className={`text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                currentPath === "/manglish-to-malayalam" ? "text-purple-900 font-black border-b-2 border-purple-800 pb-0.5" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              {t("malayalamTyping")}
            </button>

            <button
              onClick={() => onNavigate("/learn-malayalam")}
              className={`text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                currentPath === "/learn-malayalam" ? "text-purple-900 font-black border-b-2 border-purple-800 pb-0.5" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              Learn Malayalam 🎓
            </button>

            <button
              onClick={() => onNavigate("/malayalam-dictionary")}
              className={`text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                currentPath === "/malayalam-dictionary" ? "text-purple-900 font-black border-b-2 border-purple-800 pb-0.5" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              Dictionary 📖
            </button>

            <button
              onClick={() => onNavigate("/malayalam-numbers")}
              className={`text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                currentPath === "/malayalam-numbers" ? "text-purple-900 font-black border-b-2 border-purple-800 pb-0.5" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              Numbers 🔢
            </button>

            <button
              onClick={() => onNavigate("/malayalam-hashtags")}
              className={`text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                currentPath === "/malayalam-hashtags" ? "text-purple-900 font-black border-b-2 border-purple-800 pb-0.5" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              Hashtags 🏷️
            </button>
          </div>

          {/* Find a Tool Search Bar (Desktop) */}
          <div ref={searchRef} className="hidden md:block relative max-w-xs w-full" id="nav-search-container">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder={t("findWritingTool")}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Suggestions Overlay */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50 text-left">
                <span className="block px-4 py-1 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                  {t("suggestedTools")}
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

          {/* Right Action buttons */}
          <div className="flex items-center gap-2" id="nav-actions">
            {/* Saved Drawer Icon */}
            <button
              onClick={onOpenFavourites}
              className="relative p-2.5 rounded-full hover:bg-slate-50 transition-colors text-slate-600 group cursor-pointer"
              aria-label={t("savedItems")}
              id="btn-nav-fav"
            >
              <Heart className={`w-5 h-5 group-hover:text-red-500 transition-colors ${favouritesCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favouritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-pink-600 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {favouritesCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-50 lg:hidden cursor-pointer"
              aria-label="Toggle main menu"
              id="btn-mobile-menu"
            >
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          id="mobile-drawer-overlay"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-drawer-menu"
        className={`fixed top-[58px] right-0 bottom-0 w-4/5 max-w-sm bg-white border-l border-slate-200 shadow-2xl z-45 lg:hidden transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-5 overflow-y-auto h-full text-left">
          
          {/* Mobile Search field */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t("searchTools")}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-600 text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 text-left py-1.5 max-h-48 overflow-y-auto">
                {searchResults.map((tool) => (
                  <button
                    key={tool.name}
                    onClick={() => handleSearchResultClick(tool.path)}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 transition-colors block"
                  >
                    {tool.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => { onNavigate("/"); setIsOpen(false); }}
              className="py-2.5 font-extrabold text-slate-800 border-b border-slate-100 text-xs uppercase tracking-wider flex items-center gap-2 text-left"
            >
              <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
              {t("home")}
            </button>

            <button
              onClick={() => { onNavigate("/manglish-to-malayalam"); setIsOpen(false); }}
              className="py-2.5 font-extrabold text-slate-800 border-b border-slate-100 text-xs uppercase tracking-wider flex items-center gap-2 text-left"
            >
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              {t("malayalamTyping")}
            </button>

            <button
              onClick={() => { onNavigate("/learn-malayalam"); setIsOpen(false); }}
              className="py-2.5 font-extrabold text-slate-800 border-b border-slate-100 text-xs uppercase tracking-wider flex items-center gap-2 text-left"
            >
              <BookOpen className="w-4 h-4 text-pink-600 shrink-0" />
              Learn Malayalam 🎓
            </button>

            <button
              onClick={() => { onNavigate("/malayalam-dictionary"); setIsOpen(false); }}
              className="py-2.5 font-extrabold text-slate-800 border-b border-slate-100 text-xs uppercase tracking-wider flex items-center gap-2 text-left"
            >
              <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
              Dictionary 📖
            </button>

            <button
              onClick={() => { onNavigate("/malayalam-numbers"); setIsOpen(false); }}
              className="py-2.5 font-extrabold text-slate-800 border-b border-slate-100 text-xs uppercase tracking-wider flex items-center gap-2 text-left"
            >
              <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
              Numbers 🔢
            </button>

            <button
              onClick={() => { onNavigate("/malayalam-hashtags"); setIsOpen(false); }}
              className="py-2.5 font-extrabold text-slate-800 border-b border-slate-100 text-xs uppercase tracking-wider flex items-center gap-2 text-left"
            >
              <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
              Hashtags 🏷️
            </button>
          </div>

          <div className="mt-auto border-t border-slate-100 pt-4 flex flex-col gap-4">
            <button
              onClick={() => { onNavigate("/about"); setIsOpen(false); }}
              className="py-2 font-extrabold text-slate-600 hover:text-purple-800 text-xs uppercase tracking-wider flex items-center gap-2 text-left"
            >
              <Info className="w-4 h-4 text-purple-500 shrink-0" />
              {t("about")}
            </button>

            <button
              onClick={() => { onNavigate("/contact"); setIsOpen(false); }}
              className="py-2 font-extrabold text-slate-600 hover:text-pink-800 text-xs uppercase tracking-wider flex items-center gap-2 text-left"
            >
              <Mail className="w-4 h-4 text-pink-500 shrink-0" />
              {t("contact")}
            </button>
          </div>

          <button
            onClick={() => { onNavigate("/"); setIsOpen(false); }}
            className="w-full mt-4 py-3 bg-gradient-to-r from-purple-800 to-pink-600 text-white font-extrabold rounded-2xl shadow-md text-center text-xs uppercase tracking-wider active:scale-95 transition-transform"
          >
            {t("launchMainGenerator")}
          </button>
        </div>
      </div>
    </nav>
  );
}
