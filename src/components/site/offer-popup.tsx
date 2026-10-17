"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { media } from "@/content/media";

const KEY = "p2b-offer-dismissed";

/** One-time "book direct" popup: after 25s or on exit intent. Never on /book. */
export function OfferPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/book") return;
    let seen = false;
    try {
      seen = !!localStorage.getItem(KEY);
    } catch {}
    if (seen) return;

    const show = () => {
      try {
        if (localStorage.getItem(KEY)) return;
        localStorage.setItem(KEY, "1");
      } catch {}
      setOpen(true);
    };
    const timer = window.setTimeout(show, 25000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.scrollY > 600) show();
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(timer);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl overflow-hidden p-0 sm:p-0">
        <div className="grid md:grid-cols-2">
          <div className="relative hidden min-h-80 md:block">
            <Image src={media.poolWaterfall.src} alt={media.poolWaterfall.alt} fill sizes="400px" className="object-cover" />
          </div>
          <div className="flex flex-col gap-5 p-7 sm:p-10">
            <DialogTitle className="text-4xl">Book direct, keep it flexible</DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-vein/75">
              Book with us rather than a travel site and you can cancel free of charge up to a day before you arrive.
              Breakfast is included, and parking and Wi-Fi are free.
            </DialogDescription>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button asChild variant="night" onClick={() => setOpen(false)}>
                <Link href="/book">Check availability</Link>
              </Button>
              <Button variant="outlineDark" onClick={() => setOpen(false)}>
                Maybe later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
