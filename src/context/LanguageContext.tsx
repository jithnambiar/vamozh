/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ml";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    home: "Home",
    malayalamTyping: "Malayalam Typing",
    about: "About",
    contact: "Contact",
    findWritingTool: "Find a writing tool...",
    suggestedTools: "Suggested Tools",
    savedItems: "Saved Items",
    launchMainGenerator: "Launch Main Generator",
    searchTools: "Search tools...",
    savedTitle: "Saved Captions & Bios",
    savedSubtitle: "Your curated list of favourites.",
    clearAll: "Clear All",
    copyAll: "Copy All",
    noSavedItems: "No saved items yet.",
    savedPlaceholder: "Tap the heart icon on any generated caption, bio, or hook to access them quickly here.",

    // Hero
    heroBadge: "100% Free & Fast",
    heroTitleFirst: "Malayalam Caption",
    heroTitleSecond: "& Bio Generator",
    heroTagline: "Your Vibe. Your Words.",
    heroSubtitle: "Instantly generate handwritten, original Malayalam and Manglish captions, bios, Reel hooks, and hashtags for love, attitude, travel, friendship, and weddings. No boring AI slop.",
    btnFindPerfect: "Find My Perfect Caption",
    btnTryTransliteration: "Try Transliteration",
    featureHandwritten: "Handwritten Originals",
    featureNoAI: "No Boring AI Slop",

    // Quick Tools
    quickTools: "Quick Tools:",
    tool_instagram: "Instagram Caption",
    tool_facebook: "Facebook Post",
    tool_whatsapp: "WhatsApp Status",
    tool_snapchat: "Snapchat Caption",
    tool_tiktok: "TikTok Caption",
    tool_reel: "Reel Hook",
    tool_typing: "Manglish Typing",

    // Generator Steps
    step1: "1. Choose Your Writing Tool",
    step2: "2. Customize Your Vibe & Topic",
    step3: "3. Script & Language",
    step4: "Choose Category",
    step5: "Customize Emoji Settings",
    step6: "Add Keywords (Optional)",
    step7: "Generate perfect caption",
    step8: "Generate Captions",
    generating: "Generating magic...",

    // Tool Labels / Radio options
    caption: "Photo Caption 📸",
    bio: "Profile Bio 👤",
    hook: "Reel Hook 🎯",
    hashtagSet: "Hashtags set 🏷️",

    // Generator inputs
    chooseCategory: "Choose vibe category:",
    describeMood: "Describe your photo/mood in English (e.g. tea, rain, highway):",
    emojiDensity: "Emoji density:",
    noEmoji: "None ❌",
    someEmoji: "Sparse (1-2) ⚡",
    denseEmoji: "Dense (Lots!) 🔥",
    scriptLang: "Select Language / Script:",
    countToGenerate: "Number of captions to generate:",
    optionalKeywordPlaceholder: "e.g. chai, monsoons, bullet, retro...",

    // Categories
    cat_love: "Love 💖",
    cat_attitude: "Attitude 😎",
    cat_travel: "Travel ✈️",
    cat_friendship: "Friendship 👬",
    cat_wedding: "Wedding 💍",
    cat_selflove: "Self-Love 🌸",
    cat_motivation: "Motivation 🎯",
    cat_aesthetic: "Aesthetic 🍂",
    cat_funny: "Funny 🤪",
    cat_kerala: "Kerala 🌴",
    cat_photography: "Photography 📸",
    cat_business: "Business 💼",

    // Results Header
    resultsHeader: "Click below to copy your perfect caption or bio.",

    // Trending Section
    trendingNow: "Trending Now",
    trendingDesc: "Most popular categories used this week.",
    exploreCategories: "Explore all categories:",

    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about Vamozhi's caption generator.",

    // Toast Messages
    copied: "Copied to clipboard! 📋",
    addedFav: "Caption added to Saved list! ❤️",
    removedFav: "Removed caption from Saved list",
    clearedAll: "Cleared all saved captions",
  },
  ml: {
    // Navbar
    home: "ഹോം",
    malayalamTyping: "മലയാളം ടൈപ്പിംഗ്",
    about: "ഞങ്ങളെക്കുറിച്ച്",
    contact: "ബന്ധപ്പെടുക",
    findWritingTool: "റൈറ്റിംഗ് ടൂൾ തിരയുക...",
    suggestedTools: "നിർദ്ദേശിച്ച ടൂളുകൾ",
    savedItems: "സേവ് ചെയ്തവ",
    launchMainGenerator: "ജനറേറ്റർ തുറക്കുക",
    searchTools: "ടൂളുകൾ തിരയുക...",
    savedTitle: "സേവ് ചെയ്ത ക്യാപ്ഷനുകൾ",
    savedSubtitle: "നിങ്ങൾക്ക് പ്രിയപ്പെട്ടവയുടെ ലിസ്റ്റ്.",
    clearAll: "എല്ലാം ഒഴിവാക്കുക",
    copyAll: "എല്ലാം കോപ്പി ചെയ്യുക",
    noSavedItems: "സേവ് ചെയ്തവ ഒന്നും ഇല്ല.",
    savedPlaceholder: "നിങ്ങൾക്കിഷ്ടപ്പെട്ട ക്യാപ്ഷനുകളുടെയും ബയോകളുടെയും ഹൃദയ ചിഹ്നത്തിൽ ക്ലിക്ക് ചെയ്താൽ അവ ഇവിടെ കാണാം.",

    // Hero
    heroBadge: "100% സൗജന്യവും വേഗതയേറിയതും",
    heroTitleFirst: "മലയാളം ക്യാപ്ഷൻ",
    heroTitleSecond: "& ബയോ ജനറേറ്റർ",
    heroTagline: "നിങ്ങളുടെ വൈബ്. നിങ്ങളുടെ വാക്കുകൾ.",
    heroSubtitle: "ഇൻസ്റ്റാഗ്രാം, ഫേസ്ബുക്ക്, വാട്സാപ്പ് എന്നിവയ്ക്കായി മികച്ച മലയാളം, മാംഗ്ലീഷ് ക്യാപ്ഷനുകൾ, ബയോകൾ, റീൽ ഹൂക്കുകൾ, ഹാഷ്‌ടാഗുകൾ എന്നിവ ഇവിടെ കണ്ടെത്തൂ. യാതൊരു ബോറടിയും ഇല്ലാത്ത മികച്ച വരികൾ.",
    btnFindPerfect: "ക്യാപ്ഷൻ കണ്ടെത്തുക",
    btnTryTransliteration: "ടൈപ്പിംഗ് പരീക്ഷിക്കൂ",
    featureHandwritten: "കൈയെഴുത്തു വരികൾ",
    featureNoAI: "ബോറടിപ്പിക്കുന്ന AI കോപ്പികളല്ല",

    // Quick Tools
    quickTools: "ദ്രുത ടൂളുകൾ:",
    tool_instagram: "ഇൻസ്റ്റാഗ്രാം ക്യാപ്ഷൻ",
    tool_facebook: "ഫേസ്ബുക്ക് പോസ്റ്റ്",
    tool_whatsapp: "വാട്സാപ്പ് സ്റ്റാറ്റസ്",
    tool_snapchat: "സ്നാപ്ചാറ്റ് ക്യാപ്ഷൻ",
    tool_tiktok: "ടിക് ടോക്ക് ക്യാപ്ഷൻ",
    tool_reel: "റീൽ ഹൂക്ക്",
    tool_typing: "മാംഗ്ലീഷ് ടൈപ്പിംഗ്",

    // Generator Steps
    step1: "1. റൈറ്റിംഗ് ടൂൾ തിരഞ്ഞെടുക്കുക",
    step2: "2. നിങ്ങളുടെ വൈബും വിഷയവും ക്രമീകരിക്കുക",
    step3: "3. ലിപിയും ഭാഷയും",
    step4: "വിഭാഗം തിരഞ്ഞെടുക്കുക",
    step5: "ഇമോജി അളവ് ക്രമീകരിക്കുക",
    step6: "കീവേഡുകൾ ചേർക്കുക (ഓപ്ഷണൽ)",
    step7: "ക്യാപ്ഷൻ തയ്യാറാക്കുക",
    step8: "ജനറേറ്റ് ചെയ്യുക",
    generating: "തിരയുന്നു...",

    // Tool Labels / Radio options
    caption: "ഫോട്ടോ ക്യാപ്ഷൻ 📸",
    bio: "പ്രൊഫൈൽ ബയോ 👤",
    hook: "റീൽ ഹൂക്ക് 🎯",
    hashtagSet: "ഹാഷ്‌ടാഗുകൾ 🏷️",

    // Generator inputs
    chooseCategory: "വൈബ് വിഭാഗം തിരഞ്ഞെടുക്കുക:",
    describeMood: "ഫോട്ടോയെക്കുറിച്ചോ നിങ്ങളുടെ മൂഡിനെക്കുറിച്ചോ ടൈപ്പ് ചെയ്യുക (ഉദാഹരണത്തിന്: tea, rain, highway):",
    emojiDensity: "ഇമോജി അളവ്:",
    noEmoji: "വേണ്ട ❌",
    someEmoji: "കുറച്ചു മതി (1-2) ⚡",
    denseEmoji: "ധാരാളം വേണം 🔥",
    scriptLang: "ഭാഷ / ലിപി തിരഞ്ഞെടുക്കുക:",
    countToGenerate: "ആവശ്യമായ ക്യാപ്ഷനുകളുടെ എണ്ണം:",
    optionalKeywordPlaceholder: "ഉദാഹരണത്തിന്: chai, monsoons, bullet, retro...",

    // Categories
    cat_love: "പ്രണയം 💖",
    cat_attitude: "ആറ്റിറ്റ്യൂഡ് 😎",
    cat_travel: "യാത്രകൾ ✈️",
    cat_friendship: "സൗഹൃദം 👬",
    cat_wedding: "കല്യാണം 💍",
    cat_selflove: "സ്വയം സ്നേഹം 🌸",
    cat_motivation: "പ്രചോദനം 🎯",
    cat_aesthetic: "ആസ്വാദനം 🍂",
    cat_funny: "തമാശ 🤪",
    cat_kerala: "കേരളം 🌴",
    cat_photography: "ഫോട്ടോഗ്രഫി 📸",
    cat_business: "ബിസിനസ്സ് 💼",

    // Results Header
    resultsHeader: "നിങ്ങളുടെ പ്രിയപ്പെട്ട ക്യാപ്ഷൻ കോപ്പി ചെയ്യാൻ അതിൽ ക്ലിക്ക് ചെയ്യുക.",

    // Trending Section
    trendingNow: "ഇപ്പോൾ ട്രെൻഡിംഗ് ആയവ",
    trendingDesc: "ഈ ആഴ്ചയിലെ ഏറ്റവും ജനപ്രിയമായ വിഭാഗങ്ങൾ.",
    exploreCategories: "എല്ലാ വിഭാഗങ്ങളും കാണുക:",

    // FAQ Section
    faqTitle: "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ",
    faqSubtitle: "വമൊഴിയെക്കുറിച്ച് കൂടുതലറിയാൻ താഴെ വായിക്കുക.",

    // Toast Messages
    copied: "കോപ്പി ചെയ്തു! 📋",
    addedFav: "ക്യാപ്ഷൻ സേവ് ലിസ്റ്റിലേക്ക് മാറ്റി! ❤️",
    removedFav: "സേവ് ലിസ്റ്റിൽ നിന്ന് ഒഴിവാക്കി",
    clearedAll: "സേവ് ചെയ്ത എല്ലാം ഒഴിവാക്കി",
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("vamozhi_ui_language");
      if (stored === "ml" || stored === "en") return stored;
    } catch {
      // Ignore
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("vamozhi_ui_language", lang);
    } catch {
      // Ignore
    }
  };

  const t = (key: string): string => {
    const translationSet = translations[language];
    return translationSet[key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
