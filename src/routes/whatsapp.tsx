import { createFileRoute } from "@tanstack/react-router";
import { WhatsAppThread } from "@/components/WhatsAppThread";

export const Route = createFileRoute("/whatsapp")({
  head: () => ({
    meta: [
      { title: "Bhanzu on WhatsApp — Demo Adventure" },
      { name: "description", content: "Demo confirmation and a fun game invite from Bhanzu on WhatsApp." },
      { property: "og:title", content: "Bhanzu on WhatsApp" },
      { property: "og:description", content: "Your demo confirmation and a 3-minute math game invite." },
    ],
  }),
  component: () => (
    <div className="flex h-dvh justify-center bg-wa-bar">
      <div className="h-full w-full max-w-[520px] shadow-2xl">
        <WhatsAppThread />
      </div>
    </div>
  ),
});
