/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getLoadedCaptionsSync } from "./captionLoader";

export interface CaptionItem {
  id: string;
  text: string;
  language: 'malayalam' | 'manglish' | 'english' | 'mixed';
  category?: string; // legacy support
  tone?: string; // legacy support
  type?: string; // legacy support
  tags?: string[]; // legacy support

  // New multi-dimensional properties for high-precision writing assistant
  platforms?: string[];
  contentTypes?: string[];
  categories?: string[];
  moods?: string[];
  occasions?: string[];
  tones?: string[];
  length?: 'one-line' | 'short' | 'medium' | 'detailed';
  keywords?: string[];
  hashtags?: string[];
}

// Opening phrases based on Category and Tone to prepend for variation
export const OPENING_PHRASES: Record<string, Record<string, string[]>> = {
  malayalam: {
    love: [
      "പ്രിയപ്പെട്ടവരോടൊപ്പം... ",
      "ചില പ്രണയനിമിഷങ്ങൾ... ",
      "മനസ്സിൽ നിറഞ്ഞ പ്രണയത്തോടെ, ",
      "ഹൃദയം തൊട്ട നിമിഷം... ",
      "നീ കൂടെയുള്ളപ്പോൾ... "
    ],
    attitude: [
      "ഒരു കാര്യം ഓർത്തു വെച്ചോളൂ... ",
      "എന്റെ റൂൾസ്, എന്റെ വഴി! ",
      "ആരുടെയും മുന്നിൽ തല കുനിക്കാൻ ശീലിച്ചിട്ടില്ല. ",
      "ചിലരെ തിരുത്താൻ പോകാറില്ല, വിട്ടുകളയും. ",
      "സ്റ്റൈലും തന്റേടവും കൂട്ടായുള്ള യാത്ര. "
    ],
    travel: [
      "വഴികൾ നീളുന്നിടത്തേക്ക്... ",
      "യാത്രകളുടെ സുഖം... ",
      "കാടും മലയും കായലും തേടി... ",
      "മനസ്സ് വീണ്ടും മലനിരകളിലാണ്. ",
      "പുതിയ വഴികൾ തേടി ഒരു യാത്ര... "
    ],
    funny: [
      "ശരിക്കും ഇതൊരു കോമഡിയാണ്... ",
      "ചിരിച്ചും ചിരിപ്പിച്ചും മുന്നോട്ട്! ",
      "എന്റെ ദൈവമേ, ഇതെന്ത് അവസ്ഥയാണ്! ",
      "ഒരു കുഞ്ഞു തമാശ... ",
      "ഡയറ്റ് ഒക്കെ നാളെ മുതൽ തുടങ്ങാം! "
    ],
    kerala: [
      "ദൈവത്തിന്റെ സ്വന്തം നാട്ടിൽ നിന്നും... ",
      "കേരള തനിമയിൽ... ",
      "ഈ പച്ചപ്പും കായലുകളും... ",
      "നാടൻ സ്റ്റൈൽ വൈബ്സ്! ",
      "മലയാളി ഡാ! "
    ]
  },
  manglish: {
    love: [
      "Chila pranaya nimishangal... ",
      "Nee koodeyullappol... ",
      "Ente manassu niranja snehatthode... ",
      "Oru manoharamaya bandham... ",
      "Nee ennum ente lokamanu... "
    ],
    attitude: [
      "Oru karyam orthu vecholu... ",
      "Ente life, ente rules! ",
      "Arudeyum munnil thala kunikkaan sheelamilla. ",
      "Silent, calm, but unstoppable vibe... ",
      "Njan ennum enikku mathramulla brand aanu. "
    ],
    travel: [
      "Vazhikal neelunndidathekku... ",
      "Yathrakal tharunna sugham... ",
      "Let's get lost in Kerala... ",
      "Chasing mountains and sunrises... ",
      "Wanderlust vibes activated! "
    ],
    funny: [
      "Sherikkum ithoru comedy aanu... ",
      "Chirichu chirichu rasikkaam! ",
      "Ente daivame, ithu enthuvade... ",
      "Diet okke naale thudangaam... ",
      "Oru chiri koodi undel nalla life! "
    ],
    kerala: [
      "Daivathinte swantham naattil ninnu... ",
      "Kerala thanima niranja vazhikal... ",
      "Pure Malayali vibes only... ",
      "Pachappum kayalukalum koode nalla chaya! ",
      "Naadan styling and feels... "
    ]
  },
  english: {
    love: [
      "With endless love, ",
      "Cherishing our special bond... ",
      "To my favorite person, ",
      "From the bottom of my heart, ",
      "Every single heartbeat... "
    ],
    attitude: [
      "Just remember one thing: ",
      "My life, my rules! ",
      "Never explain yourself to anyone. ",
      "Keep shining and let them wonder. ",
      "Classy, sassy, and a bit bad-assy. "
    ],
    travel: [
      "Chasing sunsets... ",
      "Wanderlust activated! ",
      "Finding peace on the road... ",
      "To travel is to live. ",
      "Collecting memories, not things. "
    ],
    funny: [
      "Here is a little life truth... ",
      "Laughing at my own jokes... ",
      "Oh my god, this situation is so real! ",
      "Diet starts tomorrow, definitely! ",
      "Smiling makes everything better. "
    ],
    kerala: [
      "Straight from God's Own Country... ",
      "Kerala vibes only... ",
      "Lush green coconut trees and backwaters... ",
      "Pure traditional elegance. ",
      "Sipping tea in the rain... "
    ]
  }
};

// Emotional or stylish middle phrases to inject
export const EMOTIONAL_BRIDGES: Record<string, string[]> = {
  malayalam: [
    "വാക്കുകൾക്ക് അപ്പുറമുള്ള വികാരം. ",
    "ഹൃദയത്തിന്റെ ഭാഷയിൽ എഴുതിയത്. ",
    "ഒരു മനോഹരമായ സ്വപ്നം പോലെ തോന്നിപ്പിക്കുന്നു. ",
    "ഇതുപോലൊരു അനുഭവം ഇതിനു മുൻപ് ഉണ്ടായിട്ടില്ല. ",
    "ചില ബന്ധങ്ങൾ അങ്ങനെയാണ്, വാക്കുകളില്ലാതെ മനസ്സിലാക്കാൻ കഴിയും. "
  ],
  manglish: [
    "Vakkukalkku appurammulla oru feeling. ",
    "Hridayathinte bhashayil paranjaal... ",
    "Oru manoharamaya swapnam pole thonnum. ",
    "Ithuvare anubhavikkaatha oru nalla vibe. ",
    "Chila bandhangal anganeya, parayathe manassilakkam. "
  ],
  english: [
    "A beautiful feeling beyond words. ",
    "Speaking directly from the heart... ",
    "Feels just like a wonderful dream. ",
    "An unmatched, positive vibe indeed. ",
    "Some bonds are silent, understood without a single word. "
  ]
};

// Category-specific ending lines/CTAs
export const ENDING_LINES: Record<string, string[]> = {
  malayalam: [
    "നിങ്ങൾ എന്താണ് കരുതുന്നത്? താഴെ കമന്റ് ചെയ്യൂ! ⬇️",
    "ഇഷ്ടമായാൽ ഷെയർ ചെയ്യാൻ മറക്കരുതേ! ✨",
    "ഈ വൈബ്സ് നിങ്ങളിലും നിറയട്ടെ. 🌸",
    "ചിത്രം ഇഷ്ടപ്പെട്ടെങ്കിൽ ലൈക്ക് അടിക്കൂ! ❤️",
    "കൂടുതൽ വിശേഷങ്ങളുമായി അടുത്ത പോസ്റ്റിൽ കാണാം. 🙌"
  ],
  manglish: [
    "Ningal enthanu karuthunnath? Comment cheyyoo! ⬇️",
    "Ishtam ayaal share cheyyaan marakaruthe! ✨",
    "Ee vibes ningalilum nirayatte. 🌸",
    "Double tap if you feel this vibe! ❤️",
    "Keep supporting for more awesome vibes! 🙌"
  ],
  english: [
    "What do you think? Drop a comment below! ⬇️",
    "Don't forget to share if you loved this! ✨",
    "May these positive vibes fill your day. 🌸",
    "Double tap if you resonate with this! ❤️",
    "Stay tuned for more beautiful stories! 🙌"
  ]
};

