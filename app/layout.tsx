import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strokio — Drawing Practice Tracker",
  description: "Build a regular drawing practice and track your progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
