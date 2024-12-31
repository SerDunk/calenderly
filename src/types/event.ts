export type Event = {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  description?: string;
  date: string;
  category: "work" | "personal" | "other";
};
