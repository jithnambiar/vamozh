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
  Award, 
  Compass, 
  ArrowRight, 
  RefreshCw,
  Trophy,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import MalayalamNumbers from "./MalayalamNumbers";

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
  { char: "ഋ", phonetic: "r", example: "ഋഷി (Rishi)", exampleEng: "Sage / Saint" },
  { char: "ൠ", phonetic: "rr", example: "ൠ (Long r)", exampleEng: "Obsolete long vocalic R" },
  { char: "ഌ", phonetic: "l", example: "ഌ (Vocalic l)", exampleEng: "Obsolete vocalic L" },
  { char: "ൡ", phonetic: "ll", example: "ൡ (Long l)", exampleEng: "Obsolete long vocalic L" },
  { char: "എ", phonetic: "e", example: "എലി (Eli)", exampleEng: "Rat" },
  { char: "ஏ", phonetic: "E", example: "ഏണി (Eani)", exampleEng: "Ladder" },
  { char: "ഐ", phonetic: "ai", example: "ഐസ്ക്രീം (Ice-cream)", exampleEng: "Ice cream" },
  { char: "ഒ", phonetic: "o", example: "ഒട്ടകം (Ottakam)", exampleEng: "Camel" },
  { char: "ഓ", phonetic: "O", example: "ഓട് (Odu)", exampleEng: "Tile" },
  { char: "ഔ", phonetic: "au", example: "ഔഷധം (Oushadham)", exampleEng: "Medicine" }
];

interface GroupedConsonant {
  group: string;
  letters: AlphabetLetter[];
}