// Core database of structured captions, bio templates, hooks, and tags
export const CAPTIONS_DATABASE: CaptionItem[] = [
  // ==========================================
  // LOVE CATEGORY (Malayalam, Manglish, Mixed)
  // ==========================================
  {
    id: "love_m1",
    text: "നിന്റെ കണ്ണുകളിലെ ആ തിളക്കമാണ് എന്റെ ലോകത്തെ പ്രകാശിപ്പിക്കുന്നത്. നീയില്ലെങ്കിൽ ഞാനില്ല.",
    language: "malayalam",
    category: "love",
    tone: "romantic",
    type: "caption",
    tags: ["romantic", "couple", "togetherness"]
  },
  {
    id: "love_m2",
    text: "ചില പ്രണയം അങ്ങനെയാണ്, വാക്കുകൾ കൊണ്ടല്ല കണ്ണുകൾ കൊണ്ടാണ് സംസാരിക്കുക. ഹൃദയത്തിൽ തൊട്ടത്.",
    language: "malayalam",
    category: "love",
    tone: "emotional",
    type: "caption",
    tags: ["eyes", "silent-love", "deep"]
  },
  {
    id: "love_m3",
    text: "ഒരു കുഞ്ഞു പുഞ്ചിരിയിലൂടെ നീ എന്റെ ഹൃദയം കവർന്നു. ഇനിയുള്ള യാത്ര നമ്മൾ ഒന്നിച്ച് മാത്രം.",
    language: "malayalam",
    category: "love",
    tone: "cute",
    type: "caption",
    tags: ["smile", "journey", "together"]
  },
  {
    id: "love_m4",
    text: "ഏഴാം ജന്മത്തിലും കൂടെയുണ്ടാകണം എന്ന് ആഗ്രഹിക്കുന്ന ഒരേയൊരു കൂട്ട് നീ മാത്രമാണ്.",
    language: "malayalam",
    category: "love",
    tone: "romantic",
    type: "caption",
    tags: ["forever", "soulmate", "reincarnation"]
  },
  {
    id: "love_m5",
    text: "പ്രണയത്തിന്റെ സുഖമുള്ള നോവും അതിനേക്കാൾ മനോഹരമായ നിന്റെ സാമീപ്യവും.",
    language: "malayalam",
    category: "love",
    tone: "emotional",
    type: "caption",
    tags: ["feelings", "presence", "sweet-pain"]
  },
  {
    id: "love_g1",
    text: "Ente chiriyude pinnile rahasyam neeyanu. Ennum koodeyundaakumo enikk koottayi?",
    language: "manglish",
    category: "love",
    tone: "romantic",
    type: "caption",
    tags: ["smile", "ask", "romantic"]
  },
  {
    id: "love_g2",
    text: "Nee illatha oru divasatte kurich enik aalochikkan koodi kazhiyilla. You are my everything.",
    language: "manglish",
    category: "love",
    tone: "emotional",
    type: "caption",
    tags: ["life", "devotion", "need-you"]
  },
  {
    id: "love_g3",
    text: "Chumma nokki chirichathaa... ippo hridayam thinnu theerthekkunnu. Cute love alert!",
    language: "manglish",
    category: "love",
    tone: "cute",
    type: "caption",
    tags: ["funny-love", "cute", "teasing"]
  },
  {
    id: "love_g4",
    text: "Ente chila ishtangalil thudangi ente jeevitham muzhuvanayi mariya pranayamaanu nammal thammil.",
    language: "manglish",
    category: "love",
    tone: "classy",
    type: "caption",
    tags: ["destiny", "transformation", "classy"]
  },
  {
    id: "love_g5",
    text: "Pranayam ennu paranjal athu nee mathramanu. Mattonnum enikku chindhikkane vayya.",
    language: "manglish",
    category: "love",
    tone: "romantic",
    type: "caption",
    tags: ["pure", "obsessed", "devotion"]
  },
  {
    id: "love_x1",
    text: "Holding your hand is my favorite hobby. പരസ്പരം വിരൽ കോർത്തു പിടിക്കുമ്പോൾ കിട്ടുന്ന ഒരു ധൈര്യമുണ്ട്, അതിനേക്കാൾ വലുതല്ല മറ്റൊന്നും.",
    language: "mixed",
    category: "love",
    tone: "classy",
    type: "caption",
    tags: ["hand-holding", "courage", "support"]
  },
  {
    id: "love_x2",
    text: "You are the tea to my parippuvada. എരിവും മധുരവുമുള്ള നമ്മളുടെ മനോഹരമായ പ്രണയം.",
    language: "mixed",
    category: "love",
    tone: "cute",
    type: "caption",
    tags: ["tea", "local-metaphor", "funny-love"]
  },
  {
    id: "love_x3",
    text: "Every love story is beautiful, but ours is my absolute favorite. നമ്മൾ ചേരുമ്പോൾ ഇവിടെ പുതിയൊരു കാവ്യം ജനിക്കുന്നു.",
    language: "mixed",
    category: "love",
    tone: "romantic",
    type: "caption",
    tags: ["lovestory", "magical", "couple"]
  },
  {
    id: "love_b1",
    text: "❤️ ഒരു മലയാളി ഹൃദയം കീഴടക്കിയ കഥ... | Captured by Love. 🔐",
    language: "malayalam",
    category: "love",
    tone: "romantic",
    type: "bio",
    tags: ["bio", "short", "profile"]
  },
  {
    id: "love_b2",
    text: "💫 Married to my best friend 💍 | നമ്മൾ ഒന്നിച്ച് കുറിക്കുന്ന മനോഹരമായ ദിവസങ്ങൾ.",
    language: "mixed",
    category: "love",
    tone: "classy",
    type: "bio",
    tags: ["marriage", "bio", "wedding"]
  },
  {
    id: "love_h1",
    text: "ഈ പ്രണയം കണ്ടില്ലെന്നു നടിക്കാൻ നിങ്ങൾക്കാവില്ല! അവസാനം വരെ കാണുക! 🫣💘",
    language: "malayalam",
    category: "love",
    tone: "bold",
    type: "hook",
    tags: ["reel", "hook", "curiosity"]
  },

  // ==========================================
  // ATTITUDE CATEGORY (Malayalam, Manglish, Mixed)
  // ==========================================
  {
    id: "att_m1",
    text: "എന്റെ വഴികൾ എന്റേത് മാത്രമാണ്, ആരുടെയും ഉപദേശമോ വിലയിരുത്തലോ എനിക്ക് ആവശ്യമില്ല. സ്വന്തം സ്റ്റൈലിൽ മുന്നോട്ട്.",
    language: "malayalam",
    category: "attitude",
    tone: "bold",
    type: "caption",
    tags: ["self-rules", "bold", "confidence"]
  },
  {
    id: "att_m2",
    text: "തളർത്താൻ ശ്രമിച്ചവർക്കൊക്കെ ഒരു മറുപടി മാത്രമേയുള്ളൂ - എന്റെ ഉഗ്രൻ വിജയവും നിങ്ങളുടെ മുന്നിലെ എന്റെ ഈ പുഞ്ചിരിയും.",
    language: "malayalam",
    category: "attitude",
    tone: "classy",
    type: "caption",
    tags: ["success", "smile", "revenge"]
  },
  {
    id: "att_m3",
    text: "നിങ്ങൾ വിചാരിക്കുന്നതിനും അപ്പുറമാണ് ഞാൻ. എന്നെ അളക്കാൻ നിങ്ങളുടെ സ്കെയിൽ പോരാതെ വരും.",
    language: "malayalam",
    category: "attitude",
    tone: "bold",
    type: "caption",
    tags: ["mysterious", "limitless", "threat"]
  },
  {
    id: "att_m4",
    text: "ആരുടെയും തണലിലല്ല, സ്വന്തം വിയർപ്പിലാണ് ഞാൻ എന്റെ സാമ്രാജ്യം പടുത്തുയർത്തുന്നത്.",
    language: "malayalam",
    category: "attitude",
    tone: "classy",
    type: "caption",
    tags: ["hardwork", "empire", "independent"]
  },
  {
    id: "att_m5",
    text: "സിംഹം എപ്പോഴും സിംഹമാണ്, അത് കൂട്ടത്തോടെയല്ല ഒറ്റയ്ക്കാണ് വേട്ടയാടാറുള്ളത്.",
    language: "malayalam",
    category: "attitude",
    tone: "bold",
    type: "caption",
    tags: ["lion", "lone-wolf", "strong"]
  },
  {
    id: "att_g1",
    text: "Ente vazhikal entethu mathramanu, arodum chodichittalla njan munnott pokunnath. Deal with it!",
    language: "manglish",
    category: "attitude",
    tone: "bold",
    type: "caption",
    tags: ["stubborn", "deal-with-it", "independent"]
  },
  {
    id: "att_g2",
    text: "Ninne tholpikkan sremikkunnavarodu: njan thottu tharan thayaaralla. Karuthoode kaanikkaam.",
    language: "manglish",
    category: "attitude",
    tone: "bold",
    type: "caption",
    tags: ["never-give-up", "challenge"]
  },
  {
    id: "att_g3",
    text: "Ente standard athu enikku mathramulla oru brand aanu. Ningalkku thottaal pollum pidikitoola.",
    language: "manglish",
    category: "attitude",
    tone: "classy",
    type: "caption",
    tags: ["premium", "unreachable", "classy"]
  },
  {
    id: "att_g4",
    text: "Chorayan varunnavarkk ulla pathiri njan veettil thanne chuttu vechirittund. Kattakku nilkkum.",
    language: "manglish",
    category: "attitude",
    tone: "funny",
    type: "caption",
    tags: ["sassy", "threat", "funny-threat"]
  },
  {
    id: "att_g5",
    text: "Veezhumpol chiri thookiyavar ippo njan jayikkumpol kannu thallippokunnu. Athre ullu kaaryam.",
    language: "manglish",
    category: "attitude",
    tone: "classy",
    type: "caption",
    tags: ["satisfaction", "success", "karma"]
  },
  {
    id: "att_x1",
    text: "Born to stand out, not to fit in. എന്നെ മറ്റുള്ളവരുമായി താരതമ്യം ചെയ്യാൻ നിൽക്കരുത്, ഞാൻ ഒരു അസ്സൽ മാതൃകയാണ്.",
    language: "mixed",
    category: "attitude",
    tone: "bold",
    type: "caption",
    tags: ["original", "proud", "unique"]
  },
  {
    id: "att_x2",
    text: "Keep your attitude in your pocket. എന്റെ ലോകം എന്റേത് മാത്രമാണ്, നിങ്ങളുടെ നിർദ്ദേശങ്ങൾ ഇവിടെ ചിലവാകില്ല.",
    language: "mixed",
    category: "attitude",
    tone: "classy",
    type: "caption",
    tags: ["sassy", "stay-away", "boss"]
  },
  {
    id: "att_b1",
    text: "😎 അഹങ്കാരമല്ല, എന്റെ ആത്മാഭിമാനമാണ് എന്റെ വില | King of my own life 👑",
    language: "malayalam",
    category: "attitude",
    tone: "bold",
    type: "bio",
    tags: ["bio", "attitude", "king"]
  },
  {
    id: "att_b2",
    text: "🔥 Rule #1: Never settle for average. മലയാളി ചെറുപ്പക്കാരൻ വിത്ത് സ്ട്രോങ്ങ് ആറ്റിറ്റ്യൂഡ്.",
    language: "mixed",
    category: "attitude",
    tone: "classy",
    type: "bio",
    tags: ["bio", "professional", "proud"]
  },
  {
    id: "att_h1",
    text: "ശത്രുക്കളുടെ ഉറക്കം കെടുത്തുന്ന ആ രഹസ്യം അറിയണോ? വീഡിയോ മുഴുവൻ കാണൂ! 👀💀",
    language: "malayalam",
    category: "attitude",
    tone: "bold",
    type: "hook",
    tags: ["reel-hook", "savage", "viral"]
  },

  // ==========================================
  // TRAVEL CATEGORY (Malayalam, Manglish, Mixed)
  // ==========================================
  {
    id: "trav_m1",
    text: "കാതങ്ങൾ താണ്ടുമ്പോഴും മനസ്സ് മലനിരകളിലും പ്രകൃതിയിലുമാണ്. യാത്രകളാണ് യഥാർത്ഥ ശ്വാസം.",
    language: "malayalam",
    category: "travel",
    tone: "emotional",
    type: "caption",
    tags: ["nature", "mountains", "peace"]
  },
  {
    id: "trav_m2",
    text: "വഴികൾ തീരുന്നിടത്തുനിന്നാണ് പുതിയ കാഴ്ച്ചകളും അതിശയങ്ങളും തുടങ്ങുന്നത്. അലഞ്ഞുതിരിയുന്ന ഒരൊറ്റ മനസ്സ്.",
    language: "malayalam",
    category: "travel",
    tone: "classy",
    type: "caption",
    tags: ["adventure", "unexplored", "horizon"]
  },
  {
    id: "trav_m3",
    text: "മഴയും മഞ്ഞും കോടയും... ഈ പശ്ചിമഘട്ട മലനിരകളിൽ ഒളിച്ചിരിക്കുന്ന മറ്റൊരു സ്വർഗ്ഗം.",
    language: "malayalam",
    category: "travel",
    tone: "aesthetic",
    type: "caption",
    tags: ["ghats", "fog", "rain", "kerala-beauty"]
  },
  {
    id: "trav_m4",
    text: "അതിരുകളില്ലാത്ത ആകാശവും നീണ്ടുനിവർന്നുകിടക്കുന്ന റോഡും. ലക്ഷ്യങ്ങളില്ലാതെ ഒരു വണ്ടിപ്രാന്തൻ.",
    language: "malayalam",
    category: "travel",
    tone: "bold",
    type: "caption",
    tags: ["biker", "highway", "freedom"]
  },
  {
    id: "trav_m5",
    text: "യാത്രകൾ നമ്മെ കൂടുതൽ വിനീതരാക്കുന്നു, ലോകം എത്ര വലുതാണെന്നും നമ്മുടെ പ്രശ്നങ്ങൾ എത്ര ചെറുതാണെന്നും അത് കാട്ടിത്തരുന്നു.",
    language: "malayalam",
    category: "travel",
    tone: "emotional",
    type: "caption",
    tags: ["wisdom", "humble", "life-lesson"]
  },
  {
    id: "trav_g1",
    text: "Yathrakal tharunna aahladam athu paranju ariyikkan kazhiyillathathanu. Just go out and explore!",
    language: "manglish",
    category: "travel",
    tone: "classy",
    type: "caption",
    tags: ["explore", "happiness", "joy"]
  },
  {
    id: "trav_g2",
    text: "Munnil pacha parന്ന vazhikal, koottayi nalla friendsum pinne oru bulletum. Life is set!",
    language: "manglish",
    category: "travel",
    tone: "cute",
    type: "caption",
    tags: ["bullet", "friends", "roadtrip"]
  },
  {
    id: "trav_g3",
    text: "Kaattilum medilum vazhi thetti nadakkunnathil oru sughammund. No maps, just pure nature.",
    language: "manglish",
    category: "travel",
    tone: "aesthetic",
    type: "caption",
    tags: ["lost", "nature", "raw"]
  },
  {
    id: "trav_g4",
    text: "Koda manju moodiya idukki churam... Ithu kootillaathe kandu theerkkaan pattunilla.",
    language: "manglish",
    category: "travel",
    tone: "emotional",
    type: "caption",
    tags: ["idukki", "mist", "romance-travel"]
  },
  {
    id: "trav_g5",
    text: "Vandi eduthu angottu pokuka, swasthamaya manassu thirichu pidikkuka. Wanderlust calls!",
    language: "manglish",
    category: "travel",
    tone: "motivation",
    type: "caption",
    tags: ["recharge", "biker", "escape"]
  },
  {
    id: "trav_x1",
    text: "Wanderlust in my veins. പച്ചപ്പും ഹരിതാഭയും തേടി വീണ്ടും വയനാടൻ ചുരം കയറുന്നു.",
    language: "mixed",
    category: "travel",
    tone: "aesthetic",
    type: "caption",
    tags: ["wayanad", "wanderlust", "scenic"]
  },
  {
    id: "trav_x2",
    text: "Travel is the only thing you buy that makes you richer. കാടുകയറിയ എന്റെ കൊച്ചു യാത്രകൾ.",
    language: "mixed",
    category: "travel",
    tone: "motivation",
    type: "caption",
    tags: ["richness", "forest", "experience"]
  },
  {
    id: "trav_b1",
    text: "🏍️ ഒരു നാടോടിയെപ്പോലെ ലോകം ചുറ്റാൻ ആഗ്രഹിക്കുന്ന വണ്ടിപ്രാന്തൻ 🗺️ | Exploring Kerala.",
    language: "malayalam",
    category: "travel",
    tone: "bold",
    type: "bio",
    tags: ["bio", "traveler", "rider"]
  },
  {
    id: "trav_b2",
    text: "🏔️ Chasing sunrises & foggy peaks ⛺ | പച്ചപ്പ് നിറഞ്ഞ വഴികളിലെ വഴിപോക്കൻ.",
    language: "mixed",
    category: "travel",
    tone: "aesthetic",
    type: "bio",
    tags: ["bio", "camping", "mountains"]
  },
  {
    id: "trav_h1",
    text: "കേരളത്തിൽ തീർച്ചയായും സന്ദർശിക്കേണ്ട 5 ഓഫ്-ബീറ്റ് സ്ഥലങ്ങൾ ഇതാ! സേവ് ചെയ്യാൻ മറക്കല്ലേ! 📍🚗",
    language: "malayalam",
    category: "travel",
    tone: "professional",
    type: "hook",
    tags: ["reel", "tips", "destination"]
  },

  // ==========================================
  // FRIENDSHIP CATEGORY (Malayalam, Manglish, Mixed)
  // ==========================================
  {
    id: "fr_m1",
    text: "കൂട്ടുകാരല്ല, ഇവർ എന്റെ സ്വന്തം ചങ്കുകളാണ്. ഒപ്പമുള്ളപ്പോൾ തല്ലുകൂടാനും താങ്ങാവാനും ഇവരുണ്ട്.",
    language: "malayalam",
    category: "friendship",
    tone: "emotional",
    type: "caption",
    tags: ["chank", "brothers", "family"]
  },
  {
    id: "fr_m2",
    text: "ഏത് വട്ടുകളിലും ഒപ്പം നിക്കാൻ ഇത്തരം സുഹൃത്തുക്കൾ ഉണ്ടെങ്കിൽ പിന്നെ ജീവിതം കളർഫുളാണ്.",
    language: "malayalam",
    category: "friendship",
    tone: "funny",
    type: "caption",
    tags: ["craziness", "fun", "partners-in-crime"]
  },
  {
    id: "fr_m3",
    text: "കാലം മാറാം, സാഹചര്യങ്ങൾ മാറാം, പക്ഷെ നമ്മുടെ ഈ ചങ്ങാത്തം മായാതെ എന്നും ഒരുപോലെ നിൽക്കും.",
    language: "malayalam",
    category: "friendship",
    tone: "classy",
    type: "caption",
    tags: ["time-tested", "forever", "loyalty"]
  },
  {
    id: "fr_m4",
    text: "ലോകം മുഴുവൻ എതിർത്താലും കൂടെ നിൽക്കാൻ ഒരു മലയാളി ചങ്ക് മതിയെടാ ഒപ്പം.",
    language: "malayalam",
    category: "friendship",
    tone: "bold",
    type: "caption",
    tags: ["guts", "support", "brotherhood"]
  },
  {
    id: "fr_m5",
    text: "ഒറ്റപ്പെടുമ്പോഴാണ് സുഹൃത്തുക്കളുടെ സ്നേഹത്തിന്റെ ആഴം മനസ്സിലാകുന്നത്. നന്ദി എന്റെ പ്രിയ കൂട്ടുകാരാ.",
    language: "malayalam",
    category: "friendship",
    tone: "emotional",
    type: "caption",
    tags: ["gratitude", "hardtimes", "deep-bond"]
  },
  {
    id: "fr_g1",
    text: "Chankinte koottukaar undengil pinne namukk enthum neridam. Friendship is power!",
    language: "manglish",
    category: "friendship",
    tone: "bold",
    type: "caption",
    tags: ["chank", "power", "unity"]
  },
  {
    id: "fr_g2",
    text: "Pala vazhikk pirinjirunnalum nammude friendship ennumnnilanilkkum. True buddies forever.",
    language: "manglish",
    category: "friendship",
    tone: "emotional",
    type: "caption",
    tags: ["distance", "forever", "true-friends"]
  },
  {
    id: "fr_g3",
    text: "Ente ellam thonnyavasathinum kootu nilkkunna oru chanku koottukaaran... Love you muthe!",
    language: "manglish",
    category: "friendship",
    tone: "cute",
    type: "caption",
    tags: ["crazy", "cute", "muthu"]
  },
  {
    id: "fr_g4",
    text: "Nammal thammilulla samsaaram start cheyyunnathu thanne theri vilichondanu. Ssh, standard high!",
    language: "manglish",
    category: "friendship",
    tone: "funny",
    type: "caption",
    tags: ["abusive-love", "funny", "raw"]
  },
  {
    id: "fr_g5",
    text: "No dynamic, no drama. Just pure local friendship and endless chaya kudi vibes.",
    language: "manglish",
    category: "friendship",
    tone: "classy",
    type: "caption",
    tags: ["simple", "tea", "chill"]
  },
  {
    id: "fr_x1",
    text: "Friends who became family. എന്റെ നല്ലതിനും ചീത്തയ്ക്കും ഒപ്പം കട്ടയ്ക്ക് നിന്ന ചങ്കുകൾ.",
    language: "mixed",
    category: "friendship",
    tone: "emotional",
    type: "caption",
    tags: ["family", "unconditional", "chank"]
  },
  {
    id: "fr_x2",
    text: "Partners in crime since childhood. ഞങ്ങളുടെ കുറുമ്പും തല്ലുകൂടലും ഇപ്പോഴും മാറിയിട്ടില്ല.",
    language: "mixed",
    category: "friendship",
    tone: "cute",
    type: "caption",
    tags: ["childhood", "memories", "partners"]
  },
  {
    id: "fr_b1",
    text: "👬 കൂടെയുള്ള ചങ്കുകളാണ് എന്റെ ഏറ്റവും വലിയ ധൈര്യം ⚔️ | Squad Goals ✨",
    language: "malayalam",
    category: "friendship",
    tone: "bold",
    type: "bio",
    tags: ["bio", "squad", "strength"]
  },
  {
    id: "fr_b2",
    text: "🤙 Living life with my high-voltage buddies ⚡ | എന്റെ മനോഹരമായ ചങ്ങാതിക്കൂട്ടം.",
    language: "mixed",
    category: "friendship",
    tone: "funny",
    type: "bio",
    tags: ["bio", "friends", "energy"]
  },
  {
    id: "fr_h1",
    text: "നിങ്ങൾക്കും ഉണ്ടോ ഇതുപോലൊരു തല്ലിപ്പൊളി ചങ്ക്? അവരെ ഇപ്പോഴേ മെൻഷൻ ചെയ്യൂ! 😂👇",
    language: "malayalam",
    category: "friendship",
    tone: "funny",
    type: "hook",
    tags: ["reel", "tag-friend", "funny-hook"]
  },

  // ==========================================
  // WEDDING CATEGORY (Malayalam, Manglish, Mixed)
  // ==========================================
  {
    id: "wed_m1",
    text: "രണ്ടു മനസ്സുകൾ ഒന്നായി തീരുന്ന ആ സുന്ദര നിമിഷം. ഇന്നുമുതൽ ഇനിയുള്ള കാലം ഒന്നിച്ച്.",
    language: "malayalam",
    category: "wedding",
    tone: "romantic",
    type: "caption",
    tags: ["together", "celebration", "ceremony"]
  },
  {
    id: "wed_m2",
    text: "കണ്മണീ, നീയാണ് എന്റെ ജീവിതത്തിലെ ഏറ്റവും വലിയ അനുഗ്രഹം. വിവാഹ മംഗളാശംസകൾ.",
    language: "malayalam",
    category: "wedding",
    tone: "emotional",
    type: "caption",
    tags: ["blessing", "romance", "wife"]
  },
  {
    id: "wed_m3",
    text: "താലി ചാർത്തി, കുങ്കുമമണിഞ്ഞ് എന്റെ പെണ്ണായി നീ മാറിയ ആ അവിസ്മരണീയ നിമിഷം.",
    language: "malayalam",
    category: "wedding",
    tone: "romantic",
    type: "caption",
    tags: ["traditional", "sacred", "bride"]
  },
  {
    id: "wed_m4",
    text: "ചിരിയും കളിയുമായി നമ്മൾ തുടങ്ങിയ സൗഹൃദം ഇന്ന് വിവാഹപന്തലിൽ എത്തിനിൽക്കുന്നു.",
    language: "malayalam",
    category: "wedding",
    tone: "classy",
    type: "caption",
    tags: ["love-marriage", "history", "milestone"]
  },
  {
    id: "wed_m5",
    text: "രക്ഷിതാക്കളുടെ അനുഗ്രഹത്തോടെ, കുടുംബത്തിന്റെ സാന്നിധ്യത്തിൽ ഞങ്ങളുടെ പുതിയ തുടക്കം.",
    language: "malayalam",
    category: "wedding",
    tone: "professional",
    type: "caption",
    tags: ["family", "culture", "blessings"]
  },
  {
    id: "wed_g1",
    text: "Kalyanam ennu paranjal randu manasorupadulla jeevithathinte sundara thudakkamaanu. Happy married life!",
    language: "manglish",
    category: "wedding",
    tone: "classy",
    type: "caption",
    tags: ["happy", "definition", "modern"]
  },
  {
    id: "wed_g2",
    text: "Innu muthal njanum neeyum alla, nammal aanu. A forever promise started here.",
    language: "manglish",
    category: "wedding",
    tone: "romantic",
    type: "caption",
    tags: ["we", "promise", "unity"]
  },
  {
    id: "wed_g3",
    text: "Sari uduthu, mullappoo choodi nilkkunna ente sundari penne... Ente swantham bharya!",
    language: "manglish",
    category: "wedding",
    tone: "cute",
    type: "caption",
    tags: ["bride", "saree", "mullappoo"]
  },
  {
    id: "wed_g4",
    text: "Finally, the big day! Kootare kalyanam kazhinje... ini nalla sadhya kazhikkaam!",
    language: "manglish",
    category: "wedding",
    tone: "funny",
    type: "caption",
    tags: ["funny", "sadya", "celebration"]
  },
  {
    id: "wed_g5",
    text: "Randu veettukarum thammil thalli thudangiya nammude kalyana katha... Superb day indeed.",
    language: "manglish",
    category: "wedding",
    tone: "funny",
    type: "caption",
    tags: ["funny-marriage", "relatives"]
  },
  {
    id: "wed_x1",
    text: "Tied the knot! പരസ്പരം തുണയായി, ഇനിയുള്ള സൺസെറ്റുകൾ ഒന്നിച്ച് കാണാൻ വിധി തന്ന കോമ്പിനേഷൻ.",
    language: "mixed",
    category: "wedding",
    tone: "romantic",
    type: "caption",
    tags: ["knot", "sunset", "destiny"]
  },
  {
    id: "wed_x2",
    text: "Forever starts today. മണവാളനും മണവാട്ടിയും ഇനി ഒറ്റ ടീം!",
    language: "mixed",
    category: "wedding",
    tone: "cute",
    type: "caption",
    tags: ["manavalan", "manavatti", "bridegroom"]
  },
  {
    id: "wed_b1",
    text: "💍 Married my soulmate on 19.07 🔐 | പരസ്പരം പകുത്തു നൽകിയ പുതിയ ലോകം.",
    language: "malayalam",
    category: "wedding",
    tone: "romantic",
    type: "bio",
    tags: ["bio", "anniversary", "married"]
  },
  {
    id: "wed_b2",
    text: "💒 Just Married! 💫 | ഒരു പുതിയ അധ്യായത്തിന്റെ സന്തോഷകരമായ തുടക്കം.",
    language: "mixed",
    category: "wedding",
    tone: "classy",
    type: "bio",
    tags: ["bio", "couple", "new-chapter"]
  },
  {
    id: "wed_h1",
    text: "ഈ കേരള ട്രഡീഷണൽ വിവാഹം നിങ്ങൾ കണ്ടിരിക്കണം! അത്രയ്ക്ക് ക്യൂട്ട് ആണ് ഈ ജോഡി! 😭❤️👰",
    language: "malayalam",
    category: "wedding",
    tone: "cute",
    type: "hook",
    tags: ["reel", "vibe", "wedding-shoot"]
  },

  // ==========================================
  // SELF-LOVE CATEGORY (Malayalam, Manglish, Mixed)
  // ==========================================
  {
    id: "self_m1",
    text: "എന്നെ ഞാൻ തന്നെ സ്നേഹിക്കാൻ പഠിച്ചു, കാരണം എന്റെ അവസ്ഥകളിൽ എന്നോടൊപ്പം ഉണ്ടായ ഒരേയൊരു ആൾ ഞാനാണ്.",
    language: "malayalam",
    category: "self-love",
    tone: "emotional",
    type: "caption",
    tags: ["healing", "loneliness", "strength"]
  },
  {
    id: "self_m2",
    text: "എന്റെ കുറവുകളാണ് എന്നെ കൂടുതൽ പൂർണ്ണനും മനോഹരനുമാക്കുന്നത്. ഞാൻ എന്നെ പൂർണ്ണമായി സ്നേഹിക്കുന്നു.",
    language: "malayalam",
    category: "self-love",
    tone: "classy",
    type: "caption",
    tags: ["flaws", "acceptance", "self-love"]
  },
  {
    id: "self_m3",
    text: "മറ്റുള്ളവരുടെ സർട്ടിഫിക്കറ്റല്ല എന്റെ മൂല്യം നിശ്ചയിക്കുന്നത്. എന്റെ ലോകത്ത് ഞാൻ തന്നെയാണ് രാജാവ്.",
    language: "malayalam",
    category: "self-love",
    tone: "bold",
    type: "caption",
    tags: ["ego", "power", "self-worth"]
  },
  {
    id: "self_m4",
    text: "ചിന്തകളിൽ സമാധാനവും ഹൃദയത്തിൽ സന്തോഷവുമുണ്ടെങ്കിൽ പിന്നെ മറ്റൊന്നും ആവശ്യമില്ല.",
    language: "malayalam",
    category: "self-love",
    tone: "classy",
    type: "caption",
    tags: ["peace", "mentalhealth", "calm"]
  },
  {
    id: "self_m5",
    text: "സ്വയം സ്നേഹിച്ചു തുടങ്ങുമ്പോൾ നിങ്ങളുടെ ലോകം കൂടുതൽ മനോഹരമായി മാറാൻ തുടങ്ങും.",
    language: "malayalam",
    category: "self-love",
    tone: "motivation",
    type: "caption",
    tags: ["magic", "transformation", "happiness"]
  },
  {
    id: "self_g1",
    text: "Enne njan mathramalle aadyam snehikkendath. Ente life, ente ishtangal enikk mathramaanu.",
    language: "manglish",
    category: "self-love",
    tone: "classy",
    type: "caption",
    tags: ["choice", "importance", "my-terms"]
  },
  {
    id: "self_g2",
    text: "Matrullavare thrupthipeduthan alla njan jeevikkunnath, swantham santhoshamaanu primary.",
    language: "manglish",
    category: "self-love",
    tone: "bold",
    type: "caption",
    tags: ["no-pleasing", "priorities", "unapologetic"]
  },
  {
    id: "self_g3",
    text: "Enik enne polle vere aarumilla, njan unique aanu enna thonnal aanu ettavum valiya santhosham.",
    language: "manglish",
    category: "self-love",
    tone: "cute",
    type: "caption",
    tags: ["unique", "satisfaction", "cute-self"]
  },
  {
    id: "self_g4",
    text: "Chirikkuka, swantham chiriyude soundaryam aaswadhikkuka. You are beautiful in your own way.",
    language: "manglish",
    category: "self-love",
    tone: "cute",
    type: "caption",
    tags: ["smile", "affirmation", "beauty"]
  },
  {
    id: "self_g5",
    text: "Nammal thalarnnu pokumpol swantham tholil thatti munnottu pokaan nalloru hridayam swanthamayi undavanam.",
    language: "manglish",
    category: "self-love",
    tone: "emotional",
    type: "caption",
    tags: ["self-care", "motivation", "darkdays"]
  },
  {
    id: "self_x1",
    text: "Flawed but still worthy. എന്നെ ഞാൻ എങ്ങനെയോ അങ്ങനെ തന്നെ സ്നേഹിക്കാൻ തീരുമാനിച്ചു.",
    language: "mixed",
    category: "self-love",
    tone: "classy",
    type: "caption",
    tags: ["acceptance", "worthy", "mixed"]
  },
  {
    id: "self_x2",
    text: "My own therapist. ഞാൻ എന്റെ ചിന്തകളെയും സന്തോഷങ്ങളെയും പ്രണയിക്കുന്നു.",
    language: "mixed",
    category: "self-love",
    tone: "emotional",
    type: "caption",
    tags: ["therapy", "mental-peace"]
  },
  {
    id: "self_b1",
    text: "🌸 സ്വയം സ്നേഹത്തിന്റെ പാതയിലൂടെ... 😊 | Finding peace within myself ✨",
    language: "malayalam",
    category: "self-love",
    tone: "cute",
    type: "bio",
    tags: ["bio", "healing", "gentle"]
  },
  {
    id: "self_b2",
    text: "💎 Master of my own thoughts 💆‍♂️ | എന്റെ മനോഹരമായ കുറവുകളെ സ്നേഹിക്കുന്നു.",
    language: "mixed",
    category: "self-love",
    tone: "classy",
    type: "bio",
    tags: ["bio", "classy", "self-care"]
  },
  {
    id: "self_h1",
    text: "സ്വയം സ്നേഹിച്ചു തുടങ്ങാൻ സഹായിക്കുന്ന 3 കൊച്ചു കാര്യങ്ങൾ ഇതാ! നിങ്ങളും ഒന്ന് പരീക്ഷിക്കൂ! 👇❤️",
    language: "malayalam",
    category: "self-love",
    tone: "professional",
    type: "hook",
    tags: ["reel", "lifestyle", "tips"]
  },

  // ==========================================
  // MOTIVATION CATEGORY (Malayalam, Manglish, Mixed)
  // ==========================================
  {
    id: "mot_m1",
    text: "സ്വപ്നങ്ങളിലേക്ക് ഒരു ചുവട് കൂടി മുന്നോട്ട്. തളർച്ചകൾ ഉണ്ടാകാം, പക്ഷേ പിന്തിരിയാൻ ഞാൻ ഉദ്ദേശിക്കുന്നില്ല.",
    language: "malayalam",
    category: "motivation",
    tone: "bold",
    type: "caption",
    tags: ["unstoppable", "guts", "dreamer"]
  },
  {
    id: "mot_m2",
    text: "പരാജയങ്ങൾ വിജയത്തിലേക്കുള്ള ചവിട്ടുപടികളാണ്. തകർന്നു വീഴുന്നിടത്തുനിന്നാണ് യഥാർത്ഥ പോരാളി ജനിക്കുന്നത്.",
    language: "malayalam",
    category: "motivation",
    tone: "emotional",
    type: "caption",
    tags: ["failure", "rise-up", "fighter"]
  },
  {
    id: "mot_m3",
    text: "ഇന്നത്തെ നിന്റെ കഠിനാധ്വാനമാണ് നാളത്തെ നിന്റെ വിജയത്തിന്റെ പ്രധാന കാരണം. തളരാതെ പ്രയത്നിക്കുക.",
    language: "malayalam",
    category: "motivation",
    tone: "professional",
    type: "caption",
    tags: ["hardwork", "career", "focus"]
  },
  {
    id: "mot_m4",
    text: "ആരും തുണയായില്ലെങ്കിലും, സ്വന്തം കഴിവുകളിൽ അടിയുറച്ചു വിശ്വസിച്ചു മുന്നേറുക. വിജയം സുനിശ്ചിതമാണ്.",
    language: "malayalam",
    category: "motivation",
    tone: "classy",
    type: "caption",
    tags: ["independence", "self-belief"]
  },
  {
    id: "mot_m5",
    text: "ഇരുണ്ട രാത്രികൾക്ക് ശേഷം മനോഹരമായ ഒരു പുലരി ഉണ്ടാകും. നിങ്ങളുടെ സമയം വരിക തന്നെ ചെയ്യും.",
    language: "malayalam",
    category: "motivation",
    tone: "emotional",
    type: "caption",
    tags: ["hope", "patience", "destiny"]
  },
  {
    id: "mot_g1",
    text: "Innathe nirashakalil ninnanu nalathe valiya vijayangal thudangunnathe. Hold on tightly!",
    language: "manglish",
    category: "motivation",
    tone: "emotional",
    type: "caption",
    tags: ["patience", "struggle", "success"]
  },
  {
    id: "mot_g2",
    text: "Nee ninne thanne viswasikkuka, ee lokam muzhuvan ninakkayi vazhi tharum. Believe in you.",
    language: "manglish",
    category: "motivation",
    tone: "classy",
    type: "caption",
    tags: ["belief", "destiny", "strong-will"]
  },
  {
    id: "mot_g3",
    text: "Vijayikkan vendi mathram kalathil irangiyavan aanu njan. Tholvikalkkum pinne koodaan pattilla.",
    language: "manglish",
    category: "motivation",
    tone: "bold",
    type: "caption",
    tags: ["victory-bound", "bold", "guts"]
  },
  {
    id: "mot_g4",
    text: "Chirikalil mathramalla, vedhanakalilum oru karuthundu. Athu namme varthum.",
    language: "manglish",
    category: "motivation",
    tone: "emotional",
    type: "caption",
    tags: ["lessons", "pain", "growth"]
  },
  {
    id: "mot_g5",
    text: "Simple aayittu munnottu pokuka, swantham goalsilekku aduthu kondirikku. Daily progress counts.",
    language: "manglish",
    category: "motivation",
    tone: "professional",
    type: "caption",
    tags: ["daily-routine", "simple", "goals"]
  },
  {
    id: "mot_x1",
    text: "Push your limits. ഒരു കൊച്ചു തടസ്സത്തിനും നിന്റെ വലിയ സ്വപ്നങ്ങളെ തടയാൻ കഴിയില്ല.",
    language: "mixed",
    category: "motivation",
    tone: "bold",
    type: "caption",
    tags: ["push", "limits", "no-excuses"]
  },
  {
    id: "mot_x2",
    text: "Be the game changer. സ്വന്തം ഭാഗ്യം സ്വയം നിർമ്മിക്കുന്നതാണ് ഒരു യഥാർത്ഥ മലയാളി തത്വം.",
    language: "mixed",
    category: "motivation",
    tone: "classy",
    type: "caption",
    tags: ["game-changer", "kerala-spirit"]
  },
  {
    id: "mot_b1",
    text: "🎯 വിജയത്തിന്റെ കൊടുമുടി ലക്ഷ്യമാക്കിയുള്ള യാത്ര 🏔️ | അടിയുറച്ച ലക്ഷ്യത്തോടെ മുന്നോട്ട്.",
    language: "malayalam",
    category: "motivation",
    tone: "bold",
    type: "bio",
    tags: ["bio", "focus", "unstoppable"]
  },
  {
    id: "mot_b2",
    text: "💼 Hustler | Dreamer 🌟 | പരാജയങ്ങളിൽ നിന്ന് പാഠം പഠിച്ചു ജയിക്കാൻ വന്നവൻ.",
    language: "mixed",
    category: "motivation",
    tone: "professional",
    type: "bio",
    tags: ["bio", "entrepreneur", "hustle"]
  },
  {
    id: "mot_h1",
    text: "നിങ്ങളുടെ സ്വപ്നങ്ങളിലേക്ക് കുതിക്കാൻ സഹായിക്കുന്ന ഈ മോട്ടിവേഷൻ ഒന്നു കേട്ടുനോക്കൂ! ⚡🎧",
    language: "malayalam",
    category: "motivation",
    tone: "emotional",
    type: "hook",
    tags: ["reel", "audio-vibe", "motivation"]
  },

  // ==========================================
  // AESTHETIC CATEGORY (Malayalam, Manglish, Mixed)
  // ==========================================
  {
    id: "aes_m1",
    text: "നിശബ്ദതയുടെയും ഇളംകാറ്റിന്റെയും ഈ മനോഹരമായ സംഗീതം എന്റെ മനസ്സിനെ മോഹിപ്പിക്കുന്നു. ഒരു കൊച്ചു പ്രകൃതി സ്നേഹി.",
    language: "malayalam",
    category: "aesthetic",
    tone: "aesthetic",
    type: "caption",
    tags: ["silent", "breeze", "melody", "peace"]
  },
  {
    id: "aes_m2",
    text: "ചില കാഴ്ചകൾ അങ്ങനെയാണ്, ക്യാമറയിലല്ല മനസ്സിലാണ് അവ സൂക്ഷിച്ചുവെക്കേണ്ടത്. മനോഹരമായ നിമിഷങ്ങൾ.",
    language: "malayalam",
    category: "aesthetic",
    tone: "classy",
    type: "caption",
    tags: ["eyes", "memories", "unforgettable"]
  },
  {
    id: "aes_m3",
    text: "മഴത്തുള്ളികളുടെ താളവും ഒരു കപ്പ് ചൂട് ചായയും... ഇതിനേക്കാൾ മനോഹരമായ ഒരു കോമ്പിനേഷൻ മറ്റെന്തുണ്ട്!",
    language: "malayalam",
    category: "aesthetic",
    tone: "cute",
    type: "caption",
    tags: ["rain", "tea", "cozy", "chayavibe"]
  },
  {
    id: "aes_m4",
    text: "നരച്ച ആകാശവും, പെയ്യാൻ കൊതിക്കുന്ന മേഘങ്ങളും... ഒരു വിരഹ കവിത പോലെ പ്രകൃതി സുന്ദരിയായിരിക്കുന്നു.",
    language: "malayalam",
    category: "aesthetic",
    tone: "emotional",
    type: "caption",
    tags: ["rainy-sky", "clouds", "poetry"]
  },
  {
    id: "aes_m5",
    text: "പതിയെ വീശുന്ന കാറ്റിൽ ഉലയുന്ന ആ ചെറിയ ചെമ്പകപ്പൂവ്... ഒടുവിൽ മണ്ണിലേക്ക് വീഴുമ്പോഴും സുഗന്ധം പരത്തുന്നു.",
    language: "malayalam",
    category: "aesthetic",
    tone: "aesthetic",
    type: "caption",
    tags: ["flower", "autumn", "fall-leaves"]
  },
  {
    id: "aes_g1",
    text: "Pookkalum, mazhayum, nalla oru chaya koodi undengil pinne swargamaanu. Pure happiness.",
    language: "manglish",
    category: "aesthetic",
    tone: "aesthetic",
    type: "caption",
    tags: ["tea", "rain", "heaven"]
  },
  {
    id: "aes_g2",
    text: "Nizhalukalum velichavum thammilulla ee kali kaanan nalla chelaanu. Shadow photography.",
    language: "manglish",
    category: "aesthetic",
    tone: "classy",
    type: "caption",
    tags: ["shadows", "contrast", "visuals"]
  },
  {
    id: "aes_g3",
    text: "Prathyashayude puthiya pularvelichangal nammude manassil nirayatte. Sunrise aesthetic.",
    language: "manglish",
    category: "aesthetic",
    tone: "cute",
    type: "caption",
    tags: ["sunrise", "hope", "fresh-start"]
  },
  {
    id: "aes_g4",
    text: "Chumma nadannu poya vazhikalilellaam manassu thangi nilkkunna chila prethyoga ormakal.",
    language: "manglish",
    category: "aesthetic",
    tone: "emotional",
    type: "caption",
    tags: ["strolling", "nostalgia", "memories"]
  },
  {
    id: "aes_g5",
    text: "Aesthetic elements are not designed, they are felt deep inside. Pure calmness.",
    language: "manglish",
    category: "aesthetic",
    tone: "classy",
    type: "caption",
    tags: ["feelings", "minimalist", "calm"]
  },
  {
    id: "aes_x1",
    text: "Sipping tea & watching the rain. മഴയോടൊപ്പം ഒരു ചൂടു കാപ്പിയും പ്രിയപ്പെട്ട ഓർമ്മകളും.",
    language: "mixed",
    category: "aesthetic",
    tone: "cute",
    type: "caption",
    tags: ["tea", "cozy", "rain-vibe"]
  },
  {
    id: "aes_x2",
    text: "Finding beauty in simple things. ഒരു കൊച്ചു പച്ചിലത്തുമ്പിലെ മഞ്ഞുതുള്ളി പോലെയുള്ള ചെറിയ അത്ഭുതങ്ങൾ.",
    language: "mixed",
    category: "aesthetic",
    tone: "aesthetic",
    type: "caption",
    tags: ["dewdrop", "minimal", "details"]
  },
  {
    id: "aes_b1",
    text: "🍂 ചായയും കവിതയും പ്രണയിക്കുന്ന പ്രകൃതി സ്നേഹി ☕ | Creating visual aesthetics ✨",
    language: "malayalam",
    category: "aesthetic",
    tone: "aesthetic",
    type: "bio",
    tags: ["bio", "poetry", "artist"]
  },
  {
    id: "aes_b2",
    text: "🌌 A soul full of starry nights and local stories 📝 | ലളിതമായ നിമിഷങ്ങൾ ഓർമ്മയാക്കുന്നു.",
    language: "mixed",
    category: "aesthetic",
    tone: "classy",
    type: "bio",
    tags: ["bio", "storyteller", "minimalist"]
  },
  {
    id: "aes_h1",
    text: "നിങ്ങളുടെ ഇൻസ്റ്റാഗ്രാം ഫീഡ് കൂടുതൽ മനോഹരമാക്കാൻ ഈ 3 സിമ്പിൾ ആംഗിളുകൾ പരീക്ഷിച്ചു നോക്കൂ! 📸✨",
    language: "malayalam",
    category: "aesthetic",
    tone: "professional",
    type: "hook",
    tags: ["reel", "aesthetic-tips", "photography"]
  },

  // ==========================================
  // FUNNY CATEGORY (Malayalam, Manglish, Mixed)
  // ==========================================
  {
    id: "fun_m1",
    text: "പഠിക്കാൻ ഇരിക്കുമ്പോൾ മാത്രം വരുന്ന ആ വല്ലാത്ത ഉറക്കം ഉണ്ടല്ലോ... ലോകത്തിലെ എട്ടാമത്തെ അത്ഭുതമാണ് അത്!",
    language: "malayalam",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["exams", "sleep", "relatable"]
  },
  {
    id: "fun_m2",
    text: "കടം തന്ന പൈസ ചോദിക്കുമ്പോൾ അവർ കാണിക്കുന്ന ആ വല്ലാത്ത ഭാവം ഉണ്ടല്ലോ... ഒടുവിൽ ഞാൻ തന്നെ വാങ്ങിയവൻ ആയിപ്പോയതുപോലെ തോന്നും!",
    language: "malayalam",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["money", "debt", "relatable"]
  },
  {
    id: "fun_g1",
    text: "Diet okke naale thodangaam ennu karuthunna nalla tharavaadu malayalikal njangal mathrame ulloo!",
    language: "manglish",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["diet", "food", "lazy"]
  },
  {
    id: "fun_g2",
    text: "Chila aalukalude samsaram kelkkumpol thonnum, ivarkku poyi vere paniyille ennu!",
    language: "manglish",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["people", "funny", "gossip"]
  },
  {
    id: "fun_g3",
    text: "Swantham phone silence-il poyittu athu vilichu kandupidikkaan sremikkunna aal aanu njan. Proud idiot!",
    language: "manglish",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["relatable", "funny-life"]
  },
  {
    id: "fun_g4",
    text: "Nattukaar enth parayum ennu orthu njan aalochichu aalochichu ippo nattukaarkk vere paniyillathaayi.",
    language: "manglish",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["gossip", "society", "dont-care"]
  },
  {
    id: "fun_g5",
    text: "Office-il irikkumpol active, pakshe pani cheyyan varumpol automatic lazy mode on. Classic me!",
    language: "manglish",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["office", "lazy", "worklife"]
  },
  {
    id: "fun_x1",
    text: "Me trying to save money: *buys another black tea and snacks*. പൈസ എങ്ങോട്ടാ പോകുന്നത് എന്ന് ഒരു ഐഡിയയുമില്ല!",
    language: "mixed",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["money", "tea", "poor-me"]
  },
  {
    id: "fun_x2",
    text: "My brain at 3 AM: *calculating what happens if elephants could fly*. ഉറങ്ങാൻ പോയാൽ ഉറക്കം കിട്ടൂല!",
    language: "mixed",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["insomnia", "overthinking", "wild"]
  },
  {
    id: "fun_b1",
    text: "🤪 ഡയറ്റ് നാളെ മുതൽ തുടങ്ങുന്ന അസ്സൽ മലയാളി 🍕 | 99% ലേസി, 1% ബിരിയാണി പ്രേമി.",
    language: "malayalam",
    category: "funny",
    tone: "funny",
    type: "bio",
    tags: ["bio", "lazy", "foodie"]
  },
  {
    id: "fun_b2",
    text: "🤖 Professional Overthinker 🧠 | ചിരിച്ചു ജീവിച്ചു തീർക്കാൻ ആഗ്രഹിക്കുന്നവൻ.",
    language: "mixed",
    category: "funny",
    tone: "funny",
    type: "bio",
    tags: ["bio", "funny", "chilled"]
  },
  {
    id: "fun_h1",
    text: "ക്ലാസിൽ ഉറക്കം വരുമ്പോൾ ടീച്ചറിൽ നിന്ന് രക്ഷപ്പെടാൻ ചെയ്യുന്ന ചില സൂത്രപ്പണികൾ ഇതാ! 😂🏫",
    language: "malayalam",
    category: "funny",
    tone: "funny",
    type: "hook",
    tags: ["reel", "school", "relatable-video"]
  },

  // ==========================================
  // KERALA CATEGORY (Malayalam, Manglish, Mixed)
  // ==========================================
  {
    id: "ker_m1",
    text: "ദൈവത്തിന്റെ സ്വന്തം നാട് - പച്ചപ്പും കായലുകളും നിറഞ്ഞ മനോഹര തീരം. നമ്മളെയൊക്കെ ഇങ്ങോട്ട് തന്ന പ്രകൃതിയോട് നന്ദി.",
    language: "malayalam",
    category: "kerala",
    tone: "classy",
    type: "caption",
    tags: ["kerala", "godsowncountry", "pachappu"]
  },
  {
    id: "ker_m2",
    text: "സദ്യയും പായസവും കഴിച്ച് ഉച്ചയ്ക്ക് ഉറങ്ങുന്ന സുഖം വേറെ തന്നെയാണ്. അസ്സൽ മലയാളി ലൈഫ് വൈബ്സ്.",
    language: "malayalam",
    category: "kerala",
    tone: "cute",
    type: "caption",
    tags: ["sadya", "payasam", "sleep", "vibe"]
  },
  {
    id: "ker_m3",
    text: "തൃശ്ശൂർ പൂരവും ആനച്ചന്തവും മനസ്സിൽ എന്നും കമ്പമാണ്. ഉത്സവപ്പറമ്പിലെ ആവേശങ്ങൾ തീരില്ല.",
    language: "malayalam",
    category: "kerala",
    tone: "bold",
    type: "caption",
    tags: ["thrissur-pooram", "thrissur", "festival"]
  },
  {
    id: "ker_m4",
    text: "കേരള സാരിയും മുല്ലപ്പൂവും അണിഞ്ഞു നിൽക്കുന്ന ആ മലയാളി മങ്കയുടെ ഭംഗി അത് ഒന്ന് വേറെ തന്നെയാണ്.",
    language: "malayalam",
    category: "kerala",
    tone: "aesthetic",
    type: "caption",
    tags: ["kerala-saree", "traditional", "beauty"]
  },
  {
    id: "ker_m5",
    text: "ഓണവും വിഷുവും നമ്മെ ഓർമ്മിപ്പിക്കുന്നത് സ്നേഹത്തിന്റെയും ഒത്തൊരുമയുടെയും നല്ല നാളുകളെയാണ്.",
    language: "malayalam",
    category: "kerala",
    tone: "emotional",
    type: "caption",
    tags: ["festivals", "onam", "vishu", "nostalgia"]
  },
  {
    id: "ker_g1",
    text: "Daivathinte swantham naadu, Keralathinte bhangi athu onnu verethanneyaanu. Welcome to paradise!",
    language: "manglish",
    category: "kerala",
    tone: "classy",
    type: "caption",
    tags: ["kerala", "nature", "scenic"]
  },
  {
    id: "ker_g2",
    text: "Sadhyayum payasavum pinne nalla oru urakkavum, ithaanu nalla Malayali lifestyle.",
    language: "manglish",
    category: "kerala",
    tone: "cute",
    type: "caption",
    tags: ["sadya", "chill", "lifestyle"]
  },
  {
    id: "ker_g3",
    text: "Kochi ennu paranjaal athoru vibe aanu, ahlada thurayil oru trip. Kochi is love.",
    language: "manglish",
    category: "kerala",
    tone: "bold",
    type: "caption",
    tags: ["kochi", "citylife", "trip"]
  },
  {
    id: "ker_g4",
    text: "Nattile ulsavam, chendamelam pinne nalla unniyappavum... Missing my village vibes.",
    language: "manglish",
    category: "kerala",
    tone: "emotional",
    type: "caption",
    tags: ["village", "nostalgia", "festival"]
  },
  {
    id: "ker_g5",
    text: "Mullappoo, kasavu saree and gold... The classic Malayalam wedding look.",
    language: "manglish",
    category: "kerala",
    tone: "aesthetic",
    type: "caption",
    tags: ["bridal", "kasavu", "traditional"]
  },
  {
    id: "ker_x1",
    text: "Kerala vibes only. തെങ്ങും കായലും കരിമീൻ പൊള്ളിച്ചതും കൂട്ടത്തിൽ നല്ലൊരു തോണി യാത്രയും.",
    language: "mixed",
    category: "kerala",
    tone: "aesthetic",
    type: "caption",
    tags: ["backwaters", "karimeen", "boatride"]
  },
  {
    id: "ker_x2",
    text: "No place like home. മൺവാസനയും നാടൻ തനിമയും നിറഞ്ഞ നമ്മടെ കേരളം.",
    language: "mixed",
    category: "kerala",
    tone: "emotional",
    type: "caption",
    tags: ["hometown", "native", "kerala-love"]
  },
  {
    id: "ker_b1",
    text: "🌴 ദൈവത്തിന്റെ സ്വന്തം നാട്ടിലെ ഒരു നാടൻ പയ്യൻ/പെണ്ണ് 🛶 | Proud Malayali Core.",
    language: "malayalam",
    category: "kerala",
    tone: "classy",
    type: "bio",
    tags: ["bio", "proud", "native"]
  },
  {
    id: "ker_b2",
    text: "🥥 Coconut trees & backwater breezes 🌊 | കേരളത്തിന്റെ പച്ചപ്പിൽ ജനിച്ചു വളർന്നവൻ.",
    language: "mixed",
    category: "kerala",
    tone: "aesthetic",
    type: "bio",
    tags: ["bio", "nature", "kerala"]
  },
  {
    id: "ker_h1",
    text: "കേരളത്തിലെ ഈ ഗ്രാമഭംഗി കണ്ടാൽ നിങ്ങൾ വീണ്ടും വരാതിരിക്കില്ല! തീർച്ചയായും കാണൂ! 🌾🛶🌅",
    language: "malayalam",
    category: "kerala",
    tone: "emotional",
    type: "hook",
    tags: ["reel", "scenic-kerala", "village-tour"]
  }
];

