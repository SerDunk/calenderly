import { Event } from "@/types/event";

// Helper function to format the date as YYYY-MM-DD
export const formatDate = (date: Date) => date.toISOString().split("T")[0];

// Load events for a specific date from localStorage
export const loadEvents = (date: Date): Event[] => {
  const storedEvents = localStorage.getItem(`events-${formatDate(date)}`);
  return storedEvents ? JSON.parse(storedEvents) : [];
};

// Save events for a specific date to localStorage
export const saveEvents = (date: Date, events: Event[]) => {
  localStorage.setItem(`events-${formatDate(date)}`, JSON.stringify(events));
};

// Add a new event
export const addEvent = (
  date: Date,
  events: Event[],
  newEvent: Event
): Event[] => {
  const updatedEvents = [...events, newEvent];
  saveEvents(date, updatedEvents);
  return updatedEvents;
};

// Delete an event
export const deleteEvent = (
  date: Date,
  events: Event[],
  eventId: number
): Event[] => {
  const updatedEvents = events.filter((event) => event.id !== eventId);
  saveEvents(date, updatedEvents);
  return updatedEvents;
};

// Edit an event
export const editEvent = (
  date: Date,
  events: Event[],
  updatedEvent: Event
): Event[] => {
  const updatedEvents = events.map((event) =>
    event.id === updatedEvent.id ? updatedEvent : event
  );
  saveEvents(date, updatedEvents);
  return updatedEvents;
};

// Export events for a specific month
export const exportEvents = (
  month: number,
  year: number,
  events: Event[],
  format: "json" | "csv"
) => {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === month && eventDate.getFullYear() === year;
  });

  if (format === "json") {
    return JSON.stringify(filteredEvents, null, 2);
  }

  // Generate CSV
  const csvHeader = "ID,Name,Start Time,End Time,Description,Category\n";
  const csvRows = filteredEvents.map(
    (event) =>
      `${event.id},${event.name},${event.startTime},${event.endTime},${
        event.description || ""
      },${event.category}`
  );
  return csvHeader + csvRows.join("\n");
};
