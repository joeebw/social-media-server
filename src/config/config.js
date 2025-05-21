import dotenv from "dotenv";

dotenv.config();

export const {
  PORT = 3000,
  TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN,
  SECRET_KEY,
  NODE_ENV,
} = process.env;
