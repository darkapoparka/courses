import AppleMusicApp from "../../../components/apple-music-app";

export default async function FlowPage({
  params,
  searchParams,
}: {
  params: Promise<{ flow: string }>;
  searchParams: Promise<{ step?: string }>;
}) {
  const [{ flow }, query] = await Promise.all([params, searchParams]);
  const parsedStep = Number.parseInt(query.step ?? "0", 10);
  return (
    <AppleMusicApp
      initialScene={{
        view: "flow",
        flow: flow === "starting-a-trial" || flow === "new" ? flow : "onboarding",
        step: Number.isFinite(parsedStep) ? parsedStep : 0,
      }}
    />
  );
}
