import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/schedule" });
  },
  head: () => ({
    meta: [
      { title: "Bhanzu Demo Adventure" },
      { name: "description", content: "Interactive prototype of a child's journey from demo booking to first math mission." },
      { property: "og:title", content: "Bhanzu Demo Adventure" },
      { property: "og:description", content: "From demo booking to the first math mission, in one clickable prototype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
