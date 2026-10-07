import { Link } from "@tanstack/react-router";
import {
  Archive,
  ArrowLeft,
  Mail,
  MessageSquare,
  MoreVertical,
  Search,
  Trash2,
} from "lucide-react";
import { formatDate, useDemo } from "@/lib/demo";
import { channelMessages } from "@/lib/channel-messages";

function ChannelHeader({
  title,
  icon: Icon,
  onBack,
}: {
  title: string;
  icon: typeof Mail | typeof MessageSquare;
  onBack?: (() => void) | undefined;
}) {
  return (
    <header className="flex items-center gap-3 border-b border-black/5 bg-[#f7f7f9] px-4 py-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to home"
          className="flex items-center gap-1 rounded-full py-2 pr-2 text-[#087cff]"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-[15px]">Home</span>
        </button>
      ) : (
        <Link
          to="/phone"
          aria-label="Back to phone"
          className="flex items-center gap-1 rounded-full py-2 pr-2 text-[#087cff]"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-[15px]">Phone</span>
        </Link>
      )}
      <div className="min-w-0 flex-1 text-center">
        <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#d9e6f2] text-[#526a80]">
          <Icon className="h-5 w-5" />
        </span>
        <h1 className="mt-0.5 truncate text-[13px] font-semibold text-[#202124]">{title}</h1>
      </div>
      <span className="w-[58px]" />
    </header>
  );
}

function smsText(body: string, hasLink: boolean) {
  const link = hasLink ? "/game-intro" : "";
  const cleanBody = body.replace(/\s*\/game-intro\s*$/, "").trim();
  const maxBodyLength = 159 - (link ? link.length + 1 : 0);
  return {
    body:
      cleanBody.length > maxBodyLength ? `${cleanBody.slice(0, maxBodyLength - 3)}...` : cleanBody,
    link,
  };
}

