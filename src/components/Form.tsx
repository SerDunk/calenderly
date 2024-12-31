import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Event } from "@/types/event";

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
    id: 0,
    name: "",
    startTime: "",
    endTime: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    category: "personal",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent);
    }
  }, [editingEvent]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      handleEdit(formData);
    } else {
      onSubmit({ ...formData, id: Date.now() });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto shadow-lg">
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
          <div className="mb-4 flex space-x-4">
            <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, category: "work" }))
              }
              className={`w-full ${
                formData.category === "work" ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              Work
            </Button>
            <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, category: "personal" }))
              }
              className={`w-full ${
                formData.category === "personal" ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              Personal
            </Button>
            <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, category: "other" }))
              }
              className={`w-full ${
                formData.category === "other" ? "bg-yellow-500" : "bg-gray-200"
              }`}
            >
              Other
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-4 mt-2">
            <Button type="button" onClick={onClose} className="bg-gray-500">
              Cancel
            </Button>
            <Button type="submit">{editingEvent ? "Update" : "Submit"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
