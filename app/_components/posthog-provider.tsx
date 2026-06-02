"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";
import { authClient } from "@/features/auth/client";
import { env } from "@/lib/env";

const posthogEnabled = env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NODE_ENV === "production";
const posthogKey = posthogEnabled ? env.NEXT_PUBLIC_POSTHOG_KEY : undefined;

export const PostHogProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (!posthogKey || posthog.__loaded) return;

    posthog.init(posthogKey, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: "identified_only",
    });
  }, []);

  if (!posthogKey) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <PostHogIdentify />
      {children}
    </PHProvider>
  );
};

const PostHogPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (!pathname) return;
    let url = window.origin + pathname;
    const search = searchParams.toString();
    if (search) url += `?${search}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, posthog]);

  return null;
};

const PostHogIdentify = () => {
  const { data: session } = authClient.useSession();
  const posthog = usePostHog();

  useEffect(() => {
    const user = session?.user;
    if (user) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } else if (posthog._isIdentified()) {
      posthog.reset();
    }
  }, [session, posthog]);

  return null;
};
