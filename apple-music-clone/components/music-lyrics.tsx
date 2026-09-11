"use client";

import { useLayoutEffect, useRef } from "react";
import { capturedLyrics, lyricAnchors, lyricAt } from "../lib/captured-lyrics";
import { useMusic } from "./music-context";

export function Lyrics({ panel = false }: { panel?: boolean }) {
  const m = useMusic();
  const viewport = useRef<HTMLDivElement>(null);
  const active = m.scene.lyricIndex ?? lyricAt(m.elapsed);
  const supported = !m.activeId || m.activeId === "album-2";
  useLayoutEffect(() => {
    const element = viewport.current;
    const selected = element?.querySelector<HTMLElement>("[aria-current='true']");
    if (!element || !selected) return;
    const target = panel ? (m.scene.source?.startsWith("ee8db412") ? 191 : 188) : (active === 0 ? 348 : 326) * Math.min(1, element.clientHeight / 903);
    element.scrollTop += selected.getBoundingClientRect().top - element.getBoundingClientRect().top - target;
  }, [active, panel, supported]);
  if (!supported) return <div className="lyrics-unavailable">Lyrics are not included for this recording in the saved reference.</div>;
  return <div ref={viewport} className={`lyric-viewport ${panel ? "panel-lyric-viewport" : ""}`} tabIndex={0} aria-label="Reference lyrics">
    <ol>{capturedLyrics.map((line, index) => {
      const distance = Math.abs(index - active);
      const anchor = lyricAnchors.find(item => item.index === index);
      return <li key={`${index}-${line}`} data-distance={Math.min(3, distance)} data-before={index < active || undefined} data-after={index > active || undefined} aria-current={index === active ? "true" : undefined}>
        <button type="button" onClick={() => anchor ? m.setElapsed(anchor.time) : m.patch({ lyricIndex: index })}>{line}</button>
        {index === 20 && active === 20 && <small>dream of you</small>}
      </li>;
    })}</ol>
  </div>;
}
