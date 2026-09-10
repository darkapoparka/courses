"use client";

// Local, non-affiliated UI reference preview. No authentication or payment service.
import { useEffect, useRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "./icons";
import { useMusic } from "./music-context";
import type { Artwork } from "../lib/music-catalog";

export type GlyphName = IconName | "link" | "external-arrow" | "code" | "info" | "thumb-down" | "favourites" | "apple" | "new" | "recent" | "artist" | "albums" | "song" | "apple-music" | "person" | "playlists" | "star" | "star-slash" | "lyrics" | "muted" | "plus" | "share" | "down" | "back" | "sort" | "pin" | "location" | "headphones" | "expand" | "mail" | "made-for-you" | "rewind-10" | "forward-10" | "stop" | "play-next" | "play-last" | "help" | "settings" | "transfer";
export function Glyph({ name, size = 18 }: { name: GlyphName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  switch (name) {
    case "external-arrow": return <svg {...common}><path d="M6 18 18 6M10 6h8v8" /></svg>;
    case "link": return <svg {...common}><path d="m9 15 6-6M8 16l-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M16 8l1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(1 1) scale(.9)" /></svg>;
    case "code": return <svg {...common}><path d="m7 6-5 6 5 6M17 6l5 6-5 6M14 3l-4 18" /></svg>;
    case "info": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 10v7M11 7h2" /></svg>;
    case "thumb-down": return <svg {...common}><path d="M9 14h-4a2 2 0 0 1-2-2l2-8h12v11l-4 6h-2l1-7H9ZM17 4h4v10h-4" /></svg>;
    case "favourites": return <svg {...common}><rect x="3" y="2" width="18" height="20" rx="2" /><path d="m12 5 1.7 3.7 4 .5-2.9 2.8.7 4-3.5-1.8-3.5 1.8.7-4-2.9-2.8 4-.5Z" /></svg>;
    case "chevron": return <svg {...common}><path d="m9 5 7 7-7 7" /></svg>;
    case "down": return <svg {...common}><path d="m5 9 7 7 7-7" /></svg>;
    case "back": return <svg {...common}><path d="m15 5-7 7 7 7" /></svg>;
    case "home": return <svg {...common}><path d="m3 10 9-7 9 7v11H3V10Z" /><path d="M9 21v-8h6v8" /></svg>;
    case "recent": return <svg {...common}><path d="M3.5 7A9 9 0 1 1 3 16M3 3v5h5M12 6v6H8" /></svg>;
    case "artist": return <svg {...common}><rect x="9" y="2" width="6" height="12" rx="3" transform="rotate(35 12 8)" /><path d="m8 12-6 8M9 15l-1 6M4 16l6 4" /></svg>;
    case "albums": return <svg {...common}><path d="M7 2h10M5 5h14" /><rect x="4" y="8" width="16" height="14" rx="2" /></svg>;
    case "song": return <svg {...common} fill="currentColor" stroke="none"><path d="M11 4v12.5a4 3.2 0 1 0 2 2.8V8l6-1V2Z" /></svg>;
    case "apple-music": return <svg {...common} fill="currentColor" stroke="none"><path d="M9.2 5.3 19.4 3v11.1h-2V6.2L11.2 7.6v8.2h-2V5.3Z" /><ellipse cx="7.3" cy="17.5" rx="3.4" ry="2.45" transform="rotate(-12 7.3 17.5)" /><ellipse cx="17.4" cy="15.2" rx="3.4" ry="2.45" transform="rotate(-12 17.4 15.2)" /></svg>;
    case "video": return <svg {...common}><rect x="2" y="3" width="20" height="15" rx="2" /><path d="M8 22h8M12 18v4M11 8v6l5-1V6l-5 1M11 14c-4-1-4 3-1 2" /></svg>;
    case "playlists": return <svg {...common}>{[3,10,17].flatMap(x=>[3,10,17].map(y=><rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx=".8" />))}</svg>;
    case "playlist": return <svg {...common}><path d="M3 5h10M3 9h10M3 13h7M3 17h6M17 6v13l5-1V4Z" /><ellipse cx="14.5" cy="19" rx="3" ry="2" fill="currentColor" /></svg>;
    case "previous": return <svg {...common} fill="currentColor" stroke="none"><path d="M12 4v7L22 4v16l-10-7v7L1 12Z" /></svg>;
    case "next": return <svg {...common} fill="currentColor" stroke="none"><path d="M12 4v7L2 4v16l10-7v7l11-8Z" /></svg>;
    case "play": return <svg {...common} fill="currentColor" stroke="none"><path d="M6.7 3.7C6 3.2 5 3.7 5 4.6v14.8c0 .9 1 1.4 1.7.9l12-7.4a1 1 0 0 0 0-1.8Z" /></svg>;
    case "pause": return <svg {...common} fill="currentColor" stroke="none"><rect x="5" y="3" width="5" height="18" rx="1.2" /><rect x="14" y="3" width="5" height="18" rx="1.2" /></svg>;
    case "apple": return <svg {...common} fill="currentColor" stroke="none"><path d="M16.5 2c.2 2-1.2 4-3.5 4-.2-1.8 1.5-3.7 3.5-4ZM19.5 7.7c-3 2-2.8 5.9.3 7.6-1 2.6-2.6 5.9-4.7 5.9-1.3 0-1.8-.9-3.5-.9-1.8 0-2.3.9-3.6.9-2.3 0-5.2-4.5-5.2-8.6 0-3.7 2.2-6.2 4.8-6.2 1.5 0 2.8 1 4 1 1.1 0 2.8-1.1 4.3-1.1 1.5 0 2.7.5 3.6 1.4Z" /></svg>;
    case "new": return <svg {...common}>{[[4,4],[14,4],[4,14],[14,14]].map(([x,y])=><rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1" />)}</svg>;
    case "star": return <svg {...common}><path d="m12 2.5 3 6.2 6.8 1-4.9 4.8 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8-4.9-4.8 6.8-1Z" /></svg>;
    case "star-slash": return <svg {...common}><path d="m12 2.5 3 6.2 6.8 1-4.9 4.8 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8-4.9-4.8 6.8-1Z" /><path d="M4 4l16 16" /></svg>;
    case "lyrics": return <svg {...common}><path d="M5 3h14a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H9l-5 3v-3a3 3 0 0 1-2-3V6a3 3 0 0 1 3-3Z" /><path d="M7 8h4v4H7V8Zm6 0h4v4h-4V8Zm-2 4-3 3m9-3-3 3" /></svg>;
    case "queue": return <svg {...common}><path d="M7 5h15M7 12h15M7 19h15" /><circle cx="2" cy="5" r=".8" fill="currentColor" /><circle cx="2" cy="12" r=".8" fill="currentColor" /><circle cx="2" cy="19" r=".8" fill="currentColor" /></svg>;
    case "repeat": return <svg {...common}><path d="M19 8H7a4 4 0 0 0-4 4M16 5l3 3-3 3M5 16h12a4 4 0 0 0 4-4M8 13l-3 3 3 3" /></svg>;
    case "volume": return <svg {...common}><path d="M3 9h4l5-5v16l-5-5H3V9Z" fill="currentColor" stroke="none" /><path d="M16 8a6 6 0 0 1 0 8M19 4a11 11 0 0 1 0 16" /></svg>;
    case "plus": return <svg {...common}><path d="M12 4v16M4 12h16" /></svg>;
    case "share": return <svg {...common}><path d="M8 9H5v12h14V9h-3M12 15V2M8 6l4-4 4 4" /></svg>;
    case "sort": return <svg {...common}><path d="M7 3v18M3 7l4-4 4 4M17 21V3M13 17l4 4 4-4" /></svg>;
    case "pin": return <svg {...common}><path d="m9 3 12 12-4 1-4 4-9-9 4-4 1-4ZM9 15l-6 6" /></svg>;
    case "location": return <svg {...common}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "headphones": return <svg {...common}><path d="M4 14v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="12" width="5" height="9" rx="2" /><rect x="16" y="12" width="5" height="9" rx="2" /></svg>;
    case "expand": return <svg {...common}><path d="M9 3H3v6M15 3h6v6M3 15v6h6M21 15v6h-6" /></svg>;
    case "mail": return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 5 10 8L22 5M2 20l7-9m13 9-7-9" /></svg>;
    case "made-for-you": return <svg {...common}><rect x="3" y="2.5" width="18" height="19" rx="2" /><circle cx="12" cy="8.5" r="2.6" /><path d="M7.1 17.3c.5-2.7 2.2-4.2 4.9-4.2s4.4 1.5 4.9 4.2" /></svg>;
    case "rewind-10": return <svg {...common}><path d="M8 5H3v5" /><path d="M4 9a8 8 0 1 1-.2 5" /><text x="8" y="15.5" fill="currentColor" stroke="none" fontSize="8" fontWeight="600">10</text></svg>;
    case "forward-10": return <svg {...common}><path d="M16 5h5v5" /><path d="M20 9a8 8 0 1 0 .2 5" /><text x="8" y="15.5" fill="currentColor" stroke="none" fontSize="8" fontWeight="600">10</text></svg>;
    case "stop": return <svg {...common} fill="currentColor" stroke="none"><rect x="1" y="1" width="22" height="22" rx="2" /></svg>;
    case "play-next": return <svg {...common}><path d="M3 6h12M3 11h10M3 16h8" /><path d="M18 4v13M15 7l3-3 3 3" /></svg>;
    case "play-last": return <svg {...common}><path d="M3 6h8M3 11h10M3 16h12" /><path d="M18 4v13M15 14l3 3 3-3" /></svg>;
    case "help": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.7 2.7 0 1 1 4.7 1.8c-1.3 1.2-2.3 1.5-2.3 3.2M12 17.5h.01" /></svg>;
    case "settings": return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></svg>;
    case "transfer": return <svg {...common}><rect x="4" y="6" width="13" height="12" rx="2" /><path d="M13 10h8M18 7l3 3-3 3M8 10v5l4-1" /></svg>;
    case "muted": return <svg {...common}><path d="M3 9h4l5-5v16l-5-5H3V9Z" /><path d="m16 9 6 6m0-6-6 6" /></svg>;
    default: return <Icon name={(name === "person" ? "user" : name) as IconName} size={size} />;
  }
}
const tallerSources = new Set(["ffc18eb8", "3728aa07", "fc5d84bd", "3fed6760", "18225175", "f3fc07c5", "b67b8895", "e379e3fe", "cc18744f", "b5d31893", "b0caf02f", "aefa8502"]);

/** Artwork regions only. Coordinates are in the original 1440px canvas; high
 * resolution is opt-in because animation frames can differ. High-resolution
 * variants scale content by 2.1, but their acquisition footer does
 * not scale. Use the decoded source height, never a guessed 1023px canvas. */
export function Art({ art, label, className = "", resolution = "standard" }: { art: Artwork; label: string; className?: string; resolution?: "standard" | "high" }) {
  const tall = tallerSources.has(art.source.slice(0, 8));
  const sourceHeight = resolution === "high" ? (tall ? 2018 : 2016) / 2.1 : tall ? 1024 : 1023;
  const style: CSSProperties = { aspectRatio: `${art.width} / ${art.height}`,
    backgroundImage: `url("/reference-assets/${art.source}${resolution === "high" ? "?resolution=high" : ""}")`,
    backgroundSize: `${1440 / art.width * 100}% ${sourceHeight / art.height * 100}%`,
    backgroundPosition: `${art.width === 1440 ? 0 : art.x / (1440 - art.width) * 100}% ${art.y / (sourceHeight - art.height) * 100}%` };
  return <span className={`music-art ${className}`} style={style} role="img" aria-label={label} data-art-source={art.source} />;
}
export function IconButton({ icon, label, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { icon: GlyphName; label: string }) {
  return <button type="button" className={`icon-button ${className}`} aria-label={label} title={label} {...props}><Glyph name={icon} /></button>;
}
export function Section({ title, children, onMore, id, className = "" }: { title: string; children: ReactNode; onMore?: () => void; id?: string; className?: string }) {
  return <section className={`music-section ${className}`} id={id} aria-label={title}><h2>{onMore ? <button type="button" className="section-link" onClick={onMore}>{title}<Glyph name="chevron" size={15} /></button> : title}</h2>{children}</section>;
}
export function EmptyState({ icon = "song", title, description, action, onAction }: { icon?: GlyphName; title?: string; description?: string; action?: string; onAction?: () => void }) {
  return <div className="empty-state"><Glyph name={icon} size={62} />{title && <h2>{title}</h2>}{description && <p>{description}</p>}{action && <button className="pill primary" type="button" onClick={onAction}>{action}</button>}</div>;
}
export function Dialog({ title, children, onClose, className = "", hideClose = false }: { title: string; children: ReactNode; onClose: () => void; className?: string; hideClose?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const element = dialog.current;
    if (element && !element.open) { element.showModal(); element.focus({ preventScroll: true }); }
    return () => { element?.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className={`music-dialog ${className}`} aria-label={title} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
  }}>{!hideClose && <IconButton icon="close" label="Close dialog" className="dialog-close" onClick={onClose} />}{children}</dialog>;
}
export function Footer({ compact = false }: { compact?: boolean } = {}) {
  const m = useMusic();
  const zh = m.library.locale === "zh";
  const labels = zh ? ["互联网服务条款", "Apple Music 与隐私", "Cookie 警告", "支持", "反馈"] : ["Internet Service Terms", "Apple Music & Privacy", "Cookie Warning", "Support", "Feedback"];
  const hrefs = ["https://www.apple.com/legal/internet-services/itunes/", "https://www.apple.com/legal/privacy/data/en/apple-music/", "https://www.apple.com/legal/privacy/en-ww/cookies/", "https://support.apple.com/music", "https://www.apple.com/feedback/apple-music/"];
  const links = labels.map((label, index) => [label, hrefs[index]!] as const);
  return <footer className={`content-footer ${compact ? "compact-footer" : ""}`}><div className="footer-region"><span>{zh ? "新加坡" : "Singapore"}</span><button type="button" onClick={() => m.setLibrary(data => ({ ...data, locale: data.locale === "en" ? "zh" : "en" }))}>{zh ? "English (UK)" : "简体中文"}</button></div><p>{zh ? "Copyright © 2026 Apple Inc. 保留所有权利。" : "Copyright © 2026 Apple Inc. All rights reserved."}</p><nav aria-label="Reference legal links">{links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}</nav><span className="sr-only">Local reference preview, not affiliated with Apple. These links open official Apple pages; no account or billing service is connected here.</span></footer>;
}
