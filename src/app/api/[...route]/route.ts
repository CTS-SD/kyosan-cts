import { Hono } from "hono";
import { handle } from "hono/vercel";
import quiz from "./quiz";
import adminQuiz from "./admin/quiz";
import adminGameMode from "./admin/game_mode";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/quiz", quiz)
  .route("/admin/quiz", adminQuiz)
  .route("/admin/game_mode", adminGameMode);

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
