import dotenv from "dotenv";
import app from "./app";
import { initializeDatabase } from "./database";

dotenv.config();

// Initialize database
initializeDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});