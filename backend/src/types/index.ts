// User types
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface UserPayload {
  id: number;
  email: string;
  name: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

// Task types
export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  userId: number;
  createdAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string | null;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string | null;
}

// Error response type
export interface ErrorResponse {
  success: false;
  error: string;
  statusCode: number;
}

// Success response type
export interface SuccessResponse<T> {
  success: true;
  data: T;
}

// JWT Payload
export interface JwtPayload {
  id: number;
  email: string;
}

// Custom Request with user info
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
  body: any;
}