// Add generic captions dynamically to scale to 300+ items
const CATEGORIES: Array<CaptionItem['category']> = [
  'love', 'attitude', 'travel', 'friendship',
  'motivation', 'aesthetic', 'funny', 'kerala', 'nostalgia'
];
const LANGUAGES: Array<CaptionItem['language']> = ['malayalam', 'manglish', 'english', 'mixed'];
const TONES: Array<CaptionItem['tone']> = ['short', 'emotional', 'classy', 'cute', 'bold', 'funny', 'romantic', 'professional'];

// We generate programmatically to expand the array dynamically so that there are 300+ static/semi-static items in memory
export const generateDatabase = (): CaptionItem[] => {
  const result = [...CAPTIONS_DATABASE];
  
  // High quality templates that we can use to generate 200+ more items dynamically for our database
  const templates: Record<string, Record<string, string[]>> = {
    malayalam: {
      love: [
        "നീ എന്റെ ജീവിതത്തിലേക്ക് വന്നതിൽ പിന്നെ എന്റെ പ്രപഞ്ചം കൂടുതൽ സുന്ദരമായി.",
        "നിന്റെ സാന്നിധ്യമാണ് എന്റെ ഏറ്റവും വലിയ സന്തോഷം, സങ്കടങ്ങളിൽ എന്റെ താങ്ങ്.",
        "നിന്നോട് തോന്നിയ ഈ വികാരം ഒരിക്കലും അവസാനിക്കാത്ത ഒരു യാത്ര പോലെയാണ്.",
        "ചില പ്രണയം അങ്ങനെയാണ്... അത് മനസ്സിൽ ഒരു കുഞ്ഞു പൂമ്പാറ്റയെ പോലെ പാറിപ്പറന്നു നടക്കും."
      ],
      attitude: [
        "എന്റെ സ്വഭാവം എന്റെ ചോയ്സ് ആണ്, അത് നിങ്ങളുടെ താല്പര്യത്തിനനുസരിച്ച് മാറ്റാൻ ഞാൻ ഉദ്ദേശിച്ചിട്ടില്ല.",
        "വില കുറഞ്ഞ കല്ലുകൾക്കാണ് തിളക്കം കൂടുതൽ, മാണിക്യത്തിന് അതിന്റെ വില അറിയാം.",
        "വഴി തെറ്റി പോകുന്നവരല്ല, സ്വന്തമായി ഒരു വഴി വെട്ടിത്തുറക്കുന്നവരാണ് യഥാർത്ഥ നായകൻമാർ.",
        "വിമർശിക്കുന്നവരോട് ഒരൊറ്റ മറുപടി: നിങ്ങൾ സംസാരിച്ചുകൊണ്ടേയിരിക്കൂ, ഞാൻ ജയിച്ചുകൊണ്ടേയിരിക്കാം."
      ],
      travel: [
        "ഒരു യാത്രാ പ്രാന്തൻ! ഓരോ പുതിയ നാടും ഓരോ പുതിയ ജീവിതാനുഭവമാണ് കാട്ടിത്തരുന്നത്.",
        "മേഘങ്ങൾ തോറ്റുപോകുന്ന ഈ മഞ്ഞിൻ താഴ്‌വരയിൽ ഞാനും എന്റെ സ്വപ്നങ്ങളും മാത്രം.",
        "റോഡുകൾ നമ്മോട് സംസാരിക്കും, നമ്മൾ അത് കേൾക്കാൻ തയ്യാറായാൽ മാത്രം മതി.",
        "പ്രകൃതി ഒരു അത്ഭുതമാണ്, ഓരോ യാത്രയിലും അത് നമ്മെ അത്ഭുതപ്പെടുത്തുന്നു."
      ],
      friendship: [
        "എന്റെ ജീവിതത്തിലെ ഏറ്റവും വലിയ ഭാഗ്യം! എല്ലാ തമാശകളിലും കൂടെയുള്ള എന്റെ ചങ്കുകൾ.",
        "ചങ്ക് കൂടെയുണ്ടെങ്കിൽ ഏത് പാതാളത്തിലും ചാടാൻ മടിയില്ലാത്ത മലയാളി ഗാംഗ്.",
        "വർഷങ്ങൾ കഴിഞ്ഞാലും നമ്മുടെ ഈ ചങ്ങാത്തത്തിന് യാതൊരു മാറ്റവും വരികയില്ല.",
        "ആത്മാർത്ഥ സുഹൃത്തുക്കൾ ഒരിക്കലും അകന്നുപോകുന്നില്ല, അവർ ഹൃദയത്തിൽ ഒട്ടിനിൽക്കുന്നു."
      ],
      wedding: [
        "വിവാഹത്തിന്റെ സുന്ദര നിമിഷങ്ങൾ! പരസ്പരം താങ്ങും തണലുമായി പുതിയൊരു യാത്ര.",
        "നിന്റെ കഴുത്തിൽ ഈ താലി കെട്ടിയ നിമിഷമാണ് എന്റെ ജീവിതത്തിലെ ഏറ്റവും ധന്യമായ ദിവസം.",
        "രണ്ടു സംസ്കാരങ്ങൾ, രണ്ടു കുടുംബങ്ങൾ, ഒടുവിൽ ഒരൊറ്റ മനോഹര പ്രണയകഥ.",
        "ഇനി മുതൽ നമ്മൾ ഒന്നിച്ചു നടക്കും, ഏത് കനലിലും ഏത് പൂവഴിയിലും."
      ],
      "self-love": [
        "സ്വയം സ്നേഹിക്കാൻ വൈകിയ നാളുകളെ ഓർത്ത് ഖേദിക്കുന്നു, ഇപ്പോൾ ഞാൻ കൂടുതൽ ഹാപ്പിയാണ്.",
        "മറ്റുള്ളവർക്ക് വേണ്ടി എന്റെ ജീവിതം കളയാൻ എനിക്ക് താല്പര്യമില്ല, എന്റെ താല്പര്യം എന്റേത് മാത്രം.",
        "ഞാൻ എന്നെത്തന്നെ പടുത്തുയർത്തുകയാണ്, ഓരോ ദിവസവും കൂടുതൽ കരുത്തോടെ.",
        "എന്റെ ഉള്ളിലെ വെളിച്ചം എന്നെ നയിക്കുന്നു, എനിക്ക് ബാഹ്യമായ സർട്ടിഫിക്കറ്റ് ആവശ്യമില്ല."
      ],
      motivation: [
        "തളരുന്ന ഓരോ നിമിഷത്തിലും ഓർക്കുക - നീ തുടങ്ങിയത് വെറുതെ തോറ്റു തരാനല്ല.",
        "പരിശ്രമം നിങ്ങളുടെ ശീലമാക്കൂ, വിജയം നിങ്ങളുടെ കൂടെപ്പോരുക തന്നെ ചെയ്യും.",
        "മറ്റുള്ളവരുടെ വിജയഗാഥകൾ കേൾക്കലല്ല, സ്വന്തമായി ഒരു ചരിത്രം സൃഷ്ടിക്കലാണ് നമ്മുടെ ലക്ഷ്യം.",
        "ഇന്നത്തെ ചെറിയ മാറ്റങ്ങൾ നാളത്തെ വലിയ വിജയങ്ങളിലേക്ക് വഴിതുറക്കും."
      ],
      aesthetic: [
        "കാഴ്ചകളുടെ ആഴങ്ങളിൽ ഒളിഞ്ഞിരിക്കുന്ന മൗനം, ഒരു കവിത പോലെ മനോഹരമാണ്.",
        "മൺവാസനയുള്ള ഈ സായാഹ്നം, പഴയ കാലത്തെ സുന്ദരമായ ഓർമ്മകൾ ഉണർത്തുന്നു.",
        "പതുക്കെ ഒഴുകുന്ന ഈ പുഴയും, കൂടെയുള്ള തണുത്ത കാറ്റും മനസ്സ് നിറയ്ക്കുന്നു.",
        "ഒരു ചിത്രത്തിന് പറയാൻ കഴിയുന്നതിനേക്കാൾ കൂടുതൽ കഥകൾ ഈ നിശബ്ദതയിലുണ്ട്."
      ],
      funny: [
        "രാവിലെ എഴുന്നേൽക്കാൻ നോക്കുമ്പോൾ ബെഡ് എന്നെ കെട്ടിപ്പിടിച്ചു കിടക്കുന്നതുപോലെ തോന്നും!",
        "എന്തൊക്കെ പ്ലാനുകൾ ആയിരുന്നു! ഒടുവിൽ ഫോണിൽ നോക്കി ദിവസം മുഴുവൻ കളഞ്ഞു.",
        "ഗ്രൂപ്പിൽ വന്നിട്ട് ഒരക്ഷരം പോലും മിണ്ടാതെ വെറും സീൻ കണ്ടു പോകുന്ന ആൾക്കാരാണ് എന്റെ മെയിൻ!",
        "ജീവിതത്തിൽ ഏറ്റവും വലിയ പ്രതിസന്ധി - നാളെ രാവിലെ എന്തോ കഴിക്കും എന്ന് ആലോചിക്കുന്നതാണ്."
      ],
      kerala: [
        "കപ്പയും മീൻകറിയും കൂട്ടിയുള്ള ആ സുഖം, അത് മലയാളിക്ക് മാത്രം അറിയാവുന്ന ഒന്നാണ്.",
        "പച്ച പട്ടുടുത്തതുപോലെ മനോഹരമായ നമ്മുടെ നാട്ടിൻപുറത്തെ പാടങ്ങളും തെങ്ങിൻ തോപ്പുകളും.",
        "തൃശ്ശൂർ പൂരത്തിന്റെ മേളക്കൊഴുപ്പ് കേട്ടാൽ ഏതൊരു മലയാളിയുടെയും രക്തം തിളച്ചു മറിയും.",
        "വള്ളംകളിയും ആർപ്പുവിളികളും നിറഞ്ഞ പുന്നമടക്കായലിലെ ആ മനോഹര നിമിഷങ്ങൾ."
      ],
      photography: [
        "ക്യാമറ ഒരു ഉപകരണം മാത്രമല്ല, അത് എന്റെ വികാരങ്ങൾ പ്രകടിപ്പിക്കാനുള്ള ഒരു മാധ്യമം കൂടിയാണ്.",
        "ഓരോ ലെൻസ് മാറ്റത്തിലും ഞാൻ പ്രകൃതിയുടെ മറ്റൊരു പുതിയ മുഖം കാണുന്നു.",
        "ഒരു നിമിഷം എന്നെന്നേക്കുമായി തടവിലാക്കുന്നതാണ് ഒരു ഫോട്ടോഗ്രാഫറുടെ മാന്ത്രികത.",
        "കാഴ്ചകൾ ഒപ്പിയെടുക്കുമ്പോൾ മനസ്സിന് ലഭിക്കുന്ന ആ നിർവൃതി എടുത്തു പറയേണ്ടതാണ്."
      ],
      business: [
        "സംരംഭകത്വം എന്നത് വെറുമൊരു ജോലിയല്ല, അത് നിങ്ങളുടെ സ്വപ്നങ്ങളുടെ ഒരു പുതിയ പ്രകാശനമാണ്.",
        "കഠിനാധ്വാനവും കൃത്യതയും ഉണ്ടെങ്കിൽ നിങ്ങൾക്ക് ഏതൊരു കൊടുമുടിയും കീഴടക്കാം.",
        "നിങ്ങളുടെ ബിസിനസ്സ് നിങ്ങളുടെ ഉപഭോക്താക്കളുടെ വിശ്വസ്തതയിലാണ് കെട്ടിപ്പടുത്തിരിക്കുന്നത്.",
        "തുടക്കങ്ങൾ എപ്പോഴും ചെറുതായിരിക്കാം, എന്നാൽ നിങ്ങളുടെ ദർശനം വളരെ വലുതായിരിക്കണം."
      ],
      beauty_parlour: [
        "നിങ്ങളുടെ സ്വാഭാവിക സൗന്ദര്യം കൂടുതൽ തിളക്കമുള്ളതാക്കൂ! ഞങ്ങളുടെ സ്പെഷ്യൽ ഫേഷ്യൽ ട്രീറ്റ്മെന്റുകൾ ഇപ്പോൾ ലഭ്യമാണ്.",
        "ഒരു ഗ്ലോ അപ്പ് ആഗ്രഹിക്കുന്നുണ്ടോ? മികച്ച ഹെയർ സ്റ്റൈലിംഗും സ്കിൻ കെയറുമായി ഞങ്ങൾ ഒപ്പമുണ്ട്.",
        "സൗന്ദര്യ സംരക്ഷണം ഇനി കൂടുതൽ എളുപ്പം. നിങ്ങളുടെ അപ്പോയിന്റ്മെന്റ് ഇന്നുതന്നെ ബുക്ക് ചെയ്യൂ!",
        "നിങ്ങളെ കൂടുതൽ സുന്ദരിയാക്കാൻ, അത്യാധുനിക സൗകര്യങ്ങളോടെ ഞങ്ങളുടെ പാർലർ സജ്ജമാണ്."
      ],
      makeover_artist: [
        "നിങ്ങളുടെ വിവാഹദിനം കൂടുതൽ സവിശേഷമാക്കാൻ മനോഹരമായ ബ്രൈഡൽ മേക്കപ്പ്. ബുക്കിംഗ് ആരംഭിച്ചു!",
        "ഓരോ മുഖത്തിനും അനുയോജ്യമായ തിളക്കം നൽകുന്ന പ്രൊഫഷണൽ മേക്കപ്പ് ആർട്ടിസ്ട്രി.",
        "നിങ്ങളുടെ സ്വപ്നങ്ങളിലെ വധുവായി തിളങ്ങാൻ കസ്റ്റമൈസ്ഡ് ബ്രൈഡൽ പാക്കേജുകൾ തിരഞ്ഞെടുക്കൂ.",
        "അതിരുകളില്ലാത്ത മനോഹാരിത! പ്രൊഫഷണൽ മേക്കപ്പ് വർക്കുകൾക്കായി ഞങ്ങളെ ബന്ധപ്പെടാം."
      ],
      fashion: [
        "ട്രെൻഡിനൊപ്പം സഞ്ചരിക്കാൻ ഇഷ്ടപ്പെടുന്നവർക്കായി മനോഹരമായ ബോട്ടിക് കളക്ഷനുകൾ.",
        "നിങ്ങളുടെ വ്യക്തിത്വത്തിന് ഇണങ്ങുന്ന അത്യാധുനിക ഫാഷൻ വസ്ത്രങ്ങൾ ഇപ്പോൾ ലഭ്യമാണ്.",
        "കേരള തനിമയും മോഡേൺ ട്രെൻഡും ഒത്തുചേരുന്ന കിടിലൻ ഔട്ട്ഫിറ്റുകൾ സ്വന്തമാക്കൂ.",
        "എല്ലായ്പ്പോഴും സ്റ്റൈലിഷായി തിളങ്ങൂ! ഞങ്ങളുടെ പുതിയ ഫാഷൻ കളക്ഷനുകൾ കാണാൻ മറക്കല്ലേ."
      ],
      techie: [
        "ടെക്നോളജിയുടെ ലോകത്ത് പുതിയ മാറ്റങ്ങൾ കണ്ടെത്താൻ ശ്രമിക്കുന്ന ഒരു ടെക് പ്രേമി! 💻📱",
        "ഏറ്റവും പുതിയ ഗാഡ്‌ജെറ്റുകളും അടിപൊളി ടെക് അപ്‌ഡേറ്റുകളും നിങ്ങളുടെ വിരൽത്തുമ്പിൽ.",
        "ടെക്നോളജി വെറുമൊരു അറിവല്ല, അത് നമ്മുടെ ജീവിതശൈലി മാറ്റുന്ന ഒന്നാണ്.",
        "ഗാഡ്‌ജെറ്റ് റിവ്യൂകളും പുതിയ ടെക് ടിപ്പുകളുമായി ഞങ്ങൾ എപ്പോഴും ഒപ്പമുണ്ട്."
      ],
      coder: [
        "രാтивнойലെ കോഡിംഗും കൂടെ ചൂടുള്ള ഒരു കപ്പ് ചായയും - ഇതിലും മികച്ച കോമ്പിനേഷൻ വേറെയില്ല! ☕💻🚀",
        "പ്രശ്നങ്ങൾ പരിഹരിക്കാൻ കോഡിന്റെ വരികൾ കൊണ്ട് മാജിക് സൃഷ്ടിക്കുന്നവർ.",
        "ബഗുകൾ ഒന്നിനു പുറകെ ഒന്നായി ഫിക്സ് ചെയ്യുമ്പോൾ കിട്ടുന്ന ആ ഒരു സന്തോഷം വേറെ തന്നെയാണ്.",
        "വിജയത്തിലേക്ക് പുതിയൊരു ആപ്ലിക്കേഷൻ ബിൽഡ് ചെയ്യുകയാണ് ഞങ്ങളുടെ ലക്ഷ്യം."
      ],
      nostalgia: [
        "പഴയ ഓർമ്മകളുടെ ആ മനോഹരമായ പെട്ടി തുറക്കുമ്പോൾ മനസ്സിൽ ഒരു കുളിർമയാണ്. 📻📺🍬",
        "നല്ല പഴയ കാലത്തെ പാട്ടുകളും ഓർമ്മകളും മനസ്സിലേക്ക് വീണ്ടും ഓടിയെത്തുന്നു.",
        "ചെറുപ്പകാലത്തെ ആ സുന്ദര നിമിഷങ്ങളിലേക്ക് ഒരു തിരിച്ചുപോക്ക് ആഗ്രഹിക്കാത്തവരുണ്ടോ?",
        "ബാല്യകാല സ്മരണകൾ എന്നും ഹൃദയത്തിൽ പച്ചപിടിച്ചു നിൽക്കുന്ന കനലുകളാണ്."
      ]
    },
    manglish: {
      love: [
        "Nee ente jeevithathilekku vannathil pinne ente lokam ethra sundaramaayi mari.",
        "Nee koodeyullappol ente sangadangalellam automatic aayi maari pokum mthe.",
        "Ente hridayathile ezhuthatha kavidhayanu nee. I love you so much.",
        "Chila pranaya nimishangal namme eppozhum nalla ormakalil thinnu theerkkum."
      ],
      attitude: [
        "Ente attitude kandu chora thilakkunnavarodu: ithente swantham style aanu.",
        "Vila kuranja aalkkar aanu vila parayan varunnathe, njan athu thottu koodi nokkilla.",
        "Njan ennum ente ishtangalkku mathramaanu munnorthe thoonal nalkunnathe.",
        "Arum thunayanillengilum, swantham kazhivil viswasichu munnottu thanne pokum."
      ],
      travel: [
        "Oru yathra pranthan! Puthiya vazhikalum puthiya sightukalum aanu ente energy.",
        "Vandi eduthu angottu pokuka, swasthamaya manassu thirichu pidikkuka. Let's go!",
        "Mala kayaran poyal pinnedu thirichu varan thonoolla, idukki is pure love.",
        "Road trips give me the kind of peace that nothing else in this world can."
      ],
      friendship: [
        "Chankinte koottukaar undengil pinne namukk enthum neridam. Squad goals always!",
        "Ente thonnyavasathinu kootu nilkkunna oru chanku koottukaran undel life is safe.",
        "Friends are the family we choose ourselves, and I got the absolute best ones.",
        "Pala vazhikk pirinjirunnalum nammude friendship ennumnnilanilkkum buddy."
      ],
      wedding: [
        "Randu manasorupadulla kalyana katha... Finally tied the knot together.",
        "Innu muthal njanum neeyum alla, nammal aanu. Looking forward to our life.",
        "The best day of my life, holding your hand for the rest of my journey.",
        "Sadhya kazhichu kalyanam koodiya aa prethyoga sugham, highly premium vibe."
      ],
      "self-love": [
        "Enne njan thanne aadyam snehikkaan thudangi. I'm my own primary fan.",
        "Self love is not selfish, it's necessary for our survival in this world.",
        "I am doing this for me. No more pleasing others, my peace is precious.",
        "Flaunting my flaws and loving my style. There is only one me in this universe."
      ],
      motivation: [
        "Nee thalarnnu pokumbozhum orkkuka: ninte swapnangalaanu ninte fuel.",
        "Focus on your goals and let the noise fade away in the background.",
        "Success is not easy, but the struggle is always worth the final destination.",
        "Never give up on things that make you smile and move forward."
      ],
      aesthetic: [
        "Sipping tea and watching the beautiful sunset. Pure aesthetic bliss.",
        "Finding beauty in the simplest things of life is a beautiful art itself.",
        "Shadows and lights playing around. A perfectly peaceful evening vibe.",
        "Minimalist life, rich thoughts, and some local stories in the rain."
      ],
      funny: [
        "Me trying to wake up early: *snoozes alarm 15 times and wakes up at noon*.",
        "Diet okke naale thudangaam, innu enthaayalum oru biriyani koodi thirakkam.",
        "Ente phone silenceil poyal athu pinne vilichu kandupidikkaan aalillathavunnu.",
        "Overthinking at 2 AM about why we cannot see our own ears without a mirror."
      ],
      kerala: [
        "Daivathinte swantham naadu, Keralathinte bhangi athu onnu verethanneyaanu.",
        "Sadhyayum payasavum pinne nalla oru urakkavum, Malayali special setup.",
        "Kochi, Alappuzha, Munnar... Kerala tours always keep my heart full and active.",
        "Pachappum kayalukalum, kasavu sareeyum kasthuri manjalum - pure traditional."
      ],
      photography: [
        "Every click has a beautiful story to tell, captured directly from the soul.",
        "My camera is my favorite passport to see the real emotions of this world.",
        "Framing the moments that would otherwise be lost forever in time.",
        "Behind the lens is where I feel most connected and alive in nature."
      ],
      business: [
        "Step by step building my own dream company. Keep hustling and shining.",
        "Trust and consistency is the cornerstone of any successful startup.",
        "In business, your customers' happiness is your biggest advertising agent.",
        "Dream big, start small, act fast, and grow steadily every single day."
      ],
      makeover_artist: [
        "Kalyana divasam kooduthal sundaramaakan premium bridal makeover bookings open.",
        "Bridal glam and outdoor photoshoot makeovers at pocket friendly budget!",
        "Natural glow and perfect makeup to match your elegant traditional wedding style.",
        "Glam up with the best freelance makeover artist. Let's make your special day memorable."
      ],
      techie: [
        "Technology pranthanmarude lokathekku swagatham! 💻📱 Get ready for awesome tech tips.",
        "Latest gadgets, phone reviews and cool hacks to level up your digital life.",
        "Tech is not just about features, it's about making your daily life much smarter.",
        "Upgrade your knowledge with simple tech explainers and honest gadget reviews."
      ],
      coder: [
        "Late night coding with a hot cup of chaya is the ultimate developer setup! ☕💻🚀",
        "Converting caffeine and logic into beautiful clean code that solves real problems.",
        "Nothing beats the absolute high of fixing that stubborn bug after hours of debugging.",
        "Building my own digital empire, one line of code and one git commit at a time."
      ],
      nostalgia: [
        "Aa nalla pazhaya kaalam! 📻📺🍬 Opening the box of memories to feel young again.",
        "Old songs, sweet childhood memories and simple times that we miss so much today.",
        "Who else wants to travel back to the golden days of school life and zero worries?",
        "Childhood nostalgia is a warm blanket that keeps our hearts happy and safe."
      ],
      fashion: [
        "Trendy lookil thilangaan puthiya boutique collections innu thanne check cheyyoo.",
        "Kerala traditional style and modern western combinations under one roof!",
        "Upgrade your wardrobe with the latest design outfits. Premium quality at best price.",
        "Every outfit tells a beautiful story. Express yourself with our unique fashion trends."
      ]
    },
    english: {
      love: [
        "My favorite place in all of the universe is being right next to you.",
        "With you, every single ordinary moment becomes an extraordinary fairytale.",
        "You are my absolute favorite distraction, and my sweetest melody.",
        "Falling in love with you is the easiest thing I have ever done."
      ],
      attitude: [
        "My personality is who I am, while my attitude depends on who you are.",
        "Shine bright like a diamond, because they can't dim your inner light.",
        "Keep talking behind my back, you're in the perfect position to admire my progress.",
        "Quiet success speaks louder than any unprompted arrogant noise."
      ],
      travel: [
        "Wanderlust and desert dust. Chasing beautiful sunsets around the globe.",
        "Take only memories, leave only footprints. The world is waiting!",
        "Let's find some beautiful place to get lost and find our true selves.",
        "On a road trip to peace, where the mountains whisper and the roads sing."
      ],
      friendship: [
        "True friends don't judge each other. They judge other people together!",
        "A squad that laughs together, slays together, and stays together forever.",
        "In the cookie of life, friends are the sweet chocolate chips.",
        "Count your age by friends, not years. Count your life by smiles, not tears."
      ],
      wedding: [
        "And so, our beautiful forever adventure begins today. Happily ever after!",
        "True love stories never have endings, but they sure have spectacular weddings.",
        "Dressed in tradition, united by love. Ready for the journey of a lifetime.",
        "The beginning of a beautiful partnership filled with laughter and endless love."
      ],
      "self-love": [
        "Choosing my own peace over pleasing people. Best decision ever.",
        "You are enough just as you are. Be proud of how far you've come.",
        "Self-love is the greatest romance of all. Treat yourself with kindness.",
        "Flaws and all, I am beautifully, wonderfully, and uniquely myself."
      ],
      motivation: [
        "Don't stop when you are tired. Stop when you are completely finished!",
        "The secret of getting ahead is simply taking that first courageous step.",
        "Hustle in silence, let your ultimate success make all the noise.",
        "Dream big, work hard, stay focused, and surround yourself with good people."
      ],
      aesthetic: [
        "Sipping warm tea while listening to the gentle rhythm of the falling rain.",
        "Chasing shadows, holding lights, and cherishing the silence of the night.",
        "Minimalist spaces, peaceful minds, and beautiful vintage vibes.",
        "Finding art in the ordinary and magic in the mundane moments."
      ],
      funny: [
        "I need a six-month vacation, twice a year. Is that too much to ask?",
        "I'm not lazy, I'm just in energy-saving mode. Please do not disturb.",
        "My phone is on silent, but don't worry, I won't answer even if it's on loud.",
        "Adulting is like looking at a map and realizing you don't know how to read maps."
      ],
      kerala: [
        "Basking in the tranquil beauty of God's Own Country. Truly paradise!",
        "Nothing beats the warmth of coconut groves and soothing backwater breezes.",
        "From delicious Sadya to pristine beaches, Kerala has my entire heart.",
        "Experiencing the rich tradition and timeless elegance of Kerala culture."
      ],
      photography: [
        "Capturing feelings, framing memories, and pausing time with one single click.",
        "The camera is an instrument that teaches people how to see without a camera.",
        "In a world of temporary moments, photos are the only permanent anchor.",
        "Behind every great capture is an artist who saw beauty where others saw nothing."
      ],
      business: [
        "Building a brand is about building relationships and delivering trust.",
        "Consistency is the key that unlocks the door to long-term business growth.",
        "Your customer's satisfaction is the best marketing strategy in the world.",
        "Success doesn't just happen; it is planned, executed, and earned daily."
      ],
      makeover_artist: [
        "Creating breathtaking bridal makeovers that highlight your best features on your special day.",
        "Where art meets elegance. Professional freelance makeup services for all occasions.",
        "Bringing your dream bridal look to life with precision, passion, and flawless artistry.",
        "Get camera-ready with premium high-definition makeup and personalized styling!"
      ],
      techie: [
        "Welcome to the ultimate digital playground! 💻📱 Exploring tech that actually simplifies life.",
        "Breaking down the latest smart gadgets, tech releases, and hidden settings you should change.",
        "Technology is the closest thing we have to magic, if you know how to use it right.",
        "Gadget reviews, productivity workflows, and practical tech tips for the modern user."
      ],
      coder: [
        "Turning coffee into clean, functional code. Late night debugging sessions are my therapy. ☕💻🚀",
        "There are 10 types of people in the world: those who understand binary, and those who don't.",
        "Fixing that one bug that has been haunting me for three days is the absolute best feeling ever.",
        "Code is like humor. When you have to explain it, it's bad. Keep it clean and elegant."
      ],
      nostalgia: [
        "Sweet memories of a simpler time. 📻📺🍬 Let's take a trip down memory lane today.",
        "Old songs, retro consoles, and childhood games. Some things never go out of style.",
        "Desperately missing the golden era before social media and constant notifications.",
        "Nostalgia is a beautiful file in the hard drive of our brains that we love to read over and over."
      ],
      fashion: [
        "Elevate your everyday style with our latest, highly curated fashion collection.",
        "Where comfort meets contemporary style. Discover the trendiest outfits of the season.",
        "Drape yourself in elegance. Custom designs tailored to perfection just for you.",
        "Be your own fashion icon! Make a bold statement with our exclusive wardrobe pieces."
      ]
    }
  };

  // Bio-specific templates
  const bioTemplates: Record<string, Record<string, string[]>> = {
    malayalam: {
      love: [
        "❤️ എന്റെ പ്രിയപ്പെട്ടവന്റെ/പ്രിയപ്പെട്ടവളുടെ നിഴലായി... | Captured by Love. 🔐",
        "✨ രണ്ടു ഹൃദയങ്ങൾ, ഒരു സുന്ദര പ്രണയകഥ. 💞 | Married to my best friend 💍"
      ],
      attitude: [
        "👑 എന്റെ രീതികൾ എന്റെ മാത്രം ചോയ്സ്! 🔥 | ആരുടെയും മുന്നിൽ തലകുനിക്കാറില്ല.",
        "😎 സ്വന്തം സാമ്രാജ്യത്തിലെ രാജാവ്/രാജ്ഞി. 🔱 | വിമർശകർക്ക് പുഞ്ചിരിയോടെ മറുപടി."
      ],
      travel: [
        "🌍 വഴികൾ നീളുന്നിടത്തേക്ക് ഒരു യാത്രാ പ്രാന്തൻ! 🎒 | പുതിയ കാഴ്ചകൾ തേടി.",
        "🏔️ മേഘങ്ങൾ തൊടുന്ന മലനിരകളും കൊതിപ്പിക്കുന്ന യാത്രകളും. 🗺️ | Wanderlust."
      ],
      friendship: [
        "👬 ചങ്കുകൾ കൂടെയുണ്ടെങ്കിൽ പിന്നെ ലോകം മൊത്തം പവർ! 🤙 | Friends forever.",
        "⚡ കട്ട ചങ്ങാത്തവും കുറെ ചിരികളും. 🍕 | Squad goals always active."
      ],
      wedding: [
        "💍 വിവാഹദിനത്തിന്റെ സുന്ദര നിമിഷങ്ങൾ! 👰🤵 | പുതിയൊരു ജീവിതയാത്രയുടെ തുടക്കം.",
        "✨ പരസ്പരം താങ്ങും തണലുമായി ഒന്നിച്ചൊരു യാത്ര. 💒 | Happy married life."
      ],
      "self-love": [
        "🌸 എന്നെ ഞാനായി സ്നേഹിക്കാൻ പഠിച്ചവൾ/പഠിച്ചവൻ. 💆‍♂️ | എന്റെ സമാധാനം എന്റെ പ്രയോറിറ്റി.",
        "💎 എന്റെ കുറവുകളെയും ഞാൻ മനോഹരമായി സ്നേഹിക്കുന്നു. ✨ | Unapologetically myself."
      ],
      motivation: [
        "🎯 ലക്ഷ്യത്തിലേക്ക് ഒരു ചുവടു കൂടി മുന്നോട്ട്. 🚀 | കഠിനാധ്വാനമാണ് എന്റെ വഴി.",
        "🌟 തോറ്റു കൊടുക്കാൻ മനസ്സില്ലാത്ത ഒരു പോരാളി! 💪 | Keep hustling every single day."
      ],
      aesthetic: [
        "🍂 കാഴ്ചകളുടെ മൗനവും ഒരു കപ്പ് ചൂട് ചായയും. ☕ | പഴയ നോവൽ വരികളുടെ ഭ്രാന്തൻ.",
        "🌅 പതുക്കെ ഒഴുകുന്ന സായാഹ്നങ്ങളും നല്ലൊരു പാട്ടും. 📝 | Aesthetic soul."
      ],
      funny: [
        "🤪 രാവിലെ എഴുന്നേൽക്കാൻ പ്ലാൻ ചെയ്ത് ഉച്ചയ്ക്ക് ഉണരുന്ന വിരുതൻ! 🛌 | ചിരിക്കൂ ചിരിപ്പിക്കൂ.",
        "🤖 ഫോണിൽ നോക്കി ദിവസം കളയുന്നതിൽ ഡോക്ടറേറ്റ് എടുത്തവൻ! 📱 | lazy but happy."
      ],
      kerala: [
        "🌴 പച്ചപ്പും കായലുകളും നിറഞ്ഞ നാട്ടിൽ നിന്നൊരു നാടൻ മലയാളി! 🛶 | Pure Kerala soul.",
        "🥥 കപ്പയും മീൻകറിയും കൂട്ടിയുള്ള ആ സുഖം - അതാണ് എന്റെ വൈബ്! 🥘 | Proud to be Keralite."
      ],
      photography: [
        "📸 പ്രകൃതിയുടെ സുന്ദര നിമിഷങ്ങൾ ഒപ്പിയെടുക്കുന്ന ഫോട്ടോഗ്രാഫർ. 📷 | Stopping time.",
        "🖼️ ഓരോ ചിത്രത്തിനും പറയാൻ ഒരു മനോഹര കഥയുണ്ട്. 🔭 | Behind the lens."
      ],
      business: [
        "💼 സ്വന്തമായി ഒരു സ്വപ്നം പടുത്തുയർത്തുന്ന സംരംഭകൻ! 📈 | Building an empire.",
        "🚀 കസ്റ്റമർ സന്തോഷമാണ് ഞങ്ങളുടെ ഏറ്റവും വലിയ വിജയം. 🤝 | Trust & Growth."
      ],
      makeover_artist: [
        "✨ നിങ്ങളുടെ പ്രത്യേക ദിവസം കൂടുതൽ മനോഹരമാക്കുന്ന മേക്കപ്പ് ആർട്ടിസ്റ്റ്! 💄 | Bridal MUA.",
        "🎨 ഓരോ മുഖത്തെയും സുന്ദരമായ കാൻവാസ് ആക്കി മാറ്റുന്നു. 💅 | Flawless artistry."
      ],
      fashion: [
        "👗 ട്രെൻഡുകൾക്കൊപ്പം സഞ്ചരിക്കുന്ന ഫാഷൻ പ്രേമി! 👠 | Elegance is an attitude.",
        "🛍️ പുതിയ ഡിസൈനുകളും കിടിലൻ ഔട്ട്ഫിറ്റുകളുമായി നിങ്ങളുടെ സ്റ്റൈൽ ഐക്കൺ. 👑 | Stylist."
      ],
      techie: [
        "💻 പുതിയ ഗാഡ്‌ജെറ്റുകളും ടെക് അപ്‌ഡേറ്റുകളും തേടിയുള്ള യാത്രയിൽ. 📱 | Tech enthusiast.",
        "🔌 ടെക്നോളജിയുടെ ലോകത്തെ പുതിയ കാര്യങ്ങൾ ലളിതമായി പങ്കുവെക്കുന്നു. 📡 | Smart living."
      ],
      coder: [
        "🚀 രാത്രിയിലെ കോഡിംഗും കട്ടൻ ചായയും. ☕👨‍💻 | Converting coffee into clean code.",
        "⌨️ ബഗുകൾ ഫിക്സ് ചെയ്ത് സ്വന്തം സാമ്രാജ്യം കെട്ടിപ്പടുക്കുന്നവൻ. ⚙️ | Logic is beauty."
      ],
      nostalgia: [
        "📻 പഴയ കാലത്തെ മധുരമുള്ള ഓർമ്മകളുടെ കൂട്ടുകാരൻ. 📺 | Childhood nostalgia.",
        "🍬 90കളിലെ ആ സുന്ദര നിമിഷങ്ങളിലേക്ക് ഒരു തിരിച്ചുപോക്ക്. 📻 | Sweet retro vibes."
      ]
    },
    manglish: {
      love: [
        "❤️ Ente jeevithathilekku vannathil pinne ente lokam ethra sundaramaayi mari. 🔐",
        "✨ Married to my best friend and loving every single second. 💍"
      ],
      attitude: [
        "👑 Ente attitude kandu chora thilakkunnavarodu: ithente swantham style aanu. 🔥",
        "😎 Living life on my own terms with a smile. 🔱 | Deal with it!"
      ],
      travel: [
        "🌍 Travel is my escape therapy! 🎒 | Chasing sunsets and mountains.",
        "🏔️ Road trips are the ultimate energy boosters. 🗺️ | Biker life active."
      ],
      friendship: [
        "👬 Chank koottukaar koodeyundel pinne absolute power! 🤙 | Squad goals.",
        "⚡ Simple life, high fun and endless laughing with machans. 🍕"
      ],
      wedding: [
        "💍 Dressed in traditional style, united by love. 👰🤵 | Our forever begins.",
        "✨ Happy married life! Walking together in every single ups and downs. 💒"
      ],
      "self-love": [
        "🌸 Choosing my own peace and happiness over pleasing others. 💆‍♂️",
        "💎 Loving my flaws and enjoying my own beautiful space. ✨"
      ],
      motivation: [
        "🎯 Work hard in silence, let your ultimate success make the noise. 🚀",
        "🌟 Dream big, start small, act fast and keep growing steadily. 💪"
      ],
      aesthetic: [
        "🍂 Sipping tea while watching the rain fall. ☕ | Vintage soul.",
        "🌅 Cozy evenings, light music and quiet thoughts. 📝 | Pure aesthetic."
      ],
      funny: [
        "🤪 Expert in lazy mode. 🛌 | Doing nothing but always tired anyway.",
        "🤖 Phone scrolling master with 0 motivation to study! 📱"
      ],
      kerala: [
        "🌴 Pure traditional Malayali at heart. 🛶 | Kochi is home.",
        "🥥 Coconut groves, backwater breeze and hot local tea. ☕ | Kerala vibe."
      ],
      photography: [
        "📸 Capturing real feelings, frame by frame. 📷 | Professional photographer.",
        "🖼️ The world through my tiny lens. 🔭 | Moments into permanent memories."
      ],
      business: [
        "💼 Building my startup step by step with pure hustle. 📈 | Entrepreneur.",
        "🚀 Quality and trust is what we deliver every day. 🤝 | Brand builder."
      ],
      makeover_artist: [
        "✨ Bridal makeup and custom makeovers to highlight your unique glow! 💄",
        "🎨 Bringing your dream bridal look to reality. 💅 | Makeup artist."
      ],
      fashion: [
        "👗 Dressing up is an art, and I am the artist. 👠 | Trendy outfits lover.",
        "🛍️ Keep it simple but always elegant. 👑 | Your favorite styling diary."
      ],
      techie: [
        "💻 Gadgets, tech hacks and latest updates to make life smarter. 📱",
        "🔌 Honest tech reviews and interesting software tricks. 📡"
      ],
      coder: [
        "🚀 Debugging my code while drinking local black coffee. ☕👩‍💻 | Code is life.",
        "⌨️ Software engineer building amazing apps from scratch. ⚙️"
      ],
      nostalgia: [
        "📻 Missing those nostalgic retro vibes and childhood days. 📺",
        "🍬 Sound of retro radio, school candies and simple peaceful life. 📜"
      ]
    }
  };

  // Hooks templates
  const hookTemplates: Record<string, Record<string, string[]>> = {
    malayalam: {
      love: [
        "ഈ സുന്ദര പ്രണയകഥ നിങ്ങളുടെ ഹൃദയം കീഴടക്കും! തീർച്ചയായും കാണൂ! 👀❤️",
        "അവസാനം വരെ കണ്ടാൽ നിങ്ങൾക്കും പ്രണയം തോന്നിപ്പോകും! 🫣💘"
      ],
      attitude: [
        "നിങ്ങളെ തളർത്താൻ നോക്കുന്നവരോട് ഒരൊറ്റ മാസ് മറുപടി! 👇🔥",
        "ഇതാണ് എന്റെ ശരിക്കുള്ള സ്വഭാവം, ഇഷ്ടപ്പെട്ടില്ലെങ്കിൽ വിട്ടേക്ക്! 😎💥"
      ],
      travel: [
        "കേരളത്തിലെ ഈ ഒരു സ്വർഗ്ഗം നിങ്ങൾ ഇതുവരെ കണ്ടിട്ടുണ്ടോ? 😱👇",
        "റോഡ് ട്രിപ്പ് ഇഷ്ടപ്പെടുന്നവർ ഒരിക്കലും മിസ്സ് ചെയ്യാൻ പാടില്ലാത്ത കാഴ്ച! 🏔️🏍️"
      ],
      friendship: [
        "നിങ്ങൾക്ക് ഇങ്ങനെ ഒരു കട്ട ചങ്ക് ഉണ്ടെങ്കിൽ അവരെ ഇപ്പൊ തന്നെ മെൻഷൻ ചെയ്യൂ! 👬👇",
        "ഞങ്ങൾ കൂട്ടുകാർ ഒന്നിച്ചാൽ പിന്നെ ഇവിടെ ചിരിപ്പൂരം മാത്രമാണ്! 😂🤙"
      ],
      wedding: [
        "ഈ കല്യാണ സായാഹ്നം എത്ര മനോഹരമാണ്! ഏറ്റവും ക്യൂട്ട് ദമ്പതികൾ ഇതാ! 👰🤵💍",
        "ഇതുവരെ കണ്ടതിൽ വെച്ച് ഏറ്റവും ഇമോഷണൽ ആയ താലികെട്ട് നിമിഷം! 🥺❤️"
      ],
      "self-love": [
        "സ്വയം സ്നേഹിക്കാൻ തുടങ്ങുമ്പോൾ നിങ്ങളുടെ ജീവിതത്തിൽ വരുന്ന മാറ്റങ്ങൾ! 🌸👇",
        "മറ്റുള്ളവർ എന്ത് വിചാരിക്കും എന്ന് ആലോചിക്കുന്നത് നിർത്തൂ, ഇത് കേൾക്കൂ! 🧠✨"
      ],
      motivation: [
        "തളർന്നു പോകുന്ന ഓരോ നിമിഷത്തിലും നിങ്ങൾ ഓർക്കേണ്ട ഒരു കാര്യം! 🎯💪",
        "വിജയം നേടാൻ നിങ്ങൾ ദിവസവും ചെയ്യേണ്ട 3 ശീലങ്ങൾ ഇതാ! 🚀📈"
      ],
      aesthetic: [
        "ഈ ഒരു തണുത്ത മഴക്കാല വൈബ് നിങ്ങളുടെ മനസ്സ് ശാന്തമാക്കും... 🍃🌧️",
        "നിശബ്ദത എത്ര മനോഹരമാണെന്ന് ഈ ദൃശ്യം കാട്ടിത്തരും... 🌌🕯️"
      ],
      funny: [
        "ഇത് കാണുമ്പോൾ നിങ്ങളുടെ ആ ഒരു സുഹൃത്തിനെ ഓർമ്മ വരും! തീർച്ച! 😂👇",
        "രാവിലെ എഴുന്നേൽക്കാൻ നോക്കുമ്പോൾ ഉള്ള എന്റെ അവസ്ഥ ഇതാണ്! 🛌🤪"
      ],
      kerala: [
        "നമ്മുടെ നാട്ടിൻപുറത്തെ ഈ ഒരു ഭംഗി മറ്റെങ്ങും കാണാൻ കിട്ടില്ല! 🌾🛶🌅",
        "മലയാളിയായതിൽ അഭിമാനിക്കുന്നവർ മാത്രം ഈ വീഡിയോ കാണുക! 🌴🥘"
      ],
      photography: [
        "ക്യാമറ ലെൻസിലൂടെ ഒപ്പിയെടുത്ത ഈ അത്ഭുത നിമിഷം നോക്കൂ! 📸👀",
        "ഒരു সাধারণ ഫ്രെയിം എങ്ങനെ മനോഹരമാക്കാം എന്ന് ഇതാ കണ്ട് പഠിക്കൂ! 🖼️🎨"
      ],
      business: [
        "ബിസിനസ്സ് തുടങ്ങാൻ ആഗ്രഹിക്കുന്നവർക്ക് ഏറ്റവും ലളിതമായ 3 ടിപ്പുകൾ! 💼📈",
        "വെറും 1000 രൂപയിൽ തുടങ്ങി കോടികൾ ഉണ്ടാക്കിയ ആ വിജയകഥ ഇതാ! 🚀💰"
      ],
      makeover_artist: [
        "ഒരു പ്രൊഫഷണൽ ബ്രൈഡൽ മേക്കപ്പ് ട്രാൻസ്ഫോർമേഷൻ കണ്ട് നോക്കൂ! ✨💄👰",
        "നിങ്ങളുടെ ഫങ്ഷൻ തിളങ്ങാൻ സിമ്പിൾ മേക്കപ്പ് ടിപ്പുകൾ ഇതാ! 💅🌟"
      ],
      fashion: [
        "ഈ സീസണിലെ ഏറ്റവും ട്രെൻഡിയായ ഔട്ട്ഫിറ്റുകൾ ഏതാണെന്ന് നോക്കൂ! 👗👠",
        "കുറഞ്ഞ ബഡ്ജറ്റിൽ എങ്ങനെ സ്റ്റൈലിഷായി ഡ്രസ്സ് ചെയ്യാം? ഇതാ ഐഡിയകൾ! 🛍️👑"
      ],
      techie: [
        "നിങ്ങൾ ദിവസവും ഉപയോഗിക്കുന്ന ഫോണിലെ ഈ രഹസ്യ സെറ്റിംഗ്സ് അറിയാമോ? 😱📱",
        "ഈ വർഷം വാങ്ങാൻ പറ്റുന്ന ഏറ്റവും മികച്ച 3 ബഡ്ജറ്റ് ഗാഡ്‌ജെറ്റുകൾ! 🔌🔋"
      ],
      coder: [
        "കോഡിംഗ് പഠിക്കാൻ ആഗ്രഹിക്കുന്നവർക്ക് തികച്ചും സൌജന്യമായ 3 സൈറ്റുകൾ! 💻🚀",
        "പ്രോഗ്രാമർമാർ മാത്രം അഭിമുഖീകരിക്കുന്ന ആ ഒരു വലിയ പ്രതിസന്ധി ഇതാണ്! 🐞☕"
      ],
      nostalgia: [
        "ഈ ഒരു വീഡിയോ കണ്ടാൽ നിങ്ങളുടെ ബാല്യകാല ഓർമ്മകൾ ഉണരും! 📻🍬📺",
        "നമ്മുടെ ആ നല്ല പഴയ കാലത്തെ ഓർമ്മകളിലേക്ക് ഒരു തിരിച്ചുപോക്ക്! 📜🍭"
      ]
    },
    manglish: {
      love: [
        "Ee sweet love story ningalude heart touch cheyyum, guaranteed! 👀❤️",
        "Pranayam thonnatha aarkkum ee video kandu kazhinjal pinne thonnum! 🫣💘"
      ],
      attitude: [
        "Ningale thalarthaan nokkunnavarkku ulla single mass replay! 👇🔥",
        "Ithanu ente real attitude, ishtappedathavar dharalamayi vazhi maari pokam! 😎💥"
      ],
      travel: [
        "Ningal ee Kerala paradise vazhi ithuvare kandittille? 👀⛰️",
        "Biker life active aakaan pattiya ultimate scenic route ithaanu! 🗺️🏍️"
      ],
      friendship: [
        "Ingane ulla kalla chankine ippol thanne comment boxil tag cheyyoo! 👬👇",
        "We are the crazy squad that makes every boring trip memorable! 😂🤙"
      ],
      wedding: [
        "Most romantic and viral wedding entry of this month, check this! 👰🤵💍",
        "Pure emotions and happy tears in this beautiful traditional wedding clip! 🥺❤️"
      ],
      "self-love": [
        "Simple tips to find peace and stop worrying about other's opinions! 🌸👇",
        "Self care is never selfish. Listen to this deep advice! 🧠✨"
      ],
      motivation: [
        "When you feel like giving up, just remember why you started! 🎯💪",
        "3 simple morning habits that will make you successful! 🚀📈"
      ],
      aesthetic: [
        "Sipping local tea in the rain. Feel this ultimate cozy peace... 🍃🌧️☕",
        "Let the silence heal your tired soul with this beautiful aesthetic click... 🌌"
      ],
      funny: [
        "This is 100% relatable to your most stupid friend, check this out! 😂👇",
        "Me explaining to my mom why I need 10 hours of sleep daily! 🛌🤪"
      ],
      kerala: [
        "Nothing beats this green village beauty and calm backwaters of Kerala! 🌾🛶",
        "Malayali special food challenge! Let's see how many items you know! 🌴🥘"
      ],
      photography: [
        "The magic behind this single outstanding click will blow your mind! 📸👀",
        "Mobile photography tips that will instantly make your photos professional! 🖼️"
      ],
      business: [
        "Start your dream business with these 3 simple zero budget strategies! 💼📈",
        "How this local brand reached millions with zero marketing budget! 🚀🤝"
      ],
      makeover_artist: [
        "Breathtaking bridal makeover transformation before and after! ✨💄👰",
        "Instant glowing makeup routine for any party or outdoor shoot! 💅🌟"
      ],
      fashion: [
        "Upgrade your fashion game with these trendy wardrobe combinations! 👗👠",
        "How to look premium and rich in simple outfits, check this tip! 🛍️👑"
      ],
      techie: [
        "Do you know this extremely useful hidden trick on your smartphone? 😱📱",
        "Best budget friendly tech products that you must try this month! 🔌🔋"
      ],
      coder: [
        "Top 3 free resources to learn coding and get a high paying job! 💻🚀",
        "That painful moment when your code runs perfectly on local but crashes on prod! 🐞☕"
      ],
      nostalgia: [
        "This nostalgic video will take you straight back to the 90s era! 📻🍬",
        "Who else remembers playing these amazing outdoor games in childhood? 📜🍭"
      ]
    }
  };

  // Generate around 240 items using simple permutations to hit the 300+ targets
  let idCounter = 1;
  CATEGORIES.forEach(category => {
    LANGUAGES.forEach(lang => {
      TONES.forEach(tone => {
        // Find if template exists
        const langTemplates = templates[lang === 'mixed' ? 'malayalam' : lang]?.[category] || [];
        if (langTemplates.length > 0) {
          const baseText = langTemplates[idCounter % langTemplates.length];
          const text = lang === 'mixed' 
            ? `✨ ${baseText} ✨ What a beautiful perspective.`
            : baseText;
          
          result.push({
            id: `generated_${category}_${lang}_${tone}_${idCounter++}`,
            text: text,
            language: lang,
            category: category,
            tone: tone,
            type: 'caption',
            tags: [category, tone, 'gen']
          });
        }
      });
    });
  });

  // Expand with Bios
  for (let i = 0; i < 50; i++) {
    const isMalayalam = i % 2 === 0;
    const langKey = isMalayalam ? 'malayalam' : 'manglish';
    const category = CATEGORIES[i % CATEGORIES.length];
    const categoryBios = bioTemplates[langKey]?.[category] || bioTemplates[langKey]?.['attitude'] || [];
    const text = categoryBios[Math.floor(i / CATEGORIES.length) % categoryBios.length];
    
    result.push({
      id: `generated_bio_${i}`,
      text: text,
      language: isMalayalam ? 'malayalam' : 'manglish',
      category: category,
      tone: 'classy',
      type: 'bio',
      tags: ['bio', category]
    });
  }

  // Expand with Hooks
  for (let i = 0; i < 50; i++) {
    const isMalayalam = i % 2 === 0;
    const langKey = isMalayalam ? 'malayalam' : 'manglish';
    const category = CATEGORIES[i % CATEGORIES.length];
    const categoryHooks = hookTemplates[langKey]?.[category] || hookTemplates[langKey]?.['motivation'] || [];
    const text = categoryHooks[Math.floor(i / CATEGORIES.length) % categoryHooks.length];
    
    result.push({
      id: `generated_hook_${i}`,
      text: text,
      language: isMalayalam ? 'malayalam' : 'manglish',
      category: category,
      tone: 'bold',
      type: 'hook',
      tags: ['hook', category]
    });
  }

  // Deduplicate and filter out empty items if any
  const uniqueResult = Array.from(new Map(result.map(item => [item.text, item])).values());
  
  return uniqueResult;
};

