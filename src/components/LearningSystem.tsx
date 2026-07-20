/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Volume2, 
  BookOpen, 
  Smile, 
  MessageCircle, 
  HelpCircle, 
  Award, 
  Compass, 
  ArrowRight, 
  RefreshCw,
  Trophy,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AlphabetLetter {
  char: string;
  phonetic: string;
  example: string;
  exampleEng: string;
}

interface PhraseItem {
  malPhrase: string;
  phonetic: string;
  english: string;
  category: "greetings" | "travel" | "dining" | "emergency";
}

interface ProverbItem {
  proverb: string;
  phonetic: string;
  literal: string;
  meaning: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const VOWELS: AlphabetLetter[] = [
  { char: "അ", phonetic: "a", example: "അമ്മ (Amma)", exampleEng: "Mother" },
  { char: "ആ", phonetic: "aa", example: "ആന (Aana)", exampleEng: "Elephant" },
  { char: "ഇ", phonetic: "i", example: "ഇല (Ila)", exampleEng: "Leaf" },
  { char: "ഈ", phonetic: "ii", example: "ഈച്ച (Iicha)", exampleEng: "Housefly" },
  { char: "ഉ", phonetic: "u", example: "ഉപ്പ് (Uppu)", exampleEng: "Salt" },
  { char: "ഊ", phonetic: "uu", example: "ഊഞ്ഞാൽ (Oonjal)", exampleEng: "Swing" },
  { char: "എ", phonetic: "e", example: "എലി (Eli)", exampleEng: "Rat" },
  { char: "ഏ", phonetic: "E", example: "ഏണി (Eani)", exampleEng: "Ladder" },
  { char: "ഐ", phonetic: "ai", example: "ഐസ്ക്രീം (Ice-cream)", exampleEng: "Ice cream" },
  { char: "ഒ", phonetic: "o", example: "ഒട്ടകം (Ottakam)", exampleEng: "Camel" },
  { char: "ഓ", phonetic: "O", example: "ഓട് (Odu)", exampleEng: "Tile" },
  { char: "ഔ", phonetic: "au", example: "ഔഷധം (Oushadham)", exampleEng: "Medicine" }
];

const CONSONANTS: AlphabetLetter[] = [
  { char: "ക", phonetic: "ka", example: "കണ്ണ് (Kannu)", exampleEng: "Eye" },
  { char: "ഗ", phonetic: "ga", example: "ഗജം (Gajam)", exampleEng: "Elephant" },
  { char: "ച", phonetic: "cha", example: "ചായ (Chaya)", exampleEng: "Tea" },
  { char: "ജ", phonetic: "ja", example: "ജലം (Jalam)", exampleEng: "Water" },
  { char: "ഞ", phonetic: "nya", example: "ഞണ്ട് (Nyandu)", exampleEng: "Crab" },
  { char: "ത", phonetic: "tha", example: "താലം (Thaalam)", exampleEng: "Plate" },
  { char: "ദ", phonetic: "da", example: "ദീപം (Deepam)", exampleEng: "Lamp" },
  { char: "ന", phonetic: "na", example: "നാരങ്ങ (Narangya)", exampleEng: "Lemon" },
  { char: "പ", phonetic: "pa", example: "പൂച്ച (Poocha)", exampleEng: "Cat" },
  { char: "മ", phonetic: "ma", example: "മഴ (Mazha)", exampleEng: "Rain" },
  { char: "യ", phonetic: "ya", example: "യാത്ര (Yaathra)", exampleEng: "Journey" },
  { char: "ര", phonetic: "ra", example: "രഥം (Ratham)", exampleEng: "Chariot" },
  { char: "ല", phonetic: "la", example: "ലേഖനം (Lekhanam)", exampleEng: "Article" },
  { char: "വ", phonetic: "va", example: "വണ്ടർ (Vandur)", exampleEng: "Beetle" },
  { char: "ഴ", phonetic: "zha", example: "മഴ (Mazha)", exampleEng: "Rain" },
  { char: "റ", phonetic: "Ra", example: "റൊട്ടി (Rotti)", exampleEng: "Bread" }
];

const PHRASES: PhraseItem[] = [
  { malPhrase: "നമസ്കാരം", phonetic: "Namaskaram", english: "Hello / Greetings", category: "greetings" },
  { malPhrase: "സുഖമാണോ?", phonetic: "Sukhamano?", english: "How are you?", category: "greetings" },
  { malPhrase: "എനിക്ക് സുഖമാണ്.", phonetic: "Enikku sukhamanu.", english: "I am fine.", category: "greetings" },
  { malPhrase: "നന്ദി", phonetic: "Nanni", english: "Thank you", category: "greetings" },
  { malPhrase: "എന്താണ് പേര്?", phonetic: "Enthanu peru?", english: "What is your name?", category: "greetings" },
  { malPhrase: "എന്റെ പേര്...", phonetic: "Ente peru...", english: "My name is...", category: "greetings" },
  
  { malPhrase: "ഇത് എങ്ങോട്ടുള്ള റോഡാണ്?", phonetic: "Ithu engottulla roadanu?", english: "Where does this road lead?", category: "travel" },
  { malPhrase: "സ്റ്റേഷൻ എവിടെയാണ്?", phonetic: "Station evideyanu?", english: "Where is the station?", category: "travel" },
  { malPhrase: "വണ്ടി എപ്പോൾ വരും?", phonetic: "Vandi eppol varum?", english: "When will the vehicle/train arrive?", category: "travel" },
  { malPhrase: "എനിക്ക് കൊച്ചിയിലേക്ക് പോകണം.", phonetic: "Enikku Kochiyilekku pokanam.", english: "I want to go to Kochi.", category: "travel" },
  
  { malPhrase: "ഒരു ചായ തരുമോ?", phonetic: "Oru chaya tharumo?", english: "Can you give me a tea?", category: "dining" },
  { malPhrase: "ഊണ് തയ്യാറായോ?", phonetic: "Oon thairayo?", english: "Is the meal ready?", category: "dining" },
  { malPhrase: "ഭക്ഷണം വളരെ നല്ലതാണ്!", phonetic: "Bhakshanam valare nallathanu!", english: "The food is very good!", category: "dining" },
  { malPhrase: "വെള്ളം വേണം.", phonetic: "Vellam venam.", english: "I want water.", category: "dining" },
  
  { malPhrase: "എന്നെ സഹായിക്കൂ!", phonetic: "Enne sahayikkoo!", english: "Help me!", category: "emergency" },
  { malPhrase: "ഡോക്ടർ എവിടെയാണ്?", phonetic: "Doctor evideyanu?", english: "Where is the doctor?", category: "emergency" },
  { malPhrase: "എന്റെ ഫോൺ കാണുന്നില്ല.", phonetic: "Ente phone kaanunnilla.", english: "I can't find my phone.", category: "emergency" }
];

const PROVERBS: ProverbItem[] = [
  { 
    proverb: "മിന്നുന്നതെല്ലാം പൊന്നല്ല.", 
    phonetic: "Minnunnathellam ponnalla.", 
    literal: "All that glitters is not gold.", 
    meaning: "Appearances can be highly deceptive; do not judge purely by outward looks." 
  },
  { 
    proverb: "പഴുത്ത പ്ലാവില വീഴുമ്പോൾ ചിരിക്കുന്ന പച്ചപ്പിലകളേ, നാളെ നിങ്ങൾക്കും ഈ ഗതി തന്നെയാണ്.", 
    phonetic: "Pazhutha plaavila veezhumbol chirikkunna pachappilakale, naale ningalkkum ee gathi thanneyanu.", 
    literal: "Oh green jackfruit leaves laughing at the falling ripe leaves, tomorrow your fate is the same.", 
    meaning: "Do not mock aging or the misfortune of others; age catches up to all of us." 
  },
  { 
    proverb: "ഉപ്പിലിട്ടത് കഞ്ഞിക്ക് കൂട്ടാം, കഞ്ഞി ഉപ്പിലിട്ടതിൽ കൂട്ടരുത്.", 
    phonetic: "Uppilittathu kanjykku koottam, kanji uppilittathil koottaruthu.", 
    literal: "You can eat pickles with porridge, but do not dump porridge into the pickle jar.", 
    meaning: "Keep things in moderation and context. Do not overreact to minor situations." 
  }
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What is the Malayalam word for 'Mother'?",
    options: ["അപ്പൻ (Appan)", "അമ്മ (Amma)", "ചേട്ടൻ (Chettan)", "അനിയൻ (Aniyan)"],
    correct: 1,
    explanation: "'Amma' represents Mother in Malayalam, while 'Appan' represents Father."
  },
  {
    question: "How do you ask 'How are you?' in Malayalam?",
    options: ["എവിടെയാണ്? (Evideyanu?)", "എന്താണ് വിശേഷം? (Enthanu vishesham?)", "സുഖമാണോ? (Sukhamano?)", "പോയി വരാം (Poi varam)"],
    correct: 2,
    explanation: "'Sukhamano?' is the standard and polite way to inquire about someone's well-being in Malayalam."
  },
  {
    question: "What is the literal meaning of 'Nanni' (നന്ദി) in Malayalam?",
    options: ["Welcome", "Thank You", "Good Morning", "Sorry"],
    correct: 1,
    explanation: "'Nanni' means 'Thank you' or gratitude."
  },
  {
    question: "Which of these characters is a core Malayalam vowel (Swaram)?",
    options: ["ക (Ka)", "മ (Ma)", "അ (A)", "റ (Ra)"],
    correct: 2,
    explanation: "'അ' is the very first vowel (Swaram) of the Malayalam alphabet, whereas the others are consonants."
  },
  {
    question: "What is 'Chaya' (ചായ) in Kerala?",
    options: ["Porridge", "Jackfruit", "Water", "Tea"],
    correct: 3,
    explanation: "'Chaya' is the beloved, hot milk tea commonly enjoyed across all of Kerala."
  }
];

