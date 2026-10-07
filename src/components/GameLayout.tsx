import { useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Lock,
  MoreVertical,
  RotateCw,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PhoneHomeScreen } from "@/routes/phone";

/** Desktop/tablet: phone home screen beside the game in an iOS Chrome-style browser. */
export function GameLayout({
  children,
  interactivePhone = false,
  showSmsNotification = false,
  emailMessage,
}: {
  children: ReactNode;
  interactivePhone?: boolean;
  showSmsNotification?: boolean;
  emailMessage?: "mission-progress";
}) {
  const router = useRouter();
  const [view, setView] = useState<"mobile" | "tablet">("mobile");
  const [browserRefresh, setBrowserRefresh] = useState(0);
  const refreshBrowser = () => setBrowserRefresh((count) => count + 1);
  return (
    <div className="flex h-dvh bg-muted">
      <aside className="hidden h-full w-[380px] shrink-0 border-r shadow-xl md:block lg:w-[430px]">
        <PhoneHomeScreen
          embedded
          interactive={interactivePhone}
          onRefreshBrowser={refreshBrowser}
          showSmsNotification={showSmsNotification}
          emailMessage={emailMessage}
        />
      </aside>
      <main className="flex min-w-0 flex-1 flex-col items-center gap-3 p-2 md:p-5">
        <fieldset
          className="flex shrink-0 items-center rounded-full border bg-card p-1 shadow-sm"
          aria-label="Game view"
        >
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
              {option === "mobile" ? (
                <Smartphone className="h-4 w-4" />
              ) : (
                <Tablet className="h-4 w-4" />
              )}
              {option}
            </label>
          ))}
        </fieldset>
        <div
          data-game-view={view}
          className={cn(
            "flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-card transition-[max-width] duration-300 md:rounded-[2rem] md:border md:shadow-2xl",
            view === "mobile" ? "max-w-[430px]" : "max-w-[820px]",
          )}
        >
          <div className="shrink-0 bg-[#f8f8fa] px-4 pb-2 pt-2 text-[#202127]">
            <div className="flex h-6 items-center justify-between px-1 text-[12px] font-semibold">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">●●●</span>
                <span className="text-[11px]">Wi-Fi</span>
                <span className="relative h-[10px] w-[19px] rounded-[3px] border border-current p-[1px]">
                  <span className="block h-full w-[72%] rounded-[1px] bg-current" />
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#e9e9ed] px-3 py-2 text-[14px] text-[#25262a]">
              <Lock className="h-3.5 w-3.5 text-[#4778c8]" />
              <span className="flex-1 truncate text-center">bhanzu.com/mission</span>
              <button
                onClick={() => {
                  refreshBrowser();
                  router.invalidate();
                }}
                aria-label="Reload page"
                className="rounded-full p-0.5"
              >
                <RotateCw className="h-4 w-4 text-[#686a70]" />
              </button>
            </div>
          </div>
          <div
            key={browserRefresh}
            className="relative flex-1 overflow-y-auto bg-kid-gradient font-kid"
          >
            {children}
          </div>
          <nav
            aria-label="Chrome browser controls"
            className="flex h-12 shrink-0 items-center justify-around border-t bg-[#f8f8fa] text-[#4778c8]"
          >
            <button aria-label="Back" onClick={() => router.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button aria-label="Forward" className="text-[#a7a8ad]">
              <ArrowRight className="h-5 w-5" />
            </button>
            <button aria-label="Home" onClick={() => router.navigate({ to: "/game-intro" })}>
              <Home className="h-5 w-5" />
            </button>
            <button
              aria-label="Tabs"
              className="rounded border border-current px-1 text-[10px] font-semibold leading-4"
            >
              1
            </button>
            <button aria-label="More options">
              <MoreVertical className="h-5 w-5" />
            </button>
          </nav>
          <div className="flex h-3 shrink-0 items-center justify-center bg-[#f8f8fa]">
            <span className="h-1 w-28 rounded-full bg-[#202127]" />
          </div>
        </div>
      </main>
    </div>
  );
}
