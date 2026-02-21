import { config } from "dotenv";
import { seedSessions } from "../seed-sessions";

config({ path: ".env.local" });

seedSessions()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding sessions:", error);
    process.exit(1);
  });
