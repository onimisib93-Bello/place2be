"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import type { MediaImage } from "@/content/media";
import { SmartImage } from "@/components/motion/smart-image";

/**
 * A framed photo that opens out to full-bleed as you scroll, with its corners squaring off
 * and a caption rising over it once it fills the screen.
 */
export function ExpandImage({ image, children }: { image: MediaImage; children?: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const clip = useTransform(scrollYProgress, (p) => {
    const t = Math.min(1, p / 0.6);
    const e = 1 - Math.pow(1 - t, 3);
    const v = (1 - e) * 18;
    const h = (1 - e) * 22;
    return `inset(${v}% ${h}% ${v}% ${h}% round ${(1 - e) * 12}px)`;
  });
  const copyOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const copyY = useTransform(scrollYProgress, [0.45, 0.7], [40, 0]);

  if (reduce) {
    return (
      <section className="band-night relative isolate grid min-h-[80svh] place-items-center overflow-hidden">
        <SmartImage image={image} fill sizes="100vw" className="-z-10 object-cover opacity-60" />
        <div className="container-x py-24">{children}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className="band-day relative h-[220vh]" aria-label={image.alt}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="grain absolute inset-0 bg-abyss" style={{ clipPath: clip }}>
          <motion.div className="absolute inset-0" style={{ scale }}>
            <SmartImage image={image} fill sizes="100vw" className="object-cover" />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-abyss/30 to-abyss/20" />
        </motion.div>
        <motion.div className="container-x relative flex h-full flex-col justify-end pb-16 text-marble md:pb-24" style={{ opacity: copyOpacity, y: copyY }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