const CONSONANTS_GROUPED: GroupedConsonant[] = [
  {
    group: "Kavargam (കവർഗ്ഗം - Gutturals)",
    letters: [
      { char: "ക", phonetic: "ka", example: "കണ്ണ് (Kannu)", exampleEng: "Eye" },
      { char: "ഖ", phonetic: "kha", example: "ഖഡ്ഗം (Khadgam)", exampleEng: "Sword" },
      { char: "ഗ", phonetic: "ga", example: "ഗജം (Gajam)", exampleEng: "Elephant" },
      { char: "ഘ", phonetic: "gha", example: "ഘടം (Ghatam)", exampleEng: "Clay Pot" },
      { char: "ങ", phonetic: "nga", example: "ങ (Nga)", exampleEng: "Nasal sound (e.g. മാങ്ങ - Mango)" }
    ]
  },
  {
    group: "Chavargam (ചവർഗ്ഗം - Palatals)",
    letters: [
      { char: "ച", phonetic: "cha", example: "ചായ (Chaya)", exampleEng: "Tea" },
      { char: "ഛ", phonetic: "chha", example: "ഛായ (Chhaya)", exampleEng: "Shadow / Image" },
      { char: "ജ", phonetic: "ja", example: "ജലം (Jalam)", exampleEng: "Water" },
      { char: "ഝ", phonetic: "jha", example: "ഝഷം (Jhasham)", exampleEng: "Fish" },
      { char: "ഞ", phonetic: "nya", example: "ഞണ്ട് (Nyandu)", exampleEng: "Crab" }
    ]
  },
  {
    group: "Thavargam Retroflex (ടവർഗ്ഗം - Cerebrals)",
    letters: [
      { char: "ട", phonetic: "ta", example: "ടമാട്ടർ (Tamattar)", exampleEng: "Tomato" },
      { char: "ഠ", phonetic: "tha", example: "ഠപ്പൂസ് (Thappoos)", exampleEng: "Clapping sound" },
      { char: "ഡ", phonetic: "da", example: "ഡബ്ബ (Dabba)", exampleEng: "Box / Tin" },
      { char: "ഢ", phonetic: "dha", example: "ഢക്ക (Dhakka)", exampleEng: "Large traditional drum" },
      { char: "ണ", phonetic: "na", example: "പണം (Panam)", exampleEng: "Money" }
    ]
  },
  {
    group: "Thavargam Dental (തവർഗ്ഗം - Dentals)",
    letters: [
      { char: "ത", phonetic: "tha", example: "താലം (Thaalam)", exampleEng: "Plate" },
      { char: "ഥ", phonetic: "thha", example: "രഥം (Ratham)", exampleEng: "Chariot" },
      { char: "ദ", phonetic: "da", example: "ദീപം (Deepam)", exampleEng: "Lamp" },
      { char: "ധ", phonetic: "dha", example: "ധനം (Dhanam)", exampleEng: "Wealth" },
      { char: "ന", phonetic: "na", example: "നാരങ്ങ (Narangya)", exampleEng: "Lemon" }
    ]
  },
  {
    group: "Pavargam (പവർഗ്ഗം - Labials)",
    letters: [
      { char: "പ", phonetic: "pa", example: "പൂച്ച (Poocha)", exampleEng: "Cat" },
      { char: "ഫ", phonetic: "pha", example: "ഫലം (Phalam)", exampleEng: "Fruit / Result" },
      { char: "ബ", phonetic: "ba", example: "ബലൂൺ (Balloon)", exampleEng: "Balloon" },
      { char: "ഭ", phonetic: "bha", example: "ഭക്ഷണം (Bhakshanam)", exampleEng: "Food" },
      { char: "മ", phonetic: "ma", example: "മഴ (Mazha)", exampleEng: "Rain" }
    ]
  },
  {
    group: "Madhyasthangal (മധ്യസ്ഥങ്ങൾ - Semi-vowels)",
    letters: [
      { char: "യ", phonetic: "ya", example: "യാത്ര (Yaathra)", exampleEng: "Journey" },
      { char: "ര", phonetic: "ra", example: "രഥം (Ratham)", exampleEng: "Chariot" },
      { char: "ല", phonetic: "la", example: "ലേഖനം (Lekhanam)", exampleEng: "Article" },
      { char: "വ", phonetic: "va", example: "വണ്ടർ (Vandur)", exampleEng: "Beetle" }
    ]
  },
  {
    group: "Ooshmangal (ഊഷ്മാക്കൾ - Sibilants & Aspirate)",
    letters: [
      { char: "ശ", phonetic: "sha", example: "ശിവൻ (Shivan)", exampleEng: "Lord Shiva" },
      { char: "ഷ", phonetic: "sha", example: "ഷൺമുഖൻ (Shanmukhan)", exampleEng: "Six-faced Lord" },
      { char: "സ", phonetic: "sa", example: "സൂര്യൻ (Sooryan)", exampleEng: "Sun" },
      { char: "ഹ", phonetic: "ha", example: "ഹംസം (Hamsam)", exampleEng: "Swan" }
    ]
  },
  {
    group: "Special Consonants (അതിരുപങ്ങൾ)",
    letters: [
      { char: "ള", phonetic: "La", example: "വാൾ (VaL)", exampleEng: "Sword" },
      { char: "ഴ", phonetic: "zha", example: "മഴ (Mazha)", exampleEng: "Rain" },
      { char: "റ", phonetic: "Ra", example: "റൊട്ടി (Rotti)", exampleEng: "Bread" }
    ]
  }
];

