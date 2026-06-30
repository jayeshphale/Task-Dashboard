import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../utils/jwt";
import { ApiError, ERROR_MESSAGES, HTTP_STATUS } from "../utils/errors";
import { AuthenticatedRequest, JwtPayload } from "../types";

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
    }

    const token = authHeader.slice(7);

    const payload = JwtUtils.verifyToken(token);
    req.user = payload;

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: ERROR_MESSAGES.UNAUTHORIZED,
      });
    }
  }
};
