import { Response } from "express";
import { TaskModel } from "../models/Task";
import { ValidationUtils } from "../utils/validation";
import { ApiError, ERROR_MESSAGES, HTTP_STATUS } from "../utils/errors";
import { AuthenticatedRequest } from "../types";

export class TaskController {
  static getAll(req: AuthenticatedRequest, res: Response): void {
    try {
      if (!req.user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
      }

      const tasks = TaskModel.getAllByUserId(req.user.id);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        console.error("Get all tasks error:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  static getById(req: AuthenticatedRequest, res: Response): void {
    try {
      if (!req.user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
      }

      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const taskId = parseInt(paramId, 10);

      if (isNaN(taskId)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid task ID");
      }

      const task = TaskModel.findById(taskId, req.user.id);

      if (!task) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.TASK_NOT_FOUND);
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: task,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        console.error("Get task by ID error:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  static create(req: AuthenticatedRequest, res: Response): void {
    try {
      if (!req.user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
      }

      const validation = ValidationUtils.validateCreateTaskRequest(req.body);
      if (!validation.valid) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, validation.error || ERROR_MESSAGES.INVALID_REQUEST);
      }

      const task = TaskModel.create(req.user.id, req.body);

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: task,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        console.error("Create task error:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  static update(req: AuthenticatedRequest, res: Response): void {
    try {
      if (!req.user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
      }

      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const taskId = parseInt(paramId, 10);

      if (isNaN(taskId)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid task ID");
      }

      const validation = ValidationUtils.validateUpdateTaskRequest(req.body);
      if (!validation.valid) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, validation.error || ERROR_MESSAGES.INVALID_REQUEST);
      }

      // Verify task belongs to user
      const task = TaskModel.findById(taskId, req.user.id);
      if (!task) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.TASK_NOT_FOUND);
      }

      const updatedTask = TaskModel.update(taskId, req.user.id, req.body);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: updatedTask,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        console.error("Update task error:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }

  static delete(req: AuthenticatedRequest, res: Response): void {
    try {
      if (!req.user) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
      }

      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const taskId = parseInt(paramId, 10);

      if (isNaN(taskId)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid task ID");
      }

      // Verify task belongs to user
      const task = TaskModel.findById(taskId, req.user.id);
      if (!task) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.TASK_NOT_FOUND);
      }

      TaskModel.delete(taskId, req.user.id);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: { message: "Task deleted successfully" },
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
      } else {
        console.error("Delete task error:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        });
      }
    }
  }
}
