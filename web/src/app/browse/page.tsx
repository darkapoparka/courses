import { CatalogView } from "@/features/catalog/catalog-view";
export default async function BrowsePage({
  searchParams,
}: PageProps<"/browse">) {
  return <CatalogView query={await searchParams} />;
}

export const metadata = { title: "Browse" };
