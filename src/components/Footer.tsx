/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, Globe } from "lucide-react";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 text-left flex flex-col gap-4">
            <div className="flex items-center gap-3" onClick={() => onNavigate("/")}>
              <div className="w-9 h-9 bg-gradient-to-br from-purple-800 via-pink-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md transform -rotate-3 italic cursor-pointer">
                V
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight uppercase cursor-pointer">
                VAMOZHI
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Your Vibe. Your Words. In Malayalam. The premier social writing platform and phonetic transliteration suite designed with absolute love for Kerala creators, brands, and lovers around the globe.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-4">
              Creator Hub
            </h4>
            <ul className="space-y-2.5 text-xs" id="footer-links-hub">
              <li>
                <button onClick={() => onNavigate("/")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Caption Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/manglish-to-malayalam")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Phonetic Typing Tool
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/malayalam-instagram-bio")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Instagram Bio Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/arike-bio-generator")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Arike dating Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="md:col-span-4 text-left">
            <h4 className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-xs" id="footer-links-legal">
              <li>
                <button onClick={() => onNavigate("/about")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/privacy-policy")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/cookie-policy")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/terms")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/disclaimer")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Disclaimer Notice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/contact")} className="hover:text-purple-400 transition-colors cursor-pointer text-left">
                  Contact Support / Feedback
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Disclaimer Box */}
        <div className="border-t border-neutral-900 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-6" id="footer-credits-box">
          
          <div className="text-left text-[11px] text-neutral-500 max-w-xl space-y-2">
            <p className="font-bold">
              © {currentYear} VAMOZHI. All rights reserved. Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> in Kerala.
            </p>
            <p className="leading-relaxed">
              <strong>Disclaimer:</strong> Instagram, Facebook, WhatsApp, Snapchat, TikTok, Arike, Bumble, and Tinder are registered trademarks of their respective copyright holders. Vamozhi is an independent, 100% free writing tool and is not affiliated, sponsored, associated, or officially connected with Meta Platforms Inc., ByteDance, Match Group, or any subsidiaries.
            </p>
          </div>

          <div className="flex gap-4 text-xs font-bold text-neutral-400">
            <span className="bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              https://vamozhi.com
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
