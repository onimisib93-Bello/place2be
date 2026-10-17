import type { ReactNode } from "react";

import type { MediaImage } from "@/content/media";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { RevealText } from "@/components/motion/reveal-text";
import { cn } from "@/lib/utils";

type Props = {
  lines: string[];
  body: ReactNode;
  image: MediaImage;
  secondary?: MediaImage;
  flip?: boolean;
  tone?: "day" | "night";
  children?: ReactNode;
  note?: string;
};

/** Editorial image + text block. Alternate `flip` down a page for rhythm. */
export function FeatureBlock({ lines, body, image, secondary, flip, tone = "day", children, note }: Props) {
  return (
    <section className={cn(tone === "day" ? "band-day" : "band-night", "py-20 md:py-32")}>
      <div className="container-x grid items-center gap-12 md:grid-cols-12 md:gap-10">
        <div className={cn("relative md:col-span-7", flip && "md:order-2")}>
          <ParallaxImage image={image} className="aspect-[5/4] w-full rounded-[2px]" sizes="(min-width: 768px) 55vw, 92vw" />
          {secondary && (
            <ParallaxImage
              image={secondary}
              strength={16}
              className={cn(
                "absolute -bottom-10 hidden aspect-[3/4] w-[34%] rounded-[2px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:block",
                flip ? "-left-8" : "-right-8",
              )}
              sizes="20vw"
            />
          )}
          {note && <p className={cn("mt-3 text-sm", tone === "day" ? "text-vein/50" : "text-marble/45")}>{note}</p>}
        </div>
        <div className={cn("md:col-span-5", flip ? "md:order-1 md:pr-8" : "md:pl-10")}>
          <RevealText className="display text-[clamp(2.3rem,4.6vw,4rem)]" lines={lines} />
          <div className={cn("mt-6 space-y-4 text-lg", tone === "day" ? "text-vein/75" : "text-marble/75")}>{body}</div>
          {children}
        </div>
      </div>
    </section>
  );
}
