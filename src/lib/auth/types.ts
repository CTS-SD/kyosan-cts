import { auth } from ".";

export type GetSessionReturn = Awaited<ReturnType<typeof auth.api.getSession>>;
