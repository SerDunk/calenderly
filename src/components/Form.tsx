// src/components/EventForm.tsx

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Event } from "@/types/event"; // Import the Event type

export default function EventForm({
  onClose,
  onSubmit,
  editingEvent,
  handleEdit,
}: {
  onClose: () => void;
  onSubmit: (eventData: Event) => void;
  editingEvent: Event | null;
  handleEdit: (eventData: Event) => void;
}) {
  const [formData, setFormData] = useState<Event>({
    id: 0, // Default ID, will be overwritten if editing
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent); // Populate the form with the existing event data
    }
  }, [editingEvent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "endTime") {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { startTime, endTime } = formData;

    if (startTime && endTime && endTime < startTime) {
      setError("End time cannot be before start time.");
      return;
    }

    if (editingEvent) {
      handleEdit(formData); // Edit existing event
    } else {
      // Assign a new ID automatically for new events
      onSubmit({ ...formData, id: Date.now() }); // Use timestamp as ID
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="name">Event Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="startTime">Start Time</Label>
        <Input
          id="startTime"
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          className="w-full mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="endTime">End Time</Label>
        <Input
          id="endTime"
          name="endTime"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          className="w-full mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Event description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mt-1"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end space-x-4 mt-2">
        <Button type="button" onClick={onClose} className="bg-gray-500">
          Cancel
        </Button>
        <Button type="submit">{editingEvent ? "Update" : "Submit"}</Button>
      </div>
    </form>
  );
}
