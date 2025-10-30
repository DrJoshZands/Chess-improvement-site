import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chess Improvement Site",
  description: "Personalized chess training plans from report analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
