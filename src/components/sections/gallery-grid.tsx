"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Expand, Play } from "lucide-react";

import { gallery, type GalleryCategory } from "@/content/media";
import { Lightbox } from "./lightbox";
import { FilmDialog } from "./film-dialog";
import { cn } from "@/lib/utils";
import { video } from "@/content/media";

const categories: ("All" | GalleryCategory)[] = ["All", "Rooms", "Pool", "Lounge", "Property"];

/** Filterable masonry gallery with animated re-layout and a swipeable lightbox. */
export function GalleryGrid() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const [filmOpen, setFilmOpen] = useState(false);
  const items = useMemo(() => (cat === "All" ? gallery : gallery.filter((g) => g.category === cat)), [cat]);

  return (
    <section className="band-day py-16 md:py-24" aria-label="Photo gallery">
      <div className="container-x">
        <LayoutGroup>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={cn("relative h-11 cursor-pointer rounded-full px-5 transition-colors", cat === c ? "text-marble" : "text-vein/70 hover:text-vein")}
                >
                  {cat === c && <motion.span layoutId="gallery-filter" className="absolute inset-0 rounded-full bg-abyss" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-vein/60" aria-live="polite">
              {items.length} photos
            </p>
          </div>

          <motion.ul layout className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 [grid-auto-flow:dense]">
            {cat === "All" && (
              <motion.li layout key="film" className="col-span-2 row-span-2 md:col-span-1">
                <button
                  type="button"
                  onClick={() => setFilmOpen(true)}
                  className="group relative block h-full min-h-72 w-full cursor-pointer overflow-hidden rounded-[2px] bg-abyss text-left"
                  aria-label="Play the 35-second hotel tour"
                  data-cursor="Play"
                >
                  <Image src={video.film.poster} alt="" fill sizes="(min-width: 768px) 25vw, 92vw" className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-5 text-marble">
                    <span className="grid size-14 place-items-center rounded-full bg-gold text-abyss transition-transform group-hover:scale-110">
                      <Play className="size-5 translate-x-px fill-current" aria-hidden />
                    </span>
                    <span className="display text-2xl">Watch the tour</span>
                  </span>
                </button>
              </motion.li>
            )}
            <AnimatePresence mode="popLayout">
              {items.map((img, i) => {
                const tall = img.height > img.width * 1.2;
                return (
                  <motion.li
                    layout
                    key={img.src}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(tall && "row-span-2")}
                  >
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      className={cn("group relative block w-full cursor-zoom-in overflow-hidden rounded-[2px]", tall ? "h-full min-h-72" : "aspect-[4/3]")}
                      aria-label={`View larger: ${img.alt}`}
                      data-cursor="View"
                    >
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]" />
                      <span aria-hidden className="absolute inset-0 bg-abyss/0 transition-colors duration-500 group-hover:bg-abyss/25" />
                      <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-abyss/60 text-marble opacity-0 transition-opacity group-hover:opacity-100">
                        <Expand className="size-4" aria-hidden />
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
      <Lightbox images={items} index={index} onIndexChange={setIndex} />
      <FilmDialog open={filmOpen} onOpenChange={setFilmOpen} />
    </section>
  );
}
