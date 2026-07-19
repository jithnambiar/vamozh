/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from "motion/react";
import { X, Trash2, Copy, Share2, HeartCrack, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface FavouritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favourites: string[];
  onRemoveFavourite: (caption: string) => void;
  onClearAll: () => void;
  onSuccessMessage: (msg: string) => void;
}

export default function FavouritesDrawer({
  isOpen,
  onClose,
  favourites,
  onRemoveFavourite,
  onClearAll,
  onSuccessMessage
}: FavouritesDrawerProps) {
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    onSuccessMessage("Copied to clipboard! 📋");
  };

  const handleShare = (text: string) => {
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/?text=${encodedText}`;
    window.open(waUrl, "_blank");
    onSuccessMessage("Opening WhatsApp to share...");
  };

  const handleConfirmClearAll = () => {
    onClearAll();
    setShowConfirmClear(false);
    onSuccessMessage("Cleared all saved favourites successfully.");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
            id="fav-drawer-overlay"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 flex flex-col"
            id="fav-drawer-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div className="flex items-center gap-2 text-left">
                <Trash2 className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 italic" id="fav-drawer-title">
                    Saved Favourites
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {favourites.length} Captions Stored
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                aria-label="Close favourites"
                id="btn-close-fav"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Favourites Content List */}
            <div className="flex-1 overflow-y-auto p-5" id="fav-items-list">
              {favourites.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-24 px-4 text-slate-400 gap-4" id="fav-empty-state">
                  <HeartCrack className="w-16 h-16 text-slate-300 stroke-[1.5]" />
                  <div className="max-w-xs">
                    <h4 className="font-bold text-slate-700 text-sm">No saved captions yet</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Tap the heart icon on any generated caption, bio, or hook to access them quickly here.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {favourites.map((fav, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-3xl bg-slate-50 border border-slate-200 relative group text-left"
                      id={`fav-card-${index}`}
                    >
                      <p className="text-sm font-semibold text-slate-800 leading-relaxed pr-8">
                        {fav}
                      </p>

                      {/* Remove button inside card */}
                      <button
                        onClick={() => onRemoveFavourite(fav)}
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors p-1 rounded-full border border-transparent hover:border-slate-200 hover:bg-white cursor-pointer"
                        title="Remove favourite"
                        id={`btn-remove-fav-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Card Actions toolbar */}
                      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-200/60" id={`fav-actions-${index}`}>
                        <button
                          onClick={() => handleCopy(fav)}
                          className="flex-1 py-1.5 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 rounded-full border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          Copy Text
                        </button>
                        <button
                          onClick={() => handleShare(fav)}
                          className="flex-1 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[11px] font-bold text-emerald-700 rounded-full border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Share2 className="w-3 h-3" />
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Clear All Footer Button */}
            {favourites.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-[#faf9f6]" id="fav-drawer-footer">
                {!showConfirmClear ? (
                  <button
                    onClick={() => setShowConfirmClear(true)}
                    className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold rounded-full transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                    id="btn-trigger-clear-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All Saved Captions
                  </button>
                ) : (
                  <div className="flex flex-col gap-3 text-left bg-red-50 p-4 rounded-3xl border border-red-200" id="clear-all-confirmation">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-extrabold text-red-800">
                          Are you absolutely sure?
                        </span>
                        <span className="block text-[11px] text-red-700 mt-0.5">
                          This will erase all {favourites.length} captions from your browser storage permanently.
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => setShowConfirmClear(false)}
                        className="flex-1 py-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 text-xs font-bold rounded-full cursor-pointer"
                        id="btn-cancel-clear-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmClearAll}
                        className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full cursor-pointer shadow-md shadow-red-600/10"
                        id="btn-confirm-clear-all"
                      >
                        Yes, Clear All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
