/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from "fs";
import path from "path";

export interface DictionaryEntry {
  id: string;
  word: string;
  malayalam: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  source: string;
}

export interface CommunityCaption {
  id: string;
  text: string;
  hashtags: string[];
  author: string;
  likes: number;
  createdAt: string;
}

// Default initial dictionary dataset
const SEED_DICTIONARY: DictionaryEntry[] = [
  {
    id: "dict_1",
    word: "love",
    malayalam: "സ്നേഹം",
    partOfSpeech: "noun",
    definition: "പ്രണയം, ഇഷ്ടം, ആഴത്തിലുള്ള മമത (Affection, deep attachment)",
    example: "Love conquers all -> സ്നേഹം എല്ലാറ്റിനെയും ജയിക്കുന്നു.",
    source: "Olam Datuk"
  },
  {
    id: "dict_2",
    word: "beautiful",
    malayalam: "മനോഹരമായ",
    partOfSpeech: "adjective",
    definition: "കാഴ്ചയ്ക്ക് ഇമ്പമുള്ള, ഭംഗിയുള്ള (Aesthetically pleasing, pretty)",
    example: "A beautiful sunset -> മനോഹരമായ ഒരു സൂര്യാസ്തമയം.",
    source: "Olam Datuk"
  },
  {
    id: "dict_3",
    word: "book",
    malayalam: "പുസ്തകം",
    partOfSpeech: "noun",
    definition: "ഗ്രന്ഥം, വായിക്കാനുള്ള താളുകൾ ചേർത്തുകെട്ടിയത് (A bound set of printed sheets)",
    example: "He read a book -> അവൻ ഒരു പുസ്തകം വായിച്ചു.",
    source: "Olam Datuk"
  },
  {
    id: "dict_4",
    word: "rain",
    malayalam: "മഴ",
    partOfSpeech: "noun",
    definition: "മേഘങ്ങളിൽ നിന്ന് വീഴുന്ന ജലത്തുള്ളികൾ (Water falling in drops from vapor)",
    example: "The rain is beautiful -> മഴ മനോഹരമാണ്.",
    source: "Olam Ekkurup"
  },
  {
    id: "dict_5",
    word: "home",
    malayalam: "വീട്",
    partOfSpeech: "noun",
    definition: "ഭവനം, താമസിസ്ഥലം, പാർപ്പിടം (Place of residence, household)",
    example: "Welcome home -> വീട്ടിലേക്ക് സ്വാഗതം.",
    source: "Olam Datuk"
  },
  {
    id: "dict_6",
    word: "water",
    malayalam: "വെള്ളം",
    partOfSpeech: "noun",
    definition: "ജലം, പാനീയം (A clear liquid, chemical compound H2O)",
    example: "Give me some water -> എനിക്ക് കുറച്ചു വെള്ളം തരൂ.",
    source: "Olam Datuk"
  },
  {
    id: "dict_7",
    word: "food",
    malayalam: "ഭക്ഷണം",
    partOfSpeech: "noun",
    definition: "ആഹാരം, ഉണ്ണുന്ന സാധനങ്ങൾ (Nutritious substance eaten to maintain life)",
    example: "The food is ready -> ഭക്ഷണം തയ്യാറാണ്.",
    source: "Olam Datuk"
  },
  {
    id: "dict_8",
    word: "travel",
    malayalam: "യാത്ര",
    partOfSpeech: "noun / verb",
    definition: "ദേശാടനം, ഒരു സ്ഥലത്തുനിന്ന് മറ്റൊരു സ്ഥലത്തേക്കുള്ള പോക്ക് (Journey, trip)",
    example: "I love to travel -> എനിക്ക് യാത്ര ചെയ്യാൻ ഇഷ്ടമാണ്.",
    source: "Olam Ekkurup"
  },
  {
    id: "dict_9",
    word: "tea",
    malayalam: "ചായ",
    partOfSpeech: "noun",
    definition: "തേയില കൊണ്ട് തയ്യാറാക്കുന്ന ചൂടുള്ള പാനീയം (A hot beverage made with tea leaves)",
    example: "A cup of hot tea -> ഒരു കപ്പ് ചൂടു ചായ.",
    source: "Olam Datuk"
  },
  {
    id: "dict_10",
    word: "dream",
    malayalam: "സ്വപ്നം",
    partOfSpeech: "noun",
    definition: "ഉറക്കത്തിൽ കാണുന്ന കാര്യങ്ങൾ, ആശയം (Vision/thoughts during sleep, aspiration)",
    example: "Follow your dreams -> നിങ്ങളുടെ സ്വപ്നങ്ങളെ പിന്തുടരുക.",
    source: "Olam Ekkurup"
  },
  {
    id: "dict_11",
    word: "mother",
    malayalam: "അമ്മ",
    partOfSpeech: "noun",
    definition: "ജനനി, മാതാവ് (A female parent)",
    example: "Mother's love is unconditional -> അമ്മയുടെ സ്നേഹം നിരുപാധികമാണ്.",
    source: "Olam Datuk"
  },
  {
    id: "dict_12",
    word: "friend",
    malayalam: "കൂട്ടുകാരൻ",
    partOfSpeech: "noun",
    definition: "സുഹൃത്ത്, സഖാവ് (A companion, associate)",
    example: "He is my best friend -> അവൻ എന്റെ ഏറ്റവും നല്ല കൂട്ടുകാരനാണ്.",
    source: "Olam Datuk"
  },
  {
    id: "dict_13",
    word: "nature",
    malayalam: "പ്രകൃതി",
    partOfSpeech: "noun",
    definition: "പരിസ്ഥിതി, സ്വാഭാവികമായ അവസ്ഥ (The physical world, ecosystem)",
    example: "Protect nature -> പ്രകൃതിയെ സംരക്ഷിക്കുക.",
    source: "Olam Datuk"
  },
  {
    id: "dict_14",
    word: "culture",
    malayalam: "സംസ്കാരം",
    partOfSpeech: "noun",
    definition: "ആചാരങ്ങൾ, ജീവിതരീതി, സഭ്യത (Customs, arts, social institutions of a nation)",
    example: "Kerala's rich culture -> കേരളത്തിന്റെ സമ്പന്നമായ സംസ്കാരം.",
    source: "Olam Datuk"
  },
  {
    id: "dict_15",
    word: "literature",
    malayalam: "സാഹിത്യം",
    partOfSpeech: "noun",
    definition: "എഴുത്തുവിദ്യ, കാവ്യസൃഷ്ടികൾ (Written works of superior artistic merit)",
    example: "Malayalam literature -> മലയാള സാഹിത്യം.",
    source: "Olam Datuk"
  },
  {
    id: "dict_16",
    word: "poetry",
    malayalam: "കവിത",
    partOfSpeech: "noun",
    definition: "പദ്യം, കാവ്യം (Literary work in which special intensity is given to expression)",
    example: "He writes poetry -> അവൻ കവിത എഴുതുന്നു.",
    source: "Olam Datuk"
  },
  {
    id: "dict_17",
    word: "language",
    malayalam: "ഭാഷ",
    partOfSpeech: "noun",
    definition: "സംസാരരീതി, ലിപി കൂട്ടങ്ങൾ (System of communication through speech/writing)",
    example: "Malayalam is a beautiful language -> മലയാളം ഒരു മനോഹരമായ ഭാഷയാണ്.",
    source: "Olam Datuk"
  },
  {
    id: "dict_18",
    word: "heart",
    malayalam: "ഹൃദയം",
    partOfSpeech: "noun",
    definition: "നെഞ്ച്, മനസ്സ്, രക്തചംക്രമണ അവയവം (The muscular organ pumping blood, locus of feelings)",
    example: "With all my heart -> എന്റെ പൂർണ്ണ ഹൃദയത്തോടെ.",
    source: "Olam Datuk"
  },
  {
    id: "dict_19",
    word: "life",
    malayalam: "ജീവിതം",
    partOfSpeech: "noun",
    definition: "ആയുസ്സ്, ജീവൻ, പ്രാണൻ (The condition that distinguishes organisms from inorganic matter)",
    example: "Life is a journey -> ജീവിതം ഒരു യാത്രയാണ്.",
    source: "Olam Datuk"
  },
  {
    id: "dict_20",
    word: "smile",
    malayalam: "ചിരി",
    partOfSpeech: "noun / verb",
    definition: "മന്ദഹാസം, സന്തോഷം പ്രകടിപ്പിക്കുക (Pleascent facial expression with mouth corners turned up)",
    example: "Her smile is warm -> അവളുടെ ചിരിക്ക് നല്ല ചൂടുണ്ട് / തെളിച്ചമുണ്ട്.",
    source: "Olam Datuk"
  },
  {
    id: "dict_21",
    word: "happy",
    malayalam: "സന്തോഷം",
    partOfSpeech: "adjective",
    definition: "ആനന്ദം നിറഞ്ഞ, തൃപ്തികരമായ (Feeling or showing pleasure)",
    example: "Be happy -> സന്തോഷമായിരിക്കൂ.",
    source: "Olam Datuk"
  },
  {
    id: "dict_22",
    word: "world",
    malayalam: "ലോകം",
    partOfSpeech: "noun",
    definition: "പ്രപഞ്ചം, ഭൂമി (The earth, together with all of its countries and peoples)",
    example: "A peaceful world -> സമാധാനമുള്ള ഒരു ലോകം.",
    source: "Olam Datuk"
  },
  {
    id: "dict_23",
    word: "sky",
    malayalam: "ആകാശം",
    partOfSpeech: "noun",
    definition: "ഗഗനം, അന്തരീക്ഷം (The region of the atmosphere visible from earth)",
    example: "Blue sky -> നീലാകാശം.",
    source: "Olam Datuk"
  },
  {
    id: "dict_24",
    word: "flower",
    malayalam: "പൂവ്",
    partOfSpeech: "noun",
    definition: "പുഷ്പം, കുസുമം (The seed-bearing part of a plant with colorful petals)",
    example: "The flower is blooming -> പൂവ് വിരിയുന്നു.",
    source: "Olam Datuk"
  },
  {
    id: "dict_25",
    word: "student",
    malayalam: "വിദ്യാർത്ഥി",
    partOfSpeech: "noun",
    definition: "പഠിക്കുന്നയാൾ, ശിഷ്യൻ (A person who is studying at a school or college)",
    example: "An active student -> സജീവനായ ഒരു വിദ്യാർത്ഥി.",
    source: "Olam Datuk"
  },
  {
    id: "dict_26",
    word: "ocean",
    malayalam: "കടൽ",
    partOfSpeech: "noun",
    definition: "സമുദ്രം, വൻകടൽ (A very large expanse of sea, in particular, each of the main areas of saline water)",
    example: "The ocean breeze is relaxing -> കടൽക്കാറ്റ് വളരെ ആശ്വാസകരമാണ്.",
    source: "Olam Datuk"
  },
  {
    id: "dict_27",
    word: "tree",
    malayalam: "മരം",
    partOfSpeech: "noun",
    definition: "വൃക്ഷം, വലിയ സസ്യം (A woody perennial plant, typically having a single stem or trunk)",
    example: "Plant trees to save the environment -> പരിസ്ഥിതി സംരക്ഷിക്കാൻ മരങ്ങൾ നട്ടുപിടിപ്പിക്കുക.",
    source: "Olam Datuk"
  },
  {
    id: "dict_28",
    word: "knowledge",
    malayalam: "അറിവ്",
    partOfSpeech: "noun",
    definition: "ജ്ഞാനം, വിദ്യാഭ്യാസം (Facts, information, and skills acquired through experience)",
    example: "Knowledge is power -> അറിവാണ് ശക്തി.",
    source: "Olam Ekkurup"
  },
  {
    id: "dict_29",
    word: "festival",
    malayalam: "ഉത്സവം",
    partOfSpeech: "noun",
    definition: "പെരുന്നാൾ, ആഘോഷവേള (A day or period of celebration, typically a religious one)",
    example: "Onam is the national festival of Kerala -> ഓണം കേരളത്തിന്റെ ദേശീയ ഉത്സവമാണ്.",
    source: "Olam Datuk"
  },
  {
    id: "dict_30",
    word: "music",
    malayalam: "സംഗീതം",
    partOfSpeech: "noun",
    definition: "നാദം, രാഗം, ഗാനങ്ങൾ (Vocal or instrumental sounds combined in such a way as to produce beauty of form)",
    example: "I love listening to music -> എനിക്ക് സംഗീതം കേൾക്കാൻ ഇഷ്ടമാണ്.",
    source: "Olam Datuk"
  }
];

