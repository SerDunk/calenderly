// src/components/EventSidebar.tsx

import { Button } from "./ui/button";
import { Event } from "@/types/event"; // Import the Event type
import { useState } from "react";
import EventForm from "./Form"; // Import the EventForm component

export default function EventSidebar({
  date,
  events,
  handleAddEvent,
  handleDeleteEvent,
  handleEditEvent,
}: {
  date: Date | undefined;
  events: Event[];
  handleAddEvent: (eventData: Event) => void;
  handleDeleteEvent: (eventId: number) => void;
  handleEditEvent: (eventData: Event) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleAddEventClick = () => {
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingEvent(null);
    setShowModal(false);
  };

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-xl font-bold">
          {date ? date.toDateString() : "No date selected"}
        </h1>
      </div>
      <div>
        {events.length === 0 ? (
          <p>No events</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="p-2 border-b">
              <h3 className="font-semibold">{event.name}</h3>
              <p>
                {event.startTime} - {event.endTime}
              </p>
              <p>{event.description}</p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="bg-blue-500 text-white"
                  onClick={() => handleEditClick(event)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="bg-red-500 text-white"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <Button
          variant="outline"
          className="rounded"
          onClick={handleAddEventClick}
        >
          Add Event
        </Button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 ">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingEvent ? "Edit Event" : "Add Event"}
            </h2>
            <EventForm
              onClose={handleCloseModal}
              onSubmit={handleAddEvent}
              editingEvent={editingEvent}
              handleEdit={handleEditEvent}
            />
          </div>
        </div>
      )}
    </div>
  );
}
