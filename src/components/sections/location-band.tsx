import Link from "next/link";
import { MapPin } from "lucide-react";

import { hotel } from "@/content/hotel";
import { media } from "@/content/media";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { RevealText } from "@/components/motion/reveal-text";
import { Button } from "@/components/ui/button";

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
        <div className="grid grid-cols-5 gap-4 md:col-span-6 lg:col-span-7">
          <ParallaxImage image={media.exteriorStreet} className="col-span-3 aspect-[4/3] self-end rounded-[2px]" sizes="(min-width: 768px) 30vw, 60vw" />
          <ParallaxImage image={media.exteriorPortrait} className="col-span-2 aspect-[9/16] rounded-[2px]" sizes="(min-width: 768px) 20vw, 40vw" />
        </div>
      </div>
    </section>
  );
}
