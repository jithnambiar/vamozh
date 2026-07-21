/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExamQuestion {
  id: number;
  level: "beginner" | "expert" | "master";
  category?: "script" | "vocabulary" | "proverb" | "history_gk" | "grammar";
  question: string;
  questionMl?: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const EXAM_QUESTION_POOL: ExamQuestion[] = [
  // ==========================================
  // BEGINNER LEVEL QUESTIONS (Clean Options)
  // ==========================================
  {
    id: 1,
    level: "beginner",
    category: "script",
    question: "What is the first vowel (സ്വര അക്ഷരം) of the Malayalam alphabet?",
    questionMl: "മലയാള അക്ഷരമാലയിലെ ആദ്യത്തെ സ്വരാക്ഷരം ഏതാണ്?",
    options: ["ആ", "അ", "ഇ", "ഉ"],
    correct: 1,
    explanation: "'അ' is the foundational first vowel (Swaram) of Malayalam script."
  },
  {
    id: 2,
    level: "beginner",
    category: "vocabulary",
    question: "What is the correct English translation for the Malayalam word 'അമ്മ'?",
    questionMl: "'അമ്മ' എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
    options: ["Father", "Sister", "Mother", "Teacher"],
    correct: 2,
    explanation: "'അമ്മ' translates to Mother in English."
  },
  {
    id: 3,
    level: "beginner",
    category: "vocabulary",
    question: "How do you politely ask 'How are you?' in Malayalam?",
    questionMl: "സുഖവിവരം തിരക്കാൻ മലയാളത്തിൽ എന്തുപറയും?",
    options: ["സുഖമാണോ?", "പേരെന്താണ്?", "എവിടെ പോണു?", "പോയി വരാം"],
    correct: 0,
    explanation: "'സുഖമാണോ?' is the standard polite inquiry for well-being."
  },
  {
    id: 4,
    level: "beginner",
    category: "script",
    question: "Which Malayalam numeral represents the number '5'?",
    questionMl: "'5' എന്ന സംഖ്യയെ സൂചിപ്പിക്കുന്ന മലയാള അക്കം ഏതാണ്?",
    options: ["൩", "൪", "൫", "൬"],
    correct: 2,
    explanation: "൫ represents 5 in traditional Malayalam numeral script."
  },
  {
    id: 5,
    level: "beginner",
    category: "vocabulary",
    question: "What is the literal meaning of 'നന്ദി'?",
    questionMl: "'നന്ദി' എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
    options: ["Welcome", "Sorry", "Thank You", "Goodbye"],
    correct: 2,
    explanation: "'നന്ദി' means Thank You or Gratitude."
  },
  {
    id: 6,
    level: "beginner",
    category: "vocabulary",
    question: "What is 'ചായ' in Kerala food culture?",
    questionMl: "കേരളീയർക്ക് ഏതാണ് 'ചായ'?",
    options: ["Coconut Water", "Porridge", "Milk Tea", "Coffee"],
    correct: 2,
    explanation: "'ചായ' refers to hot milk tea."
  },
  {
    id: 7,
    level: "beginner",
    category: "script",
    question: "Which letter belongs to the vowel (സ്വരം) category?",
    questionMl: "താഴെ പറയുന്നവയിൽ സ്വരാക്ഷരം ഏതാണ്?",
    options: ["ക", "മ", "ഈ", "റ"],
    correct: 2,
    explanation: "'ഈ' is a vowel (Swaram)."
  },
  {
    id: 8,
    level: "beginner",
    category: "vocabulary",
    question: "How do you say 'Goodbye' or 'See you again' in Malayalam?",
    questionMl: "യാത്രപറഞ്ഞു പിരിയുമ്പോൾ മലയാളത്തിൽ എന്തുപറയും?",
    options: ["പോയി വരാം", "നമസ്കാരം", "വെള്ളം തരു", "എത്ര രൂപയായി?"],
    correct: 0,
    explanation: "'പോയി വരാം' literally translates to 'I will go and return'."
  },
  {
    id: 9,
    level: "beginner",
    category: "vocabulary",
    question: "What is the Malayalam word for 'Water'?",
    questionMl: "'വെള്ളം' അല്ലെങ്കിൽ 'ജലം' എന്നാൽ എന്താണ്?",
    options: ["Milk", "Tea", "Water", "Juice"],
    correct: 2,
    explanation: "'വെള്ളം' or 'ജലം' means Water."
  },
  {
    id: 10,
    level: "beginner",
    category: "vocabulary",
    question: "What is the Malayalam word for 'House' or 'Home'?",
    questionMl: "'വീട്' എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
    options: ["School", "Home / House", "Market", "Garden"],
    correct: 1,
    explanation: "'വീട്' means Home or House."
  },

  // ==========================================
  // EXPERT LEVEL QUESTIONS (Script & Proverbs)
  // ==========================================
  {
    id: 20,
    level: "expert",
    category: "history_gk",
    question: "Who is revered as the Father of Malayalam Literature?",
    questionMl: "മലയാളഭാഷയുടെ പിതാവ് എന്നറിയപ്പെടുന്നത് ആര്?",
    options: ["Kumaran Asan", "Thunchaththu Ramanujan Ezhuthachan", "Vallathol Narayana Menon", "Ulloor S. Parameswara Iyer"],
    correct: 1,
    explanation: "Thunchaththu Ezhuthachan standardized the Grantha-based 56-letter Malayalam script."
  },
  {
    id: 21,
    level: "expert",
    category: "proverb",
    question: "What does the proverb 'മിന്നുന്നതെല്ലാം പൊന്നല്ല' mean?",
    questionMl: "'മിന്നുന്നതെല്ലാം പൊന്നല്ല' എന്ന പഴഞ്ചൊല്ലിന്റെ അർത്ഥം എന്താണ്?",
    options: ["Gold is rare", "All that glitters is not gold", "Always wear gold", "Rain brings gold"],
    correct: 1,
    explanation: "It cautions against superficial judgments."
  },
  {
    id: 22,
    level: "expert",
    category: "script",
    question: "How many pure Chillu letters (ചില്ലുകൾ) are recognized in standard Malayalam?",
    questionMl: "മലയാളത്തിൽ പ്രധാനമായും എത്ര ചില്ലക്ഷരങ്ങളാണ് ഉള്ളത്?",
    options: ["3", "5", "7", "12"],
    correct: 2,
    explanation: "Standard Malayalam features 7 Chillu letters (ൺ, ൻ, ർ, ൽ, ൾ, ൿ, ൔ)."
  },
  {
    id: 23,
    level: "expert",
    category: "script",
    question: "Which varga category does the consonant 'ക' belong to?",
    questionMl: "'ക' എന്ന അക്ഷരം ഏത് വർഗ്ഗത്തിൽ പെടുന്നു?",
    options: ["ക-വർഗ്ഗം (Guttural)", "ച-വർഗ്ഗം (Palatal)", "ത-വർഗ്ഗം (Dental)", "പ-വർഗ്ഗം (Labial)"],
    correct: 0,
    explanation: "'ക' is the lead guttural letter of Ka-Vargam."
  },
  {
    id: 24,
    level: "expert",
    category: "vocabulary",
    question: "What is the meaning of the travel phrase 'ബസ് സ്റ്റാൻഡ് എവിടെയാണ്?'?",
    questionMl: "'ബസ് സ്റ്റാൻഡ് എവിടെയാണ്?' എന്ന ചോദ്യത്തിന്റെ അർത്ഥം എന്താണ്?",
    options: ["When is the bus arriving?", "Where is the bus stand?", "Is this the bus stand?", "How much is the bus ticket?"],
    correct: 1,
    explanation: "'Evideyanu' translates to 'Where is'."
  },
  {
    id: 25,
    level: "expert",
    category: "history_gk",
    question: "In which year was Malayalam officially declared a Classical Language of India?",
    questionMl: "ഏത് വർഷത്തിലാണ് മലയാളത്തിന് കേന്ദ്ര സർക്കാർ ശ്രേഷ്ഠഭാഷാ പദവി നൽകിയത്?",
    options: ["2005", "2010", "2013", "2018"],
    correct: 2,
    explanation: "Malayalam was declared a Classical Language of India in 2013."
  },

  // ==========================================
  // 25 HISTORY & MALAYALAM GENERAL KNOWLEDGE (GK) QUESTIONS
  // ==========================================
  {
    id: 50,
    level: "expert",
    category: "history_gk",
    question: "When was the state of Kerala officially formed?",
    questionMl: "ഐക്യ കേരള സംസ്ഥാനം നിലവിൽ വന്നത് എന്ന്?",
    options: ["August 15, 1947", "January 26, 1950", "November 1, 1956", "October 2, 1960"],
    correct: 2,
    explanation: "Kerala state was formed on November 1, 1956 (celebrated as Kerala Piravi)."
  },
  {
    id: 51,
    level: "expert",
    category: "history_gk",
    question: "Which famous Malayalam poet and social reformer coined the slogan 'ഒരു ജാതി ഒരു മതം ഒരു ദൈവം മനുഷ്യന്'?",
    questionMl: "'ഒരു ജാതി ഒരു മതം ഒരു ദൈവം മനുഷ്യന്' എന്ന മഹദ്‌വചനം ആരുടേതാണ്?",
    options: ["Chattampi Swamikal", "Sree Narayana Guru", "Ayyankali", "Vaikunda Swamikal"],
    correct: 1,
    explanation: "Sree Narayana Guru proclaimed this universal message of brotherhood."
  },
  {
    id: 52,
    level: "expert",
    category: "history_gk",
    question: "Who was the first author to win the prestigious Jnanpith Award for Malayalam literature (1965)?",
    questionMl: "മലയാളത്തിൽ ആദ്യമായി ജ്ഞാനപീഠ പുരസ്കാരം നേടിയ സാഹിത്യകാരൻ ആര്?",
    options: ["Thakazhi Sivasankara Pillai", "G. Sankara Kurup", "SK Pottekkatt", "MT Vasudevan Nair"],
    correct: 1,
    explanation: "Mahakavi G. Sankara Kurup won the first Jnanpith Award in 1965 for his poetry collection 'Odakkuzhal'."
  },
  {
    id: 53,
    level: "expert",
    category: "history_gk",
    question: "Which historic satyagraha in 1924 fought for the right of all castes to walk on roads around Vaikom temple?",
    questionMl: "ക്ഷേത്ര റോഡുകളിലൂടെ എല്ലാ മനുഷ്യർക്കും സഞ്ചരിക്കാൻ അവകാശം നേടിയെടുക്കാൻ നടന്ന സമരം ഏതാണ്?",
    options: ["Guruvayur Satyagraha", "Vaikom Satyagraha", "Punnapra-Vayalar Revolt", "Channar Revolt"],
    correct: 1,
    explanation: "The Vaikom Satyagraha (1924-25) was a landmark civil rights movement in Kerala."
  },
  {
    id: 54,
    level: "expert",
    category: "history_gk",
    question: "What was the name of the first printed newspaper published in Malayalam (1847)?",
    questionMl: "മലയാളത്തിലെ ആദ്യത്തെ അച്ചടിച്ച പത്രം ഏതാണ്?",
    options: ["Malayala Manorama", "Mathrubhumi", "Rajyasamacharam", "Deepika"],
    correct: 2,
    explanation: "'Rajyasamacharam' was published in 1847 by Dr. Hermann Gundert at Illikkunnu, Thalassery."
  },
  {
    id: 55,
    level: "expert",
    category: "history_gk",
    question: "Who authored the famous novel 'Chemmeen' (ചെമ്മീൻ)?",
    questionMl: "'ചെമ്മീൻ' എന്ന പ്രശസ്തമായ നോവൽ എഴുതിയത് ആര്?",
    options: ["Vaikom Muhammad Basheer", "Thakazhi Sivasankara Pillai", "Kesavadev", "Uroob"],
    correct: 1,
    explanation: "Thakazhi Sivasankara Pillai authored the iconic fishing community novel 'Chemmeen'."
  },
  {
    id: 56,
    level: "expert",
    category: "history_gk",
    question: "What is the official State Bird of Kerala?",
    questionMl: "കേരളത്തിന്റെ ഔദ്യോഗിക സംസ്ഥാന പക്ഷി ഏതാണ്?",
    options: ["Peacock (മയിൽ)", "Great Hornbill (മലമുഴക്കി വേഴാമ്പൽ)", "Kingfisher (പൊൻമാൻ)", "Parrot (തത്ത)"],
    correct: 1,
    explanation: "The Great Hornbill (മലമുഴക്കി വേഴാമ്പൽ) is the official state bird of Kerala."
  },
  {
    id: 57,
    level: "expert",
    category: "history_gk",
    question: "Who directed and produced the first silent feature film of Kerala, 'Vigathakumaran' (1928)?",
    questionMl: "മലയാളത്തിലെ ആദ്യത്തെ നിശ്ശബ്ദ സിനിമയായ 'വിഗതകുമാരൻ' നിർമ്മിച്ച ചലച്ചിത്രകാരൻ ആര്?",
    options: ["JC Daniel", "Adoor Gopalakrishnan", "Ramu Kariat", "P. Padmarajan"],
    correct: 0,
    explanation: "JC Daniel is honored as the Father of Malayalam Cinema."
  },
  {
    id: 58,
    level: "master",
    category: "history_gk",
    question: "Which scholar compiled the first exhaustive Malayalam-English Dictionary in 1872?",
    questionMl: "1872-ൽ ആദ്യത്തെ സമഗ്രമായ മലയാളം-ഇംഗ്ലീഷ് നിഘണ്ടു തയ്യാറാക്കിയ ജർമ്മൻ പണ്ഡിതൻ ആര്?",
    options: ["Father Clement Pianius", "Dr. Hermann Gundert", "Benjamin Bailey", "Arnothu Pathiri"],
    correct: 1,
    explanation: "Dr. Hermann Gundert compiled the legendary Malayalam-English Dictionary at Thalassery."
  },
  {
    id: 59,
    level: "master",
    category: "history_gk",
    question: "Who wrote the timeless literary classic 'Khasakkinte Itihasam' (ഖസാക്കിന്റെ ഇതിഹാസം)?",
    questionMl: "'ഖസാക്കിന്റെ ഇതിഹാസം' എന്ന വിഖ്യാത നോവലിന്റെ കർത്താവ് ആര്?",
    options: ["O.V. Vijayan", "M. Mukundan", "S.K. Pottekkatt", "Punathil Kunjabdulla"],
    correct: 0,
    explanation: "O.V. Vijayan's 'Khasakkinte Itihasam' (1969) is a monumental landmark in modern Indian literature."
  },
  {
    id: 60,
    level: "master",
    category: "history_gk",
    question: "Who was the beloved Malayalam writer fondly known as 'Beypore Sultan'?",
    questionMl: "'ബേപ്പൂർ സുൽത്താൻ' എന്നറിയപ്പെടുന്ന ജനപ്രിയ എഴുത്തുകാരൻ ആര്?",
    options: ["Vaikom Muhammad Basheer", "M.T. Vasudevan Nair", "P. Keshavadev", "Malayattoor Ramakrishnan"],
    correct: 0,
    explanation: "Vaikom Muhammad Basheer is affectionately called Beypore Sultan."
  },
  {
    id: 61,
    level: "master",
    category: "history_gk",
    question: "What is the official State Tree of Kerala?",
    questionMl: "കേരളത്തിന്റെ ഔദ്യോഗിക സംസ്ഥാന വൃക്ഷം ഏതാണ്?",
    options: ["Teak Tree (തേക്ക്)", "Coconut Tree (തെങ്ങ്)", "Banyan Tree (പേരാൽ)", "Jackfruit Tree (പ്ലാവ്)"],
    correct: 1,
    explanation: "The Coconut Palm (തെങ്ങ്) is the official state tree of Kerala."
  },
  {
    id: 62,
    level: "master",
    category: "history_gk",
    question: "Which ancient martial art form of Kerala is recognized as one of the oldest fighting arts in existence?",
    questionMl: "ലോകത്തിലെ തന്നെ ഏറ്റവും പഴക്കമുള്ള ധനുർവേദ ആയോധനകല ഏതാണ്?",
    options: ["Kalaripayattu (കളരിപ്പയറ്റ്)", "Silambam", "Gatka", "Thang-Ta"],
    correct: 0,
    explanation: "Kalaripayattu is Kerala's ancient martial art system."
  },
  {
    id: 63,
    level: "master",
    category: "history_gk",
    question: "Who founded the famous Kerala Kalamandalam at Cheruthuruthy in 1930 to revive Kathakali and Mohiniyattam?",
    questionMl: "കഥകളിയും മോഹിനിയാട്ടവും പുനരുജ്ജീവിപ്പിക്കാൻ കേരള കലാമണ്ഡലം സ്ഥാപിച്ചത് ആര്?",
    options: ["Vallathol Narayana Menon", "Kumaran Asan", "Ulloor", "K.P. Karuppan"],
    correct: 0,
    explanation: "Mahakavi Vallathol Narayana Menon established Kerala Kalamandalam."
  },
  {
    id: 64,
    level: "master",
    category: "history_gk",
    question: "Which is the first printed book containing Malayalam text published in Rome (1772)?",
    questionMl: "1772-ൽ റോമിൽ അച്ചടിച്ച ആദ്യത്തെ സമ്പൂർണ്ണ മലയാള പുസ്തകം ഏതാണ്?",
    options: ["Samksepavedartham (സംക്ഷേപവേദാർത്ഥം)", "Hortus Malabaricus", "Chanthotsavam", "Keralolpatthi"],
    correct: 0,
    explanation: "'Samksepavedartham' written by Father Clement Pianius was printed in Rome in 1772."
  },
  {
    id: 65,
    level: "master",
    category: "history_gk",
    question: "Which Travancore ruler was a great patron of arts, polyglot, and composer of famous Carnatic kritis?",
    questionMl: "സംഗീതജ്ഞനും ബഹുഭാഷാ പണ്ഡിതനുമായിരുന്ന തിരുവിതാംകൂർ രാജാവ് ആര്?",
    options: ["Swathi Thirunal Rama Varma", "Marthanda Varma", "Dharma Raja", "Chithira Thirunal"],
    correct: 0,
    explanation: "Swathi Thirunal Rama Varma was a legendary royal composer and patron of fine arts."
  },
  {
    id: 66,
    level: "master",
    category: "history_gk",
    question: "Which novel won the Jnanpith Award for M.T. Vasudevan Nair in 1995?",
    questionMl: "എം.ടി. വാസുദേവൻ നായർക്ക് ജ്ഞാനപീഠ പുരസ്കാരം നേടിക്കൊടുത്ത പ്രശസ്ത കൃതികളുടെ കൂട്ടത്തിൽ ഏതാണ് പെടുന്നത്?",
    options: ["Randamoozham (രണ്ടാമൂഴം)", "Naalukettu (നാലുകെട്ട്)", "Manju (മഞ്ഞ്)", "All of his literary contributions"],
    correct: 3,
    explanation: "MT Vasudevan Nair received the Jnanpith Award in 1995 for his overall profound literary contribution to Malayalam."
  },
  {
    id: 67,
    level: "master",
    category: "history_gk",
    question: "What is the official State Flower of Kerala?",
    questionMl: "കേരളത്തിന്റെ ഔദ്യോഗിക സംസ്ഥാന പുഷ്പം ഏതാണ്?",
    options: ["Kanikonna (കണിക്കൊന്ന)", "Lotus (താമര)", "Jasmine (മുല്ല)", "Hibiscus (ചെമ്പരത്തി)"],
    correct: 0,
    explanation: "Kanikonna (Golden Shower / Cassia fistula) is the official state flower."
  },
  {
    id: 68,
    level: "master",
    category: "history_gk",
    question: "Who wrote the autobiography 'Ente Katha' (എന്റെ കഥ) which stirred bold literary discussions?",
    questionMl: "'എന്റെ കഥ' എന്ന പ്രശസ്ത ആത്മകഥ എഴുതിയത് ആര്?",
    options: ["Kamala Surayya (Madhavikutty)", "Sugathakumari", "Balamani Amma", "K.R. Meera"],
    correct: 0,
    explanation: "Kamala Surayya (Madhavikutty) wrote the courageously personal 'Ente Katha'."
  },
  {
    id: 69,
    level: "master",
    category: "history_gk",
    question: "Which festival is heralded by the traditional 'Pookkalam' (floral carpet) and 'Sadya' (feast)?",
    questionMl: "പൂക്കളവും വിഭവസമൃദ്ധമായ സദ്യയുമായി ആഘോഷിക്കുന്ന കേരളത്തിന്റെ ദേശീയോത്സവം ഏതാണ്?",
    options: ["Onam (ഓണം)", "Vishu (വിഷു)", "Thiruvathira (തിരുവാതിര)", "Thrissur Pooram (തൃശ്ശൂർ പൂരങ്ങൾ)"],
    correct: 0,
    explanation: "Onam is the harvest national festival of Kerala."
  },
  {
    id: 70,
    level: "master",
    category: "history_gk",
    question: "What is the official State Animal of Kerala?",
    questionMl: "കേരളത്തിന്റെ ഔദ്യോഗിക സംസ്ഥാന മൃഗം ഏതാണ്?",
    options: ["Indian Elephant (ആന)", "Tiger (കടുവ)", "Nilgiri Tahr (വരയാട്)", "Lion-tailed Macaque (സിംഹവാലൻ കുരങ്ങ്)"],
    correct: 0,
    explanation: "The Indian Elephant (ആന) is the official state animal of Kerala."
  },
  {
    id: 71,
    level: "master",
    category: "history_gk",
    question: "Which classical 17th-century dance drama of Kerala features elaborate face paint (Paccha, Kathi, Thadi)?",
    questionMl: "പച്ച, കത്തി, താടി തുടങ്ങിയ മുഖത്തെഴുത്തുകളോടെ അവതരിപ്പിക്കുന്ന കേരളത്തിന്റെ ദൃശ്യകലാ രൂപം ഏതാണ്?",
    options: ["Kathakali (കഥകളി)", "Mohiniyattam (മോഹിനിയാട്ടം)", "Koodiyattam (കൂടിയാട്ടം)", "Thullal (തുള്ളൽ)"],
    correct: 0,
    explanation: "Kathakali is famous worldwide for its intricate facial makeup and stylized expressions."
  },
  {
    id: 72,
    level: "master",
    category: "history_gk",
    question: "Who was the ruler of Calicut known historically as the 'Zamorin'?",
    questionMl: "കോഴിക്കോട് ഭരിച്ചിരുന്ന ഭരണാധികാരികൾ ഏത് പേരിലാണ് ചരിത്രത്തിൽ അറിയപ്പെട്ടത്?",
    options: ["Samuthiri (സാമൂതിരി / Zamorin)", "Vanchipala", "Kolathiri", "Perumal"],
    correct: 0,
    explanation: "The rulers of Calicut held the hereditary royal title Samuthiri (Zamorin)."
  },
  {
    id: 73,
    level: "master",
    category: "history_gk",
    question: "Who wrote the famous poem 'Veena Poovu' (വീണപൂവ്)?",
    questionMl: "'വീണപൂവ്' എന്ന ഖണ്ഡകാവ്യം രചിച്ച മഹാകവി ആര്?",
    options: ["Kumaran Asan", "Vallathol", "Ulloor", "Changanpuzha"],
    correct: 0,
    explanation: "Kumaran Asan wrote 'Veena Poovu' (Fallen Flower) in 1907."
  },
  {
    id: 74,
    level: "master",
    category: "history_gk",
    question: "What is the official State Fish of Kerala?",
    questionMl: "കേരളത്തിന്റെ ഔദ്യോഗിക സംസ്ഥാന മത്സ്യം ഏതാണ്?",
    options: ["Karimeen (കരിമീൻ / Pearl Spot)", "Ayala (അയില)", "Mathi (മത്തി)", "Neymeen (നെയ്മീൻ)"],
    correct: 0,
    explanation: "Karimeen (Pearl Spot / Etroplus suratensis) is the official state fish of Kerala."
  }
];

/**
 * Shuffles and retrieves exact requested question count for a specific level.
 */
export function getRandomQuestions(level: "beginner" | "expert" | "master", count: number): ExamQuestion[] {
  let pool = EXAM_QUESTION_POOL.filter((q) => q.level === level);
  
  // If pool has fewer than requested count, pull in questions from other levels
  if (pool.length < count) {
    const extra = EXAM_QUESTION_POOL.filter((q) => q.level !== level);
    pool = [...pool, ...extra];
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
