import Link from "next/link";

import { HomeHero } from "@/components/sections/home-hero";
import { PoolPortal } from "@/components/sections/pool-portal";
import { RoomsCarousel } from "@/components/sections/rooms-carousel";
import { DayAtPlace2Be } from "@/components/sections/day-at-place2be";
import { AmenitiesGrid } from "@/components/sections/amenities-grid";
import { ExpandImage } from "@/components/sections/expand-image";
import { ReviewsSlider } from "@/components/sections/reviews-slider";
import { LifeStack } from "@/components/sections/life-stack";
import { ExploreList } from "@/components/sections/explore-list";
import { LocationBand } from "@/components/sections/location-band";
import { BookCta } from "@/components/sections/book-cta";
import { VelocityMarquee } from "@/components/motion/velocity-marquee";
import { ScrollHighlight } from "@/components/motion/scroll-highlight";
import { RevealText } from "@/components/motion/reveal-text";
import { Button } from "@/components/ui/button";
import { media } from "@/content/media";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PoolPortal />
      <RoomsCarousel />

      <section className="band-day border-y border-vein/10 py-8 md:py-10" aria-label="At the hotel">
        <VelocityMarquee
          className="display text-[clamp(2.5rem,6vw,5.5rem)] leading-none text-vein"
          items={["Rooms & suites", "Breakfast included", "Restaurant & bar", "24-hour front desk", "Outdoor pool", "Ipaja Road, Lagos"]}
        />
      </section>

      <DayAtPlace2Be />
      <AmenitiesGrid limit={8} />

      <ExpandImage image={media.facadeSign}>
        <RevealText className="display max-w-[14ch] text-[clamp(2.6rem,7vw,6.5rem)]" lines={["Everything", "under one roof."]} />
        <p className="mt-6 max-w-lg text-lg text-marble/85">
          Rooms and suites upstairs. Reception, restaurant, bar and pool downstairs. All inside a gated compound with free parking.
        </p>
        <div className="mt-8">
          <Button asChild variant="gold" size="lg">
            <Link href="/about">About the hotel</Link>
          </Button>
        </div>
      </ExpandImage>

      <section className="band-day py-24 md:py-40" aria-label="Why guests return">
        <div className="container-x">
          <ScrollHighlight
            as="h2"
            className="display max-w-[22ch] text-[clamp(2.1rem,4.8vw,4.5rem)] leading-[1.08]"
            text="Guests come back for clean rooms, staff who are glad to help, good food, an easy location and a calm place to rest at the end of the day."
          />
        </div>
      </section>

      <ReviewsSlider />
      <LifeStack />
      <ExploreList />
      <LocationBand />
      <BookCta />
    </>
  );
}
