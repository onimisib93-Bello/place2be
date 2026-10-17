"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

import { hotel } from "@/content/hotel";
import { cn } from "@/lib/utils";

/**
 * Interactive, dark-styled map (Leaflet + CARTO tiles) with a pulsing gold marker.
 * Flies in from a city-wide view the first time it scrolls into sight.
 */
export function HotelMap({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const el = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    let map: import("leaflet").Map | null = null;
    let io: IntersectionObserver | null = null;
    let cancelled = false;

    // Load Leaflet only when the map is about to scroll into view.
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        near.disconnect();
        void init();
      },
      { rootMargin: "800px 0px" },
    );
    near.observe(node);

    const init = async () => {
      const L = await import("leaflet");
      if (cancelled) return;
      const { lat, lng } = hotel.geo;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      map = L.map(node, {
        center: [lat, lng],
        zoom: reduce ? 15 : 11,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: true,
      });
      L.control.zoom({ position: "bottomright" }).addTo(map);
      const style = tone === "dark" ? "dark_all" : "light_all";
      const tiles = L.tileLayer(`https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png`, {
        subdomains: "abcd",
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);
      let errors = 0;
      tiles.on("tileerror", () => {
        errors += 1;
        if (errors > 6) setFailed(true);
      });

      const icon = L.divIcon({
        className: "p2b-marker",
        html: '<span class="p2b-marker-pulse"></span><span class="p2b-marker-dot"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });
      L.marker([lat, lng], { icon, title: hotel.name, keyboard: true })
        .addTo(map)
        .bindPopup(
          `<strong>${hotel.name}</strong><br/>${hotel.address.full}<br/><a href="${hotel.mapLink}" target="_blank" rel="noopener noreferrer">Get directions</a>`,
          { className: "p2b-popup", closeButton: false, offset: [0, -8] },
        );

      if (!reduce) {
        io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting && map) {
              map.flyTo([lat, lng], 15, { duration: 2.4 });
              io?.disconnect();
            }
          },
          { threshold: 0.4 },
        );
        io.observe(node);
      }
    };

    return () => {
      cancelled = true;
      near.disconnect();
      io?.disconnect();
      map?.remove();
    };
  }, [tone]);

  return (
    <div className={cn("relative isolate overflow-hidden rounded-lg", tone === "dark" ? "bg-abyss-2" : "bg-marble-2", className)}>
      <div ref={el} className="absolute inset-0 z-0" role="region" aria-label={`Map showing ${hotel.name} at ${hotel.address.full}`} />
      {failed && (
        <div className="absolute inset-0 z-[500] grid place-items-center bg-abyss-2/85 p-6 text-center text-marble">
          <a href={hotel.mapLink} target="_blank" rel="noopener noreferrer" className="link-underline">
            Open the map in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}
