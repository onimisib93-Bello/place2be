import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { StickyStory, type StoryChapter } from "@/components/sections/sticky-story";
import { AmenitiesGrid } from "@/components/sections/amenities-grid";
import { BookCta } from "@/components/sections/book-cta";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "24-hour front desk, fitness centre, laundry, local shuttle, outdoor pool and lounge at Place2Be Hotel & Suites, Ipaja Road, Lagos.",
};

const chapters: StoryChapter[] = [
  {
    title: "Around the clock",
    body: "The front desk is open 24 hours, so you can check in late, ask for anything and get help at any hour. Security watches the compound day and night.",
    image: media.reception,
  },
  {
    title: "Fitness centre",
    body: "Keep your routine while you're away. The gym is open to every guest at no extra cost.",
    image: media.gym,
  },
  {
    title: "Laundry & shuttle",
    body: "Full-service laundry, washed, pressed and returned to your room, and a local shuttle the front desk can arrange.",
    image: media.facadeBalcony,
  },
  {
    title: "The pool",
    body: "An outdoor pool for guests, in front of a black-marble water feature with our name tiled into the floor. Not too big, and as one guest put it, definitely worth a swim.",
    image: media.poolWaterfall,
  },
  {
    title: "Lounge & balcony",
    body: "Loungers by the water, music in the evening, and balcony seating upstairs for a quiet drink or a phone call away from the room.",
    image: media.balcony,
  },
];

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        kicker="Hotel facilities"
        lines={["More than", "a room."]}
        intro="Everything around your room is there to make the stay easier: a front desk that never closes, a fitness centre, laundry, a shuttle, and an outdoor pool and lounge for guests."
        image={media.reception}
      />
      <StickyStory chapters={chapters} />
      <AmenitiesGrid />
      <BookCta lines={["Your room", "is waiting."]} image={media.poolLetters} />
    </>
  );
}
