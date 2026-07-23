/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Search, 
  PlusCircle, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  ExternalLink, 
  ThumbsUp,
  AlertCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import localDictionaryData from "../data/dictionary_db.json";

interface DictionaryEntry {
  id: string;
  word: string;
  malayalam: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
  source: string;
}

interface DictionarySectionProps {
  onSuccessMessage?: (msg: string, type?: "success" | "info") => void;
}

export default function DictionarySection({ onSuccessMessage }: DictionarySectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<DictionaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAIUsed, setIsAIUsed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states for manual contribution
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [newMalayalam, setNewMalayalam] = useState("");
  const [newPart, setNewPart] = useState("noun");
  const [newDef, setNewDef] = useState("");
  const [newEx, setNewEx] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search mode: en2ml or ml2en (unified in backend but lets user switch visual expectation)
  const [searchMode, setSearchMode] = useState<"en2ml" | "ml2en">("en2ml");

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 450);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch results when debounced query changes
  useEffect(() => {
    const fetchDictionaryResults = async () => {
      const trimmed = debouncedQuery.trim();
      setIsLoading(true);
      setError(null);
      setIsAIUsed(false);

      if (trimmed === "") {
        try {
          const response = await fetch(`/api/dictionary/search?q=`);
          if (response.ok) {
            const data = await response.json();
            setResults(data.results || []);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          // ignore API error and fallback to local
        }
        setResults((localDictionaryData as DictionaryEntry[]).slice(0, 15));
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/dictionary/search?q=${encodeURIComponent(trimmed)}`);
        if (!response.ok) {
          throw new Error("Failed to search dictionary database.");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setResults(data.results || []);
        setIsAIUsed(data.isAIUsed || false);
      } catch (err: any) {
        console.warn("API lookup failed, falling back to local database search:", err);
        // Fallback to client-side local search using imported JSON
        const q = trimmed.toLowerCase();
        const matches = (localDictionaryData as DictionaryEntry[]).filter((entry) => {
          const wordMatch = String(entry.word || "").toLowerCase().includes(q);
          const malMatch = String(entry.malayalam || "").includes(q);
          const defMatch = String(entry.definition || "").toLowerCase().includes(q);
          return wordMatch || malMatch || defMatch;
        });
        setResults(matches);
        setIsAIUsed(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDictionaryResults();
  }, [debouncedQuery]);

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newMalayalam.trim()) {
      onSuccessMessage?.("Please fill out both Word and Malayalam translation fields.", "info");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/dictionary/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          word: newWord,
          malayalam: newMalayalam,
          partOfSpeech: newPart,
          definition: newDef,
          example: newEx
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add entry.");
      }

      const data = await response.json();
      if (data.success) {
        onSuccessMessage?.(`"${newWord}" successfully saved to database! 📖`, "success");
        // Reset form
        setNewWord("");
        setNewMalayalam("");
        setNewPart("noun");
        setNewDef("");
        setNewEx("");
        setShowAddForm(false);
        // Re-run current search to find the new word
        setSearchQuery(newWord);
      }
    } catch (err) {
      console.error(err);
      onSuccessMessage?.("Error inserting entry into the dictionary database.", "info");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sampleSearches = [
    { label: "love (സ്നേഹം)", q: "love" },
    { label: "rain (മഴ)", q: "rain" },
    { label: "culture (സംസ്കാരം)", q: "culture" },
    { label: "nature (പ്രകൃതി)", q: "nature" },
    { label: "happy (സന്തോഷം)", q: "happy" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen text-left" id="malayalam-dictionary-section">
      
      {/* Elegant Landing Page */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex flex-col items-center justify-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">മലയാളം</span>
            <span>ശബ്ദകോശം</span>
          </div>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-purple-900 block mt-1">
            English-Malayalam & Malayalam-English Dictionary
          </span>
        </h1>
        <p className="text-sm text-slate-500 mt-2 font-medium">
          Instant English to Malayalam and Malayalam to English word definitions and meanings.
        </p>

        {/* Mode Toggle Tabs */}
        <div className="flex justify-center mt-6 gap-2 bg-slate-100 p-1 rounded-full max-w-xs mx-auto">
          <button
            onClick={() => setSearchMode("en2ml")}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              searchMode === "en2ml" ? "bg-white text-purple-900 shadow-sm" : "text-slate-500 hover:text-slate-950"
            }`}
          >
            English ➔ Mal
          </button>
          <button
            onClick={() => setSearchMode("ml2en")}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              searchMode === "ml2en" ? "bg-white text-purple-900 shadow-sm" : "text-slate-500 hover:text-slate-950"
            }`}
          >
            Mal ➔ English
          </button>
        </div>

        {/* Mega Sticky Search Input Box */}
        <div className="sticky top-[70px] z-20 bg-[#faf9f6]/95 backdrop-blur-md py-4 px-2 rounded-3xl border border-slate-200/60 shadow-sm max-w-4xl mx-auto" id="dictionary-search-box-container">
          <div className="relative shadow-md rounded-2xl overflow-hidden border border-slate-200 bg-white">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchMode === "en2ml" ? "Search 190,000+ English & Malayalam terms (e.g. love, travel, book...)" : "മലയാളം വാക്ക് തിരയുക (ഉദാ: സ്നേഹം, യാത്ര, മഴ...)"}
              className="w-full pl-12 pr-24 py-4 bg-white text-sm sm:text-base font-medium focus:outline-none text-slate-800 placeholder:text-slate-400"
            />
            <Search className="w-5 h-5 text-purple-700 absolute left-4 top-4" />
            
            <div className="absolute right-3 top-2.5 flex items-center gap-2">
              {searchQuery !== "" && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition-all cursor-pointer font-bold text-xs"
                  title="Clear search query"
                >
                  ✕
                </button>
              )}
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-purple-950 hover:bg-purple-900 text-white py-2 px-3 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                title="Contribute a word to the database"
              >
                <PlusCircle className="w-4 h-4 text-purple-300" />
                <span className="hidden sm:inline">Add Word</span>
              </button>
            </div>
          </div>

          {/* Result count & Alphabetical Filter Chips */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs">
            <span className="font-extrabold text-slate-700">
              Showing {results.length} term{results.length !== 1 ? 's' : ''}
            </span>
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">A-Z:</span>
              {["All", "A", "B", "C", "D", "E", "F", "G", "H", "K", "L", "M", "P", "R", "S", "T"].map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setSearchQuery(letter === "All" ? "" : letter)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    (letter === "All" && !searchQuery) || searchQuery.toLowerCase() === letter.toLowerCase()
                      ? "bg-purple-950 text-white"
                      : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Desktop Grid / 1-Column Mobile Layout */}
      <div className="max-w-6xl mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="dictionary-results-column">
          
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full bg-white border border-slate-200 rounded-3xl p-12 text-center"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800 mx-auto mb-4"></div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Searching dictionary database...</p>
              </motion.div>
            )}

            {!isLoading && error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full bg-red-50/50 border border-red-100 rounded-3xl p-8 text-center"
              >
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-red-900">{error}</p>
                <p className="text-xs text-red-500 mt-1">Please try searching a standard, meaningful word.</p>
              </motion.div>
            )}

            {!isLoading && !error && results.length === 0 && searchQuery.trim() !== "" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full bg-amber-50/30 border border-amber-100 rounded-3xl p-8 text-center"
              >
                <HelpCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-amber-900">Word not found</p>
                <p className="text-xs text-slate-500 mt-1">We couldn't locate details for "{searchQuery}". Try adding it using the button above.</p>
              </motion.div>
            )}

            {!isLoading && !error && results.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between space-y-3 text-left group"
                id={`dict-entry-${entry.id}`}
              >
                <div>
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-3">
                    <div>
                      {/* Malayalam word as the STRONGEST element */}
                      <h3 className="text-2xl sm:text-3xl font-black text-purple-950 tracking-tight leading-snug">
                        {entry.malayalam}
                      </h3>
                      <p className="text-sm font-bold text-slate-800 mt-1 flex items-baseline gap-2">
                        <span>{entry.word}</span>
                        <span className="text-xs font-bold text-slate-500 italic">
                          ({entry.partOfSpeech})
                        </span>
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-800 rounded-xl text-[10px] font-black uppercase tracking-wider shrink-0 border border-purple-100">
                      {entry.source || "Olam"}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 font-bold">Meaning: </strong>
                    {entry.definition}
                  </p>

                  {entry.example && (
                    <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                      <span className="font-bold text-purple-900">Example: </span>
                      <span className="italic">"{entry.example}"</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </AnimatePresence>

        </div>

        {/* Side Panel: Contribute Form / Database stats */}
        <div className="space-y-6">
          
          {/* Animated Toggle Contribution Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border-2 border-purple-100 rounded-3xl p-6 shadow-xl space-y-4 text-left"
              >
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <PlusCircle className="w-5 h-5 text-purple-600" />
                    Contribute Entry
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-slate-400 hover:text-slate-900 font-extrabold text-xs cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleAddEntry} className="space-y-3 text-xs font-bold">
                  <div>
                    <label className="block text-slate-500 mb-1">Word (English or Malayalam)</label>
                    <input
                      type="text"
                      required
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      placeholder="e.g. computer"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600 bg-slate-50 focus:bg-white text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Malayalam Equivalent Script</label>
                    <input
                      type="text"
                      required
                      value={newMalayalam}
                      onChange={(e) => setNewMalayalam(e.target.value)}
                      placeholder="e.g. കമ്പ്യൂട്ടർ"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600 bg-slate-50 focus:bg-white text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Part Of Speech</label>
                    <select
                      value={newPart}
                      onChange={(e) => setNewPart(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600 bg-slate-50 text-slate-800"
                    >
                      <option value="noun">Noun (നാമം)</option>
                      <option value="verb">Verb (ക്രിയ)</option>
                      <option value="adjective">Adjective (വിശേഷണം)</option>
                      <option value="adverb">Adverb (ക്രിയാവിശേഷണം)</option>
                      <option value="other">Other / Multi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Definition / Meaning</label>
                    <textarea
                      value={newDef}
                      onChange={(e) => setNewDef(e.target.value)}
                      placeholder="Explain the word clearly..."
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600 bg-slate-50 focus:bg-white text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Illustrative Example Sentence (Optional)</label>
                    <input
                      type="text"
                      value={newEx}
                      onChange={(e) => setNewEx(e.target.value)}
                      placeholder="e.g. The computer is fast -> കമ്പ്യൂട്ടർ വേഗതയുള്ളതാണ്."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600 bg-slate-50 focus:bg-white text-slate-800 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-purple-950 hover:bg-purple-900 text-white rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save to Database"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
