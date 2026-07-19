/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
      "Our special bond... ",
      "Nee ennum ente lokamanu... "
    ],
    attitude: [
      "Oru karyam orthu vecholu... ",
      "Ente life, ente rules! ",
      "Arudeyum munnil thala kunikkaan premamilla. ",
      "Silent but deadly vibe... ",
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
      "Chirichu chirichu chakaam! ",
      "Ente daivame, ithu enthuvade... ",
      "Diet okke naale thudangaam... ",
      "Oru chiri koodi undel nalla life! "
    ],
    kerala: [
      "Daivathinte swantham naattil ninnu... ",
      "Kerala thanima niranja vazhikal... */ ",
      "Pure Malayali vibes only... ",
      "Pachappum kayalukalum koode nalla chaya! ",
      "Naadan styling and feels... "
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
    text: "കടം തന്ന പൈസ ചോദിക്കുമ്പോൾ അവർ കാണിക്കുന്ന ആ വല്ലാത്ത ഭാവം ഉണ്ടല്ലോ... ഒടുവിൽ ഞാൻ തന്നെ വാങ്ങിയവൻ ആയി മാറേണ്ടി വരും!",
    language: "malayalam",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["money", "debt", "irony"]
  },
  {
    id: "fun_m3",
    text: "ഡയറ്റ് ഒക്കെ നാളെ മുതൽ തുടങ്ങാം എന്ന് വിചാരിക്കുന്നു, പക്ഷേ ബിരിയാണി കണ്ടാൽ എന്റെ കൺട്രോൾ പോകും കൂട്ടുകാരേ!",
    language: "malayalam",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["biryani", "diet", "foodie"]
  },
  {
    id: "fun_m4",
    text: "ഫോട്ടോ എടുക്കുമ്പോൾ ചിരിക്കാൻ പറയുന്ന ക്യാമറാമാൻ... എന്റെ ഉള്ളിലെ സങ്കടങ്ങൾ അദ്ദേഹം എങ്ങനറിയാൻ!",
    language: "malayalam",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["photoshoot", "sarcasm"]
  },
  {
    id: "fun_m5",
    text: "സ്വന്തം ഫോൺ സൈലന്റിൽ ഇട്ടിട്ട് അത് വീട്ടിനകത്തു വെച്ചുതന്നെ തിരഞ്ഞു കണ്ടുപിടിക്കുന്ന വല്ലാത്തൊരു ജന്മമാണ് ഞാൻ!",
    language: "malayalam",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["phone", "silent", "stupidity"]
  },
  {
    id: "fun_g1",
    text: "Diet okke naale muthal thudangaam, innu enthaayalum nallonam kazhikkaam. Biriyani is life!",
    language: "manglish",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["food", "procrastination", "humor"]
  },
  {
    id: "fun_g2",
    text: "Padikkaan irikkumpol varunna aa urakkam, athoru prathyoga duryogam thanneyaanu.",
    language: "manglish",
    category: "funny",
    tone: "funny",
    type: "caption",
    tags: ["exams", "lazy"]
  },
  {
    id: "fun_g3",
    text: "Swantham phone silenceil poyittu athu vilichu kandupidikkaan sremikkunna aal aanu njan. Proud idiot!",
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
const CATEGORIES: Array<CaptionItem['category']> = ['love', 'attitude', 'travel', 'friendship', 'wedding', 'self-love', 'motivation', 'aesthetic', 'funny', 'kerala', 'photography', 'business'];
const LANGUAGES: Array<CaptionItem['language']> = ['malayalam', 'manglish', 'mixed'];
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
      ]
    }
  };

  // Bio-specific templates
  const bioTemplates = {
    malayalam: [
      "✨ സ്വപ്നം കാണാൻ ഭയമില്ലാത്ത യാത്രികൻ 🌍 | പ്രകൃതിയെയും ചായയെയും പ്രണയിക്കുന്നു.",
      "🔥 എന്റെ രീതികൾ എന്റെ മാത്രം ചോയ്സ് 👑 | തളർത്താൻ നോക്കിയാൽ തളരില്ല.",
      "🎓 കോളേജ് ലൈഫ് കട്ടക്ക് ആഘോഷിക്കുന്നവൻ 🤙 | ചങ്കുകൾ ആണ് എന്റെ ബലം.",
      "💻 കോഡിംഗും ചായയും കൂട്ടിയുള്ള കോമ്പിനേഷൻ ☕ | സ്വന്തം സാമ്രാജ്യം പണിയുന്നു."
    ],
    manglish: [
      "✨ Chasing dreams & sunset vibes 🌅 | Pure Malayali at heart 🌴",
      "🔥 My attitude is my signature 👑 | Deal with it with a smile 😊",
      "🎓 Fun-loving student and food explorer 🍕 | Chank koottukaar are my power 💪",
      "💻 Technology lover and quiet observer 🎧 | Building my own world step by step."
    ]
  };

  // Hooks templates
  const hookTemplates = {
    malayalam: [
      "ഇൻസ്റ്റാഗ്രാമിൽ വൈറലാവാൻ ഈ ഒരു ട്രിക്ക് നിങ്ങൾക്കറിയാമോ? 😱👇",
      "നിങ്ങൾ ഈ കേരള വൈബ്സ് ഇതുവരെ കണ്ടിട്ടില്ലെങ്കിൽ തീർച്ചയായും കാണുക! 👀🌴",
      "എന്റെ ഈ വിജയത്തിന് പിന്നിലുള്ള ആ രഹസ്യം ഇതാ... 🤫🏆",
      "ഇതാണ് ഓരോ മലയാളിയും കാണാൻ കൊതിക്കുന്ന ആ മനോഹര ദൃശ്യം! 😍🌅"
    ],
    manglish: [
      "Instagram-il viral aakaan ulla 3 simple tricks kando? 😱👇",
      "Ningal ee Kerala vibe ithuvare kandittillengil miss aakum! 👀🌴",
      "Ente ee success-inte pinnile secret enthanennu parayam... 🤫🏆",
      "Ithanu oro Malayali-yum kaanan thadikkunna aa scene! 😍🌅"
    ]
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
  for (let i = 0; i < 20; i++) {
    const isMalayalam = i % 2 === 0;
    const array = isMalayalam ? bioTemplates.malayalam : bioTemplates.manglish;
    const category = CATEGORIES[i % CATEGORIES.length];
    result.push({
      id: `generated_bio_${i}`,
      text: array[i % array.length],
      language: isMalayalam ? 'malayalam' : 'manglish',
      category: category,
      tone: 'classy',
      type: 'bio',
      tags: ['bio', category]
    });
  }

  // Expand with Hooks
  for (let i = 0; i < 20; i++) {
    const isMalayalam = i % 2 === 0;
    const array = isMalayalam ? hookTemplates.malayalam : hookTemplates.manglish;
    const category = CATEGORIES[i % CATEGORIES.length];
    result.push({
      id: `generated_hook_${i}`,
      text: array[i % array.length],
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
  kerala: ["#godsowncountry", "#keralavibes", "#puremalayali", "#sadya", "#thrissurpooram", "#kasavusaree", "#keralagram", "#mallustyle", "#mallugram", "#alappuzhabackwaters", "#cochindiaries", "#keralaforeveryone"],
  photography: ["#keralaphotography", "#keralaphotographers", "#click_kerala", "#lens_diaries", "#naturephotography", "#frame_story", "#picoftheday", "#canon_kerala", "#mobilephotography", "#sunsetclick", "#shadows", "#moments"],
  business: ["#keralabusiness", "#keralastartups", "#malayalambusiness", "#entrepreneur_kerala", "#hustlehard", "#startupkerala", "#businessquotes", "#localbrands", "#malluentrepreneur", "#growthmindset", "#trust_business", "#successjourney"]
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
  business: ["💼", "📈", "🎯", "🚀", "💡", "💰", "🤝", "📊", "🏛️"]
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
  const fullDb = generateDatabase();
  
  // Scoring algorithm
  const scoredItems = fullDb.map(rawItem => {
    const item = mapToNewSchema(rawItem);
    let score = 0;
    
    // 1. Language matching (Critical: +5)
    if (item.language === options.language) {
      score += 5;
    }
    
    // 2. Platform compatibility (+4)
    if (item.platforms.includes(options.platform) || item.platforms.includes('general')) {
      score += 4;
    }
    
    // 3. Content Type compatibility (+4)
    if (item.contentTypes.includes(options.contentType)) {
      score += 4;
    }
    
    // 4. Vibe Category compatibility (+3)
    if (item.categories.includes(options.category)) {
      score += 3;
    }
    
    // 5. Mood matching (+2)
    if (item.moods.includes(options.mood)) {
      score += 2;
    }
    
    // 6. Occasion matching (+2)
    if (item.occasions.includes(options.occasion)) {
      score += 2;
    }
    
    // 7. Expressive Tone matching (+2)
    if (item.tones.includes(options.tone)) {
      score += 2;
    }
    
    // 8. Length matching (+1)
    if (item.length === options.length) {
      score += 1;
    }
    
    // 9. Specific Keyword Search (+8 - huge bump for intent)
    if (options.keyword && options.keyword.trim()) {
      const kw = options.keyword.toLowerCase().trim();
      const textContains = item.text.toLowerCase().includes(kw);
      const keywordsContain = item.keywords.some(k => k.toLowerCase().includes(kw));
      if (textContains || keywordsContain) {
        score += 8;
      }
    }
    
    return { item, score };
  });

  // Sort items descending by score
  const sorted = scoredItems.sort((a, b) => b.score - a.score);
  
  // Decide threshold for "Good Match"
  // Maximum possible score (without keyword) is 5+4+4+3+2+2+2+1 = 23.
  // If top item has less than 13 points, we count it as a partial/fallback match.
  const topScore = sorted[0]?.score || 0;
  const isFallbackUsed = topScore < 13;

  // Take the top results
  let selected = sorted.slice(0, options.resultsCount).map(s => s.item);

  // If we don't have enough results, fill them dynamically
  while (selected.length < options.resultsCount) {
    const randomId = `dyn_${Math.random().toString(36).substring(2, 9)}`;
    let text = "";
    
    // Simple organic combinations
    const categoryHashtags = CATEGORY_HASHTAGS[options.category] || ["#KeralaVibes"];
    const hashtagSeed1 = categoryHashtags[0] || "#vamozhi";
    const hashtagSeed2 = categoryHashtags[1] || "#keralagram";

    if (options.language === 'malayalam') {
      const openings = OPENING_PHRASES.malayalam[options.category] || ["ചില നിമിഷങ്ങൾ... "];
      const bridges = EMOTIONAL_BRIDGES.malayalam;
      const opening = openings[Math.floor(Math.random() * openings.length)];
      const bridge = bridges[Math.floor(Math.random() * bridges.length)];
      const kwStr = options.keyword ? ` ${options.keyword} - ` : "";
      text = `${opening}${bridge}${kwStr}നമ്മുടെ ജീവിതത്തിൽ സന്തോഷവും പോസിറ്റിവിറ്റിയും എപ്പോഴും നിറഞ്ഞുനിൽക്കട്ടെ.`;
    } else if (options.language === 'manglish') {
      const openings = OPENING_PHRASES.manglish[options.category] || ["Chila nalla nimishangal... "];
      const bridges = EMOTIONAL_BRIDGES.manglish;
      const opening = openings[Math.floor(Math.random() * openings.length)];
      const bridge = bridges[Math.floor(Math.random() * bridges.length)];
      const kwStr = options.keyword ? ` about ${options.keyword} ` : "";
      text = `${opening}${bridge}${kwStr}Keep spreading positive vibes everywhere you go!`;
    } else if (options.language === 'mixed') {
      const kwStr = options.keyword ? `${options.keyword} - ` : "";
      text = `✨ ${kwStr}ഒരു കൊച്ചു സുന്ദരമായ ഓർമ്മക്കൂട്ട്. Truly special and heart touching moments in life!`;
    } else {
      // English fallback
      const kwStr = options.keyword ? `Regarding ${options.keyword}: ` : "";
      text = `${kwStr}Life is a collection of beautiful moments. Keep smiling and cherish every single second!`;
    }

    if (selected.some(s => s.text === text)) {
      break; // Avoid infinite loop
    }

    selected.push({
      id: randomId,
      text,
      language: options.language,
      platforms: [options.platform],
      contentTypes: [options.contentType],
      categories: [options.category],
      moods: [options.mood],
      occasions: [options.occasion],
      tones: [options.tone],
      length: options.length,
      keywords: options.keyword ? [options.keyword] : [],
      hashtags: [hashtagSeed1, hashtagSeed2]
    });
  }

  // Deduplicate and process results (apply emoji configurations and hashtag counts)
  const results = selected.map((item, index) => {
    let text = item.text;

    // Organic keyword injection if keyword is active but not inside text
    if (options.keyword && options.keyword.trim()) {
      const kw = options.keyword.trim();
      if (!text.toLowerCase().includes(kw.toLowerCase())) {
        if (options.language === 'malayalam') {
          text = `[${kw}] ${text}`;
        } else {
          text = `✨ ${kw} - ${text}`;
        }
      }
    }

    // Apply Emojis
    const catEmojis = EMOJI_BANK[options.category] || ["✨", "💖"];
    const shuffledEmojis = [...catEmojis].sort(() => Math.random() - 0.5);
    
    if (options.emojiSetting === 'none') {
      // Keep plain text
    } else if (options.emojiSetting === 'minimal') {
      text = `${shuffledEmojis[0]} ${text} ${shuffledEmojis[1] || ""}`;
    } else if (options.emojiSetting === 'more') {
      text = `${shuffledEmojis[0]}${shuffledEmojis[1] || "✨"} ${text} ${shuffledEmojis[2] || "🔥"}${shuffledEmojis[3] || "🌴"} 🙌`;
    }

    // Build requested number of hashtags
    const hCount = options.hashtagCount === 'none' ? 0 : parseInt(options.hashtagCount, 10) || 5;
    const categoryHashtags = CATEGORY_HASHTAGS[options.category] || ["#Vamozhi", "#KeralaVibes"];
    const chosenHashtags = [...categoryHashtags]
      .sort(() => Math.random() - 0.5)
      .slice(0, hCount);

    return {
      id: `${item.id}_res_${index}`,
      text,
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
      ? "Perfect direct-match captions are currently being expanded. Showing highly relevant partial matches instead!" 
      : "Original, high-precision matches generated successfully!"
  };
}
