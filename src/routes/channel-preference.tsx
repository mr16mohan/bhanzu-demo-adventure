import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, MessageSquare } from "lucide-react";
import { useDemo, type PreferredChannel } from "@/lib/demo";
import { Logo } from "@/components/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/channel-preference")({
  head: () => ({
    meta: [
      { title: "Choose Your Preferred Channel — Bhanzu" },
      { name: "description", content: "Choose where you'd like to see your Bhanzu demo messages." },
    ],
  }),
  component: ChannelPreference,
});

const options: { value: PreferredChannel; label: string; icon: typeof MessageCircle; color: string }[] = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle, color: "bg-go/15 text-go-deep" },
  { value: "email", label: "Email", icon: Mail, color: "bg-kid-sky/25 text-kid-sky-deep" },
  { value: "sms", label: "SMS", icon: MessageSquare, color: "bg-kid-pink/15 text-orange-deep" },
  { value: "none", label: "Skip, send to all", icon: MessageSquare, color: "bg-navy-soft text-navy" },
];

function ChannelPreference() {
  const { preferredChannel, update } = useDemo();

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-5 py-10">
      <section className="w-full max-w-xl rounded-3xl border bg-card p-6 shadow-xl shadow-navy/5 sm:p-9">
        <Logo className="text-3xl" />
        <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-orange-deep">Stay in the loop</p>
        <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">Which app do you check most often?</h1>
        <div className="mt-7 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Preferred message channel">
          {options.map(({ value, label, icon: Icon, color }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={preferredChannel === value}
              onClick={() => update({ preferredChannel: value })}
              className={cn(
                "flex min-h-20 items-center gap-4 rounded-2xl border-2 p-4 text-left font-semibold transition",
                preferredChannel === value ? "border-orange bg-accent/50" : "border-border hover:border-orange/50",
              )}
            >
              <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", color)}>
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-navy">{label}</span>
            </button>
          ))}
        </div>
        <Link
          to="/phone"
          className="mt-7 flex w-full items-center justify-center rounded-xl bg-orange py-3.5 font-semibold text-on-brand transition hover:bg-orange-deep active:scale-[.98]"
        >
          Continue
        </Link>
      </section>
    </main>
  );
}
