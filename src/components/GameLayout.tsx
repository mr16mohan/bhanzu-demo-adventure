import { useRouter } from "@tanstack/react-router";
import { BatteryFull, ChevronLeft, Lock, MoreVertical, RotateCw, Share, Signal, Smartphone, Tablet, Wifi } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WhatsAppThread } from "./WhatsAppThread";

/** Desktop/tablet: WhatsApp left, game in browser frame right. Mobile: game full screen. */
export function GameLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [view, setView] = useState<"mobile" | "tablet">("mobile");
  return (
    <div className="flex h-dvh bg-muted">
      <aside className="hidden h-full w-[380px] shrink-0 border-r shadow-xl md:block lg:w-[430px]">
        <WhatsAppThread />
      </aside>
      <main className="flex min-w-0 flex-1 flex-col items-center gap-3 p-2 md:p-5">
        <fieldset className="flex shrink-0 items-center rounded-full border bg-card p-1 shadow-sm" aria-label="Game view">
          {(["mobile", "tablet"] as const).map((option) => (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold capitalize transition-colors",
                view === option ? "bg-navy text-on-brand" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <input
                className="sr-only"
                type="radio"
                name="game-view"
                value={option}
                checked={view === option}
                onChange={() => setView(option)}
              />
              {option === "mobile" ? <Smartphone className="h-4 w-4" /> : <Tablet className="h-4 w-4" />}
              {option}
            </label>
          ))}
        </fieldset>
        <div
          data-game-view={view}
          className={cn(
            "relative flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-card transition-[max-width] duration-300 md:border-[7px] md:border-navy md:shadow-2xl",
            view === "mobile" ? "md:rounded-[2.5rem]" : "md:rounded-2xl",
            view === "mobile" ? "max-w-[430px]" : "max-w-[820px]",
          )}
        >
          <div className="grid h-8 shrink-0 grid-cols-[1fr_auto_1fr] items-center bg-card px-5 text-[11px] font-bold text-navy">
            <span>9:41</span>
            <span className={cn("hidden h-5 rounded-full bg-navy md:block", view === "mobile" ? "w-24" : "w-16")} />
            <span className="flex items-center justify-end gap-1"><Signal className="h-3 w-3" /><Wifi className="h-3 w-3" /><BatteryFull className="h-4 w-4" /></span>
          </div>
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-b bg-secondary px-3 py-2.5">
            <button onClick={() => router.history.back()} aria-label="Browser back" className="text-muted-foreground"><ChevronLeft className="h-5 w-5" /></button>
            <div className="flex min-w-0 items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-go-deep" />
              <span className="flex-1 truncate"><span className="text-foreground">bhanzu.com</span>/mission</span>
              <button onClick={() => router.invalidate()} aria-label="Refresh"><RotateCw className="h-3.5 w-3.5" /></button>
            </div>
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="relative min-h-0 flex-1 overflow-y-auto bg-kid-gradient font-kid">{children}</div>
          <div className="grid h-11 shrink-0 grid-cols-3 place-items-center border-t bg-card text-muted-foreground">
            <ChevronLeft className="h-5 w-5" />
            <span className="h-4 w-4 rounded border-2 border-current" />
            <Share className="h-5 w-5" />
          </div>
          <div className="pointer-events-none absolute bottom-1 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-navy/70 md:hidden" />
        </div>
      </main>
    </div>
  );
}