// Default initial community captions dataset
const SEED_COMMUNITY_CAPTIONS: CommunityCaption[] = [
  {
    id: "c_1",
    text: "ഓരോ ചായക്കോപ്പയിലും ഒളിഞ്ഞിരിക്കുന്ന ഒരു കഥയുണ്ട്, നമ്മൾ കേൾക്കാൻ മറന്ന ചില സുന്ദര നിമിഷങ്ങൾ! ☕✨",
    hashtags: ["#chayavibes", "#malayalamquotes", "#eveningpeace"],
    author: "Arun K.",
    likes: 24,
    createdAt: "2026-07-18T14:32:00.000Z"
  },
  {
    id: "c_2",
    text: "മഴ നനഞ്ഞ വഴിയിലൂടെ ഒരു ബുള്ളറ്റ് യാത്ര... അതൊരു പ്രത്യേക സുഖമാണ്, മനസ്സിലെ എല്ലാ ഭാരങ്ങളും പെയ്തു തീരുന്ന പോലെ! 🌧️🏍️",
    hashtags: ["#rainride", "#bulletlovers", "#keralatourism"],
    author: "Anjali S.",
    likes: 42,
    createdAt: "2026-07-19T09:15:00.000Z"
  },
  {
    id: "c_3",
    text: "നാട്ടിൻപുറത്തെ ആ പഴയ ചങ്ങാതിക്കൂട്ടവും കളിചിരികളും ഓർക്കുമ്പോൾ ഇന്നും മനസ്സിൽ ഒരു നൊസ്റ്റാൾജിയ പെയ്യാറുണ്ട്. 📻🌾",
    hashtags: ["#nostalgia", "#childhoodmemories", "#keralagram"],
    author: "Ranjith Nair",
    likes: 19,
    createdAt: "2026-07-20T05:40:00.000Z"
  }
];

