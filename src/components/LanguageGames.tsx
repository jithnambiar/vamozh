/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Gamepad2, 
  Sparkles, 
  RotateCcw, 
  Trophy, 
  Volume2, 
  CheckCircle2, 
  HelpCircle,
  Flame,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MatchItem {
  id: string;
  manglish: string;
  malayalam: string;
  english: string;
}

const MATCH_DATA: MatchItem[] = [
  { id: "m1", manglish: "Amma", malayalam: "അമ്മ", english: "Mother" },
  { id: "m2", manglish: "Sneham", malayalam: "സ്നേഹം", english: "Love" },
  { id: "m3", manglish: "Mazha", malayalam: "മഴ", english: "Rain" },
  { id: "m4", manglish: "Chaya", malayalam: "ചായ", english: "Tea" },
  { id: "m5", manglish: "Veed", malayalam: "വീട്", english: "Home" },
  { id: "m6", manglish: "Yathra", malayalam: "യാത്ര", english: "Travel" }
];

interface MemoryCard {
  id: string;
  pairId: string;
  label: string;
  sub: string;
  type: "malayalam" | "phonetic";
  isFlipped: boolean;
  isMatched: boolean;
}

const MEMORY_PAIRS = [
  { pairId: "p1", mal: "അ", phon: "A" },
  { pairId: "p2", mal: "ആ", phon: "AA" },
  { pairId: "p3", mal: "ഇ", phon: "I" },
  { pairId: "p4", mal: "ഈ", phon: "EE" },
  { pairId: "p5", mal: "ഉ", phon: "U" },
  { pairId: "p6", mal: "ഊ", phon: "OO" }
];

interface BuilderWord {
  targetWord: string;
  englishMeaning: string;
  bubbles: string[];
}

const BUILDER_WORDS: BuilderWord[] = [
  { targetWord: "മഴ", englishMeaning: "Rain 🌧️", bubbles: ["ഴ", "മ"] },
  { targetWord: "അമ്മ", englishMeaning: "Mother ❤️", bubbles: ["മ്മ", "അ"] },
  { targetWord: "ചായ", englishMeaning: "Tea ☕", bubbles: ["യ", "ചാ"] },
  { targetWord: "വീട്", englishMeaning: "Home 🏠", bubbles: ["ട്", "വീ"] },
  { targetWord: "യാത്ര", englishMeaning: "Travel ✈️", bubbles: ["ത്ര", "യാ"] }
];

