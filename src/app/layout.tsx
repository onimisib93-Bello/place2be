import type { Metadata, Viewport } from "next";

import "./globals.css";
import { bodoni, hanken } from "@/lib/fonts";
import { hotel, amenities } from "@/content/hotel";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { OfferPopup } from "@/components/site/offer-popup";
import { Preloader, preloaderScript } from "@/components/site/preloader";
import { Cursor } from "@/components/site/cursor";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://place2behotel.com"; // TODO: set the live domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Place2Be Hotel & Suites | Hotel in Ipaja, Alimosho, Lagos",
    template: "%s | Place2Be Hotel & Suites",
  },
  description:
    "Hotel and suites on Ipaja Road, Alimosho, Lagos. Comfortable rooms with free breakfast, Wi-Fi and parking, a restaurant and bar, 24-hour front desk and an outdoor pool. Book direct for free cancellation.",
  openGraph: {
    type: "website",
    siteName: hotel.name,
    locale: "en_NG",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Place2Be Hotel & Suites, Ipaja Road, Lagos" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#071f22",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: hotel.name,
  url: siteUrl,
  telephone: hotel.phone.tel,
  image: [`${siteUrl}/media/pool/pool-letters.jpg`, `${siteUrl}/media/rooms/deluxe-gold-1.jpg`],
  address: {
    "@type": "PostalAddress",
    streetAddress: hotel.address.street,
    addressLocality: hotel.address.area,
    addressRegion: hotel.address.city,
    postalCode: hotel.address.postalCode,
    addressCountry: hotel.address.countryCode,
  },
  geo: { "@type": "GeoCoordinates", latitude: hotel.geo.lat, longitude: hotel.geo.lng },
  smokingAllowed: false,
  amenityFeature: amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a.title, value: true })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG" className={`${bodoni.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-gold focus:px-4 focus:py-3 focus:text-abyss"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
          <OfferPopup />
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
