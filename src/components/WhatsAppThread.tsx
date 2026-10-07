import { useNavigate, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Video,
  Phone,
  MoreVertical,
  Smile,
  Paperclip,
  Camera,
  Mic,
  CheckCheck,
  Bell,
  CalendarClock,
  Gamepad2,
} from "lucide-react";
import type { ReactNode } from "react";
import { LogoMark } from "./brand";
import { formatDate, useDemo } from "@/lib/demo";
import { cn } from "@/lib/utils";

function Bubble({
  out,
  time,
  children,
  actions,
}: {
  out?: boolean;
  time: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className={cn("flex animate-msg", out ? "justify-end" : "justify-start")}>
      <div className="relative max-w-[85%] sm:max-w-[75%]">
        <span
          className={cn(
            "absolute top-0 h-3 w-3",
            out
              ? "-right-1.5 bg-wa-out [clip-path:polygon(0_0,100%_0,0_100%)]"
              : "-left-1.5 bg-wa-in [clip-path:polygon(0_0,100%_0,100%_100%)]",
          )}
        />
        <div
          className={cn(
            "overflow-hidden rounded-lg shadow-sm",
            out ? "rounded-tr-none bg-wa-out" : "rounded-tl-none bg-wa-in",
          )}
        >
          <div className="px-2.5 pb-1.5 pt-1.5 text-[14.5px] leading-snug text-foreground">
            {children}
            <span className="float-right ml-3 mt-2 flex translate-y-1 items-center gap-1 text-[11px] text-wa-meta">
              {time}
              {out && <CheckCheck className="h-4 w-4 text-wa-tick" />}
            </span>
          </div>
          {actions && (
            <div className="divide-y divide-border/70 border-t border-border/70">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function Action({
  icon,
  children,
  onClick,
}: {
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 py-2.5 text-[14px] font-medium text-wa-link transition active:bg-muted hover:bg-foreground/5"
    >
      {icon}
      {children}
    </button>
  );
}

export function WhatsAppThread({
  className,
  onBack,
  onOpenGame,
}: {
  className?: string;
  onBack?: () => void;
  onOpenGame?: () => void;
}) {
  const navigate = useNavigate();
  const d = useDemo();
  const whatsappMessages = channelMessages(d, "whatsapp");
  const dayBefore = whatsappMessages.find((message) => message.kind === "reminder");
  const dailyPuzzles = whatsappMessages.filter((message) => message.kind === "daily-puzzle");
  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      <header className="flex items-center gap-2 bg-wa-header px-2 py-2 text-on-brand">
        {onBack ? (
          <button type="button" onClick={onBack} aria-label="Back to home" className="p-1">
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link to="/schedule" aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}
        <LogoMark className="h-10 w-10 text-lg" />
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold leading-tight">Bhanzu</div>
          <div className="text-xs opacity-85">online</div>
        </div>
        <Video className="mx-2 h-5 w-5" />
        <Phone className="mx-2 h-5 w-5" />
        <MoreVertical className="h-5 w-5" />
      </header>

      <div className="wa-doodle flex-1 space-y-3 overflow-y-auto px-4 py-4 pl-6">
        <div className="mx-auto w-fit rounded-md bg-wa-in/90 px-3 py-1 text-xs text-wa-meta shadow-sm">
          TODAY
        </div>
        <div className="mx-auto w-fit max-w-xs rounded-md bg-kid-yellow/50 px-3 py-1.5 text-center text-[11.5px] text-foreground/70">
          This business uses a secure service from Meta to manage this chat.
        </div>

        <Bubble
          out
          time="10:02 AM"
          actions={
            <>
              <Action
                icon={<Bell className="h-4 w-4" />}
                onClick={() => d.update({ reminderSet: true })}
              >
                Configure Reminder
              </Action>
              <Action
                icon={<CalendarClock className="h-4 w-4" />}
                onClick={() => navigate({ to: "/schedule" })}
              >
                Reschedule
              </Action>
            </>
          }
        >
          <p>Hi {d.parentName}! 👋</p>
          <p className="mt-1">
            ✅ <b>Demo class confirmed</b> for <b>{d.childName}</b>
          </p>
          <p className="mt-1">
            📅 {formatDate(d.demoDate)}
            <br />⏰ {d.demoTime} IST
          </p>
          <p className="mt-1">Our teacher will meet {d.childName} live on Zoom.</p>
        </Bubble>

        {dayBefore && <Bubble out time={dayBefore.time}>🔔 {dayBefore.text}</Bubble>}

        {d.reminderSet && (
          <Bubble out time="10:03 AM">
            🔔 Done! We'll remind you 1 hour before the class.
          </Bubble>
        )}

        <Bubble
          out
          time="10:05 AM"
          actions={
            <Action
              icon={<Gamepad2 className="h-4 w-4" />}
              onClick={() => (onOpenGame ? onOpenGame() : navigate({ to: "/game-intro" }))}
            >
              Play the mission 🚀
            </Action>
          }
        >
          <p>
            Hey {d.childName}! 🦸 Before your class, we have a <b>3-minute fun game</b> just for
            you!
          </p>
          <p className="mt-1">Can you crack your first math mission? ⭐</p>
        </Bubble>
      </div>

      <div className="flex items-center gap-2 bg-wa-bar px-2 py-2">
        <div className="flex flex-1 items-center gap-3 rounded-full bg-card px-3 py-2.5 text-wa-meta shadow-sm">
          <Smile className="h-5 w-5" />
          <span className="flex-1 text-[15px]">Message</span>
          <Paperclip className="h-5 w-5 -rotate-45" />
          <Camera className="h-5 w-5" />
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-wa-header text-on-brand">
          <Mic className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
