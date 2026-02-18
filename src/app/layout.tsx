import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  // This font supports variable axes like weight and width
});

export const metadata: Metadata = {
  title: {
    default: "Superteam Brazil Academy | Solana LMS",
    template: "%s | Superteam Brazil Academy",
  },
  description: "Learn Solana development with interactive courses, code challenges, and on-chain credentials by Superteam Brazil.",
  metadataBase: new URL("https://academy.superteambrazill.com"), // Placeholder URL
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://academy.superteambrazill.com",
    title: "Superteam Brazil Academy | Solana LMS",
    description: "Master Solana development with interactive lessons and real-world challenges.",
    siteName: "Superteam Brazil Academy",
    images: [
      {
        url: "/og-image.jpg", // We need to ensure this exists or use a remote placeholder
        width: 1200,
        height: 630,
        alt: "Superteam Brazil Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Superteam Brazil Academy | Solana LMS",
    description: "Master Solana development with interactive lessons and real-world challenges.",
    images: ["/og-image.jpg"],
    creator: "@SuperteamBR",
  },
  icons: {
    icon: "/Favicon.png",
    shortcut: "/Favicon.png",
    apple: "/Favicon.png",
  },
};

import { AgentationProvider } from "@/components/AgentationProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${archivo.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-background text-text-primary font-sans">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <AgentationProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
