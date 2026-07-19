/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, Info } from "lucide-react";

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 w-full max-w-xs md:max-w-sm">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="flex items-center gap-3 bg-slate-900/95 text-white px-6 py-3.5 rounded-full shadow-2xl border border-slate-800 backdrop-blur-md pointer-events-auto"
        id="toast-container"
      >
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" id="toast-success-icon" />
        ) : (
          <Info className="w-5 h-5 text-sky-400 shrink-0" id="toast-info-icon" />
        )}
        <p className="text-sm font-medium tracking-wide text-neutral-100" id="toast-message">
          {message}
        </p>
      </motion.div>
    </div>
  );
}
