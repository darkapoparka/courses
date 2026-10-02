import type { Metadata } from "next";
import { marketplaceOptions } from "../../../lib/platform/marketplace";
import { MarketplaceHome } from "../../../components/platform/marketplace-home";
export const metadata: Metadata = { title: "Browse courses — Courses" };
export default async function HomePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <MarketplaceHome options={marketplaceOptions(await searchParams)} />;
}
