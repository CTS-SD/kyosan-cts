import { Toaster } from "@/components/ui/sonner";
import { SessionPromiseProvider } from "@/ctx/session-promise";
import { getSession } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/query";
import type { Metadata } from "next";
import { NavigationGuardProvider } from "next-navigation-guard";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono, Zen_Maru_Gothic } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "京産キャンスタ",
  description: "京都産業大学キャンパススタッフ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionPromise = getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", zenMaruGothic.variable, geistSans.variable, geistMono.variable)}>
        <NavigationGuardProvider>
          <NuqsAdapter>
            <SessionPromiseProvider value={sessionPromise}>
              <ThemeProvider attribute="class" defaultTheme="light">
                <QueryProvider>{children}</QueryProvider>
                <Toaster />
              </ThemeProvider>
            </SessionPromiseProvider>
          </NuqsAdapter>
        </NavigationGuardProvider>
      </body>
    </html>
  );
}
