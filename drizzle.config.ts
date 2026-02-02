import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema/index.ts",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
  verbose: process.env.NODE_ENV !== "production",
  strict: true,
});
