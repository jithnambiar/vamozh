/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Volume2, Award, RefreshCw, Trophy, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NumberItem {
  digit: number;
  malScript: string;
  malWord: string;
  phonetic: string;
  meaning: string;
  example: string;
}

const MALAYALAM_NUMBERS: NumberItem[] = [
  { digit: 0, malScript: "൦", malWord: "പൂജ്യം", phonetic: "Poojyam", meaning: "Zero", example: "Nothing / Void" },
  { digit: 1, malScript: "൧", malWord: "ഒന്ന്", phonetic: "Onnu", meaning: "One", example: "ഒറ്റ തേങ്ങ (Oru Thenga) - One Coconut" },
  { digit: 2, malScript: "൨", malWord: "രണ്ട്", phonetic: "Randu", meaning: "Two", example: "രണ്ട് ചായ (Randu Chaya) - Two Teas" },
  { digit: 3, malScript: "൩", malWord: "മൂന്ന്", phonetic: "Moonnu", meaning: "Three", example: "മൂന്ന് കായൽ (Moonnu Kayal) - Three Backwaters" },
  { digit: 4, malScript: "൪", malWord: "നാല്", phonetic: "Naalu", meaning: "Four", example: "നാല് വള്ളം (Naalu Vallam) - Four Boats" },
  { digit: 5, malScript: "൫", malWord: "അഞ്ച്", phonetic: "Anju", meaning: "Five", example: "അഞ്ച് പൂക്കൾ (Anju Pookkal) - Five Flowers" },
  { digit: 6, malScript: "൬", malWord: "ആറ്", phonetic: "Aaru", meaning: "Six", example: "ആറ് മീനുകൾ (Aaru Meenukal) - Six Fishes" },
  { digit: 7, malScript: "൭", malWord: "ഏഴ്", phonetic: "Ezhu", meaning: "Seven", example: "ഏഴ് മലകൾ (Ezhu Malakal) - Seven Hills" },
  { digit: 8, malScript: "൮", malWord: "എട്ട്", phonetic: "Ettu", meaning: "Eight", example: "എട്ട് കുടകൾ (Ettu Kudakal) - Eight Umbrellas" },
  { digit: 9, malScript: "൯", malWord: "ഒൻപത്", phonetic: "Onpathu", meaning: "Nine", example: "ഒൻപത് തെങ്ങുകൾ (Onpathu Thengukal) - Nine Palm Trees" },
  { digit: 10, malScript: "൧൦", malWord: "പത്ത്", phonetic: "Pathu", meaning: "Ten", example: "പത്ത് രൂപ (Pathu Roopa) - Ten Rupees" },
  { digit: 20, malScript: "൨൦", malWord: "ഇരുപത്", phonetic: "Irupathu", meaning: "Twenty", example: "ഇരുപത് തോണികൾ (Irupathu Thonikal) - Twenty Canoes" },
  { digit: 50, malScript: "൫൦", malWord: "അൻപത്", phonetic: "Anpathu", meaning: "Fifty", example: "അൻപത് വർഷങ്ങൾ (Anpathu Varshangal) - Fifty Years" },
  { digit: 100, malScript: "൧൦൦", malWord: "നൂറ്", phonetic: "Nooru", meaning: "One Hundred", example: "നൂറ് ശതമാനം (Nooru Shathamanam) - Hundred Percent" },
  { digit: 1000, malScript: "൧൦൦൦", malWord: "ആയിരം", phonetic: "Aayiram", meaning: "One Thousand", example: "ആയിരം കനവുകൾ (Aayiram Kanavukal) - Thousand Dreams" }
];

