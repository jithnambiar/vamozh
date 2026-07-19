/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 text-left flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg transform -rotate-6 italic">
                CM
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight italic">
                CaptionMallu
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              The premier Malayalam and Manglish Instagram Caption Generator, empowering Kerala creators and brands with original, high-quality social copy in seconds.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-black text-neutral-300 uppercase tracking-widest mb-4">
              Creator Hub
            </h4>
            <ul className="space-y-2.5 text-sm" id="footer-links-hub">
              <li>
                <a href="#generator" className="hover:text-purple-400 transition-colors">
                  Caption Generator
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-purple-400 transition-colors">
                  Category Explorer
                </a>
              </li>
              <li>
                <a href="#trending" className="hover:text-purple-400 transition-colors">
                  Trending Captions
                </a>
              </li>
              <li>
                <a href="#seo-content" className="hover:text-purple-400 transition-colors">
                  Creator Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="md:col-span-4 text-left">
            <h4 className="text-xs font-black text-neutral-300 uppercase tracking-widest mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm" id="footer-links-legal">
              <li>
                <span className="hover:text-purple-400 transition-colors cursor-pointer">
                  About Us
                </span>
              </li>
              <li>
                <span className="hover:text-purple-400 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-purple-400 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-purple-400 transition-colors cursor-pointer">
                  Disclaimer Notice
                </span>
              </li>
              <li>
                <span className="hover:text-purple-400 transition-colors cursor-pointer">
                  Contact Support
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Disclaimer Box */}
        <div className="border-t border-neutral-900 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-6" id="footer-credits-box">
          
          <div className="text-left text-xs text-neutral-500 max-w-xl space-y-2">
            <p className="font-bold">
              © {currentYear} CaptionMallu. All rights reserved. Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> for the Kerala creator community.
            </p>
            <p className="leading-relaxed">
              <strong>Disclaimer:</strong> Instagram, Facebook, WhatsApp, and Meta are registered trademarks of their respective owners. CaptionMallu is an independent, 100% free tool and is not affiliated, sponsored, associated, or officially connected with Meta Platforms Inc. or any of its subsidiaries.
            </p>
          </div>

          <div className="flex gap-4 text-xs font-bold text-neutral-400">
            <span className="bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
              Offline Ready 📡
            </span>
            <span className="bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
              PWA Supported 📱
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
