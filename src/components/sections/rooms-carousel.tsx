"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { rooms } from "@/content/rooms";
import { RevealText } from "@/components/motion/reveal-text";
import { RoomCard } from "./room-card";

/** Horizontal room slider: native swipe + scroll-snap on touch, drag on mouse, buttons and keys everywhere. */
export function RoomsCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [edge, setEdge] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 32), behavior: "smooth" });
  };

  return (
    <section className="band-night overflow-hidden py-24 md:py-36" aria-label="Rooms and suites">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <RevealText className="display text-[clamp(2.4rem,5.5vw,4.75rem)]" lines={["Rooms &", "suites."]} />
          <p className="mt-6 max-w-md text-lg text-marble/70">
            Four room types, from a quiet single for a one-night stop to the Royale for a weekend worth remembering. Breakfast is included with all of them.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous room" className="grid size-12 cursor-pointer place-items-center rounded-full border border-marble/25 transition-colors hover:border-marble disabled:cursor-default disabled:opacity-30">
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label="Next room" className="grid size-12 cursor-pointer place-items-center rounded-full border border-marble/25 transition-colors hover:border-marble disabled:cursor-default disabled:opacity-30">
            <ChevronRight className="size-5" />
          </button>
          <Link href="/rooms" className="link-underline ml-3 text-marble/85">All rooms</Link>
        </div>
      </div>

      <div
        ref={track}
        tabIndex={0}
        data-cursor="Drag"
        role="region"
        aria-label="Room slider, use arrow keys to move"
        onScroll={update}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { active: true, startX: e.clientX, startScroll: track.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.active || !track.current) return;
          const dx = e.clientX - d.startX;
          if (Math.abs(dx) > 4) {
            d.moved = true;
            track.current.style.scrollSnapType = "none";
            track.current.scrollLeft = d.startScroll - dx;
          }
        }}
        onPointerUp={() => {
          drag.current.active = false;
          if (track.current) track.current.style.scrollSnapType = "";
        }}
        onPointerLeave={() => {
          drag.current.active = false;
          if (track.current) track.current.style.scrollSnapType = "";
        }}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="mt-14 flex cursor-grab snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-92rem)/2+3.5rem))] pb-6 [scrollbar-width:none] active:cursor-grabbing md:mt-20 [&::-webkit-scrollbar]:hidden"
        style={{ scrollPaddingInline: "max(1rem, calc((100vw - 92rem) / 2 + 3.5rem))" }}
      >
        {rooms.map((room) => (
          <div key={room.slug} data-card className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[26rem]">
            <RoomCard room={room} />
          </div>
        ))}
        <div aria-hidden className="w-px shrink-0" />
      </div>

      <div className="container-x mt-6">
        <div className="h-px w-full bg-marble/15">
          <div className="h-px origin-left bg-gold transition-transform duration-300" style={{ transform: `scaleX(${0.25 + progress * 0.75})` }} />
        </div>
      </div>
    </section>
  );
}
