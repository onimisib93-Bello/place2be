import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { FeatureBlock } from "@/components/sections/feature-block";
import { BookCta } from "@/components/sections/book-cta";
import { Button } from "@/components/ui/button";
import { media } from "@/content/media";
import { whatsappLink } from "@/content/hotel";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Restaurant, bar and lounge, room service and free breakfast at Place2Be Hotel & Suites on Ipaja Road, Lagos.",
};

const illustrative = "Illustrative photo";

export default function DiningPage() {
  return (
    <>
      <PageHero
        kicker="Dining"
        lines={["Eat well,", "stay a while."]}
        intro="A restaurant for proper meals, a bar by the pool for long evenings, and breakfast every morning at no extra cost."
        image={media.poolStage}
      />

      <FeatureBlock
        lines={["The restaurant"]}
        image={media.diningTable}
        note={illustrative}
        body={
          <>
            <p>Sit down to a full meal after a long day on the road or in meetings. The kitchen cooks local favourites and continental plates.</p>
            <p>Not sure what&apos;s on today? Ask the front desk, or message us before you arrive.</p>
          </>
        }
      >
        <Button asChild variant="outlineDark" className="mt-8">
          <a href={whatsappLink("Hello Place2Be, what's on the menu today?")} target="_blank" rel="noopener noreferrer">
            Ask about today&apos;s menu
          </a>
        </Button>
      </FeatureBlock>

      <FeatureBlock
        flip
        tone="night"
        lines={["Bar & lounge,", "by the water."]}
        image={media.poolGuests}
        secondary={media.cocktails}
        body={
          <>
            <p>
              The bar and lounge sit beside the pool. Guests talk about the &ldquo;good music and good view&rdquo;, and it&apos;s where many evenings end.
            </p>
            <p>Order a drink from the bar, take a lounger, and stay as long as you like.</p>
          </>
        }
      />

      <FeatureBlock
        lines={["Breakfast,", "on the house."]}
        image={media.breakfast}
        note={illustrative}
        body={<p>Every room includes breakfast. Come down in the morning, or ask the front desk about having it brought up.</p>}
      />

      <FeatureBlock
        flip
        lines={["Room service"]}
        image={media.roomStandardDeluxe}
        body={<p>Prefer to stay in? Order from your room and we&apos;ll bring dinner up. Call the front desk any time, day or night.</p>}
      />

      <BookCta lines={["Hungry already?"]} body="Book a room and breakfast is on us every morning of your stay." image={media.poolStage} />
    </>
  );
}
