import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { authenticate } from "../middleware/auth";

const taskRouter = Router();

// All task routes require authentication
taskRouter.use(authenticate);

taskRouter.get("/", TaskController.getAll);
taskRouter.get("/:id", TaskController.getById);
taskRouter.post("/", TaskController.create);
taskRouter.put("/:id", TaskController.update);
taskRouter.delete("/:id", TaskController.delete);

export default taskRouter;
