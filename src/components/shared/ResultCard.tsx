/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Copy, Check, Share2, Heart, Image as ImageIcon } from "lucide-react";

export interface ResultCardProps {
  key?: string | number;
  type: "caption" | "quote";
  id: string | number;
  text: string;
  englishText?: string;
  author?: string;
  categoryBadge?: string;
  hashtags?: string[];
  isFavourite?: boolean;
  onSuccessMessage?: (msg: string) => void;
  onToggleFavourite?: (fullText: string) => void;
  onOpenStoryModal?: (text: string) => void;
}

export default function ResultCard({
  type,
  text,
  englishText,
  author,
  categoryBadge,
  hashtags = [],
  isFavourite = false,
  onSuccessMessage,
  onToggleFavourite,
  onOpenStoryModal
}: ResultCardProps) {
  const [copied, setCopied] = useState<boolean>(false);

  // Copy handler
  const handleCopy = () => {
    const fullTextToCopy = type === "quote" 
      ? `"${text}" — ${author || "അജ്ഞാതൻ"}`
      : hashtags.length > 0 ? `${text}\n\n${hashtags.join(" ")}` : text;

    navigator.clipboard.writeText(fullTextToCopy);
    setCopied(true);
    if (onSuccessMessage) {
      onSuccessMessage(type === "quote" ? "Quote copy ചെയ്തു! 📋" : "Caption copy ചെയ്തു! 📋");
    }
    setTimeout(() => setCopied(false), 2000);
  };

  // Web Share API handler
  const handleShare = async () => {
    const shareTitle = type === "quote" ? "Vamozhi Malayalam Quote" : "Vamozhi Malayalam Caption";
    const shareText = type === "quote" 
      ? `"${text}" — ${author || "അജ്ഞാതൻ"}\n\n✨ https://vamozhi.com`
      : `${text}\n\n✨ https://vamozhi.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: "https://vamozhi.com"
        });
        if (onSuccessMessage) onSuccessMessage("പങ്കിട്ടു! 🚀");
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleFavClick = () => {
    const fullTextToSave = type === "quote" 
      ? `"${text}" — ${author || "അജ്ഞാതൻ"}`
      : text;
    if (onToggleFavourite) {
      onToggleFavourite(fullTextToSave);
    }
  };

  const handleOpenCanvasModal = () => {
    const textToCanvas = type === "quote" ? `"${text}"\n— ${author || "അജ്ഞാതൻ"}` : text;
    if (onOpenStoryModal) {
      onOpenStoryModal(textToCanvas);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-800 transition-all flex flex-col justify-between h-full text-left group">
      
      {/* Top Header Row: Category Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {categoryBadge ? (
          <span className="px-2.5 py-0.5 bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 rounded-xl text-[11px] font-extrabold uppercase tracking-wider border border-purple-200/60 dark:border-purple-900">
            {categoryBadge}
          </span>
        ) : <div />}

        {/* Saved/Favourite Button */}
        <button
          onClick={handleFavClick}
          className={`p-1.5 rounded-xl transition-all cursor-pointer ${
            isFavourite 
              ? "text-rose-500 bg-rose-50 dark:bg-rose-950/50" 
              : "text-slate-400 hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-neutral-800"
          }`}
          title={isFavourite ? "Saved in favourites" : "Save to favourites"}
          aria-label="Save to favourites"
        >
          <Heart className={`w-4 h-4 ${isFavourite ? "fill-rose-500" : ""}`} />
        </button>
      </div>

      {/* Main Text Content */}
      <div className="space-y-2 mb-4 flex-1">
        <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-neutral-100 leading-relaxed">
          {type === "quote" ? `"${text}"` : text}
        </p>

        {/* Optional Small English Quote Display for Quotes */}
        {type === "quote" && englishText && (
          <p className="text-xs font-serif italic text-slate-500 dark:text-neutral-400 pt-0.5 leading-snug">
            "{englishText}"
          </p>
        )}

        {/* Author Name for Quotes */}
        {type === "quote" && (
          <p className="text-xs font-black text-amber-700 dark:text-amber-400">
            — {author || "അജ്ഞാതൻ"}
          </p>
        )}

        {/* Hashtags for Captions */}
        {type === "caption" && hashtags.length > 0 && (
          <p className="text-[11px] font-medium text-purple-600 dark:text-purple-400">
            {hashtags.join(" ")}
          </p>
        )}
      </div>

      {/* Card Footer Action Bar */}
      <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between gap-2">
        {/* Subtle Watermark for Quotes */}
        {type === "quote" ? (
          <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-medium">
            Malayalam translation © Vamozhi.com
          </span>
        ) : (
          <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-medium">
            © Vamozhi.com
          </span>
        )}

        {/* Action Buttons: Canvas Story, Copy & Share */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenStoryModal && (
            <button
              onClick={handleOpenCanvasModal}
              className="px-2.5 py-1.5 bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-950 hover:to-indigo-950 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
              title="Download Instagram Story Canvas Image"
              aria-label="Download Instagram Story Canvas Image"
            >
              <ImageIcon className="w-3.5 h-3.5 text-pink-300" />
              <span>Download 🖼️</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              copied 
                ? "bg-emerald-600 text-white" 
                : "bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-200 hover:bg-purple-100 hover:text-purple-950 dark:hover:bg-neutral-700"
            }`}
            aria-label="Copy to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 bg-slate-100 dark:bg-neutral-800 hover:bg-purple-100 hover:text-purple-950 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-200 rounded-xl transition-all cursor-pointer"
            title="Share"
            aria-label="Share quote or caption"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
