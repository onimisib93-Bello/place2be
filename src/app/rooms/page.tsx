import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { RoomsBrowser } from "@/components/sections/rooms-browser";
import { BookCta } from "@/components/sections/book-cta";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Standard, Standard Deluxe, Deluxe and Royale rooms at Place2Be Hotel & Suites, Ipaja Road, Lagos. Breakfast, Wi-Fi and parking included.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        kicker="Rooms & Suites"
        lines={["Rooms made", "for rest."]}
        intro="Four room types, each with air conditioning, free Wi-Fi and breakfast included. Pick the one that fits who you're travelling with."
        image={media.roomStandard}
      />
      <RoomsBrowser />
      <BookCta lines={["Not sure which", "room to choose?"]} body="Message the front desk on WhatsApp. Tell us who's coming and for how long, and we'll suggest the right room." image={media.roomStandardDeluxe} />
    </>
  );
}
