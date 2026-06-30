# Task Dashboard

## Project Overview

Task Dashboard is a React + TypeScript task board with a separate backend API. The frontend supports task creation, editing, deletion, filtering, and drag-and-drop status updates. The backend provides authenticated task persistence with SQLite, JWT, and bcrypt.

## Features

- Task board with To Do, In Progress, and Done columns
- Create, edit, and delete tasks
- Drag-and-drop task movement between statuses
- Priority and status filtering
- Frontend persistence using localStorage
- Backend persistence and authenticated task APIs
- JWT-based authentication with register/login
- User-isolated task access

## Tech Stack

- Frontend: React, TypeScript, Vite, Material UI, React Router
- Backend: Node.js, Express, TypeScript, SQLite, better-sqlite3, JWT, bcrypt
- Testing: Vitest for frontend, Jest + Supertest for backend
- Package manager: npm

## Folder Structure

```
.
├── backend/                # Node.js/Express backend API
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── src/                    # frontend React app
├── public/
├── package.json            # frontend dependencies and scripts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Installation

### Frontend

```bash
npm install
```

### Backend

```bash
cd backend
npm install
```

## Environment Variables

Copy the backend template and set a secure JWT secret.

```bash
cd backend
cp .env.example .env
```

Backend variables:

- `PORT` — Server port (default: `5000`)
- `JWT_SECRET` — JWT signing secret
- `NODE_ENV` — Environment mode (`development` or `production`)

## Running Frontend

```bash
npm run dev
```

Open the app at `http://localhost:5173`.

## Running Backend

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:5000` by default.

## API Documentation

### Base URL

`http://localhost:5000`

### Authentication

#### Register

`POST /auth/register`

Body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@example.com"
    },
    "token": "..."
  }
}
```

#### Login

`POST /auth/login`

Body:

```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

### Tasks

All task requests require an Authorization header:

```
Authorization: Bearer <token>
```

#### Get all tasks

`GET /tasks`

#### Get a task

`GET /tasks/:id`

#### Create a task

`POST /tasks`

Body:

```json
{
  "title": "Test task",
  "description": "Task details",
  "priority": "medium",
  "status": "todo",
  "dueDate": "2025-01-15"
}
```

#### Update a task

`PUT /tasks/:id`

Body (any subset):

```json
{
  "title": "Updated title",
  "status": "done"
}
```

#### Delete a task

`DELETE /tasks/:id`

## Testing

### Frontend

```bash
npm test
```

### Backend

```bash
cd backend
npm test
```

## State Management Choice and Why

The frontend uses React Context + `useReducer`. This keeps dependencies minimal, provides a predictable action-based state flow, and avoids prop drilling for this medium-sized task board.

## Trade-offs / Shortcuts

- The frontend uses localStorage instead of a remote API for persistence.
- Drag-and-drop ordering is managed by status column rather than full list ordering.
- Form validation is straightforward and focuses on required fields.
- The backend is contained in `backend/` so API behavior is separated from frontend state.

## Future Improvements

- Add real-time collaboration and shared workspaces
- Add task comments, attachments, and reminders
- Add dark mode and workspace themes
- Add backend persistence for the frontend app
- Add more advanced filtering and search

## AI Usage

GitHub Copilot and ChatGPT were used for code suggestions, scaffolding, and refactoring ideas. All generated suggestions were reviewed and integrated manually.
