"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { reviews } from "@/content/hotel";

const INTERVAL = 8000;

/** Real guest reviews: auto-advancing, swipeable, pausable on hover/focus. */
export function ReviewsSlider() {
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((d: 1 | -1) => {
    setState(([i]) => [(i + d + reviews.length) % reviews.length, d]);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = window.setTimeout(() => go(1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, reduce, go]);

  const r = reviews[index];

  return (
    <section
      className="band-night relative overflow-hidden py-24 md:py-36"
      aria-roledescription="carousel"
      aria-label="Guest reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-x">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <h2 className="text-marble/60">What guests say</h2>
          <p className="flex items-center gap-2 text-marble/60">
            <Star className="size-4 fill-gold text-gold" aria-hidden />
            Real reviews from Google
          </p>
        </div>

        <div className="relative mt-12 min-h-[22rem] sm:min-h-[19rem] md:mt-16 md:min-h-[17rem]">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="cursor-grab touch-pan-y active:cursor-grabbing"
              data-cursor="Drag"
              aria-roledescription="slide"
              aria-label={`Review ${index + 1} of ${reviews.length}`}
            >
              <div className="flex gap-1" aria-label={`${r.rating} out of 5 stars`} role="img">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={i < r.rating ? "size-4 fill-gold text-gold" : "size-4 text-marble/25"} aria-hidden />
                ))}
              </div>
              <blockquote className="display mt-6 max-w-[30ch] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.12]">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-marble/70">
                <span className="text-marble">{r.name}</span>
                {r.context ? `, ${r.context}` : ""}, via {r.source}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-6">
          <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="grid size-12 cursor-pointer place-items-center rounded-full border border-marble/25 transition-colors hover:border-marble">
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next review" className="grid size-12 cursor-pointer place-items-center rounded-full border border-marble/25 transition-colors hover:border-marble">
            <ChevronRight className="size-5" />
          </button>
          <div className="flex flex-1 gap-2" aria-hidden>
            {reviews.map((_, i) => (
              <span key={i} className="relative h-px flex-1 overflow-hidden bg-marble/20">
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-0 origin-left bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused || reduce ? 0.5 : 1 }}
                    transition={{ duration: paused || reduce ? 0.3 : INTERVAL / 1000, ease: "linear" }}
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-marble/50" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
