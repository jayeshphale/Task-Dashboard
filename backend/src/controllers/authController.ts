import { Response } from "express";
import { UserModel } from "../models/User";
import { JwtUtils } from "../utils/jwt";
import { ValidationUtils } from "../utils/validation";
import { ApiError, ERROR_MESSAGES, HTTP_STATUS } from "../utils/errors";
import { AuthResponse, AuthenticatedRequest } from "../types";

export class AuthController {
  static async register(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const validation = ValidationUtils.validateRegisterRequest(req.body);
      if (!validation.valid) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, validation.error || ERROR_MESSAGES.INVALID_REQUEST);
      }

      const { name, email, password } = req.body;

      // Check if email already exists
      const existingUser = UserModel.findByEmail(email);
      if (existingUser) {
        throw new ApiError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.EMAIL_EXISTS);
      }

      // Create new user
      const user = await UserModel.create(name, email, password);

      // Generate JWT token
      const token = JwtUtils.generateToken({
        id: user.id,
        email: user.email,
      });

      const response: AuthResponse = {
        user: UserModel.toPayload(user),
        token,
      };

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: response,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        console.error("Register error:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  static async login(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const validation = ValidationUtils.validateLoginRequest(req.body);
      if (!validation.valid) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, validation.error || ERROR_MESSAGES.INVALID_REQUEST);
      }

      const { email, password } = req.body;

      // Find user by email
      const user = UserModel.findByEmail(email);
      if (!user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      // Validate password
      const isPasswordValid = await UserModel.validatePassword(password, user.password);
      if (!isPasswordValid) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      // Generate JWT token
      const token = JwtUtils.generateToken({
        id: user.id,
        email: user.email,
      });

      const response: AuthResponse = {
        user: UserModel.toPayload(user),
        token,
      };

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: response,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        console.error("Login error:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }
}
