/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { MessageSquare, Heart, Send, User, Clock, Globe, PlusCircle, Smile } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface CommunityCaption {
  id: string;
  text: string;
  hashtags: string[];
  author: string;
  likes: number;
  createdAt: string;
}

interface CommunityBoardProps {
  onSuccessMessage: (msg: string) => void;
  key?: number;
}

export default function CommunityBoard({ onSuccessMessage }: CommunityBoardProps) {
  const { language } = useLanguage();
  const [captions, setCaptions] = useState<CommunityCaption[]>([]);
  const [newText, setNewText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [newHashtags, setNewHashtags] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch from Express API
  const fetchCaptions = async () => {
    try {
      const res = await fetch("/api/community-captions");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setCaptions(data.results);
        }
      }
    } catch (err) {
      console.error("Failed to load community captions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptions();
  }, []);

  // Handle Likes
  const handleLike = async (id: string) => {
    if (likedIds.includes(id)) {
      onSuccessMessage(language === 'en' ? "You already loved this caption!" : "നിങ്ങൾ ഇതിനകം തന്നെ ഇത് ലൈക്ക് ചെയ്തിട്ടുണ്ട്!");
      return;
    }

    try {
      const res = await fetch(`/api/community-captions/${id}/like`, {
        method: "POST"
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setCaptions(prev => prev.map(c => c.id === id ? { ...c, likes: data.likes } : c));
          setLikedIds(prev => [...prev, id]);
          onSuccessMessage(language === 'en' ? "Love sent! ❤️" : "സ്നേഹം പങ്കുവെച്ചു! ❤️");
        }
      }
    } catch (err) {
      console.error("Failed to like caption:", err);
    }
  };

  // Submit New Caption
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) {
      onSuccessMessage(language === 'en' ? "Please write some text to post." : "പോസ്റ്റ് ചെയ്യാനായി വരികൾ ടൈപ്പ് ചെയ്യുക.");
      return;
    }

    setIsPosting(true);
    try {
      const tagsArray = newHashtags
        .split(",")
        .map(t => t.trim())
        .filter(t => t.length > 0)
        .map(t => t.startsWith("#") ? t : `#${t}`);

      const res = await fetch("/api/community-captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newText,
          author: authorName.trim() || (language === 'en' ? "Anonymous Creator" : "അജ്ഞാതൻ"),
          hashtags: tagsArray
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setNewText("");
          setAuthorName("");
          setNewHashtags("");
          onSuccessMessage(language === 'en' ? "Published successfully to Community Board! 🌐" : "പബ്ലിക് ഫീഡിലേക്ക് വിജയകരമായി പോസ്റ്റ് ചെയ്തു! 🌐");
          fetchCaptions();
        }
      } else {
        const errData = await res.json();
        onSuccessMessage(errData.error || "Failed to publish caption.");
      }
    } catch (err) {
      console.error("Posting error:", err);
      onSuccessMessage("Failed to publish caption.");
    } finally {
      setIsPosting(false);
    }
  };

  // Quick Copy
  const handleCopy = (text: string, tags: string[]) => {
    const fullText = tags.length > 0 ? `${text}\n\n${tags.join(" ")}` : text;
    navigator.clipboard.writeText(fullText);
    onSuccessMessage(language === 'en' ? "Copied caption from community board!" : "കോപ്പി ചെയ്തിരിക്കുന്നു! 📋");
  };

  // Format Time Helper
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);

      if (diffMins < 1) return language === 'en' ? "Just now" : "ഇപ്പോൾ";
      if (diffMins < 60) return language === 'en' ? `${diffMins}m ago` : `${diffMins} മിനിറ്റ് മുൻപ്`;
      if (diffHours < 24) return language === 'en' ? `${diffHours}h ago` : `${diffHours} മണിക്കൂർ മുൻപ്`;
      return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ml-IN', { month: 'short', day: 'numeric' });
    } catch (e) {
      return "";
    }
  };

  return (
    <section className="py-16 bg-[#f5f3ee] border-t border-b border-slate-200/60" id="community-board-section">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex justify-center mb-3">
            <div className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[10px] font-extrabold tracking-widest uppercase border border-orange-100 flex items-center gap-1">
              <Globe className="w-3 h-3 animate-spin" />
              {language === 'en' ? "Live Community Board" : "ലൈവ് പബ്ലിക് ഫീഡ്"}
            </div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight" id="board-heading">
            {language === 'en' ? "Vamozhi Public Captions Board" : "വമൊഴി പബ്ലിക് ക്യാപ്ഷൻ ബോർഡ്"}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {language === 'en' ? "Share your hand-written captions or generated ideas with other users! Real-time social learning board." : "നിങ്ങളുടെ സ്വന്തം വരികളോ അല്ലെങ്കിൽ ജനറേറ്റ് ചെയ്ത മികച്ച ക്യാപ്ഷനുകളോ ഇവിടെ പങ്കുവെക്കൂ!"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Post/Publish Form */}
          <div className="lg:col-span-5 bg-white rounded-[32px] p-6 border border-slate-200 shadow-xs" id="post-caption-box">
            <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-orange-600" />
              {language === 'en' ? "Publish A New Caption" : "പുതിയ വരികൾ പങ്കുവെക്കാം"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wide">
                  {language === 'en' ? "Your Caption (Malayalam or Manglish)" : "വരികൾ (മലയാളം അല്ലെങ്കിൽ മാംഗ്ലീഷ്)"}
                </label>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder={language === 'en' ? "Write your lovely caption here..." : "നിങ്ങളുടെ മനോഹരമായ വരികൾ ഇവിടെ എഴുതൂ..."}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400 resize-none"
                  maxLength={500}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wide">
                    {language === 'en' ? "Your Name (Optional)" : "നിങ്ങളുടെ പേര്"}
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder={language === 'en' ? "e.g., Arun" : "ഉദാ: അരുൺ"}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wide">
                    {language === 'en' ? "Hashtags (Optional)" : "ഹാഷ്‌ടാഗുകൾ"}
                  </label>
                  <input
                    type="text"
                    value={newHashtags}
                    onChange={(e) => setNewHashtags(e.target.value)}
                    placeholder={language === 'en' ? "e.g., rain, tea" : "ഉദാ: rain, tea"}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPosting}
                className="w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {isPosting 
                  ? (language === 'en' ? "Publishing..." : "പബ്ലിഷ് ചെയ്യുന്നു...") 
                  : (language === 'en' ? "Publish to Feed" : "ഫീഡിലേക്ക് പോസ്റ്റ് ചെയ്യുക")}
              </button>
            </form>

            <div className="mt-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-[10px] text-amber-800 leading-normal flex gap-1.5">
              <span>💡</span>
              <span>
                {language === 'en' 
                  ? "Captions posted here will be immediately available on the public board for other creators to copy, like, and share!" 
                  : "നിങ്ങൾ ഇവിടെ പോസ്റ്റ് ചെയ്യുന്ന വരികൾ മറ്റ് വായനക്കാർക്കും കോപ്പി ചെയ്യാനും ഉപയോഗിക്കാനും സാധിക്കുന്നതാണ്!"}
              </span>
            </div>
          </div>

          {/* Captions Live Feed */}
          <div className="lg:col-span-7 flex flex-col gap-4 max-h-[580px] overflow-y-auto pr-2" id="feed-items-container">
            {isLoading ? (
              <div className="text-center py-12 text-slate-400 text-xs font-bold">
                {language === 'en' ? "Loading community feed..." : "ഫീഡ് ലോഡ് ചെയ്യുന്നു..."}
              </div>
            ) : captions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs font-bold">
                {language === 'en' ? "No captions posted yet. Be the first one to write!" : "വരികൾ ഒന്നും പോസ്റ്റ് ചെയ്തിട്ടില്ല. ആദ്യത്തെ വരി എഴുതൂ!"}
              </div>
            ) : (
              captions.map((cap) => {
                const hasLiked = likedIds.includes(cap.id);
                return (
                  <div 
                    key={cap.id} 
                    className="bg-white rounded-[24px] p-5 border border-slate-200 hover:border-orange-200 transition-all text-left flex flex-col justify-between"
                  >
                    <div>
                      {/* Header metadata */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                            <User className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-extrabold text-slate-800">{cap.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(cap.createdAt)}</span>
                        </div>
                      </div>

                      {/* Caption main body */}
                      <p className="text-sm font-extrabold text-slate-950 leading-relaxed font-sans cursor-pointer" onClick={() => handleCopy(cap.text, cap.hashtags)}>
                        {cap.text}
                      </p>

                      {/* Hashtags list */}
                      {cap.hashtags && cap.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {cap.hashtags.map(t => (
                            <span key={t} className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Likes & Copy Action footer */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
                      <button 
                        onClick={() => handleLike(cap.id)}
                        className={`flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                          hasLiked ? "text-red-500" : "text-slate-400 hover:text-red-500"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${hasLiked ? "fill-red-500 text-red-500" : ""}`} />
                        <span>{cap.likes || 0}</span>
                      </button>

                      <button
                        onClick={() => handleCopy(cap.text, cap.hashtags)}
                        className="text-[10px] font-extrabold text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Smile className="w-3 h-3 text-slate-500" />
                        {language === 'en' ? "Copy Vibe" : "വരികൾ കോപ്പി ചെയ്യാം"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
