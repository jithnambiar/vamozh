/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Volume2, 
  BookOpen, 
  Smile, 
  MessageCircle, 
  HelpCircle, 
  Compass, 
  ArrowRight, 
  RefreshCw,
  Trophy,
  Gamepad2,
  GraduationCap,
  ScrollText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import MalayalamNumbers from "./MalayalamNumbers";
import LanguageGames from "./LanguageGames";
import MalayalamExam from "./MalayalamExam";
import GurukulamStudyGuides from "./GurukulamStudyGuides";
import CertificateVerificationPage from "./CertificateVerificationPage";

interface AlphabetLetter {
  char: string;
  phonetic: string;
  example: string;
  exampleEng: string;
}

interface PhraseItem {
  malayalam: string;
  phonetic: string;
  english: string;
  category: "greetings" | "shopping" | "travel" | "dining" | "emergency";
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

// 1. Swarangal (Vowels) - 16
const VOWELS: AlphabetLetter[] = [
  { char: "അ", phonetic: "A", example: "അമ്മ (Amma)", exampleEng: "Mother" },
  { char: "ആ", phonetic: "AA", example: "ആന (Aana)", exampleEng: "Elephant" },
  { char: "ഇ", phonetic: "I", example: "ഇല (Ila)", exampleEng: "Leaf" },
  { char: "ഈ", phonetic: "EE", example: "ഈച്ച (Eecha)", exampleEng: "Fly" },
  { char: "ഉ", phonetic: "U", example: "ഉറുമ്പ് (Urumbu)", exampleEng: "Ant" },
  { char: "ഊ", phonetic: "OO", example: "ഊഞ്ഞാൽ (Oonjal)", exampleEng: "Swing" },
  { char: "ഋ", phonetic: "RU", example: "ഋഷി (Rishi)", exampleEng: "Sage" },
  { char: "എ", phonetic: "E", example: "എലി (Eli)", exampleEng: "Rat" },
  { char: "ഏ", phonetic: "AE", example: "ഏണി (Eani)", exampleEng: "Ladder" },
  { char: "ഐ", phonetic: "AI", example: "ഐക്യം (Aikyam)", exampleEng: "Unity" },
  { char: "ഒ", phonetic: "O", example: "ഒട്ടകം (Ottakam)", exampleEng: "Camel" },
  { char: "ഓ", phonetic: "OA", example: "ഓടൽ (Odal)", exampleEng: "Running" },
  { char: "ഔ", phonetic: "OU", example: "ഔഷധം (Oushadham)", exampleEng: "Medicine" },
  { char: "അം", phonetic: "AM", example: "അംബരം (Ambaram)", exampleEng: "Sky" },
  { char: "അഃ", phonetic: "AH", example: "അന്തഃകരണം (Anthahkaranam)", exampleEng: "Inner Conscience" },
  { char: "ൠ", phonetic: "RUU", example: "ൠകാരം (Rukaram)", exampleEng: "Long Vocalic R" }
];

// 2. Vyanjanangal (Consonants) - 37 grouped by Varga
const CONSONANTS_GROUPED = [
  {
    group: "Ka-Vargam (ക-വർഗ്ഗം - Gutturals)",
    letters: [
      { char: "ക", phonetic: "Ka", example: "കണ്ണ് (Kannu)", exampleEng: "Eye" },
      { char: "ഖ", phonetic: "Kha", example: "ഖനി (Khani)", exampleEng: "Mine" },
      { char: "ഗ", phonetic: "Ga", example: "ഗജം (Gajam)", exampleEng: "Elephant" },
      { char: "ഘ", phonetic: "Gha", example: "ഘടികാരം (Ghadikaram)", exampleEng: "Clock" },
      { char: "ങ", phonetic: "Nga", example: "മാങ്ങ (Maanga)", exampleEng: "Mango" }
    ]
  },
  {
    group: "Cha-Vargam (ച-വർഗ്ഗം - Palatals)",
    letters: [
      { char: "ച", phonetic: "Cha", example: "ചായ (Chaya)", exampleEng: "Tea" },
      { char: "ഛ", phonetic: "Chha", example: "ഛത്രം (Chhathram)", exampleEng: "Umbrella" },
      { char: "ജ", phonetic: "Ja", example: "ജലം (Jalam)", exampleEng: "Water" },
      { char: "ഝ", phonetic: "Jha", example: "ഝഷം (Jhasham)", exampleEng: "Fish" },
      { char: "ഞ", phonetic: "Nja", example: "ഞണ്ട് (Njandu)", exampleEng: "Crab" }
    ]
  },
  {
    group: "Ta-Vargam (ട-വർഗ്ഗം - Retroflexes)",
    letters: [
      { char: "ട", phonetic: "Ta", example: "ടമാറ്റോ (Tomato)", exampleEng: "Tomato" },
      { char: "ഠ", phonetic: "Tha", example: "ഠവട്ടൽ (Thavattal)", exampleEng: "Circle" },
      { char: "ഡ", phonetic: "Da", example: "ഡബ്ബ (Dabba)", exampleEng: "Box" },
      { char: "ഢ", phonetic: "Dha", example: "ഢാക്ക (Dhaka)", exampleEng: "Dhaka" },
      { char: "ണ", phonetic: "Na", example: "പണം (Panam)", exampleEng: "Money" }
    ]
  },
  {
    group: "Tha-Vargam (ത-വർഗ്ഗം - Dentals)",
    letters: [
      { char: "ത", phonetic: "Tha", example: "തല (Thala)", exampleEng: "Head" },
      { char: "ഥ", phonetic: "Thha", example: "രഥം (Ratham)", exampleEng: "Chariot" },
      { char: "ദ", phonetic: "Da", example: "ദയ (Daya)", exampleEng: "Kindness" },
      { char: "ധ", phonetic: "Dha", example: "ധനം (Dhanam)", exampleEng: "Wealth" },
      { char: "ന", phonetic: "Na", example: "നദി (Nadi)", exampleEng: "River" }
    ]
  },
  {
    group: "Pa-Vargam (പ-വർഗ്ഗം - Labials)",
    letters: [
      { char: "പ", phonetic: "Pa", example: "പാല് (Paal)", exampleEng: "Milk" },
      { char: "ഫ", phonetic: "Pha", example: "ഫലം (Phalam)", exampleEng: "Fruit" },
      { char: "ബ", phonetic: "Ba", example: "ബസ് (Bus)", exampleEng: "Bus" },
      { char: "ഭ", phonetic: "Bha", example: "ഭാരതം (Bharatham)", exampleEng: "India" },
      { char: "മ", phonetic: "Ma", example: "മഴ (Mazha)", exampleEng: "Rain" }
    ]
  },
  {
    group: "Madhyastha & Ushmavukal (ഇടത്തരം & ഊഷ്മാക്കൾ - Liquids & Fricatives)",
    letters: [
      { char: "യ", phonetic: "Ya", example: "യാത്ര (Yathra)", exampleEng: "Travel" },
      { char: "ര", phonetic: "Ra", example: "രാത്രി (Rathri)", exampleEng: "Night" },
      { char: "ല", phonetic: "La", example: "ലോകം (Lokam)", exampleEng: "World" },
      { char: "വ", phonetic: "Va", example: "വഴി (Vazhi)", exampleEng: "Path" },
      { char: "ശ", phonetic: "Sha", example: "ശരീരം (Shareeram)", exampleEng: "Body" },
      { char: "ഷ", phonetic: "Ssha", example: "ഷഡ്പദം (Shadpadam)", exampleEng: "Insect" },
      { char: "സ", phonetic: "Sa", example: "സൂര്യൻ (Sooryan)", exampleEng: "Sun" },
      { char: "ഹ", phonetic: "Ha", example: "ഹംസം (Hamsam)", exampleEng: "Swan" },
      { char: "ള", phonetic: "Lla", example: "കിളി (Kili)", exampleEng: "Bird" },
      { char: "ഴ", phonetic: "Zha", example: "വാഴ (Vaazha)", exampleEng: "Banana Tree" },
      { char: "റ", phonetic: "Rra", example: "റോഡ് (Road)", exampleEng: "Road" },
      { char: "ഩ", phonetic: "Nna", example: "ഩകാരം (Nnakaram)", exampleEng: "Alveolar Nasal" }
    ]
  }
];

// 3. Chillus / Special pure consonant markers (7)
const SPECIAL_CHILLUS: AlphabetLetter[] = [
  { char: "ൺ", phonetic: "Nn", example: "കണ്ണ് (Kannu) -> കൺ (Kan)", exampleEng: "Eye" },
  { char: "ൻ", phonetic: "N", example: "അവൻ (Avan)", exampleEng: "He" },
  { char: "ർ", phonetic: "R", example: "അവർ (Avar)", exampleEng: "They" },
  { char: "ൽ", phonetic: "L", example: "പാല് (Paal)", exampleEng: "Milk" },
  { char: "ൾ", phonetic: "Ll", example: "അവൾ (Aval)", exampleEng: "She" },
  { char: "ൿ", phonetic: "K", example: "തൿ (Thak)", exampleEng: "Pure K sound" },
  { char: "ൔ", phonetic: "Mm", example: "ൔകാരം (Mkaram)", exampleEng: "Pure M Chillu" }
];

const EVERYDAY_PHRASES: PhraseItem[] = [
  // Greetings
  { malayalam: "നമസ്കാരം", phonetic: "Namaskaram", english: "Hello / Greetings", category: "greetings" },
  { malayalam: "സുഖമാണോ?", phonetic: "Sukhamano?", english: "How are you?", category: "greetings" },
  { malayalam: "എനിക്ക് സുഖമാണ്.", phonetic: "Enikku sukhamanu.", english: "I am fine.", category: "greetings" },
  { malayalam: "നന്ദി!", phonetic: "Nanni!", english: "Thank you!", category: "greetings" },
  { malayalam: "പോയി വരാം.", phonetic: "Poi varam.", english: "Goodbye (See you again)", category: "greetings" },
  { malayalam: "പേരെന്താണ്?", phonetic: "Parenthanu?", english: "What is your name?", category: "greetings" },

  // Shopping & Market
  { malayalam: "ഇതിന് എത്ര രൂപയാണ്?", phonetic: "Ithinu ethra roopayanu?", english: "How much is this?", category: "shopping" },
  { malayalam: "വില കുറയ്ക്കുമോ?", phonetic: "Vila kurakkumo?", english: "Can you reduce the price?", category: "shopping" },
  { malayalam: "ഇത് നല്ലതാണോ?", phonetic: "Ithu nallathano?", english: "Is this good quality?", category: "shopping" },
  { malayalam: "ചില്ലറ ഉണ്ടോ?", phonetic: "Chillara undo?", english: "Do you have change?", category: "shopping" },

  // Travel & Taxi
  { malayalam: "ബസ് സ്റ്റാൻഡ് എവിടെയാണ്?", phonetic: "Bus stand evideyanu?", english: "Where is the bus stand?", category: "travel" },
  { malayalam: "റെയിൽവേ സ്റ്റേഷനിലേക്ക് പോകാമോ?", phonetic: "Railway station-ilekku pokamo?", english: "Can we go to the railway station?", category: "travel" },
  { malayalam: "ഇവിടെ നിർത്തു.", phonetic: "Ivide nirthu.", english: "Stop here please.", category: "travel" },
  { malayalam: "എത്ര സമയമെടുക്കും?", phonetic: "Ethra samayam edukkum?", english: "How long will it take?", category: "travel" },

  // Dining & Tea Shop
  { malayalam: "ഒരു കപ്പ് ചൂടു ചായ തരുമോ?", phonetic: "Oru cup choodu chaya tharumo?", english: "Can I get a hot cup of tea?", category: "dining" },
  { malayalam: "ഇവിടെ നല്ല ഭക്ഷണം കിട്ടുമോ?", phonetic: "Ivide nalla bhakshanam kittumo?", english: "Can we get good food here?", category: "dining" },
  { malayalam: "വെള്ളം തരു.", phonetic: "Vellam tharu.", english: "Please give some water.", category: "dining" },
  { malayalam: "ബില്ല് തരുമോ?", phonetic: "Bill tharumo?", english: "Can I get the bill?", category: "dining" },

  // Emergency & Help
  { malayalam: "ദയവായി സഹായിക്കൂ!", phonetic: "Dayavayi sahayikkoo!", english: "Please help me!", category: "emergency" },
  { malayalam: "അടുത്തുള്ള ഹോസ്പിറ്റൽ എവിടെയാണ്?", phonetic: "Aduthulla hospital evideyanu?", english: "Where is the nearest hospital?", category: "emergency" },
  { malayalam: "പോലീസിനെ വിളിക്കൂ!", phonetic: "Policine vilikkoo!", english: "Call the police!", category: "emergency" }
];

const HERITAGE_PROVERBS: ProverbItem[] = [
  { 
    proverb: "മിന്നുന്നതെല്ലാം പൊന്നല്ല.", 
    phonetic: "Minnunnathellam ponnalla.", 
    literal: "All that glitters is not gold.", 
    meaning: "Outer appearances can often be deceiving. Value inner character over superficial shine." 
  },
  { 
    proverb: "ആഴമളക്കാതെ ആറ്റിൽ ഇറങ്ങരുത്.", 
    phonetic: "Aazhamalakkadhe aattil irangaruthu.", 
    literal: "Do not step into the river without gauging its depth.", 
    meaning: "Look before you leap. Always assess risk before starting a project." 
  },
  { 
    proverb: "അണ്ണാൻ കുഞ്ഞും തന്നാലായത്.", 
    phonetic: "Annan kunjhum thannalayathu.", 
    literal: "Even a baby squirrel does its small part.", 
    meaning: "Every effort, no matter how small, counts towards a greater cause." 
  },
  { 
    proverb: "കിണറ്റിലെ തവള പോലെ.", 
    phonetic: "Kinattile thavala pole.", 
    literal: "Like a frog stuck inside a well.", 
    meaning: "Refers to a narrow-minded person who thinks their limited bubble is the entire universe." 
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
    options: ["അപ്പൻ", "അമ്മ", "ചേട്ടൻ", "അനിയൻ"],
    correct: 1,
    explanation: "'അമ്മ' represents Mother in Malayalam."
  },
  {
    question: "How do you ask 'How are you?' in Malayalam?",
    options: ["എവിടെയാണ്?", "എന്താണ് വിശേഷം?", "സുഖമാണോ?", "പോയി വരാം"],
    correct: 2,
    explanation: "'സുഖമാണോ?' is the standard and polite way to inquire about someone's well-being."
  },
  {
    question: "What is the literal meaning of 'Nanni' (നന്ദി) in Malayalam?",
    options: ["Welcome", "Thank You", "Good Morning", "Sorry"],
    correct: 1,
    explanation: "'നന്ദി' means 'Thank you' or gratitude."
  },
  {
    question: "Which of these characters is a core Malayalam vowel (Swaram)?",
    options: ["ക", "മ", "അ", "റ"],
    correct: 2,
    explanation: "'അ' is the very first vowel (Swaram) of the Malayalam alphabet."
  },
  {
    question: "What is 'Chaya' (ചായ) in Kerala?",
    options: ["Porridge", "Jackfruit", "Water", "Tea"],
    correct: 3,
    explanation: "'ചായ' is the beloved hot milk tea commonly enjoyed across Kerala."
  }
];

interface LearningSystemProps {
  defaultTab?: "letters" | "numbers" | "phrases" | "proverbs" | "study" | "games" | "quiz" | "exam";
}

export default function LearningSystem({ defaultTab = "letters" }: LearningSystemProps) {
  const [activeSubTab, setActiveSubTab] = useState<"letters" | "numbers" | "phrases" | "proverbs" | "study" | "games" | "quiz" | "exam">(defaultTab);
  const [letterGroup, setLetterGroup] = useState<"vowels" | "consonants" | "special">("vowels");
  const [phraseCategory, setPhraseCategory] = useState<PhraseItem["category"]>("greetings");
  const [speakActive, setSpeakActive] = useState<string | null>(null);

  useEffect(() => {
    setActiveSubTab(defaultTab);
  }, [defaultTab]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 min-h-screen text-left space-y-6" id="malayalam-learning-system">
      
      {/* Immersive Header */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-[10px] font-black tracking-widest uppercase inline-block mb-3">
          Vamozhi Online Academy (പഠന കേന്ദ്രം)
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Learn Malayalam Language for Free
        </h1>
        <p className="text-sm sm:text-base font-bold text-purple-950 dark:text-purple-300 mt-2">
          Vamozhi Online Academy • Basic to Advanced Curriculum, Interactive Games & Official Certificate Exam
        </p>

        {/* FLEXIBLE & RESPONSIVE SUB-NAVIGATION MENU BAR */}
        <div className="mt-5 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-purple-200/80 dark:border-neutral-800 p-2 rounded-3xl shadow-xl shadow-purple-950/5 max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-2">
            {[
              { id: "letters", label: "Alphabet 🔤", icon: BookOpen, badge: "Basic" },
              { id: "numbers", label: "Numbers 🔢", icon: Smile, badge: "Basic" },
              { id: "phrases", label: "Phrases 💬", icon: MessageCircle, badge: "Inter" },
              { id: "proverbs", label: "Proverbs 🧭", icon: Compass, badge: "Heritage" },
              { id: "study", label: "Study Guides 📚", icon: ScrollText, badge: "1-4" },
              { id: "games", label: "Mini Games 🎮", icon: Gamepad2, badge: "Fun" },
              { id: "quiz", label: "Practice Quiz ❓", icon: HelpCircle, badge: "Test" },
              { id: "exam", label: "Certificate Exam 🎓", icon: GraduationCap, badge: "Pro" }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSubTab(tab.id as any);
                    if (tab.id === "quiz") restartQuiz();
                  }}
                  className={`flex-1 min-w-[125px] sm:min-w-[150px] max-w-[210px] py-2.5 px-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-between gap-1.5 cursor-pointer border ${
                    isActive
                      ? "bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white border-purple-950 shadow-md scale-[1.02]"
                      : "bg-slate-50/90 hover:bg-purple-50/90 border-slate-200/60 text-slate-700 hover:text-purple-950 hover:border-purple-200"
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-amber-400" : "text-purple-600"}`} />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase shrink-0 ${
                    isActive ? "bg-amber-400 text-purple-950" : "bg-purple-100 text-purple-800"
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
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
            <div className="space-y-8" id="learning-letters-view">
              
              {/* Thunchath Ezhuthachan Biography Card */}
              <div className="bg-gradient-to-br from-amber-50/60 via-orange-50/20 to-transparent border border-amber-200/60 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch text-left" id="ezhuthachan-biography">
                <div className="md:col-span-7 lg:col-span-8 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider inline-block">
                      Father of Malayalam Literature (മലയാളഭാഷയുടെ പിതാവ്)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Thunchaththu Ramanujan Ezhuthachan
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Ezhuthachan (16th Century, Tirur, Kerala) is the revered father of the Malayalam language. He revolutionized Kerala's literary culture by standardizing the <strong>56-letter Grantha-based Malayalam script (Lipi)</strong>, allowing all people to read and learn without class division.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      His masterpieces, including <em>Adhyathmaramayanam Kilippattu</em> and <em>Mahabharatham Kilippattu</em>, formulated the foundational grammar, linguistic beauty, and poetic structure of modern Malayalam. Malayalam was officially recognized as a <strong>Classical Language</strong> in 2013, representing over 38 million speakers worldwide.
                    </p>
                  </div>
                  <div className="bg-amber-100/50 border border-amber-200/40 rounded-xl p-3.5 text-xs text-amber-900 flex flex-col gap-1 font-medium mt-2">
                    <span className="font-bold">Did you know?</span>
                    <span>The modern Malayalam alphabet contains 56 core letters: 16 Swarangal (Vowels), 37 Vyanjanangal (Consonants) and 3 Yogavahangal / Chillus (Special/pure letters). Learn the complete system below.</span>
                  </div>
                </div>

                <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center">
                  <div className="relative w-full h-full min-h-[260px] max-h-[380px] rounded-2xl shadow-md border border-amber-200/80 bg-amber-50 overflow-hidden flex flex-col justify-between">
                    <img
                      src="https://www.redbridge.in/assets/ezhuthachan.png"
                      alt="Thunchaththu Ezhuthachan Portrait Drawing"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-2xl block"
                      onError={(e) => {
                        if (e.currentTarget.src !== window.location.origin + "/ezhuthachan_drawing.jpg") {
                          e.currentTarget.src = "/ezhuthachan_drawing.jpg";
                        }
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xs py-1.5 px-3 text-center border-t border-white/10">
                      <span className="text-[10px] text-amber-200 font-extrabold uppercase tracking-wider block">
                        Drawing copyright protected
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Three-Way Letter Group Switchers */}
              <div className="flex justify-center gap-2 border-b border-slate-100 pb-4">
                <button
                  onClick={() => setLetterGroup("vowels")}
                  className={`px-4 py-2 text-xs font-extrabold uppercase rounded-lg cursor-pointer transition-all ${
                    letterGroup === "vowels" ? "bg-purple-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Vowels (സ്വരങ്ങൾ - 16)
                </button>
                <button
                  onClick={() => setLetterGroup("consonants")}
                  className={`px-4 py-2 text-xs font-extrabold uppercase rounded-lg cursor-pointer transition-all ${
                    letterGroup === "consonants" ? "bg-purple-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Consonants (വ്യഞ്ജനങ്ങൾ - 37)
                </button>
                <button
                  onClick={() => setLetterGroup("special")}
                  className={`px-4 py-2 text-xs font-extrabold uppercase rounded-lg cursor-pointer transition-all ${
                    letterGroup === "special" ? "bg-purple-900 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Special & Chillus (ചില്ലുകൾ - 7)
                </button>
              </div>

              {/* Conditionally Render Vowels */}
              {letterGroup === "vowels" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" id="vowels-grid">
                  {VOWELS.map((item) => (
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
                          title="Listen to pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Conditionally Render Consonants Grouped by Vargas */}
              {letterGroup === "consonants" && (
                <div className="space-y-8" id="consonants-varga-sections">
                  {CONSONANTS_GROUPED.map((varga) => (
                    <div key={varga.group} className="space-y-3">
                      <h4 className="text-sm font-black text-slate-800 flex items-center gap-2 bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2 border-l-4 border-l-purple-600">
                        {varga.group}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {varga.letters.map((item) => (
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
                                title="Listen to pronunciation"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Conditionally Render Special Chillus */}
              {letterGroup === "special" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" id="chillus-grid">
                  {SPECIAL_CHILLUS.map((item) => (
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
                          onClick={() => speakText(item.char, item.char)}
                          className={`p-2 rounded-full border transition-all cursor-pointer ${
                            speakActive === item.char
                              ? "bg-pink-600 text-white border-pink-600 animate-pulse"
                              : "bg-slate-50 text-slate-500 hover:text-purple-700 hover:bg-purple-50 border-slate-100"
                          }`}
                          title="Listen to pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* Numbers View */}
          {activeSubTab === "numbers" && (
            <MalayalamNumbers />
          )}

          {/* Everyday Phrases View */}
          {activeSubTab === "phrases" && (
            <div className="space-y-6" id="learning-phrases-view">
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 justify-center border-b border-slate-100 pb-4">
                {[
                  { id: "greetings", name: "Greetings & Basics 👋" },
                  { id: "shopping", name: "Shopping & Market 🛒" },
                  { id: "travel", name: "Travel & Auto 🚕" },
                  { id: "dining", name: "Dining & Tea Shop ☕" },
                  { id: "emergency", name: "Emergency & Medical 🚨" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPhraseCategory(cat.id as any)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      phraseCategory === cat.id
                        ? "bg-purple-950 text-white shadow-sm font-black"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Phrases Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EVERYDAY_PHRASES.filter((p) => p.category === phraseCategory).map((phrase, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-1.5">
                      <span className="text-xl font-black text-purple-950 block font-sans">
                        {phrase.malayalam}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500 block">
                        Pronunciation: /{phrase.phonetic}/
                      </span>
                      <span className="text-xs font-extrabold text-slate-800 block pt-1">
                        English: "{phrase.english}"
                      </span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => speakText(phrase.malayalam, `phrase_${idx}`)}
                        className={`p-2.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
                          speakActive === `phrase_${idx}`
                            ? "bg-pink-600 text-white border-pink-600 animate-pulse"
                            : "bg-slate-50 text-slate-600 hover:text-purple-900 hover:bg-purple-50 border-slate-100"
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Listen Audio</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Heritage Proverbs View */}
          {activeSubTab === "proverbs" && (
            <div className="space-y-6" id="learning-proverbs-view">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {HERITAGE_PROVERBS.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-white via-slate-50/50 to-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                          Kerala Proverb #{idx + 1} (പഴഞ്ചൊല്ല്)
                        </span>
                        <button
                          onClick={() => speakText(item.proverb, `proverb_${idx}`)}
                          className="p-2 text-slate-400 hover:text-purple-900 hover:bg-purple-50 rounded-full transition-colors cursor-pointer"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="text-xl font-black text-purple-950 font-sans leading-snug">
                        "{item.proverb}"
                      </h3>

                      <span className="text-xs font-mono font-bold text-slate-500 block">
                        Phonetic: /{item.phonetic}/
                      </span>

                      <div className="bg-slate-100/70 p-3 rounded-2xl space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                          Literal Translation
                        </span>
                        <p className="text-xs text-slate-700 italic">
                          "{item.literal}"
                        </p>
                      </div>

                      <div className="bg-purple-50/60 p-3 rounded-2xl space-y-1 border border-purple-100">
                        <span className="text-[10px] font-black text-purple-800 uppercase tracking-wider block">
                          Deeper Meaning & Philosophy
                        </span>
                        <p className="text-xs text-purple-950 font-semibold leading-relaxed">
                          {item.meaning}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3-Level Study Materials View */}
          {activeSubTab === "study" && (
            <GurukulamStudyGuides />
          )}

          {/* Interactive Games View */}
          {activeSubTab === "games" && (
            <LanguageGames />
          )}

          {/* Practice Quiz View */}
          {activeSubTab === "quiz" && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-sm space-y-6" id="learning-quiz-view">
              
              {!quizCompleted ? (
                <div className="space-y-6">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="text-xs font-black text-purple-900 uppercase tracking-wider">
                      Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      Score: {quizScore} PTS
                    </span>
                  </div>

                  {/* Question */}
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    {QUIZ_QUESTIONS[currentQ].question}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-3">
                    {QUIZ_QUESTIONS[currentQ].options.map((opt, idx) => {
                      const isSelected = selectedOpt === idx;
                      const isCorrect = idx === QUIZ_QUESTIONS[currentQ].correct;
                      const showResult = selectedOpt !== null;

                      let btnStyle = "bg-slate-50 hover:bg-purple-50/50 border-slate-200/80 text-slate-800";
                      if (showResult) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-sm";
                        } else if (isSelected) {
                          btnStyle = "bg-pink-50 border-pink-500 text-pink-950 font-black";
                        } else {
                          btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={selectedOpt !== null}
                          onClick={() => handleAnswerClick(idx)}
                          className={`p-4 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showResult && isCorrect && (
                            <span className="text-emerald-700 text-xs font-extrabold">✓ Correct</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Next button */}
                  {selectedOpt !== null && (
                    <div className="space-y-4 pt-2 animate-fade-in">
                      <div className="p-4 bg-purple-50/80 border border-purple-100 rounded-2xl text-xs space-y-1">
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

          {/* Official Certification Exam View & Verification */}
          {activeSubTab === "exam" && (
            <div className="space-y-12">
              <MalayalamExam />
              <div className="pt-8 border-t border-slate-200/80 dark:border-neutral-800" id="exam-certificate-verification">
                <CertificateVerificationPage isEmbedded={true} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