// Memory Stores
let dictionaryMemoryStore: DictionaryEntry[] = [...SEED_DICTIONARY];
let communityCaptionsMemoryStore: CommunityCaption[] = [...SEED_COMMUNITY_CAPTIONS];

// Paths to local JSON files (for local dev persistence)
const DICTIONARY_DB_PATH = path.join(process.cwd(), "src", "data", "dictionary_db.json");
const COMMUNITY_CAPTIONS_PATH = path.join(process.cwd(), "src", "data", "community_captions.json");

// Helper to safely load local JSON files if available
function loadLocalFiles() {
  try {
    if (fs.existsSync(DICTIONARY_DB_PATH)) {
      const data = fs.readFileSync(DICTIONARY_DB_PATH, "utf8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dictionaryMemoryStore = parsed;
      }
    }
  } catch (e) {
    // Graceful fallback to seed data
  }

  try {
    if (fs.existsSync(COMMUNITY_CAPTIONS_PATH)) {
      const data = fs.readFileSync(COMMUNITY_CAPTIONS_PATH, "utf8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        communityCaptionsMemoryStore = parsed;
      }
    }
  } catch (e) {
    // Graceful fallback to seed data
  }
}

// Initial load
loadLocalFiles();

// Helper to safely save local JSON files in non-serverless dev mode
function saveLocalFile(filePath: string, data: any): boolean {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (e) {
    // File system is read-only in Vercel serverless runtime. Gracefully ignore.
    return false;
  }
}

