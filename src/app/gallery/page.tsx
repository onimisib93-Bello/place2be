import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { LifeStack } from "@/components/sections/life-stack";
import { BookCta } from "@/components/sections/book-cta";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and a short video tour of Place2Be Hotel & Suites: the pool, lounge, rooms and property on Ipaja Road, Lagos.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        kicker="Gallery"
        lines={["Have a look", "around."]}
        intro="Every photo here was taken at Place2Be: the rooms, the pool, the lounge and the building on Ipaja Road."
      />
      <LifeStack />
      <GalleryGrid />
      <BookCta lines={["Seen enough?"]} body="Book direct and see it for yourself. Free cancellation up to a day before you arrive." image={media.poolWaterfall} />
    </>
  );
}
