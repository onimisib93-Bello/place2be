"use client";

import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { MediaImage } from "@/content/media";
import { SmartImage } from "@/components/motion/smart-image";

type Props = {
  images: MediaImage[];
  index: number | null;
  onIndexChange: (i: number | null) => void;
};

/** Fullscreen image viewer: arrows, keyboard and swipe. */
export function Lightbox({ images, index, onIndexChange }: Props) {
  const open = index !== null;
  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      onIndexChange((index + d + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const img = index !== null ? images[index] : null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogContent
        className="h-[100svh] max-h-none w-screen max-w-none rounded-none bg-transparent p-0 text-marble shadow-none sm:p-0 [&>button]:z-10 [&>button]:bg-abyss/60 [&>button]:text-marble"
        overlayClassName="bg-abyss/95"
      >
        <DialogTitle className="sr-only">Photo viewer</DialogTitle>
        <DialogDescription className="sr-only">Use the arrow keys or swipe to move between photos.</DialogDescription>
        <div className="relative flex h-full w-full items-center justify-center px-4 py-16 md:px-24">
          <AnimatePresence mode="wait" initial={false}>
            {img && (
              <motion.figure
                key={img.src}
                className="relative flex h-full w-full flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
              >
                <div className="relative h-full w-full">
                  <SmartImage image={img} fill sizes="90vw" className="object-contain" />
                </div>
                <figcaption className="mt-4 text-center text-sm text-marble/70">
                  {img.alt} <span className="text-marble/40">({(index ?? 0) + 1} of {images.length})</span>
                </figcaption>
              </motion.figure>
            )}
          </AnimatePresence>
          {images.length > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-abyss/60 hover:bg-abyss md:left-6">
                <ChevronLeft className="size-6" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-abyss/60 hover:bg-abyss md:right-6">
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
