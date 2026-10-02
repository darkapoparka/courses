"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition, type KeyboardEvent } from "react";
import { libraryCourseIds, normalizeQuery, recentQueries, searchCatalog, searchHref, searchScope, type SearchScope } from "../../lib/platform/search";
import { updatePreview, usePreview } from "./preview-store";
import { Icon } from "./icon";
import styles from "./platform.module.css";

export function SearchToolbar({ title }: { title?: string }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const query = normalizeQuery(params.get("q"));
  const scope = searchScope(params.get("scope"));
  return <SearchField key={`${pathname}:${query}:${scope}`} initialQuery={query} scope={scope} title={title} />;
}
function SearchField({ initialQuery, scope, title }: { initialQuery: string; scope: SearchScope; title?: string }) {
  const router = useRouter(); const input = useRef<HTMLInputElement>(null); const id = useId();
  const [query, setQuery] = useState(initialQuery); const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(-1); const [pending, transition] = useTransition();
  const { state, ready, writable } = usePreview();
  const needle = normalizeQuery(query);
  const hits = searchCatalog(needle, "all", scope === "library" ? libraryCourseIds(state) : undefined).slice(0, 6);
  const options = needle ? hits.map(hit => ({ id: hit.id, label: hit.title, detail: hit.kind === "lessons" && !hit.available ? "Lesson · Not in preview" : hit.kind, href: hit.href, query: needle }))
    : state.recentSearches.map((text, index) => ({ id: `recent-${index}`, label: text, detail: "Recent search · this browser", href: searchHref(text, scope), query: text }));
  const open = expanded && options.length > 0;
  useEffect(() => {
    const shortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k" && !event.altKey) {
        event.preventDefault(); input.current?.focus(); input.current?.select(); setExpanded(true);
      }
    };
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);
  useEffect(() => { if (open && active >= 0) document.getElementById(`${id}-${active}`)?.scrollIntoView({ block: "nearest" }); }, [active, id, open]);
  function navigate(href: string, term: string) {
    if (!window.dispatchEvent(new Event("courses:before-navigate", { cancelable: true }))) return;
    if (ready && writable && normalizeQuery(term)) updatePreview(current => ({ ...current, recentSearches: recentQueries([term, ...current.recentSearches]) }));
    setExpanded(false); setActive(-1);
    transition(() => router.push(href));
  }
  function keyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "Escape") { setExpanded(false); setActive(-1); return; }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!options.length) return;
      event.preventDefault(); setExpanded(true);
      setActive(current => event.key === "ArrowDown" ? (current + 1) % options.length : (current <= 0 ? options.length - 1 : current - 1));
    }
    if (event.key === "Enter" && open && active >= 0 && options[active]) {
      event.preventDefault(); navigate(options[active].href, options[active].query);
    }
  }
  return <div className={`${styles.browseToolbar} ${title ? styles.titledToolbar : ""}`} data-search-toolbar>
    {title ? <h1 className={styles.toolbarTitle}>{title}</h1> : <span className={styles.toolbarLabel}>Explore Courses</span>}
    <div className={styles.searchAnchor} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setExpanded(false); setActive(-1); } }}>
      <form action="/learn/search" role="search" aria-label="Global search" className={styles.globalSearch}
        onSubmit={event => { event.preventDefault(); navigate(searchHref(query, scope), query); }}>
        <Icon name="search" /><label className={styles.srOnly} htmlFor={id}>Search courses</label>
        <input ref={input} id={id} name="q" type="text" role="combobox" value={query} maxLength={100}
          autoComplete="off" spellCheck={false} placeholder="Search courses, creators, lessons" aria-autocomplete="list"
          aria-expanded={open} aria-controls={open ? `${id}-options` : undefined} aria-activedescendant={open && active >= 0 ? `${id}-${active}` : undefined}
          onChange={event => { setQuery(event.target.value); setExpanded(true); setActive(-1); }}
          onFocus={() => setExpanded(true)} onKeyDown={keyDown} aria-describedby={`${id}-hint`} />
        {scope === "library" && <input name="scope" type="hidden" value="library" />}
        {query && <button type="button" className={styles.clearSearch} aria-label="Clear search" onClick={() => { setQuery(""); setActive(-1); setExpanded(true); input.current?.focus(); }}>×</button>}
        <button type="submit" className={styles.searchSubmit} aria-busy={pending}>{pending ? "Searching…" : "Search"}</button>
      </form>
      <span id={`${id}-hint`} className={styles.srOnly}>Search public demo metadata. Use Control or Command K to focus search. Arrow keys select suggestions; Escape closes them.</span>
      {open && <div className={styles.searchPopup}>
        <p>{needle ? "Suggestions" : "Recent searches"}</p>
        <ul id={`${id}-options`} role="listbox" aria-label="Search suggestions">
          {options.map((option, index) => <li id={`${id}-${index}`} key={option.id} role="option" aria-selected={index === active}
            onMouseDown={event => event.preventDefault()} onClick={() => navigate(option.href, option.query)}>
            <Icon name="search" /><span><strong>{option.label}</strong><small>{option.detail}</small></span><Icon name="arrow" />
          </li>)}
        </ul>
        <p className={styles.suggestionHint}>Enter searches everything. ↑ ↓ explores suggestions.</p>
      </div>}
    </div>
    <kbd className={styles.searchShortcut} aria-hidden="true">Ctrl / ⌘ K</kbd>
    <span role="status" className={styles.srOnly}>{pending ? "Searching the demo catalog" : ""}</span>
  </div>;
}
export function SearchToolbarFallback({ title }: { title?: string }) {
  return <div className={`${styles.browseToolbar} ${title ? styles.titledToolbar : ""}`}>{title ? <h1 className={styles.toolbarTitle}>{title}</h1> : <span className={styles.toolbarLabel}>Explore Courses</span>}<form className={styles.globalSearch} action="/learn/search" role="search"><Icon name="search" /><label className={styles.srOnly} htmlFor="initial-search">Search courses</label><input id="initial-search" name="q" placeholder="Search courses, creators, lessons" maxLength={100} /><button type="submit" className={styles.searchSubmit}>Search</button></form></div>;
}
