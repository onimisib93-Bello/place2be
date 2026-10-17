import { media, type MediaImage } from "./media";

export type Room = {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  sleeps: string;
  bed: string;
  /** Nightly rate in naira. null = show "Ask for today's rate". */
  fromPrice: number | null;
  /** TODO: set true once the hotel confirms the published rate. */
  priceConfirmed: boolean;
  features: string[];
  images: MediaImage[];
};

const shared = [
  "Air conditioning",
  "Free Wi-Fi",
  "Breakfast included",
  "Room service",
  "Smoke-free",
];

export const rooms: Room[] = [
  {
    slug: "standard",
    name: "Standard Room",
    summary: "Our simplest room. Spacious, quiet and easy on the budget.",
    description: [
      "Warm walls, a cool marble floor and an armchair by the bed. The Standard Room is generous with space and ideal when you're travelling alone and want somewhere calm to land.",
      "One guest called it \"spacious\". The bed is best for one, so if you're two, look at the Standard Deluxe.",
    ],
    sleeps: "1 guest",
    bed: "Single-occupancy bed", // TODO: confirm bed size
    fromPrice: null,
    priceConfirmed: false,
    features: [...shared, "Armchair", "Marble floor"],
    images: [media.roomStandard, media.reception],
  },
  {
    slug: "standard-deluxe",
    name: "Standard Deluxe",
    summary: "Gold headboard, crisp linen, room for two to stretch out.",
    description: [
      "A tufted gold headboard, a wide bed dressed in white and a full wardrobe for longer stays. A good fit for couples.",
      "Breakfast is included every morning, and the pool is a short walk downstairs.",
    ],
    sleeps: "2 guests",
    bed: "Double bed", // TODO: confirm bed size
    fromPrice: null,
    priceConfirmed: false,
    features: [...shared, "Wardrobe", "Work desk"],
    images: [media.roomStandardDeluxe, media.poolWaterfall],
  },
  {
    slug: "deluxe",
    name: "Deluxe Room",
    summary: "More space, heavier drapes, a bed that fits two or three.",
    description: [
      "Blackout drapes, a deep gold headboard and a bed one guest described as comfortable for two \"or even three\". The Deluxe gives you room to unpack properly.",
      "There's often music by the pool in the evening. Ask the front desk if you'd prefer a quieter floor.",
    ],
    sleeps: "2–3 guests",
    bed: "Large double bed", // TODO: confirm bed size
    fromPrice: null,
    priceConfirmed: false,
    features: [...shared, "Blackout drapes", "Bedside lounge seating"],
    images: [media.roomDeluxe, media.balcony],
  },
  {
    slug: "royale",
    name: "Royale",
    summary: "Our most generous room, for a longer stay or a special night.",
    description: [
      "The Royale is the room for celebrations: an anniversary, a birthday, a Valentine's weekend. The same gold-and-linen finish as the Deluxe, with more room to spread out.", // TODO: confirm Royale differences
      "Tell us what you're celebrating when you book, and the front desk will help you plan it.",
    ],
    sleeps: "2 guests",
    bed: "King-size bed", // TODO: confirm bed size
    fromPrice: null,
    priceConfirmed: false,
    features: [...shared, "Extra floor space", "Blackout drapes"],
    images: [media.roomRoyale, media.poolLetters],
  },
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);

export const formatNaira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
