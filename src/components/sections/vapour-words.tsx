"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";
import { bodoni } from "@/lib/fonts";
import { useFontReady } from "@/hooks/use-font-ready";
import { cn } from "@/lib/utils";

type Props = {
  words: string[];
  className?: string;
  /** Font size as a fraction of the container width, clamped to [min, max] px. */
  ratio?: number;
  min?: number;
  max?: number;
  color?: string;
  alignment?: "left" | "center" | "right";
};

/** Place2Be wrapper around VaporizeTextCycle: brand face, responsive size, reduced-motion fallback. */
export function VapourWords({
  words,
  className,
  ratio = 0.16,
  min = 44,
  max = 120,
  color = "rgb(199, 162, 87)",
  alignment = "left",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [width, setWidth] = useState(0);
  const family = bodoni.style.fontFamily;
  const fontReady = useFontReady(`400 100px ${family}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const size = Math.round(Math.min(max, Math.max(min, width * ratio)));
  const font = useMemo(() => ({ fontFamily: family, fontSize: `${size}px`, fontWeight: 400 }), [family, size]);
  const texts = useMemo(() => words, [words]);
  const animation = useMemo(() => ({ vaporizeDuration: 1.8, fadeInDuration: 0.9, waitDuration: 1.6 }), []);

  return (
    <div ref={ref} className={cn("relative w-full", className)} style={{ height: Math.max(min, size) * 1.35 }}>
      {reduce || !fontReady || !width ? (
        <p
          className="display absolute inset-0 flex items-center"
          style={{ fontSize: size || min, color, justifyContent: alignment === "center" ? "center" : alignment === "right" ? "flex-end" : "flex-start" }}
        >
          {words[0]}
        </p>
      ) : (
        <VaporizeTextCycle
          texts={texts}
          font={font}
          color={color}
          spread={4}
          density={6}
          animation={animation}
          direction="left-to-right"
          alignment={alignment}
          tag={Tag.P}
        />
      )}
    </div>
  );
}
