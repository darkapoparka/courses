"use client";
import { useId, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { marketplaceCourses, marketplaceHref, marketplaceOptions, type MarketplaceOptions } from "../../lib/platform/marketplace";
import { containDialogFocus } from "./dialog-focus";
import { Icon } from "./icon";
import styles from "./platform.module.css";

export function MarketplaceFilters({ options }: { options: MarketplaceOptions }) {
  const router = useRouter(); const id = useId();
  const dialog = useRef<HTMLDialogElement>(null); const trigger = useRef<HTMLButtonElement>(null);
  const [draft, setDraft] = useState(options); const [pending, transition] = useTransition();
  const count = Number(options.price !== "all") + Number(Boolean(options.level)) + Number(Boolean(options.duration));
  const results = marketplaceCourses(draft).length;
  function change(key: string, value: string) { setDraft(current => marketplaceOptions({ ...current, [key]: value })); }
  return <>
    <button ref={trigger} type="button" className={styles.marketFilterButton} onClick={() => { setDraft(options); dialog.current?.showModal(); }} aria-haspopup="dialog">
      <Icon name="list" /> Filters{count > 0 && <span>{count}</span>}
    </button>
    <dialog ref={dialog} className={`${styles.homeDialog} ${styles.marketFilterDialog}`} aria-labelledby={`${id}-title`} onKeyDown={containDialogFocus} onClose={() => trigger.current?.focus({ preventScroll: true })}>
      <form action="/learn/home" onSubmit={event => {
        event.preventDefault();
        transition(() => { router.push(marketplaceHref(draft)); dialog.current?.close(); });
      }}>
        <div className={styles.filterDialogTitle}><h2 id={`${id}-title`}>Filter courses</h2><button type="button" aria-label="Close course filters" onClick={() => dialog.current?.close()}>×</button></div>
        <p>Find a course that fits your experience, time and budget.</p>
        <input type="hidden" name="category" value={draft.category} /><input type="hidden" name="collection" value={draft.collection ?? ""} />
        <input type="hidden" name="sort" value={draft.sort} />
        <label htmlFor={`${id}-price`}>Price</label>
        <select id={`${id}-price`} name="price" value={draft.price} onChange={event => change("price", event.target.value)}><option value="all">Any price</option><option value="free">Free courses</option><option value="under50">Under €50</option></select>
        <label htmlFor={`${id}-level`}>Experience level</label>
        <select id={`${id}-level`} name="level" value={draft.level ?? ""} onChange={event => change("level", event.target.value)}><option value="">All levels</option><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option></select>
        <label htmlFor={`${id}-duration`}>Course length</label>
        <select id={`${id}-duration`} name="duration" value={draft.duration ?? ""} onChange={event => change("duration", event.target.value)}><option value="">Any length</option><option value="30">Up to 30 minutes</option><option value="45">Up to 45 minutes</option></select>
        <p className={styles.filterResultNote} role="status">{results} {results === 1 ? "course matches" : "courses match"}{draft.category || draft.collection ? " within your current selection" : ""}. Reading times and prices are illustrative.</p>
        <div className={styles.actions}>
          <button type="button" className={styles.textButton} onClick={() => setDraft(current => ({ category: current.category, collection: current.collection, price: "all", sort: current.sort }))}>Clear filters</button>
          <button type="button" className={styles.secondaryButton} onClick={() => dialog.current?.close()}>Cancel</button>
          <button type="submit" className={styles.primaryButton} aria-busy={pending}>Show {results} {results === 1 ? "course" : "courses"}</button>
        </div>
      </form>
    </dialog>
  </>;
}
