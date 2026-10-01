"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RevealText } from "@/components/motion/reveal-text";
import { Magnetic } from "@/components/motion/magnetic";
import { QuickBook } from "@/components/booking/quick-book";
import { FilmDialog } from "@/components/sections/film-dialog";
import { VapourWords } from "@/components/sections/vapour-words";
import { video } from "@/content/media";

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [filmOpen, setFilmOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section ref={ref} className="band-night relative isolate overflow-hidden">
      {/* Ambient pool light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 38%, rgba(60,198,208,0.16), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(199,162,87,0.08), transparent 70%)",
        }}
      />
      <div className="container-x grid min-h-[100svh] grid-cols-1 items-center gap-12 pb-12 pt-28 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-32">
        <div className="lg:col-span-7">
          <p className="fade-up mb-6 text-marble/70" style={{ animationDelay: "var(--intro)" }}>
            Place2Be Hotel &amp; Suites, Ipaja Road, Lagos
          </p>
          <RevealText
            as="h1"
            immediate
            delay={0.05}
            className="display text-[clamp(3.2rem,9vw,8.5rem)]"
            lines={["A calm hideout", "in the city."]}
          />
          <div className="mt-4 flex items-center gap-4 sm:mt-6">
            <span className="shrink-0 text-marble/60 max-sm:text-sm">Come to</span>
            <VapourWords words={["swim.", "unwind.", "dine.", "stay."]} ratio={0.13} min={40} max={88} className="max-w-[28rem]" />
          </div>
          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "calc(var(--intro) + 0.4s)" }}>
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/book">Book direct</Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outlineLight">
              <Link href="/rooms">See the rooms</Link>
            </Button>
          </div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[24rem] lg:col-span-5 lg:mr-0"
          style={reduce ? undefined : { y: videoY, scale: videoScale }}
        >
          <div
            className="reveal-clip grain relative aspect-[9/14] overflow-hidden rounded-[2px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
            style={{ animationDelay: "calc(var(--intro) - 0.15s)" }}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={video.poolLoop.poster}
              aria-label="The Place2Be pool, the hotel's name tiled into its floor"
            >
              <source src={video.poolLoop.webm} type="video/webm" />
              <source src={video.poolLoop.mp4} type="video/mp4" />
            </video>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
            <button
              type="button"
              onClick={() => setFilmOpen(true)}
              className="group absolute bottom-4 left-4 flex cursor-pointer items-center gap-3 rounded-full bg-marble/10 py-2 pl-2 pr-4 text-sm text-marble backdrop-blur-md transition-colors hover:bg-marble/20"
            >
              <span className="grid size-9 place-items-center rounded-full bg-gold text-abyss transition-transform group-hover:scale-110">
                <Play className="size-4 translate-x-px fill-current" aria-hidden />
              </span>
              Watch the 35-second tour
            </button>
          </div>
          <p className="mt-3 text-right text-sm text-marble/50">The pool has our name on its floor.</p>
        </motion.div>

        <div className="fade-up lg:col-span-12" style={{ animationDelay: "calc(var(--intro) + 0.6s)" }}>
          <QuickBook />
        </div>
      </div>
      <FilmDialog open={filmOpen} onOpenChange={setFilmOpen} />
    </section>
  );
}
