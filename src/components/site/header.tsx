"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Wordmark } from "./wordmark";
import { MenuOverlay } from "./menu-overlay";
import { navLinks } from "./nav";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 400 && y > prev && !open);
  });

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-marble transition-[background-color,backdrop-filter,box-shadow] duration-500",
          solid && !open ? "bg-abyss/85 shadow-[0_1px_0_rgba(241,242,238,0.08)] backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Link href="/" aria-label="Place2Be Hotel and Suites, home" className="relative z-[61] -ml-1 rounded px-1">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.95rem]">
              {navLinks.map((l) => {
                const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={cn("link-underline py-2 text-marble/80 transition-colors hover:text-marble", active && "text-marble [background-size:100%_1px]")}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-[61] flex items-center gap-2">
            <Button asChild size="sm" variant="gold" className="hidden sm:inline-flex">
              <Link href="/book">Book direct</Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="group grid size-11 cursor-pointer place-items-center rounded-full border border-marble/25 transition-colors hover:border-marble/60 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300", open && "top-1.5 rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300", open && "bottom-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
