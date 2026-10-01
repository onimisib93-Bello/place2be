"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";
import { Check, Minus, Plus } from "lucide-react";
import { motion } from "motion/react";

import { rooms } from "@/content/rooms";
import { whatsappLink } from "@/content/hotel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DateRangeField } from "./date-range-field";
import { cn } from "@/lib/utils";

const schema = z.object({
  range: z
    .object({ from: z.date().optional(), to: z.date().optional() })
    .optional()
    .refine((r) => !!r?.from && !!r?.to && differenceInCalendarDays(r.to, r.from) >= 1, "Choose a check-in and check-out date"),
  guests: z.number().min(1).max(6),
  room: z.string().min(1, "Choose a room"),
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().trim().min(7, "Enter a phone number we can reach you on"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email, or leave it blank")]),
  notes: z.string().max(600).optional(),
});
type Values = z.infer<typeof schema>;

const parse = (s: string | null) => {
  if (!s) return undefined;
  const d = parseISO(s);
  return isValid(d) ? d : undefined;
};

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-6 border-t border-vein/15 pt-8">
      <legend className="flex items-baseline gap-4 pb-2">
        <span className="display text-2xl text-gold" aria-hidden>{n}</span>
        <span className="display text-3xl">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return <p id={id} className="text-sm text-destructive">{msg}</p>;
}

export function BookingForm() {
  const sp = useSearchParams();
  const initialRoom = rooms.some((r) => r.slug === sp.get("room")) ? sp.get("room")! : "";
  const initialGuests = Math.min(6, Math.max(1, Number(sp.get("guests")) || 2));

  const { control, register, handleSubmit, formState } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      range: { from: parse(sp.get("checkin")), to: parse(sp.get("checkout")) },
      guests: initialGuests,
      room: initialRoom,
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
  });
  const e = formState.errors;
  const [sent, setSent] = useState<string | null>(null);
  const range = useWatch({ control, name: "range" });
  const nights = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0;

  const onSubmit = (v: Values) => {
    const room = rooms.find((r) => r.slug === v.room)!;
    const msg = [
      "Hello Place2Be, I'd like to book a room.",
      "",
      `Room: ${room.name}`,
      `Check-in: ${format(v.range!.from!, "EEE d MMM yyyy")}`,
      `Check-out: ${format(v.range!.to!, "EEE d MMM yyyy")} (${nights} ${nights === 1 ? "night" : "nights"})`,
      `Guests: ${v.guests}`,
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      v.email ? `Email: ${v.email}` : "",
      v.notes ? `Notes: ${v.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const url = whatsappLink(msg);
    // TODO: when a booking engine or payment provider (e.g. Paystack) is chosen, submit here instead.
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(url);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-12">
        <Step n={1} title="Your stay">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
            <div className="grid gap-2">
              <Label htmlFor="b-dates">Dates</Label>
              <Controller
                control={control}
                name="range"
                render={({ field }) => (
                  <DateRangeField
                    id="b-dates"
                    value={field.value?.from ? { from: field.value.from, to: field.value.to } : undefined}
                    onChange={(r) => field.onChange(r ? { from: r.from, to: r.to } : undefined)}
                    invalid={!!e.range}
                  />
                )}
              />
              {nights > 0 && <p className="text-sm text-vein/65">{nights} {nights === 1 ? "night" : "nights"}</p>}
              <FieldError id="b-dates-err" msg={e.range?.message} />
            </div>
            <div className="grid gap-2">
              <span className="text-sm font-medium" id="b-guests-label">Guests</span>
              <Controller
                control={control}
                name="guests"
                render={({ field }) => (
                  <div className="flex h-12 items-center gap-1 rounded-md border border-input bg-white/70 px-1" role="group" aria-labelledby="b-guests-label">
                    <button type="button" aria-label="Fewer guests" className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-vein/5 disabled:opacity-40" disabled={field.value <= 1} onClick={() => field.onChange(field.value - 1)}>
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-12 text-center tabular-nums" aria-live="polite">{field.value}</span>
                    <button type="button" aria-label="More guests" className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-vein/5 disabled:opacity-40" disabled={field.value >= 6} onClick={() => field.onChange(field.value + 1)}>
                      <Plus className="size-4" />
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </Step>

        <Step n={2} title="Your room">
          <Controller
            control={control}
            name="room"
            render={({ field }) => (
              <div role="radiogroup" aria-label="Room type" aria-describedby={e.room ? "b-room-err" : undefined} className="grid gap-3 sm:grid-cols-2">
                {rooms.map((r) => {
                  const selected = field.value === r.slug;
                  return (
                    <button
                      key={r.slug}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => field.onChange(r.slug)}
                      className={cn(
                        "relative flex cursor-pointer items-start gap-4 rounded-lg border bg-white/70 p-4 text-left transition-colors",
                        selected ? "border-abyss ring-1 ring-abyss" : "border-input hover:border-vein/50",
                      )}
                    >
                      <span className={cn("mt-1 grid size-5 shrink-0 place-items-center rounded-full border", selected ? "border-abyss bg-abyss text-marble" : "border-vein/30")}>
                        {selected && <Check className="size-3" />}
                      </span>
                      <span>
                        <span className="block font-medium">{r.name}</span>
                        <span className="mt-1 block text-sm text-vein/65">{r.sleeps}, {r.bed.toLowerCase()}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          />
          <FieldError id="b-room-err" msg={e.room?.message} />
        </Step>

        <Step n={3} title="Your details">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="b-name">Full name</Label>
              <Input id="b-name" autoComplete="name" aria-invalid={!!e.name} aria-describedby={e.name ? "b-name-err" : undefined} {...register("name")} />
              <FieldError id="b-name-err" msg={e.name?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="b-phone">Phone</Label>
              <Input id="b-phone" type="tel" autoComplete="tel" placeholder="080..." aria-invalid={!!e.phone} aria-describedby={e.phone ? "b-phone-err" : undefined} {...register("phone")} />
              <FieldError id="b-phone-err" msg={e.phone?.message} />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="b-email">Email (optional)</Label>
              <Input id="b-email" type="email" autoComplete="email" aria-invalid={!!e.email} aria-describedby={e.email ? "b-email-err" : undefined} {...register("email")} />
              <FieldError id="b-email-err" msg={e.email?.message} />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="b-notes">Anything we should know? (optional)</Label>
              <Textarea id="b-notes" placeholder="Arrival time, a celebration, a room on a quieter floor…" {...register("notes")} />
            </div>
          </div>
        </Step>

        <div className="flex flex-col gap-4 border-t border-vein/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-vein/65">
            Sending opens WhatsApp with your request filled in. The front desk will confirm availability and your rate. Nothing is charged now.
          </p>
          <Button type="submit" size="lg" variant="night" disabled={formState.isSubmitting}>
            Send booking request
          </Button>
        </div>
      </form>

      <Dialog open={!!sent} onOpenChange={(o) => !o && setSent(null)}>
        <DialogContent>
          <DialogHeader>
            <motion.span
              className="mb-2 grid size-14 place-items-center rounded-full bg-turf text-marble"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Check className="size-6" aria-hidden />
            </motion.span>
            <DialogTitle>Request ready to send</DialogTitle>
            <DialogDescription className="text-base">
              We&apos;ve opened WhatsApp with your booking request. Press send there, and the front desk will reply to confirm your room.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="night">
              <a href={sent ?? "#"} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a>
            </Button>
            <Button variant="outlineDark" onClick={() => setSent(null)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
