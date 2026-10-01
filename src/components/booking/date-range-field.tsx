"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  tone?: "light" | "dark";
  id?: string;
  invalid?: boolean;
  className?: string;
};

export function DateRangeField({ value, onChange, tone = "light", id, invalid, className }: Props) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const label =
    value?.from && value?.to
      ? `${format(value.from, "EEE d MMM")} to ${format(value.to, "EEE d MMM")}`
      : value?.from
        ? `${format(value.from, "EEE d MMM")}, choose check-out`
        : "Choose your dates";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={id}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-12 w-full cursor-pointer items-center gap-3 rounded-md border px-4 text-left text-base transition-colors",
          tone === "dark"
            ? "border-marble/25 bg-marble/5 text-marble hover:border-marble/50"
            : "border-input bg-white/70 text-vein hover:border-vein/50",
          invalid && "border-destructive",
          className,
        )}
      >
        <CalendarDays className={cn("size-4 shrink-0", tone === "dark" ? "text-gold" : "text-vein/60")} aria-hidden />
        <span className={cn("truncate", !value?.from && "opacity-70")}>{label}</span>
      </PopoverTrigger>
      <PopoverContent className="p-2">
        <Calendar
          mode="range"
          numberOfMonths={1}
          selected={value}
          onSelect={(r) => {
            onChange(r);
            if (r?.from && r?.to && r.from.getTime() !== r.to.getTime()) setOpen(false);
          }}
          disabled={{ before: today }}
          startMonth={today}
          excludeDisabled
        />
      </PopoverContent>
    </Popover>
  );
}
