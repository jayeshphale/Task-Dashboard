import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../types";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export class JwtUtils {
  static generateToken(payload: JwtPayload, expiresIn: string | number = "7d"): string {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = { expiresIn };
      const token = jwt.sign(payload, SECRET_KEY, options);
      return token;
    } catch (error) {
      throw error;
    }
  }

  static verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      return decoded;
    } catch (error) {
      throw error;
    }
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.decode(token) as JwtPayload | null;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
