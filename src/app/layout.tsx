import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TRPCProvider } from "@/lib/trpc-provider";
import { AuthProvider } from "@/components/auth-provider";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
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