const SPECIAL_CHARS: AlphabetLetter[] = [
  { char: "ൻ", phonetic: "n", example: "അവൻ (Avan)", exampleEng: "He" },
  { char: "ർ", phonetic: "r", example: "കാർ (Car)", exampleEng: "Car" },
  { char: "ൽ", phonetic: "l", example: "കൽ (Kal)", exampleEng: "Stone" },
  { char: "ൾ", phonetic: "L", example: "വാൾ (Val)", exampleEng: "Sword" },
  { char: "ൺ", phonetic: "N", example: "കൺ (Kan)", exampleEng: "Eye" },
  { char: "ം", phonetic: "m", example: "സിംഹം (Simham)", exampleEng: "Lion" },
  { char: "ഃ", phonetic: "h", example: "ദുഃഖം (Dukham)", exampleEng: "Sadness" }
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

interface LearningSystemProps {
  defaultTab?: "letters" | "numbers" | "phrases" | "proverbs" | "quiz";
}

export default function LearningSystem({ defaultTab = "letters" }: LearningSystemProps) {
  const [activeSubTab, setActiveSubTab] = useState<"letters" | "numbers" | "phrases" | "proverbs" | "quiz">(defaultTab);
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
        <div className="flex flex-wrap justify-center mt-8 gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-3xl mx-auto">
          {[
            { id: "letters", label: "Alphabet", icon: BookOpen },
            { id: "numbers", label: "Numbers", icon: Smile },
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
            <div className="space-y-8" id="learning-letters-view">
              
              {/* Thunchath Ezhuthachan Biography Card */}
              <div className="bg-gradient-to-br from-amber-50/60 via-orange-50/20 to-transparent border border-amber-200/60 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center" id="ezhuthachan-biography">
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative w-full h-auto max-w-[260px] rounded-2xl shadow-md border border-amber-200/80 bg-amber-50 overflow-hidden group">
                    <img
                      src="https://vamozhi.com/ezhuthachan_drawing.jpg"
                      alt="Thunchaththu Ezhuthachan Portrait Drawing"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover rounded-2xl aspect-[3/4] block"
                      onError={(e) => {
                        // Fallback to local Vite path /ezhuthachan_drawing.jpg if the live web URL fails
                        if (e.currentTarget.src !== window.location.origin + "/ezhuthachan_drawing.jpg") {
                          e.currentTarget.src = "/ezhuthachan_drawing.jpg";
                        } else {
                          // Fallback to elegant vector SVG illustration if no image asset is found
                          e.currentTarget.style.display = 'none';
                          const fallback = document.getElementById('ezhuthachan-svg-fallback');
                          if (fallback) fallback.classList.remove('hidden');
                        }
                      }}
                    />
                    <div id="ezhuthachan-svg-fallback" className="w-full h-auto">
                      <svg viewBox="0 0 400 400" className="w-full h-auto rounded-2xl bg-amber-50">
                        <defs>
                          <radialGradient id="sun-glow" cx="50%" cy="40%" r="50%">
                            <stop offset="0%" stopColor="#fffbeb" stopOpacity="1" />
                            <stop offset="100%" stopColor="#fef3c7" stopOpacity="1" />
                          </radialGradient>
                          <linearGradient id="shawl-grad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ea580c" />
                            <stop offset="100%" stopColor="#c2410c" />
                          </linearGradient>
                        </defs>

                        <rect width="100%" height="100%" fill="url(#sun-glow)" />

                        {/* Background Aura / Traditional Temple Arch */}
                        <path d="M 80 400 A 120 120 0 0 1 320 400" fill="none" stroke="#fcd34d" strokeWidth="8" strokeLinecap="round" opacity="0.4" />
                        <path d="M 100 400 A 100 100 0 0 1 300 400" fill="none" stroke="#fcd34d" strokeWidth="4" strokeLinecap="round" opacity="0.3" strokeDasharray="6 6" />

                        {/* Sacred Flame (Nilavilakku) on the side */}
                        <g transform="translate(60, 240)">
                          <path d="M -15 80 L 15 80 L 10 70 L -10 70 Z" fill="#d97706" />
                          <line x1="0" y1="70" x2="0" y2="20" stroke="#d97706" strokeWidth="8" />
                          <path d="M -20 20 Q 0 35 20 20 Q 0 10 -20 20" fill="#b45309" />
                          <path d="M 0 15 Q -8 5 0 -12 Q 8 5 0 15 Z" fill="#f97316" />
                          <path d="M 0 10 Q -4 3 0 -5 Q 4 3 0 10 Z" fill="#fdba74" />
                        </g>

                        {/* Ezhuthachan Figure */}
                        <circle cx="200" cy="115" r="28" fill="#1e293b" />
                        <circle cx="200" cy="80" r="18" fill="#1e293b" /> {/* Kuduma */}

                        <circle cx="158" cy="155" r="10" fill="#fbcfe8" opacity="0.7" />
                        <circle cx="242" cy="155" r="10" fill="#fbcfe8" opacity="0.7" />

                        {/* Face */}
                        <path d="M 160 140 Q 200 110 240 140 Q 240 195 200 205 Q 160 195 160 140 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />

                        {/* Forehead Bhasmam */}
                        <path d="M 175 142 L 225 142" stroke="#ffffff" strokeWidth="3.5" />
                        <path d="M 175 148 L 225 148" stroke="#ffffff" strokeWidth="3.5" />
                        <path d="M 175 154 L 225 154" stroke="#ffffff" strokeWidth="3.5" />
                        <circle cx="200" cy="148" r="3.5" fill="#dc2626" />

                        {/* Eyes closed in contemplation */}
                        <path d="M 172 165 Q 185 172 192 165" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 208 165 Q 215 172 228 165" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

                        {/* Eyebrows */}
                        <path d="M 170 159 Q 183 154 194 160" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 206 160 Q 217 154 230 159" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

                        <path d="M 200 165 L 200 180 Q 200 183 204 181" fill="none" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 188 190 Q 200 198 212 190" fill="none" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" />

                        {/* Beard */}
                        <path d="M 160 185 Q 200 245 240 185 Q 200 235 160 185" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />

                        {/* Rudraksha Beads */}
                        <g stroke="#7c2d12" strokeWidth="1.5" fill="#ea580c">
                          <circle cx="200" cy="225" r="4.5" />
                          <circle cx="188" cy="228" r="4.5" />
                          <circle cx="212" cy="228" r="4.5" />
                          <circle cx="177" cy="233" r="4.5" />
                          <circle cx="223" cy="233" r="4.5" />
                        </g>

                        {/* Saffron Shawl */}
                        <path d="M 110 400 L 290 400 L 260 260 L 140 260 Z" fill="#fed7aa" />
                        <path d="M 130 265 C 130 265 170 330 200 330 C 230 330 270 265 270 265 L 290 400 L 110 400 Z" fill="url(#shawl-grad)" opacity="0.95" stroke="#7c2d12" strokeWidth="1.5" />

                        {/* Thaliyola Palm-leaf manuscript */}
                        <g transform="translate(140, 310)">
                          <rect x="-10" y="5" width="140" height="15" rx="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                          <path d="M 5 12 Q 15 8 25 12 T 45 12 T 65 12 T 85 12 T 105 12" fill="none" stroke="#71717a" strokeWidth="1" strokeDasharray="3 3" />
                          <path d="M 100 25 C 105 15 120 15 125 25 L 120 35 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.5" />
                          <line x1="102" y1="-5" x2="116" y2="28" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
                          <line x1="102" y1="-5" x2="116" y2="28" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M -5 20 C -10 10 5 10 10 20 Z" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>

                    {/* Copyright Protected Notice Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-xs py-2 px-3 text-center border-t border-white/5">
                      <span className="text-[10px] text-amber-200 font-extrabold uppercase tracking-wider block">
                        Drawing copyright protected
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-8 space-y-4 text-left">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider">
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
                  <div className="bg-amber-100/50 border border-amber-200/40 rounded-xl p-3.5 text-xs text-amber-900 flex flex-col gap-1 font-medium">
                    <span className="font-bold">Did you know?</span>
                    <span>The modern Malayalam alphabet contains 56 core letters: 16 Swarangal (Vowels), 37 Vyanjanangal (Consonants) and 3 Yogavahangal / Chillus (Special/pure letters). Learn the complete system below.</span>
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

              {/* Conditionally Render Consonants Grouped by Vargas (Educational Method) */}
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

              {/* Conditionally Render Special Chillus & Marks */}
              {letterGroup === "special" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" id="special-grid">
                  {SPECIAL_CHARS.map((item) => (
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

            </div>
          )}

          {/* Numbers View */}
          {activeSubTab === "numbers" && (
            <div className="space-y-6" id="learning-numbers-view">
              <MalayalamNumbers />
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
