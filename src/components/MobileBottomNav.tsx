/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, Keyboard, BookOpen, GraduationCap, Hash, Heart } from "lucide-react";
import { motion } from "motion/react";

interface MobileBottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  favouritesCount: number;
  onOpenFavourites: () => void;
}

export default function MobileBottomNav({
  currentPath,
  onNavigate,
  favouritesCount,
  onOpenFavourites
}: MobileBottomNavProps) {
  
  const isHome = currentPath === "/";
  const isTyping = currentPath === "/manglish-to-malayalam";
  const isDictionary = currentPath === "/malayalam-dictionary";
  const isLearn = currentPath === "/learn-malayalam" || currentPath === "/malayalam-numbers" || currentPath === "/verify-certificate";
  const isHashtags = currentPath === "/malayalam-hashtags";

  const tabs = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: Home,
      isActive: isHome
    },
    {
      id: "typing",
      label: "Typing",
      path: "/manglish-to-malayalam",
      icon: Keyboard,
      isActive: isTyping
    },
    {
      id: "dictionary",
      label: "Dict",
      path: "/malayalam-dictionary",
      icon: BookOpen,
      isActive: isDictionary
    },
    {
      id: "learn",
      label: "Learn",
      path: "/learn-malayalam",
      icon: GraduationCap,
      isActive: isLearn
    },
    {
      id: "hashtags",
      label: "Hashtags",
      path: "/malayalam-hashtags",
      icon: Hash,
      isActive: isHashtags
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-1.5 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onNavigate(tab.path);
                if (tab.path === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                tab.isActive
                  ? "text-purple-950 font-black"
                  : "text-slate-400 hover:text-slate-600 font-medium"
              }`}
            >
              {tab.isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-purple-100/80 rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <div className={`p-0.5 transition-transform ${tab.isActive ? 'scale-110' : ''}`}>
                <Icon className={`w-4.5 h-4.5 ${tab.isActive ? 'text-purple-900' : 'text-slate-400'}`} />
              </div>
              <span className={`text-[9px] tracking-tight block ${tab.isActive ? 'font-black text-purple-950' : 'font-semibold text-slate-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Favorites Quick Action */}
        <button
          onClick={onOpenFavourites}
          className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl text-slate-400 hover:text-slate-600 font-medium transition-all cursor-pointer"
        >
          <div className="p-0.5 relative">
            <Heart className={`w-4.5 h-4.5 ${favouritesCount > 0 ? 'fill-pink-500 text-pink-500' : 'text-slate-400'}`} />
            {favouritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center ring-1 ring-white">
                {favouritesCount}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-tight block font-semibold text-slate-500">
            Saved
          </span>
        </button>
      </div>
    </nav>
  );
}
