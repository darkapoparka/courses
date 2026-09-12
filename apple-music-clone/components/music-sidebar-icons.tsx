import { Glyph, type GlyphName } from "./music-primitives";

/** Sidebar symbols use their own optical bounds, not transport/menu glyphs. */
export function SidebarGlyph({ name, size = 19 }: { name: GlyphName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  switch (name) {
    case "search": return <svg {...common}><circle cx="10.5" cy="10.5" r="6.2" /><path d="m15 15 5.2 5.2" /></svg>;
    case "home": return <svg {...common}><path d="m2.5 10.2 8.7-7.4a1.2 1.2 0 0 1 1.6 0l8.7 7.4v10a1.3 1.3 0 0 1-1.3 1.3H3.8a1.3 1.3 0 0 1-1.3-1.3Z" /><path d="M9 21.5v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7Z" fill="currentColor" stroke="none" /></svg>;
    case "new": return <svg {...common} strokeWidth="1.4">{[[4,4],[14,4],[4,14],[14,14]].map(([x,y]) => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1.2" />)}</svg>;
    case "radio": return <svg {...common} strokeWidth="1.35"><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" /><path d="M8.8 8.5a5 5 0 0 0 0 7m6.4-7a5 5 0 0 1 0 7M6 6a8.5 8.5 0 0 0 0 12M18 6a8.5 8.5 0 0 1 0 12M3.2 3.7a12 12 0 0 0 0 16.6M20.8 3.7a12 12 0 0 1 0 16.6" /></svg>;
    case "recent": return <svg {...common}><circle cx="12" cy="12" r="9.2" /><path d="M12 4.8V12H6.5" /></svg>;
    case "artist": return <svg {...common}><g transform="rotate(39 12 12)"><rect x="8.6" y="1" width="6.8" height="9.4" rx="3.4" fill="currentColor" stroke="none" /><path d="M8.5 5h7" stroke="white" strokeWidth="1.1" /><path d="m9.8 9.8.6 11 1.6 1.4 1.6-1.4.6-11" /></g><path d="M11.2 15.5v7" /></svg>;
    case "albums": return <svg {...common}><path d="M7.5 2h9M5.5 5h13" /><rect x="4.5" y="8" width="15" height="14" rx="2" /></svg>;
    case "song": return <svg {...common} fill="currentColor" stroke="none"><path d="M11 4.2 17.2 2v4.5L12.8 8v10.4H11Z" /><ellipse cx="9.1" cy="18.7" rx="3.1" ry="2.35" transform="rotate(-15 9.1 18.7)" /></svg>;
    case "video": return <svg {...common}><rect x=".8" y="4" width="22.4" height="14" rx="1.5" /><path d="M7 21h10" /><path d="M12 7v6.6c-3.9-1-4 3.5-.8 2.6 1.2-.3 2.1-1.3 2.1-2.4V9.3l3-1.1V6Z" fill="currentColor" stroke="none" /></svg>;
    case "made-for-you": return <svg {...common}><rect x="3" y="2.5" width="18" height="19" rx="1.7" /><circle cx="12" cy="8.5" r="3.4" fill="currentColor" stroke="none" /><path d="M5.5 20.8v-2.2c0-6.2 13-6.2 13 0v2.2Z" fill="currentColor" stroke="none" /></svg>;
    case "playlists": return <svg {...common}>{[3,10,17].flatMap(x => [3,10,17].map(y => <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="1" />))}</svg>;
    case "favourites": return <svg {...common}><rect x="3" y="2.5" width="18" height="19" rx="1.7" /><path d="m12 5 1.9 4.1 4.5.6-3.3 3.2.8 4.5-3.9-2.1-3.9 2.1.8-4.5-3.3-3.2 4.5-.6Z" fill="currentColor" stroke="none" /></svg>;
    case "playlist": return <svg {...common}><path d="M3 6h10M3 10h10M3 14h8" /><path d="M16 3.5v13.7c-4.8-1.2-5 4.3-1.2 3.2 1.8-.5 2.8-1.7 2.8-3.1V7.6L22 6V2Z" fill="currentColor" stroke="none" /></svg>;
    default: return <Glyph name={name} size={size} />;
  }
}

export function ProfileAvatar() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.4" fill="white" stroke="currentColor" strokeWidth="2.2" /><circle cx="12" cy="8.1" r="3.3" fill="currentColor" /><path d="M3.5 18.8c2.1-6.4 14.9-6.4 17 0a10.5 10.5 0 0 1-17 0Z" fill="currentColor" /></svg>;
}
