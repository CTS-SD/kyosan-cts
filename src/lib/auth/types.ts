import { auth } from "../auth";

export type GetSessionReturn = Awaited<ReturnType<typeof auth.api.getSession>>;
