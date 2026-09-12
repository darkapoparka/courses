"use client";

import { useLayoutEffect, useRef, useState } from "react";

/** Glass belongs to the visible artwork, not a remembered screenshot ID. */
export function useRailUnderlay(selector: string, enabled = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useLayoutEffect(() => {
    if (!enabled) return;
    const rail = ref.current?.querySelector<HTMLElement>(selector);
    const scroller = ref.current?.closest<HTMLElement>(".music-main");
    if (!rail || !scroller) return;
    const update = () => {
      const artwork = rail.getBoundingClientRect();
      const viewport = scroller.getBoundingClientRect();
      setVisible(artwork.bottom > viewport.top && artwork.top < viewport.bottom);
    };
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    observer.observe(scroller);
    scroller.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); scroller.removeEventListener("scroll", update); };
  }, [selector, enabled]);
  return { ref, visible };
}
