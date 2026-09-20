"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { capturedLyrics, lyricAnchors, lyricAt } from "../lib/captured-lyrics";
import { useMusic } from "./music-context";
import { expandedPresentation } from "../lib/expanded-presentation";
import { LyricText } from "./lyric-text";

export function Lyrics({ panel = false }: { panel?: boolean }) {
  const m = useMusic();
  const viewport = useRef<HTMLDivElement>(null);
  const [following, setFollowing] = useState(true);
  const previousLines = expandedPresentation(m.elapsed, true).previousLines;
  const active = m.scene.lyricIndex ?? lyricAt(m.elapsed);
  const supported = !m.activeId || m.activeId === "album-2";
  useLayoutEffect(() => { setFollowing(true); }, [m.seekRevision, m.activeId, panel]);
  useLayoutEffect(() => {
    if (!following && !panel) return;
    const element = viewport.current;
    const selected = element?.querySelector<HTMLElement>("[aria-current='true']");
    if (!element || !selected) return;
    const target = panel ? 191 : (active === 0 ? 348 : 326) * Math.min(1, element.clientHeight / 903);
    element.scrollTop += selected.getBoundingClientRect().top - element.getBoundingClientRect().top - target;
  }, [active, panel, supported, following, m.seekRevision]);
  if (!supported) return <div className="lyrics-unavailable">Lyrics are not included for this recording in the saved reference.</div>;
  return <div ref={viewport} className={`lyric-viewport ${panel ? "panel-lyric-viewport" : ""}`} tabIndex={0} aria-label="Reference lyrics" data-following={following || undefined}
    onWheel={() => { if (!panel) setFollowing(false); }}
    onTouchStart={() => { if (!panel) setFollowing(false); }}
    onKeyDown={event => { if (!panel && ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(event.key)) setFollowing(false); }}>
    <ol>{capturedLyrics.map((line, index) => {
      const distance = Math.abs(index - active);
      const concealed = !panel && following && index < active && distance > previousLines;
      const anchor = lyricAnchors.find(item => item.index === index);
      return <li key={`${index}-${line}`} inert={concealed || undefined} data-concealed={concealed || undefined} data-distance={Math.min(3, distance)} style={{ "--lyric-distance": distance } as CSSProperties} data-before={index < active || undefined} data-after={index > active || undefined} aria-current={index === active ? "true" : undefined}>
        <button type="button" onClick={() => { setFollowing(true); if (anchor) m.setElapsed(anchor.time); else m.patch({ lyricIndex: index }); }}>{panel ? line : <LyricText line={line} index={index} active={index === active} />}</button>
        {index === 20 && active === 20 && <small>dream of you</small>}
      </li>;
    })}</ol>
  </div>;
}
