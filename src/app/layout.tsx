import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./markdown.css";
import { Toaster } from "sonner";
import Providers from "./Providers";
import {Zen_Maru_Gothic} from "next/font/google";

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ["500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${zenMaruGothic.className} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
