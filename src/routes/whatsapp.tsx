import { createFileRoute } from "@tanstack/react-router";
import { WhatsAppThread } from "@/components/WhatsAppThread";
import { PhoneShell } from "@/components/PhoneShell";

export const Route = createFileRoute("/whatsapp")({
  head: () => ({
    meta: [
      { title: "Bhanzu on WhatsApp — Demo Adventure" },
      { name: "description", content: "Demo confirmation and a fun game invite from Bhanzu on WhatsApp." },
      { property: "og:title", content: "Bhanzu on WhatsApp" },
      { property: "og:description", content: "Your demo confirmation and a 3-minute math game invite." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PhoneShell app={false}><WhatsAppThread /></PhoneShell>,
});
