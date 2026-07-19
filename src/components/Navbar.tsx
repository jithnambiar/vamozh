/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Heart } from "lucide-react";

interface NavbarProps {
  favouritesCount: number;
  onOpenFavourites: () => void;
}

export default function Navbar({ favouritesCount, onOpenFavourites }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Branding */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg transform -rotate-6 italic group-hover:rotate-0 transition-transform">
              CM
            </div>
            <div>
              <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-pink-600 italic">
                CaptionMallu
              </span>
              <span className="block text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                Malayalam Creator
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" id="desktop-nav-menu">
            <button
              onClick={() => scrollToSection("generator")}
              className="text-sm font-semibold text-neutral-600 hover:text-purple-600 transition-colors"
              id="link-generator"
            >
              Generator
            </button>
            <button
              onClick={() => scrollToSection("categories")}
              className="text-sm font-semibold text-neutral-600 hover:text-purple-600 transition-colors"
              id="link-categories"
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection("trending")}
              className="text-sm font-semibold text-neutral-600 hover:text-purple-600 transition-colors"
              id="link-trending"
            >
              Trending
            </button>
            <button
              onClick={() => scrollToSection("seo-content")}
              className="text-sm font-semibold text-neutral-600 hover:text-purple-600 transition-colors"
              id="link-guide"
            >
              Creator Guide
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-semibold text-neutral-600 hover:text-purple-600 transition-colors"
              id="link-faq"
            >
              FAQ
            </button>
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4" id="nav-actions">
            <button
              onClick={onOpenFavourites}
              className="relative p-2.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-600 group"
              aria-label="View Favourites"
              id="btn-nav-fav"
            >
              <Heart className={`w-5.5 h-5.5 group-hover:text-red-500 transition-colors ${favouritesCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favouritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {favouritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => scrollToSection("generator")}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-purple-700 transition-colors shadow-sm active:scale-98"
              id="btn-nav-generate-cta"
            >
              Generate Caption
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 md:hidden" id="mobile-nav-controls">
            <button
              onClick={onOpenFavourites}
              className="relative p-2 rounded-full text-neutral-600"
              aria-label="View Favourites"
              id="btn-mobile-fav"
            >
              <Heart className={`w-5.5 h-5.5 ${favouritesCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favouritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {favouritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100"
              aria-label="Toggle menu"
              id="btn-mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-neutral-900/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          id="mobile-drawer-overlay"
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-drawer-menu"
        className={`fixed top-[65px] right-0 bottom-0 w-4/5 max-w-sm bg-white border-l border-neutral-100 shadow-2xl z-35 md:hidden transition-transform duration-350 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-5">
          <button
            onClick={() => scrollToSection("generator")}
            className="flex items-center justify-between text-left py-2 font-bold text-neutral-700 hover:text-purple-600 border-b border-neutral-50"
            id="mobile-link-generator"
          >
            Caption Generator ⚡
          </button>
          <button
            onClick={() => scrollToSection("categories")}
            className="flex items-center justify-between text-left py-2 font-bold text-neutral-700 hover:text-purple-600 border-b border-neutral-50"
            id="mobile-link-categories"
          >
            Explore Categories 📁
          </button>
          <button
            onClick={() => scrollToSection("trending")}
            className="flex items-center justify-between text-left py-2 font-bold text-neutral-700 hover:text-purple-600 border-b border-neutral-50"
            id="mobile-link-trending"
          >
            Trending Captions 🔥
          </button>
          <button
            onClick={() => scrollToSection("seo-content")}
            className="flex items-center justify-between text-left py-2 font-bold text-neutral-700 hover:text-purple-600 border-b border-neutral-50"
            id="mobile-link-guide"
          >
            Creator Guide 📝
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="flex items-center justify-between text-left py-2 font-bold text-neutral-700 hover:text-purple-600 border-b border-neutral-50"
            id="mobile-link-faq"
          >
            FAQ Help ❓
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              scrollToSection("generator");
            }}
            className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-extrabold rounded-2xl shadow-xl shadow-pink-500/15 text-center active:scale-95 transition-transform"
            id="mobile-btn-generate"
          >
            Generate Caption Now
          </button>
        </div>
      </div>
    </nav>
  );
}
