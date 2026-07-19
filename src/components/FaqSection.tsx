/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS_EN: FAQItem[] = [
  {
    question: "How can I create Malayalam captions for Instagram?",
    answer: "Simply use our Caption Generation Studio at the top! Choose your preferred vibe category (like Love, Attitude, Travel, or Funny), select your preferred script or language, customize the emoji density, type an optional keyword, and click 'Generate'. You will instantly receive multiple unique, high-quality Malayalam captions optimized for social media engagement."
  },
  {
    question: "Is this Malayalam caption generator free?",
    answer: "Yes, Vamozhi is 100% free of charge! You do not need to register, create an account, log in, or pay any hidden subscription fees. All features, including the story image canvas generator, are fully unlocked and accessible instantly."
  },
  {
    question: "Can I generate Manglish captions?",
    answer: "Absolutely! We know many users prefer reading and writing Malayalam using the English alphabet for ease of reading on the move. Under the 'Language' option, select 'Manglish' to generate natural, slang-friendly Manglish captions, or select 'Mixed' for a stylish Malayalam + English bilingual blend."
  },
  {
    question: "Can I generate Malayalam Instagram bios?",
    answer: "Yes! Simply change the 'What are you writing?' content type control at the top to 'Profile Bio'. Vamozhi will instantly generate beautiful, short, and highly impactful Malayalam and English bios tailored to your selected personality vibe."
  },
  {
    question: "Can I use these captions for Facebook and WhatsApp?",
    answer: "Definitely. While optimized for Instagram and Reels, these captions, bios, and hashtags are fully compatible with Facebook, WhatsApp statuses, Telegram, Threads, and any other social media platforms where you want to show your Kerala pride."
  },
  {
    question: "How can I download a caption as an Instagram Story?",
    answer: "Beside each generated caption, you will find a 'Download Story' button. Clicking it opens our Customizer Modal. Here, you can select premium background gradients (like Kerala Green, Sunset, Romantic Pink, Light Cream, etc.), choose text alignments and sizing, and download a high-definition 1080 x 1920px PNG file directly to your device, ready to upload directly to Instagram Stories."
  },
  {
    question: "Does the tool generate hashtags?",
    answer: "Yes. Every caption comes pre-loaded with a carefully selected, highly relevant group of local hashtags based on your category choice. You can copy the caption alone or use the 'Copy + Tags' button to copy both the text and hashtags in a single click."
  },
  {
    question: "Are the generated captions original?",
    answer: "Yes, all templates and captions in Vamozhi are original, culturally relevant, and written by local Malayalam copywriters. We do not copy movie dialogues, copyrighted lyrics, poems, or existing quote collections to ensure your posts remain fresh, authentic, and safe."
  }
];

