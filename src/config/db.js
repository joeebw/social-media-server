import { createClient } from "@libsql/client";
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "./config.js";

const config = {
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
};

const db = createClient(config);

export default db;