// Category hashtags mapping for dynamic hashtags generation
export const CATEGORY_HASHTAGS: Record<string, string[]> = {
  love: ["#malayalampranayam", "#malayalamquotes", "#keralalove", "#keralacouples", "#lovequotesmalayalam", "#pranayam", "#chiri", "#koottu", "#love_kerala", "#keralam", "#couplegoals", "#lovestatus"],
  attitude: ["#malayalamattitude", "#keralaboys", "#keralagirls", "#attitudequotes", "#keralavibes", "#singleride", "#massquotes", "#attitude_malayalam", "#malayalammass", "#massentry", "#getlost", "#padippi"],
  travel: ["#keralatravel", "#travelkerala", "#vandi_praandh", "#idukkichuram", "#wayanadu", "#munnar", "#bikerlife", "#backpackers_kerala", "#keralaexplore", "#travelgram", "#chasingfog", "#hillstation"],
  friendship: ["#malayalamfriendship", "#chanku", "#koottukaar", "#schoolfriends", "#collegelife", "#chankbuddies", "#friendshipgoals", "#keralafriends", "#squad_kerala", "#machans", "#besties", "#kalippan"],
  wedding: ["#keralawedding", "#weddingphotography", "#keralabride", "#kasavusaree", "#mullappoo", "#kalyanam", "#brideandgroom", "#tali", "#weddingvibes", "#traditionalmarriage", "#keralagroom", "#couple_love"],
  "self-love": ["#selflovemalayalam", "#peacequotes", "#keralaselflove", "#selfcare", "#happyquotes", "#mystyle", "#myattitude", "#loveyourself", "#peaceofmind", "#findingpeace", "#beyourself", "#originalme"],
  motivation: ["#malayalammotivation", "#keralamotivation", "#successquotes", "#hustlekerala", "#focusquotes", "#dreambig", "#nevergiveup", "#positivitykerala", "#careergoals", "#hardwork", "#chuvadu", "#growth"],
  aesthetic: ["#malayalamaesthetic", "#aesthetic_kerala", "#chayavibe", "#rain_aesthetic", "#vintagekerala", "#sunsetkerala", "#peaceful_evening", "#foggypeak", "#minimalism_kerala", "#visualart", "#poetrystatus", "#nature_lovers"],
  funny: ["#malayalamfunny", "#keralacomedy", "#malayalamtrolls", "#trollkerala", "#diet_naale", "#lazymalayali", "#funnyquotes", "#comedyvibe", "#relatableposts", "#examhumor", "#chiri_nallatha", "#whatsapptroll"],
  kerala: ["#godsowncountry", "#keralavibes", "#puremalayali", "#sadya", "#thrissurpooram", "#kasavusaree", "#keralagram", "#malayalustyle", "#keralatradition", "#alappuzhabackwaters", "#cochindiaries", "#keralaforeveryone"],
  photography: ["#keralaphotography", "#keralaphotographers", "#click_kerala", "#lens_diaries", "#naturephotography", "#frame_story", "#picoftheday", "#canon_kerala", "#mobilephotography", "#sunsetclick", "#shadows", "#moments"],
  business: ["#keralabusiness", "#keralastartups", "#malayalambusiness", "#entrepreneur_kerala", "#hustlehard", "#startupkerala", "#businessquotes", "#localbrands", "#keralaentrepreneur", "#growthmindset", "#trust_business", "#successjourney"],
  makeover_artist: ["#keralamakeupartist", "#bridalmakeupkerala", "#muakerala", "#makeoverkerala", "#photoshootglam", "#freelancemuakerala", "#keralabride", "#bridalmakeover", "#weddingmua", "#keralaweddingphotography"],
  fashion: ["#keralafashion", "#boutiquekerala", "#keralaboutiques", "#fashioninfluencerkerala", "#ootdkerala", "#traditionalwear", "#modernwear", "#boutiquecollection", "#sareelovekerala", "#trendyoutfits"],
  techie: ["#keralatech", "#malayalamtech", "#gadgetskerala", "#techmalayalam", "#keralagadgets", "#techie_kerala", "#smartlife", "#technologykerala", "#keralatechies", "#futuretech"],
  coder: ["#keralacoders", "#malayalamcoder", "#developer_kerala", "#codingmalayalam", "#programmerlife", "#keralastartups", "#softwareengineer", "#buginmycode", "#chayacode", "#codingkerala"],
  nostalgia: ["#keralanostalgia", "#pazhayakaalam", "#childhoodmemories", "#malayalamnostalgia", "#90skerala", "#vintagestyle", "#retro_kerala", "#ormakal", "#nallakaalam", "#oldisgold_kerala"]
};

