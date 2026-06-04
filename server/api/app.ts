import { Hono } from "hono";
import { configRoute, departmentsRoute, facultiesRoute, quizzesRoute, sessionsRoute, studentsRoute } from "./routes";

export const app = new Hono().basePath("/api");

const route = app
  .route("/quizzes", quizzesRoute)
  .route("/students", studentsRoute)
  .route("/departments", departmentsRoute)
  .route("/faculties", facultiesRoute)
  .route("/sessions", sessionsRoute)
  .route("/config", configRoute);

export type AppType = typeof route;
