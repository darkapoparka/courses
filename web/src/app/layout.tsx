import type { Metadata } from "next";
import { LearnerShell } from "@/components/shell/learner-shell";
import "./globals.css";
import "./flows.css";
import "./patterns.css";

export const metadata: Metadata = {
  title: { default: "Courses — design preview", template: "%s — Courses" },
  description:
    "A local design preview of Courses, an independent course marketplace. All course content is fictional.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <LearnerShell>{children}</LearnerShell>
      </body>
    </html>
  );
}
