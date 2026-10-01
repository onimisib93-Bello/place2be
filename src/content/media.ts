/**
 * Every image and video used on the site. Swap a `src` here to replace it everywhere.
 * `kind: "hotel"` = real Place2Be photography. `kind: "stock"` = illustrative only
 * (TODO: replace with the hotel's own photos of food, drinks and the gym).
 */

export type MediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "hotel" | "stock";
  /** Hotel photo to show if a stock image fails to load. */
  fallback?: string;
};

const img = (
  src: string,
  alt: string,
  width: number,
  height: number,
  kind: MediaImage["kind"] = "hotel",
  fallback?: string,
): MediaImage => ({ src, alt, width, height, kind, fallback });

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const media = {
  poolLetters: img("/media/pool/pool-letters.jpg", "The Place2Be pool from above, the hotel's name tiled into the pool floor", 720, 1280),
  poolWaterfall: img("/media/pool/pool-waterfall.jpg", "Still turquoise water in front of the black-marble water feature", 960, 720),
  poolGuests: img("/media/pool/pool-poolside-guests.jpg", "Guests swimming and relaxing in the poolside lounge", 960, 720),
  poolSquare: img("/media/pool/pool-square.jpg", "Swimmers in the pool with lounge seating along the wall", 504, 504),
  poolAerial: img("/media/pool/pool-aerial.jpg", "The pool seen from the balcony, framed by green turf", 504, 672),
  poolWater: img("/media/pool/pool-water.jpg", "Close view of clear teal pool water and steps", 504, 672),
  poolStage: img("/media/pool/pool-stage.jpg", "The pool and the covered stage used for music nights", 960, 720),
  poolLawn: img("/media/pool/pool-lawn.jpg", "Turf lawn beside the pool under an open sky", 720, 1280),
  reception: img("/media/property/reception.jpg", "The wood-panelled reception desk, staffed around the clock", 960, 720),
  exteriorStreet: img("/media/property/exterior-street.jpg", "Place2Be Hotel and Suites seen from Ipaja Road", 960, 720),
  exteriorPortrait: img("/media/property/exterior-portrait.jpg", "The three-storey hotel building with its vertical Place2Be sign", 506, 898),
  balcony: img("/media/property/balcony-lounge.jpg", "Balcony seating overlooking the pool", 720, 1280),
  facadeSign: img("/media/property/facade-sign.jpg", "The hotel facade and Place2Be sign above the balcony", 720, 1280),
  facadeBalcony: img("/media/property/facade-balcony.jpg", "The hotel's balcony lounge and facade", 720, 1280),
  roomStandard: img("/media/rooms/standard-1.jpg", "Standard room with warm walls, marble floor and armchair", 1000, 666),
  roomStandardDeluxe: img("/media/rooms/standard-deluxe-1.jpg", "Standard Deluxe room with gold headboard and fresh linen", 960, 720),
  roomDeluxe: img("/media/rooms/deluxe-gold-1.jpg", "Deluxe room with tufted gold headboard and floral throw", 960, 720),
  roomRoyale: img("/media/rooms/royale-gold-portrait.jpg", "Royale room with tufted gold headboard and heavy drapes", 506, 674),

  // Illustrative stock — TODO: replace with the hotel's own photography.
  diningTable: img(unsplash("photo-1414235077428-338989a2e8c0"), "Plated dishes served at the restaurant (illustrative)", 1400, 933, "stock", "/media/pool/pool-stage.jpg"),
  diningRoom: img(unsplash("photo-1517248135467-4c7edcad34c4"), "Restaurant interior in the evening (illustrative)", 1400, 933, "stock", "/media/property/reception.jpg"),
  cocktails: img(unsplash("photo-1514362545857-3bc16c4c7d1b"), "Cocktails at the bar (illustrative)", 1400, 933, "stock", "/media/pool/pool-poolside-guests.jpg"),
  breakfast: img(unsplash("photo-1533089860892-a7c6f0a88666"), "Breakfast spread with fruit and coffee (illustrative)", 1400, 933, "stock", "/media/rooms/deluxe-gold-1.jpg"),
  gym: img(unsplash("photo-1534438327276-14e5300c3a48"), "Fitness centre equipment (illustrative)", 1400, 933, "stock", "/media/property/balcony-lounge.jpg"),
} satisfies Record<string, MediaImage>;

export const video = {
  poolLoop: {
    mp4: "/media/video/pool-loop.mp4",
    webm: "/media/video/pool-loop.webm",
    poster: "/media/video/pool-loop-poster.jpg",
  },
  film: {
    mp4: "/media/video/place2be-film.mp4",
    poster: "/media/property/facade-sign.jpg",
  },
};

export type GalleryCategory = "Rooms" | "Pool" | "Lounge" | "Property";

export const gallery: (MediaImage & { category: GalleryCategory })[] = [
  { ...media.poolLetters, category: "Pool" },
  { ...media.roomDeluxe, category: "Rooms" },
  { ...media.poolWaterfall, category: "Pool" },
  { ...media.exteriorPortrait, category: "Property" },
  { ...media.roomStandard, category: "Rooms" },
  { ...media.poolGuests, category: "Lounge" },
  { ...media.balcony, category: "Lounge" },
  { ...media.roomRoyale, category: "Rooms" },
  { ...media.poolStage, category: "Lounge" },
  { ...media.reception, category: "Property" },
  { ...media.poolAerial, category: "Pool" },
  { ...media.roomStandardDeluxe, category: "Rooms" },
  { ...media.facadeSign, category: "Property" },
  { ...media.poolWater, category: "Pool" },
  { ...media.poolSquare, category: "Lounge" },
  { ...media.exteriorStreet, category: "Property" },
  { ...media.poolLawn, category: "Pool" },
  { ...media.facadeBalcony, category: "Property" },
];
