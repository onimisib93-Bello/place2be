"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";
import type { MediaImage } from "@/content/media";
import { SmartImage } from "./smart-image";

type Props = {
  image: MediaImage;
  className?: string;
  sizes?: string;
  /** Parallax travel as a percentage of the frame height. */
  strength?: number;
  priority?: boolean;
  /** Clip-path reveal when scrolled into view. */
  reveal?: boolean;
  grain?: boolean;
  imgClassName?: string;
};

/** Framed image with scroll parallax and an optional clip reveal. Falls back to a hotel photo if a stock URL fails. */
export function ParallaxImage({
  image,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  strength = 10,
  priority,
  reveal = true,
  grain = true,
  imgClassName,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", grain && "grain", className)}
      initial={reveal && !reduce ? { clipPath: "inset(12% 8% 12% 8%)" } : false}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="absolute inset-[-12%_0]" style={reduce ? undefined : { y }}>
        <SmartImage
          image={image}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
    </motion.div>
  );
}
