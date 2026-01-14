import type { Metadata } from "next";
import { Geist, Geist_Mono, Kode_Mono } from "next/font/google";
import "./globals.css";

const kodoMono = Kode_Mono({
  variable: "--font-kodo-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kodoMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