// Emoji bank to append based on tone/category
export const EMOJI_BANK: Record<string, string[]> = {
  love: ["❤️", "💖", "✨", "🔐", "🌸", "💍", "💘", "😍", "💞"],
  attitude: ["😎", "🔥", "👑", "⚔️", "😈", "⚡", "🦁", "💀", "😏"],
  travel: ["✈️", "🏍️", "🏔️", "🏕️", "🗺️", "🚗", "🚲", "🌅", "🌲"],
  friendship: ["👬", "👭", "🤙", "⚡", "🍻", "🍕", "🔥", "🙌", "👊"],
  wedding: ["💍", "👰", "🤵", "💒", "💐", "💖", "✨", "💃", "🎶"],
  "self-love": ["🌸", "😊", "✨", "💆‍♂️", "💆‍♀️", "🧘‍♂️", "💎", "💛", "🦄"],
  motivation: ["🎯", "🏔️", "🔥", "⚡", "🚀", "💪", "🏆", "🌟", "📈"],
  aesthetic: ["🍂", "☕", "🌌", "📝", "🌾", "🌫️", "🌅", "🌈", "🎻"],
  funny: ["🤪", "🍕", "🤖", "🧠", "😂", "🤣", "🐒", "🤷‍♂️", "🙈"],
  kerala: ["🌴", "🛶", "🥥", "🌊", "🌾", "🐘", "🥘", "🐯", "🥭"],
  photography: ["📸", "📷", "🤳", "🖼️", "🔭", "🌅", "🎨", "🎞️", "🔋"],
  business: ["💼", "📈", "🎯", "🚀", "💡", "💰", "🤝", "📊", "🏛️"],
  makeover_artist: ["✨", "🎨", "💄", "💅", "👰", "💖", "📸", "👑", "🌟"],
  fashion: ["👗", "👠", "🛍️", "🎀", "🧣", "👑", "💅", "👚", "🕺"],
  techie: ["💻", "📱", "🔌", "🔋", "💡", "📡", "⚙️", "🛠️"],
  coder: ["💻", "🚀", "☕", "👨‍💻", "👩‍💻", "⌨️", "👾", "🐞"],
  nostalgia: ["📻", "📺", "🍬", "📜", "📸", "📼", "🕯️", "🚲"]
};

