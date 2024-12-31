"use client";

import { FC } from "react";
import { Button } from "./ui/button";
import { Event } from "@/types/event";
import EventForm from "./Form";
import { useState } from "react";

type EventSidebarProps = {
  date: Date | undefined;
  events: Event[];
  handleAddEvent: (eventData: Event) => void;
  handleDeleteEvent: (eventId: number) => void;
  handleEditEvent: (updatedEvent: Event) => void;
  handleExportEvents: (format: "json" | "csv") => void;
};

const EventSidebar: FC<EventSidebarProps> = ({
  date,
  events,
  handleAddEvent,
  handleDeleteEvent,
  handleEditEvent,
  handleExportEvents,
}) => {
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const openEventForm = (event?: Event) => {
    setEditingEvent(event || null);
    setIsEventFormOpen(true);
  };

  const closeEventForm = () => {
    setEditingEvent(null);
    setIsEventFormOpen(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Event Management</h2>
      <div className="space-y-2">
        <Button onClick={() => openEventForm()} className="w-full">
          Add Event
        </Button>

        <h3 className="text-lg font-semibold">
          Events on {date?.toLocaleDateString()}
        </h3>
        <ul className="space-y-2">
          {events.map((event) => (
            <li
              key={event.id}
              className={`flex justify-between items-center ${
                event.category === "work"
                  ? "bg-green-100"
                  : event.category === "personal"
                  ? "bg-blue-100"
                  : "bg-yellow-100"
              } p-2 rounded`}
            >
              <div>
                <p className="font-semibold">{event.name}</p>
                <p className="text-sm text-gray-600">
                  {event.startTime} - {event.endTime}
                </p>
              </div>
              <div className="space-x-2">
                <Button
                  onClick={() => openEventForm(event)}
                  className="bg-blue-500 text-white"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-500 text-white"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between mt-4">
        <Button
          onClick={() => handleExportEvents("json")}
          className="w-full bg-green-500 text-white"
        >
          Export as JSON
        </Button>
        <Button
          onClick={() => handleExportEvents("csv")}
          className="w-full bg-yellow-500 text-white"
        >
          Export as CSV
        </Button>
      </div>

      {isEventFormOpen && (
        <EventForm
          onClose={closeEventForm}
          onSubmit={handleAddEvent}
          editingEvent={editingEvent}
          handleEdit={handleEditEvent}
        />
      )}
    </div>
  );
};

export default EventSidebar;
