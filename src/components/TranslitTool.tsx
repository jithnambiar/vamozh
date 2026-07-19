/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  transliterateSentence, 
  getSuggestions 
} from "../lib/translit";
import { 
  Copy, 
  Trash2, 
  Undo2, 
  Redo2, 
  Download, 
  Share2, 
  Sparkles, 
  Smartphone, 
  ShieldCheck,
  Check
} from "lucide-react";

interface TranslitToolProps {
  onSuccessMessage: (msg: string) => void;
}

export default function TranslitTool({ onSuccessMessage }: TranslitToolProps) {
  const [manglish, setManglish] = useState("");
  const [malayalam, setMalayalam] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeWord, setActiveWord] = useState("");
  
  // History states for Undo/Redo
  const [history, setHistory] = useState<{ manglish: string; malayalam: string }[]>([{ manglish: "", malayalam: "" }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isTransitioningHistory = useRef(false);

  // Track cursor position for suggestions
  const manglishInputRef = useRef<HTMLTextAreaElement>(null);

  // Process text change
  const handleTextChange = (text: string) => {
    setManglish(text);
    const converted = transliterateSentence(text);
    setMalayalam(converted);

    // Push to history
    if (!isTransitioningHistory.current) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ manglish: text, malayalam: converted });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }

    // Get suggestions for the word currently being typed
    const words = text.split(/\s+/);
    const currentWord = words[words.length - 1] || "";
    setActiveWord(currentWord);
    if (currentWord.length > 1) {
      setSuggestions(getSuggestions(currentWord));
    } else {
      setSuggestions([]);
    }
  };

  // Undo/Redo logic
  const handleUndo = () => {
    if (historyIndex > 0) {
      isTransitioningHistory.current = true;
      const prev = history[historyIndex - 1];
      setManglish(prev.manglish);
      setMalayalam(prev.malayalam);
      setHistoryIndex(historyIndex - 1);
      setTimeout(() => { isTransitioningHistory.current = false; }, 50);
      onSuccessMessage("Undo applied!");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isTransitioningHistory.current = true;
      const next = history[historyIndex + 1];
      setManglish(next.manglish);
      setMalayalam(next.malayalam);
      setHistoryIndex(historyIndex + 1);
      setTimeout(() => { isTransitioningHistory.current = false; }, 50);
      onSuccessMessage("Redo applied!");
    }
  };

  // Replace active word with a suggestion chip
  const handleApplySuggestion = (suggestion: string) => {
    const words = manglish.split(/(\s+)/);
    // Find last word token and replace it
    for (let i = words.length - 1; i >= 0; i--) {
      if (words[i].trim() && /^[a-zA-Z]+$/.test(words[i])) {
        words[i] = suggestion; // Replaced
        break;
      }
    }
    const updatedManglish = words.join("");
    setManglish(updatedManglish);
    
    // Automatically recalculate Malayalam
    const converted = transliterateSentence(updatedManglish);
    setMalayalam(converted);
    setSuggestions([]);
    setActiveWord("");
    
    // Save to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ manglish: updatedManglish, malayalam: converted });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    onSuccessMessage("Suggestion applied! ✨");
    if (manglishInputRef.current) {
      manglishInputRef.current.focus();
    }
  };

  // Handle keys (Space or Enter to trigger suggestions)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === " " || e.key === "Enter") && suggestions.length > 0) {
      // Opt-in: Auto-apply the first suggestion if desired, or let user pick.
    }
  };

  // Action helpers
  const handleCopy = () => {
    if (!malayalam) return;
    navigator.clipboard.writeText(malayalam);
    onSuccessMessage("Copied Malayalam text to clipboard! 📋");
  };

  const handleClear = () => {
    setManglish("");
    setMalayalam("");
    setSuggestions([]);
    setActiveWord("");
    const newHistory = [{ manglish: "", malayalam: "" }];
    setHistory(newHistory);
    setHistoryIndex(0);
    onSuccessMessage("Workspace cleared.");
  };

  const handleShareWhatsApp = () => {
    if (!malayalam) return;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(malayalam)}`;
    window.open(url, "_blank");
  };

  const handleDownloadTxt = () => {
    if (!malayalam) return;
    const element = document.createElement("a");
    const file = new Blob([malayalam], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "vamozhi_malayalam_text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onSuccessMessage("Downloaded text as TXT successfully! 📄");
  };

  // Generate 1080x1920 Story Image using HTML Canvas
  const handleDownloadStoryImage = () => {
    if (!malayalam) return;
    onSuccessMessage("Generating your Vamozhi social story image...");

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw background gradient (Premium Cosmic Magenta to Orchid Dark)
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, "#2e1065"); // deep purple
    gradient.addColorStop(0.5, "#4c1d95"); // violet
    gradient.addColorStop(1, "#db2777"); // pink-600
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle background visual accents
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(540, 960, 450, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(540, 960, 500, 0, Math.PI * 2);
    ctx.stroke();

    // Setup Text styling
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 48px 'Inter', sans-serif";

    // Text Wrap calculation
    const words = malayalam.split(/\s+/);
    const lines: string[] = [];
    let currentLine = "";
    const maxWidth = 800;
    const lineHeight = 80;

    for (let n = 0; n < words.length; n++) {
      let testLine = currentLine + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(currentLine.trim());
        currentLine = words[n] + " ";
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());

    // Render wrapped text centered on the story
    const startY = 960 - ((lines.length - 1) * lineHeight) / 2;
    ctx.font = "500 52px 'Noto Sans Malayalam', sans-serif";
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    lines.forEach((line, index) => {
      ctx.fillText(line, 540, startY + index * lineHeight);
    });

    // Reset shadow for branding
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Draw Top Brand Badge
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.roundRect(440, 150, 200, 60, 30);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px 'Inter', sans-serif";
    ctx.fillText("VAMOZHI", 540, 180);

    // Draw Watermark at the bottom
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "bold 32px 'Inter', sans-serif";
    ctx.fillText("vamozhi.com", 540, 1750);
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "italic 24px 'Inter', sans-serif";
    ctx.fillText("Your Vibe. Your Words. In Malayalam.", 540, 1800);

    // Download canvas image
    const link = document.createElement("a");
    link.download = `vamozhi_story_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onSuccessMessage("Custom 1080x1920 Story Image downloaded! 📸🌸");
  };

  // Word & Character count calculation
  const charCount = malayalam.length;
  const wordCount = malayalam.trim() === "" ? 0 : malayalam.trim().split(/\s+/).length;

  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto text-left" id="manglish-translit-section">
      
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-black tracking-widest uppercase inline-block mb-3">
          Phonetic Keyboard Tool
        </span>
        <h1 className="text-3xl font-black tracking-tight text-neutral-900" id="translit-tool-heading">
          Manglish to Malayalam Typing
        </h1>
        <p className="text-sm text-neutral-500 mt-2">
          Type phonetically in Manglish (e.g., <span className="font-mono text-xs text-purple-700 bg-purple-50/50 px-1 py-0.5 rounded">njan malayaliyanu</span>) and watch it transform instantly into beautiful Malayalam script (<span className="font-bold text-neutral-800">ഞാൻ മലയാളിയാണ്</span>).
        </p>
      </div>

      {/* Main Dual Bento Grid Cards Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Side: Manglish Input */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between min-h-[350px]">
          <div className="w-full flex-1 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-purple-600" />
                1. Type Manglish Here
              </span>
              <div className="flex gap-1">
                <button
                  onClick={handleUndo}
                  disabled={historyIndex === 0}
                  className="p-1.5 hover:bg-slate-50 text-slate-500 rounded-lg disabled:opacity-30 cursor-pointer"
                  title="Undo"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex === history.length - 1}
                  className="p-1.5 hover:bg-slate-50 text-slate-500 rounded-lg disabled:opacity-30 cursor-pointer"
                  title="Redo"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <textarea
              ref={manglishInputRef}
              value={manglish}
              onChange={(e) => handleTextChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Ente keralam ethra sundaram..."
              rows={8}
              className="w-full flex-1 bg-transparent text-sm font-medium focus:outline-none placeholder:text-slate-400 text-slate-800 resize-none"
              id="manglish-textarea-input"
            />
          </div>

          {/* Suggestions Bar */}
          {suggestions.length > 0 && (
            <div className="w-full pt-3 border-t border-slate-50 flex flex-col gap-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Suggestions (click to apply):</span>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((sug, sIdx) => (
                  <button
                    key={`${sug}-${sIdx}`}
                    onClick={() => handleApplySuggestion(sug)}
                    className="px-3 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100 rounded-full text-xs font-bold cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-50">
            <span>{manglish.length} characters</span>
            <span className="text-purple-600/70 font-semibold italic">Phonetic active</span>
          </div>
        </div>

        {/* Right Side: Malayalam Output */}
        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between text-white min-h-[350px]">
          <div className="w-full flex-1 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
                2. Live Malayalam Output
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!malayalam}
                  className="p-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-lg disabled:opacity-40 cursor-pointer transition-all flex items-center gap-1 text-[10px] font-bold"
                  title="Copy Malayalam"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
                <button
                  onClick={handleClear}
                  disabled={!manglish}
                  className="p-1.5 bg-slate-800 hover:bg-slate-750 text-rose-400 hover:text-rose-300 rounded-lg disabled:opacity-40 cursor-pointer transition-all"
                  title="Clear All"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Editable output container */}
            <textarea
              value={malayalam}
              onChange={(e) => setMalayalam(e.target.value)}
              placeholder="മലയാളം എഴുത്ത് ഇവിടെ കാണാം..."
              rows={8}
              className="w-full flex-1 bg-transparent text-base font-bold text-pink-100 focus:outline-none placeholder:text-slate-600 resize-none font-sans"
              id="malayalam-textarea-output"
            />
          </div>

          {/* Expanded Tools Block inside output card */}
          {malayalam && (
            <div className="w-full pt-4 border-t border-slate-800 flex flex-wrap gap-2 animate-fade-in">
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                WhatsApp Share
              </button>
              <button
                onClick={handleDownloadTxt}
                className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Download className="w-3.5 h-3.5" />
                Download TXT
              </button>
              <button
                onClick={handleDownloadStoryImage}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-[0.98] text-white rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-purple-950"
              >
                <Sparkles className="w-4 h-4 animate-bounce" />
                Download 1080x1920 Story Image
              </button>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800">
            <span>{wordCount} words | {charCount} characters</span>
            <span className="text-emerald-500/70 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Complete
            </span>
          </div>
        </div>

      </div>

      {/* Interactive Unicode Virtual Keypad & Quick-Map Guide */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mt-8" id="unicode-keypad-panel">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
          <div className="text-left">
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
              Malayalam Unicode Translation Helper Keypad
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any character or conjunct below to insert it directly into your live Malayalam output!
            </p>
          </div>
          
          {/* Quick Tab Selectors */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl">
            {["chillu", "vowels", "consonants", "guide"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  // Use a dataset attribute or local tracking if needed, here we'll use a local click state
                  const activeClass = "bg-white text-purple-700 shadow-xs";
                  const inactiveClass = "text-slate-600 hover:text-slate-900";
                  const btn = document.getElementById(`tab-btn-${tab}`);
                  if (btn) {
                    ["chillu", "vowels", "consonants", "guide"].forEach(t => {
                      const b = document.getElementById(`tab-btn-${t}`);
                      if (b) b.className = `px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${inactiveClass}`;
                    });
                    btn.className = `px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeClass}`;
                    
                    ["tab-content-chillu", "tab-content-vowels", "tab-content-consonants", "tab-content-guide"].forEach(tc => {
                      const el = document.getElementById(tc);
                      if (el) el.classList.add("hidden");
                    });
                    const targetEl = document.getElementById(`tab-content-${tab}`);
                    if (targetEl) targetEl.classList.remove("hidden");
                  }
                }}
                id={`tab-btn-${tab}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tab === "chillu" ? "bg-white text-purple-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab === "chillu" ? "Chillu & Conjuncts" : 
                 tab === "vowels" ? "Vowels & Signs" : 
                 tab === "consonants" ? "Consonants" : "Phonetic Guide"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Chillu & Conjuncts (Visible by default) */}
        <div id="tab-content-chillu" className="text-left">
          <div className="flex flex-wrap gap-2">
            {[
              { char: "ൽ", label: "l (chillu l)" },
              { char: "ർ", label: "r (chillu r)" },
              { char: "ൻ", label: "n (chillu n)" },
              { char: "ൾ", label: "L (chillu L)" },
              { char: "ൺ", label: "N (chillu N)" },
              { char: "ന്റെ", label: "nte" },
              { char: "ക്ക", label: "kka" },
              { char: "ച്ച", label: "ccha" },
              { char: "ത്ത", label: "ttha" },
              { char: "പ്പ", label: "ppa" },
              { char: "മ്പ", label: "mba" },
              { char: "ണ്ട", label: "nda" },
              { char: "ന്ത", label: "ntha" },
              { char: "ണ്ണ", label: "nna" },
              { char: "ല്ല", label: "lla" },
              { char: "മ്മ", label: "mma" },
              { char: "യ്യ", label: "yya" }
            ].map((item) => (
              <button
                key={item.char}
                onClick={() => {
                  setMalayalam(prev => prev + item.char);
                  onSuccessMessage(`Inserted '${item.char}' into Malayalam output`);
                }}
                className="px-4 py-2.5 bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-purple-700 border border-slate-200 hover:border-purple-200 rounded-xl font-bold text-sm transition-all flex flex-col items-center min-w-[70px] cursor-pointer"
                title={`Click to insert ${item.char}`}
              >
                <span className="text-base font-black">{item.char}</span>
                <span className="text-[9px] text-slate-400 font-mono mt-0.5">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab 2: Vowels & Signs (Hidden by default) */}
        <div id="tab-content-vowels" className="hidden text-left">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">Vowel Signs (Swarachinnam)</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { char: "ാ", label: "aa / a" },
                  { char: "ി", label: "i" },
                  { char: "ീ", label: "ii" },
                  { char: "ു", label: "u" },
                  { char: "ൂ", label: "uu" },
                  { char: "െ", label: "e" },
                  { char: "േ", label: "E" },
                  { char: "ൈ", label: "ai" },
                  { char: "ൊ", label: "o" },
                  { char: "ോ", label: "O" },
                  { char: "ൌ", label: "au" },
                  { char: "ം", label: "m" }
                ].map((item) => (
                  <button
                    key={item.char}
                    onClick={() => {
                      setMalayalam(prev => prev + item.char);
                      onSuccessMessage(`Inserted sign '${item.char}'`);
                    }}
                    className="px-4 py-2.5 bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-purple-700 border border-slate-200 hover:border-purple-200 rounded-xl font-bold text-sm transition-all flex flex-col items-center min-w-[65px] cursor-pointer"
                  >
                    <span className="text-base font-black">{item.char}</span>
                    <span className="text-[9px] text-slate-400 font-mono mt-0.5">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2 font-sans">Full Vowels (Swaram)</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { char: "അ", label: "a" },
                  { char: "ആ", label: "aa" },
                  { char: "ഇ", label: "i" },
                  { char: "ഈ", label: "ii" },
                  { char: "ഉ", label: "u" },
                  { char: "ഊ", label: "uu" },
                  { char: "എ", label: "e" },
                  { char: "ഏ", label: "E" },
                  { char: "ഐ", label: "ai" },
                  { char: "ഒ", label: "o" },
                  { char: "ഓ", label: "O" },
                  { char: "ഔ", label: "au" }
                ].map((item) => (
                  <button
                    key={item.char}
                    onClick={() => {
                      setMalayalam(prev => prev + item.char);
                      onSuccessMessage(`Inserted vowel '${item.char}'`);
                    }}
                    className="px-4 py-2.5 bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-purple-700 border border-slate-200 hover:border-purple-200 rounded-xl font-bold text-sm transition-all flex flex-col items-center min-w-[65px] cursor-pointer"
                  >
                    <span className="text-base font-black">{item.char}</span>
                    <span className="text-[9px] text-slate-400 font-mono mt-0.5">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab 3: Consonants (Hidden by default) */}
        <div id="tab-content-consonants" className="hidden text-left">
          <div className="flex flex-wrap gap-2">
            {[
              { char: "ക", label: "k" }, { char: "ഖ", label: "kh" }, { char: "ഗ", label: "g" }, { char: "ഘ", label: "gh" }, { char: "ങ", label: "ng" },
              { char: "ച", label: "ch" }, { char: "ഛ", label: "chh" }, { char: "ജ", label: "j" }, { char: "ഝ", label: "jh" }, { char: "ഞ", label: "nj" },
              { char: "ട", label: "t" }, { char: "ഠ", label: "th" }, { char: "ഡ", label: "d" }, { char: "ഢ", label: "dh" }, { char: "ണ", label: "N" },
              { char: "ത", label: "th" }, { char: "ഥ", label: "thh" }, { char: "ദ", label: "d" }, { char: "ധ", label: "dh" }, { char: "ന", label: "n" },
              { char: "പ", label: "p" }, { char: "ഫ", label: "f/ph" }, { char: "ബ", label: "b" }, { char: "ഭ", label: "bh" }, { char: "മ", label: "m" },
              { char: "യ", label: "y" }, { char: "ര", label: "r" }, { char: "ല", label: "l" }, { char: "വ", label: "v/w" },
              { char: "ശ", label: "sh" }, { char: "ഷ", label: "shh" }, { char: "സ", label: "s" }, { char: "ഹ", label: "h" },
              { char: "ള", label: "L" }, { char: "ഴ", label: "zh" }, { char: "റ", label: "R" }
            ].map((item) => (
              <button
                key={item.char}
                onClick={() => {
                  setMalayalam(prev => prev + item.char);
                  onSuccessMessage(`Inserted '${item.char}'`);
                }}
                className="px-3.5 py-2.5 bg-slate-50 hover:bg-purple-50 text-slate-800 hover:text-purple-700 border border-slate-200 hover:border-purple-200 rounded-xl font-bold text-sm transition-all flex flex-col items-center min-w-[55px] cursor-pointer"
              >
                <span className="text-base font-black">{item.char}</span>
                <span className="text-[9px] text-slate-400 font-mono mt-0.5">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab 4: Phonetic Guide (Hidden by default) */}
        <div id="tab-content-guide" className="hidden text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="font-extrabold text-purple-700 block mb-1">Common Slang & Phrases</span>
              <ul className="space-y-1 font-mono text-[10px]">
                <li>njan / njaan &rarr; ഞാൻ</li>
                <li>ente &rarr; എന്റെ</li>
                <li>sukhamano &rarr; സുഖമാണോ</li>
                <li>ishtamanu &rarr; ഇഷ്ടമാണ്</li>
                <li>keralam &rarr; കേരളം</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="font-extrabold text-purple-700 block mb-1">Difficult Combos</span>
              <ul className="space-y-1 font-mono text-[10px]">
                <li>zh &rarr; ഴ (e.g. ma<span className="font-bold underline">zh</span>a &rarr; മഴ)</li>
                <li>nte &rarr; ന്റെ (e.g. e<span className="font-bold underline">nte</span> &rarr; എന്റെ)</li>
                <li>nj &rarr; ഞ (e.g. <span className="font-bold underline">nj</span>an &rarr; ഞാൻ)</li>
                <li>th &rarr; ത (e.g. va<span className="font-bold underline">th</span>il &rarr; വാതിൽ)</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="font-extrabold text-purple-700 block mb-1">Endings (Chillu Letters)</span>
              <ul className="space-y-1 font-mono text-[10px]">
                <li>n &rarr; ൻ (e.g. nja<span className="font-bold underline">n</span> &rarr; ഞാൻ)</li>
                <li>r &rarr; ർ (e.g. avha<span className="font-bold underline">r</span> &rarr; അവർ)</li>
                <li>l &rarr; ൽ (e.g. ava<span className="font-bold underline">l</span> &rarr; അവൾ)</li>
                <li>L &rarr; ൾ (e.g. aval &rarr; അവൾ)</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Safety & Local Processing Notice Card */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
        <div className="p-2.5 bg-white rounded-xl text-emerald-600 border border-slate-200">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">100% Secure Local Execution</h4>
          <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
            Your privacy is fully protected. Vamozhi executes phonetic translation inside your browser without sending any text to external logging servers.
          </p>
        </div>
      </div>

    </section>
  );
}