// Helper to map any legacy item to the complete modern multi-dimensional schema
export function mapToNewSchema(item: any): Required<Omit<CaptionItem, 'category' | 'tone' | 'type' | 'tags'>> {
  const platforms = item.platforms || [
    item.type === 'bio' ? 'general' : 'instagram'
  ];
  
  const contentTypes = item.contentTypes || [
    item.type === 'bio' ? 'bio' : 
    item.type === 'hook' ? 'reel-hook' : 'photo-caption'
  ];

  const categories = item.categories || (item.category ? [item.category] : ['kerala']);
  
  const moods = item.moods || [
    item.tone === 'romantic' ? 'romantic' :
    item.tone === 'funny' ? 'sarcastic' :
    item.tone === 'emotional' ? 'emotional' : 'calm'
  ];

  const occasions = item.occasions || ['general'];
  const tones = item.tones || (item.tone ? [item.tone] : ['classy']);
  
  let lengthVal: 'one-line' | 'short' | 'medium' | 'detailed' = 'medium';
  if (item.length) {
    lengthVal = item.length;
  } else if (item.tone === 'short') {
    lengthVal = 'short';
  }

  const keywords = item.keywords || item.tags || [];
  const hashtags = item.hashtags || (item.tags ? item.tags.map((t: string) => `#${t}`) : []);

  return {
    id: item.id,
    text: item.text,
    language: item.language || 'malayalam',
    platforms,
    contentTypes,
    categories,
    moods,
    occasions,
    tones,
    length: lengthVal,
    keywords,
    hashtags
  };
}

