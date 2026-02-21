"use client";

import { NavigationGuardProvider } from "next-navigation-guard";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/app/_components/query-provider";
import { ConfirmDialogHost } from "@/components/confirm-dialog";
import { Toaster } from "@/components/ui/sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationGuardProvider>
      <NuqsAdapter>
        <ThemeProvider attribute="class" defaultTheme="light">
          <QueryProvider>
            {children}
            <Toaster />
            <ConfirmDialogHost />
          </QueryProvider>
        </ThemeProvider>
      </NuqsAdapter>
    </NavigationGuardProvider>
  );
};
