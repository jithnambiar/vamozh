/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MobileBottomNav from "./components/MobileBottomNav";
import Hero from "./components/Hero";
import LearningSystem from "./components/LearningSystem";
import DictionarySection from "./components/DictionarySection";
import Categories from "./components/Categories";
import Generator from "./components/Generator";
import ResultList from "./components/ResultList";
import Trending from "./components/Trending";
import SeoContent from "./components/SeoContent";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import StoryModal from "./components/StoryModal";
import FavouritesDrawer from "./components/FavouritesDrawer";
import Toast from "./components/Toast";
import TranslitTool from "./components/TranslitTool";
import InfoPages from "./components/InfoPages";
import HashtagGenerator from "./components/HashtagGenerator";
import LiveChat from "./components/LiveChat";
import CertificateVerificationPage from "./components/CertificateVerificationPage";
import { AnimatePresence } from "motion/react";

interface ResultItem {
  id: string;
  text: string;
  hashtags: string[];
}

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
}

const ROUTE_META_MAP: Record<string, RouteMeta> = {
  "/": {
    title: "VAMOZHI – Malayalam Instagram Caption Generator & Social Writing Platform",
    description: "Generate original Malayalam and Manglish Instagram captions, bios, Reel hooks, and hashtags. 100% Free with exact-match scoring.",
    canonical: "https://vamozhi.com/"
  },
  "/malayalam-caption-generator": {
    title: "Malayalam Caption Generator – VAMOZHI Social Writing",
    description: "Create original, engaging Malayalam and Manglish captions for Instagram, Facebook, and WhatsApp. Free online generator.",
    canonical: "https://vamozhi.com/malayalam-caption-generator"
  },
  "/manglish-to-malayalam": {
    title: "Manglish to Malayalam Typing Tool – Phonetic Transliteration",
    description: "Type in Manglish and get perfect Malayalam script instantly. Safe, local phonetic transliteration with word suggestions.",
    canonical: "https://vamozhi.com/manglish-to-malayalam"
  },
  "/instagram-caption-generator": {
    title: "Malayalam Instagram Caption Generator – VAMOZHI",
    description: "Generate highly engaging, customized Instagram captions in Malayalam & Manglish. Free templates and hashtags.",
    canonical: "https://vamozhi.com/instagram-caption-generator"
  },
  "/facebook-caption-generator": {
    title: "Malayalam Facebook Post & Caption Generator – VAMOZHI",
    description: "Write original Malayalam posts and captions for Facebook. Choose category, mood, and tone easily.",
    canonical: "https://vamozhi.com/facebook-caption-generator"
  },
  "/whatsapp-status-generator": {
    title: "Malayalam WhatsApp Status Generator – VAMOZHI",
    description: "Get original, short Malayalam quotes and status texts for WhatsApp. Copy and share instantly on WhatsApp.",
    canonical: "https://vamozhi.com/whatsapp-status-generator"
  },
  "/snapchat-caption-generator": {
    title: "Malayalam Snapchat Caption Generator – VAMOZHI",
    description: "Quick, fun, and witty Malayalam captions for Snapchat. Sparkles, emojis, and local slang included.",
    canonical: "https://vamozhi.com/snapchat-caption-generator"
  },
  "/tiktok-caption-generator": {
    title: "Malayalam TikTok Video Caption Generator – VAMOZHI",
    description: "Write viral TikTok descriptions and hooks in Malayalam. Maximize engagement with local trends.",
    canonical: "https://vamozhi.com/tiktok-caption-generator"
  },
  "/malayalam-instagram-bio": {
    title: "Malayalam Instagram Bio Generator – VAMOZHI",
    description: "Create highly attractive, creative Instagram profile bios in Malayalam & Manglish. Free copying.",
    canonical: "https://vamozhi.com/malayalam-instagram-bio"
  },
  "/malayalam-reel-hooks": {
    title: "Malayalam Reel Hooks & Video Intro Generator – VAMOZHI",
    description: "Generate high-converting hook lines in Malayalam for Reels, YouTube Shorts, and TikToks.",
    canonical: "https://vamozhi.com/malayalam-reel-hooks"
  },
  "/malayalam-hashtags": {
    title: "Malayalam & Kerala Hashtag Generator – VAMOZHI",
    description: "Generate highly relevant Kerala, Malayalam, and regional hashtags for your social media posts.",
    canonical: "https://vamozhi.com/malayalam-hashtags"
  },
  "/bumble-bio-generator": {
    title: "Malayalam Bumble Profile Bio Generator – VAMOZHI",
    description: "Create engaging, charismatic, and safe Bumble dating bios in Malayalam & Manglish.",
    canonical: "https://vamozhi.com/bumble-bio-generator"
  },
  "/matrimony-bio-generator": {
    title: "Malayalam Matrimony Profile Bio Generator – VAMOZHI",
    description: "Generate highly respectful, detailed, family-appropriate matrimony descriptions in Malayalam.",
    canonical: "https://vamozhi.com/matrimony-bio-generator"
  },
  "/about": {
    title: "About VAMOZHI – Malayalam Social Writing Platform",
    description: "Discover our mission, original content curation, data privacy standards, and the team behind VAMOZHI.",
    canonical: "https://vamozhi.com/about"
  },
  "/contact": {
    title: "Contact & Feedback – VAMOZHI Creator Suite",
    description: "Send us feature ideas, caption requests, custom slang suggestions, or report technical bugs.",
    canonical: "https://vamozhi.com/contact"
  },
  "/privacy-policy": {
    title: "Privacy Policy – VAMOZHI writing Assistant",
    description: "Review how Vamozhi processes data. 100% private local keypress processing, no logging, safe AdSense integration.",
    canonical: "https://vamozhi.com/privacy-policy"
  },
  "/cookie-policy": {
    title: "Cookie Policy – VAMOZHI",
    description: "We use essential storage markers to save favorites and serve relevant Google AdSense slots.",
    canonical: "https://vamozhi.com/cookie-policy"
  },
  "/terms": {
    title: "Terms and Conditions – VAMOZHI",
    description: "Acceptable use guidelines for copying individual captions, content rights, and scraping restrictions.",
    canonical: "https://vamozhi.com/terms"
  },
  "/disclaimer": {
    title: "Disclaimer Notice – VAMOZHI",
    description: "Intellectual property statements. Independant tool, no official affiliation with Instagram, WhatsApp, or Bumble.",
    canonical: "https://vamozhi.com/disclaimer"
  },
  "/malayalam-numbers": {
    title: "Malayalam Numbers – Learn traditional numbers and play the quiz",
    description: "Master Malayalam numerals, words, pronunciations, and test your knowledge with interactive matching games.",
    canonical: "https://vamozhi.com/malayalam-numbers"
  },
  "/learn-malayalam": {
    title: "Learn Malayalam – Complete interactive Malayalam learning system",
    description: "Learn the Malayalam alphabet, vowels, consonants, everyday conversation phrases, proverbs, and test yourself.",
    canonical: "https://vamozhi.com/learn-malayalam"
  },
  "/malayalam-dictionary": {
    title: "Malayalam Dictionary – English to Malayalam & Malayalam to English Olam Database",
    description: "Search the comprehensive open-source Datuk, Ekkurup, and Enml Malayalam dictionary databases. Fast, reliable, with AI dynamic word enrichment.",
    canonical: "https://vamozhi.com/malayalam-dictionary"
  }
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [isFavOpen, setIsFavOpen] = useState<boolean>(false);
  const [selectedStoryCaption, setSelectedStoryCaption] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("love");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const meta = ROUTE_META_MAP[currentPath] || ROUTE_META_MAP["/"];
    document.title = meta.title;
    
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", meta.description);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = meta.description;
      document.head.appendChild(newMeta);
    }
    
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", meta.canonical);
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "canonical";
      newLink.href = meta.canonical;
      document.head.appendChild(newLink);
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPath]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vamozhi_favourites");
      if (stored) {
        setFavourites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favourites: ", error);
    }
  }, []);

  const saveFavourites = (newFavs: string[]) => {
    setFavourites(newFavs);
    try {
      localStorage.setItem("vamozhi_favourites", JSON.stringify(newFavs));
    } catch (error) {
      console.error("Failed to save favourites: ", error);
    }
  };

  const handleToggleFavourite = (caption: string) => {
    if (favourites.includes(caption)) {
      const filtered = favourites.filter(f => f !== caption);
      saveFavourites(filtered);
      triggerToast("Removed caption from Saved list", 'info');
    } else {
      const updated = [...favourites, caption];
      saveFavourites(updated);
      triggerToast("Caption added to Saved list! ❤️", 'success');
    }
  };

  const handleRemoveFavourite = (caption: string) => {
    const filtered = favourites.filter(f => f !== caption);
    saveFavourites(filtered);
    triggerToast("Removed caption from Saved list", 'info');
  };

  const handleClearAllFavourites = () => {
    saveFavourites([]);
    triggerToast("Cleared all saved captions", 'info');
  };

  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const handleNavigate = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
  };

  const isHomeOrGeneratorRoute = 
    currentPath === "/" ||
    currentPath === "/malayalam-caption-generator" ||
    currentPath === "/instagram-caption-generator" ||
    currentPath === "/facebook-caption-generator" ||
    currentPath === "/whatsapp-status-generator" ||
    currentPath === "/snapchat-caption-generator" ||
    currentPath === "/tiktok-caption-generator" ||
    currentPath === "/malayalam-instagram-bio" ||
    currentPath === "/malayalam-reel-hooks" ||
    currentPath === "/bumble-bio-generator" ||
    currentPath === "/matrimony-bio-generator";

  const isPhoneticTypingRoute = currentPath === "/manglish-to-malayalam";
  const isMalayalamNumbersRoute = currentPath === "/malayalam-numbers";
  const isLearnMalayalamRoute = currentPath === "/learn-malayalam";
  const isHashtagsRoute = currentPath === "/malayalam-hashtags";
  const isMalayalamDictionaryRoute = currentPath === "/malayalam-dictionary";

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-800" id="app-root-container">
      {/* Unified App Navigation Header */}
      <Navbar
        favouritesCount={favourites.length}
        onOpenFavourites={() => setIsFavOpen(true)}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main App Page View Outlet */}
      <div className="flex-1 pt-[68px] pb-24 md:pb-10" id="vamozhi-page-outlet">
        {isHomeOrGeneratorRoute && (
          <>
            <Hero onNavigate={handleNavigate} />

            <Categories
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                const genEl = document.getElementById("generator");
                if (genEl) genEl.scrollIntoView({ behavior: "smooth" });
              }}
            />

            <Generator
              onGenerate={(items) => {
                setResults(items);
                const el = document.getElementById("results-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              onSuccessMessage={(msg) => triggerToast(msg, 'success')}
              currentPath={currentPath}
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
            />

            {results.length > 0 && (
              <ResultList
                results={results}
                favourites={favourites}
                onToggleFavourite={handleToggleFavourite}
                onOpenStoryModal={(text) => setSelectedStoryCaption(text)}
                onSuccessMessage={(msg) => triggerToast(msg, 'success')}
              />
            )}

            <Trending
              favourites={favourites}
              onToggleFavourite={handleToggleFavourite}
              onSuccessMessage={(msg) => triggerToast(msg, 'success')}
            />

            <SeoContent currentPath={currentPath} />
            <FaqSection />
          </>
        )}

        {isPhoneticTypingRoute && (
          <TranslitTool
            onSuccessMessage={(msg) => triggerToast(msg, 'success')}
          />
        )}

        {isHashtagsRoute && (
          <HashtagGenerator
            onSuccessMessage={(msg) => triggerToast(msg, 'success')}
            onToggleFavourite={handleToggleFavourite}
            favourites={favourites}
          />
        )}

        {(isLearnMalayalamRoute || isMalayalamNumbersRoute || currentPath.includes("/learn-malayalam")) && (
          <LearningSystem
            defaultTab={
              isMalayalamNumbersRoute 
                ? "numbers" 
                : currentPath.includes("tab=study") 
                ? "study" 
                : currentPath.includes("tab=exam") 
                ? "exam" 
                : "letters"
            }
          />
        )}

        {currentPath.startsWith("/verify-certificate") && (
          <CertificateVerificationPage />
        )}

        {isMalayalamDictionaryRoute && (
          <DictionarySection onSuccessMessage={(msg, type) => triggerToast(msg, type || 'success')} />
        )}

        {!isHomeOrGeneratorRoute && !isPhoneticTypingRoute && !isMalayalamNumbersRoute && !isLearnMalayalamRoute && !currentPath.includes("/learn-malayalam") && !isHashtagsRoute && !isMalayalamDictionaryRoute && !currentPath.startsWith("/verify-certificate") && (
          <InfoPages currentPath={currentPath} onSuccessMessage={(msg) => triggerToast(msg, 'success')} />
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile App Interface Navigation Bottom Bar */}
      <MobileBottomNav
        currentPath={currentPath}
        onNavigate={handleNavigate}
        favouritesCount={favourites.length}
        onOpenFavourites={() => setIsFavOpen(true)}
      />

      {/* Interactive Story Canvas Overlay */}
      {selectedStoryCaption && (
        <StoryModal
          text={selectedStoryCaption}
          onClose={() => setSelectedStoryCaption(null)}
          onSuccess={(msg) => triggerToast(msg, 'success')}
        />
      )}

      {/* Saved Drawer */}
      <FavouritesDrawer
        isOpen={isFavOpen}
        onClose={() => setIsFavOpen(false)}
        favourites={favourites}
        onRemoveFavourite={handleRemoveFavourite}
        onClearAll={handleClearAllFavourites}
        onSuccessMessage={(msg) => triggerToast(msg, 'success')}
      />

      {/* Live AI Assistant */}
      <LiveChat />

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
