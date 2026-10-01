"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";
import { differenceInCalendarDays, format } from "date-fns";

import type { Room } from "@/content/rooms";
import { whatsappLink } from "@/content/hotel";
import { Button } from "@/components/ui/button";
import { DateRangeField } from "@/components/booking/date-range-field";
import { RoomRate } from "./room-card";

export function RoomBookingCard({ room }: { room: Room }) {
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>();
  const nights = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0;

  const proceed = () => {
    const p = new URLSearchParams({ room: room.slug });
    if (range?.from) p.set("checkin", format(range.from, "yyyy-MM-dd"));
    if (range?.to) p.set("checkout", format(range.to, "yyyy-MM-dd"));
    router.push(`/book?${p.toString()}`);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-[0_30px_60px_-40px_rgba(7,31,34,0.5)] ring-1 ring-vein/10 sm:p-8">
      <p className="display text-3xl">{room.name}</p>
      <RoomRate room={room} className="mt-2 block text-vein/70" />
      <div className="mt-6 space-y-2">
        <label htmlFor="room-dates" className="text-sm font-medium">Your dates</label>
        <DateRangeField id="room-dates" value={range} onChange={setRange} />
        {nights > 0 && <p className="text-sm text-vein/70">{nights} {nights === 1 ? "night" : "nights"}, breakfast included</p>}
      </div>
      <Button variant="night" size="lg" className="mt-6 w-full" onClick={proceed}>
        Continue to booking
      </Button>
      <Button asChild variant="outlineDark" size="lg" className="mt-3 w-full">
        <a href={whatsappLink(`Hello Place2Be, I'd like to ask about the ${room.name}.`)} target="_blank" rel="noopener noreferrer">
          Ask on WhatsApp
        </a>
      </Button>
      <p className="mt-5 text-sm text-vein/60">Free cancellation up to a day before you arrive when you book direct.</p>
    </div>
  );
}
