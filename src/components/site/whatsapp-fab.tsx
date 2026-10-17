"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

import { whatsappLink } from "@/content/hotel";

/** Floating WhatsApp button. Appears once the visitor scrolls past the first screen, so it never covers hero CTAs. */
export function WhatsAppFab() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > window.innerHeight * 0.8));

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappLink("Hello Place2Be, I'd like to ask about a room.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Place2Be on WhatsApp"
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="group fixed bottom-5 right-5 z-40 flex h-14 cursor-pointer items-center gap-2 rounded-full bg-[#1f7a4d] pl-4 pr-5 text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)] transition-colors hover:bg-[#25935c] md:bottom-8 md:right-8"
        >
          <MessageCircle className="size-6" aria-hidden />
          <span className="text-sm font-medium max-sm:sr-only">WhatsApp us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
