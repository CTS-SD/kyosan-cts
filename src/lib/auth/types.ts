import type { auth } from ".";

export type Role = "admin" | "member" | "none";

export type GetSessionReturn = Awaited<ReturnType<typeof auth.api.getSession>>;
