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
    <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 text-left flex flex-col gap-4">
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
                alt=""
                width="48"
                height="48"
                className="brand-logo__icon"
              />
              <span className="brand-logo__wordmark font-extrabold text-lg bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent tracking-tight uppercase">
                VAMOZHI<span className="text-purple-300 text-xs font-bold">.com</span>
              </span>
            </a>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {language === 'en'
                ? "Your Vibe. Your Words. In Malayalam. The premier social writing platform and phonetic transliteration suite designed with absolute love for Kerala creators, brands, and lovers around the globe."
                : "നിങ്ങളുടെ വൈബ്. നിങ്ങളുടെ വാക്കുകൾ. മലയാളത്തിൽ. ലോകമെമ്പാടുമുള്ള കേരളാ ക്രിയേറ്റർമാർക്കും ബ്രാൻഡുകൾക്കുമായി സ്നേഹത്തോടെ തയ്യാറാക്കിയ സോഷ്യൽ റൈറ്റിംഗ് പ്ലാറ്റ്‌ഫോം."}
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-4">
              {language === 'en' ? "Creator Hub" : "ക്രിയേറ്റർ ഹബ്"}
            </h4>
            <ul className="space-y-2.5 text-xs" id="footer-links-hub">
              <li>
                <button onClick={() => onNavigate("/")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? "Caption Generator" : "ക്യാപ്ഷൻ ജനറേറ്റർ"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/manglish-to-malayalam")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? "Phonetic Typing Tool" : "മലയാളം ടൈപ്പിംഗ് ടൂൾ"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/malayalam-instagram-bio")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? "Instagram Bio Generator" : "ഇൻസ്റ്റാഗ്രാം ബയോ ജനറേറ്റർ"}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="md:col-span-4 text-left">
            <h4 className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-4">
              {language === 'en' ? "Company & Legal" : "കമ്പനി & ലീഗൽ"}
            </h4>
            <ul className="space-y-2.5 text-xs" id="footer-links-legal">
              <li>
                <button onClick={() => onNavigate("/about")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? "About Us" : "ഞങ്ങളെക്കുറിച്ച്"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/privacy-policy")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? "Privacy Policy" : "സ്വകാര്യതാ നയം"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/cookie-policy")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? "Cookie Policy" : "കുക്കി നയം"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/terms")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? "Terms & Conditions" : "നിബന്ധനകൾ"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/disclaimer")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? "Disclaimer Notice" : "ഡിസ്ക്ലൈമർ നോട്ടിസ്"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/contact")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  {language === 'en' ? "Contact Support / Feedback" : "ബന്ധപ്പെടുക / ഫീഡ്‌ബാക്ക്"}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Disclaimer Box & Powered By Redbridge Technologies */}
        <div className="border-t border-neutral-900 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-6" id="footer-credits-box">
          
          <div className="text-left text-[11px] text-neutral-500 max-w-xl space-y-2">
            <p className="font-bold">
              {language === 'en' ? (
                <>© {currentYear} VAMOZHI (Vamozhi.com). All rights reserved. Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> in Kerala.</>
              ) : (
                <>© {currentYear} VAMOZHI (Vamozhi.com). എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം. കേരളത്തിൽ <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> സ്നേഹത്തോടെ നിർമ്മിച്ചത്.</>
              )}
            </p>
            <p className="leading-relaxed">
              <strong>Disclaimer:</strong> Instagram, Facebook, WhatsApp, Snapchat, TikTok, Bumble, and Tinder are registered trademarks of their respective copyright holders. Vamozhi is an independent, 100% free writing tool and is not affiliated, sponsored, associated, or officially connected with Meta Platforms Inc., ByteDance, Match Group, or any subsidiaries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-bold text-neutral-400">
            <a
              href="https://redbridge.in"
              target="_blank"
              rel="noreferrer"
              className="bg-purple-950/80 hover:bg-purple-900 px-3.5 py-2 rounded-xl border border-purple-800/80 text-purple-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group"
            >
              <span className="text-neutral-400 font-semibold">Powered by</span>
              <strong className="text-amber-400 font-black tracking-wide group-hover:underline">Redbridge Technologies</strong>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <span className="bg-neutral-900 px-3.5 py-2 rounded-xl border border-neutral-800 flex items-center gap-1.5 text-neutral-300">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              https://vamozhi.com
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
