"use client";

import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { IconButton } from "./music-primitives";

/** Scroll within the content column; never move a parent or the sidebar. */
export function Rail({ children, className = "", label, initialIndex = 0 }: {
  children: ReactNode; className?: string; label: string; initialIndex?: number;
}) {
  const id = useId();
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ previous: false, next: false });
  useLayoutEffect(() => {
    const host = rail.current;
    if (!host) return;
    const first = host.firstElementChild as HTMLElement | null;
    const selected = host.children[Math.max(0, initialIndex)] as HTMLElement | undefined;
    host.scrollLeft = first && selected ? selected.offsetLeft - first.offsetLeft : 0;
    const update = () => {
      const previous = host.scrollLeft > 1;
      const next = host.scrollLeft < host.scrollWidth - host.clientWidth - 1;
      setEdges(current => current.previous === previous && current.next === next ? current : { previous, next });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(host);
    host.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); host.removeEventListener("scroll", update); };
  }, [initialIndex]);
  const move = (direction: number) => {
    const host = rail.current;
    if (!host) return;
    const style = getComputedStyle(host);
    const usable = host.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const first = host.firstElementChild as HTMLElement | null;
    const second = host.children[1] as HTMLElement | undefined;
    const gap = parseFloat(style.columnGap) || 0;
    const stride = first && second ? second.offsetLeft - first.offsetLeft : usable;
    const visible = Math.max(1, Math.floor((usable + gap + 1) / stride));
    const pageStart = Math.round(host.scrollLeft / stride) + direction * visible;
    const left = Math.max(0, Math.min(host.scrollWidth - host.clientWidth, pageStart * stride));
    host.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <div className={`rail-wrap ${className}`} data-rail={label}>
    <div id={id} ref={rail} className="music-rail" role="region" aria-label={label} tabIndex={0}>{children}</div>
    <div className="rail-arrows">
      <IconButton icon="back" label={`Previous ${label}`} aria-controls={id} disabled={!edges.previous} onClick={() => move(-1)} />
      <IconButton icon="chevron" label={`Next ${label}`} aria-controls={id} disabled={!edges.next} onClick={() => move(1)} />
    </div>
  </div>;
}
