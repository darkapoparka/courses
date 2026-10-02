import type { Metadata } from "next";
import { PlatformShell } from "../../components/platform/platform-shell";
export const metadata: Metadata = { title: "Courses — Make room for what comes next", description: "An independent, local course and community design preview.", robots: { index: false, follow: false } };
export default function LearningLayout({ children }: { children: React.ReactNode }) { return <PlatformShell>{children}</PlatformShell>; }
