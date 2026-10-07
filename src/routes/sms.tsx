import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Info, Video } from "lucide-react";
import { LogoMark } from "@/components/brand";
import { PhoneShell } from "@/components/PhoneShell";
import { channelMessages } from "@/lib/channel-messages";
import { useDemo } from "@/lib/demo";

export const Route = createFileRoute("/sms")({
  head: () => ({ meta: [
    { title: "Messages from Bhanzu — Demo Adventure" },
    { name: "description", content: "Plain-text Bhanzu demo and mission updates." },
    { property: "og:title", content: "Messages from Bhanzu" },
    { property: "og:description", content: "Your Bhanzu demo updates in Messages." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: SmsView,
});

function SmsView() {
  const d = useDemo();
  const messages = channelMessages(d, "sms");
  return (
    <PhoneShell app={false}>
      <div className="flex h-full flex-col bg-card">
        <header className="grid grid-cols-[auto_1fr_auto] items-center border-b px-4 pb-3 pt-2 text-kid-sky-deep">
          <Link to="/phone-home" aria-label="Home"><ChevronLeft className="h-6 w-6" /></Link>
          <div className="text-center"><LogoMark className="mx-auto h-10 w-10 text-sm" /><p className="mt-1 text-xs font-medium text-navy">Bhanzu</p></div>
          <span className="flex gap-3"><Video className="h-5 w-5" /><Info className="h-5 w-5" /></span>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
          {messages.map((message) => (
            <div key={message.id} className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-kid-sky-deep px-4 py-2.5 text-[15px] leading-snug text-on-brand">
              <p>{message.text.slice(0, 150)}</p>
              {message.link && <Link to="/game-intro" className="mt-1 block break-all underline">bhanzu.com/mission</Link>}
              <p className="mt-1 text-right text-[10px] opacity-75">{message.time}</p>
            </div>
          ))}
        </div>
        <div className="m-3 rounded-full border bg-muted px-5 py-3 text-sm text-muted-foreground">Text Message</div>
      </div>
    </PhoneShell>
  );
}