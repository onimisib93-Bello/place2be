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
    body: "Four room types with gold headboards, crisp linen, air conditioning and breakfast included. Kept spotless and regularly fumigated.",
    href: "/rooms",
    cta: "See the rooms",
  },
  {
    title: "Dine",
    body: "A restaurant serving local and continental dishes, a bar and lounge, and room service whenever you want it.",
    href: "/dining",
    cta: "Restaurant & bar",
  },
  {
    title: "Unwind",
    body: "An outdoor pool for guests, a fitness centre, laundry and a local shuttle the front desk can arrange.",
    href: "/experiences",
    cta: "Hotel facilities",
  },
];

/**
 * Signature moment: the camera travels through the word PLACE2BE into the hotel's
 * pool, whose floor carries the same word in tile, then opens onto the hotel's story.
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
      enterLabel="Step inside"
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
          <p className="pool-portal-eyebrow">Welcome to</p>
          <p className="pool-portal-support">Hotel &amp; Suites, Ipaja Road. Scroll to step inside.</p>
        </>
      }
    >
      <div className="container-x py-10">
        <h2 className="display max-w-[16ch] text-[clamp(2.4rem,5.5vw,5rem)] text-marble">
          Everything a good stay needs, inside one gated compound.
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg text-marble/80">
          Place2Be is a hotel and suites on Ipaja Road, a short ride from Iyana-Ipaja. Comfortable rooms come first, with
          breakfast included and a front desk that never closes. Around them you&apos;ll find a restaurant, a bar and lounge, a
          fitness centre and an outdoor pool for guests.
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
