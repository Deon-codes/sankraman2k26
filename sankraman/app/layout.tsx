import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRAKALP 2025 — Sankraman | IEEE × WiE × Project Cell",
  description:
    "Sankraman: Transition from Challenges to Solutions. The annual technical fest by IEEE, WiE and Project Cell at CRCE. Engineering the Change — From Concept to Change.",
  keywords: ["PRAKALP", "Sankraman", "IEEE", "WiE", "Project Cell", "CRCE", "technical fest", "engineering"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
