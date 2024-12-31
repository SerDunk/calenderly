// src/types/event.ts
export type Event = {
  id: number;
  name: string;
  startTime: string; // e.g., "14:00"
  endTime: string; // e.g., "15:00"
  description?: string; // Optional field
  date: string; // e.g., "2024-12-31", formatted as YYYY-MM-DD
  category: "work" | "personal" | "other"; // Restricted to specific types
};
