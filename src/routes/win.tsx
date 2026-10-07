import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";
import { Moon, Rocket, Star } from "lucide-react";
import { GameLayout } from "@/components/GameLayout";
import { Mascot } from "@/components/brand";
import { appreciationChannel, useDemo } from "@/lib/demo";

export const Route = createFileRoute("/win")({
  head: () => ({
    meta: [
      { title: "You're a Genius! — Bhanzu" },
      { name: "description", content: "Mission complete! Three stars earned." },
      { property: "og:title", content: "You're a Genius! — Bhanzu" },
      { property: "og:description", content: "Mission complete with three shiny stars." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Win,
});

const COLORS = ["bg-orange", "bg-gold", "bg-go", "bg-kid-pink", "bg-kid-sky-deep", "bg-navy"];

function Win() {
  const navigate = useNavigate();
  const { completeMission, preferredChannel } = useDemo();
  const missionCompleted = useRef(false);
  const confetti = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        left: (i * 37) % 100,
        delay: (i % 12) * 0.08,
        dur: 1.4 + (i % 5) * 0.25,
        c: COLORS[i % COLORS.length],
        r: i % 3,
      })),
    [],
  );

  useEffect(() => {
    if (missionCompleted.current) return;
    missionCompleted.current = true;
    completeMission();
  }, [completeMission]);

  const finish = (to: "/app-install" | "/whatsapp") => {
    if (to === "/app-install") {
      navigate({ to });
      return;
    }

    const channel = appreciationChannel(preferredChannel);
    if (channel === "whatsapp") navigate({ to: "/whatsapp" });
    else if (channel === "email") navigate({ to: "/email" });
    else navigate({ to: "/sms" });
  };

  return (
    <GameLayout interactivePhone showSmsNotification emailMessage="mission-progress">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((p, i) => (
          <span
            key={i}
            className={`animate-confetti absolute top-0 ${p.c} ${p.r === 0 ? "h-3 w-3 rounded-full" : p.r === 1 ? "h-4 w-2" : "h-2 w-4"}`}
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>
      <div className="relative flex min-h-full flex-col items-center justify-center gap-6 px-6 py-10 text-center">
        <div className="flex items-end gap-2">
          {[0, 1, 2].map((i) => (
            <Star
              key={i}
              className={`animate-pop fill-gold text-gold-deep ${i === 1 ? "h-24 w-24" : "h-16 w-16"}`}
              style={{ animationDelay: `${0.2 + i * 0.2}s` }}
            />
          ))}
        </div>
        <Mascot happy className="animate-bounce-soft h-32 w-32" />
        <h1 className="animate-pop text-5xl font-extrabold text-navy md:text-6xl">
          You're a genius!
        </h1>
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={() => finish("/app-install")}
            className="kid-btn shadow-3d-orange animate-glow flex items-center gap-2 bg-orange px-10 py-4 text-2xl text-on-brand"
          >
            <Rocket className="h-7 w-7" /> Keep Playing
          </button>
          <button
            onClick={() => finish("/whatsapp")}
            className="kid-btn shadow-3d-soft flex items-center gap-2 bg-card px-8 py-4 text-xl text-navy"
          >
            <Moon className="h-6 w-6" /> Come back tomorrow
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
