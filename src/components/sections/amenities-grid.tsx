"use client";

import { motion, useReducedMotion } from "motion/react";

import { amenities } from "@/content/hotel";
import { RevealText } from "@/components/motion/reveal-text";
import { AmenityIcon } from "./amenity-icon";
import { cn } from "@/lib/utils";

/**
 * Amenities as a tiled grid, like the pool's mosaic. Tiles light up with pool-water
 * colour on hover; the grid assembles tile by tile once, on first view.
 */
export function AmenitiesGrid({ limit, className }: { limit?: number; className?: string }) {
  const reduce = useReducedMotion();
  const items = limit ? amenities.slice(0, limit) : amenities;

  return (
    <section className={cn("band-day py-24 md:py-36", className)} aria-label="Amenities">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <RevealText
            className="display text-[clamp(2.4rem,5.5vw,4.75rem)] md:col-span-7"
            lines={["Included,", "every stay."]}
          />
          <p className="max-w-md text-lg text-vein/75 md:col-span-5 md:justify-self-end">
            Breakfast, parking and Wi-Fi cost nothing extra. The pool, the gym and the front desk are there whenever you need them.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 border-l border-t border-vein/15 md:mt-20 md:grid-cols-3 lg:grid-cols-4">
          {items.map((a, i) => (
            <motion.li
              key={a.key}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.06 + Math.floor(i / 4) * 0.1 }}
              className="group relative isolate overflow-hidden border-b border-r border-vein/15 p-5 sm:p-8"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-gradient-to-t from-abyss to-abyss-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
              />
              <AmenityIcon name={a.key} className="size-8 text-vein/70 transition-colors duration-300 group-hover:text-pool sm:size-9" />
              <h3 className="mt-10 text-lg font-medium leading-snug transition-colors duration-300 group-hover:text-marble sm:mt-16 sm:text-xl">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-vein/65 transition-colors duration-300 group-hover:text-marble/75 sm:text-[0.95rem]">
                {a.detail}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
