# Task Dashboard

## Project Overview

Task Dashboard is a React + TypeScript mini project management board that lets users create, edit, delete, filter, and move tasks between statuses. The app uses React Router for navigation, React Context + useReducer for global state, and localStorage for persistence.

## Features

- Board view with three status columns: To Do, In Progress, and Done
- Drag-and-drop task movement using `@hello-pangea/dnd`
- Task creation and editing with reusable form components
- Delete confirmation dialog for task removal
- Priority and assignee filtering
- Responsive layout for desktop, tablet, and mobile
- LocalStorage persistence across page reloads
- Material UI theme and polished visual styling

## Setup Instructions

1. Navigate to the project directory:

```bash
cd "C:/Users/Jayesh Phale/task-dashboard"
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Run tests:

```bash
npm run test
```

## Architecture Decisions

- **React Context + useReducer**: Chosen for a lightweight global state solution with clear action patterns and predictable task updates.
- **Custom hooks**: `useTasks` and `useFilteredTasks` keep logic reusable and avoid prop drilling across component boundaries.
- **Separation of concerns**: Pages manage layout, while components encapsulate reusable UI logic for cards, columns, dialogs, and forms.
- **LocalStorage persistence**: Ensures the board state remains available after reload without a backend dependency.

## Why React Context instead of Zustand

React Context + `useReducer` keeps the project dependency footprint small and aligns with the assignment requirement. It also provides a built-in pattern that is easy to reason about, especially in a medium-sized task dashboard where state updates are grouped into a fixed set of actions.

## Trade-offs

- The app uses localStorage instead of a remote API to keep the experience fast and self-contained.
- Drag-and-drop order is handled at the status level instead of preserving cross-column list ordering for simplicity.
- The current form validation is intentionally straightforward and focused on required fields and due date restrictions.

## Future Improvements

- Add inline task comments and attachments
- Support task sorting and due date reminders
- Add dark mode and custom workspace themes
- Introduce a backend for team collaboration and real-time updates

## AI Usage

I used GitHub Copilot and ChatGPT for code suggestions, scaffolding assistance, and refactoring ideas. All generated code was reviewed, tested, and integrated manually.
