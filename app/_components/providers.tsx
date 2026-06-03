"use client";

import { LucideProvider } from "lucide-react";
import { NavigationGuardProvider } from "next-navigation-guard";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PostHogProvider } from "@/app/_components/posthog-provider";
import { QueryProvider } from "@/app/_components/query-provider";
import { ConfirmDialogHost } from "@/components/confirm-dialog";
import { Toaster } from "@/components/ui/sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <LucideProvider strokeWidth={2.2}>
      <NavigationGuardProvider>
        <NuqsAdapter>
          <ThemeProvider attribute="class" defaultTheme="light">
            <QueryProvider>
              <PostHogProvider>
                {children}
                <Toaster />
                <ConfirmDialogHost />
              </PostHogProvider>
            </QueryProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </NavigationGuardProvider>
    </LucideProvider>
  );
};
