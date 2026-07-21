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
import { AnimatePresence, motion } from "motion/react";


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
                currentPath === "/" || currentPath === "/manglish-to-malayalam" || currentPath === "/malayalam-dictionary" ? "text-purple-900 font-black border-b-2 border-purple-800 pb-0.5" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              Typing & Dictionary ⌨️📖
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
              onClick={() => onNavigate("/malayalam-caption-generator")}
              className={`text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                currentPath === "/malayalam-caption-generator" || currentPath === "/instagram-caption-generator" || currentPath === "/facebook-caption-generator" || currentPath === "/whatsapp-status-generator" || currentPath === "/snapchat-caption-generator" || currentPath === "/tiktok-caption-generator" || currentPath === "/malayalam-instagram-bio" || currentPath === "/malayalam-reel-hooks" || currentPath === "/arike-bio-generator" || currentPath === "/bumble-bio-generator" || currentPath === "/matrimony-bio-generator" ? "text-purple-900 font-black border-b-2 border-purple-800 pb-0.5" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              Caption Generator ✨
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

      {/* Mobile Drawer Overlay & Menu wrapped in AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
              id="mobile-drawer-overlay"
            />

            {/* Mobile Menu Drawer */}
            <motion.div
              id="mobile-drawer-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-white z-50 lg:hidden flex flex-col h-full shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3" onClick={handleLogoClick}>
                  <div className="w-9 h-9 bg-gradient-to-br from-purple-950 via-[#911b5a] to-[#ff2a6d] rounded-lg flex items-center justify-center text-white font-black text-lg transform -rotate-3">
                    വാ
                  </div>
                  <div className="text-left">
                    <span className="text-base font-black tracking-tight text-purple-950 uppercase block leading-none">
                      VAMOZHI
                    </span>
                    <span className="text-[8px] font-extrabold text-pink-600 tracking-wider uppercase block mt-0.5">
                      Your Vibe. Your Words.
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
                {/* Mobile Search section */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Quick Search
                  </span>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder={t("searchTools")}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-xs font-semibold rounded-2xl border border-slate-200/80 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all text-slate-800"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  </div>
                  
                  {/* Realtime Search Results */}
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border border-slate-100 rounded-2xl bg-slate-50 p-2 space-y-1 max-h-48 overflow-y-auto"
                      >
                        {searchResults.length > 0 ? (
                          searchResults.map((tool) => (
                            <button
                              key={tool.name}
                              onClick={() => handleSearchResultClick(tool.path)}
                              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-950 rounded-xl transition-all flex items-center justify-between"
                            >
                              <span>{tool.name}</span>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2.5 text-xs text-slate-400 text-center font-medium">
                            No matching tools found
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Primary Navigation list */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Main Pages
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { name: "Typing & Dictionary ⌨️📖", path: "/", icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
                      { name: "Learn Malayalam 🎓", path: "/learn-malayalam", icon: <BookOpen className="w-4 h-4 text-pink-600" /> },
                      { name: "Caption Generator ✨", path: "/malayalam-caption-generator", icon: <BookOpen className="w-4 h-4 text-amber-500" /> },
                      { name: "Hashtags 🏷️", path: "/malayalam-hashtags", icon: <Sparkles className="w-4 h-4 text-pink-500" /> }
                    ].map((item) => {
                      const isActive = item.path === "/" 
                        ? (currentPath === "/" || currentPath === "/manglish-to-malayalam" || currentPath === "/malayalam-dictionary")
                        : (item.path === "/malayalam-caption-generator"
                          ? (currentPath === "/malayalam-caption-generator" || currentPath === "/instagram-caption-generator" || currentPath === "/facebook-caption-generator" || currentPath === "/whatsapp-status-generator" || currentPath === "/snapchat-caption-generator" || currentPath === "/tiktok-caption-generator" || currentPath === "/malayalam-instagram-bio" || currentPath === "/malayalam-reel-hooks" || currentPath === "/arike-bio-generator" || currentPath === "/bumble-bio-generator" || currentPath === "/matrimony-bio-generator")
                          : currentPath === item.path);
                      return (
                        <button
                          key={item.path}
                          onClick={() => { onNavigate(item.path); setIsOpen(false); }}
                          className={`w-full py-3 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all group ${
                            isActive 
                              ? "bg-purple-50 text-purple-950 border-l-4 border-purple-800" 
                              : "text-slate-700 hover:bg-slate-50 border-l-4 border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="p-1 bg-white rounded-lg shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                              {item.icon}
                            </span>
                            <span>{item.name}</span>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${isActive ? 'text-purple-800' : 'text-slate-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Saved list fast-access */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    My Curated Content
                  </span>
                  <button
                    onClick={() => { onOpenFavourites(); setIsOpen(false); }}
                    className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white flex items-center justify-between shadow-md active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                        <Heart className="w-4.5 h-4.5 fill-pink-500 text-pink-500" />
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-black uppercase tracking-wider leading-none">
                          Saved Favourites
                        </span>
                        <span className="text-[10px] text-purple-200 mt-1 block">
                          Tap to open your custom collection
                        </span>
                      </div>
                    </div>
                    <span className="bg-pink-600 text-white text-xs font-black px-2.5 py-1 rounded-full border border-pink-400/20">
                      {favouritesCount}
                    </span>
                  </button>
                </div>

                {/* Popular Social Tools Quick Grid */}
                <div className="space-y-3">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Quick Writing Tools
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Instagram Captions", path: "/instagram-caption-generator" },
                      { name: "Facebook Posts", path: "/facebook-caption-generator" },
                      { name: "WhatsApp Status", path: "/whatsapp-status-generator" },
                      { name: "TikTok Video Captions", path: "/tiktok-caption-generator" },
                    ].map((tool) => (
                      <button
                        key={tool.name}
                        onClick={() => { onNavigate(tool.path); setIsOpen(false); }}
                        className="p-3 bg-slate-50 hover:bg-purple-50/50 rounded-2xl border border-slate-100 text-left transition-all active:scale-95 group cursor-pointer"
                      >
                        <span className="text-[11px] font-bold text-slate-800 group-hover:text-purple-900 block leading-tight">
                          {tool.name}
                        </span>
                        <span className="text-[9px] text-slate-400 mt-1 block font-medium">
                          Generate now →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info & Contact links */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-slate-400">
                  <button
                    onClick={() => { onNavigate("/about"); setIsOpen(false); }}
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider hover:text-purple-800 transition-colors py-2 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-purple-500" />
                    {t("about")}
                  </button>
                  
                  <span className="text-slate-200">|</span>

                  <button
                    onClick={() => { onNavigate("/contact"); setIsOpen(false); }}
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider hover:text-pink-800 transition-colors py-2 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-pink-500" />
                    {t("contact")}
                  </button>
                </div>

              </div>

              {/* Bottom Main Action Button */}
              <div className="p-5 border-t border-slate-100 bg-slate-50 shrink-0">
                <button
                  onClick={() => { onNavigate("/"); setIsOpen(false); }}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-950 via-[#911b5a] to-[#ff2a6d] hover:brightness-110 active:scale-[0.98] text-white font-extrabold rounded-2xl shadow-lg shadow-purple-950/15 text-center text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  {t("launchMainGenerator")}
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
