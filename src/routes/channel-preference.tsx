import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mail, MessageCircle, MessagesSquare, Send } from "lucide-react";
import { Logo } from "@/components/brand";
import { PhoneShell } from "@/components/PhoneShell";
import { useDemo, type PreferredChannel } from "@/lib/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/channel-preference")({
  head: () => ({ meta: [
    { title: "Choose Your Updates — Bhanzu" },
    { name: "description", content: "Choose where you prefer to receive Bhanzu demo updates." },
    { property: "og:title", content: "Choose Your Updates — Bhanzu" },
    { property: "og:description", content: "Choose WhatsApp, Email, SMS, or all channels." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ChannelPreference,
});

const options: Array<{ value: PreferredChannel; label: string; detail: string; icon: typeof Mail }> = [
  { value: "whatsapp", label: "WhatsApp", detail: "Chats and quick updates", icon: MessageCircle },
  { value: "email", label: "Email", detail: "Updates in your inbox", icon: Mail },
  { value: "sms", label: "SMS", detail: "Simple text messages", icon: MessagesSquare },
  { value: "none", label: "Skip, send to all", detail: "Use every channel", icon: Send },
];

function ChannelPreference() {
  const d = useDemo();
  const navigate = useNavigate();
  return (
    <PhoneShell>
      <main className="flex h-full flex-col overflow-y-auto bg-background px-6 pb-12 pt-8">
        <Logo className="mx-auto text-3xl" />
        <h1 className="mt-10 text-center text-3xl font-bold leading-tight text-navy">Which app do you check most often?</h1>
        <div className="mt-8 grid gap-3">
          {options.map(({ value, label, detail, icon: Icon }) => (
            <button key={value} onClick={() => d.update({ preferredChannel: value })} className={cn("grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border-2 bg-card p-4 text-left transition", d.preferredChannel === value ? "border-orange shadow-lg shadow-orange/10" : "border-border hover:border-orange/50")}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-soft text-navy"><Icon className="h-6 w-6" /></span>
              <span className="min-w-0"><span className="block font-semibold text-navy">{label}</span><span className="block truncate text-sm text-muted-foreground">{detail}</span></span>
              <span className={cn("h-5 w-5 rounded-full border-2", d.preferredChannel === value ? "border-orange bg-orange shadow-[inset_0_0_0_4px_var(--card)]" : "border-input")} />
            </button>
          ))}
        </div>
        <button onClick={() => navigate({ to: "/phone-home" })} className="mt-auto w-full rounded-xl bg-orange py-3.5 font-semibold text-on-brand shadow-lg shadow-orange/30 transition hover:bg-orange-deep active:scale-[.98]">Continue</button>
      </main>
    </PhoneShell>
  );
}