import { Request, Response, NextFunction } from "express";
import { ApiError, ERROR_MESSAGES, HTTP_STATUS } from "../utils/errors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", error);

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
    return;
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  });
};
