import { seeding } from "./lib/seed";

seeding().catch((err) => {
  console.error("Failed to seed database:", err);
  process.exit(1);
});
