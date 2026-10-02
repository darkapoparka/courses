"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Icon } from "./icon";
import styles from "./platform.module.css";

/** Native horizontal scrolling; server-rendered cards remain children, not client imports. */
export function EditorialShelf({ label, children, variant = "cards" }: {
  label: string; children: ReactNode; variant?: "cards" | "features" | "creators";
}) {
  const track = useRef<HTMLDivElement>(null);
  const id = useId();
  const [edges, setEdges] = useState({ first: true, last: true });
  const [message, setMessage] = useState("");
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const measure = () => setEdges({ first: element.scrollLeft < 2, last: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    element.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => { resize.disconnect(); element.removeEventListener("scroll", measure); };
  }, [children]);
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.9, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setMessage(`${direction > 0 ? "Next" : "Previous"} items in ${label}.`);
  }
  return <div className={styles.shelf}>
    <div className={styles.shelfControls} aria-label={`${label} controls`}>
      <button type="button" aria-label={`Previous ${label}`} aria-controls={id} disabled={edges.first} onClick={() => move(-1)}><span className={styles.reverseIcon}><Icon name="arrow" /></span></button>
      <button type="button" aria-label={`Next ${label}`} aria-controls={id} disabled={edges.last} onClick={() => move(1)}><Icon name="arrow" /></button>
    </div>
    <div id={id} ref={track} role="region" aria-label={label} tabIndex={0}
      className={`${styles.shelfTrack} ${variant === "features" ? styles.shelfFeatures : variant === "creators" ? styles.shelfCreators : styles.shelfCards}`}
      onKeyDown={event => { if (event.target === event.currentTarget && ["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
      {children}
    </div>
    <span className={styles.srOnly} role="status">{message}</span>
  </div>;
}
