export class ApiError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_EXISTS: "Email already registered",
  USER_NOT_FOUND: "User not found",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  TASK_NOT_FOUND: "Task not found",
  INVALID_REQUEST: "Invalid request",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
