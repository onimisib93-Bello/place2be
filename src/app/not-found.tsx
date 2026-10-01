import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="band-night relative grid min-h-[100svh] place-items-center overflow-hidden">
      <div aria-hidden data-word="404" className="ghost-word display pointer-events-none absolute select-none text-[42vw] leading-none text-marble/[0.04]" />
      <div className="container-x relative text-center">
        <h1 className="display text-[clamp(3rem,8vw,6.5rem)]">This page took a swim.</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-marble/70">
          The link may be old or mistyped. Head back to the home page, or go straight to booking.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outlineLight">
            <Link href="/book">Book your stay</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
