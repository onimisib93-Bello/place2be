"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

import { media, type MediaImage } from "@/content/media";
import { SmartImage } from "@/components/motion/smart-image";

type Moment = { time: string; title: string; body: string; image: MediaImage };

const moments: Moment[] = [
  {
    time: "7:00",
    title: "Breakfast, on us",
    body: "Start the day with breakfast, included with every room.",
    image: media.breakfast,
  },
  {
    time: "10:00",
    title: "Work in peace",
    body: "Free Wi-Fi and a calm, air-conditioned room when you need to get things done.",
    image: media.roomStandardDeluxe,
  },
  {
    time: "14:00",
    title: "A swim before meetings",
    body: "Step out for an afternoon swim in the outdoor pool, then back to your day.",
    image: media.poolWaterfall,
  },
  {
    time: "19:00",
    title: "Dinner and drinks",
    body: "Dine at the restaurant, or take a drink to the lounge as the music starts.",
    image: media.poolStage,
  },
  {
    time: "22:00",
    title: "A good night's sleep",
    body: "Blackout drapes, crisp linen and a front desk that's awake so you don't have to be.",
    image: media.roomRoyale,
  },
];

function Panel({ m, index }: { m: Moment; index: number }) {
  return (
    <article className="relative flex h-full w-[82vw] shrink-0 flex-col justify-end overflow-hidden rounded-[3px] sm:w-[60vw] lg:w-[46vw]">
      <SmartImage image={m.image} fill sizes="(min-width: 1024px) 46vw, 82vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
      <div className="relative p-6 md:p-10">
        <p className="display text-6xl text-gold md:text-8xl">{m.time}</p>
        <h3 className="display mt-4 text-3xl md:text-4xl">{m.title}</h3>
        <p className="mt-3 max-w-sm text-marble/80">{m.body}</p>
        <p className="mt-6 text-sm text-marble/50">
          {index + 1} of {moments.length}
        </p>
      </div>
    </article>
  );
}

/**
 * "A day at Place2Be": a pinned section where vertical scroll drives a horizontal
 * timeline from breakfast to bedtime. Touch screens get a native swipe row instead.
 */
export function DayAtPlace2Be() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 48));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const x = useTransform(eased, [0, 1], [0, -distance]);
  const bar = useTransform(eased, [0, 1], [0, 1]);

  const intro = (
    <div className="flex w-[80vw] shrink-0 flex-col justify-center pr-6 sm:w-[44vw] lg:w-[30vw]">
      <h2 className="display text-[clamp(2.6rem,5.5vw,5rem)]">A day at Place2Be</h2>
      <p className="mt-6 max-w-sm text-lg text-marble/75">
        Business trip or weekend away, here&apos;s how a stay tends to go.
      </p>
    </div>
  );

  if (reduce) {
    return (
      <section className="band-night py-20" aria-label="A day at Place2Be">
        <div className="container-x flex gap-6 overflow-x-auto pb-4">
          {intro}
          {moments.map((m, i) => (
            <div key={m.time} className="h-[70svh]"><Panel m={m} index={i} /></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Pinned, scroll-driven on fine pointers */}
      <section ref={ref} className="band-night relative hidden h-[420vh] [@media(pointer:fine)]:block" aria-label="A day at Place2Be">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <motion.div ref={track} className="flex h-[72svh] w-max gap-6 pl-[max(1rem,calc((100vw-92rem)/2+3.5rem))]" style={{ x }}>
            {intro}
            {moments.map((m, i) => (
              <Panel key={m.time} m={m} index={i} />
            ))}
          </motion.div>
          <div className="container-x mt-8">
            <div className="h-px w-full bg-marble/15">
              <motion.div className="h-px origin-left bg-gold" style={{ scaleX: bar }} />
            </div>
          </div>
        </div>
      </section>
      {/* Native swipe row on touch */}
      <section className="band-night py-20 [@media(pointer:fine)]:hidden" aria-label="A day at Place2Be">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none]">
          <div className="snap-start">{intro}</div>
          {moments.map((m, i) => (
            <div key={m.time} className="h-[68svh] snap-start"><Panel m={m} index={i} /></div>
          ))}
        </div>
      </section>
    </>
  );
}
