/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Keyboard, GraduationCap, ArrowRight, Film, Hash, BookOpen, ShieldCheck, Gamepad2, MessageCircle } from "lucide-react";

interface ProductPathwaysProps {
  onNavigate: (path: string) => void;
}

export default function ProductPathways({ onNavigate }: ProductPathwaysProps) {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto text-left" id="product-pathways">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 text-[11px] font-black tracking-widest uppercase inline-block mb-2">
          Explore Vamozhi Platform
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#545454] dark:text-white tracking-tight">
          Three Pathways for Every Malayalam Creator
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-normal">
          Whether you want to create viral captions, type phonetically in Malayalam, or master the script.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        
        {/* 1. CREATE PATHWAY */}
        <div className="bg-white dark:bg-neutral-900 border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/50 flex items-center justify-center text-pink-600 mb-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#545454] dark:text-white mb-2 tracking-tight">
              1. Create
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
              Generate original Malayalam captions, Reel hooks, content ideas, bios, and hashtags.
            </p>
            
            <ul className="space-y-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                <button onClick={() => onNavigate("/malayalam-caption-generator")} className="hover:text-purple-700 dark:hover:text-purple-300 text-left cursor-pointer">
                  Captions & Quotes
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Film className="w-4 h-4 text-purple-500 shrink-0" />
                <button onClick={() => onNavigate("/malayalam-reel-hooks")} className="hover:text-purple-700 dark:hover:text-purple-300 text-left cursor-pointer">
                  Reel Hooks & Content Ideas
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-amber-500 shrink-0" />
                <button onClick={() => onNavigate("/malayalam-hashtags")} className="hover:text-purple-700 dark:hover:text-purple-300 text-left cursor-pointer">
                  Hashtag Generator
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                <button onClick={() => onNavigate("/malayalam-instagram-bio")} className="hover:text-purple-700 dark:hover:text-purple-300 text-left cursor-pointer">
                  Instagram Bio Generator
                </button>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onNavigate("/malayalam-caption-generator")}
            className="mt-6 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Start Creating</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2. WRITE PATHWAY */}
        <div className="bg-white dark:bg-neutral-900 border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 mb-5 group-hover:scale-110 transition-transform">
              <Keyboard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#545454] dark:text-white mb-2 tracking-tight">
              2. Write
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
              Type Manglish to Malayalam instantly with live output and search 190,000+ dictionary terms.
            </p>

            <ul className="space-y-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-purple-600 shrink-0" />
                <button onClick={() => onNavigate("/manglish-to-malayalam")} className="hover:text-purple-700 dark:hover:text-purple-300 text-left cursor-pointer">
                  Manglish to Malayalam Typing
                </button>
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                <button onClick={() => onNavigate("/malayalam-dictionary")} className="hover:text-purple-700 dark:hover:text-purple-300 text-left cursor-pointer">
                  Malayalam Dictionary & Search
                </button>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onNavigate("/manglish-to-malayalam")}
            className="mt-6 w-full py-3 px-4 bg-purple-950 hover:bg-purple-900 text-white text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Start Writing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3. LEARN PATHWAY */}
        <div className="bg-white dark:bg-neutral-900 border border-slate-200/90 dark:border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#545454] dark:text-white mb-2 tracking-tight">
              3. Learn
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
              Master the Malayalam alphabet, numbers, phrases, games, and earn an official certificate.
            </p>

            <ul className="space-y-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
                <button onClick={() => onNavigate("/learn-malayalam")} className="hover:text-amber-700 text-left cursor-pointer">
                  Alphabet & Pronunciation
                </button>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <button onClick={() => onNavigate("/learn-malayalam")} className="hover:text-amber-700 text-left cursor-pointer">
                  Phrases & Daily Conversation
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <button onClick={() => onNavigate("/learn-malayalam")} className="hover:text-amber-700 text-left cursor-pointer">
                  Games & Interactive Quizzes
                </button>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <button onClick={() => onNavigate("/learn-malayalam")} className="hover:text-amber-700 text-left cursor-pointer">
                  Official Certification Exam
                </button>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onNavigate("/learn-malayalam")}
            className="mt-6 w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
