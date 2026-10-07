import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type DemoState = {
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  childName: string;
  childAge: number;
  demoDate: Date;
  demoTime: string;
  preferredChannel: PreferredChannel;
  scheduled: boolean;
  reminderSet: boolean;
  celebrationAt: string | null;
  missionCelebrations: MissionCelebration[];
  tomorrowReply: boolean;
  missions: number;
};

export type MissionCelebration = {
  missionNumber: number;
  time: string;
  message: string;
  channel: Channel;
};

export type Channel = "whatsapp" | "email" | "sms";
export type PreferredChannel = Channel | "none";
export type CriticalMessage = {
  kind: "booking" | "invite" | "reminder";
  subject: string;
  body: string;
  link?: "/game-intro";
};
export type ChannelPreviewMessage = {
  kind: "booking" | "invite" | "reminder" | "appreciation" | "puzzle";
  subject: string;
  body: string;
  link?: "/game-intro";
};

const ORDINAL_WORDS = [
  "zeroth",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
];
const ENCOURAGEMENTS = [
  "What a brilliant start",
  "Amazing work — you're getting even sharper",
  "Fantastic thinking — your math powers are growing",
  "Outstanding job — you keep finding the answer",
];

export function missionName(missionNumber: number) {
  return ORDINAL_WORDS[missionNumber] ?? `${missionNumber}th`;
}

export function missionCelebration(childName: string, missionNumber: number) {
  const encouragement = ENCOURAGEMENTS[(missionNumber - 1) % ENCOURAGEMENTS.length];
  return `Hey! 🎉 ${childName} completed the ${missionName(missionNumber)} mission! ${encouragement}, ${childName}! ⭐`;
}

const initial = (): DemoState => {
  const d = new Date();
  d.setDate(d.getDate() + 4);
  return {
    parentName: "Priya Sharma",
    parentPhone: "+91 98765 43210",
    parentEmail: "priya.sharma@example.com",
    childName: "Aarav",
    childAge: 7,
    demoDate: d,
    demoTime: "5:00 PM",
    preferredChannel: "none",
    scheduled: false,
    reminderSet: false,
    celebrationAt: null,
    missionCelebrations: [],
    tomorrowReply: false,
    missions: 0,
  };
};

type Ctx = DemoState & {
  update: (p: Partial<DemoState>) => void;
  completeMission: () => void;
  reset: () => void;
};

const DemoContext = createContext<Ctx | null>(null);

export const nowTime = () =>
  new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

export function appreciationChannel(preferredChannel: PreferredChannel): Channel {
  return preferredChannel === "none" ? "sms" : preferredChannel;
}

export function puzzleChannel(preferredChannel: PreferredChannel): Channel {
  return preferredChannel === "none" ? "whatsapp" : preferredChannel;
}

export function criticalMessages(demo: DemoState): CriticalMessage[] {
  return [
    {
      kind: "booking",
      subject: "Demo class confirmed",
      body: `Demo class confirmed for ${demo.childName} on ${formatDate(demo.demoDate)} at ${demo.demoTime} IST.`,
    },
    {
      kind: "invite",
      subject: `Your first mission is ready, ${demo.childName}!`,
      body: `A 3-minute math mission is ready for ${demo.childName}. Open the link below to get started.`,
      link: "/game-intro",
    },
    {
      kind: "reminder",
      subject: "Your demo is tomorrow",
      body: `A reminder: ${demo.childName}'s Bhanzu demo is tomorrow at ${demo.demoTime} IST.`,
    },
  ];
}

export function dailyPuzzleMessages(demoDate: Date, childName: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const demoDay = new Date(demoDate);
  demoDay.setHours(0, 0, 0, 0);
  const daysRemaining = Math.max(0, Math.ceil((demoDay.getTime() - today.getTime()) / 86_400_000));

  return Array.from({ length: daysRemaining }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() + index + 1);
    return {
      date,
      message: `${childName}, your puzzle for ${formatDate(date)} is ready! Open: /game-intro`,
    };
  });
}

export function channelMessages(demo: DemoState, channel: Channel): ChannelPreviewMessage[] {
  const messages: ChannelPreviewMessage[] = criticalMessages(demo).map(
    ({ kind, subject, body, link }) => ({
      kind,
      subject,
      body,
      ...(link ? { link } : {}),
    }),
  );

  messages.push(
    ...demo.missionCelebrations
      .filter((celebration) => celebration.channel === channel)
      .map((celebration) => ({
        kind: "appreciation" as const,
        subject: `${demo.childName} completed a mission!`,
        body: celebration.message,
        link: "/game-intro" as const,
      })),
  );

  if (puzzleChannel(demo.preferredChannel) === channel) {
    messages.push(
      ...dailyPuzzleMessages(demo.demoDate, demo.childName).map(({ date, message }) => ({
        kind: "puzzle" as const,
        subject: `Daily puzzle · ${formatDate(date)}`,
        body: message,
        link: "/game-intro" as const,
      })),
    );
  }

  return messages;
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(initial);
  const update = useCallback((p: Partial<DemoState>) => setState((s) => ({ ...s, ...p })), []);
  // Queues the WhatsApp celebration message the instant a win button fires.
  const completeMission = useCallback(() => {
    const time = nowTime();
    setState((s) => ({
      ...s,
      missions: s.missions + 1,
      celebrationAt: time,
      missionCelebrations: [
        ...s.missionCelebrations,
        {
          missionNumber: s.missions + 1,
          time,
          message: missionCelebration(s.childName, s.missions + 1),
          channel: appreciationChannel(s.preferredChannel),
        },
      ],
    }));
  }, []);
  const reset = useCallback(() => setState(initial()), []);
  const value = useMemo(
    () => ({ ...state, update, completeMission, reset }),
    [state, update, completeMission, reset],
  );
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const c = useContext(DemoContext);
  if (!c) throw new Error("useDemo must be used in DemoProvider");
  return c;
}
