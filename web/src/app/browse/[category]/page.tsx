import { notFound } from "next/navigation";
import { CatalogView } from "@/features/catalog/catalog-view";
import { subjects } from "@/features/catalog/catalog";
export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/browse/[category]">) {
  const { category } = await params;
  if (!subjects.some((subject) => subject.id === category)) notFound();
  return <CatalogView category={category} query={await searchParams} />;
}

export const metadata = { title: "Browse subject" };
