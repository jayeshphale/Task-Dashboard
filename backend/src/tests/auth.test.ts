import request from "supertest";
import app from "../app";
import { UserModel } from "../models/User";

describe("Authentication API", () => {
  describe("POST /auth/register", () => {
    it("should register a new user successfully", async () => {
      const response = await request(app).post("/auth/register").send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.user.email).toBe("john@example.com");
      expect(response.body.data.user.name).toBe("John Doe");
      expect(response.body.data.token).toBeDefined();
    });

    it("should fail when email already exists", async () => {
      // Create first user
      await request(app).post("/auth/register").send({
        name: "User One",
        email: "existing@example.com",
        password: "password123",
      });

      // Try to register with same email
      const response = await request(app).post("/auth/register").send({
        name: "User Two",
        email: "existing@example.com",
        password: "password456",
      });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain("already registered");
    });

    it("should fail with invalid email", async () => {
      const response = await request(app).post("/auth/register").send({
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain("Invalid email");
    });

    it("should fail with short password", async () => {
      const response = await request(app).post("/auth/register").send({
        name: "John Doe",
        email: "john@example.com",
        password: "123",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain("at least 6 characters");
    });

    it("should fail with missing fields", async () => {
      const response = await request(app).post("/auth/register").send({
        name: "John Doe",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /auth/login", () => {
    beforeEach(async () => {
      // Create a test user
      await request(app).post("/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should login successfully with correct credentials", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.user.email).toBe("test@example.com");
      expect(response.body.data.token).toBeDefined();
    });

    it("should fail with incorrect password", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain("Invalid email or password");
    });

    it("should fail with non-existent email", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "nonexistent@example.com",
        password: "password123",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain("Invalid email or password");
    });

    it("should fail with missing credentials", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "test@example.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
