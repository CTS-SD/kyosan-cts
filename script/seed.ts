import { seed } from "./lib/seed";

seed().catch((err) => {
  console.error("Failed to seed database:", err);
  process.exit(1);
});