export function inferCategoryFromTopic(keyword: string = "", category: string = "all"): string {
  const kw = keyword.toLowerCase().trim();
  if (!kw) return category === "all" ? "kerala" : category;
  
  if (kw.includes("bridal") || kw.includes("makeup") || kw.includes("makeover") || kw.includes("mua") || kw.includes("beauty") || kw.includes("salon") || kw.includes("glam") || kw.includes("lipstick")) {
    return "makeover_artist";
  }
  if (kw.includes("wedding") || kw.includes("kalyanam") || kw.includes("marriage") || kw.includes("groom") || kw.includes("bride") || kw.includes("tali") || kw.includes("reception")) {
    return "wedding";
  }
  if (kw.includes("photo") || kw.includes("camera") || kw.includes("shoot") || kw.includes("click") || kw.includes("lens") || kw.includes("pic") || kw.includes("portrait")) {
    return "photography";
  }
  if (kw.includes("fashion") || kw.includes("saree") || kw.includes("outfit") || kw.includes("boutique") || kw.includes("dress") || kw.includes("kasavu") || kw.includes("style")) {
    return "fashion";
  }
  if (kw.includes("tech") || kw.includes("gadget") || kw.includes("phone") || kw.includes("app") || kw.includes("mobile") || kw.includes("android") || kw.includes("iphone")) {
    return "techie";
  }
  if (kw.includes("code") || kw.includes("dev") || kw.includes("program") || kw.includes("software") || kw.includes("python") || kw.includes("java") || kw.includes("react")) {
    return "coder";
  }
  if (kw.includes("love") || kw.includes("couple") || kw.includes("romance") || kw.includes("heart") || kw.includes("pranayam") || kw.includes("sneham")) {
    return "love";
  }
  if (kw.includes("attitude") || kw.includes("mass") || kw.includes("single") || kw.includes("ego") || kw.includes("boss")) {
    return "attitude";
  }
  if (kw.includes("travel") || kw.includes("trip") || kw.includes("ride") || kw.includes("bike") || kw.includes("tour") || kw.includes("hills") || kw.includes("vandi") || kw.includes("wayanad") || kw.includes("idukki") || kw.includes("munnar")) {
    return "travel";
  }
  if (kw.includes("funny") || kw.includes("troll") || kw.includes("comedy") || kw.includes("joke") || kw.includes("chiri")) {
    return "funny";
  }
  if (kw.includes("business") || kw.includes("startup") || kw.includes("hustle") || kw.includes("money") || kw.includes("sales")) {
    return "business";
  }
  if (kw.includes("food") || kw.includes("tea") || kw.includes("chaya") || kw.includes("sadya") || kw.includes("biryani") || kw.includes("eat") || kw.includes("porotta")) {
    return "kerala";
  }
  return category === "all" ? "kerala" : category;
}

export interface GenerateOptions {
  platform: string;
  contentType: string;
  language: 'malayalam' | 'manglish' | 'english' | 'mixed';
  category: string;
  mood: string;
  occasion: string;
  tone: string;
  length: 'one-line' | 'short' | 'medium' | 'detailed';
  emojiSetting: 'none' | 'minimal' | 'more';
  resultsCount: number;
  keyword?: string;
  hashtagCount: 'none' | '5' | '10' | '15';
}

export interface GenerateResponse {
  results: Array<{
    id: string;
    text: string;
    hashtags: string[];
    platform: string;
    language: string;
    mood: string;
    occasion: string;
    charCount: number;
  }>;
  isFallbackUsed: boolean;
  message?: string;
}

