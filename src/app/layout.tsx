import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Superteam Academy | Solana LMS",
  description:
    "Learn Solana development with interactive courses, code challenges, and on-chain credentials by Superteam Brazil.",
  metadataBase: new URL("https://superteam.academy"),
  openGraph: {
    title: "Superteam Academy | Solana LMS",
    description:
      "Learn Solana development with interactive courses, code challenges, and on-chain credentials by Superteam Brazil.",
    siteName: "Superteam Academy",
    url: "https://superteam.academy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(circle_at_20%_20%,rgba(64,145,255,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(211,137,255,0.1),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(64,145,255,0.06),transparent_40%)]`}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
