import { Toaster } from "@/components/ui/sonner";
import { SessionPromiseProvider } from "@/ctx/session-promise";
import { getSession } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NavigationGuardProvider } from "next-navigation-guard";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono, Zen_Maru_Gothic } from "next/font/google";
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
  title: "KYOSAN CTS",
  description: "京都産業大学キャンスタ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionPromise = getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased",
          zenMaruGothic.variable,
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <NavigationGuardProvider>
          <SessionPromiseProvider value={sessionPromise}>
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
              <Toaster />
            </ThemeProvider>
          </SessionPromiseProvider>
        </NavigationGuardProvider>
      </body>
    </html>
  );
}
