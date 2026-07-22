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
    question: "How can I find Malayalam captions for Instagram?",
    answer: "Simply pick your preferred category (like Love, Attitude, Travel, or Funny), select your script preference (Malayalam or Manglish), type an optional keyword, and instantly explore matching captions."
  },
  {
    question: "Is Vamozhi free to use?",
    answer: "Yes, Vamozhi is 100% free with no registration, login, or subscription required."
  },
  {
    question: "Can I generate Manglish captions?",
    answer: "Yes! Select 'Manglish' under the Language options to explore natural Malayalam captions written in Latin/English characters."
  },
  {
    question: "Can I use these captions for Facebook and WhatsApp?",
    answer: "Absolutely! These captions and quotes are perfect for Facebook posts, WhatsApp statuses, Instagram Reels, and Threads."
  },
  {
    question: "How do I download a caption or quote as an Instagram Story image?",
    answer: "Click the 'Canvas 🖼️' button on any caption or quote card to customize background colors, font sizing, and text alignment, then download a high-definition 1080 x 1920px story PNG image!"
  }
];

const FAQS_ML: FAQItem[] = [
  {
    question: "മലയാളം ഇൻസ്റ്റാഗ്രാം ക്യാപ്ഷനുകൾ എങ്ങനെ കണ്ടെത്താം?",
    answer: "നിങ്ങൾക്ക് ഇഷ്ടപ്പെട്ട വിഭാഗം (പ്രണയം, ആറ്റിറ്റ്യൂഡ്, യാത്ര, തമാശ) തിരഞ്ഞെടുത്ത് ലളിതമായി വരികൾ കണ്ടെത്താം."
  },
  {
    question: "വമൊഴി ഉപയോഗിക്കാൻ ഫീസ് നൽകണോ?",
    answer: "ഇല്ല, വമൊഴി പൂർണ്ണമായും സൌജന്യമാണ്! ലോഗിൻ ചെയ്യുകയോ പണം നൽകുകയോ ആവശ്യമില്ല."
  },
  {
    question: "മാംഗ്ലീഷ് (Manglish) വരികൾ ലഭ്യമാണോ?",
    answer: "അതെ! 'Language' ഓപ്ഷനിൽ 'Manglish' തിരഞ്ഞെടുത്ത് ഇംഗ്ലീഷ് അക്ഷരങ്ങളിലുള്ള ലളിതമായ മാംഗ്ലീഷ് വരികൾ കണ്ടെത്താം."
  },
  {
    question: "ഫേസ്ബുക്കിനും വാട്സാപ്പിനും ഈ ക്യാപ്ഷനുകൾ ഉപയോഗിക്കാമോ?",
    answer: "തീർച്ചയായും! ഇൻസ്റ്റാഗ്രാമിനും റീലുകൾക്കും പുറമെ ഫേസ്ബുക്ക് പോസ്റ്റുകൾക്കും വാട്സാപ്പ് സ്റ്റാറ്റസുകൾക്കും ഇവ അനുയോജ്യമാണ്."
  },
  {
    question: "ക്യാപ്ഷൻ അല്ലെങ്കിൽ ഉദ്ധരണി എങ്ങനെ ഇൻസ്റ്റാഗ്രാം സ്റ്റോറി ഇമേജ് ആയി ഡൗൺലോഡ് ചെയ്യാം?",
    answer: "ഏതൊരു വരിക്ക് താഴെയുള്ള 'Canvas 🖼️' ബട്ടൺ ക്ലിക്ക് ചെയ്ത് ആകർഷകമായ ബാക്ക്ഗ്രൗണ്ട് തീമുകളും ടെക്സ്റ്റ് സൈസും ക്രമീകരിച്ച് 1080 x 1920px HD ഇമേജായി നേരിട്ട് ഡൗൺലോഡ് ചെയ്യാം."
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

