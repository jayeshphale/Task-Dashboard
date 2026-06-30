import bcrypt from "bcrypt";
import { db } from "../database";
import { User, UserPayload } from "../types";

const SALT_ROUNDS = 10;

export class UserModel {
  static async create(name: string, email: string, password: string): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const stmt = db.prepare(
        "INSERT INTO users (name, email, password, createdAt) VALUES (?, ?, ?, datetime('now'))"
      );
      const result = stmt.run(name, email, hashedPassword);

      const user = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(result.lastInsertRowid) as User;

      return user;
    } catch (error) {
      throw error;
    }
  }

  static findByEmail(email: string): User | undefined {
    try {
      const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as User | undefined;
      return user;
    } catch (error) {
      throw error;
    }
  }

  static findById(id: number): User | undefined {
    try {
      const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User | undefined;
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  static toPayload(user: User): UserPayload {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
