"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { cn } from "@/lib/utils";

function Calendar({ className, style, ...props }: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      data-slot="calendar"
      className={cn("p-1 text-sm text-vein", className)}
      style={
        {
          "--rdp-accent-color": "var(--abyss)",
          "--rdp-accent-background-color": "color-mix(in oklab, var(--pool) 22%, white)",
          "--rdp-today-color": "var(--gold)",
          "--rdp-day-height": "40px",
          "--rdp-day-width": "40px",
          "--rdp-day_button-height": "38px",
          "--rdp-day_button-width": "38px",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Calendar };
