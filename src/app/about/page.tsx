import type { Metadata } from "next";
import { Star } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { FeatureBlock } from "@/components/sections/feature-block";
import { LocationBand } from "@/components/sections/location-band";
import { BookCta } from "@/components/sections/book-cta";
import { RevealText } from "@/components/motion/reveal-text";
import { ScrollHighlight } from "@/components/motion/scroll-highlight";
import { VelocityMarquee } from "@/components/motion/velocity-marquee";
import { media } from "@/content/media";
import { reviews } from "@/content/hotel";

export const metadata: Metadata = {
  title: "About",
  description: "Place2Be Hotel & Suites is a hotel on Ipaja Road, Alimosho, Lagos, known for clean rooms, helpful staff and an easy location.",
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
    body: "A big gated compound with plenty of parking, set back from the noise of the road.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Place2Be"
        lines={["A good hideout", "in the city."]}
        intro="That's how one guest described us, and we haven't found a better way to put it."
        image={media.exteriorPortrait}
      />

      <section className="band-day py-24 md:py-36" aria-label="Our promise">
        <div className="container-x">
          <ScrollHighlight
            as="h2"
            className="display max-w-[22ch] text-[clamp(2.1rem,4.8vw,4.5rem)] leading-[1.08]"
            text="A clean room, a good meal, a helpful face at the front desk at any hour, and a quiet night's sleep. That's the promise, every stay."
          />
        </div>
      </section>

      {/* TODO: replace with the hotel's own story (founding year, owners, what the name means to them). */}
      <FeatureBlock
        lines={["A hotel built", "for rest."]}
        image={media.facadeSign}
        secondary={media.reception}
        body={
          <>
            <p>
              Place2Be Hotel &amp; Suites sits on Ipaja Road in Alimosho, close to Iyana-Ipaja: a smart three-storey building inside a large gated compound. Upstairs are the rooms and suites. Downstairs are the reception, the restaurant, the bar and lounge, and an outdoor pool with our name tiled into its floor.
            </p>
            <p>
              We keep it simple: clean, comfortable rooms, good food, staff who are glad to help, and a calm place to rest at the end of the day.
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

      <section className="band-night py-4 md:py-5" aria-label="At the hotel">
        <VelocityMarquee
          baseVelocity={2}
          className="display text-[clamp(1.4rem,2.6vw,2.4rem)] leading-none text-marble"
          items={["Clean, always", "Help at any hour", "Room to breathe", "Ipaja Road, Lagos"]}
        />
      </section>
      <LocationBand />
      <BookCta />
    </>
  );
}
