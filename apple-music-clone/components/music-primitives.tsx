"use client";

// Local, non-affiliated UI reference preview. No authentication or payment service.
import { useEffect, useRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "./icons";
import type { Artwork } from "../lib/music-catalog";

export type GlyphName = IconName | "apple" | "new" | "recent" | "artist" | "albums" | "song" | "person" | "playlists" | "star" | "lyrics" | "muted" | "plus" | "share" | "down" | "back" | "sort" | "pin" | "location" | "headphones" | "expand" | "mail";
export function Glyph({ name, size = 18 }: { name: GlyphName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  switch (name) {
    case "apple": return <svg {...common} fill="currentColor" stroke="none"><path d="M16.5 2c.2 2-1.2 4-3.5 4-.2-1.8 1.5-3.7 3.5-4ZM19.5 7.7c-3 2-2.8 5.9.3 7.6-1 2.6-2.6 5.9-4.7 5.9-1.3 0-1.8-.9-3.5-.9-1.8 0-2.3.9-3.6.9-2.3 0-5.2-4.5-5.2-8.6 0-3.7 2.2-6.2 4.8-6.2 1.5 0 2.8 1 4 1 1.1 0 2.8-1.1 4.3-1.1 1.5 0 2.7.5 3.6 1.4Z" /></svg>;
    case "new": return <svg {...common}>{[[4,4],[14,4],[4,14],[14,14]].map(([x,y])=><rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1" />)}</svg>;
    case "star": return <svg {...common}><path d="m12 2.5 3 6.2 6.8 1-4.9 4.8 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8-4.9-4.8 6.8-1Z" /></svg>;
    case "lyrics": return <svg {...common}><path d="M5 3h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M8 8v3M12 8v3M16 8v3M10 14h4" /></svg>;
    case "plus": return <svg {...common}><path d="M12 4v16M4 12h16" /></svg>;
    case "share": return <svg {...common}><path d="M8 9H5v12h14V9h-3M12 15V2M8 6l4-4 4 4" /></svg>;
    case "sort": return <svg {...common}><path d="M7 3v18M3 7l4-4 4 4M17 21V3M13 17l4 4 4-4" /></svg>;
    case "pin": return <svg {...common}><path d="m9 3 12 12-4 1-4 4-9-9 4-4 1-4ZM9 15l-6 6" /></svg>;
    case "location": return <svg {...common}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "headphones": return <svg {...common}><path d="M4 14v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="12" width="5" height="9" rx="2" /><rect x="16" y="12" width="5" height="9" rx="2" /></svg>;
    case "expand": return <svg {...common}><path d="M9 3H3v6M15 3h6v6M3 15v6h6M21 15v6h-6" /></svg>;
    case "mail": return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 5 10 8L22 5M2 20l7-9m13 9-7-9" /></svg>;
    case "muted": return <svg {...common}><path d="M3 9h4l5-5v16l-5-5H3V9Z" /><path d="m16 9 6 6m0-6-6 6" /></svg>;
    default: {
      const aliases: Partial<Record<GlyphName, IconName>> = { recent: "clock", artist: "user", albums: "disc", song: "music", person: "user", playlists: "playlist", down: "chevron", back: "arrow-left" };
      return <Icon name={aliases[name] ?? name as IconName} size={size} />;
    }
  }
}
/** Artwork regions only; never use a whole application screen as its interface. */
export function Art({ art, label, className = "" }: { art: Artwork; label: string; className?: string }) {
  const style: CSSProperties = { aspectRatio: `${art.width} / ${art.height}`,
    backgroundImage: `url("/reference-assets/${art.source}")`,
    backgroundSize: `${1440 / art.width * 100}% ${1023 / art.height * 100}%`,
    backgroundPosition: `${art.width === 1440 ? 0 : art.x / (1440 - art.width) * 100}% ${art.y / (1023 - art.height) * 100}%` };
  return <span className={`music-art ${className}`} style={style} role="img" aria-label={label} data-art-source={art.source} />;
}
export function IconButton({ icon, label, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { icon: GlyphName; label: string }) {
  return <button type="button" className={`icon-button ${className}`} aria-label={label} title={label} {...props}><Glyph name={icon} /></button>;
}
export function Section({ title, children, onMore, id, className = "" }: { title: string; children: ReactNode; onMore?: () => void; id?: string; className?: string }) {
  return <section className={`music-section ${className}`} id={id} aria-label={title}><h2>{onMore ? <button type="button" className="section-link" onClick={onMore}>{title}<Glyph name="chevron" size={15} /></button> : title}</h2>{children}</section>;
}
export function Rail({ children, className = "", label }: { children: ReactNode; className?: string; label: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) => rail.current?.scrollBy({ left: direction * rail.current.clientWidth * .82, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  return <div className={`rail-wrap ${className}`}><div ref={rail} className="music-rail" role="region" aria-label={label} tabIndex={0}>{children}</div><div className="rail-arrows"><IconButton icon="back" label={`Previous ${label}`} onClick={() => move(-1)} /><IconButton icon="chevron" label={`Next ${label}`} onClick={() => move(1)} /></div></div>;
}
export function EmptyState({ icon = "song", title, description, action, onAction }: { icon?: GlyphName; title?: string; description?: string; action?: string; onAction?: () => void }) {
  return <div className="empty-state"><Glyph name={icon} size={62} />{title && <h2>{title}</h2>}{description && <p>{description}</p>}{action && <button className="pill primary" type="button" onClick={onAction}>{action}</button>}</div>;
}
export function Dialog({ title, children, onClose, className = "" }: { title: string; children: ReactNode; onClose: () => void; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const element = dialog.current;
    if (element && !element.open) element.showModal();
    return () => { element?.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className={`music-dialog ${className}`} aria-label={title} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }}><IconButton icon="close" label="Close dialog" className="dialog-close" onClick={onClose} />{children}</dialog>;
}
export function Footer() {
  return <footer className="content-footer"><p>Singapore <span>English</span></p><p>Local Apple Music reference preview. Not affiliated with Apple.</p><p>Saved interface references · No Apple account, billing, or streaming connection</p></footer>;
}
