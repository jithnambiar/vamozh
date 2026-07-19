/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Copy, Share2, Heart, Download, RefreshCw, Layers } from "lucide-react";
import { OPENING_PHRASES, EMOTIONAL_BRIDGES, ENDING_LINES } from "../data/captions";

interface ResultItem {
  id: string;
  text: string;
  hashtags: string[];
}

interface ResultListProps {
  results: ResultItem[];
  favourites: string[];
  onToggleFavourite: (caption: string) => void;
  onOpenStoryModal: (caption: string) => void;
  onSuccessMessage: (msg: string) => void;
}

export default function ResultList({
  results,
  favourites,
  onToggleFavourite,
  onOpenStoryModal,
  onSuccessMessage
}: ResultListProps) {
  // Store customized variations per card if regenerated
  const [localVariations, setLocalVariations] = useState<Record<string, string>>({});

  const handleCopy = (text: string, includeHashtags: boolean, hashtags: string[]) => {
    const fullText = includeHashtags ? `${text}\n\n${hashtags.join(" ")}` : text;
    navigator.clipboard.writeText(fullText);
    onSuccessMessage(
      includeHashtags ? "Copied caption with hashtags to clipboard! ✅" : "Copied caption to clipboard! ✅"
    );
  };

  const handleWhatsappShare = (text: string, hashtags: string[]) => {
    const shareText = `${text}\n\n${hashtags.join(" ")}`;
    const encodedText = encodeURIComponent(shareText);
    const waUrl = `https://wa.me/?text=${encodedText}`;
    window.open(waUrl, "_blank");
    onSuccessMessage("Opening WhatsApp to share caption...");
  };

  // Re-rolls variation for a specific card by tweaking the text dynamically
  const handleRegenerateVariation = (cardId: string, currentText: string) => {
    // We can randomize or inject a nice opening or closing phrase for Malayalam/Manglish
    const isMalayalam = /[\u0D00-\u0D7F]/.test(currentText);
    let newText = currentText;

    const phrases = isMalayalam 
      ? ["ചില നിമിഷങ്ങൾ അങ്ങനെയാണ്... ", "ഹൃദയം തൊട്ടത്... ", "വളരെ പ്രിയപ്പെട്ടൊരു ഓർമ്മ! ✨ "]
      : ["Chila nimishangal anganeya... ", "Vakkukalkku appurammulla vibe! ⚡ ", "A beautiful local vibe! ✨ "];
    
    const endings = isMalayalam
      ? [" ✨ ഇതാണ് സത്യം!", " ❤️ ഇതിനോട് യോജിക്കുന്നുണ്ടോ?", " 👍 നിങ്ങൾക്കായി സമർപ്പിക്കുന്നു."]
      : [" ✨ True story!", " ❤️ Can you feel this?", " 👍 Highly recommended vibe."];

    const randomPrefix = phrases[Math.floor(Math.random() * phrases.length)];
    const randomSuffix = endings[Math.floor(Math.random() * endings.length)];

    // Clean existing custom additions if any and prepend/append
    const cleanText = currentText
      .replace(/ചില നിമിഷങ്ങൾ അങ്ങനെയാണ്... /g, "")
      .replace(/ഹൃദയം തൊട്ടത്... /g, "")
      .replace(/വളരെ പ്രിയപ്പെട്ടൊരു ഓർമ്മ! ✨ /g, "")
      .replace(/Chila nimishangal anganeya... /g, "")
      .replace(/Vakkukalkku appurammulla vibe! ⚡ /g, "")
      .replace(/A beautiful local vibe! ✨ /g, "")
      .replace(/ ✨ ഇതാണ് സത്യം!/g, "")
      .replace(/ ❤️ ഇതിനോട് യോജിക്കുന്നുണ്ടോ\?/g, "")
      .replace(/ 👍 നിങ്ങൾക്കായി സമർപ്പിക്കുന്നു\./g, "")
      .replace(/ ✨ True story!/g, "")
      .replace(/ ❤️ Can you feel this\?/g, "")
      .replace(/ 👍 Highly recommended vibe\./g, "");

    newText = `${randomPrefix}${cleanText}${randomSuffix}`;

    setLocalVariations((prev) => ({
      ...prev,
      [cardId]: newText
    }));

    onSuccessMessage("Generated a fresh variation for this caption!");
  };

  if (results.length === 0) return null;

  return (
    <section className="py-12 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm border-y border-neutral-200/50" id="results-section">
      <div className="max-w-4xl mx-auto px-4">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-left">
            <span className="text-xs font-black text-purple-600 uppercase tracking-widest block">
              Caption Studio Outputs
            </span>
            <h3 className="text-2xl font-black text-neutral-900 tracking-tight mt-0.5" id="results-title">
              Generated Results ({results.length})
            </h3>
          </div>
          <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full">
            Click cards to copy or customize
          </span>
        </div>

        {/* Results Grid List */}
        <div className="flex flex-col gap-6" id="results-cards-grid">
          {results.map((item) => {
            const displayQuote = localVariations[item.id] || item.text;
            const characterCount = displayQuote.length;
            const isSaved = favourites.includes(displayQuote);

            return (
              <div
                key={item.id}
                className="group bg-white dark:bg-neutral-950 rounded-[32px] p-8 border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                id={`card-${item.id}`}
              >
                {/* Decorative glow ring on hover */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Card Content block */}
                <div className="text-left mb-6">
                  {/* Quote bubble container */}
                  <div className="relative">
                    <p className="text-lg font-medium text-slate-800 dark:text-neutral-150 leading-relaxed font-sans tracking-wide">
                      {displayQuote}
                    </p>
                  </div>

                  {/* Hashtags block */}
                  {item.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4" id={`hashtags-${item.id}`}>
                      {item.hashtags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-semibold text-slate-500 hover:text-purple-600 cursor-pointer hover:underline transition-all"
                          onClick={() => handleCopy(tag, false, [])}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Character metrics bar */}
                  <div className="flex items-center gap-3 mt-5 text-[10px] font-bold text-slate-400 font-mono tracking-wider">
                    <span>LENGTH: {characterCount} CHARACTERS</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <span>WORDS: {displayQuote.split(/\s+/).filter(Boolean).length}</span>
                  </div>
                </div>

                {/* Card Actions toolbar */}
                <div className="flex flex-wrap gap-2 items-center justify-between border-t border-slate-100 dark:border-neutral-900 pt-4" id={`actions-${item.id}`}>
                  
                  {/* Primary actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCopy(displayQuote, false, [])}
                      className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
                      title="Copy raw caption"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy Text
                    </button>

                    <button
                      onClick={() => handleCopy(displayQuote, true, item.hashtags)}
                      className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
                      title="Copy with hashtags"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Copy + Tags
                    </button>

                    <button
                      onClick={() => handleWhatsappShare(displayQuote, item.hashtags)}
                      className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      WhatsApp
                    </button>
                  </div>

                  {/* Secondary/Visual utilities */}
                  <div className="flex items-center gap-2">
                    {/* Regenerate variation */}
                    <button
                      onClick={() => handleRegenerateVariation(item.id, displayQuote)}
                      className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-slate-500 hover:text-purple-600 transition-colors cursor-pointer"
                      title="Regenerate single variation"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>

                    {/* Story designer */}
                    <button
                      onClick={() => onOpenStoryModal(displayQuote)}
                      className="px-3 py-2 bg-slate-900 hover:bg-purple-700 text-white text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5"
                      title="Customize and download Story Image"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Story
                    </button>

                    {/* Love favouriting */}
                    <button
                      onClick={() => onToggleFavourite(displayQuote)}
                      className={`p-2 rounded-full border transition-colors cursor-pointer ${
                        isSaved
                          ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                          : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                      }`}
                      title={isSaved ? "Remove from Favourites" : "Save to Favourites"}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? "fill-red-500" : ""}`} />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
