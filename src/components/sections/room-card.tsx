import Link from "next/link";
import Image from "next/image";
import { BedDouble, Users } from "lucide-react";

import { formatNaira, type Room } from "@/content/rooms";
import { cn } from "@/lib/utils";

export function RoomRate({ room, className }: { room: Room; className?: string }) {
  return (
    <span className={className}>
      {room.fromPrice && room.priceConfirmed ? `From ${formatNaira(room.fromPrice)} a night` : "Ask for today's rate"}
    </span>
  );
}

export function RoomCard({ room, tone = "dark", sizes = "(min-width: 1024px) 30vw, 80vw", className }: { room: Room; tone?: "dark" | "light"; sizes?: string; className?: string }) {
  const img = room.images[0];
  return (
    <Link
      href={`/rooms/${room.slug}`}
      className={cn("group block focus-visible:outline-offset-4", className)}
      draggable={false}
    >
      <div className="grain relative aspect-[4/5] overflow-hidden rounded-[2px]">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          draggable={false}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent opacity-80" />
        <span className="absolute bottom-4 left-4 rounded-full bg-marble/90 px-3 py-1.5 text-sm text-abyss">
          <RoomRate room={room} />
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className={cn("display text-3xl transition-colors", tone === "dark" ? "text-marble group-hover:text-gold" : "text-vein group-hover:text-turf")}>
            {room.name}
          </h3>
          <p className={cn("mt-2 max-w-[34ch] text-[0.95rem]", tone === "dark" ? "text-marble/70" : "text-vein/70")}>{room.summary}</p>
        </div>
      </div>
      <div className={cn("mt-4 flex gap-5 text-sm", tone === "dark" ? "text-marble/60" : "text-vein/60")}>
        <span className="flex items-center gap-2"><Users className="size-4" aria-hidden />{room.sleeps}</span>
        <span className="flex items-center gap-2"><BedDouble className="size-4" aria-hidden />{room.bed}</span>
      </div>
    </Link>
  );
}
