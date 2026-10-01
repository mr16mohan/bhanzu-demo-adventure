import { Link } from "@tanstack/react-router";
import { Home, BarChart3, User, Star, CircleUserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./brand";
import { useDemo } from "@/lib/demo";

export function AppShell({ children }: { children: ReactNode }) {
  const { missions } = useDemo();
  const stars = Math.max(missions, 1) * 3;
  const tab = "flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-bold text-muted-foreground";
  return (
    <div className="flex h-dvh justify-center bg-navy font-kid">
      <div className="relative flex h-full w-full max-w-[440px] flex-col overflow-hidden bg-kid-gradient shadow-2xl">
        <header className="flex items-center justify-between bg-card px-4 pb-3 pt-4 shadow-sm">
          <Logo className="text-2xl" />
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-gold/30 px-3 py-1 text-sm font-extrabold text-gold-deep">
              <Star className="h-4 w-4 fill-gold text-gold-deep" /> {stars}
            </span>
            <CircleUserRound className="h-8 w-8 text-navy" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
        <nav className="flex border-t bg-card pb-2">
          <Link to="/app/roadmap" className={tab} activeProps={{ className: "!text-orange" }}>
            <Home className="h-6 w-6" /> Home
          </Link>
          <Link to="/app/progress" className={tab} activeProps={{ className: "!text-orange" }}>
            <BarChart3 className="h-6 w-6" /> Progress
          </Link>
          <span className={tab}>
            <User className="h-6 w-6" /> Profile
          </span>
        </nav>
      </div>
    </div>
  );
}
