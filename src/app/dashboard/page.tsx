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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isEventOverlapping = (
  newEvent: Event,
  existingEvents: Event[]
): boolean => {
  const newStart = new Date(newEvent.startTime).getTime();
  const newEnd = new Date(newEvent.endTime).getTime();

  if (isNaN(newStart) || isNaN(newEnd)) {
    toast.error("Event Times are overlapping");
    return true;
  }

  for (const event of existingEvents) {
    const existingStart = new Date(event.startTime).getTime();
    const existingEnd = new Date(event.endTime).getTime();

    if (
      (newStart < existingEnd && newStart >= existingStart) ||
      (newEnd > existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd)
    ) {
      toast.error("Event overlaps with an existing event.");
      return true;
    }
  }
  return false;
};

export default function Dashboard() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (date) {
      setEvents(loadEvents(date));
    }
  }, [date]);

  const handleAddEvent = (eventData: Event) => {
    if (isEventOverlapping(eventData, events)) return;

    setEvents((prevEvents) => addEvent(date, prevEvents, eventData));
    toast.success("Event added successfully!");
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents((prevEvents) => deleteEvent(date, prevEvents, eventId));
    toast.info("Event deleted successfully.");
  };

  const handleEditEvent = (updatedEvent: Event) => {
    if (isEventOverlapping(updatedEvent, events)) return;

    setEvents((prevEvents) => editEvent(date, prevEvents, updatedEvent));
    toast.success("Event updated successfully!");
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
    toast.success(`Events exported as ${format.toUpperCase()}`);
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} />
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
            onDayClick={(day: Date) => setDate(day)}
            className="rounded-md border transform scale-150"
          />
        </div>
      </div>
    </Container>
  );
}