export function SmsMessages({
  embedded = false,
  onBack,
  onOpenGame,
}: {
  embedded?: boolean;
  onBack?: () => void;
  onOpenGame?: (() => void) | undefined;
}) {
  const demo = useDemo();
  const messages = channelMessages(demo, "sms").filter(({ kind }) => kind !== "reminder");

  return (
    <main
      className={
        embedded
          ? "flex h-full min-h-0 w-full flex-col"
          : "flex min-h-dvh items-center justify-center bg-[#d7d9df] px-4 py-6"
      }
    >
      <section
        className={
          embedded
            ? "flex h-full min-h-0 w-full flex-col overflow-hidden bg-white"
            : "flex h-[min(820px,94dvh)] w-full max-w-[390px] flex-col overflow-hidden rounded-[3.1rem] border-[9px] border-[#17181a] bg-white shadow-2xl"
        }
      >
        {!embedded && (
          <div className="flex h-8 shrink-0 items-center justify-between bg-[#f7f7f9] px-7 text-[12px] font-semibold text-[#202124]">
            <span>9:41</span>
            <span>●●● Wi-Fi ▰</span>
          </div>
        )}
        <ChannelHeader title="Messages" icon={MessageSquare} onBack={onBack} />
        <div className="flex-1 space-y-4 overflow-y-auto bg-white px-4 py-5">
          <p className="text-center text-xs text-[#85858b]">iMessage</p>
          <p className="text-center text-[11px] text-[#85858b]">Today 9:41 AM</p>
          {messages.map(({ title, text: body, link }, index) => {
            const text = smsText(body, Boolean(link));
            return (
              <article
                key={`${title}-${index}`}
                className="max-w-[88%] rounded-[1.2rem] rounded-tl-[5px] bg-[#e9e9eb] px-3.5 py-2.5 text-[#111114]"
              >
                <p className="text-[15px] leading-[1.35]">
                  {text.body}
                  {text.link && (
                    <>
                      <br />
                      <Link
                        to="/game-intro"
                        onClick={
                          onOpenGame
                            ? (event) => {
                                event.preventDefault();
                                onOpenGame();
                              }
                            : undefined
                        }
                        className="font-medium text-[#087cff] underline"
                      >
                        Bhanzu-math-adventure
                      </Link>
                    </>
                  )}
                </p>
              </article>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-2 border-t border-black/5 bg-[#f7f7f9] px-3 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e4e8] text-xl leading-none text-[#707077]">
            +
          </span>
          <span className="flex-1 rounded-full border border-[#dedee2] bg-white px-4 py-2 text-sm text-[#99999f]">
            iMessage
          </span>
          <span className="h-8 w-8 rounded-full bg-[#34c759]" />
        </div>
        <div className="flex h-3 shrink-0 items-center justify-center bg-[#f7f7f9]">
          <span className="h-1 w-28 rounded-full bg-black" />
        </div>
      </section>
    </main>
  );
}

export function EmailMessages({
  embedded = false,
  onBack,
  onOpenGame,
  variant = "booking",
}: {
  embedded?: boolean;
  onBack?: (() => void) | undefined;
  onOpenGame?: (() => void) | undefined;
  variant?: "booking" | "mission-progress" | undefined;
}) {
  const demo = useDemo();
  const parentFirstName = demo.parentName.split(" ")[0];

  if (variant === "mission-progress") {
    return (
      <main
        className={
          embedded
            ? "flex h-full min-h-0 w-full flex-col"
            : "flex min-h-dvh items-center justify-center bg-[#d7d9df] px-4 py-6"
        }
      >
        <section
          className={
            embedded
              ? "flex h-full min-h-0 w-full flex-col overflow-hidden bg-white"
              : "flex h-[min(820px,94dvh)] w-full max-w-[430px] flex-col overflow-hidden rounded-[3.1rem] border-[9px] border-[#17181a] bg-white shadow-2xl"
          }
        >
          {!embedded && (
            <div className="flex h-8 shrink-0 items-center justify-between bg-white px-7 text-[12px] font-semibold text-[#202124]">
              <span>9:41</span>
              <span>●●● Wi-Fi ▰</span>
            </div>
          )}
          <header className="flex h-14 shrink-0 items-center gap-5 border-b border-[#e8eaed] px-5 text-[#5f6368]">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label="Back to home"
                className="text-[#5f6368]"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            ) : (
              <Link to="/phone" aria-label="Back to phone" className="text-[#5f6368]">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            )}
            <span className="flex-1" />
            <Archive className="h-5 w-5" />
            <Trash2 className="h-5 w-5" />
            <Mail className="h-5 w-5" />
            <MoreVertical className="h-5 w-5" />
          </header>
          <div className="flex-1 overflow-y-auto px-5 pb-5 pt-4 text-[#202124]">
            <h1 className="text-[21px] leading-7">{demo.childName} just finished his mission!</h1>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d93025] text-lg font-semibold text-white">
                B
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Team Bhanzu</p>
                <p className="text-xs text-[#5f6368]">to {demo.parentEmail}</p>
              </div>
              <span className="text-xs text-[#5f6368]">now</span>
            </div>
            <article className="mt-6 text-[15px] leading-[1.65]">
              <p>Hi {parentFirstName},</p>
              <p className="mt-4">
                {demo.childName} just finished his mission, and instead of taking a break, he asked
                to keep playing! He's exploring more challenges in the Bhanzu app right now.
              </p>
              <p className="mt-4">
                This kind of curiosity is exactly what we love to see. Take a look at how he's
                progressing:
              </p>
              <Link
                to="/app/progress"
                className="mt-5 flex w-fit rounded-md bg-[#1a73e8] px-5 py-3 text-sm font-semibold text-white shadow-sm"
              >
                View {demo.childName}'s Activity Report →
              </Link>
              <p className="mt-5">Warmly,</p>
              <p>Team Bhanzu</p>
            </article>
          </div>
          <div className="flex h-12 shrink-0 items-center gap-2 border-t border-[#e8eaed] px-4">
            <button className="flex items-center gap-2 rounded-full border border-[#dadce0] px-4 py-2 text-sm text-[#5f6368]">
              <ArrowLeft className="h-4 w-4" /> Reply
            </button>
            <button aria-label="Search mail" className="ml-auto rounded-full p-2 text-[#5f6368]">
              <Search className="h-5 w-5" />
            </button>
          </div>
          {!embedded && (
            <div className="flex h-3 shrink-0 items-center justify-center">
              <span className="h-1 w-28 rounded-full bg-black" />
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main
      className={
        embedded
          ? "flex h-full min-h-0 w-full flex-col"
          : "flex min-h-dvh items-center justify-center bg-[#d7d9df] px-4 py-6"
      }
    >
      <section
        className={
          embedded
            ? "flex h-full min-h-0 w-full flex-col overflow-hidden bg-white"
            : "flex h-[min(820px,94dvh)] w-full max-w-[430px] flex-col overflow-hidden rounded-[3.1rem] border-[9px] border-[#17181a] bg-white shadow-2xl"
        }
      >
        {!embedded && (
          <div className="flex h-8 shrink-0 items-center justify-between bg-white px-7 text-[12px] font-semibold text-[#202124]">
            <span>9:41</span>
            <span>●●● Wi-Fi ▰</span>
          </div>
        )}
        <header className="flex h-14 shrink-0 items-center gap-5 border-b border-[#e8eaed] px-5 text-[#5f6368]">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to home"
              className="text-[#5f6368]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <Link to="/phone" aria-label="Back to phone" className="text-[#5f6368]">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          <span className="flex-1" />
          <Archive className="h-5 w-5" />
          <Trash2 className="h-5 w-5" />
          <Mail className="h-5 w-5" />
          <MoreVertical className="h-5 w-5" />
        </header>
        <div className="flex-1 overflow-y-auto px-5 pb-5 pt-4 text-[#202124]">
          <div className="flex items-start gap-2">
            <h1 className="flex-1 text-[21px] leading-7">
              {demo.childName}'s Math Adventure is Booked! 🎉 Plus, a Mission Just for Him
            </h1>
            <span className="mt-1 rounded bg-[#e8eaed] px-1.5 py-0.5 text-[10px] text-[#5f6368]">
              Inbox
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d93025] text-lg font-semibold text-white">
              B
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">
                Team Bhanzu{" "}
                <span className="font-normal text-[#5f6368]">&lt;hello@bhanzu.com&gt;</span>
              </p>
              <p className="text-xs text-[#5f6368]">to {demo.parentEmail}</p>
            </div>
            <span className="text-xs text-[#5f6368]">9:41 AM</span>
          </div>
          <article className="mt-6 text-[15px] leading-[1.65]">
            <p>Hi {parentFirstName},</p>
            <p className="mt-4">{demo.childName}'s free demo class with Bhanzu is confirmed!</p>
            <p className="mt-4">
              📅 <b>Date:</b> {formatDate(demo.demoDate)}
            </p>
            <p>
              🕓 <b>Time:</b> {demo.demoTime}
            </p>
            <p>
              🔗 <b>Join link:</b>{" "}
              <Link
                to="/game-intro"
                onClick={
                  onOpenGame
                    ? (event) => {
                        event.preventDefault();
                        onOpenGame();
                      }
                    : undefined
                }
                className="text-[#1a73e8] underline"
              >
                Join Demo Class
              </Link>
            </p>
            <p className="mt-4">
              While you wait, we've got something fun lined up for {demo.childName}. He's been
              invited on a 3-minute Math Mission, a quick, exciting challenge to get him warmed up
              before class.
            </p>
            <Link
              to="/game-intro"
              onClick={
                onOpenGame
                  ? (event) => {
                      event.preventDefault();
                      onOpenGame();
                    }
                  : undefined
              }
              className="mt-5 flex w-fit rounded-md bg-[#1a73e8] px-5 py-3 text-sm font-semibold text-white shadow-sm"
            >
              Start {demo.childName}'s First Mission →
            </Link>
            <p className="mt-5">We can't wait to meet him!</p>
            <p className="mt-4">
              Warmly,
              <br />
              Team Bhanzu
            </p>
          </article>
        </div>
        <div className="flex h-12 shrink-0 items-center gap-2 border-t border-[#e8eaed] px-4">
          <button className="flex items-center gap-2 rounded-full border border-[#dadce0] px-4 py-2 text-sm text-[#5f6368]">
            <ArrowLeft className="h-4 w-4" /> Reply
          </button>
          <button aria-label="Search mail" className="ml-auto rounded-full p-2 text-[#5f6368]">
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="flex h-3 shrink-0 items-center justify-center">
          <span className="h-1 w-28 rounded-full bg-black" />
        </div>
      </section>
    </main>
  );
}
