import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  var __aurelQueryClient: ReturnType<typeof postgres> | undefined;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and configure it.");
}

// Reuse the connection across hot reloads in dev so we don't exhaust the pool.
const queryClient = global.__aurelQueryClient ?? postgres(connectionString, { max: 10 });
if (process.env.NODE_ENV !== "production") {
  global.__aurelQueryClient = queryClient;
}

export const db = drizzle(queryClient, { schema });
