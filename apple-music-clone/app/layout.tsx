import type { Metadata } from "next";
import "./globals.css";
import "./reference-fidelity.css";
import "./capture-layout.css";
import "./capture-auth.css";
import "./capture-content.css";

export const metadata: Metadata = {
  title: "Apple Music — Reference Prototype",
  description: "Local deterministic Apple Music UI reference prototype.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
