/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ResultCard, { ResultCardProps } from "./ResultCard";

export interface GridItem {
  id: string | number;
  text: string;
  englishText?: string;
  author?: string;
  categoryBadge?: string;
  hashtags?: string[];
}

interface ResultGridProps {
  type: "caption" | "quote";
  items: GridItem[];
  favourites?: string[];
  onSuccessMessage?: (msg: string) => void;
  onToggleFavourite?: (fullText: string) => void;
  onOpenStoryModal?: (text: string) => void;
}

export default function ResultGrid({
  type,
  items,
  favourites = [],
  onSuccessMessage,
  onToggleFavourite,
  onOpenStoryModal
}: ResultGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-8 text-center text-slate-500">
        <p className="text-sm font-medium">
          തിരഞ്ഞെടുത്ത ഫിൽട്ടറിന് അനുയോജ്യമായവ ഒന്നും കണ്ടെത്തിയില്ല. ദയവായി മറ്റൊന്ന് തിരഞ്ഞെടുത്തു നോക്കൂ!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="results-grid-container">
      {items.map((item) => {
        const fullTextToCheck = type === "quote" 
          ? `"${item.text}" — ${item.author || "അജ്ഞാതൻ"}`
          : item.text;
        const isFav = favourites.includes(fullTextToCheck);

        return (
          <ResultCard
            key={item.id}
            type={type}
            id={item.id}
            text={item.text}
            englishText={item.englishText}
            author={item.author}
            categoryBadge={item.categoryBadge}
            hashtags={item.hashtags}
            isFavourite={isFav}
            onSuccessMessage={onSuccessMessage}
            onToggleFavourite={onToggleFavourite}
            onOpenStoryModal={onOpenStoryModal}
          />
        );
      })}
    </div>
  );
}
