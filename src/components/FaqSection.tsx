/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
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

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-[#faf9f6] border-t border-b border-slate-200" id="faq">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <HelpCircle className="w-6 h-6 text-slate-800" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900" id="faq-heading">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion container */}
        <div className="flex flex-col gap-3.5" id="faq-accordion-list">
          {FAQS.map((faq, index) => {
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
