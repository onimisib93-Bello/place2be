/**
 * Single source of truth for hotel facts.
 * Anything marked TODO must be confirmed with the hotel before launch.
 */

export const hotel = {
  name: "Place2Be Hotel and Suites",
  shortName: "Place2Be",
  tagline: "Hotel and suites on Ipaja Road, Lagos",
  address: {
    street: "Moshalashi Roundabout, Ipaja Rd",
    area: "Alimosho",
    city: "Lagos",
    postalCode: "100266",
    country: "Nigeria",
    countryCode: "NG",
    full: "Moshalashi Roundabout, Ipaja Rd, Alimosho, Lagos 100266",
  },
  phone: {
    display: "0704 067 4660",
    tel: "+2347040674660",
    whatsapp: "2347040674660",
  },
  email: "reservations@place2behotel.com", // TODO: confirm real email address
  social: {
    instagram: "https://instagram.com/", // TODO: add real handle
    facebook: "https://facebook.com/", // TODO: add real page
  },
  geo: { lat: 6.6098338, lng: 3.2642852 }, // from the hotel's Google listing
  mapLink: "https://www.google.com/maps/dir/?api=1&destination=6.6098338,3.2642852",
  checkIn: "2:00 pm", // TODO: confirm
  checkOut: "12:00 noon", // TODO: confirm
  policies: [
    "Smoke-free property",
    "Free cancellation up to one day before arrival when you book direct",
  ],
  locationPoints: [
    "Right on Ipaja Road, a short ride from Iyana-Ipaja",
    "A large gated compound with plenty of free parking",
    "24-hour security and front desk",
  ],
} as const;

export type AmenityKey =
  | "pool"
  | "breakfast"
  | "parking"
  | "wifi"
  | "fitness"
  | "bar"
  | "restaurant"
  | "roomService"
  | "frontDesk"
  | "laundry"
  | "shuttle"
  | "security";

export const amenities: { key: AmenityKey; title: string; detail: string }[] = [
  { key: "frontDesk", title: "24-hour front desk", detail: "Check in late, ask early. Someone is always on duty." },
  { key: "breakfast", title: "Breakfast, free", detail: "Served every morning and included with every room." },
  { key: "wifi", title: "Wi-Fi, free", detail: "In every room and across the hotel." },
  { key: "parking", title: "Parking, free", detail: "A large gated compound with space for plenty of cars." },
  { key: "roomService", title: "Room service", detail: "Meals brought to your room, day or night." },
  { key: "restaurant", title: "Restaurant", detail: "Local and continental dishes, all day." },
  { key: "bar", title: "Bar & lounge", detail: "Drinks, music and somewhere to unwind after the day." },
  { key: "pool", title: "Outdoor pool", detail: "A clean, calm pool for guests, with loungers beside it." },
  { key: "fitness", title: "Fitness centre", detail: "Keep your routine while you're away." },
  { key: "laundry", title: "Full-service laundry", detail: "Washed, pressed and returned to your room." },
  { key: "shuttle", title: "Local shuttle", detail: "Ask the front desk to arrange a ride." },
  { key: "security", title: "Security", detail: "A gated compound watched day and night." },
];

export type Review = {
  name: string;
  rating: number;
  context?: string;
  source: string;
  quote: string;
};

/** Real guest reviews. Use verbatim (trimmed with "…" only). */
export const reviews: Review[] = [
  {
    name: "Ufuoma Johnson",
    rating: 5,
    source: "Google",
    quote:
      "The rooms were clean and of high standard, the staffs were amazing and ready to help, the manager was awesome and always available to help… the rooms and hotel is always fumigated. Will definitely visit again.",
  },
  {
    name: "Peter Oyeyemi",
    rating: 4,
    context: "Holiday, couple",
    source: "Google",
    quote:
      "First time spending the night there and trust me it was a very good experience! First went to the pool side to relax with good music and good view! And the pool is actually clean… definitely worth a swim.",
  },
  {
    name: "poemborn Process",
    rating: 4,
    source: "Google",
    quote:
      "Very easy access on Ipaja road, cozy and welcoming ambience, good music, swimming pool, lodging, lounge, security, enough parking space… a good hide out in the city.",
  },
  {
    name: "Adeghe Benvilda",
    rating: 4,
    source: "Google",
    quote:
      "The general atmosphere of the property is calm, which I appreciated after a long day. The staff members I interacted with were polite…",
  },
];

export const ratingSummary = {
  average: reviews.reduce((s, r) => s + r.rating, 0) / reviews.length,
  count: reviews.length,
};

export function whatsappLink(message: string) {
  return `https://wa.me/${hotel.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}
