"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { media, type MediaImage } from "@/content/media";
import { SmartImage } from "@/components/motion/smart-image";

const items: { href: string; label: string; note: string; image: MediaImage }[] = [
  { href: "/rooms", label: "Rooms & Suites", note: "Four room types, breakfast included", image: media.roomDeluxe },
  { href: "/dining", label: "Restaurant & Bar", note: "Local and continental plates, drinks by the pool", image: media.poolStage },
  { href: "/experiences", label: "Facilities", note: "Pool, fitness centre, laundry, shuttle", image: media.poolWaterfall },
  { href: "/gallery", label: "Gallery", note: "Photos and a short video tour", image: media.facadeSign },
  { href: "/contact", label: "Find us", note: "Moshalashi Roundabout, Ipaja Road", image: media.exteriorStreet },
];

/**
 * Large type index of the hotel. On a fine pointer a photo of the hovered item floats
 * beside the cursor; on touch each row shows a small thumbnail instead.
 */
export function ExploreList() {
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.5 });

  return (
    <section
      className="band-day relative py-24 md:py-36"
      aria-label="Explore the hotel"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      <div className="container-x">
        <h2 className="mb-12 text-vein/60 md:mb-16">Explore the hotel</h2>
        <ul className="border-t border-vein/15" onMouseLeave={() => setActive(null)}>
          {items.map((it, i) => (
            <li key={it.href} className="border-b border-vein/15">
              <Link
                href={it.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group flex items-center gap-5 py-6 md:py-8"
              >
                <span className="relative size-16 shrink-0 overflow-hidden rounded-[2px] md:hidden">
                  <SmartImage image={it.image} fill sizes="64px" className="object-cover" />
                </span>
                <span className="display flex-1 text-[clamp(2rem,6vw,5.5rem)] leading-none transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:text-turf">
                  {it.label}
                </span>
                <span className="hidden max-w-[16rem] text-right text-vein/60 lg:block">{it.note}</span>
                <ArrowUpRight className="size-6 shrink-0 text-vein/40 transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-vein md:size-8" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating preview, fine pointers only */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden [@media(pointer:fine)]:block"
        style={{ x, y }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              className="absolute -left-36 -top-48 h-72 w-60 overflow-hidden rounded-[3px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <SmartImage image={items[active].image} fill sizes="240px" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
