"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import EventSidebar from "@/components/EventSidebar";
import { Calendar } from "@/components/ui/calendar";
import { Event } from "@/types/event";
import {
  loadEvents,
  addEvent,
  deleteEvent,
  editEvent,
  exportEvents,
} from "@/utils/actions";

export default function Dashboard() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (date) {
      setEvents(loadEvents(date));
    }
  }, [date]);

  const handleAddEvent = (eventData: Event) => {
    setEvents((prevEvents) => addEvent(date, prevEvents, eventData));
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents((prevEvents) => deleteEvent(date, prevEvents, eventId));
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents((prevEvents) => editEvent(date, prevEvents, updatedEvent));
  };

  const handleExportEvents = (format: "json" | "csv") => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const data = exportEvents(month, year, events, format);

    const blob = new Blob([data], {
      type: format === "json" ? "application/json" : "text/csv",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `events_${year}-${month + 1}.${format}`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-100 p-4 border-r">
          <EventSidebar
            date={date}
            events={events}
            handleAddEvent={handleAddEvent}
            handleDeleteEvent={handleDeleteEvent}
            handleEditEvent={handleEditEvent}
            handleExportEvents={handleExportEvents}
          />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Calendar
            mode="single"
            selected={date}
            onDayClick={(day: Date) => setDate(day)} // Assuming onDayClick for ShadCN
            className="rounded-md border transform scale-150"
          />
        </div>
      </div>
    </Container>
  );
}
