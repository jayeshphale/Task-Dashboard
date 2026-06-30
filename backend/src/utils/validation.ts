import { RegisterRequest, LoginRequest, CreateTaskRequest, UpdateTaskRequest } from "../types";

export class ValidationUtils {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password: string): string | null {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return null;
  }

  static validateRegisterRequest(data: unknown): { valid: boolean; error?: string } {
    if (!data || typeof data !== "object") {
      return { valid: false, error: "Invalid request body" };
    }

    const req = data as Record<string, unknown>;

    if (!req.name || typeof req.name !== "string" || req.name.trim().length === 0) {
      return { valid: false, error: "Name is required and must be a non-empty string" };
    }

    if (!req.email || typeof req.email !== "string") {
      return { valid: false, error: "Email is required" };
    }

    if (!this.validateEmail(req.email)) {
      return { valid: false, error: "Invalid email format" };
    }

    if (!req.password || typeof req.password !== "string") {
      return { valid: false, error: "Password is required" };
    }

    const passwordError = this.validatePassword(req.password);
    if (passwordError) {
      return { valid: false, error: passwordError };
    }

    return { valid: true };
  }

  static validateLoginRequest(data: unknown): { valid: boolean; error?: string } {
    if (!data || typeof data !== "object") {
      return { valid: false, error: "Invalid request body" };
    }

    const req = data as Record<string, unknown>;

    if (!req.email || typeof req.email !== "string") {
      return { valid: false, error: "Email is required" };
    }

    if (!this.validateEmail(req.email)) {
      return { valid: false, error: "Invalid email format" };
    }

    if (!req.password || typeof req.password !== "string") {
      return { valid: false, error: "Password is required" };
    }

    return { valid: true };
  }

  static validateCreateTaskRequest(data: unknown): { valid: boolean; error?: string } {
    if (!data || typeof data !== "object") {
      return { valid: false, error: "Invalid request body" };
    }

    const req = data as Record<string, unknown>;

    if (!req.title || typeof req.title !== "string" || req.title.trim().length === 0) {
      return { valid: false, error: "Title is required and must be a non-empty string" };
    }

    if (!req.description || typeof req.description !== "string") {
      return { valid: false, error: "Description is required" };
    }

    if (!req.priority || !["low", "medium", "high"].includes(req.priority as string)) {
      return { valid: false, error: "Priority must be 'low', 'medium', or 'high'" };
    }

    if (!req.status || !["todo", "in_progress", "done"].includes(req.status as string)) {
      return { valid: false, error: "Status must be 'todo', 'in_progress', or 'done'" };
    }

    return { valid: true };
  }

  static validateUpdateTaskRequest(data: unknown): { valid: boolean; error?: string } {
    if (!data || typeof data !== "object") {
      return { valid: false, error: "Invalid request body" };
    }

    const req = data as Record<string, unknown>;

    // All fields are optional for updates
    if (req.priority && !["low", "medium", "high"].includes(req.priority as string)) {
      return { valid: false, error: "Priority must be 'low', 'medium', or 'high'" };
    }

    if (req.status && !["todo", "in_progress", "done"].includes(req.status as string)) {
      return { valid: false, error: "Status must be 'todo', 'in_progress', or 'done'" };
    }

    return { valid: true };
  }
}
