"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  if (done) {
    return <p className="text-marble/80" role="status">You&apos;re on the list. We&apos;ll write when there&apos;s something worth sharing.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: connect to the hotel's mailing list provider.
        setDone(true);
      }}
      className="flex flex-col gap-3"
    >
      <label htmlFor="newsletter-email" className="text-sm text-marble/60">
        Offers and news from the hotel, once a month
      </label>
      <div className="flex gap-2 border-b border-marble/30 focus-within:border-gold">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="h-12 min-w-0 flex-1 bg-transparent text-marble placeholder:text-marble/40 focus:outline-none"
        />
        <button type="submit" className="h-12 cursor-pointer px-2 text-gold transition-colors hover:text-gold-soft">
          Subscribe
        </button>
      </div>
    </form>
  );
}
