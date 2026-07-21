/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Printer, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  ChevronRight,
  FileCheck,
  User,
  MapPin,
  Clock,
  Send,
  Linkedin,
  Search,
  Truck,
  ExternalLink,
  Flame,
  Check
} from "lucide-react";
import { getRandomQuestions, ExamQuestion } from "../data/examQuestions";

type ExamLevel = "beginner" | "expert" | "master";

interface LevelConfig {
  id: ExamLevel;
  name: string;
  badge: string;
  questionsCount: number;
  timeLimitMinutes: number | null; // null = untimed
  minPassScore: number;
  color: string;
  description: string;
}

const LEVEL_CONFIGS: Record<ExamLevel, LevelConfig> = {
  beginner: {
    id: "beginner",
    name: "Beginner Level (പ്രാരംഭ പരീക്ഷ)",
    badge: "🟢 Beginner",
    questionsCount: 10,
    timeLimitMinutes: null,
    minPassScore: 6, // 60%
    color: "from-emerald-600 to-teal-700",
    description: "10 Questions covering fundamental vowels, basic words, and common greetings."
  },
  expert: {
    id: "expert",
    name: "Advanced Level (ഉന്നത പരീക്ഷ)",
    badge: "🔵 Advanced",
    questionsCount: 25,
    timeLimitMinutes: null,
    minPassScore: 15, // 60%
    color: "from-blue-600 to-indigo-800",
    description: "25 Questions covering consonant vargas, chillus, phrases, and heritage proverbs."
  },
  master: {
    id: "master",
    name: "Expert Level (വിദഗ്ദ്ധ പരീക്ഷ - 30 Mins)",
    badge: "🔴 Expert (Timed)",
    questionsCount: 35,
    timeLimitMinutes: 30, // 30 mins
    minPassScore: 21, // 60%
    color: "from-purple-900 to-pink-900",
    description: "35 Comprehensive Questions with a strict 30-Minute Countdown Timer!"
  }
};

