/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-20 left-6 md:bottom-6 md:left-6 z-40 p-3.5 bg-slate-900/90 hover:bg-purple-950 text-white rounded-full shadow-2xl backdrop-blur-md border border-slate-700/80 transition-all cursor-pointer group flex items-center justify-center"
          title="Scroll to Top"
          aria-label="Scroll to top of page"
          id="btn-scroll-to-top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform text-amber-400" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
