import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import { cn } from "../lib/utils";
import "./globals.css";
import { Providers } from "./providers";

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "京産キャンスタ",
  description: "京都産業大学キャンパスツアースタッフ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={cn("antialiased", zenMaruGothic.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
