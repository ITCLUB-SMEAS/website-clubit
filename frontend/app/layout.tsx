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
  title: "IT Club SMEAS - Innovate, Create, Inspire",
  description: "Welcome to IT Club SMEAS - A community of tech enthusiasts, developers, and innovators. Join us to learn, build, and grow together.",
  keywords: ["IT Club", "Technology", "Programming", "Coding", "Community", "Innovation", "Tech Community"],
  authors: [{ name: "IT Club Team" }],
  openGraph: {
    title: "IT Club SMEAS - Innovate, Create, Inspire",
    description: "Join our community of tech enthusiasts, developers, and innovators.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Club SMEAS - Innovate, Create, Inspire",
    description: "Join our community of tech enthusiasts, developers, and innovators.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
