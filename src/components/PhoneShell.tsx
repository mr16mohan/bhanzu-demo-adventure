import { ChevronLeft, Signal, Wifi, BatteryFull } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneShell({ children, className, app = true }: { children: ReactNode; className?: string; app?: boolean }) {
  const router = useRouter();
  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted sm:p-6">
      <div className={cn("relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-card sm:h-[844px] sm:rounded-[2.5rem] sm:border-[7px] sm:border-navy sm:shadow-2xl", className)}>
        <div className="grid h-8 shrink-0 grid-cols-[1fr_auto_1fr] items-center bg-card px-5 text-[11px] font-bold text-navy">
          <span>9:41</span>
          <span className="hidden h-5 w-24 rounded-full bg-navy sm:block" />
          <span className="flex items-center justify-end gap-1"><Signal className="h-3 w-3" /><Wifi className="h-3 w-3" /><BatteryFull className="h-4 w-4" /></span>
        </div>
        {app && (
          <button onClick={() => router.history.back()} aria-label="Go back" className="absolute left-3 top-10 z-30 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-navy shadow backdrop-blur">
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <div className="min-h-0 flex-1">{children}</div>
        <div className="pointer-events-none absolute bottom-1 left-1/2 z-30 h-1.5 w-32 -translate-x-1/2 rounded-full bg-navy/80" />
      </div>
    </div>
  );
}