export default function LearningSystem() {
  const [activeSubTab, setActiveSubTab] = useState<"letters" | "phrases" | "proverbs" | "quiz">("letters");
  const [letterGroup, setLetterGroup] = useState<"vowels" | "consonants">("vowels");
  const [phraseCategory, setPhraseCategory] = useState<PhraseItem["category"]>("greetings");
  const [speakActive, setSpeakActive] = useState<string | null>(null);

  // Quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const speakText = (text: string, id: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ml-IN";
      utterance.rate = 0.85;
      utterance.onstart = () => setSpeakActive(id);
      utterance.onend = () => setSpeakActive(null);
      utterance.onerror = () => setSpeakActive(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setSpeakActive(id);
      setTimeout(() => setSpeakActive(null), 1000);
    }
  };

  const handleAnswerClick = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    
    const isCorrect = idx === QUIZ_QUESTIONS[currentQ].correct;
    if (isCorrect) setQuizScore(prev => prev + 1);

    setQuizAnswers(prev => [...prev, idx]);
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setQuizScore(0);
    setQuizAnswers([]);
    setSelectedOpt(null);
    setQuizCompleted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen text-left" id="malayalam-learning-system">
      
      {/* Immersive Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-[10px] font-black tracking-widest uppercase inline-block mb-3">
          Vamozhi Gurukulam (പഠന കേന്ദ്രം)
        </span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Malayalam Learning System
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Step into our interactive digital school to learn the phonetic alphabet, standard conversational phrases, ancient heritage proverbs, and test your skills!
        </p>

        {/* Tab switchers */}
        <div className="flex flex-wrap justify-center mt-8 gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-2xl mx-auto">
          {[
            { id: "letters", label: "Alphabet", icon: BookOpen },
            { id: "phrases", label: "Everyday Phrases", icon: MessageCircle },
            { id: "proverbs", label: "Heritage Proverbs", icon: Compass },
            { id: "quiz", label: "Interactive Quiz", icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  if (tab.id === "quiz") restartQuiz();
                }}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeSubTab === tab.id
                    ? "bg-white text-purple-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 text-purple-600" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Alphabet View */}
          {activeSubTab === "letters" && (
            <div className="space-y-6" id="learning-letters-view">
              <div className="flex justify-center gap-2 border-b border-slate-100 pb-4">
                <button
                  onClick={() => setLetterGroup("vowels")}
                  className={`px-4 py-2 text-xs font-extrabold uppercase rounded-lg cursor-pointer ${
                    letterGroup === "vowels" ? "bg-purple-900 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Vowels (സ്വരങ്ങൾ - 12)
                </button>
                <button
                  onClick={() => setLetterGroup("consonants")}
                  className={`px-4 py-2 text-xs font-extrabold uppercase rounded-lg cursor-pointer ${
                    letterGroup === "consonants" ? "bg-purple-900 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Consonants (ব্যഞ്ജനങ്ങൾ - 16 basic)
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {(letterGroup === "vowels" ? VOWELS : CONSONANTS).map((item) => (
                  <div
                    key={item.char}
                    className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-sm transition-all text-left flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                        <span className="text-3xl font-black text-purple-950 font-sans">{item.char}</span>
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase">
                          /{item.phonetic}/
                        </span>
                      </div>
                      <div className="mt-3">
                        <span className="text-[10px] text-slate-400 block uppercase font-black">Vocabulary:</span>
                        <span className="text-xs font-extrabold text-slate-800 block mt-0.5">{item.example}</span>
                        <span className="text-[10px] text-slate-500 block">{item.exampleEng}</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => speakText(item.char + ", " + item.example.split(" ")[0], item.char)}
                        className={`p-2 rounded-full border transition-all cursor-pointer ${
                          speakActive === item.char
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
            </div>
          )}

          {/* Phrases View */}
          {activeSubTab === "phrases" && (
            <div className="space-y-6" id="learning-phrases-view">
              <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 pb-4">
                {[
                  { id: "greetings", label: "Greetings" },
                  { id: "travel", label: "Travel & Transit" },
                  { id: "dining", label: "Food & Dining" },
                  { id: "emergency", label: "Help & Safety" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPhraseCategory(cat.id as any)}
                    className={`px-4 py-2 text-xs font-extrabold uppercase rounded-lg cursor-pointer ${
                      phraseCategory === cat.id ? "bg-purple-900 text-white shadow-sm" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PHRASES.filter(p => p.category === phraseCategory).map((phrase, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-md transition-all flex items-start justify-between gap-4"
                  >
                    <div className="text-left flex-1">
                      <h3 className="text-xl font-extrabold text-purple-950 leading-snug">
                        {phrase.malPhrase}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 font-mono italic mt-1">
                        &quot;{phrase.phonetic}&quot;
                      </p>
                      <div className="mt-3 inline-block bg-pink-50 border border-pink-100 text-pink-900 font-bold px-3 py-1 rounded-xl text-xs">
                        {phrase.english}
                      </div>
                    </div>

                    <button
                      onClick={() => speakText(phrase.malPhrase, `phrase_${idx}`)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        speakActive === `phrase_${idx}`
                          ? "bg-pink-600 text-white border-pink-600 animate-pulse"
                          : "bg-slate-50 text-slate-500 hover:text-purple-700 hover:bg-purple-50 border-slate-200"
                      }`}
                      title="Listen to phrase"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Proverbs View */}
          {activeSubTab === "proverbs" && (
            <div className="space-y-6 max-w-4xl mx-auto" id="learning-proverbs-view">
              {PROVERBS.map((prov, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-6"
                >
                  <div className="flex-1 text-left space-y-4">
                    <div>
                      <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-black uppercase tracking-wider">
                        Ancient Proverb (പഴഞ്ചൊല്ല്)
                      </span>
                      <h3 className="text-2xl font-black text-purple-950 tracking-tight mt-1">
                        {prov.proverb}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono font-medium italic mt-0.5">
                        &quot;{prov.phonetic}&quot;
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Literal Translation</span>
                        <p className="text-slate-700 font-semibold">{prov.literal}</p>
                      </div>
                      <div className="bg-purple-50/40 p-3 rounded-2xl border border-purple-100/60">
                        <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block mb-1 font-sans">Moral Wisdom</span>
                        <p className="text-purple-950 font-semibold leading-relaxed">{prov.meaning}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => speakText(prov.proverb, `proverb_${idx}`)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer sm:self-center shrink-0 ${
                      speakActive === `proverb_${idx}`
                        ? "bg-pink-600 text-white border-pink-600 animate-pulse"
                        : "bg-slate-50 text-slate-500 hover:text-purple-700 hover:bg-purple-50 border-slate-200"
                    }`}
                    title="Speak proverb"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Quiz View */}
          {activeSubTab === "quiz" && (
            <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm" id="learning-quiz-view">
              
              {!quizCompleted ? (
                <div className="space-y-6 text-left">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                      Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] font-black uppercase">
                      Score: {quizScore}
                    </span>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                    {QUIZ_QUESTIONS[currentQ].question}
                  </h3>

                  {/* Options List */}
                  <div className="flex flex-col gap-3">
                    {QUIZ_QUESTIONS[currentQ].options.map((opt, idx) => {
                      const isSelected = selectedOpt === idx;
                      const isCorrect = idx === QUIZ_QUESTIONS[currentQ].correct;
                      
                      let optStyle = "bg-white border-slate-200 hover:bg-slate-50 text-slate-800";
                      
                      if (selectedOpt !== null) {
                        if (isCorrect) {
                          optStyle = "bg-emerald-500 border-transparent text-white font-extrabold";
                        } else if (isSelected) {
                          optStyle = "bg-red-500 border-transparent text-white font-extrabold";
                        } else {
                          optStyle = "bg-white border-slate-100 text-slate-300 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerClick(idx)}
                          disabled={selectedOpt !== null}
                          className={`w-full py-4 px-5 rounded-2xl border text-sm font-bold text-left transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                        >
                          <span>{opt}</span>
                          {selectedOpt !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation panel */}
                  {selectedOpt !== null && (
                    <div className="pt-4 border-t border-slate-100 animate-fade-in space-y-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-xs">
                        <span className="font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Explanation</span>
                        <p className="text-slate-700 font-semibold leading-relaxed">
                          {QUIZ_QUESTIONS[currentQ].explanation}
                        </p>
                      </div>

                      <button
                        onClick={handleNextQuestion}
                        className="w-full py-3.5 bg-purple-950 hover:bg-purple-900 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        {currentQ < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "Complete Quiz"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                </div>
              ) : (
                /* Completed State */
                <div className="text-center space-y-6 py-6 animate-fade-in">
                  <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-200">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Quiz Finished!</h3>
                    <p className="text-sm text-slate-500 mt-1">Here is your final Gurukulam score card:</p>
                  </div>

                  <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-3xl max-w-xs mx-auto space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase block tracking-wider">Correct Answers</span>
                    <span className="text-4xl font-black text-purple-900">{quizScore} / {QUIZ_QUESTIONS.length}</span>
                    <span className="text-xs text-slate-500 block font-bold pt-2">
                      {quizScore === QUIZ_QUESTIONS.length ? "Perfect Score! ശബാഷ് (Excellent) 🥳" : "Good Attempt! വീണ്ടും പരീക്ഷിക്കൂ!"}
                    </span>
                  </div>

                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-purple-950 hover:bg-purple-900 text-white rounded-2xl font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Restart Quiz
                  </button>
                </div>
              )}

            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
