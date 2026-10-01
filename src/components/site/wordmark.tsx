import { cn } from "@/lib/utils";

/** Typographic wordmark. The italic gold "2" borrows from the gold headboards. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("display inline-flex items-baseline text-[1.6rem] leading-none tracking-[-0.03em]", className)}>
      Place<span className="italic text-gold">2</span>Be
    </span>
  );
}
