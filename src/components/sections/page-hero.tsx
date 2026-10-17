import type { ReactNode } from "react";

import { RevealText } from "@/components/motion/reveal-text";
import { ParallaxImage } from "@/components/motion/parallax-image";
import type { MediaImage } from "@/content/media";

type Props = {
  kicker: string;
  lines: string[];
  intro?: ReactNode;
  image?: MediaImage;
  children?: ReactNode;
};

/** Night-band page header: masked headline on the left, a framed photo on the right. */
export function PageHero({ kicker, lines, intro, image, children }: Props) {
  return (
    <section className="band-night relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(50% 60% at 85% 30%, rgba(60,198,208,0.12), transparent 70%)" }}
      />
      <div className="container-x grid min-h-[78svh] items-end gap-12 pb-16 pt-32 md:grid-cols-12 md:pb-20 md:pt-40">
        <div className={image ? "md:col-span-7" : "md:col-span-10"}>
          <p className="fade-up mb-6 text-marble/65" style={{ animationDelay: "var(--intro)" }}>
            {kicker}
          </p>
          <RevealText as="h1" immediate delay={0.05} className="display text-[clamp(3rem,8.5vw,7.5rem)]" lines={lines} />
          {intro && (
            <div className="fade-up mt-8 max-w-xl text-lg text-marble/75" style={{ animationDelay: "calc(var(--intro) + 0.35s)" }}>
              {intro}
            </div>
          )}
          {children}
        </div>
        {image && (
          <div className="md:col-span-5">
            <ParallaxImage image={image} priority className="aspect-[4/5] w-full rounded-[2px]" sizes="(min-width: 768px) 38vw, 92vw" />
          </div>
        )}
      </div>
    </section>
  );
}
