/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Comprehensive phonetic dictionary of common Manglish words to Malayalam
export const TRANSLIT_DICTIONARY: Record<string, string> = {
  "njan": "ഞാൻ",
  "njaan": "ഞാൻ",
  "malayaliyanu": "മലയാളിയാണ്",
  "malayali": "മലയാളി",
  "ente": "എന്റെ",
  "keralam": "കേരളം",
  "sukhamano": "സുഖമാണോ",
  "sukhamanoo": "സുഖമാണോ",
  "ninne": "നിന്നെ",
  "ishtamanu": "ഇഷ്ടമാണ്",
  "ishttamanu": "ഇഷ്ടമാണ്",
  "ishttamaanu": "ഇഷ്ടമാണ്",
  "ellavarkkum": "എല്ലാവർക്കും",
  "ellavarkum": "എല്ലാവർക്കും",
  "swagatham": "സ്വാഗതം",
  "chankoottukar": "ചങ്കൂറ്റുകാർ",
  "chank": "ചങ്ക്",
  "chankbuddies": "ചങ്ക് ബഡ്ഡീസ്",
  "chankukal": "ചങ്കുകൾ",
  "pranayam": "പ്രണയം",
  "vibe": "വൈബ്",
  "vibes": "വൈബ്സ്",
  "muthu": "മുത്ത്",
  "muthe": "മുത്തേ",
  "chaya": "ചായ",
  "mazha": "മഴ",
  "sneham": "സ്നേഹം",
  "jeevitham": "ജീവിതം",
  "nanni": "നന്ദി",
  "santhosham": "സന്തോഷം",
  "swantham": "സ്വന്തം",
  "ponnu": "പൊന്ന്",
  "kalyanam": "കല്യാണം",
  "pacha": "പച്ച",
  "oru": "ഒരു",
  "naale": "നാളെ",
  "daivame": "ദൈവമേ",
  "chirikkuka": "ചിരിക്കുക",
  "hridayam": "ഹൃദയം",
  "lokam": "ലോകം",
  "vaakkukal": "വാക്കുകൾ",
  "vakkukal": "വാക്കുകൾ",
  "ormakal": "ഓർമ്മകൾ",
  "yathrakal": "യാത്രകൾ",
  "naadan": "നാടൻ",
  "pala": "പല",
  "kazhiyilla": "കഴിയില്ല",
  "muttathe": "മുറ്റത്തെ",
  "vazhikal": "വഴികൾ",
  "chiri": "ചിരി",
  "koode": "കൂടെ",
  "sundari": "സുന്ദരി",
  "penne": "പെണ്ണേ",
  "bharya": "ഭാര്യ",
  "sadya": "സദ്യ",
  "kootare": "കൂട്ടരെ",
  "nammal": "നമ്മൾ",
  "vijayam": "വിജയം",
  "porali": "പോരാളി",
  "kadhayallithu": "കഥയല്ലിത്",
  "valiya": "വലിയ",
  "vattukal": "വട്ടുകൾ",
  "namaskaram": "നമസ്കാരം",
  "pookkal": "പൂക്കൾ",
  "veezhumpol": "വീഴുമ്പോൾ",
  "jayikkumpol": "ജയിക്കുമ്പോൾ",
  "kannu": "കണ്ണു",
  "thallippokunnu": "തള്ളിപ്പോകുന്നു",
  "aalkkar": "ആളുകൾ",
  "kazhinje": "കഴിഞ്ഞേ",
  "kasavu": "കസവ്",
  "saree": "സാരി",
  "mullappoo": "മുല്ലപ്പൂ",
  "koottukaar": "കൂട്ടുകാർ",
  "chankinte": "ചങ്കിന്റെ",
  "kaattilum": "കാട്ടിലും",
  "medilum": "മേട്ടിലും",
  "vazhi": "വഴി",
  "thetti": "തെറ്റി",
  "nadakkunnathil": "നടക്കുന്നതിൽ",
  "idukki": "ഇടുക്കി",
  "wayanad": "വയനാട്",
  "munnar": "മൂന്നാർ",
  "kochi": "കൊച്ചി",
  "kasthurimanjal": "കസ്തൂരിമഞ്ഞൾ",
  "anugraham": "അനുഗ്രഹം",
  "ambalam": "അമ്പലം",
  "vandi": "വണ്ടി",
  "bullet": "ബുള്ളറ്റ്",
  "mothiram": "മോതിരം",
  "ponne": "പൊന്നേ",
  "kanmani": "കണ്മണി",
  "njaanulla": "ഞാനുള്ള",
  "njanulla": "ഞാനുള്ള",
  "jeevan": "ജീവൻ",
  "marakkalle": "മറക്കല്ലേ",
  "marakaruthe": "മറക്കരുതേ",
  "ishttam": "ഇഷ്ടം",
  "ishtm": "ഇഷ്ടം",
  "snehame": "സ്നേഹമേ",
  "karuth": "കരുത്ത്",
  "thalarathe": "തളരാതെ",
  "poradu": "പോരാടൂ"
};

// Word suggestions list based on typing prefix
export function getSuggestions(prefix: string): string[] {
  const clean = prefix.toLowerCase().trim();
  if (!clean) return [];
  
  const matches: string[] = [];
  
  // Exact or prefix matches in dictionary
  for (const [key, val] of Object.entries(TRANSLIT_DICTIONARY)) {
    if (key.startsWith(clean)) {
      matches.push(val);
    }
  }
  
  // Also push the rules-based translit result as a suggestion
  const parsed = transliterateWord(clean);
  if (parsed && !matches.includes(parsed)) {
    matches.push(parsed);
  }
  
  return Array.from(new Set(matches)).slice(0, 5);
}

