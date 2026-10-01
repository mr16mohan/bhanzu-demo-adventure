import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Star, Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/brand";
import { useDemo } from "@/lib/demo";

export const Route = createFileRoute("/app/roadmap")({
  head: () => ({
    meta: [
      { title: "Mission Map — Bhanzu App" },
      { name: "description", content: "Your child's math mission roadmap in the Bhanzu app." },
      { property: "og:title", content: "Mission Map — Bhanzu App" },
      { property: "og:description", content: "Winding path of math missions, one star at a time." },
    ],
  }),
  component: Roadmap,
});

const XS = [50, 24, 38, 70, 78, 52, 26, 44];
const GAP = 112;

function Roadmap() {
  const { missions } = useDemo();
  const done = Math.max(missions, 1);
  const h = XS.length * GAP + 60;
  const pts = XS.map((x, i) => ({ x, y: h - 70 - i * GAP }));

  return (
    <AppShell>
      <div className="px-5 pt-5">
        <div className="flex items-center gap-3 rounded-3xl bg-card/80 p-3 shadow">
          <Mascot className="h-14 w-14" />
          <p className="text-xl font-extrabold text-navy">Mission {done + 1} is ready! 👇</p>
        </div>
      </div>
      <div className="relative mx-auto w-full" style={{ height: h }}>
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" aria-hidden>
          <polyline
            points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="white"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            opacity=".7"
          />
          <polyline
            points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="var(--orange)"
            strokeWidth="4"
            strokeDasharray="2 12"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {pts.map((p, i) => {
          const step = i + 1;
          const complete = step <= done;
          const next = step === done + 1;
          const style = { left: `${p.x}%`, top: p.y };
          if (complete)
            return (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 text-center" style={style}>
                <div className="flex justify-center gap-0.5">
                  {[0, 1, 2].map((s) => <Star key={s} className="h-5 w-5 fill-gold text-gold-deep" />)}
                </div>
                <div className="kid-btn shadow-3d-go flex h-16 w-16 items-center justify-center bg-go text-on-brand">
                  <Check className="h-9 w-9" strokeWidth={3.5} />
                </div>
              </div>
            );
          if (next)
            return (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={style}>
                <Link
                  to="/game-intro"
                  aria-label={`Play mission ${step}`}
                  className="kid-btn shadow-3d-orange animate-glow animate-bounce-soft flex h-20 w-20 items-center justify-center bg-orange text-4xl text-on-brand"
                >
                  {step}
                </Link>
                <span className="animate-point absolute left-full top-1/2 ml-2 -translate-y-1/2 text-3xl">👈</span>
              </div>
            );
          return (
            <div key={i} className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-locked text-muted-foreground shadow-3d-soft" style={style}>
              <Lock className="h-6 w-6" />
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
