import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { StatsProvider } from "@/context/StatsContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Video Generator",
  description: "Turn product images into short-form videos for TikTok, Instagram Reels, and YouTube Shorts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50">
        <StatsProvider>{children}</StatsProvider>
      </body>
    </html>
  );
}
