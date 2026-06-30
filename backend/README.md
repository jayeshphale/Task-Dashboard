# Task Dashboard

## Project Overview

Task Dashboard is a full-stack task management application built with **React + TypeScript** for the frontend and **Node.js + Express + TypeScript** for the backend.

The application allows users to securely register, log in, and manage their personal tasks. Users can create, edit, delete, filter, and organize tasks while ensuring that each user can only access their own data.

---

# Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router
- Material UI
- React Context API
- useReducer
- @hello-pangea/dnd

### Backend
- Node.js
- Express.js
- TypeScript
- SQLite (better-sqlite3)
- JWT Authentication
- bcrypt
- Jest
- Supertest

---

# Features

## Frontend

- Board view with three status columns:
  - To Do
  - In Progress
  - Done
- Drag & Drop task movement
- Create Task
- Edit Task
- Delete Task
- Priority filtering
- Assignee filtering
- Responsive Design
- LocalStorage support
- Material UI Theme

---

## Backend

### Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt

### Task APIs

- Get all tasks
- Get task by ID
- Create task
- Update task
- Delete task

### Security

- Protected APIs using JWT
- User-specific task isolation
- Password hashing
- Request validation
- Centralized error handling
- Proper HTTP status codes

### Database

SQLite database automatically initializes on server startup.

Tables:

### Users

- id
- name
- email
- password
- createdAt

### Tasks

- id
- title
- description
- priority
- status
- dueDate
- userId
- createdAt

---

# Project Structure

```
Task-Dashboard
│
├── src/                 # Frontend
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── tests/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── .env.example
│   └── README.md
│
└── README.md
```

---

# Setup Instructions

## Frontend

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

---

## Backend

Go to backend folder

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create environment file

```env
PORT=5000
JWT_SECRET=your_secret_key
```

Run backend

```bash
npm run dev
```

Build backend

```bash
npm run build
```

Run backend tests

```bash
npm test
```

---

# Backend API Endpoints

## Authentication

### Register

```
POST /auth/register
```

### Login

```
POST /auth/login
```

---

## Tasks

```
GET /tasks
GET /tasks/:id
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id
```

---

# Architecture Decisions

### Frontend

- React Context + useReducer for global state management
- Reusable custom hooks
- Component-based architecture
- LocalStorage persistence

### Backend

- MVC Architecture
- Controllers handle business logic
- Models manage database operations
- Middleware for authentication and error handling
- SQLite for lightweight persistence
- JWT for stateless authentication

---

# Testing

Backend testing uses:

- Jest
- Supertest

Test coverage includes:

- User Registration
- User Login
- Authentication Middleware
- Task CRUD APIs
- Unauthorized Requests
- Validation
- User Isolation

---

# Future Improvements

- Team collaboration
- Real-time task updates
- Notifications
- Comments & Attachments
- File uploads
- Dark mode
- Docker deployment
- PostgreSQL support
- Refresh Tokens
- Rate Limiting

---

# AI Usage

This project was developed with assistance from:

- GitHub Copilot
- ChatGPT

AI tools were used for:

- Code suggestions
- Refactoring ideas
- Documentation
- Debugging assistance

All generated code was reviewed, tested, modified where necessary, and manually integrated before submission.