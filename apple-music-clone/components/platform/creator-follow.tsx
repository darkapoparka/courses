"use client";

import { useState } from "react";
import type { Creator } from "../../lib/platform/discovery";
import { updatePreview, usePreview } from "./preview-store";
import { Icon } from "./icon";
import styles from "./platform.module.css";

export function CreatorFollow({ creator }: { creator: Creator }) {
  const { state, ready, writable } = usePreview();
  const [message, setMessage] = useState("");
  const following = state.following.includes(creator.id);
  function toggle() {
    const ok = updatePreview(current => ({ ...current, following: current.following.includes(creator.id) ? current.following.filter(id => id !== creator.id) : [...current.following, creator.id] }));
    setMessage(ok ? `${following ? "Unfollowed" : "Following"} ${creator.name} in this browser. No notifications are sent.` : "This change could not be saved.");
  }
  return <div className={styles.creatorFollow}><button type="button" className={styles.secondaryButton} aria-label={`${following ? "Unfollow" : "Follow"} ${creator.name}`} aria-pressed={following} disabled={!ready || !writable} onClick={toggle}>
    <Icon name={following ? "check" : "saved"} />{following ? "Following" : "Follow"}
  </button><span className={styles.actionNote} role="status">{message || "Following is a local preference, not enrollment."}</span></div>;
}
