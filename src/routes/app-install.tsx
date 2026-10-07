import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownToLine, Star } from "lucide-react";
import { GameLayout } from "@/components/GameLayout";
import { LogoMark } from "@/components/brand";

export const Route = createFileRoute("/app-install")({
  head: () => ({
    meta: [
      { title: "Bhanzu App — App Store" },
      { name: "description", content: "Open the Bhanzu app to continue your math missions." },
    ],
  }),
  component: AppInstall,
});

function AppInstall() {
  return (
    <GameLayout interactivePhone showSmsNotification emailMessage="mission-progress">
      <div className="min-h-full bg-[#f7f7fa] px-5 py-8 font-sans text-[#1d1d1f] sm:px-8">
        <p className="text-sm font-semibold text-[#777780]">APP STORE</p>
        <h1 className="mt-2 text-3xl font-bold">Continue in the app</h1>
        <section className="mt-7 rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <LogoMark className="h-[72px] w-[72px] shrink-0 rounded-[1.25rem] text-4xl" />
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold">Bhanzu</h2>
              <p className="mt-1 text-sm text-[#777780]">Math made joyful</p>
              <p className="mt-1 text-xs text-[#777780]">Education · Designed for kids</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-[#f1f1f5] px-3 py-1.5 text-sm font-semibold text-[#3478f6]">
              <ArrowDownToLine className="h-4 w-4" /> GET
            </span>
          </div>
          <div className="my-5 border-t border-[#ededf0]" />
          <div className="grid grid-cols-3 text-center text-xs text-[#777780]">
            <div>
              <p className="font-semibold text-[#55555c]">4.9</p>
              <div className="mt-1 flex justify-center">
                <Star className="h-3 w-3 fill-[#777780]" />
              </div>
              <p className="mt-1">Ratings</p>
            </div>
            <div>
              <p className="font-semibold text-[#55555c]">AGES</p>
              <p className="mt-1 text-lg font-bold text-[#55555c]">4+</p>
              <p>Years old</p>
            </div>
            <div>
              <p className="font-semibold text-[#55555c]">EDUCATION</p>
              <p className="mt-2">Category</p>
            </div>
          </div>
        </section>
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Your next mission is ready</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#62626a]">
            Keep exploring fun math challenges and see your progress in the Bhanzu app.
          </p>
          <Link
            to="/app/roadmap"
            className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#3478f6] py-3 font-semibold text-white transition hover:bg-[#2468e5]"
          >
            Open App
          </Link>
        </section>
      </div>
    </GameLayout>
  );
}
