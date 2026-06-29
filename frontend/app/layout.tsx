import Link from "next/link";

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
  title: "Reviewdibo — Product Reviews",
  description: "Discover products and read reviews from the community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900" suppressHydrationWarning>
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-semibold tracking-normal text-blue-700">Reviewdibo</Link>
          </div>
        </header>
        {children}
        <footer className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
            &copy; {new Date().getFullYear()} Reviewdibo
          </div>
        </footer>
      </body>
    </html>
  );
}
