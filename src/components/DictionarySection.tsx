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

      try {
        const response = await fetch(`/api/dictionary/search?q=${encodeURIComponent(trimmed)}`);
        if (!response.ok) {
          throw new Error("Failed to search dictionary database.");
        }
        const data = await response.json();
        setResults(data.results || []);
        setIsAIUsed(data.isAIUsed || false);
        if (data.error) {
          setError(data.error);
        }
      } catch (err: any) {
        console.error(err);
        setError("Could not retrieve dictionary definitions. Please try again.");
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
        <h1 className="text-5xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <span className="bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">മലയാളം</span>
          <span>ശബ്ദകോശം</span>
        </h1>
        <p className="text-sm text-slate-500 mt-2 font-medium">
          An interactive English-Malayalam & Malayalam-English dictionary database or Vamozhi AI
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

        {/* Mega Search Input Box */}
        <div className="relative mt-8 max-w-2xl mx-auto" id="dictionary-search-box-container">
          <div className="relative shadow-xl rounded-3xl overflow-hidden border border-slate-200">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchMode === "en2ml" ? "Type English word (e.g. love, travel, book...)" : "Type Malayalam word (e.g. സ്നേഹം, യാത്ര, മഴ...)"}
              className="w-full pl-14 pr-32 py-5 bg-white text-base font-medium focus:outline-none text-slate-800 placeholder:text-slate-400"
            />
            <Search className="w-6 h-6 text-purple-600 absolute left-5 top-5" />
            
            {/* Action buttons inside input */}
            <div className="absolute right-3 top-3 flex items-center gap-2">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-purple-50 hover:bg-purple-100 text-purple-900 py-2.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                title="Contribute a word to the database"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Word</span>
              </button>
            </div>
          </div>

          {/* Prompt Suggestions */}
          <div className="mt-3 text-xs text-slate-400 font-medium">
            <span>Try searching: </span>
            {sampleSearches.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(item.q)}
                className="text-purple-600 hover:text-purple-800 font-extrabold ml-1 hover:underline cursor-pointer"
              >
                {item.label}
                {idx < sampleSearches.length - 1 && ","}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid containing result cards and side contribute block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Definitions Column */}
        <div className="lg:col-span-2 space-y-6" id="dictionary-results-column">
          
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-slate-100 rounded-3xl p-12 text-center"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800 mx-auto mb-4"></div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Searching our database & Olam files...</p>
              </motion.div>
            )}

            {!isLoading && error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50/50 border border-red-100 rounded-3xl p-8 text-center"
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
                className="bg-amber-50/30 border border-amber-100 rounded-3xl p-8 text-center"
              >
                <HelpCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-amber-900">Word not found</p>
                <p className="text-xs text-slate-500 mt-1">We couldn't locate details for "{searchQuery}". Try adding it using the button above.</p>
              </motion.div>
            )}

            {!isLoading && !error && results.length === 0 && searchQuery.trim() === "" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-slate-100 rounded-3xl p-8 text-center space-y-4"
              >
                <BookOpen className="w-10 h-10 text-purple-200 mx-auto" />
                <h3 className="text-base font-black text-slate-800">Your Database is Active</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Start typing in the search box to load English or Malayalam definitions.
                </p>
              </motion.div>
            )}

            {!isLoading && !error && results.length > 0 && (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Active Cache Badge */}
                {isAIUsed && (
                  <div className="bg-purple-900/10 text-purple-900 py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-between border border-purple-200/50">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                      Dynamically compiled via Gemini AI and permanently cached into your dictionary database!
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-900">Live DB Entry</span>
                  </div>
                )}

                {results.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 hover:shadow-md transition-all space-y-4 text-left"
                    id={`dict-entry-${entry.id}`}
                  >
                    <div className="flex items-start justify-between border-b border-slate-50 pb-3">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 capitalize tracking-tight flex items-baseline gap-2">
                          <span>{entry.word}</span>
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                            ({entry.partOfSpeech})
                          </span>
                        </h3>
                        <p className="text-sm font-extrabold text-purple-950 mt-1 font-sans">
                          Malayalam Script: <span className="text-lg text-purple-800 font-semibold">{entry.malayalam}</span>
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-wider">
                        {entry.source}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Definition & Meaning:</span>
                      <p className="text-slate-700 font-semibold text-sm leading-relaxed whitespace-pre-line bg-purple-50/20 p-4 rounded-2xl border border-purple-100/30">
                        {entry.definition}
                      </p>
                    </div>

                    {entry.example && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Illustrative Example:</span>
                        <p className="text-xs text-slate-600 font-medium italic pl-3 border-l-2 border-pink-500">
                          {entry.example}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
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

          {/* Database Info Card */}
          <div className="bg-gradient-to-br from-purple-950 to-indigo-950 text-white rounded-3xl p-6 shadow-sm space-y-4 text-left">
            <h3 className="text-base font-black uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-5 h-5 text-purple-400" />
              Database Status
            </h3>
            
            <p className="text-xs text-purple-200 leading-relaxed">
              Vamozhi features a hybrid storage dictionary engine. It first queries local data index. If absent, it queries Gemini AI, formats a clean entry, and commits it into the database file as a persistent cache.
            </p>

            <div className="border-t border-white/10 pt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-purple-300">Target Core Tables:</span>
                <span className="font-extrabold text-white">Datuk, Ekkurup, Enml</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Database Engine:</span>
                <span className="font-extrabold text-emerald-400">Persistent JSON</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Cloud Storage Size:</span>
                <span className="font-extrabold text-white">Infinite (Auto-Cache)</span>
              </div>
            </div>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-[11px] text-purple-200 font-medium">
              Contributions are stored in real-time, allowing all concurrent users to access shared translations immediately.
            </div>
          </div>

          {/* Olam Open Source Credit Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-left space-y-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Open Source Citation</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              We credit and thank **olam.in** (Kailash Nadh & contributors) for licensing their dictionary datasets (Datuk, Ekkurup, Enml) under open source terms, empowering free language utilities globally.
            </p>
            <a 
              href="https://olam.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] font-black uppercase tracking-widest text-purple-900 hover:text-purple-700 inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Visit Olam.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
