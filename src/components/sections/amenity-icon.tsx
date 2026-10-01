import {
  Bus,
  Car,
  Clock,
  Coffee,
  ConciergeBell,
  Dumbbell,
  Shirt,
  ShieldCheck,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wine,
  type LucideProps,
} from "lucide-react";

import type { AmenityKey } from "@/content/hotel";

const map = {
  pool: Waves,
  breakfast: Coffee,
  parking: Car,
  wifi: Wifi,
  fitness: Dumbbell,
  bar: Wine,
  restaurant: UtensilsCrossed,
  roomService: ConciergeBell,
  frontDesk: Clock,
  laundry: Shirt,
  shuttle: Bus,
  security: ShieldCheck,
} satisfies Record<AmenityKey, React.ComponentType<LucideProps>>;

export function AmenityIcon({ name, ...props }: { name: AmenityKey } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden strokeWidth={1.4} {...props} />;
}
