import {
  dailyPuzzleChannel,
  formatDate,
  missionName,
  type DemoState,
  type MessageChannel,
} from "./demo";

export type ChannelMessage = {
  id: string;
  kind: "booking" | "invite" | "reminder" | "celebration" | "daily-puzzle";
  title: string;
  text: string;
  link?: string;
  time: string;
};

export function daysUntilDemo(date: Date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const demoDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.max(0, Math.ceil((demoDay.getTime() - today.getTime()) / 86_400_000));
}

export function channelMessages(state: DemoState, channel: MessageChannel): ChannelMessage[] {
  const critical: ChannelMessage[] = [
    {
      id: "booking",
      kind: "booking",
      title: "Demo class confirmed",
      text: `Hi ${state.parentName}! ${state.childName}'s demo is confirmed for ${formatDate(state.demoDate)} at ${state.demoTime} IST. Our teacher will meet you live on Zoom.`,
      time: "10:02 AM",
    },
    {
      id: "invite",
      kind: "invite",
      title: `${state.childName}'s first math mission`,
      text: `A 3-minute math mission is ready for ${state.childName}. Can they crack it before the demo?`,
      link: "/game-intro",
      time: "10:05 AM",
    },
    {
      id: "day-before",
      kind: "reminder",
      title: "Your Bhanzu demo is tomorrow",
      text: `Reminder: ${state.childName}'s live Bhanzu demo is tomorrow at ${state.demoTime} IST. We can't wait to meet you!`,
      time: "9:00 AM",
    },
  ];

  const celebrations: ChannelMessage[] = state.missionCelebrations
    .filter((item) => item.channel === channel)
    .map((item) => ({
      id: `celebration-${item.missionNumber}`,
      kind: "celebration",
      title: `Mission ${item.missionNumber} complete`,
      text: item.message,
      time: item.time,
    }));

  const puzzleChannel = dailyPuzzleChannel(state.preferredChannel);
  const puzzles: ChannelMessage[] =
    channel === puzzleChannel
      ? Array.from({ length: daysUntilDemo(state.demoDate) }, (_, index) => ({
          id: `daily-puzzle-${index + 1}`,
          kind: "daily-puzzle" as const,
          title: `Daily math mission ${index + 1}`,
          text: `${state.childName}'s ${missionName(state.missions + index + 1)} mission is ready. Keep the streak going before demo day!`,
          link: "/game-intro",
          time: "8:00 AM",
        }))
      : [];

  return [...critical, ...celebrations, ...puzzles];
}
