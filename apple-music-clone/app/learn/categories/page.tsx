import { topics } from "../../../lib/platform/discovery";
import { TopicCard } from "../../../components/platform/discovery-cards";
import styles from "../../../components/platform/platform.module.css";

export const metadata = { title: "Categories — Courses" };
export default function CategoriesPage() {
  return <div className={styles.page}><header className={styles.collectionHeader}><p className={styles.eyebrow}>FOLLOW A NEW DIRECTION</p><h1>Categories</h1><p>From the first question to a deeper practice. Explore a subject that interests you.</p></header>
    <div className={styles.topicGrid}>{topics.map(topic => <TopicCard key={topic.slug} topic={topic} />)}</div>
  </div>;
}
