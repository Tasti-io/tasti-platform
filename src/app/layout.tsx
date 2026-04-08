import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tasti.io — AI Growth Platform for Restaurants",
  description: "Predictable growth system for restaurants. AI-powered marketing, analytics, and operations in one platform.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
