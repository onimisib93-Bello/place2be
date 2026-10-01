import type { MetadataRoute } from "next";

import { rooms } from "@/content/rooms";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://place2behotel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/rooms", "/dining", "/experiences", "/gallery", "/about", "/contact", "/book"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...rooms.map((r) => ({ url: `${base}/rooms/${r.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
