import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type DemoState = {
  parentName: string;
  childName: string;
  childAge: number;
  demoDate: Date;
  demoTime: string;
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
};

const ORDINAL_WORDS = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"];
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
    childName: "Aarav",
    childAge: 7,
    demoDate: d,
    demoTime: "5:00 PM",
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

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(initial);
  const update = useCallback((p: Partial<DemoState>) => setState((s) => ({ ...s, ...p })), []);
  // Queues the WhatsApp celebration message the instant a win button fires.
  const completeMission = useCallback(
    () =>
      setState((s) => ({
        ...s,
        missions: s.missions + 1,
        celebrationAt: nowTime(),
        missionCelebrations: [
          ...s.missionCelebrations,
          {
            missionNumber: s.missions + 1,
            time: nowTime(),
            message: missionCelebration(s.childName, s.missions + 1),
          },
        ],
      })),
    [],
  );
  const reset = useCallback(() => setState(initial()), []);
  const value = useMemo(() => ({ ...state, update, completeMission, reset }), [state, update, completeMission, reset]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const c = useContext(DemoContext);
  if (!c) throw new Error("useDemo must be used in DemoProvider");
  return c;
}
