import AppleMusicApp from "../../../components/apple-music-app";

export default async function ReferenceScreenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AppleMusicApp initialScene={{ view: "screen", screenId: id }} />;
}
