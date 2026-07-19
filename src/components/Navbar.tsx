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
  ChevronDown, 
  Smartphone, 
  HeartHandshake, 
  Sparkles, 
  BookOpen, 
  Info,
  ChevronRight
} from "lucide-react";

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

const DATING_MATRIMONY_TOOLS = [
  { name: "Arike Dating Bio", path: "/arike-bio-generator" },
  { name: "Bumble Profile Bio", path: "/bumble-bio-generator" },
  { name: "Tinder Intros", path: "/bumble-bio-generator" },
  { name: "Matrimony Profile", path: "/matrimony-bio-generator" }
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
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ name: string; path: string }[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Active Dropdowns state (Mobile)
  const [mobileSocialOpen, setMobileSocialOpen] = useState(false);
  const [mobileDatingOpen, setMobileDatingOpen] = useState(false);

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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-800 via-pink-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md transform -rotate-3 group-hover:rotate-0 transition-transform italic">
              V
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
          <div className="hidden lg:flex items-center gap-6" id="desktop-nav-menu">
            <button
              onClick={() => onNavigate("/")}
              className={`text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                currentPath === "/" ? "text-purple-900" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              Home
            </button>

            {/* Social Apps Dropdown */}
            <div className="relative group/dropdown">
              <button className="text-xs font-extrabold uppercase tracking-wider text-slate-500 hover:text-purple-800 flex items-center gap-1 py-1 cursor-pointer">
                Social Apps
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 opacity-0 translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto transition-all duration-200">
                {SOCIAL_APPS_TOOLS.map((app) => (
                  <button
                    key={app.path}
                    onClick={() => onNavigate(app.path)}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-900 transition-colors cursor-pointer"
                  >
                    {app.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dating & Matrimony Dropdown */}
            <div className="relative group/dropdown">
              <button className="text-xs font-extrabold uppercase tracking-wider text-slate-500 hover:text-purple-800 flex items-center gap-1 py-1 cursor-pointer">
                Dating & Matrimony
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 opacity-0 translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto transition-all duration-200">
                {DATING_MATRIMONY_TOOLS.map((app) => (
                  <button
                    key={app.path}
                    onClick={() => onNavigate(app.path)}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-900 transition-colors cursor-pointer"
                  >
                    {app.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate("/manglish-to-malayalam")}
              className={`text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                currentPath === "/manglish-to-malayalam" ? "text-purple-900" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              Manglish Typing
            </button>

            <button
              onClick={() => onNavigate("/about")}
              className={`text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                currentPath === "/about" ? "text-purple-900" : "text-slate-500 hover:text-purple-800"
              }`}
            >
              About
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
                placeholder="Find a writing tool..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs font-medium rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Suggestions Overlay */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50 text-left">
                <span className="block px-4 py-1 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                  Suggested Tools
                </span>
                {searchResults.map((tool) => (
                  <button
                    key={tool.path}
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
              aria-label="View Saved Items"
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
              placeholder="Search tools..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-600 text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 text-left py-1.5 max-h-48 overflow-y-auto">
                {searchResults.map((tool) => (
                  <button
                    key={tool.path}
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
              className="py-2.5 font-extrabold text-slate-800 border-b border-slate-50 text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-purple-600" />
              Home Page
            </button>

            {/* Mobile Social Apps Dropdown */}
            <div>
              <button
                onClick={() => setMobileSocialOpen(!mobileSocialOpen)}
                className="w-full text-left py-2.5 font-extrabold text-slate-800 border-b border-slate-50 text-xs uppercase tracking-wider flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-pink-600" />
                  Social Apps
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSocialOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileSocialOpen && (
                <div className="bg-slate-50 rounded-xl p-2 mt-2 flex flex-col gap-1.5">
                  {SOCIAL_APPS_TOOLS.map((app) => (
                    <button
                      key={app.path}
                      onClick={() => { onNavigate(app.path); setIsOpen(false); }}
                      className="text-left px-3 py-2 text-xs font-bold text-slate-600 hover:text-purple-900"
                    >
                      {app.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Dating Dropdown */}
            <div>
              <button
                onClick={() => setMobileDatingOpen(!mobileDatingOpen)}
                className="w-full text-left py-2.5 font-extrabold text-slate-800 border-b border-slate-50 text-xs uppercase tracking-wider flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-red-500" />
                  Dating & Matrimony
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDatingOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileDatingOpen && (
                <div className="bg-slate-50 rounded-xl p-2 mt-2 flex flex-col gap-1.5">
                  {DATING_MATRIMONY_TOOLS.map((app) => (
                    <button
                      key={app.path}
                      onClick={() => { onNavigate(app.path); setIsOpen(false); }}
                      className="text-left px-3 py-2 text-xs font-bold text-slate-600 hover:text-purple-900"
                    >
                      {app.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { onNavigate("/manglish-to-malayalam"); setIsOpen(false); }}
              className="py-2.5 font-extrabold text-slate-800 border-b border-slate-50 text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Manglish Typing
            </button>

            <button
              onClick={() => { onNavigate("/about"); setIsOpen(false); }}
              className="py-2.5 font-extrabold text-slate-800 border-b border-slate-50 text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-blue-500" />
              About Vamozhi
            </button>
          </div>

          <button
            onClick={() => { onNavigate("/"); setIsOpen(false); }}
            className="w-full mt-4 py-3 bg-gradient-to-r from-purple-800 to-pink-600 text-white font-extrabold rounded-2xl shadow-md text-center text-xs uppercase tracking-wider active:scale-95 transition-transform"
          >
            Launch Main Generator
          </button>
        </div>
      </div>
    </nav>
  );
}