export default function MalayalamNumbers() {
  const [activeTab, setActiveTab] = useState<"chart" | "game">("chart");
  const [speechActive, setSpeechActive] = useState<number | null>(null);

  // Game state
  const [gameScore, setGameScore] = useState(0);
  const [gameAttempts, setGameAttempts] = useState(0);
  const [targetNumber, setTargetNumber] = useState<NumberItem>(MALAYALAM_NUMBERS[1]);
  const [choices, setChoices] = useState<NumberItem[]>([]);
  const [answerStatus, setAnswerStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [questionType, setQuestionType] = useState<"script-to-digit" | "word-to-digit">("script-to-digit");

  const speakMalayalam = (text: string, id: number) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ml-IN"; // Malayalam voice synthesis
      utterance.rate = 0.85;
      utterance.onstart = () => setSpeechActive(id);
      utterance.onend = () => setSpeechActive(null);
      utterance.onerror = () => setSpeechActive(null);
      window.speechSynthesis.speak(utterance);
    } else {
      // Speak fallback
      setSpeechActive(id);
      setTimeout(() => setSpeechActive(null), 1000);
    }
  };

  const setupNewQuestion = () => {
    const randomTarget = MALAYALAM_NUMBERS[Math.floor(Math.random() * MALAYALAM_NUMBERS.length)];
    setTargetNumber(randomTarget);
    
    // Pick 3 random wrong answers
    const wrongs = MALAYALAM_NUMBERS.filter(n => n.digit !== randomTarget.digit);
    const shuffledWrongs = wrongs.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Combine and shuffle choices
    const allChoices = [randomTarget, ...shuffledWrongs].sort(() => 0.5 - Math.random());
    setChoices(allChoices);
    setAnswerStatus("idle");
    setSelectedChoice(null);
    setQuestionType(Math.random() > 0.5 ? "script-to-digit" : "word-to-digit");
  };

  const handleChoiceClick = (choice: NumberItem) => {
    if (answerStatus !== "idle") return;
    
    setSelectedChoice(choice.digit);
    setGameAttempts(prev => prev + 1);

    if (choice.digit === targetNumber.digit) {
      setAnswerStatus("correct");
      setGameScore(prev => prev + 1);
    } else {
      setAnswerStatus("incorrect");
    }
  };

  // Start game for first time
  useState(() => {
    setupNewQuestion();
  });

  return (
    <div className="w-full text-left" id="malayalam-numbers-page">
      
      {/* Tab switchers */}
      <div className="flex justify-center mb-8 gap-2 bg-slate-100 p-1.5 rounded-full max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("chart")}
          className={`flex-1 py-2 px-4 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
            activeTab === "chart"
              ? "bg-white text-purple-900 shadow-sm font-black"
              : "text-slate-500 hover:text-slate-950"
          }`}
        >
          Numbers Grid & Audio
        </button>
        <button
          onClick={() => {
            setActiveTab("game");
            setupNewQuestion();
          }}
          className={`flex-1 py-2 px-4 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
            activeTab === "game"
              ? "bg-white text-purple-900 shadow-sm font-black"
              : "text-slate-500 hover:text-slate-950"
          }`}
        >
          Match-the-Number Game
        </button>
      </div>

      {activeTab === "chart" ? (
        <div className="space-y-8" id="numbers-chart-view">
          {/* Visual Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MALAYALAM_NUMBERS.map((num) => (
              <div
                key={num.digit}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Traditional Numeral watermarked in background */}
                <div className="absolute right-2 top-0 text-7xl font-bold text-slate-50 select-none group-hover:scale-115 transition-transform duration-300">
                  {num.malScript}
                </div>

                <div className="z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-purple-900">{num.digit}</span>
                    <span className="text-2xl font-semibold text-pink-600 font-sans">{num.malScript}</span>
                  </div>

                  <div className="mt-4 text-left">
                    <h3 className="text-lg font-black text-slate-800">{num.malWord}</h3>
                    <p className="text-xs font-mono font-medium text-slate-400 mt-0.5 italic">{num.phonetic}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold">
                      {num.meaning}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 z-10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-medium truncate max-w-[120px]" title={num.example}>
                    {num.example.split(" - ")[0]}
                  </span>
                  <button
                    onClick={() => speakMalayalam(num.malWord, num.digit)}
                    className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                      speechActive === num.digit
                        ? "bg-pink-600 text-white border-pink-600 animate-pulse"
                        : "bg-slate-50 text-slate-500 hover:text-purple-700 hover:bg-purple-50 border-slate-100"
                    }`}
                    title="Listen to Malayalam pronunciation"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick learning card */}
          <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl mt-8">
            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 flex items-center justify-center text-[250px] font-black italic select-none">
              ൧
            </div>
            <div className="max-w-2xl relative z-10 text-left">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                Did You Know?
              </h2>
              <p className="text-xs text-purple-200 mt-2 leading-relaxed">
                Traditional Malayalam numerals have their own unique glyphs resembling standard symbols. Although standard Arabic numerals (1, 2, 3...) are commonly used in modern times, you will still find traditional numerals on old manuscripts, festival banners, and historic landmarks throughout Kerala!
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono">
                <div>
                  <span className="text-purple-300 block">1 in Malayalam:</span>
                  <span className="font-bold text-base text-white">൧ (Onnu)</span>
                </div>
                <div>
                  <span className="text-purple-300 block">5 in Malayalam:</span>
                  <span className="font-bold text-base text-white">൫ (Anju)</span>
                </div>
                <div>
                  <span className="text-purple-300 block">10 in Malayalam:</span>
                  <span className="font-bold text-base text-white">൧൦ (Pathu)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Game View */
        <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-3xl p-6 shadow-md text-center relative overflow-hidden" id="numbers-game-view">
          
          {/* Progress bar and stats */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 text-left">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Game Score</span>
              <span className="text-sm font-extrabold text-slate-800">{gameScore} / {gameAttempts} correct</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-800 border border-yellow-200/60 rounded-full text-[11px] font-black">
              <Trophy className="w-3.5 h-3.5" />
              <span>Streak Level</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={targetNumber.digit}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Question bubble */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative">
                <span className="text-[10px] font-extrabold text-purple-700 uppercase tracking-widest block mb-1">
                  Identify this Malayalam Number:
                </span>
                
                {questionType === "script-to-digit" ? (
                  <h2 className="text-6xl font-black text-pink-600 py-3 font-sans">
                    {targetNumber.malScript}
                  </h2>
                ) : (
                  <h2 className="text-3xl font-black text-purple-950 py-3">
                    {targetNumber.malWord}
                  </h2>
                )}
                
                <p className="text-[11px] text-slate-400 font-mono mt-1 italic">
                  {questionType === "script-to-digit" ? "Malayalam Numeral Script" : "Malayalam Number Word"}
                </p>

                <button
                  type="button"
                  onClick={() => speakMalayalam(targetNumber.malWord, 999)}
                  className={`absolute right-4 bottom-4 p-2 rounded-full border transition-all cursor-pointer ${
                    speechActive === 999 ? "bg-pink-600 text-white border-pink-600" : "bg-white hover:bg-purple-50 text-slate-500 border-slate-200"
                  }`}
                  title="Listen to pronunciation clue"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Multiple Choice Grid */}
              <div className="grid grid-cols-2 gap-3">
                {choices.map((choice) => {
                  const isSelected = selectedChoice === choice.digit;
                  const isCorrectAnswer = choice.digit === targetNumber.digit;
                  
                  let btnStyle = "bg-white border-slate-200 text-slate-800 hover:bg-slate-50";
                  if (answerStatus !== "idle") {
                    if (isCorrectAnswer) {
                      btnStyle = "bg-emerald-500 border-transparent text-white font-extrabold";
                    } else if (isSelected) {
                      btnStyle = "bg-red-500 border-transparent text-white font-extrabold";
                    } else {
                      btnStyle = "bg-white border-slate-100 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={choice.digit}
                      onClick={() => handleChoiceClick(choice)}
                      disabled={answerStatus !== "idle"}
                      className={`py-3.5 px-4 rounded-xl border text-sm font-black transition-all cursor-pointer ${btnStyle}`}
                    >
                      {choice.digit} <span className="font-normal text-xs text-opacity-80">({choice.meaning})</span>
                    </button>
                  );
                })}
              </div>

              {/* feedback panel */}
              {answerStatus !== "idle" && (
                <div className="pt-4 animate-fade-in text-left">
                  <div className={`p-4 rounded-2xl border ${
                    answerStatus === "correct" 
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
                      : "bg-red-50 border-red-200 text-red-900"
                  }`}>
                    <div className="flex items-start gap-2">
                      <Award className={`w-5 h-5 shrink-0 ${answerStatus === "correct" ? "text-emerald-600" : "text-red-500"}`} />
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider">
                          {answerStatus === "correct" ? "Correct! നന്നായിരിക്കുന്നു (Well Done!) ✨" : "Incorrect! ശ്രമിക്കൂ (Try Again)"}
                        </h4>
                        <p className="text-xs mt-1 opacity-90">
                          <span className="font-bold">{targetNumber.digit}</span> is written as <span className="font-bold">{targetNumber.malScript}</span> in Malayalam and called <span className="font-bold">{targetNumber.malWord}</span> ({targetNumber.phonetic}).
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={setupNewQuestion}
                    className="w-full mt-4 py-3 bg-purple-950 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-purple-900 transition-all cursor-pointer"
                  >
                    Next Number
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

    </div>
  );
}
