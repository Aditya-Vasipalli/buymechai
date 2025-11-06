import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuyMeChai - Support Your Favorite Creators",
  description: "Support your favorite content creators with UPI payments. Easy funding with chai tiers, team support, and link-in-bio features.",
  keywords: "creator funding, UPI payments, content creators, support creators, buy me coffee, chai, donations",
  authors: [{ name: "BuyMeChai Team" }],
  openGraph: {
    title: "BuyMeChai - Support Your Favorite Creators",
    description: "Support your favorite content creators with UPI payments. Easy funding with chai tiers, team support, and link-in-bio features.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuyMeChai - Support Your Favorite Creators",
    description: "Support your favorite content creators with UPI payments. Easy funding with chai tiers, team support, and link-in-bio features.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
