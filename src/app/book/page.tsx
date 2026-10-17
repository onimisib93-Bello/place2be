import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHero } from "@/components/sections/page-hero";
import { BookingForm } from "@/components/booking/booking-form";
import { hotel } from "@/content/hotel";

export const metadata: Metadata = {
  title: "Book your stay",
  description:
    "Request a room at Place2Be Hotel & Suites, Lagos. Book direct for free cancellation up to a day before arrival, with breakfast, parking and Wi-Fi included.",
};

const perks = [
  "Free cancellation up to a day before you arrive",
  "Breakfast included every morning",
  "Free parking and Wi-Fi",
  "Talk to a real person at the front desk",
];

export default function BookPage() {
  return (
    <>
      <PageHero
        kicker="Book direct"
        lines={["Your stay,", "in three steps."]}
        intro="Choose your dates and room, leave your details, and send the request to our front desk on WhatsApp. We'll confirm availability and your rate."
      />
      <section className="band-day py-16 md:py-24" aria-label="Booking request">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-[40rem] animate-pulse rounded-lg bg-marble-2" />}>
              <BookingForm />
            </Suspense>
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-lg bg-abyss p-7 text-marble lg:sticky lg:top-28">
              <h2 className="display text-3xl">Why book direct</h2>
              <ul className="mt-6 space-y-4">
                {perks.map((p) => (
                  <li key={p} className="flex gap-3 text-marble/85">
                    <span aria-hidden className="mt-[0.6rem] block size-1.5 shrink-0 rotate-45 bg-gold" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-marble/15 pt-6 text-sm text-marble/70">
                <p>Prefer to call?</p>
                <a href={`tel:${hotel.phone.tel}`} className="display mt-1 block text-2xl text-gold">
                  {hotel.phone.display}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
