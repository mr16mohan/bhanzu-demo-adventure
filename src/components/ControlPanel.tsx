import { useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useDemo } from "@/lib/demo";

export function ControlPanel() {
  const router = useRouter();
  const navigate = useNavigate();
  const { reset } = useDemo();
  return (
    <div className="fixed left-3 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1 rounded-2xl border bg-card/90 p-1.5 shadow-lg backdrop-blur">
      <button
        onClick={() => router.history.back()}
        className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-medium text-foreground transition hover:bg-muted active:scale-95"
        title="Back"
      >
        <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Back</span>
      </button>
      <button
        onClick={() => {
          reset();
          navigate({ to: "/schedule" });
        }}
        className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-medium text-orange-deep transition hover:bg-accent active:scale-95"
        title="Restart Prototype"
      >
        <RotateCcw className="h-4 w-4" /> <span className="hidden sm:inline">Restart</span>
      </button>
    </div>
  );
}
