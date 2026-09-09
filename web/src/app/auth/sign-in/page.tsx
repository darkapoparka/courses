import { AuthPreview } from "@/features/account/auth-preview";
import { safeReturn } from "@/features/catalog/catalog";
export default async function SignInPage({
  searchParams,
}: PageProps<"/auth/sign-in">) {
  const query = await searchParams;
  return <AuthPreview returnTo={safeReturn(query.returnTo)} />;
}

export const metadata = { title: "Sign-in interface preview" };