const FAQS_ML: FAQItem[] = [
  {
    question: "മലയാളം ഇൻസ്റ്റാഗ്രാം ക്യാപ്ഷനുകൾ എങ്ങനെ നിർമ്മിക്കാം?",
    answer: "മുകളിലുള്ള ഞങ്ങളുടെ ക്യാപ്ഷൻ ജനറേറ്റർ ഉപയോഗിക്കുക! നിങ്ങൾക്ക് ഇഷ്ടപ്പെട്ട വിഭാഗം (പ്രണയം, ആറ്റിറ്റ്യൂഡ്, യാത്ര, തമാശ) തിരഞ്ഞെടുത്ത്, ഭാഷ ക്രമീകരിച്ച്, 'ജനറേറ്റ്' ബട്ടണിൽ ക്ലിക്ക് ചെയ്യുക. നിമിഷങ്ങൾക്കകം ആകർഷകമായ വരികൾ ലഭ്യമാകും."
  },
  {
    question: "ഈ മലയാളം ക്യാപ്ഷൻ ജനറേറ്റർ സൗജന്യമാണോ?",
    answer: "അതെ, വമൊഴി പൂർണ്ണമായും സൌജന്യമാണ്! ഇതിനായി രജിസ്റ്റർ ചെയ്യുകയോ അക്കൗണ്ട് ഉണ്ടാക്കുകയോ ലോഗിൻ ചെയ്യുകയോ ആവശ്യമില്ല. എല്ലാ ഫീച്ചറുകളും എപ്പോഴും ഉപയോഗിക്കാൻ സാധിക്കും."
  },
  {
    question: "എനിക്ക് മാംഗ്ലീഷ് (Manglish) ക്യാപ്ഷനുകൾ നിർമ്മിക്കാൻ സാധിക്കുമോ?",
    answer: "തീർച്ചയായും! മിക്ക ആളുകളും ഇംഗ്ലീഷ് അക്ഷരങ്ങളിൽ മലയാളം എഴുതാൻ ഇഷ്ടപ്പെടുന്നു എന്നറിയാം. 'Language' ഓപ്ഷനിൽ 'Manglish' തിരഞ്ഞെടുത്ത് ലളിതമായ മാംഗ്ലീഷ് ക്യാപ്ഷനുകൾ നിർമ്മിക്കാം."
  },
  {
    question: "എനിക്ക് ഇൻസ്റ്റാഗ്രാം ബയോ (Bio) നിർമ്മിക്കാൻ സാധിക്കുമോ?",
    answer: "അതെ! മുകളിലുള്ള 'What are you writing?' എന്നതിൽ 'Profile Bio' തിരഞ്ഞെടുക്കുക. നിങ്ങളുടെ പ്രൊഫൈലിന് അനുയോജ്യമായ മനോഹരമായ ബയോ വരികൾ ലഭ്യമാകും."
  },
  {
    question: "ഫേസ്ബുക്കിനും വാട്സാപ്പിനും ഈ ക്യാപ്ഷനുകൾ ഉപയോഗിക്കാമോ?",
    answer: "തീർച്ചയായും. ഇവ ഇൻസ്റ്റാഗ്രാമിനും റീലുകൾക്കും മാത്രമല്ല ഫേസ്ബുക്ക് പോസ്റ്റുകൾക്കും വാട്സാപ്പ് സ്റ്റാറ്റസുകൾക്കും മറ്റ് സോഷ്യൽ മീഡിയകൾക്കും അനുയോജ്യമാണ്."
  },
  {
    question: "ക്യാപ്ഷൻ എങ്ങനെ ഇൻസ്റ്റാഗ്രാം സ്റ്റോറി ഇമേജ് ആയി ഡൗൺലോഡ് ചെയ്യാം?",
    answer: "ക്യാപ്ഷനുകൾക്ക് സമീപമുള്ള 'Download Story' ബട്ടൺ ക്ലിക്ക് ചെയ്താൽ കസ്റ്റമൈസർ മോഡൽ തുറക്കും. ഇവിടെ മികച്ച പശ്ചാത്തല നിറങ്ങളും ടെക്സ്റ്റ് വലുപ്പവും തിരഞ്ഞെടുത്ത് ഒരു 1080 x 1920px ഇമേജ് ആയി നേരിട്ട് ഡൗൺലോഡ് ചെയ്യാം."
  },
  {
    question: "ഈ ടൂൾ ഹാഷ്‌ടാഗുകൾ നൽകുന്നുണ്ടോ?",
    answer: "അതെ. നിങ്ങൾ തിരഞ്ഞെടുക്കുന്ന വിഭാഗങ്ങൾക്ക് അനുയോജ്യമായ ട്രെൻഡിംഗ് ഹാഷ്‌ടാഗുകൾ ക്യാപ്ഷനൊപ്പം ലഭിക്കും. 'Copy + Tags' ക്ലിക്ക് ചെയ്താൽ ഇത് ഒരുമിച്ച് കോപ്പി ചെയ്യാം."
  },
  {
    question: "ഇവിടെയുള്ള ക്യാപ്ഷനുകൾ യഥാർത്ഥത്തിലുള്ളതാണോ?",
    answer: "അതെ, വമൊഴിയിലെ എല്ലാ വരികളും യഥാർത്ഥവും കുടുംബത്തോടൊപ്പം വായിക്കാൻ അനുയോജ്യമായതുമാണ്. സിനിമ ഡയലോഗുകളോ മറ്റ് കോപ്പികളോ അല്ലാത്തതിനാൽ നിങ്ങളുടെ പോസ്റ്റുകൾ കൂടുതൽ വ്യത്യസ്തമായിരിക്കും."
  }
];

export default function FaqSection() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = language === "en" ? FAQS_EN : FAQS_ML;

  return (
    <section className="py-16 bg-[#faf9f6] border-t border-b border-slate-200" id="faq">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <HelpCircle className="w-6 h-6 text-slate-800" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900" id="faq-heading">
            {t("faqTitle")}
          </h2>
        </div>

        {/* Accordion container */}
        <div className="flex flex-col gap-3.5" id="faq-accordion-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition-all text-left"
                id={`faq-item-${index}`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4.5 flex items-center justify-between text-left font-bold text-slate-800 hover:text-purple-700 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  id={`btn-faq-trigger-${index}`}
                >
                  <span className="text-sm md:text-base leading-snug pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-purple-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {/* Collapsible content pane */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-neutral-50" id={`faq-answer-${index}`}>
                        <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

