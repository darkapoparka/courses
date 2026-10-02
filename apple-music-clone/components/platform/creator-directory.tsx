"use client";

import type { Creator } from "../../lib/platform/discovery";
import { CreatorCard } from "./discovery-cards";
import { usePreview } from "./preview-store";
import styles from "./platform.module.css";

export function CreatorDirectory({ creators, followingOnly }: { creators: readonly Creator[]; followingOnly: boolean }) {
  const { state, ready } = usePreview();
  if (followingOnly && !ready) return <p role="status">Loading followed creators…</p>;
  const shown = creators.filter(creator => !followingOnly || state.following.includes(creator.id));
  return shown.length ? <div className={styles.creatorGrid}>{shown.map(creator => <CreatorCard key={creator.id} creator={creator} />)}</div>
    : <div className={styles.empty}><h2>{followingOnly ? "Keep a good perspective close." : "No creators match this search."}</h2><p>{followingOnly ? "Follow a demo creator to find them here. Following does not enroll you or send notifications." : "Try a creator name or a subject such as design."}</p></div>;
}
