"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";

declare global {
  interface Window {
    __p2bNavigated?: boolean;
  }
}

/**
 * Route transition: a night-blue curtain lifts off each new page.
 * Skipped on the first load (server render + hydration), where the preloader covers it.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const navigated = typeof window !== "undefined" && window.__p2bNavigated === true;

  useEffect(() => {
    window.__p2bNavigated = true;
    // After the first-visit preloader has lifted, later pages start their entrances immediately.
    const t = window.setTimeout(() => document.documentElement.classList.add("no-preloader"), 2000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {navigated && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] bg-abyss"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          animate={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1], delay: 0.05 }}
        />
      )}
      {children}
    </>
  );
}
