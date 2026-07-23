/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Instagram, 
  MessageCircle, 
  Send, 
  Heart, 
  Bookmark, 
  Copy, 
  Check, 
  Zap, 
  TrendingUp,
  Flame,
  Coffee,
  HeartHandshake,
  Palmtree,
  Smile,
  RefreshCw,
  Download,
  GraduationCap,
  Book,
  Languages,
  Hash,
  Lightbulb,
  Film
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

const HERO_PREVIEWS = [
  {
    id: "rain",
    tag: "Aesthetic / Rain",
    emoji: "☕☔",
    textMl: "കുളിർകാറ്റും ഒരു കപ്പ് ചായയും... മഴത്തുള്ളികളിൽ അലിഞ്ഞിറങ്ങുന്ന പ്രിയപ്പെട്ട ഓർമ്മകളും! ☕☔️",
    textManglish: "Kulirkaattum oru cup chayayum... mazhathullikalil alinjirangunna priyapetta ormakalum! ☕☔️",
    hashtags: "#chayavibes #keralarain #monsoonvibes",
    bg: "from-indigo-950 via-purple-900 to-pink-800",
    likes: "8,492"
  },
  {
    id: "attitude",
    tag: "Attitude / Class",
    emoji: "😎🔥",
    textMl: "സ്വന്തം വഴികളിലൂടെ തനിച്ചു നടന്നു ജയിച്ചവനാണ്... മറ്റുള്ളവരുടെ വളർച്ചയിൽ അസൂയപ്പെടാത്തത്! 🔥👑",
    textManglish: "Swantham vazhikaliloode thanichu nadannu jayichavanaanu... mattullavarude valarchayil asooyappedathathu! 🔥👑",
    hashtags: "#attitude #keralaboy #classyvibes",
    bg: "from-zinc-950 via-slate-900 to-purple-950",
    likes: "12,340"
  },
  {
    id: "love",
    tag: "Love / Romantic",
    emoji: "💖🌸",
    textMl: "മൗനങ്ങൾക്ക് പോലും സംഗീതത്തിന്റെ മധുരമുണ്ട്... നീയെന്നരികിൽ ഉള്ളപ്പോൾ! 🌸✨",
    textManglish: "Maunangalkku polum sangeethathinte madhuramundu... neeyennarikil ullappol! 🌸✨",
    hashtags: "#lovequotes #malayalamlove #purelove",
    bg: "from-rose-950 via-pink-900 to-purple-900",
    likes: "15,810"
  },
  {
    id: "kerala",
    tag: "Kerala Pride",
    emoji: "🌴🚣",
    textMl: "ഓളപ്പരപ്പിലെ വെയിലും നീലാകാശവും... പ്രകൃതി സ്നേഹത്തോടെ ഹൃദയത്തോട് ചേർത്തുവെച്ച എൻ്റെ നാട്! 🌴💚",
    textManglish: "Olapparappile veyilum neelaakashavum... prakruthi snehathode hridayathodu cherthuwecha ente naadu! 🌴💚",
    hashtags: "#godsowncountry #keralagallery #keralatourism",
    bg: "from-emerald-950 via-teal-900 to-cyan-950",
    likes: "9,920"
  },
  {
    id: "friendship",
    tag: "Chank / Friendship",
    emoji: "🤝⚡",
    textMl: "ജീവിതത്തിലെ കൊടുങ്കാറ്റുകളിൽ തണലായി കൂടെ നിൽക്കുന്ന ചങ്കുകൾ... അതാണ് ഏറ്റവും വലിയ സമ്പാദ്യം! ⚡❤️",
    textManglish: "Jeevithathile kodunkaattukalil thanalaayi koode nilkkunna changukal... athanu ettavum valiya sampaadhyam! ⚡❤️",
    hashtags: "#chankuyir #friendshipgoals #keralafriends",
    bg: "from-blue-950 via-indigo-900 to-purple-950",
    likes: "11,450"
  },
  {
    id: "travel",
    tag: "Travel / Wanderlust",
    emoji: "🧭🚗",
    textMl: "അതിരുകളില്ലാത്ത ആകാശവും, വഴികളില്ലാത്ത കാടുകളും... യാത്രകൾ നമ്മെ പുനർജനിക്കാൻ പഠിപ്പിക്കുന്നു! 🏔️✨",
    textManglish: "Athirukalillatha aakashavum, vazhikalillatha kaadukalum... yaathrakal namme punarjanikkaan padippikkunnu! 🏔️✨",
    hashtags: "#keralatravel #wanderlust #wayanadvibes",
    bg: "from-teal-950 via-emerald-900 to-slate-950",
    likes: "14,200"
  },
  {
    id: "reel-hooks",
    tag: "Reel Hooks & Ideas",
    emoji: "🎬💡",
    textMl: "ബിസിനസ്സ് വളർത്താൻ 5 റീൽ ഹുക്കുകൾ: 1. 'നിങ്ങൾ ഈ തെറ്റ് ചെയ്യുന്നുണ്ടോ?', 2. 'ആരും പറയാത്ത രഹസ്യം!' 🎬🔥",
    textManglish: "Business valarthan 5 Reel hooks: 1. 'Ninkal ee thettu cheyyunundo?', 2. 'Aarum parayatha rahasyam!' 🎬🔥",
    hashtags: "#reelhooks #contentideas #vamozhi",
    bg: "from-fuchsia-950 via-purple-900 to-indigo-950",
    likes: "18,420"
  },
  {
    id: "nostalgia",
    tag: "Nostalgia / School",
    emoji: "🎒📚",
    textMl: "കാലം മാറിയെങ്കിലും മായാതെ നിൽക്കുന്ന ചില ഓർമ്മകളുണ്ട്... ബാല്യത്തിന്റെ അവിസ്മരണീയമായ സുഗന്ധം പോലെ! 🎒💛",
    textManglish: "Kaalam maariyengilum maayaathe nilkkunna chila ormakalundu... baalyathinte avismaraneeyamaaya sugandham pole! 🎒💛",
    hashtags: "#nostalgia #schoolmemories #malayalam",
    bg: "from-amber-950 via-orange-950 to-purple-950",
    likes: "16,780"
  },
  {
    id: "mass",
    tag: "Mass / Swag",
    emoji: "🦁⚡",
    textMl: "വാക്കുകൾ കൊണ്ടു തെളിയിക്കേണ്ട ആവശ്യമില്ല... സമയമാകുമ്പോൾ ചരിത്രം ഉത്തരം നൽകും! 👑⚡",
    textManglish: "Vaakkukal kondu theliyikkenda aavashyamilla... samayamaakumbol charithram uthram nalkum! 👑⚡",
    hashtags: "#massdialogue #malayalammass #swag",
    bg: "from-red-950 via-purple-950 to-slate-950",
    likes: "18,900"
  }
];

