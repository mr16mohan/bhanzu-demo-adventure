import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Star } from "lucide-react";
import { GameLayout } from "@/components/GameLayout";
import { Mascot } from "@/components/brand";

export const Route = createFileRoute("/game-intro")({
  head: () => ({
    meta: [
      { title: "Your First Mission — Bhanzu" },
      { name: "description", content: "Ready for your first math mission? Tap play!" },
      { property: "og:title", content: "Your First Mission — Bhanzu" },
      { property: "og:description", content: "A 3-minute math mission for curious kids." },
    ],
  }),
  component: Intro,
});

function Intro() {
  return (
    <GameLayout>
      <div className="flex min-h-full flex-col items-center justify-center gap-6 px-6 py-10 text-center">
        <h1 className="animate-pop text-4xl font-extrabold text-navy md:text-5xl">Ready for your first mission?</h1>

        <div className="relative mt-4 h-56 w-64">
          {[10, 40, 70, 25, 58].map((x, i) => (
            <Star key={i} className="animate-rise absolute bottom-16 h-7 w-7 fill-gold text-gold-deep" style={{ left: `${x}%`, animationDelay: `${i * 0.35}s` }} />
          ))}
          {/* treasure chest */}
          <div className="absolute bottom-0 left-1/2 w-44 -translate-x-1/2">
            <div className="animate-lid h-12 rounded-t-3xl border-4 border-gold-deep bg-orange" />
            <div className="relative h-24 rounded-b-2xl border-4 border-t-0 border-gold-deep bg-orange-deep">
              <span className="absolute left-1/2 top-3 h-8 w-7 -translate-x-1/2 rounded-md bg-gold" />
            </div>
          </div>
          <Mascot className="animate-bounce-soft absolute -right-10 -top-6 h-24 w-24" />
        </div>

        <Link
          to="/game"
          aria-label="Play"
          className="kid-btn shadow-3d-orange animate-glow mt-6 flex items-center gap-3 bg-orange px-14 py-5 text-3xl text-on-brand"
        >
          <Play className="h-9 w-9 fill-current" /> Play
        </Link>
      </div>
    </GameLayout>
  );
}
