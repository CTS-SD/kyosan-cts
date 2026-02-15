"use client";

import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth/client";

export function SessionHeartbeat() {
  useQuery({
    queryKey: ["session-heartbeat"],
    queryFn: () => authClient.getSession(),
    refetchInterval: 4 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
    staleTime: 60 * 1000,
  });

  return null;
}
