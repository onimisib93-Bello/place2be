"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import type { MediaImage } from "@/content/media";
import { SmartImage } from "@/components/motion/smart-image";

export type StoryChapter = { title: string; body: string; image: MediaImage };

/**
 * Pinned scroll story: chapters scroll on the left while a sticky frame on the right
 * cross-fades to each chapter's photo. On small screens each chapter shows its own photo inline.
 */
export function StickyStory({ chapters }: { chapters: StoryChapter[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = chapters[active];

  return (
    <section className="band-night py-20 md:py-28" aria-label="Experiences">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <div className="md:col-span-6 lg:col-span-5">
          {chapters.map((c, i) => (
            <div
              key={c.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className="flex min-h-[70svh] flex-col justify-center py-10 md:min-h-[90svh]"
            >
              <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[2px] md:hidden">
                <SmartImage image={c.image} fill sizes="92vw" className="object-cover" />
              </div>
              <h2
                className="display text-[clamp(2.4rem,5vw,4.5rem)] transition-colors duration-500"
                style={{ color: i === active ? "var(--marble)" : "color-mix(in oklab, var(--marble) 35%, transparent)" }}
              >
                {c.title}
              </h2>
              <p
                className="mt-6 max-w-md text-lg transition-opacity duration-500"
                style={{ opacity: i === active ? 0.8 : 0.35 }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
        <div className="hidden md:col-span-6 md:block lg:col-span-7">
          <div className="sticky top-[12svh] h-[76svh] overflow-hidden rounded-[2px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.image.src}
                className="grain absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <SmartImage image={current.image} fill sizes="55vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-5 left-5 flex gap-2" aria-hidden>
              {chapters.map((c, i) => (
                <span key={c.title} className="h-1 w-8 rounded-full transition-colors duration-500" style={{ background: i === active ? "var(--gold)" : "rgba(241,242,238,0.35)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