// Convert a single word to Malayalam using rules-based mapping
export function transliterateWord(word: string): string {
  const clean = word.toLowerCase().trim();
  if (!clean) return "";
  
  // Check dictionary first
  if (TRANSLIT_DICTIONARY[clean]) {
    return TRANSLIT_DICTIONARY[clean];
  }
  
  // Fallback to rules-based transliterater
  let result = "";
  let i = 0;
  
  const rules = [
    // Complex combinations / double characters
    { pattern: /^njaan/, replacement: "ഞാൻ" },
    { pattern: /^njan/, replacement: "ഞാൻ" },
    { pattern: /^nte/, replacement: "ന്റെ" },
    { pattern: /^ng/, replacement: "ങ" },
    { pattern: /^nj/, replacement: "ഞ" },
    { pattern: /^zh/, replacement: "ഴ" },
    { pattern: /^th/, replacement: "ത" },
    { pattern: /^kh/, replacement: "ഖ" },
    { pattern: /^gh/, replacement: "ഘ" },
    { pattern: /^ch/, replacement: "ച" },
    { pattern: /^jh/, replacement: "ഝ" },
    { pattern: /^ph/, replacement: "ഫ" },
    { pattern: /^bh/, replacement: "ഭ" },
    { pattern: /^sh/, replacement: "ശ" },
    
    // Chillu letters at the end
    { pattern: /n$/, replacement: "ൻ" },
    { pattern: /r$/, replacement: "ർ" },
    { pattern: /l$/, replacement: "ൽ" },
    { pattern: /L$/, replacement: "ൾ" },
    { pattern: /N$/, replacement: "ൺ" },
    
    // Standard consonants
    { pattern: /^k/, replacement: "ക" },
    { pattern: /^g/, replacement: "ഗ" },
    { pattern: /^j/, replacement: "ജ" },
    { pattern: /^t/, replacement: "റ്റ" },
    { pattern: /^d/, replacement: "ദ" },
    { pattern: /^n/, replacement: "ന" },
    { pattern: /^p/, replacement: "പ" },
    { pattern: /^f/, replacement: "ഫ" },
    { pattern: /^b/, replacement: "ബ" },
    { pattern: /^m/, replacement: "മ" },
    { pattern: /^y/, replacement: "യ" },
    { pattern: /^r/, replacement: "ര" },
    { pattern: /^l/, replacement: "ല" },
    { pattern: /^v/, replacement: "വ" },
    { pattern: /^w/, replacement: "വ" },
    { pattern: /^s/, replacement: "സ" },
    { pattern: /^h/, replacement: "ഹ" },
    { pattern: /^L/, replacement: "ള" },
    { pattern: /^R/, replacement: "റ" },
    
    // Vowels
    { pattern: /^aa|^A/, replacement: "ആ" },
    { pattern: /^a/, replacement: "അ" },
    { pattern: /^ii|^ee/, replacement: "ഈ" },
    { pattern: /^i/, replacement: "ഇ" },
    { pattern: /^uu|^oo/, replacement: "ഊ" },
    { pattern: /^u/, replacement: "ഉ" },
    { pattern: /^ee|^E/, replacement: "ഏ" },
    { pattern: /^e/, replacement: "എ" },
    { pattern: /^ai/, replacement: "ഐ" },
    { pattern: /^oo|^O/, replacement: "ഓ" },
    { pattern: /^o/, replacement: "ഒ" },
    { pattern: /^au/, replacement: "ഔ" }
  ];

  let temp = clean;
  while (temp.length > 0) {
    let matched = false;
    for (const rule of rules) {
      const match = temp.match(rule.pattern);
      if (match) {
        // Find if this is a swarachinnam (vowel sign)
        let replacement = rule.replacement;
        
        // If we already have a consonant and we are adding a vowel, convert vowel to vowel sign
        if (result.length > 0) {
          const lastChar = result.charCodeAt(result.length - 1);
          const isConsonant = lastChar >= 0x0D15 && lastChar <= 0x0D39 || lastChar === 0x0D3A || lastChar === 0x0D31;
          if (isConsonant) {
            if (rule.replacement === "ആ") replacement = "ാ";
            else if (rule.replacement === "ഇ") replacement = "ി";
            else if (rule.replacement === "ഈ") replacement = "ീ";
            else if (rule.replacement === "ഉ") replacement = "ു";
            else if (rule.replacement === "ഊ") replacement = "ൂ";
            else if (rule.replacement === "എ") replacement = "െ";
            else if (rule.replacement === "ഏ") replacement = "േ";
            else if (rule.replacement === "ഒ") replacement = "ൊ";
            else if (rule.replacement === "ഓ") replacement = "ോ";
            else if (rule.replacement === "ഐ") replacement = "ൈ";
            else if (rule.replacement === "ഔ") replacement = "ൌ";
            else if (rule.replacement === "അ") replacement = ""; // inherent vowel
          }
        }
        
        result += replacement;
        temp = temp.substring(match[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Keep punctuation or unknown chars
      result += temp[0];
      temp = temp.substring(1);
    }
  }

  return result;
}

// Convert a full sentence/paragraph of Manglish into Malayalam
export function transliterateSentence(text: string): string {
  if (!text) return "";
  
  // Retain formatting, spaces, and lines
  const lines = text.split("\n");
  const processedLines = lines.map(line => {
    // Split by words while keeping delimiters (spaces, punctuation)
    const wordsAndDelimiters = line.split(/(\s+|[,.!?;:()"+])/);
    return wordsAndDelimiters.map(part => {
      // If it's a word (letters only), transliterate it
      if (/^[a-zA-Z]+$/.test(part)) {
        return transliterateWord(part);
      }
      // Otherwise keep as is (spaces, numbers, emojis, punctuation)
      return part;
    }).join("");
  });
  
  return processedLines.join("\n");
}
