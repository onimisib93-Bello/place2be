"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";

import type { MediaImage } from "@/content/media";
import { Lightbox } from "./lightbox";

export function RoomGallery({ images }: { images: MediaImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <ul className="mt-6 grid grid-cols-2 gap-4">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[2px]"
              aria-label={`View larger: ${img.alt}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 28vw, 46vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-abyss/60 text-marble opacity-0 transition-opacity group-hover:opacity-100">
                <Expand className="size-4" aria-hidden />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={index} onIndexChange={setIndex} />
    </>
  );
}
