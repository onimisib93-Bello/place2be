"use client";

import dynamic from "next/dynamic";

import type { StackSpreadCard } from "@/components/ui/stack-spread";
import { media } from "@/content/media";

const StackSpread = dynamic(() => import("@/components/ui/stack-spread"), {
  ssr: false,
  loading: () => <div aria-hidden className="h-[100svh] bg-marble" />,
});

// Array order = stack order, back -> front. Positions in vw/vh from the stage centre.
const cards: StackSpreadCard[] = [
  {
    item: { src: media.poolLawn.src, alt: media.poolLawn.alt },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: 0.75, w: 13, h: 26 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  {
    item: { src: media.facadeSign.src, alt: media.facadeSign.alt },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: 0.9, w: 15, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  {
    item: { src: media.roomRoyale.src, alt: media.roomRoyale.alt },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: 0.9, w: 15, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  {
    item: { src: media.poolStage.src, alt: media.poolStage.alt },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: 0.8, w: 25, h: 30 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  {
    item: { src: media.balcony.src, alt: media.balcony.alt },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: 0.8, w: 16, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  {
    item: { src: media.roomDeluxe.src, alt: media.roomDeluxe.alt },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: 0.9, w: 22, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  {
    item: { src: media.poolGuests.src, alt: media.poolGuests.alt },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: 0.8, w: 22, h: 26 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  {
    item: { src: media.poolWaterfall.src, alt: media.poolWaterfall.alt },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: 0.9, w: 18, h: 22 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

export function LifeStack() {
  return (
    <StackSpread
      ariaLabel="Life at Place2Be"
      cards={cards}
      headline={"Check in.\nSlow down."}
      subtitle="Your room, the restaurant, the lounge and the pool, all inside one gated compound."
      headlineClassName="display"
      bgColor="var(--marble)"
      textColor="#17201e"
      cardRadius={3}
      scrollLength={320}
    />
  );
}
