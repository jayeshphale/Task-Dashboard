import { db } from "../database";
import { Task, CreateTaskRequest, UpdateTaskRequest, TaskStatus, TaskPriority } from "../types";

export class TaskModel {
  static create(userId: number, data: CreateTaskRequest): Task {
    try {
      const stmt = db.prepare(
        "INSERT INTO tasks (title, description, priority, status, dueDate, userId, createdAt) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))"
      );

      const result = stmt.run(
        data.title,
        data.description,
        data.priority,
        data.status,
        data.dueDate || null,
        userId
      );

      const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(result.lastInsertRowid) as Task;

      return task;
    } catch (error) {
      throw error;
    }
  }

  static findById(id: number, userId: number): Task | undefined {
    try {
      const task = db
        .prepare("SELECT * FROM tasks WHERE id = ? AND userId = ?")
        .get(id, userId) as Task | undefined;

      return task;
    } catch (error) {
      throw error;
    }
  }

  static findByIdAny(id: number): Task | undefined {
    try {
      const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task | undefined;
      return task;
    } catch (error) {
      throw error;
    }
  }

  static getAllByUserId(userId: number): Task[] {
    try {
      const tasks = db
        .prepare("SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC")
        .all(userId) as Task[];

      return tasks;
    } catch (error) {
      throw error;
    }
  }

  static update(id: number, userId: number, data: UpdateTaskRequest): Task {
    try {
      const task = this.findById(id, userId);
      if (!task) {
        throw new Error("Task not found");
      }

      const updates: { [key: string]: string | number | null } = {};
      if (data.title !== undefined) updates.title = data.title;
      if (data.description !== undefined) updates.description = data.description;
      if (data.priority !== undefined) updates.priority = data.priority;
      if (data.status !== undefined) updates.status = data.status;
      if (data.dueDate !== undefined) updates.dueDate = data.dueDate || null;

      if (Object.keys(updates).length === 0) {
        return task;
      }

      const setClause = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(", ");

      const values = Object.values(updates);
      values.push(id, userId);

      const stmt = db.prepare(`UPDATE tasks SET ${setClause} WHERE id = ? AND userId = ?`);
      stmt.run(...values);

      const updatedTask = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id) as Task;

      return updatedTask;
    } catch (error) {
      throw error;
    }
  }

  static delete(id: number, userId: number): boolean {
    try {
      const task = this.findById(id, userId);
      if (!task) {
        throw new Error("Task not found");
      }

      const stmt = db.prepare("DELETE FROM tasks WHERE id = ? AND userId = ?");
      const result = stmt.run(id, userId);

      return result.changes > 0;
    } catch (error) {
      throw error;
    }
  }
}
