import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { hotel, whatsappLink } from "@/content/hotel";

export const metadata: Metadata = {
  title: "Contact & Location",
  description: `Call ${hotel.phone.display}, message us on WhatsApp, or find us at ${hotel.address.full}.`,
};

const ways = [
  { icon: Phone, title: "Call the front desk", detail: hotel.phone.display, href: `tel:${hotel.phone.tel}`, external: false },
  { icon: MessageCircle, title: "WhatsApp", detail: "Usually the fastest way to reach us", href: whatsappLink("Hello Place2Be, I have a question."), external: true },
  { icon: MapPin, title: "Visit", detail: hotel.address.full, href: hotel.mapLink, external: true },
  { icon: Clock, title: "Front desk hours", detail: "Open 24 hours, every day", href: undefined, external: false },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact & Location"
        lines={["We're up,", "day and night."]}
        intro="The front desk never closes. Call, message on WhatsApp or send a note below."
      />

      <section className="band-day py-16 md:py-24" aria-label="Ways to reach us">
        <div className="container-x">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((w) => {
              const inner = (
                <>
                  <w.icon className="size-6 text-turf" strokeWidth={1.5} aria-hidden />
                  <h2 className="mt-8 text-lg font-medium">{w.title}</h2>
                  <p className="mt-1 text-vein/70">{w.detail}</p>
                </>
              );
              return (
                <li key={w.title}>
                  {w.href ? (
                    <a
                      href={w.href}
                      {...(w.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block h-full rounded-lg bg-white p-6 ring-1 ring-vein/10 transition-shadow hover:shadow-[0_20px_40px_-25px_rgba(7,31,34,0.45)]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="h-full rounded-lg bg-white p-6 ring-1 ring-vein/10">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-vein/10 lg:aspect-auto lg:h-full lg:min-h-[32rem]">
                <iframe
                  title="Map showing Place2Be Hotel and Suites on Ipaja Road"
                  src={hotel.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <h2 className="display text-4xl">Getting here</h2>
              <ul className="mt-6 space-y-4 text-vein/80">
                <li>We&apos;re at Moshalashi Roundabout on Ipaja Road, a short ride from Iyana-Ipaja.</li>
                <li>Coming by car? Drive straight into the gated compound. Parking is free and there&apos;s plenty of it.</li>
                <li>Need a ride from nearby? Ask the front desk about the local shuttle.</li>
              </ul>
              <h2 className="display mt-14 text-4xl">Send a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
