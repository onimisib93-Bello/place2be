import { preload } from "react-dom";
import { HomeHero } from "@/components/sections/home-hero";
import { PoolPortal } from "@/components/sections/pool-portal";
import { AmenitiesGrid } from "@/components/sections/amenities-grid";
import { RoomsCarousel } from "@/components/sections/rooms-carousel";
import { LifeStack } from "@/components/sections/life-stack";
import { ReviewsSlider } from "@/components/sections/reviews-slider";
import { LocationBand } from "@/components/sections/location-band";
import { BookCta } from "@/components/sections/book-cta";

export default function HomePage() {
  // The hero video poster is the LCP element
  preload("/media/video/pool-loop-poster.jpg", { as: "image", fetchPriority: "high" });
  return (
    <>
      <HomeHero />
      <PoolPortal />
      <AmenitiesGrid limit={8} />
      <RoomsCarousel />
      <LifeStack />
      <ReviewsSlider />
      <LocationBand />
      <BookCta />
    </>
  );
}
