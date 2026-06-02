"use client";

import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/features/auth/client";
import { authKeys } from "@/features/auth/query-keys";

export function SessionHeartbeat() {
  useQuery({
    queryKey: authKeys.sessionHeartbeat,
    queryFn: () => authClient.getSession(),
    refetchInterval: 4 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
    staleTime: 60 * 1000,
  });

  return null;
}
