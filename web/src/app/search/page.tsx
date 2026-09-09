import { CatalogView } from "@/features/catalog/catalog-view";
export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  return <CatalogView search query={await searchParams} />;
}

export const metadata = { title: "Search" };