interface HeroProps {
  onNavigate?: (path: string) => void;
  onSelectCategory?: (categorySlug: string) => void;
}

const VIBE_CHIPS = [
  { label: "☕ Kattans & Rain", cat: "kattan-chai", icon: Coffee },
  { label: "🌴 Kerala Pride", cat: "kerala-vibes", icon: Palmtree },
  { label: "😎 Attitude Lines", cat: "attitude", icon: Flame },
  { label: "💖 Love & Romance", cat: "love", icon: HeartHandshake },
  { label: "🤪 Funny & Trolls", cat: "funny", icon: Smile },
];

export default function Hero({ onNavigate, onSelectCategory }: HeroProps) {
  const { t, language } = useLanguage();
  
  // Pick a random preview index on each load!
  const [activePreviewIndex, setActivePreviewIndex] = useState(() => Math.floor(Math.random() * HERO_PREVIEWS.length));
  const [copied, setCopied] = useState(false);
  const [scriptMode, setScriptMode] = useState<"ml" | "manglish">("ml");

  // Pick new random caption on each load or button click
  const handleShufflePreview = () => {
    setActivePreviewIndex((prev) => (prev + 1) % HERO_PREVIEWS.length);
  };

  const currentPreview = HERO_PREVIEWS[activePreviewIndex];

  // Canvas Instagram Story (1080x1920) Image Download Generator
  const handleDownloadImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background Gradient (Story Deep Rich Tone)
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
    gradient.addColorStop(0, "#090d16");
    gradient.addColorStop(0.3, "#2e1065");
    gradient.addColorStop(0.7, "#581c87");
    gradient.addColorStop(1, "#831843");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Decorative Story Outer Frame
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 16;
    ctx.strokeRect(50, 50, 980, 1820);

    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 4;
    ctx.strokeRect(75, 75, 930, 1770);

    // Top Story Header Category Badge
    ctx.font = "bold 34px sans-serif";
    ctx.fillStyle = "#fef08a";
    ctx.textAlign = "center";
    ctx.fillText(`✨ ${currentPreview.tag.toUpperCase()}`, 540, 280);

    // Decorative Golden Divider Line
    ctx.strokeStyle = "rgba(251, 191, 36, 0.8)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(400, 330);
    ctx.lineTo(680, 330);
    ctx.stroke();

    // Center Quote Card Frame Box (Instagram Story Focus Area)
    ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
    ctx.beginPath();
    ctx.roundRect(120, 580, 840, 780, 48);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Opening Quote Symbol
    ctx.font = "900 90px Georgia, serif";
    ctx.fillStyle = "#f59e0b";
    ctx.fillText("“", 540, 700);

    // Main Caption Text Wrapping with Dynamic Font Scaling & Vertical Centering
    const textToRender = scriptMode === "ml" ? currentPreview.textMl : currentPreview.textManglish;
    
    const getLines = (fSize: number) => {
      ctx.font = `bold ${fSize}px sans-serif`;
      const words = textToRender.split(" ");
      const linesArray: string[] = [];
      let currentLine = "";
      const maxWidth = 720;
      for (let n = 0; n < words.length; n++) {
        const testLine = currentLine + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          linesArray.push(currentLine.trim());
          currentLine = words[n] + " ";
        } else {
          currentLine = testLine;
        }
      }
      linesArray.push(currentLine.trim());
      return linesArray;
    };

    let fontSize = 46;
    let lineHeight = 70;
    let lines = getLines(fontSize);

    if (lines.length > 4) {
      fontSize = 38;
      lineHeight = 58;
      lines = getLines(fontSize);
    }
    if (lines.length > 5) {
      fontSize = 32;
      lineHeight = 50;
      lines = getLines(fontSize);
    }

    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = "#ffffff";

    // Vertical centering inside quote box
    const totalTextHeight = lines.length * lineHeight;
    let startY = 940 - (totalTextHeight / 2) + (lineHeight / 2);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 540, startY + (i * lineHeight));
    }

    // Hashtags
    ctx.font = "bold 30px monospace";
    ctx.fillStyle = "#fef08a";
    ctx.fillText(currentPreview.hashtags, 540, startY + (lines.length * lineHeight) + 40);

    // Story Bottom Watermark Footer
    ctx.font = "bold 34px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("© vamozhi.com", 540, 1720);

    // Download Trigger
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `vamozhi-story-${currentPreview.id}.png`;
    link.href = image;
    link.click();
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleCopyPreview = () => {
    const textToCopy = scriptMode === "ml" ? currentPreview.textMl : currentPreview.textManglish;
    navigator.clipboard.writeText(`${textToCopy}\n${currentPreview.hashtags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 md:pt-8 md:pb-20 px-4 sm:px-6 lg:px-8" id="hero-section">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-purple-300/30 blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-1/10 w-[500px] h-[500px] rounded-full bg-pink-300/25 blur-3xl -z-10" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4 md:gap-6 text-left" id="hero-left-content">
            
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2"
              id="hero-badge"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white text-xs font-black shadow-xs">
                <span>🚀 5000+ Creators Using it for Caption & Hashtags</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-black">
                <span>Specially Formulated for Kerala Creators ❤️</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] font-sans"
              id="hero-title"
            >
              Learn, Create & <br />
              <span className="bg-gradient-to-r from-purple-950 via-pink-600 to-amber-600 bg-clip-text text-transparent italic font-serif">
                Explore Malayalam
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed"
              id="hero-description"
            >
              Find the perfect Malayalam and Manglish captions, quotes, Reel hooks and trending hashtags for instagram, whatsapp, snapchat and more.
            </motion.p>

            {/* Primary Action Buttons (Simplified Hierarchy) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 w-full mt-2"
              id="hero-buttons"
            >
              {/* Primary CTA */}
              <button
                onClick={() => {
                  if (onNavigate) onNavigate("/malayalam-caption-generator");
                  else { window.history.pushState(null, "", "/malayalam-caption-generator"); window.dispatchEvent(new Event("popstate")); }
                }}
                className="px-6 py-4 bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 hover:from-purple-900 hover:to-indigo-900 text-white rounded-2xl font-extrabold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                id="btn-hero-primary-create"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Create Captions</span>
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => {
                  if (onNavigate) onNavigate("/malayalam-reel-hooks");
                  else { window.history.pushState(null, "", "/malayalam-reel-hooks"); window.dispatchEvent(new Event("popstate")); }
                }}
                className="px-5 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-sm text-sm"
                id="btn-hero-secondary-explore"
              >
                <Film className="w-4 h-4 text-pink-500" />
                <span>Explore Creator Tools</span>
              </button>

              {/* Text Link */}
              <button
                onClick={() => {
                  if (onNavigate) onNavigate("/learn-malayalam");
                  else { window.history.pushState(null, "", "/learn-malayalam"); window.dispatchEvent(new Event("popstate")); }
                }}
                className="px-3 py-2 text-sm font-extrabold text-purple-700 hover:text-purple-900 underline underline-offset-4 flex items-center gap-1.5 cursor-pointer ml-1"
                id="btn-hero-text-learn"
              >
                <GraduationCap className="w-4 h-4 text-purple-600 inline" />
                <span>Learn Malayalam</span>
              </button>
            </motion.div>

            {/* Quick Vibe Chips Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full pt-2"
            >
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                ⚡ Instant Vibe Launcher:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {VIBE_CHIPS.map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={chip.label}
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate("/malayalam-caption-generator");
                        } else {
                          window.history.pushState(null, "", "/malayalam-caption-generator");
                          window.dispatchEvent(new Event("popstate"));
                        }
                        if (onSelectCategory) {
                          onSelectCategory(chip.cat);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white border border-slate-200/80 hover:border-purple-300 text-slate-700 hover:text-purple-900 rounded-xl text-xs font-semibold shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
                    >
                      <Icon className="w-3.5 h-3.5 text-pink-500 group-hover:scale-110 transition-transform" />
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Social Proof & Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/70 w-full mt-2"
              id="hero-proof"
            >
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-1">
                  1,000+
                  <GraduationCap className="w-5 h-5 text-emerald-500 inline-block" />
                </span>
                <span className="text-xs text-slate-500 font-medium">Learned & Certified</span>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  100% Free
                </span>
                <span className="text-xs text-slate-500 font-medium">No Sign-up Required</span>
              </div>

              <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="text-2xl md:text-3xl font-black text-purple-900 tracking-tight">
                  Instant Results
                </span>
                <span className="text-xs text-slate-500 font-medium">Instant Generation</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
            id="hero-right-preview"
          >
            {/* Floating Badge 1 */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="hidden sm:flex absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 items-center gap-2.5 max-w-[180px]"
            >
              <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-black text-slate-900 leading-tight">Manglish Transliterated</p>
                <p className="text-[9px] text-slate-500 font-medium">Safe local typing</p>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="hidden sm:flex absolute -bottom-4 -right-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 items-center gap-2.5 max-w-[190px]"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-black text-slate-900 leading-tight">1-Click Instagram Copy</p>
                <p className="text-[9px] text-slate-500 font-medium">Ready with hashtags</p>
              </div>
            </motion.div>

            {/* Phone Card Shell */}
            <div className="relative w-full max-w-sm rounded-[32px] bg-slate-950 text-white p-1.5 shadow-2xl border border-slate-800 shadow-purple-950/20 overflow-hidden">
              
              {/* Phone Top Header */}
              <div className="flex items-center justify-between p-3.5 border-b border-slate-800/80 bg-slate-950/90">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-black text-pink-400">
                      VM
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-black tracking-wide flex items-center gap-1">
                      vamozhi.app
                      <span className="inline-block w-3.5 h-3.5 bg-blue-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">✓</span>
                    </h4>
                    <p className="text-[9px] font-semibold text-slate-400">Live Interactive Preview</p>
                  </div>
                </div>

                {/* Script Switcher inside phone header */}
                <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setScriptMode("ml")}
                    className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase transition-all cursor-pointer ${
                      scriptMode === "ml" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    മലയാളം
                  </button>
                  <button
                    onClick={() => setScriptMode("manglish")}
                    className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase transition-all cursor-pointer ${
                      scriptMode === "manglish" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Manglish
                  </button>
                </div>
              </div>

              {/* Dynamic Preset Tabs Bar */}
              <div className="flex items-center justify-around bg-slate-900/90 border-b border-slate-800/60 p-1.5">
                {HERO_PREVIEWS.map((prev, idx) => (
                  <button
                    key={prev.id}
                    onClick={() => setActivePreviewIndex(idx)}
                    className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activePreviewIndex === idx
                        ? "bg-white/15 text-white ring-1 ring-white/20 shadow-xs"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span>{prev.emoji}</span>
                    <span className="hidden xs:inline">{prev.tag.split(" / ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Post Canvas Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPreview.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className={`min-h-[380px] sm:min-h-[420px] relative overflow-hidden bg-gradient-to-br ${currentPreview.bg} flex flex-col justify-between p-4 sm:p-6 text-center shadow-inner rounded-b-[28px]`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Top Tag Pill */}
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] bg-slate-950/60 backdrop-blur-md text-purple-200 px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold border border-white/10">
                      {currentPreview.tag}
                    </span>
                    <span className="text-[10px] bg-amber-500/20 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                      🔥 Trending
                    </span>
                  </div>

                  {/* Caption Text Box */}
                  <div className="my-auto z-10 px-2">
                    <p className="text-base sm:text-lg font-medium leading-relaxed text-white drop-shadow-sm font-sans tracking-wide">
                      "{scriptMode === "ml" ? currentPreview.textMl : currentPreview.textManglish}"
                    </p>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto my-3 rounded-full opacity-80" />
                    <p className="text-xs font-mono text-purple-200/90 font-medium">
                      {currentPreview.hashtags}
                    </p>
                  </div>

                  {/* Copy, Download Image & Next Caption Action Row */}
                  <div className="z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                    <button
                      onClick={handleCopyPreview}
                      className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-white/20 active:scale-95 shadow-md"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-white" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate("/malayalam-reel-hooks");
                        } else {
                          window.history.pushState(null, "", "/malayalam-reel-hooks");
                          window.dispatchEvent(new Event("popstate"));
                        }
                      }}
                      title="Explore Reel Hooks & Content Ideas"
                      className="px-3 py-1.5 bg-gradient-to-r from-pink-500/30 to-purple-500/30 hover:from-pink-500/40 hover:to-purple-500/40 backdrop-blur-md text-pink-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-pink-400/40 active:scale-95 shadow-md"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                      <span>Get More Ideas 💡</span>
                    </button>

                    <button
                      onClick={handleShufflePreview}
                      title="Show Next Random Caption"
                      className="px-2.5 py-1.5 bg-amber-400/20 hover:bg-amber-400/30 backdrop-blur-md text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-amber-400/30 active:scale-95 shadow-md"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Next 🎲</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Icons Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 bg-slate-950">
                <div className="flex items-center gap-4 text-slate-400">
                  <Heart className="w-5 h-5 hover:text-red-500 hover:fill-red-500 cursor-pointer transition-colors" />
                  <MessageCircle className="w-5 h-5 hover:text-slate-200 cursor-pointer transition-colors" />
                  <Send className="w-5 h-5 hover:text-slate-200 cursor-pointer transition-colors" />
                </div>
                <Bookmark className="w-5 h-5 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors" />
              </div>

              {/* Mock Social Footer */}
              <div className="px-4 pb-4 text-left border-t border-slate-900 bg-slate-950 pt-2.5">
                <p className="text-[11px] text-slate-400 font-medium">
                  Liked by <span className="text-slate-100 font-bold">kerala_creators</span> and <span className="text-slate-100 font-bold">{currentPreview.likes} others</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tap "Generate" below to search 1,000+ custom Malayalam captions!
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

