"use client";

import { GetSessionReturn } from "@/lib/auth/types";
import { createContext, useContext } from "react";

const SessionPromiseContext = createContext<Promise<GetSessionReturn> | null>(
  null,
);

export const useSessionPromise = () => {
  const value = useContext(SessionPromiseContext);
  if (!value)
    throw new Error(
      "useSessionPromise must be used within a SessionPromiseProvider",
    );
  return value;
};

export const SessionPromiseProvider = (
  props: React.ComponentProps<typeof SessionPromiseContext.Provider>,
) => {
  return <SessionPromiseContext.Provider {...props} />;
};
