"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

import { rooms } from "@/content/rooms";
import { RoomCard } from "./room-card";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "All rooms", test: () => true },
  { id: "solo", label: "Travelling alone", test: (sleeps: string) => sleeps.startsWith("1") },
  { id: "two", label: "Two or more", test: (sleeps: string) => !sleeps.startsWith("1") },
] as const;

/** Filterable room grid with animated layout changes. */
export function RoomsBrowser() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");
  const filter = filters.find((f) => f.id === active)!;
  const shown = rooms.filter((r) => filter.test(r.sleeps));

  return (
    <section className="band-day py-20 md:py-28" aria-label="All rooms">
      <div className="container-x">
        <LayoutGroup>
          <div role="group" aria-label="Filter rooms" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                aria-pressed={active === f.id}
                className={cn(
                  "relative h-11 cursor-pointer rounded-full px-5 text-[0.95rem] transition-colors",
                  active === f.id ? "text-marble" : "text-vein/70 hover:text-vein",
                )}
              >
                {active === f.id && (
                  <motion.span layoutId="room-filter" className="absolute inset-0 -z-0 rounded-full bg-abyss" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>

          <motion.ul layout className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {shown.map((room) => (
                <motion.li
                  key={room.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <RoomCard room={room} tone="light" sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw" />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
