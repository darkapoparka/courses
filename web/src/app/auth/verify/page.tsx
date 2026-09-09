import { AuthPreview } from "@/features/account/auth-preview";
import { safeReturn } from "@/features/catalog/catalog";
export default async function VerifyPage({
  searchParams,
}: PageProps<"/auth/verify">) {
  const query = await searchParams;
  return <AuthPreview verify returnTo={safeReturn(query.returnTo)} />;
}

export const metadata = { title: "Code-entry interface preview" };
