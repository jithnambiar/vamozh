/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface GeneratorTabsProps {
  currentMode: "caption" | "quotes";
  onModeChange: (mode: "caption" | "quotes") => void;
}

export default function GeneratorTabs({ currentMode, onModeChange }: GeneratorTabsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center" id="generator-mode-tabs">
      <div className="inline-flex items-center bg-white dark:bg-neutral-900 p-1.5 rounded-3xl border border-purple-200/80 dark:border-neutral-800 shadow-md gap-2">
        <button
          onClick={() => onModeChange("caption")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
            currentMode === "caption"
              ? "bg-purple-950 text-white shadow-md ring-2 ring-purple-600/50"
              : "text-neutral-600 dark:text-neutral-300 hover:text-purple-950 hover:bg-purple-50 dark:hover:bg-neutral-800"
          }`}
          aria-label="Switch to Caption Generator"
        >
          <span>✨</span>
          <span>Caption Generator (ക്യാപ്ഷൻ ജനറേറ്റർ)</span>
        </button>

        <button
          onClick={() => onModeChange("quotes")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
            currentMode === "quotes"
              ? "bg-purple-950 text-white shadow-md ring-2 ring-purple-600/50"
              : "text-neutral-600 dark:text-neutral-300 hover:text-purple-950 hover:bg-purple-50 dark:hover:bg-neutral-800"
          }`}
          aria-label="Switch to Malayalam Quotes Generator"
        >
          <span>📜</span>
          <span>Malayalam Quotes (മലയാളം ഉദ്ധരണികൾ)</span>
        </button>
      </div>
    </div>
  );
}