// Generates varied, customized caption results with exact-match scoring and robust fallback mapping
export function generateCaptions(options: GenerateOptions): GenerateResponse {
  const targetCategory = inferCategoryFromTopic(options.keyword, options.category);

  // 1. Immediately handle Hashtag Only sets separately
  if (options.contentType === "hashtag_set") {
    const categoryHashtags = CATEGORY_HASHTAGS[targetCategory] || CATEGORY_HASHTAGS["kerala"];
    
    // Build custom keyword-specific hashtags
    const kwTags: string[] = [];
    if (options.keyword && options.keyword.trim()) {
      const cleanKw = options.keyword.toLowerCase().trim().replace(/[^a-z0-9_]/g, "");
      if (cleanKw) {
        kwTags.push(`#${cleanKw}`);
        kwTags.push(`#${cleanKw}kerala`);
        kwTags.push(`#kerala${cleanKw}`);
        kwTags.push(`#${cleanKw}vibes`);
        kwTags.push(`#${cleanKw}glam`);
        kwTags.push(`#${cleanKw}diaries`);
        kwTags.push(`#${cleanKw}look`);
      }
    }

    const combinedHashtags = [...new Set([...kwTags, ...categoryHashtags])];
    const results = [];
    const hCount = options.hashtagCount === "none" ? 5 : parseInt(options.hashtagCount, 10) || 10;
    
    for (let i = 0; i < options.resultsCount; i++) {
      const shuffled = [...combinedHashtags].sort(() => Math.random() - 0.5);
      const tags = shuffled.slice(0, hCount);
      const text = tags.join(" ");
      results.push({
        id: `dyn_hashtag_set_${targetCategory}_${i}`,
        text: text,
        hashtags: tags, // Populate hashtags array properly!
        platform: options.platform,
        language: options.language,
        mood: options.mood,
        occasion: options.occasion,
        charCount: text.length
      });
    }
    return {
      results,
      isFallbackUsed: false,
      message: `Generated custom hashtag set for ${options.keyword || targetCategory}!`
    };
  }

  if (options.contentType === "pickup_line") {
    const pickupLineFallbacks: Record<string, string[]> = {
      malayalam: [
        "നിന്റെ കണ്ണുകളിലേക്ക് നോക്കുമ്പോൾ എന്റെ ഫോണിലെ ചാർജ്ജ് തീരുന്നത് പോലെ എനിക്ക് തോന്നാറുണ്ട്. അത്രയ്ക്ക് പവർഫുൾ ആണ്! ⚡🔌",
        "ഒരു കിലോ പഞ്ചസാരയും നിന്റെ ഈ ഒരു ചിരിയും തമ്മിൽ യാതൊരു വ്യത്യാസവുമില്ല, അത്രയ്ക്ക് മധുരമാണ്. 🍬🍭",
        "കൂട്ടത്തിൽ ഏറ്റവും ഭംഗിയുള്ള കുട്ടി ആരാണെന്ന് ചോദിച്ചാൽ ഞാൻ നിന്റെ നേരെ വിരൽ ചൂണ്ടും! 👉💖",
        "ഗൂഗിൾ മാപ്പ് വഴി ഞാൻ പല വഴികളും തിരഞ്ഞു, ഒടുവിൽ നിന്റെ ഹൃദയത്തിലേക്കുള്ള വഴി മാത്രമാണ് എനിക്ക് കിട്ടാത്തത്. 🗺️📍",
        "നീ ഒരു ചായയാണോ? കാരണം എനിക്ക് ദിവസവും നിന്നെ ആവശ്യമുണ്ട്! ☕❤️"
      ],
      manglish: [
        "Ninte kannukalilekku nokkumbol ente phone battery speedil theerunna pole thonnum. Athoru magnetic power aanu! ⚡🔋",
        "Google mapsil njan pala vazhikalum search cheythu, pakshe ninte hridayathilekkulla vazhi mathram kandilla! 🗺️❤️",
        "Are you a cup of hot chaya? Because my day is incomplete without you! ☕🥰",
        "Ninte chiri kaanumbol enikku ella sangadangalum marannu pokunnu, enthaayirikkum athinte rahasyam? ✨🤫",
        "Ninte koode nadakkan pattiya oru nalla buddy aakaan enikku ആഗ്രഹമുണ്ട്. 👭"
      ],
      english: [
        "Are you Google? Because you have everything I’ve been searching for. 🔍❤️",
        "Is it hot in here, or is it just your smile warming up my whole universe? ☀️🥰",
        "Are you a cup of tea? Because you are exactly what I need to start my day. ☕✨",
        "Do you have a map? Because I keep getting lost in your eyes every single time. 🗺️👀",
        "If beauty was a crime, you would definitely be serving a life sentence! ⚖️💖"
      ],
      mixed: [
        "Ninte chiri is so sweet, are you made of local sugar candy? 🍬😂",
        "Are you a cup of hot കട്ടൻ ചായ? Because my day is completely blank without you! ☕❤️",
        "My heart is drifting like a വള്ളം in the Ashtamudi lake when you smile! 🚣‍♂️💘"
      ]
    };

    const list = pickupLineFallbacks[options.language] || pickupLineFallbacks.malayalam;
    const results = [];
    for (let i = 0; i < options.resultsCount; i++) {
      const text = list[i % list.length];
      const tags = CATEGORY_HASHTAGS[options.category]?.slice(0, 3) || ["#vibe", "#love"];
      results.push({
        id: `local_pickup_${options.language}_${i}`,
        text: text,
        hashtags: options.hashtagCount === "none" ? [] : tags,
        platform: options.platform,
        language: options.language,
        mood: options.mood,
        occasion: options.occasion,
        charCount: text.length
      });
    }
    return {
      results,
      isFallbackUsed: true,
      message: `Generated ${options.resultsCount} custom pickup lines for you!`
    };
  }

  const fullDb = generateDatabase();
  const loadedPool = getLoadedCaptionsSync();
  const combinedRawDb = [...fullDb, ...loadedPool];
  const mappedDb = combinedRawDb.map(rawItem => mapToNewSchema(rawItem));
  const cleanContentType = options.contentType === "hook" ? "reel-hook" : options.contentType;

  // 2. Strict content type segregation (e.g. bios should never return captions)
  let candidates = mappedDb.filter(item => {
    const typeMatch = item.contentTypes.includes(cleanContentType);
    const langMatch = item.language === options.language;
    const catMatch = item.categories.includes(options.category);
    return typeMatch && langMatch && catMatch;
  });

  // If too few candidates, relax category first (but KEEP content type and language)
  if (candidates.length < options.resultsCount) {
    const extraCategoryCandidates = mappedDb.filter(item => {
      const typeMatch = item.contentTypes.includes(cleanContentType);
      const langMatch = item.language === options.language;
      const catMatch = item.categories.includes(options.category);
      return typeMatch && langMatch && !catMatch;
    });
    candidates = [...candidates, ...extraCategoryCandidates];
  }

  // If STILL too few, relax language (keep content type)
  if (candidates.length < options.resultsCount) {
    const extraLangCandidates = mappedDb.filter(item => {
      const typeMatch = item.contentTypes.includes(cleanContentType);
      const langMatch = item.language === options.language;
      return typeMatch && !langMatch;
    });
    candidates = [...candidates, ...extraLangCandidates];
  }

  // If STILL too few, grab any matching content type regardless of anything else
  if (candidates.length < options.resultsCount) {
    const extraCandidates = mappedDb.filter(item => {
      return item.contentTypes.includes(cleanContentType);
    });
    candidates = [...candidates, ...extraCandidates];
  }

  // Deduplicate candidates
  const uniqueCandidates = Array.from(new Map(candidates.map(c => [c.text, c])).values());

  // 3. Score candidates based on requested criteria
  const scoredCandidates = uniqueCandidates.map(item => {
    let score = 0;

    // Platform matching (+4)
    if (item.platforms.includes(options.platform) || item.platforms.includes("general")) {
      score += 4;
    }

    // Category matching (+15)
    if (item.categories.includes(options.category)) {
      score += 15;
    }

    // Language matching (+10)
    if (item.language === options.language) {
      score += 10;
    }

    // Mood matching (+2)
    if (item.moods.includes(options.mood)) {
      score += 2;
    }

    // Occasion matching (+2)
    if (item.occasions.includes(options.occasion)) {
      score += 2;
    }

    // Tone matching (+2)
    if (item.tones.includes(options.tone)) {
      score += 2;
    }

    // Length matching (+1)
    if (item.length === options.length) {
      score += 1;
    }

    // Specific Keyword Search (+10)
    if (options.keyword && options.keyword.trim()) {
      const kw = options.keyword.toLowerCase().trim();
      const textContains = item.text.toLowerCase().includes(kw);
      const keywordsContain = item.keywords.some(k => k.toLowerCase().includes(kw));
      if (textContains || keywordsContain) {
        score += 10;
      }
    }

    return { item, score };
  });

  // Sort descending by score, with a random shake for equal scores to prevent repeating captions!
  const sortedCandidates = scoredCandidates.sort((a, b) => {
    const scoreDiff = b.score - a.score;
    if (scoreDiff !== 0) return scoreDiff;
    return Math.random() - 0.5;
  });
  
  // Select top results
  let selected = sortedCandidates.slice(0, options.resultsCount).map(s => s.item);

  // Fallback indicator
  const isFallbackUsed = selected.length === 0 || (sortedCandidates[0]?.score || 0) < 4;

  // Safe fallback sentences (pre-made premium lines, matching requested content types)
  const fallbackSentences: Record<string, string[]> = {
    malayalam: [
      "ജീവിതത്തിലെ ഓരോ കൊച്ചു നിമിഷങ്ങളും മനോഹരമായ ഓർമ്മകളാക്കി മാറ്റുക. ✨",
      "പോസിറ്റീവ് ചിന്തകളോടെ പുതിയൊരു ദിവസത്തെ വരവേൽക്കാം. ☀️",
      "നിങ്ങളുടെ പുഞ്ചിരിയാണ് മറ്റുള്ളവർക്ക് നൽകാൻ കഴിയുന്ന ഏറ്റവും മികച്ച സമ്മാനം. 😊",
      "സ്വപ്നങ്ങൾ യാഥാർത്ഥ്യമാക്കാൻ നിരന്തരം പരിശ്രമിച്ചുകൊണ്ടേയിരിക്കുക. 🎯",
      "പ്രകൃതിയുടെ ഭംഗി ആസ്വദിക്കൂ, മനസ്സിന് ശാന്തി നൽകൂ. 🍃",
      "ചില യാത്രകൾ വരികളിലൂടെയാണ്, ചിലത് ഓർമ്മകളിലൂടെയും. 🗺️",
      "നല്ല സൗഹൃദങ്ങളാണ് ജീവിതത്തിലെ ഏറ്റവും വലിയ സമ്പാദ്യം. 👬",
      "ലളിതമായ ജീവിതം, മനോഹരമായ ചിന്തകൾ. 🌸",
      "സ്റ്റൈലിഷ് ആയിരിക്കുക എന്നത് ഒരു തന്റേടമാണ്. 😎",
      "ഓരോ തുടക്കവും പുതിയൊരു ചരിത്രത്തിന്റെ തുടക്കമാകാം. 🚀"
    ],
    manglish: [
      "Jeevithathile oro cheru nimishangalum oru nalla ormakkuttaakkam. ✨",
      "Keep spreading positive vibes and love wherever you go. 🌸",
      "Ningalude chiri aanu ellathilum valuthu, keep smiling! 😊",
      "Swapnangal poovaniyan kadhinadhwanam cheyyuka. 🎯",
      "Kerala vibes and peace of mind is a special combination. 🌴",
      "Yathrakal tharunna puthiya anubhavangal ennum ormanilkkum. 🗺️",
      "Nalla chank koottukaar undel pinne jeevitham set aanu! 👬",
      "Simple life, high thinking and positive mind. 🌟",
      "Always stay stylish, confident and uniquely yourself. 😎",
      "Every new beginning is a chance to rewrite your story. 🚀"
    ],
    english: [
      "Cherish every little moment that brings a smile to your face. ✨",
      "Keep spreading positive vibes and happiness wherever you go. 🌸",
      "Your smile is the most beautiful thing you can ever wear. 😊",
      "Dream big, work hard, and never give up on your goals. 🎯",
      "Finding peace in nature and joy in simple things. 🍃",
      "Every journey tells a story, and every story is beautiful. 🗺️",
      "Good friends are like stars, always lighting up your life. 👬",
      "A simple life filled with beautiful minds and gratitude. 🌟",
      "Be confident, be stylish, and be beautifully yourself. 😎",
      "Every new day is a fresh chapter waiting to be written. 🚀"
    ],
    mixed: [
      "No place like home. മൺവാസനയും നാടൻ തനിമയും നിറഞ്ഞ നമ്മുടെ കേരളം. 🌴",
      "Kerala vibes only. തെങ്ങും കായലും കൂടെ നല്ലൊരു ചായയും. ☕",
      "Simple life, high thinking. ലളിതമായ ജീവിതം, മനോഹരമായ ചിന്തകൾ. ✨",
      "Always be proud of who you are. നമ്മുടെ വഴി നമ്മൾ തന്നെ വെട്ടിത്തുറക്കും! 😎",
      "Chasing sunsets and beautiful memories. മനോഹരമായ സായാഹ്നങ്ങൾ... 🌅",
      "Friendship is life. ചങ്കുകൾ കൂടെയുണ്ടെങ്കിൽ പിന്നെ ഒന്നും പേടിക്കാനില്ല! 👬",
      "Follow your dreams. സ്വപ്നങ്ങളിലേക്ക് ഒരു ചുവടു കൂടി മുന്നോട്ട്. 🎯",
      "Self care is the best care. സ്വയം സ്നേഹിക്കാൻ പഠിക്കുക. 🌸",
      "Capturing beautiful moments of life. ഓരോ ഫ്രെയിമിലും ഒരു കഥയുണ്ട്. 📸",
      "Trust the timing of your life. എല്ലാം നല്ലതിനാണെന്ന് വിശ്വസിക്കുക. 🌟"
    ]
  };

  const bioFallbacks: Record<string, string[]> = {
    malayalam: [
      "✨ ലളിതമായ ജീവിതം | സ്വപ്നങ്ങളിലേക്ക് ഒരു ചുവട് 🚀 | Proud Keralite 🌴",
      "👑 സ്വന്തം വഴിയിലൂടെ... | വായനയും ചായയും പ്രിയം ☕ | Live & Let Live 🌸",
      "❤️ ചിരിയും ചിന്തകളും | കട്ട ചങ്ക് ഗാംഗ് 🤙 | സ്നേഹമാണ് എല്ലാം 🔐"
    ],
    manglish: [
      "✨ Living my life in 3D: Dreams, Determination & Dedication. 🚀",
      "👑 Creating my own path. | Tea lover ☕ | Simple but classy. 🌸",
      "❤️ Keep smiling and trust your vibes. | Happy soul 🌴"
    ]
  };

  const hookFallbacks: Record<string, string[]> = {
    malayalam: [
      "നിങ്ങൾ ഈ രഹസ്യം ഇതുവരെ അറിഞ്ഞിട്ടില്ലെങ്കിൽ ഇപ്പോൾ തന്നെ കാണൂ! 😱👇",
      "നിങ്ങളുടെ ചിന്തകളെ മാറ്റിമറിക്കാൻ പോന്ന ഒരു കിടിലൻ അറിവ് ഇതാ! ✨🎯",
      "ഇതുവരെ ആരും പറയാത്ത ആ ഒരു അത്ഭുത സത്യം ഇതാ വെളിപ്പെടുന്നു! 👀🔥"
    ],
    manglish: [
      "Do you know this extremely hidden secret? Watch till the end! 😱👇",
      "This simple trick will completely change your perspective! ✨🎯",
      "Nobody talks about this ultimate reality, find out now! 👀🔥"
    ]
  };

  while (selected.length < options.resultsCount) {
    let text = "";
    if (cleanContentType === "bio") {
      const list = bioFallbacks[options.language === "malayalam" ? "malayalam" : "manglish"];
      text = list[selected.length % list.length];
    } else if (cleanContentType === "reel-hook") {
      const list = hookFallbacks[options.language === "malayalam" ? "malayalam" : "manglish"];
      text = list[selected.length % list.length];
    } else {
      const list = fallbackSentences[options.language] || fallbackSentences.malayalam;
      text = list[selected.length % list.length];
    }

    selected.push({
      id: `dyn_safe_${selected.length}`,
      text: text,
      language: options.language,
      platforms: [options.platform],
      contentTypes: [options.contentType],
      categories: [options.category],
      moods: [options.mood],
      occasions: [options.occasion],
      tones: [options.tone],
      length: options.length,
      keywords: options.keyword ? [options.keyword] : [],
      hashtags: CATEGORY_HASHTAGS[options.category]?.slice(0, 2) || ["#KeralaVibes"]
    });
  }

  // 4. Process results (apply dynamic output length, keywords, emojis level and hashtag counts)
  const results = selected.map((item, index) => {
    let text = item.text;

    // A. Dynamic Output Length Adjustments
    if (cleanContentType === "photo-caption") {
      if (options.length === "one-line") {
        const parts = text.split(/[|•!\.?]/);
        if (parts.length > 0 && parts[0].trim().length > 5) {
          text = parts[0].trim() + " ✨";
        } else {
          text = text.substring(0, 60).trim() + "...";
        }
      } else if (options.length === "short") {
        const parts = text.split(/[|•]/);
        if (parts.length > 1) {
          text = parts.slice(0, 2).join(" | ").trim();
        } else {
          text = text.substring(0, 120).trim();
        }
      } else if (options.length === "detailed") {
        const ctas: Record<string, string[]> = {
          en: [
            "What are your thoughts on this? Let me know in the comments below! 👇✨",
            "Tag someone who needs to see this today! ❤️ Share the love.",
            "Save this post for later so you don't forget! 📌",
            "Hit follow for more daily inspiration and vibes like this! 🚀"
          ],
          ml: [
            "നിങ്ങളുടെ അഭിപ്രായങ്ങൾ താഴെ കമന്റ് ചെയ്യുമല്ലോ! 👇✨",
            "ഇത് കാണേണ്ട ഒരാളെ ഇപ്പോൾ തന്നെ ടാഗ് ചെയ്യൂ! ❤️",
            "കൂടുതൽ മനോഹരമായ വരികൾക്കായി ഫോളോ ചെയ്യാൻ മറക്കല്ലേ! 🚀",
            "ഈ വരികൾ ഇഷ്ടമായെങ്കിൽ സേവ് ചെയ്തു വെക്കൂ! 📌"
          ]
        };
        const langCtas = options.language === "malayalam" ? ctas.ml : ctas.en;
        const chosenCta = langCtas[index % langCtas.length];
        text = `${text}\n\n${chosenCta}`;
      }
    }

    // B. Organic keyword injection if keyword is active but not inside text
    if (options.keyword && options.keyword.trim()) {
      const kw = options.keyword.trim();
      const lowerText = text.toLowerCase();
      const lowerKw = kw.toLowerCase();
      if (!lowerText.includes(lowerKw)) {
        if (options.language === "malayalam") {
          text = `${kw} - ${text}`;
        } else if (options.language === "manglish") {
          text = `${kw}: ${text}`;
        } else {
          text = `✨ ${kw} | ${text}`;
        }
      }
    }

    // C. Apply Emojis level
    const catEmojis = EMOJI_BANK[options.category] || ["✨", "💖"];
    const shuffledEmojis = [...catEmojis].sort(() => Math.random() - 0.5);
    
    if (options.emojiSetting === "none") {
      // Strip existing emojis using a reliable regex
      text = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, "");
    } else if (options.emojiSetting === "minimal") {
      const textHasEmoji = /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/u.test(text);
      if (!textHasEmoji) {
        text = `${shuffledEmojis[0]} ${text}`;
      }
    } else if (options.emojiSetting === "more") {
      text = `${shuffledEmojis[0]} ${text} ${shuffledEmojis[1] || "✨"}`;
    }

    // D. Build requested number of hashtags
    const hCount = options.hashtagCount === "none" ? 0 : parseInt(options.hashtagCount, 10) || 5;
    const baseCategoryHashtags = CATEGORY_HASHTAGS[targetCategory] || CATEGORY_HASHTAGS[options.category] || ["#Vamozhi", "#KeralaVibes"];
    const kwTags: string[] = [];
    if (options.keyword && options.keyword.trim()) {
      const cleanKw = options.keyword.toLowerCase().trim().replace(/[^a-z0-9_]/g, "");
      if (cleanKw) {
        kwTags.push(`#${cleanKw}`);
        kwTags.push(`#${cleanKw}kerala`);
      }
    }
    const combinedTags = [...new Set([...kwTags, ...baseCategoryHashtags])];
    const chosenHashtags = combinedTags
      .sort(() => Math.random() - 0.5)
      .slice(0, hCount);

    return {
      id: `${item.id}_res_${index}`,
      text: text.trim(),
      hashtags: chosenHashtags,
      platform: options.platform,
      language: options.language,
      mood: options.mood,
      occasion: options.occasion,
      charCount: text.length + (chosenHashtags.join(" ").length)
    };
  });

  return {
    results,
    isFallbackUsed,
    message: isFallbackUsed 
      ? "Generated beautiful local Malayalam captions!" 
      : "Original, high-precision matches generated successfully!"
  };
}
