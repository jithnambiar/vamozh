/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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
import { AnimatePresence } from "motion/react";

interface ResultItem {
  id: string;
  text: string;
  hashtags: string[];
}

export default function App() {
  // Main states
  const [results, setResults] = useState<ResultItem[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [isFavOpen, setIsFavOpen] = useState<boolean>(false);
  const [selectedStoryCaption, setSelectedStoryCaption] = useState<string | null>(null);

  // Toast notifications state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Selected Category (for cross-component activation from Categories bento grid)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Load favourites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("captionmallu_favourites");
      if (stored) {
        setFavourites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favourites from storage: ", error);
    }
  }, []);

  // Save favourites to localStorage when modified
  const saveFavourites = (newFavs: string[]) => {
    setFavourites(newFavs);
    try {
      localStorage.setItem("captionmallu_favourites", JSON.stringify(newFavs));
    } catch (error) {
      console.error("Failed to save favourites to storage: ", error);
    }
  };

  const handleToggleFavourite = (caption: string) => {
    if (favourites.includes(caption)) {
      const filtered = favourites.filter(f => f !== caption);
      saveFavourites(filtered);
      triggerToast("Removed caption from Favourites", 'info');
    } else {
      const updated = [...favourites, caption];
      saveFavourites(updated);
      triggerToast("Saved caption to Favourites! ❤️", 'success');
    }
  };

  const handleRemoveFavourite = (caption: string) => {
    const filtered = favourites.filter(f => f !== caption);
    saveFavourites(filtered);
    triggerToast("Removed caption from Favourites", 'info');
  };

  const handleClearAllFavourites = () => {
    saveFavourites([]);
    triggerToast("Cleared all saved captions", 'info');
  };

  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
  };

  // Callback when a Category is chosen from the Bento grid
  const handleSelectCategory = (catId: string) => {
    // Scroll smoothly to generator
    const element = document.getElementById("generator");
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

    // Programmatically select category in the select element inside the Generator
    const selectElem = document.getElementById("input-category-select") as HTMLSelectElement;
    if (selectElem) {
      selectElem.value = catId;
      // Trigger native change handler so React updates
      const event = new Event('change', { bubbles: true });
      selectElem.dispatchEvent(event);
    }

    triggerToast(`Active category set to: ${catId.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-neutral-800" id="app-root-container">
      {/* Header Sticky Navbar */}
      <Navbar
        favouritesCount={favourites.length}
        onOpenFavourites={() => setIsFavOpen(true)}
      />

      {/* Hero presentation screen */}
      <Hero />

      {/* Categories Bento Selection */}
      <Categories onSelectCategory={handleSelectCategory} />

      {/* Main Generator Workspace */}
      <Generator
        onGenerate={(generated) => setResults(generated)}
        onSuccessMessage={(msg) => triggerToast(msg, 'success')}
      />

      {/* Results output cards panel */}
      <ResultList
        results={results}
        favourites={favourites}
        onToggleFavourite={handleToggleFavourite}
        onOpenStoryModal={(caption) => setSelectedStoryCaption(caption)}
        onSuccessMessage={(msg) => triggerToast(msg, 'success')}
      />

      {/* Trending categories listings list */}
      <Trending
        onToggleFavourite={handleToggleFavourite}
        favourites={favourites}
        onSuccessMessage={(msg) => triggerToast(msg, 'success')}
      />

      {/* SEO rich, crawlable informative content guide */}
      <SeoContent />

      {/* FAQ Accordion block */}
      <FaqSection />

      {/* Footer details, copyright andMeta trademark notices */}
      <Footer />

      {/* CONDITIONAL: Canvas Instagram Story customizer Modal */}
      {selectedStoryCaption && (
        <StoryModal
          text={selectedStoryCaption}
          onClose={() => setSelectedStoryCaption(null)}
          onSuccess={(msg) => triggerToast(msg, 'success')}
        />
      )}

      {/* CONDITIONAL: Sliding Favourites drawer */}
      <FavouritesDrawer
        isOpen={isFavOpen}
        onClose={() => setIsFavOpen(false)}
        favourites={favourites}
        onRemoveFavourite={handleRemoveFavourite}
        onClearAll={handleClearAllFavourites}
        onSuccessMessage={(msg) => triggerToast(msg, 'success')}
      />

      {/* Floating interactive toast banner alerts */}
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
