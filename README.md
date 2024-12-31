# Calenderly

Calenderly is a dynamic event calendar application built with React.js and designed for seamless event management. It offers features like event creation, editing, deletion, and a modern UI for a smooth user experience.

---

## Features

### **Calendar View**

- Displays a calendar grid for the current month with proper day alignment.
- Navigate between months using "Previous" and "Next" buttons.

### **Event Management**

- Add events by clicking on a day.
- Edit or delete existing events for any day.
- Events include:
  - Event name
  - Start and end time
  - Optional description

### **Event List**

- Displays all events for the selected day in a side panel.

### **Data Persistence**

- Events are saved in `localStorage` to persist data between page refreshes.

### **Complex Logic**

- Handles month transitions automatically.
- Prevents overlapping events with validation logic.

---

## Bonus Features (Optional - Partially Implemented)

- Drag-and-drop functionality for rescheduling events.
- Color coding for event types.
- Export events as JSON or CSV.

---

## Tech Stack

- **React.js**: For dynamic UI and state management.
- **shadcn**: For modern and accessible UI components.
- **localStorage**: For data persistence.

---

## Live Demo

[Calenderly on Vercel](https://calenderly-blue.vercel.app/)

---

## Installation and Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/SerDunk/calenderly.git
   ```
