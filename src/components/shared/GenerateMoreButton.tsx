/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlusCircle, RotateCcw } from "lucide-react";

interface GenerateMoreButtonProps {
  onGenerateMore: () => void;
  onReset?: () => void;
  canReset?: boolean;
  isLoading?: boolean;
}

export default function GenerateMoreButton({
  onGenerateMore,
  onReset,
  canReset = false,
  isLoading = false
}: GenerateMoreButtonProps) {
  return (
    <div className="flex items-center justify-center gap-3 pt-6" id="generate-more-actions">
      <button
        onClick={onGenerateMore}
        disabled={isLoading}
        className="px-6 py-3 bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white rounded-2xl font-black text-sm shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
        aria-label="കൂടുതൽ സൃഷ്ടിക്കൂ (Generate 6 More Results)"
      >
        <PlusCircle className="w-4 h-4 text-purple-300" />
        <span>കൂടുതൽ സൃഷ്ടിക്കൂ</span>
      </button>

      {canReset && onReset && (
        <button
          onClick={onReset}
          className="px-4 py-3 bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 rounded-2xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
          aria-label="കുറച്ചു കാണിക്കുക (Show Less)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>കുറച്ചു കാണിക്കുക</span>
        </button>
      )}
    </div>
  );
}
