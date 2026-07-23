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
  
  // Dropdown states for Desktop
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  
  // Accordion states for Mobile Drawer
  const [isMobileCreatorOpen, setIsMobileCreatorOpen] = useState(true);
  const [isMobileWriteOpen, setIsMobileWriteOpen] = useState(false);
  const [isMobileLearnOpen, setIsMobileLearnOpen] = useState(false);

  const creatorRef = useRef<HTMLDivElement>(null);
  const writeRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);

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

  // Handle outside click & Keyboard Escape key for accessible dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (creatorRef.current && !creatorRef.current.contains(event.target as Node)) {
        setIsCreatorOpen(false);
      }
      if (writeRef.current && !writeRef.current.contains(event.target as Node)) {
        setIsWriteOpen(false);
      }
      if (learnRef.current && !learnRef.current.contains(event.target as Node)) {
        setIsLearnOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCreatorOpen(false);
        setIsWriteOpen(false);
        setIsLearnOpen(false);
        setIsSearchFocused(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
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

  const isCreatorActive = 
    currentPath === "/malayalam-caption-generator" ||
    currentPath === "/malayalam-quotes" ||
    currentPath === "/malayalam-reel-hooks" ||
    currentPath === "/malayalam-hashtags" ||
    currentPath === "/malayalam-instagram-bio" ||
    currentPath === "/instagram-caption-generator" ||
    currentPath === "/facebook-caption-generator" ||
    currentPath === "/whatsapp-status-generator" ||
    currentPath === "/snapchat-caption-generator" ||
    currentPath === "/tiktok-caption-generator" ||
    currentPath === "/arike-bio-generator" ||
    currentPath === "/bumble-bio-generator" ||
    currentPath === "/matrimony-bio-generator";

  const isWriteActive = 
    currentPath === "/manglish-to-malayalam" ||
    currentPath === "/malayalam-dictionary";

  const isLearnActive = 
    currentPath === "/learn-malayalam" || 
    currentPath === "/malayalam-numbers" ||
    currentPath === "/verify-certificate";

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
              alt="Vamozhi Logo"
              width="48"
              height="48"
              className="brand-logo__icon shrink-0"
            />
            <div className="brand-logo__wordmark text-left">
              <div className="flex items-center gap-1">
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent uppercase block leading-none">
                  VAMOZHI
                </span>
                <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 leading-none">.com</span>
              </div>
            </div>
          </a>

          {/* Unified Desktop Navigation Bar */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60" id="desktop-unified-nav">
            {/* 1. Home */}
            <button
              onClick={handleLogoClick}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                currentPath === "/"
                  ? "bg-purple-950 text-white shadow-sm"
                  : "text-slate-700 hover:text-purple-950 hover:bg-white/60"
              }`}
            >
              <Home className="w-3.5 h-3.5 text-amber-500" />
              Home
            </button>

            {/* 2. Creator Dropdown */}
            <div 
              className="relative"
              ref={creatorRef}
              onMouseEnter={() => setIsCreatorOpen(true)}
              onMouseLeave={() => setIsCreatorOpen(false)}
            >
              <button
                onClick={() => setIsCreatorOpen(!isCreatorOpen)}
                aria-haspopup="true"
                aria-expanded={isCreatorOpen}
                aria-label="Creator tools menu"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                  isCreatorActive
                    ? "bg-purple-950 text-white shadow-sm"
                    : "text-slate-700 hover:text-purple-950 hover:bg-white/60"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Creator</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isCreatorOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCreatorOpen && (
                <div 
                  className="absolute top-full left-0 pt-1.5 w-64 z-[100] before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl py-2 text-left">
                    <div className="px-3.5 py-1 text-[9px] font-black text-purple-700 uppercase tracking-widest border-b border-slate-100 mb-1">
                      Creator Suite
                    </div>

                    {[
                      { name: "Captions & Quotes", desc: "ക്യാപ്ഷൻ & ഉദ്ധരണികൾ", path: "/malayalam-caption-generator", icon: Sparkles },
                      { name: "Reel Hooks", desc: "റീൽ ഹുക്കുകൾ", path: "/malayalam-reel-hooks", icon: Film },
                      { name: "Content Ideas", desc: "കണ്ടന്റ് ആശയങ്ങൾ", path: "/malayalam-reel-hooks", icon: Film },
                      { name: "Hashtag Generator", desc: "ഹാഷ്‌ടാഗ് ജനറേറ്റർ", path: "/malayalam-hashtags", icon: Hash },
                      { name: "Instagram Bio Generator", desc: "ഇൻസ്റ്റാഗ്രാം ബയോ", path: "/malayalam-instagram-bio", icon: Sparkles }
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.name + item.path}
                          onClick={() => { onNavigate(item.path); setIsCreatorOpen(false); }}
                          role="menuitem"
                          className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                            currentPath === item.path
                              ? "bg-purple-50 text-purple-950 font-black"
                              : "text-slate-700 hover:bg-purple-50 hover:text-purple-950"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-purple-600 shrink-0" />
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              <span className="text-[10px] font-normal text-slate-500">{item.desc}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Write Dropdown */}
            <div 
              className="relative"
              ref={writeRef}
              onMouseEnter={() => setIsWriteOpen(true)}
              onMouseLeave={() => setIsWriteOpen(false)}
            >
              <button
                onClick={() => setIsWriteOpen(!isWriteOpen)}
                aria-haspopup="true"
                aria-expanded={isWriteOpen}
                aria-label="Write tools menu"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                  isWriteActive
                    ? "bg-purple-950 text-white shadow-sm"
                    : "text-slate-700 hover:text-purple-950 hover:bg-white/60"
                }`}
              >
                <Keyboard className="w-3.5 h-3.5 text-purple-600" />
                <span>Write</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isWriteOpen ? 'rotate-180' : ''}`} />
              </button>

              {isWriteOpen && (
                <div 
                  className="absolute top-full left-0 pt-1.5 w-56 z-[100] before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl py-2 text-left">
                    <div className="px-3.5 py-1 text-[9px] font-black text-purple-700 uppercase tracking-widest border-b border-slate-100 mb-1">
                      Writing & Transliteration
                    </div>

                    {[
                      { name: "Malayalam Typing", desc: "മംഗ്ലീഷ് ടൈപ്പിംഗ്", path: "/manglish-to-malayalam", icon: Keyboard },
                      { name: "Dictionary", desc: "മലയാളം നിഘണ്ടു", path: "/malayalam-dictionary", icon: BookOpen }
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => { onNavigate(item.path); setIsWriteOpen(false); }}
                          role="menuitem"
                          className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                            currentPath === item.path
                              ? "bg-purple-50 text-purple-950 font-black"
                              : "text-slate-700 hover:bg-purple-50 hover:text-purple-950"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-purple-600 shrink-0" />
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              <span className="text-[10px] font-normal text-slate-500">{item.desc}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Learn Dropdown */}
            <div 
              className="relative"
              ref={learnRef}
              onMouseEnter={() => setIsLearnOpen(true)}
              onMouseLeave={() => setIsLearnOpen(false)}
            >
              <button
                onClick={() => setIsLearnOpen(!isLearnOpen)}
                aria-haspopup="true"
                aria-expanded={isLearnOpen}
                aria-label="Learn Malayalam menu"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                  isLearnActive
                    ? "bg-purple-950 text-white shadow-sm"
                    : "text-slate-700 hover:text-purple-950 hover:bg-white/60"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>Learn</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLearnOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLearnOpen && (
                <div 
                  className="absolute top-full left-0 pt-1.5 w-60 z-[100] before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl py-2 text-left">
                    <div className="px-3.5 py-1 text-[9px] font-black text-amber-600 uppercase tracking-widest border-b border-slate-100 mb-1">
                      Learn & Certify
                    </div>

                    {[
                      { name: "Alphabet", desc: "അക്ഷരമാല പഠിക്കാം", path: "/learn-malayalam", icon: GraduationCap },
                      { name: "Numbers", desc: "മലയാളം അക്കങ്ങൾ", path: "/malayalam-numbers", icon: Award },
                      { name: "Phrases", desc: "പ്രധാന ശൈലികൾ", path: "/learn-malayalam", icon: GraduationCap },
                      { name: "Games", desc: "പഠന ഗെയിമുകൾ", path: "/learn-malayalam", icon: GraduationCap },
                      { name: "Practice", desc: "പരിശീലനം", path: "/learn-malayalam", icon: GraduationCap },
                      { name: "Certification", desc: "സർട്ടിഫിക്കറ്റ് പരീക്ഷ", path: "/learn-malayalam", icon: ShieldCheck }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.name + idx}
                          onClick={() => { onNavigate(item.path); setIsLearnOpen(false); }}
                          role="menuitem"
                          className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                            currentPath === item.path
                              ? "bg-amber-50 text-amber-950 font-black"
                              : "text-slate-700 hover:bg-amber-50/70 hover:text-amber-950"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              <span className="text-[10px] font-normal text-slate-500">{item.desc}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

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

          {/* Actions: Saved Items & Mobile Menu Trigger (lg:hidden) */}
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

            {/* Hamburger trigger only visible on screens below desktop breakpoint */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200/60 cursor-pointer lg:hidden"
              aria-label="Open mobile menu"
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

                {/* Primary Section Links */}
                <div className="space-y-2">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Features & Tools
                  </span>

                  {/* 1. Home Link */}
                  <button
                    onClick={() => { handleLogoClick(); setIsOpen(false); }}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentPath === "/"
                        ? "bg-purple-950 text-white font-black"
                        : "text-slate-700 hover:bg-purple-50 hover:text-purple-950"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Home className="w-4 h-4 text-amber-500" />
                      <span>Home</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* 2. Creator Accordion */}
                  <div className="rounded-2xl border border-purple-100 bg-purple-50/30 overflow-hidden">
                    <button
                      onClick={() => setIsMobileCreatorOpen(!isMobileCreatorOpen)}
                      className="w-full py-2.5 px-3 font-bold text-xs flex items-center justify-between text-purple-950 bg-purple-100/50 hover:bg-purple-100/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-pink-500" />
                        <span className="font-extrabold text-purple-950">Creator</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-purple-700 transition-transform duration-200 ${isMobileCreatorOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isMobileCreatorOpen && (
                      <div className="p-1 space-y-1 bg-white border-t border-purple-100/80">
                        {[
                          { name: "Captions & Quotes", path: "/malayalam-caption-generator", icon: Sparkles },
                          { name: "Reel Hooks", path: "/malayalam-reel-hooks", icon: Film },
                          { name: "Content Ideas", path: "/malayalam-reel-hooks", icon: Film },
                          { name: "Hashtag Generator", path: "/malayalam-hashtags", icon: Hash },
                          { name: "Instagram Bio Generator", path: "/malayalam-instagram-bio", icon: Sparkles }
                        ].map((item, idx) => {
                          const SubIcon = item.icon;
                          return (
                            <button
                              key={item.name + idx}
                              onClick={() => { onNavigate(item.path); setIsOpen(false); }}
                              className={`w-full text-left py-2 px-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                                currentPath === item.path
                                  ? "bg-purple-100/80 text-purple-950 font-black"
                                  : "text-slate-700 hover:bg-purple-50 hover:text-purple-950"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <SubIcon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                                <span>{item.name}</span>
                              </div>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* 3. Write Accordion */}
                  <div className="rounded-2xl border border-purple-100 bg-purple-50/30 overflow-hidden">
                    <button
                      onClick={() => setIsMobileWriteOpen(!isMobileWriteOpen)}
                      className="w-full py-2.5 px-3 font-bold text-xs flex items-center justify-between text-purple-950 bg-purple-100/50 hover:bg-purple-100/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Keyboard className="w-4 h-4 text-purple-600" />
                        <span className="font-extrabold text-purple-950">Write</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-purple-700 transition-transform duration-200 ${isMobileWriteOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isMobileWriteOpen && (
                      <div className="p-1 space-y-1 bg-white border-t border-purple-100/80">
                        {[
                          { name: "Malayalam Typing", path: "/manglish-to-malayalam", icon: Keyboard },
                          { name: "Dictionary", path: "/malayalam-dictionary", icon: BookOpen }
                        ].map((item) => {
                          const SubIcon = item.icon;
                          return (
                            <button
                              key={item.path}
                              onClick={() => { onNavigate(item.path); setIsOpen(false); }}
                              className={`w-full text-left py-2 px-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                                currentPath === item.path
                                  ? "bg-purple-100/80 text-purple-950 font-black"
                                  : "text-slate-700 hover:bg-purple-50 hover:text-purple-950"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <SubIcon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                                <span>{item.name}</span>
                              </div>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* 4. Learn Accordion */}
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/30 overflow-hidden">
                    <button
                      onClick={() => setIsMobileLearnOpen(!isMobileLearnOpen)}
                      className="w-full py-2.5 px-3 font-bold text-xs flex items-center justify-between text-amber-950 bg-amber-100/50 hover:bg-amber-100/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <GraduationCap className="w-4 h-4 text-amber-600" />
                        <span className="font-extrabold text-amber-950">Learn</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-amber-700 transition-transform duration-200 ${isMobileLearnOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isMobileLearnOpen && (
                      <div className="p-1 space-y-1 bg-white border-t border-amber-100/80">
                        {[
                          { name: "Alphabet", path: "/learn-malayalam", icon: GraduationCap },
                          { name: "Numbers", path: "/malayalam-numbers", icon: Award },
                          { name: "Phrases", path: "/learn-malayalam", icon: GraduationCap },
                          { name: "Games", path: "/learn-malayalam", icon: GraduationCap },
                          { name: "Practice", path: "/learn-malayalam", icon: GraduationCap },
                          { name: "Certification", path: "/learn-malayalam", icon: ShieldCheck }
                        ].map((item, idx) => {
                          const SubIcon = item.icon;
                          return (
                            <button
                              key={item.name + idx}
                              onClick={() => { onNavigate(item.path); setIsOpen(false); }}
                              className={`w-full text-left py-2 px-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                                currentPath === item.path
                                  ? "bg-amber-100/80 text-amber-950 font-black"
                                  : "text-slate-700 hover:bg-amber-50/70 hover:text-amber-950"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <SubIcon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span>{item.name}</span>
                              </div>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
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
