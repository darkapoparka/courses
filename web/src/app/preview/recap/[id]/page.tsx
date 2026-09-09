import Link from "next/link";
import { notFound } from "next/navigation";
const milestones = [
  {
    id: "first-step",
    number: "1",
    title: "A first step",
    text: "An example of how a first-lesson milestone could be presented.",
  },
  {
    id: "curiosity",
    number: "3",
    title: "Follow your curiosity",
    text: "An example of an across-subjects activity milestone.",
  },
  {
    id: "practice",
    number: "5",
    title: "Make time to practice",
    text: "A visual study of a repeated-practice milestone.",
  },
  {
    id: "reflection",
    number: "10",
    title: "Pause and reflect",
    text: "A sample reflection milestone, not a count of your actual notes.",
  },
];
export default async function MilestoneStudy({
  params,
}: PageProps<"/preview/recap/[id]">) {
  const { id } = await params;
  const item = milestones.find((value) => value.id === id);
  if (!item) notFound();
  return (
    <section className="milestone-detail">
      <Link className="back-link" href="/preview/recap">
        ‹ Recap study
      </Link>
      <p className="eyebrow">ILLUSTRATIVE MILESTONE · NOT EARNED</p>
      <span className={`milestone-medallion milestone-${id}`}>
        {item.number}
      </span>
      <h1>{item.title}</h1>
      <p>{item.text}</p>
      <p className="muted">
        This is fictional interface content, not a certification, achievement
        record, measurement of competence or account activity.
      </p>
      <Link className="primary-button" href="/browse">
        Explore sample courses
      </Link>
    </section>
  );
}
export const metadata = { title: "Milestone layout study" };
