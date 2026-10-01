"use client";

import Link from "next/link";
import Image from "next/image";

import GlyphPortal from "@/components/ui/glyph-portal";
import { bodoni } from "@/lib/fonts";
import { useFontReady } from "@/hooks/use-font-ready";
import { media } from "@/content/media";

const pillars = [
  {
    title: "Stay",
    body: "Clean, quiet rooms with gold headboards, crisp linen and breakfast included. Kept spotless and regularly fumigated.",
    href: "/rooms",
    cta: "See the rooms",
  },
  {
    title: "Swim",
    body: "An outdoor pool with a black-marble water feature, a turf lounge and music in the evening.",
    href: "/experiences",
    cta: "Explore the pool",
  },
  {
    title: "Savour",
    body: "A restaurant, a bar, room service, and breakfast every morning on the house.",
    href: "/dining",
    cta: "Eat and drink",
  },
];

/**
 * Signature moment: the camera dives through the word PLACE2BE into the pool,
 * whose floor carries the same word in tile.
 */
export function PoolPortal() {
  // Only the primary face: GlyphPortal goes static if any listed family isn't loaded,
  // and next/font's metric-matched fallback face is never "loaded".
  const family = bodoni.style.fontFamily.split(",")[0].trim();
  const ready = useFontReady(`900 100px ${family}`);

  const background = (
    <div className="absolute inset-0" style={{ transform: "scale(var(--gp-field-scale,1))" }}>
      <Image src={media.poolLetters.src} alt="" fill sizes="100vw" className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(7,31,34,.15), rgba(7,31,34,.35))" }}
      />
      {/* Darkens as the story fades in, for legible text over the water */}
      <div className="absolute inset-0 bg-abyss" style={{ opacity: "calc(var(--gp-reveal, 0) * 0.72)" }} />
    </div>
  );

  if (!ready) {
    return <div aria-hidden className="h-[100svh] bg-marble" />;
  }

  return (
    <GlyphPortal
      word="PLACE2BE"
      fontFamily={family}
      fontWeight={900}
      scrollLength={2.6}
      interactive={false}
      enterLabel="Dive in"
      background={background}
      className="pool-portal"
      style={{
        "--gp-paper": "var(--marble)",
        "--gp-ink": "var(--vein)",
        "--gp-field": "var(--abyss)",
        "--gp-foreground": "var(--marble)",
        fontFamily: "var(--font-sans)",
      }}
      front={
        <>
          <p className="pool-portal-eyebrow">Look closely at the pool floor.</p>
          <p className="pool-portal-support">Our name is tiled into the water. Scroll to dive in.</p>
        </>
      }
    >
      <div className="container-x py-10">
        <h2 className="display max-w-[16ch] text-[clamp(2.4rem,5.5vw,5rem)] text-marble">
          Everything you came for, a short walk apart.
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg text-marble/80">
          Place2Be is a small hotel built around its pool. The rooms are upstairs, the lounge is beside the water and the
          bar plays music into the evening. Iyana-Ipaja is a short ride away, and the compound is big enough for everyone&apos;s car.
        </p>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {pillars.map((p) => (
            <div key={p.title} className="border-t border-marble/20 pt-6">
              <h3 className="display text-4xl text-gold">{p.title}</h3>
              <p className="mt-3 text-marble/80">{p.body}</p>
              <Link href={p.href} className="link-underline mt-5 inline-block text-marble">
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </GlyphPortal>
  );
}
