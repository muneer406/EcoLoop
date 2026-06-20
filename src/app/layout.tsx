import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TRPCProvider } from "@/lib/trpc-provider";
import { AuthProvider } from "@/components/auth-provider";
import { SkipLink } from "@/components/skip-link";
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
  title: "EcoLoop — Know your carbon. Build the habit. See the change.",
  description:
    "Track and reduce your carbon footprint with AI-powered insights. Understand, track, and reduce your environmental impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <main id="main-content" className="flex flex-1 flex-col" role="main">
          <TRPCProvider>
            <AuthProvider>{children}</AuthProvider>
          </TRPCProvider>
        </main>
      </body>
    </html>
  );
}
