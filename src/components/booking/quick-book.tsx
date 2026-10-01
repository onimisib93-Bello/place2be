"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateRangeField } from "./date-range-field";

/** Compact booking bar: dates + guests, hands off to /book with the selection filled in. */
export function QuickBook() {
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ guests: String(guests) });
    if (range?.from) params.set("checkin", format(range.from, "yyyy-MM-dd"));
    if (range?.to) params.set("checkout", format(range.to, "yyyy-MM-dd"));
    router.push(`/book?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      aria-label="Check availability"
      className="grid w-full gap-3 rounded-xl border border-marble/15 bg-abyss-2/80 p-3 backdrop-blur-md sm:grid-cols-[1fr_auto_auto] sm:items-center"
    >
      <label className="sr-only" htmlFor="qb-dates">Dates</label>
      <DateRangeField id="qb-dates" value={range} onChange={setRange} tone="dark" />
      <div className="flex h-12 items-center justify-between gap-1 rounded-md border border-marble/25 px-2 text-marble sm:justify-start" role="group" aria-label="Guests">
        <button type="button" className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-marble/10 disabled:opacity-40" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} aria-label="Fewer guests">
          <Minus className="size-4" />
        </button>
        <span className="min-w-[5.5rem] text-center tabular-nums" aria-live="polite">
          {guests} {guests === 1 ? "guest" : "guests"}
        </span>
        <button type="button" className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-marble/10 disabled:opacity-40" onClick={() => setGuests((g) => Math.min(6, g + 1))} disabled={guests >= 6} aria-label="More guests">
          <Plus className="size-4" />
        </button>
      </div>
      <Button type="submit" size="default" className="w-full sm:w-auto">
        Check availability
      </Button>
    </form>
  );
}
