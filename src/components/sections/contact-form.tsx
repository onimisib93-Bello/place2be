"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/content/hotel";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  phone: z.string().trim().min(7, "Enter a phone number we can reach you on"),
  message: z.string().trim().min(5, "Tell us how we can help"),
});
type Values = z.infer<typeof schema>;

/** Sends the message to the front desk via WhatsApp (no backend required). */
export function ContactForm() {
  const { register, handleSubmit, formState } = useForm<Values>({ resolver: zodResolver(schema) });
  const e = formState.errors;

  const onSubmit = (v: Values) => {
    const text = `Hello Place2Be,\n\n${v.message}\n\nName: ${v.name}\nPhone: ${v.phone}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="c-name">Name</Label>
        <Input id="c-name" autoComplete="name" aria-invalid={!!e.name} aria-describedby={e.name ? "c-name-err" : undefined} {...register("name")} />
        {e.name && <p id="c-name-err" className="text-sm text-destructive">{e.name.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="c-phone">Phone</Label>
        <Input id="c-phone" type="tel" autoComplete="tel" aria-invalid={!!e.phone} aria-describedby={e.phone ? "c-phone-err" : undefined} {...register("phone")} />
        {e.phone && <p id="c-phone-err" className="text-sm text-destructive">{e.phone.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="c-msg">Message</Label>
        <Textarea id="c-msg" aria-invalid={!!e.message} aria-describedby={e.message ? "c-msg-err" : undefined} {...register("message")} />
        {e.message && <p id="c-msg-err" className="text-sm text-destructive">{e.message.message}</p>}
      </div>
      <Button type="submit" variant="night" size="lg" className="justify-self-start">
        Send on WhatsApp
      </Button>
      <p className="text-sm text-vein/60">This opens WhatsApp with your message ready to send to the front desk.</p>
    </form>
  );
}
