import type { Metadata } from "next";
import { Star } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { FeatureBlock } from "@/components/sections/feature-block";
import { LocationBand } from "@/components/sections/location-band";
import { BookCta } from "@/components/sections/book-cta";
import { RevealText } from "@/components/motion/reveal-text";
import { media } from "@/content/media";
import { reviews } from "@/content/hotel";

export const metadata: Metadata = {
  title: "About",
  description: "Place2Be Hotel & Suites is a small, calm hotel built around its pool on Ipaja Road, Alimosho, Lagos.",
};

const values = [
  {
    title: "Clean, always",
    body: "Rooms are cleaned to a high standard and the whole property is regularly fumigated. Guests notice, and they tell us.",
  },
  {
    title: "Help when you need it",
    body: "The front desk is open 24 hours, and the manager is around and easy to find. Ask for anything.",
  },
  {
    title: "Room to breathe",
    body: "A big gated compound, plenty of parking, and a calm pool away from the noise of the road.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Place2Be"
        lines={["A good hideout", "in the city."]}
        intro="That's how one guest described us, and we haven't found a better way to put it."
        image={media.facadeSign}
      />

      {/* TODO: replace with the hotel's own story (founding year, owners, what the name means to them). */}
      <FeatureBlock
        lines={["Built around", "the water."]}
        image={media.poolLetters}
        secondary={media.reception}
        body={
          <>
            <p>
              Place2Be sits on Ipaja Road in Alimosho, close to Iyana-Ipaja. From the street it&apos;s a smart three-storey building. Step through the gate and the pool opens up in front of you, with our name tiled into its floor.
            </p>
            <p>
              We kept things simple: clean rooms, a pool worth swimming in, good food, music in the evening and staff who are glad to help.
            </p>
          </>
        }
      />

      <section className="band-night py-20 md:py-32" aria-label="What we care about">
        <div className="container-x">
          <RevealText className="display text-[clamp(2.4rem,5vw,4.5rem)]" lines={["What we care about"]} />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="border-t border-marble/20 pt-6">
                <h3 className="display text-3xl text-gold">{v.title}</h3>
                <p className="mt-4 text-marble/75">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band-day py-20 md:py-32" aria-label="Guest reviews">
        <div className="container-x">
          <RevealText className="display text-[clamp(2.4rem,5vw,4.5rem)]" lines={["In our guests'", "own words."]} />
          <ul className="mt-14 columns-1 gap-6 md:columns-2">
            {reviews.map((r) => (
              <li key={r.name} className="mb-6 break-inside-avoid rounded-lg bg-white p-7 ring-1 ring-vein/10">
                <div className="flex gap-1" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={i < r.rating ? "size-4 fill-gold text-gold" : "size-4 text-vein/20"} aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 text-lg leading-relaxed text-vein/85">&ldquo;{r.quote}&rdquo;</blockquote>
                <p className="mt-5 text-sm text-vein/60">
                  <span className="font-medium text-vein">{r.name}</span>
                  {r.context ? `, ${r.context}` : ""}, via {r.source}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LocationBand />
      <BookCta />
    </>
  );
}
