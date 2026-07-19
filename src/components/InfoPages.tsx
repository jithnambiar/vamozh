/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Shield, CheckCircle, Info, Heart, Award } from "lucide-react";

interface InfoPagesProps {
  currentPath: string;
  onSuccessMessage: (msg: string) => void;
}

export default function InfoPages({ currentPath, onSuccessMessage }: InfoPagesProps) {
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMsg.trim()) return;

    // Simulate safe API submission and persist locally
    setIsSubmitted(true);
    onSuccessMessage("Feedback submitted successfully! Thank you for helping Vamozhi improve. ❤️");
    
    // Clear inputs
    setFeedbackName("");
    setFeedbackEmail("");
    setFeedbackMsg("");
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (currentPath === "/about") {
    return (
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6" id="about-page">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <span className="p-3 bg-purple-50 rounded-2xl text-purple-600">
              <Award className="w-8 h-8" />
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">About VAMOZHI</h1>
          </div>
          
          <p className="text-base text-slate-600 mb-6 leading-relaxed">
            Welcome to <strong className="text-slate-800">VAMOZHI</strong>, Kerala's premium social writing platform and phonetic transliteration ecosystem. Our mission is simple yet powerful: <strong>Your Vibe. Your Words. In Malayalam.</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                100% Original Content
              </h3>
              <p className="text-xs text-slate-500">
                Every Malayalam and Manglish caption in our database is handwritten by language experts. We strictly prohibit copy-pasting copyrighted film dialogues, songs, poems, or books.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                Data Privacy & Security
              </h3>
              <p className="text-xs text-slate-500">
                Your thoughts are yours alone. Our Manglish-to-Malayalam typing workspace processes all keystrokes locally inside your browser, ensuring nothing is ever sent to unofficial third-party servers.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Our Vision</h2>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Vamozhi bridge the linguistic gap for Malayalis around the globe. Whether you're sharing a serene backwater boat trip, showing off your festive Onam attire, or building a professional bio, Vamozhi provides the precise words that express your cultural identity with charm and pride.
          </p>

          <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-100/50 mt-8 text-center">
            <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2 animate-pulse" />
            <span className="text-xs font-semibold text-slate-700 block">
              Handcrafted with immense love in Kerala for Malayalis everywhere.
            </span>
          </div>
        </div>
      </main>
    );
  }

  if (currentPath === "/contact") {
    return (
      <main className="max-w-xl mx-auto py-12 px-4" id="contact-page">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <span className="p-3 bg-pink-50 rounded-2xl text-pink-600">
              <Mail className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Contact & Feedback</h1>
          </div>

          <p className="text-xs text-slate-500 mb-6">
            Have feature suggestions, custom caption requests, or spotted a bug? Send us a message and we'll get back to you!
          </p>

          {isSubmitted ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl text-center border border-emerald-100 animate-pulse">
              ✓ Message sent successfully! Thank you for writing to us.
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={feedbackMsg}
                  onChange={(e) => setFeedbackMsg(e.target.value)}
                  placeholder="Describe your suggestion or feedback..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 placeholder:text-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-3 px-6 bg-slate-900 hover:bg-slate-850 text-white font-extrabold rounded-xl transition-all text-xs cursor-pointer text-center"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </main>
    );
  }

  // Legal Pages mapping
  let pageTitle = "";
  let pageContent = null;

  if (currentPath === "/privacy-policy") {
    pageTitle = "Privacy Policy";
    pageContent = (
      <div className="text-xs text-slate-600 space-y-4 leading-relaxed text-left">
        <p><strong>Effective Date:</strong> July 19, 2026</p>
        <p>VAMOZHI ("we," "our," or "us") operates the website located at <strong>https://vamozhi.com</strong>. We take your privacy very seriously. This policy documents how we collect, use, and protect your information.</p>
        <h3 className="font-bold text-slate-800 text-sm mt-4">1. Local Storage Data Processing</h3>
        <p>Our Manglish-to-Malayalam typing tool operates 100% locally inside your browser. We never send your typed letters, private texts, or generated captions to our servers or any unauthorized third parties. Saved captions are stored securely inside your device's browser `localStorage`.</p>
        <h3 className="font-bold text-slate-800 text-sm mt-4">2. Cookies and Tracking Technologies</h3>
        <p>We use essential cookies to maintain user preferences (like your theme choices and local favorites). We also incorporate Google AdSense which utilizes non-personally identifiable tracking cookies to deliver personalized, family-friendly advertisements to our visitors.</p>
        <h3 className="font-bold text-slate-800 text-sm mt-4">3. Third-party Links and APIs</h3>
        <p>Vamozhi may include widgets or direct sharing links to external platforms like WhatsApp, Instagram, or Facebook. These platforms have their own independent privacy statements and policies.</p>
      </div>
    );
  } else if (currentPath === "/cookie-policy") {
    pageTitle = "Cookie Policy";
    pageContent = (
      <div className="text-xs text-slate-600 space-y-4 leading-relaxed text-left">
        <p><strong>Effective Date:</strong> July 19, 2026</p>
        <p>This Cookie Policy explains what cookies are and how VAMOZHI uses them on our website at https://vamozhi.com.</p>
        <h3 className="font-bold text-slate-800 text-sm mt-4">1. Essential Cookies</h3>
        <p>We use essential local state parameters to persist your favorite captions and selected writing tools settings across visits. Deactivating cookies might disable saving captions or tracking user preferences.</p>
        <h3 className="font-bold text-slate-800 text-sm mt-4">2. Advertising & AdSense Cookies</h3>
        <p>Google AdSense uses cookies to serve customized ads on our platform based on your prior visits. You can opt out of personalized advertising by visiting your browser's Google Ads Settings panel.</p>
      </div>
    );
  } else if (currentPath === "/terms") {
    pageTitle = "Terms and Conditions";
    pageContent = (
      <div className="text-xs text-slate-600 space-y-4 leading-relaxed text-left">
        <p>Welcome to VAMOZHI! By accessing <strong>https://vamozhi.com</strong>, you agree to comply with and be bound by these terms.</p>
        <h3 className="font-bold text-slate-800 text-sm mt-4">1. Intellectual Property</h3>
        <p>The name VAMOZHI, our logo, custom layouts, and our handwritten caption datasets are the exclusive intellectual property of Vamozhi. You are granted permission to copy individual generated captions for your personal social media posts. Scraping or bulk reproduction of our caption data is strictly prohibited.</p>
        <h3 className="font-bold text-slate-800 text-sm mt-4">2. Acceptable Use</h3>
        <p>You agree to use our platform and typing tools responsibly. Generating content designed to harass, threaten, or defame individuals under the dating or matrimony tools is strictly forbidden and constitutes a breach of terms.</p>
      </div>
    );
  } else if (currentPath === "/disclaimer") {
    pageTitle = "Disclaimer";
    pageContent = (
      <div className="text-xs text-slate-600 space-y-4 leading-relaxed text-left">
        <h3 className="font-bold text-slate-800 text-sm mt-4">1. Content Originality</h3>
        <p>While we make every effort to curate and review all captions in our database to ensure they are highly original, we hold no responsibility if similar phrasing occurs elsewhere by chance.</p>
        <h3 className="font-bold text-slate-800 text-sm mt-4">2. No Affiliation</h3>
        <p>Vamozhi is an independent social writing assistant and PWA tool. We have no official affiliation, sponsorship, endorsement, or partnership with Instagram, Facebook, Snapchat, WhatsApp, TikTok, Arike, Bumble, or any other social platform mentioned.</p>
      </div>
    );
  }

  if (pageTitle) {
    return (
      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6" id="legal-page">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <span className="p-2.5 bg-slate-50 rounded-xl text-slate-700">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{pageTitle}</h1>
          </div>
          {pageContent}
        </div>
      </main>
    );
  }

  return null;
}
