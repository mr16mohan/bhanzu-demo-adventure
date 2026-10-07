import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, MessageSquare } from "lucide-react";
import { useState } from "react";
import { EmailMessages, SmsMessages } from "@/components/ChannelMessageViews";
import { WhatsAppThread } from "@/components/WhatsAppThread";
import { useDemo } from "@/lib/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/phone")({
  head: () => ({
    meta: [
      { title: "Your Phone — Bhanzu Demo Adventure" },
      {
        name: "description",
        content: "Open your Bhanzu demo messages in WhatsApp, Messages, or Mail.",
      },
    ],
  }),
  component: () => <PhoneHomeScreen />,
});

const apps = [
  { to: "/whatsapp", name: "WhatsApp", icon: MessageCircle, color: "bg-[#25d366]", badge: 3 },
  { to: "/sms", name: "Messages", icon: MessageSquare, color: "bg-[#34c759]", badge: 3 },
  { to: "/email", name: "Mail", icon: Mail, color: "bg-[#1687f8]", badge: 3 },
] as const;

export function PhoneHomeScreen({
  embedded = false,
  interactive = false,
  onRefreshBrowser,
  showSmsNotification = false,
  emailMessage,
}: {
  embedded?: boolean;
  interactive?: boolean;
  onRefreshBrowser?: () => void;
  showSmsNotification?: boolean;
  emailMessage?: "mission-progress";
}) {
  const [openApp, setOpenApp] = useState<"home" | "whatsapp" | "sms" | "email">("home");
  const { missionCelebrations } = useDemo();
  const latestSmsMessage = [...missionCelebrations]
    .reverse()
    .find((celebration) => celebration.channel === "sms");
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <main
      className={cn(
        "flex min-h-dvh items-center justify-center bg-[#d7d9df] px-4 py-8",
        embedded && "min-h-full bg-[#202124] p-4",
      )}
    >
      <section
        className={cn(
          "relative flex h-[min(820px,92dvh)] w-full max-w-[390px] flex-col overflow-hidden rounded-[3.25rem] border-[10px] border-[#17181a] bg-[#9eb8d6] px-5 pb-5 pt-3 shadow-2xl",
          embedded && "h-full min-h-[650px] max-w-[340px] rounded-[2.5rem] border-[8px] px-4 pb-4",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_15%,#dae6ff_0%,transparent_38%),radial-gradient(ellipse_at_85%_50%,#8aa6d7_0%,transparent_43%),linear-gradient(145deg,#c8d9f2,#829bc5_55%,#c4d3ed)]" />
        <header className="relative z-10 flex h-8 items-center justify-between px-3 text-[13px] font-semibold text-[#101522]">
          <span>9:41</span>
          <div className="flex items-center gap-1.5" aria-label="Cellular, Wi-Fi, and battery">
            <span className="flex h-3 items-end gap-[2px]">
              <i className="h-1.5 w-[3px] rounded-sm bg-current" />
              <i className="h-2 w-[3px] rounded-sm bg-current" />
              <i className="h-2.5 w-[3px] rounded-sm bg-current" />
              <i className="h-3 w-[3px] rounded-sm bg-current" />
            </span>
            <span className="text-[11px]">●</span>
            <span className="relative h-[11px] w-[21px] rounded-[3px] border border-current p-[1.5px]">
              <span className="block h-full w-[72%] rounded-[1px] bg-current" />
            </span>
          </div>
        </header>
        {showSmsNotification && openApp === "home" && latestSmsMessage && (
          <div className="absolute left-3 right-3 top-12 z-20 rounded-2xl border border-white/60 bg-white/90 p-3 shadow-xl backdrop-blur-xl">
            <p className="text-[11px] font-semibold text-[#34363b]">MESSAGES · now</p>
            <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-[#22242a]">
              {latestSmsMessage.message}
            </p>
          </div>
        )}
        {openApp === "whatsapp" ? (
          <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.4rem] bg-wa-bg">
            <WhatsAppThread
              className="min-h-0"
              onBack={() => setOpenApp("home")}
              onOpenGame={onRefreshBrowser}
            />
          </div>
        ) : openApp === "sms" ? (
          <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.4rem] bg-white">
            <SmsMessages embedded onBack={() => setOpenApp("home")} onOpenGame={onRefreshBrowser} />
          </div>
        ) : openApp === "email" ? (
          <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.4rem] bg-white">
            <EmailMessages
              embedded
              onBack={() => setOpenApp("home")}
              onOpenGame={onRefreshBrowser}
              variant={emailMessage}
            />
          </div>
        ) : (
          <>
            <div className="relative z-10 mt-3 rounded-[1.4rem] border border-white/30 bg-white/30 p-4 text-white shadow-sm backdrop-blur-xl">
              <p className="text-xs font-medium text-white/85">BHANZU · TODAY</p>
              <p className="mt-1 text-xl font-semibold">Your messages are ready</p>
              <p className="mt-1 text-sm text-white/90">Demo details and a first mission invite</p>
            </div>
            <div className="relative z-10 mt-auto pb-5 pt-10">
              <p className="mb-5 text-center text-[31px] font-light tracking-tight text-white [text-shadow:0_1px_3px_rgb(0_0_0/.25)]">
                {todayLabel}
              </p>
              <div className="grid grid-cols-3 gap-x-3">
                {apps.map(({ to, name, icon: Icon, color, badge }) => {
                  const appIcon = (
                    <>
                      <span className="relative flex h-[62px] w-[62px] items-center justify-center overflow-visible rounded-[1.25rem] text-white shadow-md ring-1 ring-white/20">
                        <span className={`absolute inset-0 rounded-[1.25rem] ${color}`} />
                        <Icon className="relative h-8 w-8" strokeWidth={2.2} />
                        <span className="absolute -right-2 -top-2 flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-[#ff3b30] px-1 text-xs font-semibold text-white shadow-sm">
                          {badge}
                        </span>
                      </span>
                      <span className="text-[12px] font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0/.45)]">
                        {name}
                      </span>
                    </>
                  );

                  return interactive ? (
                    <button
                      key={to}
                      type="button"
                      onClick={() =>
                        setOpenApp(
                          to === "/whatsapp" ? "whatsapp" : to === "/sms" ? "sms" : "email",
                        )
                      }
                      aria-label={`Open ${name}`}
                      className="flex flex-col items-center gap-1.5 text-center"
                    >
                      {appIcon}
                    </button>
                  ) : (
                    <Link
                      key={to}
                      to={to}
                      className="flex flex-col items-center gap-1.5 text-center"
                    >
                      {appIcon}
                    </Link>
                  );
                })}
              </div>
              <div className="relative z-10 mb-3 mt-8 flex h-8 shrink-0 items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white shadow" />
                <span className="h-2 w-2 rounded-full bg-white/50" />
              </div>
              <div className="relative z-10 mx-auto h-[5px] w-[120px] rounded-full bg-white/90" />
            </div>
          </>
        )}
        {openApp !== "home" && (
          <button
            type="button"
            aria-label="Return to home screen"
            onClick={() => setOpenApp("home")}
            className="relative z-10 mx-auto mt-2 h-[5px] w-[120px] shrink-0 rounded-full bg-white/90"
          />
        )}
      </section>
    </main>
  );
}
