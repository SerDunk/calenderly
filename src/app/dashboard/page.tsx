"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import EventSidebar from "@/components/EventSidebar";
import { Calendar } from "@/components/ui/calendar";
import { Event } from "@/types/event"; // Import the Event type

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  // Helper function to format the date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
  };

  // Load events from localStorage whenever the selected date changes
  useEffect(() => {
    if (date) {
      const storedEvents = localStorage.getItem(`events-${formatDate(date)}`);
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        setEvents([]); // No events for this date
      }
    }
  }, [date]);

  // Save events to localStorage whenever the events state changes
  useEffect(() => {
    if (date) {
      localStorage.setItem(
        `events-${formatDate(date)}`,
        JSON.stringify(events)
      );
    }
  }, [date, events]);

  const handleAddEvent = (eventData: Event) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, eventData];
      // Save the updated events to localStorage for the selected date
      if (date) {
        localStorage.setItem(
          `events-${formatDate(date)}`,
          JSON.stringify(updatedEvents)
        );
      }
      return updatedEvents;
    });
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event.id !== eventId);
      if (date) {
        localStorage.setItem(
          `events-${formatDate(date)}`,
          JSON.stringify(updatedEvents)
        );
      }
      return updatedEvents;
    });
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      if (date) {
        localStorage.setItem(
          `events-${formatDate(date)}`,
          JSON.stringify(updatedEvents)
        );
      }
      return updatedEvents;
    });
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
          />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border transform scale-150"
          />
        </div>
      </div>
    </Container>
  );
}
