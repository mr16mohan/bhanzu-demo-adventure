import { createFileRoute, Link } from "@tanstack/react-router";
import { Archive, ChevronLeft, Mail, MoreHorizontal, Reply, Trash2 } from "lucide-react";
import { Logo } from "@/components/brand";
import { PhoneShell } from "@/components/PhoneShell";
import { channelMessages } from "@/lib/channel-messages";
import { useDemo } from "@/lib/demo";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [
    { title: "Bhanzu Demo Email — Demo Adventure" },
    { name: "description", content: "Your Bhanzu demo confirmation and mission links by email." },
    { property: "og:title", content: "Bhanzu Demo Email" },
    { property: "og:description", content: "Your Bhanzu demo updates in Mail." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: EmailView,
});

function EmailView() {
  const d = useDemo();
  const messages = channelMessages(d, "email");
  return (
    <PhoneShell app={false}>
      <div className="flex h-full flex-col bg-card">
        <header className="flex items-center justify-between border-b px-4 py-3 text-kid-sky-deep">
          <Link to="/phone-home" className="flex items-center text-sm"><ChevronLeft className="h-5 w-5" />Inbox</Link>
          <span className="flex gap-5"><Archive className="h-5 w-5" /><Trash2 className="h-5 w-5" /><MoreHorizontal className="h-5 w-5" /></span>
        </header>
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <article key={message.id} className="border-b px-5 py-5">
              <p className="text-xs font-semibold uppercase text-orange-deep">{message.kind.replace("-", " ")}</p>
              <h1 className="mt-1 text-xl font-semibold text-navy">{message.title}</h1>
              <div className="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-3 text-sm"><span className="grid h-9 w-9 place-items-center rounded-full bg-navy-soft"><Mail className="h-4 w-4 text-navy" /></span><span><b>Bhanzu</b><br /><span className="text-xs text-muted-foreground">to {d.parentName}</span></span><span className="text-xs text-muted-foreground">{message.time}</span></div>
              <p className="mt-5 text-[15px] leading-relaxed text-foreground">{message.text}</p>
              {message.link && <Link to="/game-intro" className="mt-5 flex w-full items-center justify-center rounded-lg bg-orange py-3 font-semibold text-on-brand">Start the mission</Link>}
            </article>
          ))}
          <Logo className="mx-auto my-8 text-2xl opacity-60" />
        </div>
        <div className="grid h-14 grid-cols-3 place-items-center border-t text-kid-sky-deep"><Reply className="h-5 w-5" /><Archive className="h-5 w-5" /><Trash2 className="h-5 w-5" /></div>
      </div>
    </PhoneShell>
  );
}