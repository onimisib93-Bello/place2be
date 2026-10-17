"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import type { MediaImage } from "@/content/media";

/** next/image for a MediaImage: stock images skip the optimizer and fall back to a hotel photo if they fail. */
export function SmartImage({ image, ...props }: { image: MediaImage } & Omit<ImageProps, "src" | "alt">) {
  const [src, setSrc] = useState(image.src);
  return (
    <Image
      {...props}
      src={src}
      alt={image.alt}
      unoptimized={image.kind === "stock" && src === image.src}
      onError={() => {
        if (image.fallback && src !== image.fallback) setSrc(image.fallback);
      }}
    />
  );
}
