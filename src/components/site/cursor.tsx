"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

/**
 * Soft cursor follower for fine pointers. Grows into a labelled disc over elements
 * marked `data-cursor="View"` / `data-cursor="Drag"`; a small ring otherwise.
 * The native cursor stays visible, so nothing is lost if this fails.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(my, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120]" style={{ x, y }}>
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        animate={{
          width: label ? 88 : 28,
          height: label ? 88 : 28,
          opacity: visible ? 1 : 0,
          backgroundColor: label ? "rgba(199,162,87,0.95)" : "rgba(199,162,87,0)",
          borderColor: label ? "rgba(199,162,87,0)" : "rgba(199,162,87,0.8)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        style={{ borderWidth: 1, borderStyle: "solid" }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              className="text-sm font-medium text-abyss"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
