/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Copy, 
  Share2, 
  Heart, 
  Download, 
  RefreshCw, 
  Layers, 
  Globe,
  Sparkles,
  Crown,
  Flame,
  Zap,
  Star,
  CheckCircle2,
  Check
} from "lucide-react";

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
  onPostCaption?: () => void;
}

const RANK_BADGES = [
  { label: "#1 TOP PICK 👑", color: "from-amber-500 via-orange-500 to-yellow-500 text-amber-950 border-amber-300" },
  { label: "#2 VIRAL VIBE 🔥", color: "from-pink-600 via-rose-500 to-purple-600 text-white border-pink-300" },
  { label: "#3 EMOTIONAL ❤️", color: "from-purple-600 via-indigo-600 to-blue-600 text-white border-purple-300" },
  { label: "#4 ATTITUDE ⚡", color: "from-emerald-600 via-teal-600 to-indigo-700 text-white border-emerald-300" },
  { label: "#5 CLASSIC STYLE 🌟", color: "from-indigo-900 via-purple-900 to-pink-900 text-amber-300 border-purple-400" }
];

export default function ResultList({
  results,
  favourites,
  onToggleFavourite,
  onOpenStoryModal,
  onSuccessMessage,
  onPostCaption
}: ResultListProps) {
  const [localVariations, setLocalVariations] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Top 5 captions limit
  const topResults = results.slice(0, 5);

  const handlePostToFeed = async (text: string, hashtags: string[]) => {
    try {
      const res = await fetch("/api/community-captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          author: "Vamozhi AI Artist 🪄",
          hashtags
        })
      });

      if (res.ok) {
        onSuccessMessage("Successfully published to Vamozhi Community Board! Scroll down to see it 🌐");
        if (onPostCaption) {
          onPostCaption();
        }
      } else {
        onSuccessMessage("Failed to publish caption to feed.");
      }
    } catch (e) {
      console.error(e);
      onSuccessMessage("Could not connect to community database.");
    }
  };

  const handleCopy = (text: string, includeHashtags: boolean, hashtags: string[], cardId?: string) => {
    const fullText = includeHashtags ? `${text}\n\n${hashtags.join(" ")}` : text;
    navigator.clipboard.writeText(fullText);
    if (cardId) {
      setCopiedId(cardId);
      setTimeout(() => setCopiedId(null), 2000);
    }
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

  const handleRegenerateVariation = (cardId: string, currentText: string) => {
    const isMalayalam = /[\u0D00-\u0D7F]/.test(currentText);
    const phrases = isMalayalam 
      ? ["ചില നിമിഷങ്ങൾ അങ്ങനെയാണ്... ", "ഹൃദയം തൊട്ടത്... ", "വളരെ പ്രിയപ്പെട്ടൊരു ഓർമ്മ! ✨ "]
      : ["Chila nimishangal anganeya... ", "Vakkukalkku appurammulla vibe! ⚡ ", "A beautiful local vibe! ✨ "];
    
    const endings = isMalayalam
      ? [" ✨ ഇതാണ് സത്യം!", " ❤️ ഇതിനോട് യോജിക്കുന്നുണ്ടോ?", " 👍 നിങ്ങൾക്കായി സമർപ്പിക്കുന്നു."]
      : [" ✨ True story!", " ❤️ Can you feel this?", " 👍 Highly recommended vibe."];

    const randomPrefix = phrases[Math.floor(Math.random() * phrases.length)];
    const randomSuffix = endings[Math.floor(Math.random() * endings.length)];

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

    const newText = `${randomPrefix}${cleanText}${randomSuffix}`;

    setLocalVariations((prev) => ({
      ...prev,
      [cardId]: newText
    }));

    onSuccessMessage("Fresh caption variation generated! 🔄");
  };

  // Canvas Instagram Story (1080x1920) Image Download Generator
  const handleDownloadCaptionCardImage = (text: string, hashtags: string[], id: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background Gradient (Story Deep Rich Tone)
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
    gradient.addColorStop(0, "#090d16");
    gradient.addColorStop(0.3, "#2e1065");
    gradient.addColorStop(0.7, "#581c87");
    gradient.addColorStop(1, "#831843");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Decorative Story Outer Frame
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 16;
    ctx.strokeRect(50, 50, 980, 1820);

    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 4;
    ctx.strokeRect(75, 75, 930, 1770);

    // Top Story Header Badge
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#fef08a";
    ctx.textAlign = "center";
    ctx.fillText("✨ INSTAGRAM STORY STUDIO", 540, 260);

    // Watermark Brand Title (VAMOZHI with MALAYALAM directly under it)
    ctx.font = "900 56px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("VAMOZHI", 540, 330);

    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = "#fde68a";
    ctx.fillText("MALAYALAM", 540, 365);

    // Golden Divider Line
    ctx.strokeStyle = "rgba(251, 191, 36, 0.8)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(400, 405);
    ctx.lineTo(680, 405);
    ctx.stroke();

    // Center Quote Card Frame Box (Instagram Story Focus Area)
    ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
    ctx.beginPath();
    ctx.roundRect(120, 580, 840, 780, 48);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Opening Quote Symbol
    ctx.font = "900 90px Georgia, serif";
    ctx.fillStyle = "#f59e0b";
    ctx.fillText("“", 540, 700);

    // Main Text Wrapping
    ctx.font = "bold 48px sans-serif";
    ctx.fillStyle = "#ffffff";

    const words = text.split(" ");
    let line = "";
    let y = 800;
    const maxWidth = 740;
    const lineHeight = 72;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), 540, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), 540, y);

    // Hashtags
    if (hashtags && hashtags.length > 0) {
      ctx.font = "bold 32px monospace";
      ctx.fillStyle = "#fef08a";
      ctx.fillText(hashtags.join(" "), 540, y + 110);
    }

    // Story Bottom Call-To-Action & Watermark
    ctx.font = "bold 30px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fillText("Created with Vamozhi.com 🌐", 540, 1680);

    ctx.font = "600 24px sans-serif";
    ctx.fillStyle = "rgba(253, 230, 138, 0.75)";
    ctx.fillText("Swipe Up • Share to Instagram Story", 540, 1740);

    // Download Trigger
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `vamozhi-story-${id}.png`;
    link.href = image;
    link.click();
    onSuccessMessage("Downloaded 9:16 Instagram Story image! 🖼️");
  };

  if (topResults.length === 0) return null;

  return (
    <section className="py-14 bg-gradient-to-b from-purple-50/50 via-white to-purple-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 border-y border-purple-100/60 dark:border-neutral-800" id="results-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Results Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
          <div className="text-left space-y-1.5">
            <span className="px-3.5 py-1 bg-amber-400/20 text-amber-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-400/30 inline-block">
              Caption Studio Outputs • AI Recommended ✨
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight" id="results-title">
              Top 5 Generated Captions
            </h3>
            <p className="text-xs text-purple-200">
              Hand-picked viral captions in Malayalam & Manglish tailored for your topic.
            </p>
          </div>

          <button
            onClick={() => {
              const allText = topResults.map((item, idx) => `${idx + 1}. ${item.text}\n${item.hashtags.join(" ")}`).join("\n\n");
              navigator.clipboard.writeText(allText);
              onSuccessMessage("Copied all top 5 captions to clipboard! 📋");
            }}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer shadow-md flex items-center gap-2 shrink-0"
          >
            <Copy className="w-4 h-4" />
            Copy All Top 5
          </button>
        </div>

        {/* Results Cards List */}
        <div className="flex flex-col gap-6" id="results-cards-grid">
          {topResults.map((item, index) => {
            const displayQuote = localVariations[item.id] || item.text;
            const characterCount = displayQuote.length;
            const isSaved = favourites.includes(displayQuote);
            const badge = RANK_BADGES[index] || RANK_BADGES[0];

            return (
              <div
                key={item.id}
                className="group bg-white dark:bg-neutral-950 rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 hover:border-purple-600 dark:hover:border-purple-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-left"
                id={`card-${item.id}`}
              >
                {/* Decorative side accent glow */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 via-pink-500 to-purple-600 opacity-90" />

                {/* Card Top: Rank Badge & Character Counter */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border bg-gradient-to-r shadow-xs ${badge.color}`}>
                    {badge.label}
                  </span>

                  <div className="flex items-center gap-3 text-[10px] font-mono font-black text-slate-400 dark:text-slate-500">
                    <span>{characterCount} CHARS</span>
                    <span>•</span>
                    <span>{displayQuote.split(/\s+/).filter(Boolean).length} WORDS</span>
                  </div>
                </div>

                {/* Card Content: Caption Text */}
                <div className="space-y-4 mb-6">
                  <p className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white leading-relaxed font-sans tracking-wide">
                    "{displayQuote}"
                  </p>

                  {/* Hashtags */}
                  {item.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2" id={`hashtags-${item.id}`}>
                      {item.hashtags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-xl border border-purple-100 dark:border-purple-900/60 hover:bg-purple-100 dark:hover:bg-purple-900 transition-all cursor-pointer"
                          onClick={() => handleCopy(tag, false, [])}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions toolbar */}
                <div className="flex flex-wrap gap-2 items-center justify-between border-t border-slate-100 dark:border-neutral-900 pt-4" id={`actions-${item.id}`}>
                  
                  {/* Left Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCopy(displayQuote, false, [], item.id)}
                      className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                        copiedId === item.id
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-purple-950 hover:bg-purple-900 text-white border-purple-950 shadow-sm"
                      }`}
                      title="Copy raw caption text"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === item.id ? "Copied!" : "Copy Caption"}
                    </button>

                    <button
                      onClick={() => handleCopy(displayQuote, true, item.hashtags)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-extrabold rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                      title="Copy caption with hashtags"
                    >
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      Copy + Hashtags
                    </button>

                    <button
                      onClick={() => handleWhatsappShare(displayQuote, item.hashtags)}
                      className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-xl border border-emerald-200 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                      WhatsApp
                    </button>
                  </div>

                  {/* Right Action Utilities */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRegenerateVariation(item.id, displayQuote)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-600 hover:text-purple-900 transition-colors cursor-pointer"
                      title="Regenerate fresh variation"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenStoryModal(displayQuote)}
                      className="px-3 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-xs font-black rounded-xl uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                      title="Customize Story Image"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Story Design
                    </button>

                    <button
                      onClick={() => onToggleFavourite(displayQuote)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        isSaved
                          ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                          : "bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200 hover:text-red-500"
                      }`}
                      title={isSaved ? "Remove from Favourites" : "Save to Favourites"}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
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
