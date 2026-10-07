import { createFileRoute } from "@tanstack/react-router";
import { SmsMessages } from "@/components/ChannelMessageViews";

export const Route = createFileRoute("/sms")({
  head: () => ({
    meta: [
      { title: "Bhanzu on Messages — Demo Adventure" },
      { name: "description", content: "Your Bhanzu demo details and math mission invite in Messages." },
    ],
  }),
  component: SmsMessages,
});
