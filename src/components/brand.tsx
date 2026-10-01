import { cn } from "@/lib/utils";

function Ring({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M19.5 8.5A8 8 0 1 0 20 14" fill="none" stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1 font-kid font-extrabold lowercase leading-none tracking-tight", light ? "text-on-brand" : "text-navy", className)}>
      bhanzu
      <Ring className="h-[0.8em] w-[0.8em] translate-y-[0.06em]" />
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center justify-center rounded-full bg-navy", className)}>
      <span className="relative flex items-center justify-center font-kid text-[0.9em] font-extrabold text-on-brand">
        b
        <Ring className="absolute -right-[0.55em] top-[0.1em] h-[0.5em] w-[0.5em]" />
      </span>
    </span>
  );
}

/** Recurring mascot: a friendly orange ring buddy. */
export function Mascot({ className, happy }: { className?: string; happy?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="52" r="40" fill="var(--orange)" />
      <circle cx="50" cy="52" r="26" fill="var(--kid-yellow)" />
      <circle cx="40" cy="48" r="5" fill="var(--navy)" />
      <circle cx="60" cy="48" r="5" fill="var(--navy)" />
      <circle cx="42" cy="46" r="1.6" fill="white" />
      <circle cx="62" cy="46" r="1.6" fill="white" />
      <path d={happy ? "M38 58q12 14 24 0" : "M40 60q10 7 20 0"} stroke="var(--navy)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="31" cy="58" r="4" fill="var(--kid-pink)" opacity=".7" />
      <circle cx="69" cy="58" r="4" fill="var(--kid-pink)" opacity=".7" />
      <path d="M50 12v-6M44 8l6 4 6-4" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
