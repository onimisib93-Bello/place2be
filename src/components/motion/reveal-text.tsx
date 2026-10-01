"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  /** Each entry renders as one masked line. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /** Seconds. For `immediate`, an offset after the intro (preloader) delay. */
  delay?: number;
  /** Animate on load (CSS, no hydration wait) instead of when scrolled into view. */
  immediate?: boolean;
};

/** Line-masked headline reveal: each line rises out of its own clip. */
export function RevealText({ lines, as: Tag = "h2", className, lineClassName, delay = 0, immediate = false }: Props) {
  const reduce = useReducedMotion();

  if (immediate) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block overflow-hidden pb-[0.08em]", lineClassName)}>
            <span className="reveal-line" style={{ animationDelay: `calc(var(--intro) + ${delay + i * 0.09}s)` }}>
              {line}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  const viewProps = { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.08em]", lineClassName)}>
          <motion.span
            className="block"
            initial={reduce ? false : "hidden"}
            {...viewProps}
            variants={{
              hidden: { y: "108%" },
              show: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
