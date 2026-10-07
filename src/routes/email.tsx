import { createFileRoute } from "@tanstack/react-router";
import { EmailMessages } from "@/components/ChannelMessageViews";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Bhanzu Email — Demo Adventure" },
      { name: "description", content: "Your Bhanzu demo details and math mission invite in Email." },
    ],
  }),
  component: EmailMessages,
});
