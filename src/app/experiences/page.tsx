import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { StickyStory, type StoryChapter } from "@/components/sections/sticky-story";
import { AmenitiesGrid } from "@/components/sections/amenities-grid";
import { BookCta } from "@/components/sections/book-cta";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Outdoor pool and poolside lounge, fitness centre, laundry, local shuttle and a 24-hour front desk at Place2Be Hotel & Suites, Lagos.",
};

const chapters: StoryChapter[] = [
  {
    title: "The pool",
    body: "Clean, clear water in front of a black-marble water feature, with our name tiled into the floor. Not too big, and as one guest put it, definitely worth a swim.",
    image: media.poolWaterfall,
  },
  {
    title: "The lounge",
    body: "Loungers along the wall, turf underfoot and music in the evening. This is where guests unwind after a long day.",
    image: media.poolGuests,
  },
  {
    title: "The balcony",
    body: "Look down over the water from the upper balcony, with seating for a quiet drink or a phone call away from the room.",
    image: media.balcony,
  },
  {
    title: "Fitness centre",
    body: "Keep your routine while you're away. The gym is open to every guest at no extra cost.",
    image: media.gym,
  },
  {
    title: "Around the clock",
    body: "A 24-hour front desk, full-service laundry and a local shuttle the front desk can arrange. Security watches the compound day and night.",
    image: media.reception,
  },
];

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        kicker="Experiences"
        lines={["Days by the water,", "nights with music."]}
        intro="The pool is the heart of Place2Be. Around it you'll find the lounge, the balcony, the gym and a front desk that never closes."
        image={media.poolAerial}
      />
      <StickyStory chapters={chapters} />
      <AmenitiesGrid />
      <BookCta lines={["The water's", "waiting."]} image={media.poolLetters} />
    </>
  );
}