export default function LanguageGames() {
  const [activeGame, setActiveGame] = useState<"matcher" | "flip" | "builder">("matcher");

  // --- GAME 1: MATCHING GAME STATES ---
  const [selectedManglish, setSelectedManglish] = useState<string | null>(null);
  const [selectedMalayalam, setSelectedMalayalam] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matcherScore, setMatcherScore] = useState<number>(0);
  const [shuffledManglish] = useState(() => [...MATCH_DATA].sort(() => Math.random() - 0.5));
  const [shuffledMalayalam] = useState(() => [...MATCH_DATA].sort(() => Math.random() - 0.5));

  // --- GAME 2: MEMORY FLIP STATES ---
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [flipScore, setFlipScore] = useState<number>(0);

  // --- GAME 3: WORD BUILDER STATES ---
  const [builderIdx, setBuilderIdx] = useState<number>(0);
  const [userBubbles, setUserBubbles] = useState<string[]>([]);
  const [builderScore, setBuilderScore] = useState<number>(0);
  const [builderSolved, setBuilderSolved] = useState<boolean>(false);

  // Speech synthesizer helper
  const speakMalayalam = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ml-IN";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Initialize Memory Flip Game
  const initMemoryCards = () => {
    const cardList: MemoryCard[] = [];
    MEMORY_PAIRS.forEach((item, index) => {
      cardList.push({
        id: `card_${index}_mal`,
        pairId: item.pairId,
        label: item.mal,
        sub: "Malayalam Vowel",
        type: "malayalam",
        isFlipped: false,
        isMatched: false
      });
      cardList.push({
        id: `card_${index}_phon`,
        pairId: item.pairId,
        label: item.phon,
        sub: "Phonetic Sound",
        type: "phonetic",
        isFlipped: false,
        isMatched: false
      });
    });
    setCards(cardList.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setFlipScore(0);
  };

  useEffect(() => {
    initMemoryCards();
  }, []);

  // --- GAME 1 LOGIC ---
  const handleSelectManglish = (id: string) => {
    if (matchedPairs.includes(id)) return;
    setSelectedManglish(id);
    if (selectedMalayalam) {
      checkMatcher(id, selectedMalayalam);
    }
  };

  const handleSelectMalayalam = (id: string) => {
    if (matchedPairs.includes(id)) return;
    setSelectedMalayalam(id);
    if (selectedManglish) {
      checkMatcher(selectedManglish, id);
    }
  };

  const checkMatcher = (mId: string, malId: string) => {
    if (mId === malId) {
      setMatchedPairs((prev) => [...prev, mId]);
      setMatcherScore((prev) => prev + 10);
      const matchObj = MATCH_DATA.find((item) => item.id === mId);
      if (matchObj) speakMalayalam(matchObj.malayalam);
    }
    setTimeout(() => {
      setSelectedManglish(null);
      setSelectedMalayalam(null);
    }, 400);
  };

  const resetMatcher = () => {
    setSelectedManglish(null);
    setSelectedMalayalam(null);
    setMatchedPairs([]);
    setMatcherScore(0);
  };

  // --- GAME 2 LOGIC ---
  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      if (first.pairId === second.pairId) {
        newCards[newFlipped[0]].isMatched = true;
        newCards[newFlipped[1]].isMatched = true;
        setCards(newCards);
        setFlipScore((prev) => prev + 15);
        setFlippedCards([]);
        speakMalayalam(first.type === "malayalam" ? first.label : second.label);
      } else {
        setTimeout(() => {
          newCards[newFlipped[0]].isFlipped = false;
          newCards[newFlipped[1]].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  // --- GAME 3 LOGIC ---
  const handleBubbleClick = (char: string) => {
    if (builderSolved) return;
    const newBubbles = [...userBubbles, char];
    setUserBubbles(newBubbles);

    const builtWord = newBubbles.join("");
    const target = BUILDER_WORDS[builderIdx].targetWord;

    if (builtWord === target) {
      setBuilderSolved(true);
      setBuilderScore((prev) => prev + 20);
      speakMalayalam(target);
    }
  };

  const resetBuilderWord = () => {
    setUserBubbles([]);
    setBuilderSolved(false);
  };

  const nextBuilderWord = () => {
    setUserBubbles([]);
    setBuilderSolved(false);
    setBuilderIdx((prev) => (prev + 1) % BUILDER_WORDS.length);
  };

  return (
    <div className="space-y-8 text-left" id="malayalam-games-suite">
      
      {/* Mini-Games Header */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-pink-500/30 inline-block">
            Gamified Learning Studio 🎮
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Learn Malayalam Through Interactive Games!
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
            Boost your Malayalam vocabulary, script recognition, and pronunciation with bite-sized matching puzzles and word games.
          </p>
        </div>

        {/* Game Mode Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setActiveGame("matcher")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeGame === "matcher"
                ? "bg-white text-purple-950 shadow-md"
                : "text-purple-200 hover:text-white hover:bg-white/10"
            }`}
          >
            🎯 Word Matcher
          </button>
          <button
            onClick={() => setActiveGame("flip")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeGame === "flip"
                ? "bg-white text-purple-950 shadow-md"
                : "text-purple-200 hover:text-white hover:bg-white/10"
            }`}
          >
            🃏 Memory Cards
          </button>
          <button
            onClick={() => setActiveGame("builder")}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeGame === "builder"
                ? "bg-white text-purple-950 shadow-md"
                : "text-purple-200 hover:text-white hover:bg-white/10"
            }`}
          >
            🧩 Word Builder
          </button>
        </div>
      </div>

      {/* GAME 1: WORD MATCHER */}
      {activeGame === "matcher" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                🎯 Match Manglish to Malayalam Script
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tap a Manglish card on the left, then tap its matching Malayalam word on the right!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200/60 px-3 py-1.5 rounded-xl text-xs font-black">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                Score: {matcherScore} PTS
              </div>
              <button
                onClick={resetMatcher}
                className="p-2 text-slate-400 hover:text-purple-900 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer"
                title="Restart Game"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Manglish Cards */}
            <div className="space-y-3">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                1. Select Manglish Word
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {shuffledManglish.map((item) => {
                  const isMatched = matchedPairs.includes(item.id);
                  const isSelected = selectedManglish === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => handleSelectManglish(item.id)}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isMatched
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800 opacity-60 cursor-not-allowed"
                          : isSelected
                          ? "bg-purple-950 text-white border-purple-950 shadow-md scale-[1.02]"
                          : "bg-slate-50 hover:bg-slate-100/80 border-slate-200/80 text-slate-800"
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-sm block">{item.manglish}</span>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>
                          ({item.english})
                        </span>
                      </div>
                      {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Malayalam Script Cards */}
            <div className="space-y-3">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                2. Select Malayalam Script
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {shuffledMalayalam.map((item) => {
                  const isMatched = matchedPairs.includes(item.id);
                  const isSelected = selectedMalayalam === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => handleSelectMalayalam(item.id)}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isMatched
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800 opacity-60 cursor-not-allowed"
                          : isSelected
                          ? "bg-purple-950 text-white border-purple-950 shadow-md scale-[1.02]"
                          : "bg-slate-50 hover:bg-slate-100/80 border-slate-200/80 text-slate-800"
                      }`}
                    >
                      <span className="font-black text-xl font-sans tracking-wide">{item.malayalam}</span>
                      {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {matchedPairs.length === MATCH_DATA.length && (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-3 animate-fade-in">
              <Trophy className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-black text-emerald-950">
                You Completed All Matches! ശബാഷ് 🥳
              </h4>
              <p className="text-xs text-emerald-700">
                Great job reinforcing your Malayalam script recognition skills!
              </p>
              <button
                onClick={resetMatcher}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider cursor-pointer"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: MEMORY CARD FLIP */}
      {activeGame === "flip" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                🃏 Memory Card Flip (അക്ഷര കളി)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Flip tiles to match Malayalam Vowels with their Phonetic English sound pairs!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 text-purple-900 border border-purple-200/60 px-3 py-1.5 rounded-xl text-xs font-black">
                Score: {flipScore} PTS
              </div>
              <button
                onClick={initMemoryCards}
                className="p-2 text-slate-400 hover:text-purple-900 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer"
                title="Shuffle Cards"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {cards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`h-28 rounded-2xl border flex flex-col items-center justify-center p-2 transition-all duration-300 cursor-pointer ${
                  card.isMatched
                    ? "bg-emerald-500 text-white border-emerald-600 shadow-md scale-95"
                    : card.isFlipped
                    ? "bg-purple-950 text-white border-purple-950 shadow-lg scale-105"
                    : "bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-400"
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <>
                    <span className="text-2xl font-black font-sans">{card.label}</span>
                    <span className="text-[9px] uppercase font-bold opacity-80 mt-1">{card.sub}</span>
                  </>
                ) : (
                  <span className="text-2xl font-black text-slate-300">?</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME 3: WORD BUILDER */}
      {activeGame === "builder" && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                🧩 Jumbled Word Builder (അക്ഷരക്കൂട്ട്)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tap the letter bubbles in the correct order to spell out the Malayalam word!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 text-purple-900 border border-purple-200/60 px-3 py-1.5 rounded-xl text-xs font-black">
                Score: {builderScore} PTS
              </div>
              <button
                onClick={resetBuilderWord}
                className="p-2 text-slate-400 hover:text-purple-900 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer"
                title="Reset word"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-8 bg-slate-50 border border-slate-200/60 rounded-3xl text-center space-y-6 max-w-lg mx-auto">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                Target Word Clue
              </span>
              <span className="text-xl font-black text-purple-950 block mt-1">
                {BUILDER_WORDS[builderIdx].englishMeaning}
              </span>
            </div>

            {/* Answer Display Box */}
            <div className="min-h-[64px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-2 p-3 shadow-inner">
              {userBubbles.length > 0 ? (
                userBubbles.map((char, i) => (
                  <span key={i} className="text-3xl font-black text-purple-950 font-sans animate-bounce-short">
                    {char}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 font-semibold italic">
                  Tap bubbles below to assemble word...
                </span>
              )}
            </div>

            {/* Letter Bubbles */}
            <div className="flex items-center justify-center gap-4 pt-2">
              {BUILDER_WORDS[builderIdx].bubbles.map((bubble, i) => (
                <button
                  key={i}
                  onClick={() => handleBubbleClick(bubble)}
                  disabled={builderSolved || userBubbles.includes(bubble)}
                  className={`w-16 h-16 rounded-2xl text-2xl font-black font-sans shadow-md border transition-all cursor-pointer ${
                    userBubbles.includes(bubble)
                      ? "bg-slate-200 text-slate-400 border-slate-300 opacity-40 cursor-not-allowed scale-95"
                      : "bg-gradient-to-br from-purple-900 to-indigo-950 text-white border-purple-800 hover:scale-110 active:scale-95"
                  }`}
                >
                  {bubble}
                </button>
              ))}
            </div>

            {/* Solved State */}
            {builderSolved && (
              <div className="space-y-4 pt-4 animate-fade-in">
                <div className="p-3 bg-emerald-100 text-emerald-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Awesome! Perfect Malayalam Spelling! ✨
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => speakMalayalam(BUILDER_WORDS[builderIdx].targetWord)}
                    className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-950 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    Pronounce
                  </button>
                  <button
                    onClick={nextBuilderWord}
                    className="px-5 py-2 bg-purple-950 hover:bg-purple-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
                  >
                    Next Word →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
