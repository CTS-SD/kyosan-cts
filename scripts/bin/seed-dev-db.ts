import { config } from "dotenv";
import { seedDb } from "../seed";

config({ path: ".env.local" });

seedDb().catch((error) => {
  console.error("Error seeding dev database:", error);
  process.exit(1);
});
