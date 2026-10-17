import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, Check, Users } from "lucide-react";

import { getRoom, rooms } from "@/content/rooms";
import { hotel } from "@/content/hotel";
import { PageHero } from "@/components/sections/page-hero";
import { RoomGallery } from "@/components/sections/room-gallery";
import { RoomBookingCard } from "@/components/sections/room-booking-card";
import { RoomCard } from "@/components/sections/room-card";
import { RevealText } from "@/components/motion/reveal-text";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  return {
    title: room.name,
    description: `${room.summary} ${room.sleeps}, ${room.bed.toLowerCase()}. Breakfast, Wi-Fi and parking included at Place2Be Hotel & Suites, Lagos.`,
    openGraph: { images: [{ url: room.images[0].src }] },
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();
  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  return (
    <>
      <PageHero kicker="Rooms & Suites" lines={[room.name]} intro={room.summary} image={room.images[0]}>
        <div className="mt-8 flex flex-wrap gap-6 text-marble/70">
          <span className="flex items-center gap-2"><Users className="size-4 text-gold" aria-hidden />{room.sleeps}</span>
          <span className="flex items-center gap-2"><BedDouble className="size-4 text-gold" aria-hidden />{room.bed}</span>
        </div>
      </PageHero>

      <section className="band-day py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RevealText className="display text-[clamp(2.2rem,4.5vw,3.75rem)]" lines={["About this room"]} />
            <div className="mt-8 max-w-[62ch] space-y-5 text-lg text-vein/80">
              {room.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className="display mt-16 text-3xl">In the room</h2>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {room.features.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-vein/10 pb-4 text-vein/85">
                  <Check className="size-4 shrink-0 text-turf" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            <h2 className="display mt-16 text-3xl">Photos</h2>
            <RoomGallery images={room.images} />

            <h2 className="display mt-16 text-3xl">Good to know</h2>
            <ul className="mt-6 space-y-3 text-vein/80">
              <li>Check-in from {hotel.checkIn}, check-out by {hotel.checkOut}.</li>
              {hotel.policies.map((p) => (
                <li key={p}>{p}.</li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <RoomBookingCard room={room} />
            </div>
          </aside>
        </div>
      </section>

      <section className="band-night py-20 md:py-28" aria-label="Other rooms">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 className="display text-[clamp(2.2rem,4.5vw,3.75rem)]">Other rooms</h2>
            <Link href="/rooms" className="link-underline text-marble/80">All rooms</Link>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((r) => (
              <RoomCard key={r.slug} room={r} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
