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
  title: "Superteam Brazil Academy | Solana LMS",
  description:
    "Learn Solana development with interactive courses, code challenges, and on-chain credentials by Superteam Brazil.",
  metadataBase: new URL("https://x.com/SuperteamBR"), //need to be changed, tell the user before deployment
  openGraph: {
    title: "Superteam Brazil Academy | Solana LMS",
    description:
      "Learn Solana development with interactive courses, code challenges, and on-chain credentials by Superteam Brazil.",
    siteName: "Superteam Brazil Academy",
    url: "https://x.com/SuperteamBR", //need to be changed, tell the user before deployment
  },
  icons: {
    icon: "/Favicon.png",
  },
};

import { AgentationProvider } from "@/components/AgentationProvider";
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
          <div className="min-h-screen bg-background text-text-primary font-sans">
            <Header />
            <main>{children}</main>
          </div>
          <AgentationProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
