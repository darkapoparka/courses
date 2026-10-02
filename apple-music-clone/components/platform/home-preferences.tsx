"use client";

import { useRef, useState } from "react";
import { categories } from "../../lib/platform/catalog";
import type { Category, HomePreferences } from "../../lib/platform/types";
import { updatePreview, usePreview } from "./preview-store";
import styles from "./platform.module.css";

export function HomePreferencesDialog() {
  const { state, ready, writable } = usePreview();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const original = useRef("");
  const [draft, setDraft] = useState<Category[]>([]);
  const [showCommunity, setShowCommunity] = useState(true);
  const [message, setMessage] = useState("");
  function open() {
    original.current = JSON.stringify(state.homePreferences);
    setDraft([...state.homePreferences.interests]);
    setShowCommunity(!state.homePreferences.communityDismissed);
    setMessage("");
    dialog.current?.showModal();
  }
  function save() {
    let conflict = false;
    const ok = updatePreview(current => {
      if (JSON.stringify(current.homePreferences) !== original.current) { conflict = true; return current; }
      const homePreferences: HomePreferences = { ...current.homePreferences, interests: draft, communityDismissed: !showCommunity };
      return { ...current, homePreferences };
    });
    if (conflict) { setMessage("Preferences changed in another tab. Your choices are still here. Cancel and reopen to review the saved preferences."); return; }
    if (!ok) { setMessage("Preferences were not saved. Your choices are still here; try again or cancel."); return; }
    dialog.current?.close();
  }
  return <>
    <button ref={trigger} type="button" className={styles.secondaryButton} onClick={open} disabled={!ready || !writable}>Learning preferences</button>
    <dialog ref={dialog} className={styles.homeDialog} aria-labelledby="home-preferences-title" onClose={() => trigger.current?.focus()}>
      <form onSubmit={event => { event.preventDefault(); save(); }}>
        <h2 id="home-preferences-title">Your learning preferences</h2>
        <p>Choose the subjects you want to see more of. Preferences stay in this browser.</p>
        <fieldset><legend>Your interests</legend><div className={styles.interestChoices}>
          {categories.map(category => <label key={category}>
            <input type="checkbox" checked={draft.includes(category)} onChange={event => setDraft(current => event.target.checked ? [...current, category] : current.filter(item => item !== category))} />
            {category}
          </label>)}
        </div></fieldset>
        <label className={styles.homeCheck}><input type="checkbox" checked={showCommunity} onChange={event => setShowCommunity(event.target.checked)} />Show the course discussion prompt</label>
        <p className={styles.scopeNote}>No selection shows editorial starting points. Recommendations use chosen subjects, follows and saved course categories, never your private notes.</p>
        {message && <p className={styles.errorText} role="alert">{message}</p>}
        <div className={styles.actions}>
          <button type="button" className={styles.secondaryButton} onClick={() => dialog.current?.close()}>Cancel</button>
          <button type="submit" className={styles.primaryButton} disabled={!writable}>Save preferences</button>
        </div>
      </form>
    </dialog>
  </>;
}
