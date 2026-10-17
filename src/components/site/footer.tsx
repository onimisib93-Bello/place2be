import Link from "next/link";

import { hotel, whatsappLink } from "@/content/hotel";
import { navLinks } from "./nav";
import { Wordmark } from "./wordmark";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="band-night relative overflow-hidden">
      <div className="container-x grid gap-14 pb-10 pt-20 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-5">
          <Wordmark className="text-5xl md:text-6xl" />
          <p className="mt-6 max-w-sm text-marble/70">
            A hotel and suites on Ipaja Road, Lagos. Comfortable rooms, attentive staff and everything you need under one roof.
          </p>
          <div className="mt-10 max-w-sm">
            <NewsletterForm />
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="mb-5 text-sm text-marble/50">Explore</h2>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-marble/85 hover:text-marble">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="link-underline text-gold">
                Book your stay
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="mb-5 text-sm text-marble/50">Visit</h2>
          <address className="space-y-3 not-italic text-marble/85">
            <p>{hotel.address.full}</p>
            <p>
              <a href={`tel:${hotel.phone.tel}`} className="link-underline">
                {hotel.phone.display}
              </a>
            </p>
            <p>
              <a href={whatsappLink("Hello Place2Be, I'd like to make an enquiry.")} target="_blank" rel="noopener noreferrer" className="link-underline">
                WhatsApp
              </a>
            </p>
            <p>
              <a href={hotel.mapLink} target="_blank" rel="noopener noreferrer" className="link-underline">
                Get directions
              </a>
            </p>
          </address>
          <div className="mt-6 flex gap-6 text-sm text-marble/60">
            <a href={hotel.social.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a>
            <a href={hotel.social.facebook} target="_blank" rel="noopener noreferrer" className="link-underline">Facebook</a>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div data-word="Place2Be" className="ghost-word display translate-y-[18%] whitespace-nowrap text-center text-[22vw] leading-none text-marble/[0.04]" />
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-marble/10 py-6 text-sm text-marble/50 md:flex-row md:justify-between">
        <p>© {year} {hotel.name}. Smoke-free property.</p>
        <p>Check-in from {hotel.checkIn}. Check-out by {hotel.checkOut}.</p>
      </div>
    </footer>
  );
}
