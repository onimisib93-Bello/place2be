"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { video } from "@/content/media";

export function FilmDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-auto max-w-[min(26rem,calc(100vw-2rem))] gap-0 bg-abyss p-0 text-marble sm:p-0">
        <DialogTitle className="sr-only">A short tour of Place2Be</DialogTitle>
        {open && (
          <video
            className="block max-h-[calc(100svh-4rem)] w-full rounded-lg"
            src={video.film.mp4}
            poster={video.film.poster}
            controls
            autoPlay
            playsInline
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
