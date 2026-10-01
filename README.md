# Place2Be Hotel & Suites website

A multi-page website for Place2Be Hotel & Suites, Ipaja Road, Lagos. Built with Next.js 16
(App Router), TypeScript, Tailwind CSS v4, shadcn/ui conventions and Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Deploy: push to GitHub and import the repo in Vercel (no settings needed). Set
`NEXT_PUBLIC_SITE_URL` to the live domain so the sitemap, canonical URLs and social cards use it.

## Pages

| Route | What's there |
|---|---|
| `/` | Hero with pool video and cycling particle text, GlyphPortal dive into the pool, amenities grid, room slider, StackSpread photo scatter, reviews slider, location, booking CTA |
| `/rooms`, `/rooms/[slug]` | Filterable room grid; room pages with gallery lightbox and a sticky booking card |
| `/dining` | Restaurant, bar & lounge, breakfast, room service |
| `/experiences` | Pinned scroll story (pool, lounge, balcony, gym, services) plus the full amenities list |
| `/gallery` | StackSpread intro, filterable masonry grid, swipeable lightbox, video tour |
| `/about` | Story, values, all guest reviews, location |
| `/contact` | Contact options, map, directions, message form (sends via WhatsApp) |
| `/book` | Three-step booking request that opens WhatsApp with the details filled in |

## Where things live

- `src/content/hotel.ts`: every hotel fact (address, phone, amenities, reviews). Edit here, it updates everywhere.
- `src/content/rooms.ts`: room types, descriptions, prices (`fromPrice` and `priceConfirmed`).
- `src/content/media.ts`: every image and video. Swap a `src` to replace a photo across the site.
- `src/components/ui/`: shadcn-style primitives and the three effect components
  (`glyph-portal.tsx`, `stack-spread.tsx`, `vapour-text-effect.tsx`).
- `src/components/sections/`: page sections. New effects can drop in as new section components.
- `design-system/MASTER.md`: palette, type, motion rules (from ui-ux-pro-max, revised).

The shadcn registry wasn't reachable from the build environment, so `components.json`,
`src/lib/utils.ts` and the UI primitives were set up by hand following shadcn's conventions.
`npx shadcn add <component>` works as normal from now on.

## Before launch: confirm with the hotel

- [ ] Room rates: set `fromPrice` and `priceConfirmed: true` per room (cards show "Ask for today's rate" until then)
- [ ] Bed sizes and the differences between Deluxe and Royale (`src/content/rooms.ts`)
- [ ] Check-in and check-out times
- [ ] Reservations email address, Instagram and Facebook links
- [ ] Exact map coordinates (`hotel.geo`)
- [ ] The hotel's own story for the About page (founding year, owners)
- [ ] Is the pool with the brick wall and loungers (`pool-poolside-guests.jpg`, `pool-square.jpg`) the current pool, or an older photo?
- [ ] Replace the illustrative stock photos (restaurant, breakfast, cocktails, gym) with real ones
- [ ] Higher-resolution photography: most source photos are 480×360. They're upscaled and framed to hide it, but new photos will lift the site the most
- [ ] Newsletter signup: connect a mailing-list provider (`src/components/site/newsletter-form.tsx`)
- [ ] Online payments or a booking engine (e.g. Paystack): replace the WhatsApp hand-off in `booking-form.tsx`
