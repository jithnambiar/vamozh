/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Instagram, 
  Facebook, 
  MessageSquare, 
  Video, 
  Sparkles, 
  Keyboard 
} from "lucide-react";

interface QuickToolsProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const TOOLS = [
  { name: "Instagram Caption", path: "/instagram-caption-generator", icon: Instagram, color: "text-pink-600 border-pink-100 bg-pink-50/50" },
  { name: "Facebook Post", path: "/facebook-caption-generator", icon: Facebook, color: "text-blue-600 border-blue-100 bg-blue-50/50" },
  { name: "WhatsApp Status", path: "/whatsapp-status-generator", icon: MessageSquare, color: "text-emerald-600 border-emerald-100 bg-emerald-50/50" },
  { name: "Snapchat Caption", path: "/snapchat-caption-generator", icon: Sparkles, color: "text-amber-500 border-amber-100 bg-amber-50/50" },
  { name: "TikTok Caption", path: "/tiktok-caption-generator", icon: Video, color: "text-rose-600 border-rose-100 bg-rose-50/50" },
  { name: "Reel Hook", path: "/malayalam-reel-hooks", icon: Sparkles, color: "text-purple-600 border-purple-100 bg-purple-50/50" },
  { name: "Manglish Typing", path: "/manglish-to-malayalam", icon: Keyboard, color: "text-slate-700 border-slate-200 bg-slate-50" }
];

export default function QuickTools({ onNavigate, currentPath }: QuickToolsProps) {
  return (
    <div className="w-full bg-white border-y border-slate-100 py-3 sticky top-[72px] z-30" id="quick-tools-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest whitespace-nowrap">
            Quick Tools:
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1" style={{ WebkitOverflowScrolling: "touch" }}>
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = currentPath === tool.path;
              return (
                <button
                  key={tool.path}
                  onClick={() => onNavigate(tool.path)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer whitespace-nowrap hover:scale-[1.02] ${
                    isActive
                      ? "bg-slate-900 text-white border-transparent shadow-sm"
                      : `${tool.color} text-slate-700 border-slate-200`
                  }`}
                  id={`quick-tool-${tool.path.replace("/", "")}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tool.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
