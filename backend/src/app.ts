import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import taskRouter from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (_req, res) => {
  res.json({
    message: "Task Dashboard Backend API is running 🚀",
    version: "1.0.0",
  });
});

// Routes
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;