export default function MalayalamExam() {
  // Navigation / Phase states
  const [selectedLevel, setSelectedLevel] = useState<ExamLevel | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Master Level 30-minute Timer (in seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Student registration details
  const [studentName, setStudentName] = useState<string>("");
  const [studentLocation, setStudentLocation] = useState<string>("");
  const [isCertificateReady, setIsCertificateReady] = useState<boolean>(false);
  const [certId, setCertId] = useState<string>("");

  // Physical Dispatch (₹499) Modal & Form state
  const [showDispatchModal, setShowDispatchModal] = useState<boolean>(false);
  const [addressLine, setAddressLine] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [stateName, setStateName] = useState<string>("Kerala");
  const [pincode, setPincode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isDispatchSending, setIsDispatchSending] = useState<boolean>(false);
  const [dispatchSuccessMsg, setDispatchSuccessMsg] = useState<string>("");

  // Start Exam
  const handleStartExam = (level: ExamLevel) => {
    setSelectedLevel(level);
    const cfg = LEVEL_CONFIGS[level];
    const qList = getRandomQuestions(level, cfg.questionsCount);
    setQuestions(qList);
    setCurrentIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setIsCertificateReady(false);
    
    if (cfg.timeLimitMinutes) {
      setSecondsRemaining(cfg.timeLimitMinutes * 60);
    } else {
      setSecondsRemaining(null);
    }
  };

  // Timer Effect for Master Level
  useEffect(() => {
    if (secondsRemaining !== null && secondsRemaining > 0 && !isSubmitted) {
      timerRef.current = setTimeout(() => {
        setSecondsRemaining((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (secondsRemaining === 0 && !isSubmitted) {
      // Auto submit when time expires!
      alert("⏱️ Time expired! Submitting your exam automatically now.");
      handleSubmitExam();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [secondsRemaining, isSubmitted]);

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    return score;
  };

  const scoreCount = calculateScore();
  const totalCount = questions.length || 10;
  const percentage = Math.round((scoreCount / totalCount) * 100);
  const isPassed = percentage >= 60;

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    // Generate unique Certificate Serial ID
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const levelCode = selectedLevel?.toUpperCase() || "GEN";
    setCertId(`VM-ML-${levelCode}-2026-${randomCode}`);
  };

  const handleResetExam = () => {
    setSelectedLevel(null);
    setQuestions([]);
    setCurrentIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setIsCertificateReady(false);
    setStudentName("");
    setStudentLocation("");
    setSecondsRemaining(null);
  };

  const handleGenerateCertificate = async (e: FormEvent) => {
    e.preventDefault();
    const cleanName = studentName.trim();
    if (!cleanName) return;

    try {
      const response = await fetch("/api/save-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certId,
          studentName: cleanName,
          location: studentLocation.trim() || "Kerala, India",
          level: selectedLevel?.toUpperCase(),
          score: scoreCount,
          totalQuestions: totalCount,
          percentage
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        console.log("Student certificate saved to persistent DB:", data.certificate);
      }
    } catch (err) {
      console.error("Failed to save student certificate to database:", err);
    }

    setIsCertificateReady(true);
  };

  // Dispatch Hardcopy Request (₹499 Donation)
  const handleDispatchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsDispatchSending(true);
    setDispatchSuccessMsg("");

    try {
      const response = await fetch("/api/dispatch-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          addressLine,
          city,
          state: stateName,
          pincode,
          phone,
          certId,
          level: selectedLevel?.toUpperCase()
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setDispatchSuccessMsg("Dispatch address details sent to mjtirur@gmail.com! Opening Razorpay ₹499 donation portal...");
        setTimeout(() => {
          window.open(data.razorpayUrl || "https://razorpay.me/@vamozhi", "_blank");
        }, 1500);
      } else {
        alert(data.error || "Failed to submit dispatch address.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting address details. Please try again.");
    } finally {
      setIsDispatchSending(false);
    }
  };

  // LinkedIn Certification URL generator
  const getLinkedInCertUrl = () => {
    const certTitle = encodeURIComponent(`Vamozhi Malayalam Language Proficiency (${LEVEL_CONFIGS[selectedLevel || "beginner"].badge})`);
    const org = encodeURIComponent("Vamozhi Gurukulam Academy");
    const issueYear = "2026";
    const certUrl = encodeURIComponent("https://vamozhi.com/");
    return `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certTitle}&organizationName=${org}&issueYear=${issueYear}&certUrl=${certUrl}`;
  };

  // Format countdown seconds into MM:SS
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto" id="malayalam-certification-exam">
      
      {/* Print Styles for Real University Certificate */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-university-certificate, #printable-university-certificate * {
            visibility: visible;
          }
          #printable-university-certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 30px;
            box-shadow: none !important;
            border: 8px double #1e1b4b !important;
            background: #ffffff !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* 1. LEVEL SELECTION SCREEN */}
      {!selectedLevel && (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3.5 py-1 bg-amber-400/20 text-amber-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-400/30 inline-block">
                Vamozhi Malayalam Academy • Official Examination
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Malayalam Language Certification Exams
              </h2>
              <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                Choose your difficulty level below. Score <strong>60% or higher</strong> to unlock your University-Grade Certificate of Completion, add directly to LinkedIn, or order a hardcopy dispatched to your doorstep!
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-3xl text-center shrink-0 min-w-[160px]">
              <Award className="w-10 h-10 text-amber-400 mx-auto" />
              <span className="text-[10px] font-black text-purple-200 uppercase block tracking-wider mt-2">
                Passing Score
              </span>
              <span className="text-3xl font-black text-amber-400 block mt-0.5">
                60%
              </span>
            </div>
          </div>

          {/* Level Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["beginner", "expert", "master"] as ExamLevel[]).map((lvl) => {
              const cfg = LEVEL_CONFIGS[lvl];
              return (
                <div
                  key={lvl}
                  className="bg-white border border-slate-200/80 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r ${cfg.color}`}>
                        {cfg.badge}
                      </span>
                      {cfg.timeLimitMinutes && (
                        <span className="text-[10px] font-mono font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          30 Mins
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-950 transition-colors">
                      {cfg.name}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {cfg.description}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-2xl space-y-1 border border-slate-100 text-xs">
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>Questions:</span>
                        <span className="text-purple-950 font-black">{cfg.questionsCount}</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>Min Pass (60%):</span>
                        <span className="text-emerald-700 font-black">{cfg.minPassScore} Correct</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartExam(lvl)}
                    className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r ${cfg.color} hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95`}
                  >
                    Start {cfg.badge} Exam
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Compact Inspirational Certificate Purpose Disclaimer Box (Under Exam Cards) */}
          <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 border border-amber-400 p-3.5 sm:p-4 rounded-2xl text-amber-950 shadow-sm text-left">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-950 shrink-0 mt-0.5" />
              <div className="space-y-1 text-[11px] leading-snug">
                <span className="font-black text-amber-950 uppercase tracking-wider text-[10px] block">
                  🌟 Cultural Inspiration Certificate Purpose (പ്രചോദന സർട്ടിഫിക്കറ്റ്)
                </span>
                <p className="text-amber-950 font-black">
                  <strong>മലയാളം:</strong> മലയാള ഭാഷയെ പ്രോത്സാഹിപ്പിക്കുന്നതിനും പ്രചരിപ്പിക്കുന്നതിനുമായി നൽകുന്ന ഒരു <strong>സ്നേഹ ബഹുമാന സർട്ടിഫിക്കറ്റാണിത് (Inspiration Certificate)</strong>. ഇത് യൂണിവേഴ്സിറ്റി ബിരുദമല്ല, മറിച്ച് മലയാള പഠനത്തോടുള്ള നിങ്ങളുടെ താല്പര്യത്തെ ആദരിക്കുന്നതിനുള്ള സാംസ്കാരിക ബഹുമാന പത്രമാണ്!
                </p>
                <p className="text-amber-900 font-extrabold">
                  <strong>English:</strong> Issued by Vamozhi Online Academy as an <strong>Honorary Inspiration Certificate</strong> to promote the Malayalam language worldwide. Not an accredited government degree.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. EXAM TAKING SCREEN */}
      {selectedLevel && !isSubmitted && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Header & Master Level 30-Min Countdown Timer */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-purple-900 to-pink-900">
                {LEVEL_CONFIGS[selectedLevel].badge}
              </span>
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Question {currentIdx + 1} of {questions.length}
              </span>
            </div>

            {secondsRemaining !== null && (
              <div className="flex items-center gap-1.5 bg-pink-50 text-pink-700 border border-pink-200 px-3.5 py-1.5 rounded-full font-mono text-xs font-black animate-pulse">
                <Clock className="w-4 h-4 text-pink-600" />
                <span>Time Left: {formatTime(secondsRemaining)}</span>
              </div>
            )}
          </div>

          {/* Current Question */}
          <div className="space-y-3 py-2">
            {questions[currentIdx]?.questionMl && (
              <span className="text-lg font-black text-purple-950 block font-sans">
                {questions[currentIdx].questionMl}
              </span>
            )}
            <h3 className="text-xl font-bold text-slate-900 leading-snug">
              {questions[currentIdx]?.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {questions[currentIdx]?.options.map((opt, optIdx) => {
              const isSelected = userAnswers[currentIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentIdx, optIdx)}
                  className={`p-4 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-purple-950 text-white border-purple-950 shadow-md scale-[1.01]"
                      : "bg-slate-50 hover:bg-slate-100/80 border-slate-200/80 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border text-[10px] font-black flex items-center justify-center ${
                      isSelected ? "bg-white text-purple-950 border-white" : "border-slate-300 text-slate-500"
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((prev) => prev - 1)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                currentIdx === 0
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              }`}
            >
              ← Previous
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx((prev) => prev + 1)}
                className="px-6 py-2.5 bg-purple-950 hover:bg-purple-900 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                Next Question
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                Submit {LEVEL_CONFIGS[selectedLevel].badge} Exam
                <FileCheck className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. EXAM SUBMITTED RESULTS VIEW */}
      {isSubmitted && !isCertificateReady && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-sm">
          {isPassed ? (
            <div className="space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-200">
                <Award className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest inline-block">
                  PASSED: {percentage}% (Min 60% Passed)
                </span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  Congratulations! (അഭിനന്ദനങ്ങൾ!)
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  You scored <strong>{scoreCount} out of {totalCount} ({percentage}%)</strong> on the {LEVEL_CONFIGS[selectedLevel!].name}!
                </p>
              </div>

              {/* Form to enter student details for certificate */}
              <div className="bg-purple-50/70 border border-purple-200/60 rounded-3xl p-6 sm:p-8 max-w-md mx-auto text-left space-y-4 shadow-sm">
                <div className="border-b border-purple-200/60 pb-3">
                  <h4 className="text-base font-black text-purple-950 tracking-tight flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-700" />
                    Enter Certificate Details
                  </h4>
                  <p className="text-xs text-purple-800/80 mt-0.5">
                    Enter your full name as it will be inscribed on your University Certificate.
                  </p>
                </div>

                <form onSubmit={handleGenerateCertificate} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-purple-950 uppercase tracking-wider">
                      Student Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Rahul Nair / Dr. Sarah Jenkins"
                        className="w-full pl-9 pr-3 py-2.5 bg-white text-xs font-bold rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
                      />
                      <User className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-purple-950 uppercase tracking-wider">
                      City / Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={studentLocation}
                        onChange={(e) => setStudentLocation(e.target.value)}
                        placeholder="e.g. Kochi, Kerala / Dubai, UAE"
                        className="w-full pl-9 pr-3 py-2.5 bg-white text-xs font-bold rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
                      />
                      <MapPin className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-purple-950 hover:bg-purple-900 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    Generate University Certificate →
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto border-4 border-pink-200">
                <XCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-[10px] font-black uppercase tracking-widest inline-block">
                  Score: {percentage}% (60% Required to Pass)
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Exam Attempt Unsuccessful (വീണ്ടും ശ്രമിക്കൂ)
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  You answered <strong>{scoreCount} out of {totalCount}</strong> correctly. You need at least 60% score to earn the certificate.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleResetExam}
                  className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-white rounded-xl font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. REAL UNIVERSITY-GRADE CERTIFICATE OF COMPLETION */}
      {isCertificateReady && (
        <div className="space-y-6">
          
          {/* Certificate Action Bar (LinkedIn, Print, Physical Dispatch ₹499) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 text-white p-4 sm:p-5 rounded-3xl no-print shadow-xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-black uppercase tracking-wider">
                Authentic Inspiration Certificate Awarded
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* Add to LinkedIn */}
              <a
                href={getLinkedInCertUrl()}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-[#0077b5] hover:bg-[#006396] text-white text-xs font-black rounded-xl uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <Linkedin className="w-4 h-4 fill-white" />
                Add to LinkedIn
              </a>

              {/* Order Physical Dispatch ₹499 */}
              <button
                onClick={() => setShowDispatchModal(true)}
                className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-purple-950 text-xs font-black rounded-xl uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                <Truck className="w-4 h-4" />
                Dispatch Hardcopy (₹499)
              </button>

              {/* Print / Save PDF */}
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>

              {/* Restart */}
              <button
                onClick={handleResetExam}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* CERTIFICATE DISPLAY FRAME - UNIVERSITY DESIGN */}
          <div
            id="printable-university-certificate"
            className="bg-white border-[6px] sm:border-[12px] border-double border-purple-950 rounded-3xl p-3 sm:p-8 md:p-14 shadow-2xl relative overflow-hidden text-center space-y-4 sm:space-y-6 w-full"
          >
            {/* Corner Ornate Accents */}
            <div className="absolute top-3 left-3 text-purple-950 font-serif text-2xl select-none">⚜️</div>
            <div className="absolute top-3 right-3 text-purple-950 font-serif text-2xl select-none">⚜️</div>
            <div className="absolute bottom-3 left-3 text-purple-950 font-serif text-2xl select-none">⚜️</div>
            <div className="absolute bottom-3 right-3 text-purple-950 font-serif text-2xl select-none">⚜️</div>

            {/* Subtle Watermark Seal */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <span className="text-[200px] font-black font-sans text-purple-950">വാ</span>
            </div>

            {/* Inner Golden Double Border */}
            <div className="border-2 border-amber-400 p-3.5 sm:p-6 md:p-10 rounded-2xl relative z-10 space-y-4 sm:space-y-6 bg-gradient-to-b from-amber-50/20 via-white to-amber-50/20">
              
              {/* Top Crest / Motto Ribbon */}
              <div className="flex flex-col items-center justify-center space-y-2 border-b-2 border-amber-300 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-950 via-purple-900 to-pink-900 rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-xl transform -rotate-3 border-2 border-amber-400 font-sans">
                  വാ
                </div>
                <div className="text-center space-y-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-purple-950 tracking-widest uppercase block font-serif">
                    VAMOZHI ONLINE ACADEMY
                  </span>
                  <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest block font-sans">
                    CENTER FOR MALAYALAM LANGUAGE & CULTURAL STUDIES • ESTD 2026
                  </span>
                  <span className="text-[10px] text-slate-500 font-serif italic block">
                    "വിദ്യ ധനം സർവ്വ ധനാൽ പ്രധാനം" (Knowledge is the supreme wealth)
                  </span>
                </div>
              </div>

              {/* Title Section */}
              <div className="space-y-2 py-3">
                <span className="px-5 py-1 rounded-full bg-amber-100 text-amber-950 text-[11px] font-black uppercase tracking-widest inline-block border border-amber-300">
                  DIPLOMA CERTIFICATE OF PROFICIENCY
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-purple-950 tracking-tight uppercase font-sans">
                  MALAYALAM LANGUAGE & SCRIPT
                </h1>
                <span className="text-xs font-extrabold text-slate-500 block uppercase tracking-widest">
                  മലയാളഭാഷാ പ്രവീൺ സാക്ഷരതാ സർട്ടിഫിക്കറ്റ്
                </span>
              </div>

              {/* Student Name */}
              <div className="py-4 space-y-1 border-b border-dashed border-slate-300 max-w-xl mx-auto">
                <span className="text-xs text-slate-600 font-serif italic block">This is to officially certify that</span>
                <span className="text-3xl sm:text-4xl font-black text-purple-950 block tracking-tight underline decoration-amber-400 decoration-4 underline-offset-8">
                  {studentName}
                </span>
                {studentLocation && (
                  <span className="text-xs font-extrabold text-slate-600 block pt-2">
                    of {studentLocation}
                  </span>
                )}
              </div>

              {/* Certification Statement */}
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed max-w-2xl mx-auto font-medium">
                has successfully passed the academic examination for <strong>{LEVEL_CONFIGS[selectedLevel!].name}</strong> with a score of <strong className="text-purple-950 font-black">{percentage}% ({scoreCount}/{totalCount})</strong>, demonstrating proficient mastery of Malayalam Phonetics, Vocabulary, Grammar, and Cultural Heritage.
              </p>

              {/* Official Seal & Serial ID Footer (NO DIRECTOR NAME as requested) */}
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t-2 border-slate-200">
                {/* Left: Serial ID & Verification Stamp */}
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase block tracking-wider">
                    Certificate Serial ID
                  </span>
                  <span className="text-sm font-mono font-black text-purple-950 block tracking-wider bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">
                    {certId}
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold block pt-1">
                    Verified Online at: Vamozhi.com
                  </span>
                </div>

                {/* Center: Authentic Circular Official Vamozhi Seal */}
                <div className="w-24 h-24 bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 rounded-full border-4 border-amber-600 flex flex-col items-center justify-center text-purple-950 shadow-xl transform rotate-3 relative p-2">
                  <div className="w-full h-full border border-dashed border-amber-800 rounded-full flex flex-col items-center justify-center text-center">
                    <Sparkles className="w-5 h-5 text-purple-950" />
                    <span className="text-[8px] font-black uppercase tracking-tighter block leading-tight mt-1 text-purple-950">
                      VAMOZHI<br/>OFFICIAL<br/>SEAL
                    </span>
                  </div>
                </div>

                {/* Right: Date of Issue & Registrar Stamp */}
                <div className="text-right space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase block tracking-wider">
                    Date of Award
                  </span>
                  <span className="text-xs font-mono font-black text-slate-900 block border-b border-slate-300 pb-1">
                    {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                  <span className="text-[9px] font-black text-purple-900 uppercase block pt-1">
                    OFFICE OF THE REGISTRAR
                  </span>
                </div>
              </div>

              {/* Inspiration Certificate Footnote */}
              <div className="pt-4 border-t border-slate-200/80 text-center text-[9px] text-slate-500 font-medium">
                * Honorary Cultural Inspiration & Achievement Certificate issued by Vamozhi Online Academy to promote and preserve the Malayalam language worldwide. Not an accredited university degree.
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 5. PHYSICAL HARDCOPY DISPATCH MODAL (₹499 DONATION) */}
      {showDispatchModal && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-black text-slate-900">
                  Order Physical Printed Certificate (₹499)
                </h3>
              </div>
              <button
                onClick={() => setShowDispatchModal(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              We will print your high-resolution parchment certificate, affix the gold foil seal, and dispatch it to your address. A nominal <strong>₹499 donation</strong> covers printing & speed post shipping costs.
            </p>

            {dispatchSuccessMsg ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 font-bold space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-black">
                  <Check className="w-5 h-5" />
                  <span>Dispatch Request Logged!</span>
                </div>
                <p>{dispatchSuccessMsg}</p>
                <a
                  href="https://razorpay.me/@vamozhi"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer block text-center"
                >
                  Pay ₹499 on Razorpay Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <form onSubmit={handleDispatchSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    Full Name for Dispatch *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    House Name / Door No / Street Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="e.g. Door No. 42, Green Valley Apartments, MG Road"
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Kochi / Tirur"
                      className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      State
                    </label>
                    <input
                      type="text"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      placeholder="Kerala"
                      className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="676101"
                      className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isDispatchSending}
                  className="w-full py-3 bg-purple-950 hover:bg-purple-900 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {isDispatchSending ? "Submitting Address..." : "Submit Address & Proceed to Razorpay ₹499 →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
