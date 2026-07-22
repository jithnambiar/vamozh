/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { X, Download, AlignLeft, AlignCenter, AlignRight, Check, Eye } from "lucide-react";

interface StoryModalProps {
  text: string;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

interface ThemePreset {
  name: string;
  id: string;
  backgrounds: [string, string]; // start and end color for linear gradient
  textColor: string;
  cardBg: string;
  watermarkColor: string;
}

const THEME_PRESETS: ThemePreset[] = [
  {
    name: "Kerala Green 🌴",
    id: "kerala_green",
    backgrounds: ["#064e3b", "#022c22"],
    textColor: "#f0fdf4",
    cardBg: "rgba(255, 255, 255, 0.08)",
    watermarkColor: "#34d399"
  },
  {
    name: "Sunset Warmth 🌅",
    id: "sunset",
    backgrounds: ["#ea580c", "#be185d"],
    textColor: "#fff7ed",
    cardBg: "rgba(255, 255, 255, 0.12)",
    watermarkColor: "#ffedd5"
  },
  {
    name: "Romantic Pink 🌸",
    id: "romantic_pink",
    backgrounds: ["#fbcfe8", "#db2777"],
    textColor: "#ffffff",
    cardBg: "rgba(0, 0, 0, 0.15)",
    watermarkColor: "#fdf2f8"
  },
  {
    name: "Cosmic Dark 🌌",
    id: "dark",
    backgrounds: ["#1e1b4b", "#311042"],
    textColor: "#f5f3ff",
    cardBg: "rgba(255, 255, 255, 0.06)",
    watermarkColor: "#a78bfa"
  },
  {
    name: "Premium Black 🖤",
    id: "premium_black",
    backgrounds: ["#09090b", "#27272a"],
    textColor: "#fafafa",
    cardBg: "rgba(255, 255, 255, 0.05)",
    watermarkColor: "#a1a1aa"
  },
  {
    name: "Light Cream 🥛",
    id: "light_cream",
    backgrounds: ["#fafaf9", "#f5f5f4"],
    textColor: "#1c1917",
    cardBg: "rgba(0, 0, 0, 0.04)",
    watermarkColor: "#78716c"
  }
];

export default function StoryModal({ text, onClose, onSuccess }: StoryModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [fontSize, setFontSize] = useState<number>(42); // base font size in canvas space

  // Redraw the canvas whenever variables change
  useEffect(() => {
    drawCanvas();
  }, [selectedPreset, textAlign, fontSize, text]);

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    textToWrap: string,
    maxWidth: number
  ): string[] => {
    const words = textToWrap.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // HD Resolution Setup (1080 x 1920)
    canvas.width = 1080;
    canvas.height = 1920;

    // Draw Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, selectedPreset.backgrounds[0]);
    gradient.addColorStop(1, selectedPreset.backgrounds[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Decorative Abstract circles inside the canvas for styling
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.beginPath();
    ctx.arc(150, 200, 350, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(canvas.width - 150, canvas.height - 300, 450, 0, Math.PI * 2);
    ctx.fill();

    // Define Margins and Content boundaries (Safe Area: 120px to 1800px)
    const margin = 120;
    const contentWidth = canvas.width - margin * 2;
    const centerY = canvas.height / 2;

    // Set Font properties
    ctx.textBaseline = "middle";
    ctx.fillStyle = selectedPreset.textColor;
    
    // We use Noto Sans Malayalam as the primary and Fallback to system fonts
    const fontStr = `500 ${fontSize}px "Plus Jakarta Sans", "Noto Sans Malayalam", sans-serif`;
    ctx.font = fontStr;

    // Wrap the quote text
    const lines = wrapText(ctx, text, contentWidth);
    
    // Calculate total height needed for the wrapped text block + card wrapper
    const lineHeight = fontSize * 1.5;
    const textHeight = lines.length * lineHeight;
    
    // Draw Quote Card Wrapper inside canvas
    const paddingX = 70;
    const paddingY = 80;
    const cardWidth = contentWidth;
    const cardHeight = textHeight + paddingY * 2;
    const cardX = margin;
    const cardY = centerY - cardHeight / 2;
    const cornerRadius = 32;

    ctx.fillStyle = selectedPreset.cardBg;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, cornerRadius);
    ctx.fill();

    // Border around card
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw aesthetic quote icon
    ctx.fillStyle = selectedPreset.watermarkColor;
    ctx.font = "italic bold 120px Georgia, serif";
    ctx.fillText("“", cardX + 50, cardY + 50);

    // Draw the wrapped text inside safe card zone
    ctx.font = fontStr;
    ctx.fillStyle = selectedPreset.textColor;

    lines.forEach((line, index) => {
      let x = cardX + paddingX;
      if (textAlign === 'center') {
        x = canvas.width / 2;
        ctx.textAlign = "center";
      } else if (textAlign === 'right') {
        x = cardX + cardWidth - paddingX;
        ctx.textAlign = "right";
      } else {
        ctx.textAlign = "left";
      }

      // Draw shadow for text readability
      ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;

      const y = cardY + paddingY + (index * lineHeight) + lineHeight / 2;
      ctx.fillText(line, x, y);
    });

    // Reset shadow values for next draws
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Draw small Vamozhi watermark
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    
    // Bottom watermark
    ctx.fillStyle = selectedPreset.watermarkColor;
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("© vamozhi.com", canvas.width / 2, canvas.height - 150);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `vamozhi_story_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      onSuccess("Success! Story image downloaded successfully.");
    } catch (error) {
      console.error("Canvas Download Error: ", error);
      alert("Failed to compile image download. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative bg-white dark:bg-neutral-900 rounded-[32px] w-full max-w-4xl p-6 md:p-8 shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        id="story-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full border border-slate-200 transition-colors z-10 cursor-pointer"
          aria-label="Close Modal"
          id="btn-close-story-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Grid: Canvas Preview (9:16 Aspect Ratio) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center gap-3" id="story-preview-col">
          <span className="text-xs font-extrabold text-purple-600 uppercase tracking-widest flex items-center gap-1">
            <Eye className="w-4.5 h-4.5" /> Canvas Story Preview
          </span>
          <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-slate-100">
            {/* The Actual Hidden/Sized Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              id="story-image-canvas"
            />
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400">Resolution: HD 1080 x 1920px</span>
        </div>

        {/* Right Grid: Customisation Settings Controls */}
        <div className="md:col-span-7 flex flex-col gap-6 text-left" id="story-settings-col">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight" id="story-settings-title">
              Story Customizer
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Personalize colors, typography alignments, and download.
            </p>
          </div>

          {/* Theme Preset Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Select Background Style
            </label>
            <div className="grid grid-cols-2 gap-2" id="theme-grid">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedPreset.id === preset.id
                      ? "border-slate-900 bg-slate-50 text-slate-900 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{preset.name}</span>
                  <div
                    className="w-4 h-4 rounded-full shadow-inner shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${preset.backgrounds[0]}, ${preset.backgrounds[1]})`
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Alignment controls */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Text Alignment
            </label>
            <div className="flex gap-2" id="align-controls">
              {(["left", "center", "right"] as const).map((align) => {
                const Icon = align === "left" ? AlignLeft : align === "center" ? AlignCenter : AlignRight;
                return (
                  <button
                    key={align}
                    onClick={() => setTextAlign(align)}
                    className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer capitalize ${
                      textAlign === align
                        ? "border-slate-900 bg-slate-50 text-slate-900"
                        : "border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {align}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Size controls */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Text Size</span>
              <span className="text-purple-600 font-bold">{fontSize}px</span>
            </div>
            <input
              type="range"
              min="28"
              max="64"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
              id="story-font-slider"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-2xl transition-all cursor-pointer text-center text-sm"
              id="btn-story-cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              className="flex-2 py-4 bg-gradient-to-r from-purple-800 to-pink-600 text-white font-extrabold rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[0.98] text-sm"
              id="btn-story-download"
            >
              <Download className="w-5 h-5 animate-pulse" />
              Download Story PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
