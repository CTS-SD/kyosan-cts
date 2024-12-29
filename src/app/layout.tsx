import type { Metadata } from "next";
import "./globals.css";
import "./markdown.css";
import { Toaster } from "sonner";
import Providers from "./Providers";

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
