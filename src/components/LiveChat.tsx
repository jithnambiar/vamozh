/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_SUGGESTIONS = [
  { text: "🌴 Suggest a Kerala travel caption", prompt: "Suggest a beautiful Kerala travel caption in Malayalam" },
  { text: "🎂 How to say 'Happy Birthday'?", prompt: "How do I write a warm 'Happy Birthday' wishes in Malayalam and Manglish?" },
  { text: "☕ Malayalam aesthetic caption for tea", prompt: "Can you write an aesthetic Malayalam caption about tea and rain?" },
  { text: "😎 Give me 5 attitude hashtags", prompt: "Give me 5 trending attitude hashtags for Malayalam reels" }
];

export default function LiveChat() {
  const { language: uiLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessageBadge, setHasNewMessageBadge] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMsg = uiLang === "en" 
      ? "Namaskaram! 🌴 I am Vamozhi AI, your personal Malayalam social writing helper. How can I help you write captivating captions, bios, find hashtags, or learn Malayalam letters today? ✨"
      : "നമസ്കാരം! 🌴 ഞാൻ വമൊഴി AI സഹായിയാണ്. സോഷ്യൽ മീഡിയ ക്യാപ്ഷനുകൾ, പ്രൊഫൈൽ ബയോ, ഹാഷ്‌ടാഗുകൾ എന്നിവ തയ്യാറാക്കാനും മലയാളം അക്ഷരങ്ങൾ പഠിക്കാനും ഞാൻ നിങ്ങളെ സഹായിക്കാം. ഇന്ന് ഞാൻ എന്താണ് ചെയ്യേണ്ടത്? ✨";

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: welcomeMsg,
        timestamp: new Date()
      }
    ]);
  }, [uiLang]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessageBadge(false);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    const cleanText = textToSend.trim();
    if (!cleanText) return;

    // Append user message
    const userMsgId = `user_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: cleanText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Build stateless history payload
      const historyPayload = messages.concat(userMsg).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyPayload })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg: ChatMessage = {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          content: data.text || "I am here to guide you!",
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, assistantMsg]);
        if (!isOpen) {
          setHasNewMessageBadge(true);
        }
      } else {
        throw new Error("Chat response status not OK");
      }
    } catch (err) {
      console.warn("Live chat API request fallback:", err);
      // Friendly local fallback response (Never asks for API key)
      const fallbackMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: uiLang === "en" 
          ? "Namaskaram! 🌴 You can explore 1,000+ Malayalam captions, 1,655+ quotes, dictionary search, and Manglish typing right here on Vamozhi! Try selecting any category at the top to generate instant lines. ✨"
          : "നമസ്കാരം! 🌴 1,000+ മലയാളം ക്യാപ്ഷനുകളും 1,655+ ഉദ്ധരണികളും ഡിക്ഷണറിയും ഇവിടെ സൗജന്യമായി ഉപയോഗിക്കാം! വരികൾ ലഭിക്കാനായി മുകളിലെ ഏത് വിഭാഗവും തിരഞ്ഞെടുക്കുക. ✨",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    const welcomeMsg = uiLang === "en" 
      ? "Namaskaram! 🌴 Chat history refreshed. How else can I assist your writing or learning journey today?"
      : "നമസ്കാരം! 🌴 ചാറ്റ് ഹിസ്റ്ററി പുതുക്കിയിരിക്കുന്നു. ഇന്ന് നിങ്ങൾക്ക് എന്തൊക്കെ വിവരങ്ങളാണ് ആവശ്യമുള്ളത്?";
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        role: "assistant",
        content: welcomeMsg,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="live-chat-widget">
      {/* 1. Chat Window Container */}
      {isOpen && (
        <div 
          className="w-[90vw] sm:w-[380px] h-[500px] bg-white rounded-[28px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-4 animate-fade-in-up"
          id="chat-window-box"
        >
          {/* Header */}
          <div className="bg-slate-900 p-4.5 flex items-center justify-between text-white border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-1">
                  Vamozhi AI Assistant 🪄
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>{uiLang === 'en' ? "Online helper" : "ഓൺലൈൻ സഹായി"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={handleResetChat}
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
                title="Reset Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleToggleChat}
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#faf9f6] flex flex-col gap-3.5" id="chat-messages-container">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.role === "user" ? "align-self-end ml-auto items-end" : "align-self-start mr-auto items-start"
                }`}
              >
                <div 
                  className={`p-3.5 rounded-[20px] text-xs leading-relaxed font-sans ${
                    msg.role === "user" 
                      ? "bg-purple-600 text-white rounded-br-none" 
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-xs"
                  }`}
                  style={{ fontFamily: '"Noto Sans Malayalam", "Plus Jakarta Sans", sans-serif' }}
                >
                  {msg.content}
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="align-self-start mr-auto flex items-center gap-2 bg-white border border-slate-200/80 p-3.5 rounded-[20px] rounded-bl-none shadow-xs">
                <Loader2 className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase animate-pulse">Vamozhi is writing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions Bar (Only if chat is short) */}
          {messages.length < 4 && (
            <div className="px-4 py-2 border-t border-slate-100 bg-[#faf9f6]/50 flex flex-col gap-1 text-left">
              <span className="text-[9px] font-black tracking-wider uppercase text-slate-400">Suggest Topics:</span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
                {QUICK_SUGGESTIONS.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSendMessage(sug.prompt)}
                    className="flex-shrink-0 px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full text-[10px] font-bold border border-purple-100/60 cursor-pointer transition-all"
                  >
                    {sug.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Text Input Block */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
              placeholder={uiLang === 'en' ? "Ask Vamozhi helper anything..." : "എന്തെങ്കിലും ചോദിക്കൂ..."}
              className="flex-1 px-4 py-2.5 bg-[#faf9f6] border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 placeholder:text-slate-400 h-[38px]"
              id="chat-user-input"
            />
            <button 
              onClick={() => handleSendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 bg-slate-900 hover:bg-purple-700 text-white disabled:opacity-40 rounded-xl flex items-center justify-center transition-all cursor-pointer"
              id="chat-send-btn"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Circular Trigger Bubble */}
      <button
        onClick={handleToggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-500/10 relative ${
          isOpen 
            ? "bg-slate-900 text-white" 
            : "bg-gradient-to-tr from-purple-800 via-pink-600 to-orange-500 text-white hover:shadow-2xl"
        }`}
        id="btn-live-chat-toggle"
        title="Vamozhi AI Live Chat Helper"
      >
        {isOpen ? (
          <X className="w-5.5 h-5.5" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 animate-pulse" />
            {hasNewMessageBadge && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-bounce" />
            )}
          </div>
        )}
      </button>
    </div>
  );
}
