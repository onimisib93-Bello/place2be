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

const PORTRAIT = "(max-aspect-ratio: 4/5)";

/**
 * Full-bleed video hero. The building and balcony, then the pool, play edge to edge;
 * the headline sits on a graded overlay. On scroll the video drifts and zooms slowly
 * while the copy lifts away, so the next section appears to slide over it.
 */
export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [filmOpen, setFilmOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative isolate h-[100svh] min-h-[40rem] overflow-hidden bg-abyss text-marble" aria-label="Welcome">
      {/* Media layer */}
      <motion.div className="absolute inset-0 -z-20" style={reduce ? undefined : { y: mediaY, scale: mediaScale }}>
        {/* Poster paints first (LCP) and stays under the video until it plays */}
        <picture>
          <source media={PORTRAIT} srcSet={video.hero.tallPoster} />
          <img src={video.hero.widePoster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        <video
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1.2s]"
          style={{ opacity: playing ? 1 : 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          aria-hidden
        >
          <source src={video.hero.tallWebm} type="video/webm" media={PORTRAIT} />
          <source src={video.hero.tall} type="video/mp4" media={PORTRAIT} />
          <source src={video.hero.wideWebm} type="video/webm" />
          <source src={video.hero.wide} type="video/mp4" />
        </video>
      </motion.div>

      {/* Grade: keeps text legible and softens the low-resolution source */}
      <div aria-hidden className="grain absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,31,34,0.6)_0%,rgba(7,31,34,0.25)_30%,rgba(7,31,34,0.45)_60%,rgba(7,31,34,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,34,0.75)_0%,rgba(7,31,34,0.35)_45%,transparent_75%)]" />
      </div>

      <motion.div
        className="container-x flex h-full flex-col justify-end pb-6 pt-28 md:pb-10"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="fade-up mb-5 text-marble/80" style={{ animationDelay: "var(--intro)" }}>
              Place2Be Hotel &amp; Suites, Ipaja Road, Lagos
            </p>
            <RevealText
              as="h1"
              immediate
              delay={0.05}
              className="display text-[clamp(3.1rem,8.6vw,8.75rem)] drop-shadow-[0_2px_30px_rgba(0,0,0,0.25)]"
              lines={["A hotel made", "for rest."]}
            />
            <div className="fade-up mt-3 flex items-center gap-4" style={{ animationDelay: "calc(var(--intro) + 0.3s)" }}>
              <span className="shrink-0 text-marble/75 max-sm:text-sm">Here to</span>
              <VapourWords words={["rest.", "work.", "celebrate.", "unwind."]} ratio={0.12} min={38} max={80} className="max-w-[30rem]" />
            </div>
          </div>
          <div className="fade-up flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end" style={{ animationDelay: "calc(var(--intro) + 0.45s)" }}>
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/book">Book direct</Link>
              </Button>
            </Magnetic>
            <button
              type="button"
              onClick={() => setFilmOpen(true)}
              className="group flex h-14 cursor-pointer items-center gap-3 rounded-full border border-marble/30 py-2 pl-2 pr-5 text-[0.95rem] backdrop-blur-sm transition-colors hover:border-marble/70"
            >
              <span className="grid size-10 place-items-center rounded-full bg-marble text-abyss transition-transform duration-300 group-hover:scale-110">
                <Play className="size-4 translate-x-px fill-current" aria-hidden />
              </span>
              Watch the tour
            </button>
          </div>
        </div>

        <div className="fade-up mt-8 md:mt-10" style={{ animationDelay: "calc(var(--intro) + 0.6s)" }}>
          <QuickBook />
        </div>

        <div aria-hidden className="mt-6 hidden items-center justify-center gap-3 text-sm text-marble/60 md:flex">
          <span className="relative block h-9 w-px overflow-hidden bg-marble/20">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gold" />
          </span>
          Scroll to explore
        </div>
      </motion.div>
      <FilmDialog open={filmOpen} onOpenChange={setFilmOpen} />
    </section>
  );
}
