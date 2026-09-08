import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apple Music — Reference clone",
  description: "A local, deterministic Apple Music web reference prototype.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
