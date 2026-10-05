import { useRouter } from "@tanstack/react-router";
import { Lock, RotateCw, Share, Smartphone, Tablet } from "lucide-react";
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
            "flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-card transition-[max-width] duration-300 md:rounded-2xl md:border md:shadow-2xl",
            view === "mobile" ? "max-w-[430px]" : "max-w-[820px]",
          )}
        >
          <div className="flex items-center gap-3 border-b bg-secondary px-3 py-2.5">
            <div className="hidden gap-1.5 md:flex">
              <span className="h-3 w-3 rounded-full bg-destructive" />
              <span className="h-3 w-3 rounded-full bg-gold" />
              <span className="h-3 w-3 rounded-full bg-go" />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm text-muted-foreground md:mx-auto md:max-w-md">
              <Lock className="h-3.5 w-3.5 text-go-deep" />
              <span className="flex-1 truncate"><span className="text-foreground">bhanzu.com</span>/mission</span>
              <button onClick={() => router.invalidate()} aria-label="Refresh"><RotateCw className="h-3.5 w-3.5" /></button>
            </div>
            <Share className="h-4 w-4 text-muted-foreground md:hidden" />
          </div>
          <div className="relative flex-1 overflow-y-auto bg-kid-gradient font-kid">{children}</div>
        </div>
      </main>
    </div>
  );
}
