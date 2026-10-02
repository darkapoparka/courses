"use client";

import { useState, type FormEvent } from "react";
import { discussionPrompts } from "../../lib/platform/community-seeds";
import { MAX_REPLIES, validateReply } from "../../lib/platform/preview-state";
import type { PreviewReply } from "../../lib/platform/types";
import { updatePreview, usePreview } from "./preview-store";
import styles from "./platform.module.css";

export function ReplyThread({ postId, postTitle }: { postId: string; postTitle: string }) {
  const { state, ready, writable } = usePreview();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const replies = state.replies.filter(reply => reply.postId === postId);
  const fieldId = `reply-body-${postId}`;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalid = validateReply(draft);
    if (invalid) { setError(invalid); return; }
    const reply: PreviewReply = {
      id: `reply-${crypto.randomUUID()}`, postId, body: draft.trim(),
      createdAt: new Date().toISOString(),
    };
    let rejected = "";
    const saved = updatePreview(current => {
      const parentExists = [...current.posts, ...discussionPrompts].some(post => post.id === postId);
      if (!parentExists) { rejected = "This discussion is no longer available. Your draft is still here."; return current; }
      if (current.replies.length >= MAX_REPLIES) {
        rejected = `This preview holds ${MAX_REPLIES} replies. Existing replies and your draft have been kept.`;
        return current;
      }
      return { ...current, replies: [...current.replies, reply] };
    });
    if (!saved || rejected) {
      setError(rejected || "Your reply could not be saved. Copy the draft before leaving this page.");
      return;
    }
    setDraft(""); setError("");
    setMessage("Reply saved in this browser. Nothing was published or sent.");
  }

  return <details className={styles.replyThread} aria-label={`Replies to ${postTitle}`}>
    <summary>{replies.length ? `${replies.length} ${replies.length === 1 ? "reply" : "replies"}` : "Start a reply"}</summary>
    {replies.length > 0 && <ol className={styles.replyList} aria-label="Local replies">
      {replies.map(reply => <li key={reply.id}><strong>You <span>· Local preview</span></strong><p>{reply.body}</p></li>)}
    </ol>}
    <form className={styles.replyForm} onSubmit={submit}>
      <label htmlFor={fieldId}>Your reply</label>
      <textarea id={fieldId} rows={3} required minLength={3} maxLength={2000} value={draft} onChange={event => setDraft(event.target.value)} aria-describedby={`${fieldId}-help`} placeholder="Share what you tried, or ask a useful follow-up." />
      <p id={`${fieldId}-help`} className={styles.muted}>Only in this browser. Save before leaving; never include sensitive information.</p>
      <div className={styles.actions}><button className={styles.secondaryButton} type="submit" disabled={!ready || !writable}>Save local reply</button><span className={styles.muted}>{draft.length} / 2000</span></div>
      {error && <p role="alert" className={styles.errorText}>{error}</p>}
      <p role="status" className={styles.actionNote}>{message}</p>
    </form>
  </details>;
}
