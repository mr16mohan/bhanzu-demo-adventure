import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, HelpCircle, RotateCcw, Star } from "lucide-react";
import { GameLayout } from "@/components/GameLayout";
import { Mascot } from "@/components/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/game")({
  head: () => ({
    meta: [
      { title: "Math Mission — Bhanzu" },
      { name: "description", content: "Count the apples and crack the mission." },
      { property: "og:title", content: "Math Mission — Bhanzu" },
      { property: "og:description", content: "A playful counting mission for kids aged 6-9." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});

const ANSWER = 5;

function Game() {
  const [pick, setPick] = useState<number | null>(null);
  const [help, setHelp] = useState(false);
  const [round, setRound] = useState(0);
  const correct = pick === ANSWER;

  return (
    <GameLayout interactivePhone>
      <div key={round} className="flex min-h-full flex-col items-center gap-6 px-5 py-6">
        {/* progress, not a countdown */}
        <div className="flex w-full max-w-lg items-center gap-3">
          <Star className="h-7 w-7 fill-gold text-gold-deep" />
          <div className="h-5 flex-1 overflow-hidden rounded-full bg-card/70 shadow-inner">
            <div
              className="animate-fill h-full rounded-full bg-go transition-all duration-700"
              style={{ width: correct ? "100%" : "55%" }}
            />
          </div>
          <span className="text-lg font-extrabold text-navy">{correct ? "3/3" : "2/3"}</span>
        </div>

        <div className="w-full max-w-lg rounded-[2rem] bg-card p-6 text-center shadow-xl">
          <div className="flex items-center justify-center gap-3 text-5xl md:text-6xl">
            <span>🍎🍎🍎</span>
            <span className="font-extrabold text-orange">+</span>
            <span>🍎🍎</span>
          </div>
          <div className="mt-3 text-4xl font-extrabold text-navy">= ?</div>
        </div>

        <div className="flex gap-4">
          {[4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => setPick(n)}
              className={cn(
                "kid-btn h-20 w-20 text-4xl md:h-24 md:w-24",
                pick === n
                  ? n === ANSWER
                    ? "shadow-3d-go animate-pop bg-go text-on-brand"
                    : "shadow-3d-soft animate-pop bg-kid-pink text-on-brand"
                  : "shadow-3d-sky bg-card text-navy",
              )}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="flex items-end gap-3">
          <Mascot happy={correct} className={cn("h-20 w-20", correct && "animate-bounce-soft")} />
          {(help || correct) && (
            <div className="animate-pop rounded-2xl rounded-bl-none bg-card px-4 py-2 text-2xl font-bold text-navy shadow">
              {correct ? "🎉 Yes!" : "👆 3 … 4, 5!"}
            </div>
          )}
        </div>

        <Link
          to="/win"
          className={cn(
            "kid-btn shadow-3d-go flex items-center gap-2 bg-go px-12 py-4 text-2xl text-on-brand",
            correct && "animate-glow",
          )}
        >
          <Check className="h-8 w-8" strokeWidth={3} /> Completed
        </Link>

        <div className="flex gap-3 pb-4">
          <button
            onClick={() => {
              setPick(null);
              setHelp(false);
              setRound((r) => r + 1);
            }}
            className="kid-btn shadow-3d-soft flex items-center gap-2 bg-card px-5 py-2.5 text-lg text-navy"
          >
            <RotateCcw className="h-5 w-5" /> Redo
          </button>
          <button
            onClick={() => setHelp(true)}
            className="kid-btn shadow-3d-soft flex items-center gap-2 bg-card px-5 py-2.5 text-lg text-navy"
          >
            <HelpCircle className="h-5 w-5" /> Need Help
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
