import type { auth } from "./server";

export type Role = "admin" | "member" | "none";

export type GetSessionReturn = Awaited<ReturnType<typeof auth.api.getSession>>;
