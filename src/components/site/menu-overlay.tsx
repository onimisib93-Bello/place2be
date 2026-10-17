"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Phone, X } from "lucide-react";

import { hotel, whatsappLink } from "@/content/hotel";
import { navLinks } from "./nav";

const ease = [0.22, 1, 0.36, 1] as const;

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [hovered, setHovered] = useState(0);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Content forceMount asChild aria-describedby={undefined}>
              <motion.div
                id="site-menu"
                data-lenis-prevent
                className="fixed inset-0 z-[60] overflow-y-auto bg-abyss text-marble"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.7, ease }}
              >
                <DialogPrimitive.Title className="sr-only">Site menu</DialogPrimitive.Title>
                <DialogPrimitive.Close
                  className="fixed right-4 top-4 z-[62] grid size-11 cursor-pointer place-items-center rounded-full border border-marble/25 hover:border-marble/60 md:right-8 md:top-5"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </DialogPrimitive.Close>
                <div className="container-x grid min-h-full grid-cols-1 gap-10 pb-10 pt-28 md:grid-cols-12 md:pt-32">
                  <nav aria-label="Menu" className="md:col-span-7">
                    <ul className="flex flex-col gap-1">
                      {[{ href: "/", label: "Home", image: navLinks[3].image }, ...navLinks, { href: "/book", label: "Book your stay", image: navLinks[0].image }].map((l, i) => (
                        <li key={l.href} className="overflow-hidden">
                          <motion.div
                            initial={{ y: "105%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 0.8, ease, delay: 0.18 + i * 0.05 }}
                          >
                            <Link
                              href={l.href}
                              onClick={onClose}
                              onMouseEnter={() => setHovered(i)}
                              onFocus={() => setHovered(i)}
                              className="display group flex items-baseline gap-4 py-1 text-[clamp(2.4rem,7vw,5rem)] text-marble/85 transition-colors hover:text-gold focus-visible:text-gold"
                            >
                              {l.label}
                            </Link>
                          </motion.div>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <motion.aside
                    className="flex flex-col justify-between gap-10 md:col-span-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                  >
                    <div className="relative hidden aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm md:block">
                      {[{ image: navLinks[3].image }, ...navLinks, { image: navLinks[0].image }].map((l, i) => (
                        <Image
                          key={i}
                          src={l.image.src}
                          alt=""
                          fill
                          sizes="380px"
                          className="object-cover transition-[opacity,transform] duration-700"
                          style={{ opacity: hovered === i ? 1 : 0, transform: hovered === i ? "scale(1)" : "scale(1.06)" }}
                        />
                      ))}
                    </div>
                    <div className="space-y-4 text-marble/80">
                      <p className="flex items-start gap-3">
                        <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                        <span>{hotel.address.full}</span>
                      </p>
                      <p className="flex items-center gap-3">
                        <Phone className="size-4 shrink-0 text-gold" aria-hidden />
                        <a href={`tel:${hotel.phone.tel}`} className="link-underline">{hotel.phone.display}</a>
                      </p>
                      <a
                        href={whatsappLink("Hello Place2Be, I'd like to make an enquiry.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-block text-marble"
                      >
                        Chat with us on WhatsApp
                      </a>
                    </div>
                  </motion.aside>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
