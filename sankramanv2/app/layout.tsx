import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
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
  title: "Prakalp 4.0 - National Level Project Exhibition | FR CRCE",
  description: "Prakalp 4.0 is FR CRCE's flagship National-Level Project Exhibition competition organized by IEEE, WIE, and Project Cell. Join 120+ teams from 25+ colleges in showcasing breakthrough hardware and software innovations with ₹100K prize pool.",
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
      <body className="min-h-full flex flex-col text-white">
        <div className="fixed inset-0 -z-10">
          <Image
            src="/bg.jpg"
            alt="background"
            fill
            priority
            quality={100}
            className="object-cover"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
