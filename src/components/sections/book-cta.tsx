import Link from "next/link";

import { whatsappLink } from "@/content/hotel";
import { media, type MediaImage } from "@/content/media";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { RevealText } from "@/components/motion/reveal-text";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";

export function BookCta({
  lines = ["Your room is ready", "when you are."],
  body = "Book direct for free cancellation up to a day before you arrive. Prefer to talk? Message the front desk on WhatsApp.",
  image = media.poolWater,
}: {
  lines?: string[];
  body?: string;
  image?: MediaImage;
}) {
  return (
    <section className="band-night relative isolate overflow-hidden" aria-label="Book your stay">
      <ParallaxImage image={image} className="absolute inset-0 -z-10" sizes="100vw" strength={8} reveal={false} imgClassName="opacity-45" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-abyss via-abyss/60 to-abyss" />
      <div className="container-x flex min-h-[80svh] flex-col items-start justify-center py-28">
        <RevealText className="display text-[clamp(2.8rem,8vw,7.5rem)]" lines={lines} />
        <p className="mt-8 max-w-lg text-lg text-marble/80">{body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Magnetic>
            <Button asChild size="lg">
              <Link href="/book">Book direct</Link>
            </Button>
          </Magnetic>
          <Button asChild size="lg" variant="outlineLight">
            <a href={whatsappLink("Hello Place2Be, I'd like to book a room.")} target="_blank" rel="noopener noreferrer">
              Message on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
