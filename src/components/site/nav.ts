import { media } from "@/content/media";

export const navLinks = [
  { href: "/rooms", label: "Rooms & Suites", image: media.roomDeluxe },
  { href: "/dining", label: "Dining", image: media.poolStage },
  { href: "/experiences", label: "Facilities", image: media.reception },
  { href: "/gallery", label: "Gallery", image: media.poolLetters },
  { href: "/about", label: "About", image: media.exteriorPortrait },
  { href: "/contact", label: "Contact", image: media.reception },
] as const;
