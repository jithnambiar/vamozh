/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import ResultGrid, { GridItem } from "./shared/ResultGrid";
import GenerateMoreButton from "./shared/GenerateMoreButton";

interface ResultItem {
  id: string;
  text: string;
  hashtags: string[];
  categoryBadge?: string;
}

interface ResultListProps {
  results: ResultItem[];
  favourites: string[];
  onToggleFavourite: (caption: string) => void;
  onOpenStoryModal?: (caption: string) => void;
  onSuccessMessage: (msg: string) => void;
  onGenerateMore?: () => void;
}

export default function ResultList({
  results,
  favourites,
  onToggleFavourite,
  onOpenStoryModal,
  onSuccessMessage,
  onGenerateMore
}: ResultListProps) {
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const visibleResults = results.slice(0, visibleCount);

  const gridItems: GridItem[] = visibleResults.map((r, idx) => ({
    id: r.id || `res_${idx}`,
    text: r.text,
    categoryBadge: r.categoryBadge || `#${idx + 1} TOP CAPTION`,
    hashtags: r.hashtags
  }));

  const handleLoadMore = () => {
    if (visibleCount < results.length) {
      setVisibleCount(prev => prev + 6);
    } else if (onGenerateMore) {
      onGenerateMore();
      setVisibleCount(prev => prev + 6);
    }
    onSuccessMessage("6 പുതിയ ക്യാപ്ഷനുകൾ കൂടി ചേർത്തു! ✨");
  };

  const handleReset = () => {
    setVisibleCount(6);
    onSuccessMessage("6 ക്യാപ്ഷനുകളിലേക്ക് തിരിച്ചു വന്നു.");
  };

  return (
    <section className="py-10 max-w-5xl mx-auto px-4 text-left" id="results-section">
      <div className="space-y-6">
        {/* Results Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-neutral-800 pb-4">
          <div>
            <span className="text-[11px] font-black text-purple-700 dark:text-purple-400 uppercase tracking-widest block mb-0.5">
              Generated Results
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#545454] dark:text-slate-100 tracking-tight">
              തിരഞ്ഞെടുത്ത ക്യാപ്ഷനുകൾ (Generated Captions)
            </h3>
          </div>
          <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-neutral-800 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-neutral-700">
            {visibleResults.length} of {Math.max(results.length, visibleCount)}
          </span>
        </div>

        {/* 2-Column Desktop / 1-Column Mobile Result Grid */}
        <ResultGrid
          type="caption"
          items={gridItems}
          favourites={favourites}
          onSuccessMessage={onSuccessMessage}
          onToggleFavourite={onToggleFavourite}
          onOpenStoryModal={onOpenStoryModal}
        />

        {/* Generate More Button */}
        <GenerateMoreButton
          onGenerateMore={handleLoadMore}
          onReset={handleReset}
          canReset={visibleCount > 6}
        />
      </div>
    </section>
  );
}
