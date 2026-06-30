import request from "supertest";
import app from "../app";

describe("Task API", () => {
  let userToken: string;
  let userId: number;
  let anotherUserToken: string;
  let anotherUserId: number;

  beforeAll(async () => {
    // Create first user
    const registerResponse1 = await request(app).post("/auth/register").send({
      name: "User One",
      email: "user1@example.com",
      password: "password123",
    });

    userToken = registerResponse1.body.data.token;
    userId = registerResponse1.body.data.user.id;

    // Create second user
    const registerResponse2 = await request(app).post("/auth/register").send({
      name: "User Two",
      email: "user2@example.com",
      password: "password456",
    });

    anotherUserToken = registerResponse2.body.data.token;
    anotherUserId = registerResponse2.body.data.user.id;
  });

  describe("POST /tasks", () => {
    it("should create a task successfully", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "Complete project",
          description: "Finish the backend development",
          priority: "high",
          status: "in_progress",
          dueDate: "2025-01-15",
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe("Complete project");
      expect(response.body.data.userId).toBe(userId);
    });

    it("should fail without authentication", async () => {
      const response = await request(app).post("/tasks").send({
        title: "Test Task",
        description: "Test description",
        priority: "low",
        status: "todo",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it("should fail with invalid task data", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "Incomplete task",
          // Missing required fields
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should fail with invalid priority", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "Test Task",
          description: "Test description",
          priority: "invalid",
          status: "todo",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /tasks", () => {
    beforeEach(async () => {
      // Create tasks for user1
      await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "Task 1",
          description: "Description 1",
          priority: "high",
          status: "todo",
        });

      await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "Task 2",
          description: "Description 2",
          priority: "low",
          status: "done",
        });

      // Create task for user2
      await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${anotherUserToken}`)
        .send({
          title: "User2 Task",
          description: "This is user2's task",
          priority: "medium",
          status: "in_progress",
        });
    });

    it("should get all tasks for authenticated user", async () => {
      const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThanOrEqual(2);
      expect(response.body.data[0].userId).toBe(userId);
    });

    it("should not return other user's tasks", async () => {
      const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      const task = response.body.data.find((t: any) => t.title === "User2 Task");
      expect(task).toBeUndefined();
    });

    it("should fail without authentication", async () => {
      const response = await request(app).get("/tasks");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /tasks/:id", () => {
    let taskId: number;

    beforeEach(async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "Get test task",
          description: "Test get by id",
          priority: "medium",
          status: "todo",
        });

      taskId = response.body.data.id;
    });

    it("should get task by id", async () => {
      const response = await request(app)
        .get(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(taskId);
      expect(response.body.data.title).toBe("Get test task");
    });

    it("should not allow getting other user's task", async () => {
      const response = await request(app)
        .get(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${anotherUserToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    it("should fail with non-existent task id", async () => {
      const response = await request(app)
        .get("/tasks/9999")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /tasks/:id", () => {
    let taskId: number;

    beforeEach(async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "Update test task",
          description: "Test update",
          priority: "low",
          status: "todo",
        });

      taskId = response.body.data.id;
    });

    it("should update task successfully", async () => {
      const response = await request(app)
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "Updated title",
          status: "done",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe("Updated title");
      expect(response.body.data.status).toBe("done");
    });

    it("should not allow updating other user's task", async () => {
      const response = await request(app)
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${anotherUserToken}`)
        .send({
          title: "Hacker attempt",
        });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    it("should fail with invalid update data", async () => {
      const response = await request(app)
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          priority: "invalid_priority",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /tasks/:id", () => {
    let taskId: number;

    beforeEach(async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "Delete test task",
          description: "Test delete",
          priority: "medium",
          status: "todo",
        });

      taskId = response.body.data.id;
    });

    it("should delete task successfully", async () => {
      const response = await request(app)
        .delete(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify task is deleted
      const getResponse = await request(app)
        .get(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(getResponse.status).toBe(404);
    });

    it("should not allow deleting other user's task", async () => {
      const response = await request(app)
        .delete(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${anotherUserToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    it("should fail with non-existent task id", async () => {
      const response = await request(app)
        .delete("/tasks/9999")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
