import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, MessagesSquare } from "lucide-react";
import { Logo } from "@/components/brand";
import { PhoneShell } from "@/components/PhoneShell";

export const Route = createFileRoute("/phone-home")({
  head: () => ({ meta: [
    { title: "Your Messages — Bhanzu Demo Adventure" },
    { name: "description", content: "Open your Bhanzu demo invitation in WhatsApp, Messages, or Mail." },
    { property: "og:title", content: "Your Messages — Bhanzu Demo Adventure" },
    { property: "og:description", content: "Choose an app to view your Bhanzu messages." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PhoneHome,
});

const apps = [
  { to: "/whatsapp" as const, label: "WhatsApp", icon: MessageCircle, color: "bg-go" },
  { to: "/sms" as const, label: "Messages", icon: MessagesSquare, color: "bg-kid-sky-deep" },
  { to: "/email" as const, label: "Mail", icon: Mail, color: "bg-orange" },
];

function PhoneHome() {
  return (
    <PhoneShell app={false}>
      <main className="relative flex h-full flex-col overflow-hidden bg-kid-gradient px-7 pb-12 pt-10">
        <Logo className="mx-auto text-3xl" />
        <div className="mt-16 grid grid-cols-3 gap-5">
          {apps.map(({ to, label, icon: Icon, color }) => (
            <Link key={to} to={to} className="flex min-w-0 flex-col items-center gap-2 text-center text-xs font-semibold text-navy">
              <span className={`relative grid aspect-square w-full max-w-[76px] place-items-center rounded-[1.35rem] ${color} text-on-brand shadow-lg`}>
                <Icon className="h-9 w-9" />
                <span className="absolute -right-1 -top-2 grid h-6 min-w-6 place-items-center rounded-full border-2 border-card bg-destructive px-1 text-[11px] text-on-brand">3</span>
              </span>
              <span className="truncate">{label}</span>
            </Link>
          ))}
        </div>
        <p className="mt-auto text-center text-sm font-medium text-navy/70">Tap an app to open your Bhanzu updates</p>
      </main>
    </PhoneShell>
  );
}