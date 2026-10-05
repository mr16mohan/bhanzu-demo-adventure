import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand";
import { formatDate, useDemo } from "@/lib/demo";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Book a Free Demo Class — Bhanzu" },
      { name: "description", content: "Schedule a free live math demo class for your child with Bhanzu." },
      { property: "og:title", content: "Book a Free Demo Class — Bhanzu" },
      { property: "og:description", content: "Schedule a free live math demo class for your child." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Schedule,
});

const field = "mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-foreground outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/30";
export const SCHEDULE_BENEFITS = ["60-minute live session", "Personalised learning report", "No payment required"];

function Schedule() {
  const d = useDemo();
  const iso = d.demoDate.toISOString().slice(0, 10);
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Logo className="text-3xl" />
          <span className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
            <ShieldCheck className="h-4 w-4 text-go-deep" /> Trusted by 50,000+ parents
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1fr_1.1fr] md:py-16">
        <section className="pl-10 md:pl-0">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-deep">Free live class</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-navy md:text-5xl">
            Help your child fall in love with math.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">A 1:1 demo with a Bhanzu teacher, built around how your child thinks.</p>
          <ul className="mt-8 space-y-3 text-foreground">
            {SCHEDULE_BENEFITS.map((t) => (
              <li key={t} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-go-deep" /> {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border bg-card p-6 shadow-xl shadow-navy/5 md:p-8">
          {!d.scheduled ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                d.update({ scheduled: true });
              }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-navy">Book your demo</h2>
              <label className="block text-sm font-medium text-muted-foreground">
                Parent name
                <input className={field} value={d.parentName} onChange={(e) => d.update({ parentName: e.target.value })} />
              </label>
              <div className="grid grid-cols-[1fr_6rem] gap-3">
                <label className="block text-sm font-medium text-muted-foreground">
                  Child name
                  <input className={field} value={d.childName} onChange={(e) => d.update({ childName: e.target.value })} />
                </label>
                <label className="block text-sm font-medium text-muted-foreground">
                  Age
                  <input type="number" min={4} max={14} className={field} value={d.childAge} onChange={(e) => d.update({ childAge: Number(e.target.value) })} />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm font-medium text-muted-foreground">
                  Demo date
                  <input
                    type="date"
                    className={field}
                    value={iso}
                    onChange={(e) => e.target.value && d.update({ demoDate: new Date(e.target.value + "T12:00:00") })}
                  />
                </label>
                <label className="block text-sm font-medium text-muted-foreground">
                  Time
                  <select className={field} value={d.demoTime} onChange={(e) => d.update({ demoTime: e.target.value })}>
                    {["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
              </div>
              <button className="mt-2 w-full rounded-xl bg-orange py-3.5 font-semibold text-on-brand shadow-lg shadow-orange/30 transition hover:bg-orange-deep active:scale-[.98]">
                Schedule Demo
              </button>
            </form>
          ) : (
            <div className="animate-pop text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-go/15">
                <CheckCircle2 className="h-9 w-9 text-go-deep" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-navy">Demo scheduled!</h2>
              <p className="mt-2 text-muted-foreground">We've sent the details to WhatsApp, {d.parentName.split(" ")[0]}.</p>
              <div className="mt-6 space-y-2 rounded-2xl bg-navy-soft p-4 text-left text-sm">
                <p className="font-semibold text-navy">{d.childName}, age {d.childAge}</p>
                <p className="flex items-center gap-2 text-foreground"><CalendarDays className="h-4 w-4 text-orange" /> {formatDate(d.demoDate)}</p>
                <p className="flex items-center gap-2 text-foreground"><Clock className="h-4 w-4 text-orange" /> {d.demoTime} IST</p>
              </div>
              <Link
                to="/whatsapp"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-wa-header py-3.5 font-semibold text-on-brand transition hover:opacity-90 active:scale-[.98]"
              >
                <MessageCircle className="h-5 w-5" /> Continue to WhatsApp
              </Link>
              <button onClick={() => d.update({ scheduled: false })} className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:underline">
                Edit details
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
