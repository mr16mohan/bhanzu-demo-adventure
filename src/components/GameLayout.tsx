import { useRouter } from "@tanstack/react-router";
import { Lock, RotateCw, Share } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppThread } from "./WhatsAppThread";

/** Desktop/tablet: WhatsApp left, game in browser frame right. Mobile: game full screen. */
export function GameLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className="flex h-dvh bg-muted">
      <aside className="hidden h-full w-[380px] shrink-0 border-r shadow-xl md:block lg:w-[430px]">
        <WhatsAppThread />
      </aside>
      <main className="flex min-w-0 flex-1 md:p-6">
        <div className="flex flex-1 flex-col overflow-hidden bg-card md:rounded-2xl md:border md:shadow-2xl">
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
