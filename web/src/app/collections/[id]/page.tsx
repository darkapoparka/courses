import { CollectionsView } from "@/features/catalog/collections-view";
import { notFound } from "next/navigation";
export default async function ListPage({
  params,
}: PageProps<"/collections/[id]">) {
  const { id } = await params;
  if (!/^[a-z0-9-]{1,80}$/.test(id)) notFound();
  return <CollectionsView id={id} />;
}

export const metadata = { title: "Learning list" };
