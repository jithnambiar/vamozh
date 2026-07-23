/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, Globe, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0d0f] text-neutral-300 py-10 border-t border-neutral-900" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Four-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-4 text-left flex flex-col gap-3">
            <a 
              href="/" 
              className="brand-logo cursor-pointer" 
              aria-label="Vamozhi Home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/");
              }}
            >
              <img
                src="/assets/vamozhi-va-animated-logo.svg"
                alt="Vamozhi"
                width="40"
                height="40"
                className="brand-logo__icon"
              />
              <span className="brand-logo__wordmark font-extrabold text-base bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent tracking-tight uppercase">
                VAMOZHI<span className="text-purple-300 text-xs font-bold">.com</span>
              </span>
            </a>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm">
              {language === 'en'
                ? "Your Vibe. Your Words. In Malayalam. The premier social writing platform and transliteration suite for Kerala creators."
                : "നിങ്ങളുടെ വൈബ്. നിങ്ങളുടെ വാക്കുകൾ. മലയാളത്തിൽ. ക്രിയേറ്റർമാർക്കും ബ്രാൻഡുകൾക്കുമായുള്ള സോഷ്യൽ റൈറ്റിംഗ് പ്ലാറ്റ്‌ഫോം."}
            </p>
          </div>

          {/* 1. Creator Suite Links */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-[11px] font-black text-neutral-200 uppercase tracking-widest mb-3">
              {language === 'en' ? "Creator Suite" : "ക്രിയേറ്റർ ടൂളുകൾ"}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300" id="footer-links-hub">
              <li>
                <button onClick={() => onNavigate("/malayalam-caption-generator")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Captions & Quotes" : "ക്യാപ്ഷൻ & ഉദ്ധരണികൾ"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/malayalam-reel-hooks")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Reel Hooks & Content Ideas" : "റീൽ ഹുക്കുകളും ആശയങ്ങളും"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/malayalam-hashtags")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Hashtag Generator" : "ഹാഷ്‌ടാഗ് ജനറേറ്റർ"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/malayalam-instagram-bio")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Instagram Bio Generator" : "ഇൻസ്റ്റാഗ്രാം ബയോ"}
                </button>
              </li>
            </ul>
          </div>

          {/* 2. Write & Learn Links */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-[11px] font-black text-neutral-200 uppercase tracking-widest mb-3">
              {language === 'en' ? "Write & Learn" : "എഴുത്തും പഠനവും"}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300" id="footer-links-write-learn">
              <li>
                <button onClick={() => onNavigate("/manglish-to-malayalam")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Malayalam Typing" : "മംഗ്ലീഷ് ടൈപ്പിംഗ്"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/malayalam-dictionary")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Dictionary" : "മലയാളം നിഘണ്ടു"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/learn-malayalam")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Learn Malayalam" : "അക്ഷരമാല & പഠനം"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/learn-malayalam")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Certification Exam" : "സർട്ടിഫിക്കറ്റ് പരീക്ഷ"}
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Company & Legal */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-[11px] font-black text-neutral-200 uppercase tracking-widest mb-3">
              {language === 'en' ? "Company & Legal" : "കമ്പനി & ലീഗൽ"}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300" id="footer-links-legal">
              <li>
                <button onClick={() => onNavigate("/about")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "About Us" : "ഞങ്ങളെക്കുറിച്ച്"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/privacy-policy")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Privacy Policy" : "സ്വകാര്യതാ നയം"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/terms")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Terms & Conditions" : "നിബന്ധനകൾ"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/contact")} className="hover:text-purple-400 focus:text-purple-400 transition-colors cursor-pointer text-left focus:outline-none">
                  {language === 'en' ? "Contact & Support" : "ബന്ധപ്പെടുക"}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Credits & Compact Disclaimer */}
        <div className="border-t border-neutral-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400" id="footer-credits-box">
          <div className="text-left space-y-1 max-w-2xl">
            <p className="font-semibold text-neutral-300">
              © {currentYear} VAMOZHI (Vamozhi.com). All rights reserved. Crafted with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" /> in Kerala.
            </p>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Disclaimer: Instagram, Facebook, WhatsApp, Snapchat, TikTok, Bumble & Tinder are trademarks of their respective owners. Vamozhi is an independent 100% free social writing suite.
            </p>
          </div>

          <a
            href="https://redbridge.in"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-amber-400 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Powered by</span>
            <strong className="text-amber-400 font-bold hover:underline">Redbridge Technologies</strong>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </a>
        </div>

      </div>
    </footer>
  );
}
