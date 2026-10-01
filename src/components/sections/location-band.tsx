import Link from "next/link";
import { MapPin } from "lucide-react";

import { hotel } from "@/content/hotel";
import { media } from "@/content/media";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { RevealText } from "@/components/motion/reveal-text";
import { Button } from "@/components/ui/button";
import { HotelMap } from "./hotel-map";

export function LocationBand() {
  return (
    <section className="band-day py-24 md:py-36" aria-label="Location">
      <div className="container-x grid items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-6 lg:col-span-5">
          <RevealText className="display text-[clamp(2.4rem,5.5vw,4.75rem)]" lines={["Right on", "Ipaja Road."]} />
          <p className="mt-6 max-w-md text-lg text-vein/75">
            Easy to find and easy to reach. Guests describe the location as &ldquo;very accessible&rdquo;, a stone&apos;s throw from Iyana-Ipaja.
          </p>
          <ul className="mt-8 space-y-3">
            {hotel.locationPoints.map((p) => (
              <li key={p} className="flex gap-3 text-vein/85">
                <span aria-hidden className="mt-[0.6rem] block size-1.5 shrink-0 rotate-45 bg-gold" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 flex items-start gap-3 text-vein/70">
            <MapPin className="mt-1 size-4 shrink-0" aria-hidden />
            {hotel.address.full}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="night">
              <a href={hotel.mapLink} target="_blank" rel="noopener noreferrer">Get directions</a>
            </Button>
            <Button asChild variant="outlineDark">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
        <div className="relative md:col-span-6 lg:col-span-7">
          <HotelMap className="aspect-[4/5] w-full sm:aspect-[4/3] md:aspect-[5/6] lg:aspect-[4/3]" />
          <ParallaxImage
            image={media.exteriorPortrait}
            className="absolute -bottom-8 -left-6 hidden aspect-[9/14] w-[26%] rounded-[2px] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] lg:block"
            sizes="16vw"
            strength={14}
          />
        </div>
      </div>
    </section>
  );
}
