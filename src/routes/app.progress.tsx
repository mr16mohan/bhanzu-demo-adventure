import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Trophy, Flame, Play } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Mascot } from "@/components/brand";
import { useDemo } from "@/lib/demo";

export const Route = createFileRoute("/app/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Bhanzu App" },
      { name: "description", content: "Stars earned and missions completed in the Bhanzu app." },
      { property: "og:title", content: "Progress — Bhanzu App" },
      { property: "og:description", content: "Track stars and completed math missions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Progress,
});

function Progress() {
  const { missions, childName } = useDemo();
  const done = Math.max(missions, 1);
  const total = 8;
  return (
    <AppShell>
      <div className="space-y-5 p-5">
        <div className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-lg">
          <Mascot happy className="h-20 w-20" />
          <div>
            <p className="text-3xl font-extrabold text-navy">{childName}</p>
            <p className="text-lg font-bold text-orange-deep">Math Explorer 🚀</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-3xl bg-gold/40 p-5 text-center shadow">
            <Star className="mx-auto h-12 w-12 fill-gold text-gold-deep" />
            <p className="mt-1 text-4xl font-extrabold text-navy">{done * 3}</p>
          </div>
          <div className="rounded-3xl bg-go/30 p-5 text-center shadow">
            <Trophy className="mx-auto h-12 w-12 text-go-deep" />
            <p className="mt-1 text-4xl font-extrabold text-navy">{done}</p>
          </div>
        </div>
        <div className="rounded-3xl bg-card p-5 shadow">
          <div className="flex items-center justify-between text-xl font-extrabold text-navy">
            <span className="flex items-center gap-2"><Flame className="h-6 w-6 text-orange" /> Missions</span>
            <span>{done}/{total}</span>
          </div>
          <div className="mt-3 flex gap-1.5">
            {Array.from({ length: total }, (_, i) => (
              <span key={i} className={`h-4 flex-1 rounded-full ${i < done ? "bg-go" : "bg-locked"}`} />
            ))}
          </div>
        </div>
        <Link to="/game-intro" className="kid-btn shadow-3d-orange flex items-center justify-center gap-2 bg-orange py-4 text-2xl text-on-brand">
          <Play className="h-7 w-7 fill-current" /> Play
        </Link>
      </div>
    </AppShell>
  );
}