// --- Cloud Database Integration (Upstash Redis / Vercel KV REST) ---
const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function kvGet<T>(key: string): Promise<T | null> {
  if (!kvUrl || !kvToken) return null;
  try {
    const res = await fetch(`${kvUrl}/get/${key}`, {
      headers: { Authorization: `Bearer ${kvToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        return JSON.parse(data.result) as T;
      }
    }
  } catch (e) {
    console.error(`KV GET failed for ${key}:`, e);
  }
  return null;
}

async function kvSet(key: string, value: any): Promise<boolean> {
  if (!kvUrl || !kvToken) return false;
  try {
    const res = await fetch(`${kvUrl}/set/${key}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${kvToken}` },
      body: JSON.stringify(JSON.stringify(value))
    });
    return res.ok;
  } catch (e) {
    console.error(`KV SET failed for ${key}:`, e);
    return false;
  }
}

let olamDictionaryCache: Record<string, { w: string; pos: string; m: string[] }> | null = null;

function loadOlamDataset(): Record<string, { w: string; pos: string; m: string[] }> {
  if (olamDictionaryCache) return olamDictionaryCache;
  try {
    const jsonPath = path.join(process.cwd(), "src", "data", "olam_dictionary.json");
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, "utf-8");
      olamDictionaryCache = JSON.parse(raw);
    }
  } catch (err) {
    console.error("Failed to load Olam dictionary JSON:", err);
  }
  return olamDictionaryCache || {};
}

// --- UNIVERSAL DATABASE PUBLIC APIS ---

/**
 * Fetch dictionary entries matching a query string across local DB and Olam Open Data Set (192,309 definitions).
 */
export async function getDictionary(query: string = ""): Promise<{ results: DictionaryEntry[]; isAIUsed: boolean }> {
  let db = dictionaryMemoryStore;

  // Try fetching from Cloud KV if available
  const cloudDb = await kvGet<DictionaryEntry[]>("vamozhi_dictionary");
  if (cloudDb && Array.isArray(cloudDb) && cloudDb.length > 0) {
    db = cloudDb;
    dictionaryMemoryStore = cloudDb;
  }

  const q = query.trim().toLowerCase();
  if (!q) {
    return { results: db.slice(0, 15), isAIUsed: false };
  }

  // 1. Filter local / user-contributed seed dictionary
  const localMatches = db.filter((entry) => {
    const wordMatch = String(entry.word || "").toLowerCase().includes(q);
    const malMatch = String(entry.malayalam || "").includes(q);
    const defMatch = String(entry.definition || "").toLowerCase().includes(q);
    return wordMatch || malMatch || defMatch;
  });

  // 2. Search Olam Open Data Set (59,040 headwords, 192,309 definitions)
  const olamData = loadOlamDataset();
  const olamResults: DictionaryEntry[] = [];

  // Exact headword match ($O(1)$ fast lookup)
  if (olamData[q]) {
    const item = olamData[q];
    olamResults.push({
      id: `olam_exact_${q}`,
      word: item.w,
      malayalam: item.m[0],
      partOfSpeech: item.pos,
      definition: item.m.join(", "),
      example: `Usage: ${item.w} -> ${item.m[0]}`,
      source: "Olam Open Data (olam.in)"
    });
  }

  // Search through Olam keys for prefix or Malayalam contains
  const olamKeys = Object.keys(olamData);
  for (let i = 0; i < olamKeys.length; i++) {
    if (olamResults.length >= 40) break;
    const key = olamKeys[i];
    if (key === q) continue; // Already added exact match above

    const item = olamData[key];
    const keyMatch = key.includes(q);
    const malMatch = item.m.some((m) => m.includes(q));

    if (keyMatch || malMatch) {
      olamResults.push({
        id: `olam_${key}_${i}`,
        word: item.w,
        malayalam: item.m[0],
        partOfSpeech: item.pos,
        definition: item.m.join(", "),
        example: `Usage: ${item.w} -> ${item.m[0]}`,
        source: "Olam Open Data (olam.in)"
      });
    }
  }

  const combined = [...localMatches, ...olamResults];
  return { results: combined.slice(0, 50), isAIUsed: false };
}

/**
 * Save a new dictionary entry to database (Memory, Disk, and Cloud KV).
 */
export async function addDictionaryEntry(entry: Omit<DictionaryEntry, "id"> & { id?: string }): Promise<DictionaryEntry> {
  const newEntry: DictionaryEntry = {
    id: entry.id || `dict_user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    word: String(entry.word).trim(),
    malayalam: String(entry.malayalam).trim(),
    partOfSpeech: String(entry.partOfSpeech || "noun").trim().toLowerCase(),
    definition: String(entry.definition || "").trim(),
    example: String(entry.example || "").trim(),
    source: entry.source || "User Contributed"
  };

  // Update in-memory
  dictionaryMemoryStore = [...dictionaryMemoryStore, newEntry];

  // Try local file save (dev mode)
  saveLocalFile(DICTIONARY_DB_PATH, dictionaryMemoryStore);

  // Try Cloud KV sync if available
  await kvSet("vamozhi_dictionary", dictionaryMemoryStore);

  return newEntry;
}

/**
 * Fetch all community captions sorted by newest first.
 */
export async function getCommunityCaptions(): Promise<CommunityCaption[]> {
  let db = communityCaptionsMemoryStore;

  const cloudDb = await kvGet<CommunityCaption[]>("vamozhi_community_captions");
  if (cloudDb && Array.isArray(cloudDb) && cloudDb.length > 0) {
    db = cloudDb;
    communityCaptionsMemoryStore = cloudDb;
  }

  return [...db].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Add a new community caption.
 */
export async function addCommunityCaption(caption: { text: string; hashtags?: string[]; author?: string }): Promise<CommunityCaption> {
  const newCaption: CommunityCaption = {
    id: `c_user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    text: String(caption.text).trim(),
    hashtags: Array.isArray(caption.hashtags) ? caption.hashtags.map((h) => String(h).trim()) : [],
    author: String(caption.author || "Anonymous").trim(),
    likes: 0,
    createdAt: new Date().toISOString()
  };

  communityCaptionsMemoryStore = [newCaption, ...communityCaptionsMemoryStore];

  // Sync to disk in local dev
  saveLocalFile(COMMUNITY_CAPTIONS_PATH, communityCaptionsMemoryStore);

  // Sync to Cloud KV
  await kvSet("vamozhi_community_captions", communityCaptionsMemoryStore);

  return newCaption;
}

export interface StudentCertificate {
  certId: string;
  studentName: string;
  location: string;
  level: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  createdAt: string;
}

export interface DispatchOrder {
  certId: string;
  studentName: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  level: string;
  timestamp: string;
  recipientEmail: string;
  status: string;
}

let studentCertificatesStore: StudentCertificate[] = [];
let dispatchOrdersStore: DispatchOrder[] = [];

/**
 * Save or update student certificate record.
 */
export async function addStudentCertificate(cert: StudentCertificate): Promise<StudentCertificate> {
  const index = studentCertificatesStore.findIndex((c) => c.certId === cert.certId);
  if (index >= 0) {
    studentCertificatesStore[index] = cert;
  } else {
    studentCertificatesStore.unshift(cert);
  }

  await kvSet("vamozhi_student_certificates", studentCertificatesStore);
  return cert;
}

/**
 * Lookup student certificate by certId.
 */
export async function getStudentCertificate(certId: string): Promise<StudentCertificate | null> {
  const cloudDb = await kvGet<StudentCertificate[]>("vamozhi_student_certificates");
  if (cloudDb && Array.isArray(cloudDb)) {
    studentCertificatesStore = cloudDb;
  }

  const found = studentCertificatesStore.find((c) => c.certId.toUpperCase() === certId.toUpperCase());
  return found || null;
}

/**
 * Store physical dispatch order and address.
 */
export async function addDispatchOrder(order: DispatchOrder): Promise<DispatchOrder> {
  dispatchOrdersStore.unshift(order);
  await kvSet("vamozhi_dispatch_orders", dispatchOrdersStore);
  return order;
}

/**
 * Like a community caption by ID.
 */
export async function likeCommunityCaption(id: string): Promise<number | null> {
  const index = communityCaptionsMemoryStore.findIndex((c) => c.id === id);
  if (index === -1) return null;

  communityCaptionsMemoryStore[index].likes = (communityCaptionsMemoryStore[index].likes || 0) + 1;
  const newLikes = communityCaptionsMemoryStore[index].likes;

  // Sync to disk in local dev
  saveLocalFile(COMMUNITY_CAPTIONS_PATH, communityCaptionsMemoryStore);

  // Sync to Cloud KV
  await kvSet("vamozhi_community_captions", communityCaptionsMemoryStore);

  return newLikes;
}
