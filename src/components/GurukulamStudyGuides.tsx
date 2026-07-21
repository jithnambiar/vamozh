/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Volume2, 
  Compass, 
  Landmark, 
  Award, 
  History, 
  TreePalm, 
  ScrollText,
  Lightbulb,
  CheckCircle2,
  Layers,
  FileCode2,
  Hash,
  Users,
  Calendar,
  Languages
} from "lucide-react";

export default function GurukulamStudyGuides() {
  const [activeGuide, setActiveGuide] = useState<"beginner" | "intermediate" | "expert" | "advanced">("beginner");
  const [speakActive, setSpeakActive] = useState<string | null>(null);

  const speakMalayalam = (text: string, id: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ml-IN";
      utterance.rate = 0.85;
      utterance.onstart = () => setSpeakActive(id);
      utterance.onend = () => setSpeakActive(null);
      utterance.onerror = () => setSpeakActive(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-10 text-left w-full mx-auto" id="gurukulam-study-materials">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 rounded-[32px] p-6 sm:p-10 text-white shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <span className="px-4 py-1.5 bg-amber-400/20 text-amber-300 rounded-full text-xs font-black uppercase tracking-widest border border-amber-400/30 inline-block">
            Vamozhi Online Academy • Curriculum 🌐
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Complete Malayalam Study System (ദ്വിഭാഷാ പഠന രീതി)
          </h2>
          <p className="text-sm text-purple-200 leading-relaxed font-medium">
            Detailed explanations in both <strong>Malayalam (മലയാളം)</strong> and <strong>English</strong> for every topic, alphabet, grammar rule, and concept!
          </p>
        </div>

        {/* Level Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/15 w-full lg:w-auto">
          <button
            onClick={() => setActiveGuide("beginner")}
            className={`flex-1 lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
              activeGuide === "beginner"
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-purple-200 hover:text-white hover:bg-white/10"
            }`}
          >
            🟢 Basic (പ്രാരംഭം)
          </button>
          <button
            onClick={() => setActiveGuide("intermediate")}
            className={`flex-1 lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
              activeGuide === "intermediate"
                ? "bg-teal-600 text-white shadow-lg"
                : "text-purple-200 hover:text-white hover:bg-white/10"
            }`}
          >
            🔵 Intermediate (ഇടത്തരം)
          </button>
          <button
            onClick={() => setActiveGuide("expert")}
            className={`flex-1 lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
              activeGuide === "expert"
                ? "bg-blue-600 text-white shadow-lg"
                : "text-purple-200 hover:text-white hover:bg-white/10"
            }`}
          >
            🟣 Advanced (ഉന്നതം)
          </button>
          <button
            onClick={() => setActiveGuide("advanced")}
            className={`flex-1 lg:flex-initial px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
              activeGuide === "advanced"
                ? "bg-pink-600 text-white shadow-lg"
                : "text-purple-200 hover:text-white hover:bg-white/10"
            }`}
          >
            🔴 Expert Grammar (വിദഗ്ദ്ധം)
          </button>
        </div>
      </div>

      {/* LEVEL 1: BASIC VOWELS, NUMBERS & VOCABULARY */}
      {activeGuide === "beginner" && (
        <div className="bg-white dark:bg-neutral-950 border-2 border-slate-200/80 dark:border-neutral-800 rounded-[32px] p-6 sm:p-10 space-y-10 shadow-sm">
          
          <div className="border-b border-slate-100 dark:border-neutral-800 pb-6 space-y-3">
            <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-950 font-black text-xs uppercase tracking-widest rounded-full inline-block">
              Basic Module 1 • പ്രാരംഭ പാഠങ്ങൾ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Swarangal (സ്വരാക്ഷരങ്ങൾ), Numbers 1-20 & Everyday Words
            </h3>
            
            {/* Bilingual Explanation Box */}
            <div className="p-5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 rounded-2xl space-y-2">
              <div className="flex items-start gap-3">
                <Languages className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                  <p className="font-bold text-emerald-950 dark:text-emerald-300">
                    <strong>മലയാളം വിവരണം:</strong> സ്വരാക്ഷരങ്ങൾ എന്നാൽ മറ്റ് അക്ഷരങ്ങളുടെ സഹായമില്ലാതെ സ്വതന്ത്രമായി ഉച്ചരിക്കാൻ കഴിയുന്ന ധ്വനികളാണ്. മലയാളത്തിൽ ആകെ 16 സ്വരാക്ഷരങ്ങളുണ്ട്. കൂടാതെ അടിസ്ഥാന സംഖ്യകളും (1-20) അവയുടെ പ്രയോഗവും ഈ പാഠത്തിൽ പഠിക്കാം.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    <strong>English Explanation:</strong> Swarangal (Vowels) are speech sounds produced without any obstruction in the vocal tract and can be pronounced independently. There are 16 vowels in Malayalam. This module also introduces numbers 1 to 20 with phonetic guides.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vowels Grid */}
          <div className="space-y-5">
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              1. The 16 Malayalam Swarangal (സ്വരാക്ഷരങ്ങൾ)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                { mal: "അ", phon: "A", ex: "അമ്മ (Mother)", descMl: "ഹ്രസ്വ സ്വരം", descEn: "Short 'A' sound" },
                { mal: "ആ", phon: "AA", ex: "ആന (Elephant)", descMl: "ദീർഘ സ്വരം", descEn: "Long 'AA' sound" },
                { mal: "ഇ", phon: "I", ex: "ഇല (Leaf)", descMl: "ഹ്രസ്വ സ്വരം", descEn: "Short 'I' sound" },
                { mal: "ഈ", phon: "EE", ex: "ഈച്ച (Fly)", descMl: "ദീർഘ സ്വരം", descEn: "Long 'EE' sound" },
                { mal: "ഉ", phon: "U", ex: "ഉറുമ്പ് (Ant)", descMl: "ഹ്രസ്വ സ്വരം", descEn: "Short 'U' sound" },
                { mal: "ഊ", phon: "OO", ex: "ഊഞ്ഞാൽ (Swing)", descMl: "ദീർഘ സ്വരം", descEn: "Long 'OO' sound" },
                { mal: "ഋ", phon: "RU", ex: "ഋഷി (Sage)", descMl: "മൂർദ്ധന്യ സ്വരം", descEn: "Vocalic 'RU' sound" },
                { mal: "എ", phon: "E", ex: "എലി (Rat)", descMl: "ഹ്രസ്വ സ്വരം", descEn: "Short 'E' sound" },
                { mal: "ഏ", phon: "AE", ex: "ഏണി (Ladder)", descMl: "ദീർഘ സ്വരം", descEn: "Long 'AE' sound" },
                { mal: "ഐ", phon: "AI", ex: "ഐസ് (Ice)", descMl: "സന്ധ്യക്ഷരം", descEn: "Diphthong 'AI' sound" },
                { mal: "ഒ", phon: "O", ex: "ഒട്ടകം (Camel)", descMl: "ഹ്രസ്വ സ്വരം", descEn: "Short 'O' sound" },
                { mal: "ഓ", phon: "OA", ex: "ഓടം (Boat)", descMl: "ദീർഘ സ്വരം", descEn: "Long 'OA' sound" },
                { mal: "ഔ", phon: "OU", ex: "ഔഷധം (Medicine)", descMl: "സന്ധ്യക്ഷരം", descEn: "Diphthong 'OU' sound" },
                { mal: "അം", phon: "AM", ex: "അംബരം (Sky)", descMl: "അനുസ്വാരം", descEn: "Nasal M sound" },
                { mal: "അഃ", phon: "AH", ex: "അന്തഃകരണം", descMl: "വിസർഗ്ഗം", descEn: "Visargam aspiration sound" },
                { mal: "ൠ", phon: "RUU", ex: "ൠകാരം", descMl: "ദീർഘ ഋകാരം", descEn: "Long vocalic RUU sound" }
              ].map((item, i) => (
                <div key={i} className="p-5 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-3xl font-black text-purple-950 dark:text-purple-300 font-sans block">{item.mal}</span>
                      <span className="text-xs font-mono font-bold text-slate-500 block">/{item.phon}/</span>
                    </div>
                    <button
                      onClick={() => speakMalayalam(item.mal, `vowel_${i}`)}
                      className="p-2 rounded-full text-slate-400 hover:text-emerald-700 hover:bg-white dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1 border-t border-emerald-100 dark:border-emerald-900/40 pt-3">
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white block">{item.ex}</span>
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 block">{item.descMl}</span>
                    <span className="text-xs text-slate-500 block">{item.descEn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Numbers 1-20 */}
          <div className="space-y-5 pt-6 border-t border-slate-100 dark:border-neutral-800">
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Hash className="w-5 h-5 text-emerald-600" />
              2. Numbers 1 to 20 (അക്കങ്ങളും ഉച്ചാരണവും)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { num: "1", mal: "ഒന്ന്", phon: "Onnu", eng: "One" },
                { num: "2", mal: "രണ്ട്", phon: "Randu", eng: "Two" },
                { num: "3", mal: "മൂന്ന്", phon: "Moonnu", eng: "Three" },
                { num: "4", mal: "നാല്", phon: "Naalu", eng: "Four" },
                { num: "5", mal: "അഞ്ച്", phon: "Anchu", eng: "Five" },
                { num: "6", mal: "ആറ്", phon: "Aaru", eng: "Six" },
                { num: "7", mal: "ഏഴ്", phon: "Aezhu", eng: "Seven" },
                { num: "8", mal: "എട്ട്", phon: "Ettu", eng: "Eight" },
                { num: "9", mal: "ഒൻപത്", phon: "Onpathu", eng: "Nine" },
                { num: "10", mal: "പത്ത്", phon: "Pathu", eng: "Ten" },
                { num: "11", mal: "പതിനൊന്ന്", phon: "Pathinonnu", eng: "Eleven" },
                { num: "12", mal: "പന്ത്രണ്ട്", phon: "Panthrandu", eng: "Twelve" },
                { num: "13", mal: "പതിമൂന്ന്", phon: "Pathimoonnu", eng: "Thirteen" },
                { num: "14", mal: "പതിനാല്", phon: "Pathinaalu", eng: "Fourteen" },
                { num: "15", mal: "പതിനഞ്ച്", phon: "Pathinanchu", eng: "Fifteen" },
                { num: "16", mal: "പതിനാറ്", phon: "Pathinaaru", eng: "Sixteen" },
                { num: "17", mal: "പതിനേഴ്", phon: "Pathinaezhu", eng: "Seventeen" },
                { num: "18", mal: "പതിനെട്ട്", phon: "Pathinettu", eng: "Eighteen" },
                { num: "19", mal: "പത്തൊൻപത്", phon: "Pathonpathu", eng: "Nineteen" },
                { num: "20", mal: "ഇരുപത്", phon: "Irupathu", eng: "Twenty" }
              ].map((n, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-neutral-900 border border-slate-200/70 dark:border-neutral-800 rounded-2xl space-y-1">
                  <div className="flex justify-between items-center text-slate-400 font-mono text-xs font-black">
                    <span>#{n.num}</span>
                    <button onClick={() => speakMalayalam(n.mal, `num_${idx}`)} className="hover:text-emerald-600 transition-colors">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-lg font-black text-purple-950 dark:text-purple-300 font-sans">{n.mal}</div>
                  <div className="text-xs text-slate-500 font-medium">/{n.phon}/</div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold pt-0.5">{n.eng}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 2: INTERMEDIATE VOWEL MARKS, CHILLUS & COMPOUND LETTERS */}
      {activeGuide === "intermediate" && (
        <div className="bg-white dark:bg-neutral-950 border-2 border-slate-200/80 dark:border-neutral-800 rounded-[32px] p-6 sm:p-10 space-y-10 shadow-sm">
          
          <div className="border-b border-slate-100 dark:border-neutral-800 pb-6 space-y-3">
            <span className="px-3.5 py-1.5 bg-teal-100 text-teal-950 font-black text-xs uppercase tracking-widest rounded-full inline-block">
              Intermediate Module 2 • ഇടത്തരം പാഠങ്ങൾ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Vowel Marks (മാത്രകൾ), Chillus (ചില്ലുകൾ) & Compound Letters (കൂട്ടക്ഷരങ്ങൾ)
            </h3>
            
            {/* Bilingual Explanation Box */}
            <div className="p-5 bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900/50 rounded-2xl space-y-2">
              <div className="flex items-start gap-3">
                <Languages className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                  <p className="font-bold text-teal-950 dark:text-teal-300">
                    <strong>മലയാളം വിവരണം:</strong> മാത്രാ ചിഹ്നങ്ങൾ എന്നാൽ വ്യഞ്ജനാക്ഷരങ്ങളോട് സ്വരങ്ങൾ കൂടിച്ചേരുമ്പോൾ രൂപപ്പെടുന്ന ചിഹ്നങ്ങളാണ്. സ്വര സഹായമില്ലാതെ സ്വതന്ത്രമായി നിൽക്കുന്ന ശുദ്ധ വ്യഞ്ജനങ്ങളാണ് ചില്ലക്ഷരങ്ങൾ. രണ്ടോ അതിലധികമോ വ്യഞ്ജനങ്ങൾ ചേരുന്നവയാണ് കൂട്ടക്ഷരങ്ങൾ.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    <strong>English Explanation:</strong> Vowel marks (Diacritics) are visual symbols attached to consonants to change their vowel sound. Chillaksharangal are pure consonant sounds that exist without inherent vowels. Compound consonants (Koottakksharangal) join two or more consonants into single conjunct glyphs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vowel Marks Grid */}
          <div className="space-y-5">
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              1. All 13 Vowel Diacritic Marks (മാത്രാ ചിഹ്നങ്ങളും ഉദാഹരണങ്ങളും)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                { mark: "ാ (Aa-karam)", ex: "ക + ാ = കാ (Kaa)", descMl: "ദീർഘ ആ-കാരം", descEn: "Long AA sound modifier" },
                { mark: "ി (I-karam)", ex: "ക + ി = കി (Ki)", descMl: "ഹ്രസ്വ ഇ-കാരം", descEn: "Short I sound modifier" },
                { mark: "ീ (Ee-karam)", ex: "ക + ീ = കീ (Kee)", descMl: "ദീർഘ ഈ-കാരം", descEn: "Long EE sound modifier" },
                { mark: "ു (U-karam)", ex: "ക + ു = കു (Ku)", descMl: "ഹ്രസ്വ ഉ-കാരം", descEn: "Short U sound modifier" },
                { mark: "ൂ (Oo-karam)", ex: "ക + ൂ = കൂ (Koo)", descMl: "ദീർഘ ഊ-കാരം", descEn: "Long OO sound modifier" },
                { mark: "ൃ (Ru-karam)", ex: "ക + ൃ = കൃ (Kru)", descMl: "ഋ-കാര മാത്രാ ചിഹ്നം", descEn: "Vocalic RU modifier" },
                { mark: "െ (E-karam)", ex: "െ + ക = കെ (Ke)", descMl: "ഹ്രസ്വ എ-കാരം", descEn: "Short E sound modifier" },
                { mark: "േ (Ae-karam)", ex: "േ + ക = കേ (Kae)", descMl: "ദീർഘ ഏ-കാരം", descEn: "Long AE sound modifier" },
                { mark: "ൈ (Ai-karam)", ex: "ൈ + ക = കൈ (Kai)", descMl: "ഐ-കാര മാത്രാ ചിഹ്നം", descEn: "Diphthong AI modifier" },
                { mark: "ൊ (O-karam)", ex: "ൊ + ക = കൊ (Ko)", descMl: "ഹ്രസ്വ ഒ-കാരം", descEn: "Short O sound modifier" },
                { mark: "ോ (Oa-karam)", ex: "ോ + ക = കോ (Koa)", descMl: "ദീർഘ ഓ-കാരം", descEn: "Long OA sound modifier" },
                { mark: "ൌ (Ou-karam)", ex: "ൌ + ക = കൗ (Kau)", descMl: "ഔ-കാര മാത്രാ ചിഹ്നം", descEn: "Diphthong OU modifier" },
                { mark: "ം (Anuswaram)", ex: "ക + ം = കം (Kam)", descMl: "അനുസ്വാര ചിഹ്നം", descEn: "Nasal M sound modifier" }
              ].map((m, idx) => (
                <div key={idx} className="p-4 bg-teal-50/40 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 rounded-2xl space-y-1.5">
                  <strong className="text-teal-950 dark:text-teal-300 text-sm font-black block">{m.mark}</strong>
                  <div className="text-purple-950 dark:text-purple-300 font-bold text-sm">{m.ex}</div>
                  <div className="text-xs font-semibold text-teal-800 dark:text-teal-400">{m.descMl}</div>
                  <div className="text-xs text-slate-500">{m.descEn}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chillaksharangal Grid */}
          <div className="space-y-5 pt-6 border-t border-slate-100 dark:border-neutral-800">
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-teal-600" />
              2. The 6 Chillu Consonants (ചില്ലക്ഷരങ്ങൾ - ശുദ്ധ വ്യഞ്ജനങ്ങൾ)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { chillu: "ൺ", phon: "NN", ex: "കൺ (Kann - Eye)", descMl: "ണ-കാരത്തിന്റെ ചില്ല്", descEn: "Pure retroflex N sound" },
                { chillu: "ൻ", phon: "N", ex: "പൊൻ (Pon - Gold)", descMl: "ന-കാരത്തിന്റെ ചില്ല്", descEn: "Pure dental N sound" },
                { chillu: "ർ", phon: "R", ex: "മലർ (Malar - Flower)", descMl: "ര-കാരത്തിന്റെ ചില്ല്", descEn: "Pure R sound" },
                { chillu: "ൽ", phon: "L", ex: "പാൽ (Paal - Milk)", descMl: "ല-കാരത്തിന്റെ ചില്ല്", descEn: "Pure L sound" },
                { chillu: "ൾ", phon: "LL", ex: "വാൾ (Vaal - Sword)", descMl: "ള-കാരത്തിന്റെ ചില്ല്", descEn: "Pure retroflex L sound" },
                { chillu: "ൿ", phon: "K", ex: "വാൿ (Vaak - Speech)", descMl: "ക-കാരത്തിന്റെ ചില്ല്", descEn: "Pure K sound" }
              ].map((c, idx) => (
                <div key={idx} className="p-5 bg-slate-50 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-3xl font-black text-purple-950 dark:text-purple-300 font-sans block">{c.chillu}</span>
                    <span className="text-xs font-mono text-slate-500 font-bold">/{c.phon}/</span>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-200 block">{c.ex}</span>
                    <span className="text-xs text-teal-700 dark:text-teal-400 block font-semibold">{c.descMl}</span>
                  </div>
                  <button onClick={() => speakMalayalam(c.chillu, `chillu_${idx}`)} className="p-2 text-slate-400 hover:text-teal-700 transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 3: EXPERT CONSONANT VARGAS, FAMILY RELATIONS */}
      {activeGuide === "expert" && (
        <div className="bg-white dark:bg-neutral-950 border-2 border-slate-200/80 dark:border-neutral-800 rounded-[32px] p-6 sm:p-10 space-y-10 shadow-sm">
          
          <div className="border-b border-slate-100 dark:border-neutral-800 pb-6 space-y-3">
            <span className="px-3.5 py-1.5 bg-blue-100 text-blue-950 font-black text-xs uppercase tracking-widest rounded-full inline-block">
              Advanced Module 3 • ഉന്നത പാഠങ്ങൾ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              5 Consonant Vargas (വർഗ്ഗാക്ഷരങ്ങൾ) & Family Relations (കുടുംബ ബന്ധങ്ങൾ)
            </h3>
            
            {/* Bilingual Explanation Box */}
            <div className="p-5 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 rounded-2xl space-y-2">
              <div className="flex items-start gap-3">
                <Languages className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                  <p className="font-bold text-blue-950 dark:text-blue-300">
                    <strong>മലയാളം വിവരണം:</strong> വായുടെ ഉള്ളിൽ ശബ്ദം ഉൽപ്പാദിപ്പിക്കപ്പെടുന്ന സ്ഥാനത്തെ അടിസ്ഥാനമാക്കി 25 വ്യഞ്ജനാക്ഷരങ്ങളെ 5 വർഗ്ഗങ്ങളായി തിരിച്ചിരിക്കുന്നു (ക, ച, ട, ത, പ). കൂടാതെ കേരളത്തിലെ കുടുംബ ബന്ധങ്ങളുടെ പരമ്പരാഗത പദപ്രയോഗങ്ങളും ഇതിൽ ഉൾക്കൊള്ളുന്നു.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    <strong>English Explanation:</strong> Consonants are scientifically grouped into 5 phonetic families (Vargas) of 5 letters each based on point of vocal articulation (throat, palate, teeth, lips). This module also covers cultural family relationship terminology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consonant Vargas Grid */}
          <div className="space-y-5">
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Landmark className="w-5 h-5 text-blue-600" />
              1. The 5 Consonant Vargas (വർഗ്ഗാക്ഷരങ്ങൾ - 25 Categorized Consonants)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl space-y-2">
                <strong className="text-blue-950 dark:text-blue-300 text-sm font-black block">1. ക-വർഗ്ഗം (Ka-Vargam • കണ്ട്യം - Guttural):</strong>
                <div className="text-base font-black text-purple-950 dark:text-purple-300">ക (Ka), ഖ (Kha), ഗ (Ga), ഘ (Gha), ങ (Nga)</div>
                <p className="text-xs text-slate-700 dark:text-slate-300"><strong>മലയാളം:</strong> തൊണ്ടയിൽ നിന്നു ഉച്ചരിക്കുന്ന ശബ്ദങ്ങൾ (ഉദാ: കടൽ, ഗംഗ).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Produced at the throat / back of tongue.</p>
              </div>
              <div className="p-5 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl space-y-2">
                <strong className="text-blue-950 dark:text-blue-300 text-sm font-black block">2. ച-വർഗ്ഗം (Cha-Vargam • താലവ്യം - Palatal):</strong>
                <div className="text-base font-black text-purple-950 dark:text-purple-300">ച (Cha), ഛ (Chha), ജ (Ja), ഝ (Jha), ഞ (Nja)</div>
                <p className="text-xs text-slate-700 dark:text-slate-300"><strong>മലയാളം:</strong> അണ്ണാക്കിൽ നാക്ക് തൊട്ട് ഉച്ചരിക്കുന്നവ (ഉദാ: ചന്ദ്രൻ, ജലം).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Tongue touches the hard palate roof.</p>
              </div>
              <div className="p-5 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl space-y-2">
                <strong className="text-blue-950 dark:text-blue-300 text-sm font-black block">3. ട-വർഗ്ഗം (Ta-Vargam • മൂർദ്ധന്യം - Retroflex):</strong>
                <div className="text-base font-black text-purple-950 dark:text-purple-300">ട (Ta), ഠ (Tha), ഡ (Da), ഢ (Dha), ണ (Na)</div>
                <p className="text-xs text-slate-700 dark:text-slate-300"><strong>മലയാളം:</strong> നാക്ക് മടക്കി മേലണ്ണാക്കിൽ ഉച്ചരിക്കുന്നവ (ഉദാ: കുട, മണി).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Tongue curls backward against roof of mouth.</p>
              </div>
              <div className="p-5 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl space-y-2">
                <strong className="text-blue-950 dark:text-blue-300 text-sm font-black block">4. ത-വർഗ്ഗം (Tha-Vargam • ദന്ത്യം - Dental):</strong>
                <div className="text-base font-black text-purple-950 dark:text-purple-300">ത (Tha), ഥ (Thha), ദ (Da), ധ (Dha), ന (Na)</div>
                <p className="text-xs text-slate-700 dark:text-slate-300"><strong>മലയാളം:</strong> നാക്ക് മുൻപല്ലുകളിൽ തൊട്ട് ഉച്ചരിക്കുന്നവ (ഉദാ: താമര, ദീപം).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Tip of tongue touches upper front teeth.</p>
              </div>
              <div className="p-5 md:col-span-2 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl space-y-2">
                <strong className="text-blue-950 dark:text-blue-300 text-sm font-black block">5. പ-വർഗ്ഗം (Pa-Vargam • ഓഷ്ഠ്യം - Labial):</strong>
                <div className="text-base font-black text-purple-950 dark:text-purple-300">പ (Pa), ഫ (Pha), ബ (Ba), ഭ (Bha), മ (Ma)</div>
                <p className="text-xs text-slate-700 dark:text-slate-300"><strong>മലയാളം:</strong> ചുണ്ടുകൾ തമ്മിൽ കൂട്ടിമുട്ടിച്ച് ഉച്ചരിക്കുന്നവ (ഉദാ: പാട്ട്, ഭാരതം, മരം).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Produced by closing both lips together.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 4: EXPERT GRAMMAR, VIBHAKTHIKAL & SANDHI RULES */}
      {activeGuide === "advanced" && (
        <div className="bg-white dark:bg-neutral-950 border-2 border-slate-200/80 dark:border-neutral-800 rounded-[32px] p-6 sm:p-10 space-y-10 shadow-sm">
          
          <div className="border-b border-slate-100 dark:border-neutral-800 pb-6 space-y-3">
            <span className="px-3.5 py-1.5 bg-pink-100 text-pink-950 font-black text-xs uppercase tracking-widest rounded-full inline-block">
              Expert Module 4 • വിദഗ്ദ്ധ വ്യാകരണ പാഠങ്ങൾ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Complete Malayalam Grammar: 7 Vibhakthikal (വിഭക്തികൾ) & 4 Sandhi Rules (സന്ധി)
            </h3>
            
            {/* Bilingual Explanation Box */}
            <div className="p-5 bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/80 dark:border-pink-900/50 rounded-2xl space-y-2">
              <div className="flex items-start gap-3">
                <Languages className="w-5 h-5 text-pink-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                  <p className="font-bold text-pink-950 dark:text-pink-300">
                    <strong>മലയാളം വിവരണം:</strong> നാമ പദങ്ങൾക്ക് വാക്യത്തിലെ മറ്റ് പദങ്ങളുമായുള്ള ബന്ധത്തെ വ്യക്തമാക്കാൻ ചേർക്കുന്ന പ്രത്യയങ്ങളാണ് വിഭക്തികൾ. രണ്ടു വാക്കുകൾ കൂടിച്ചേരുമ്പോൾ ഉണ്ടാകുന്ന ശബ്ദ വ്യതിയാന നിയമങ്ങളാണ് സന്ധി.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    <strong>English Explanation:</strong> Vibhakthikal are the 7 grammatical noun case suffixes indicating a noun's role in a sentence (Subject, Accusative, Dative, Locative, etc.). Sandhi rules govern euphonic phonetic mutations when merging adjacent words.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 7 Noun Cases (വിഭക്തികൾ) */}
          <div className="space-y-5">
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-pink-600" />
              1. The 7 Grammatical Noun Cases (ഏഴ് വിഭക്തികൾ - Vibhakthikal)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 bg-pink-50/40 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40 rounded-2xl space-y-2">
                <strong className="text-pink-950 dark:text-pink-300 text-sm font-black block">1. നിർദ്ദേശിക (Nominative Case • കർത്താവ്):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> വാക്യത്തിലെ കർത്താവ് (ഉദാ: രാമൻ വനത്തിൽ പോയി).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Unmarked Subject of sentence (e.g. Raman went to forest).</p>
              </div>
              <div className="p-5 bg-pink-50/40 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40 rounded-2xl space-y-2">
                <strong className="text-pink-950 dark:text-pink-300 text-sm font-black block">2. പ്രതിഗ്രാഹിക (Accusative Case • Suffix: എ):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> കർമ്മ പദം (ഉദാ: രാമനെ കണ്ടു).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Direct object marker ending in 'e' (e.g. Saw Raman).</p>
              </div>
              <div className="p-5 bg-pink-50/40 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40 rounded-2xl space-y-2">
                <strong className="text-pink-950 dark:text-pink-300 text-sm font-black block">3. സംയോജിക (Sociative Case • Suffix: ഓട്):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> കൂടെ/ഒപ്പം കാണിക്കുന്നവ (ഉദാ: രാമനോട് സംസാരിച്ചു).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Association marker 'odu' (e.g. Spoke with Raman).</p>
              </div>
              <div className="p-5 bg-pink-50/40 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40 rounded-2xl space-y-2">
                <strong className="text-pink-950 dark:text-pink-300 text-sm font-black block">4. ഉദ്ദേശിക (Dative Case • Suffix: ക്ക്/ന്/ആയി):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> ഉദ്ദേശിക്കുന്ന ആൾക്ക് (ഉദാ: രാമന് കൊടുത്തു).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Recipient/Target marker 'ku/nu' (e.g. Gave to Raman).</p>
              </div>
              <div className="p-5 bg-pink-50/40 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40 rounded-2xl space-y-2">
                <strong className="text-pink-950 dark:text-pink-300 text-sm font-black block">5. പ്രയോജിക (Instrumental Case • Suffix: ആൽ):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> കാരണം/ഉപകരണം (ഉദാ: രാമനാൽ ചെയ്യപ്പെട്ടു).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Instrument/By marker 'aal' (e.g. Done by Raman).</p>
              </div>
              <div className="p-5 bg-pink-50/40 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40 rounded-2xl space-y-2">
                <strong className="text-pink-950 dark:text-pink-300 text-sm font-black block">6. ബന്ധിക (Genitive Case • Suffix: ഉടെ/ന്റെ):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> ഉടമസ്ഥത (ഉദാ: രാമന്റെ വീട്).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Possession marker 'nte/ude' (e.g. Raman's house).</p>
              </div>
              <div className="p-5 md:col-span-2 bg-pink-50/40 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40 rounded-2xl space-y-2">
                <strong className="text-pink-950 dark:text-pink-300 text-sm font-black block">7. ആധാരിക (Locative Case • Suffix: ഇൽ):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> സ്ഥലം/അകത്ത് (ഉദാ: വനത്തിൽ വസിക്കുന്നു).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> Location marker 'il' (e.g. Residing in forest).</p>
              </div>
            </div>
          </div>

          {/* Sandhi Rules */}
          <div className="space-y-5 pt-6 border-t border-slate-100 dark:border-neutral-800">
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-purple-700" />
              2. The 4 Sandhi Combination Rules (നാല് സന്ധി നിയമങ്ങൾ)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl space-y-2">
                <strong className="text-purple-950 dark:text-purple-300 text-sm font-black block">1. ആഗമസന്ധി (Augmentation):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> പുതിയൊരു അക്ഷരം ഇടയിൽ വരുന്നു (ഉദാ: തിരു + ഓണം = തിരുവോണം ['വ' ആഗമം]).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> A new glide consonant appears between merging vowels.</p>
              </div>
              <div className="p-5 bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl space-y-2">
                <strong className="text-purple-950 dark:text-purple-300 text-sm font-black block">2. ലോപസന്ധി (Elision):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> ഒരു അക്ഷരം ലോപിച്ചു (ഇല്ലാതായി) പോകുന്നു (ഉദാ: വന്ന് + ഇരുന്നു = വന്നിരുന്നു ['ഉ' ലോപം]).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> A preceding vowel sound drops out during combination.</p>
              </div>
              <div className="p-5 bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl space-y-2">
                <strong className="text-purple-950 dark:text-purple-300 text-sm font-black block">3. ആദേശസന്ധി (Substitution):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> ഒരു അക്ഷരത്തിന് പകരം വേറൊരു അക്ഷരം വരുന്നു (ഉദാ: കണ് + നീര് = കണ്ണീര് ['ന്' പകരം 'ണ്']).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> One consonant letter is substituted by another letter.</p>
              </div>
              <div className="p-5 bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl space-y-2">
                <strong className="text-purple-950 dark:text-purple-300 text-sm font-black block">4. ദ്വിത്വസന്ധി (Doubling):</strong>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold"><strong>മലയാളം:</strong> അക്ഷരം ഇരട്ടിച്ചു വരുന്നു (ഉദാ: പല + പല = പലപ്പല ['പ്പ' ഇരട്ടിച്ചു]).</p>
                <p className="text-xs text-slate-500"><strong>English:</strong> A consonant doubles its sound length when joined.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
