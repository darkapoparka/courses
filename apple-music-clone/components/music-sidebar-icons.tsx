import { Glyph, type GlyphName } from "./music-primitives";

/** Navigation symbols are distinct from the transport and menu icon family. */
export function SidebarGlyph({ name, size = 17 }: { name: GlyphName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  switch (name) {
    case "home": return <svg {...common}><path d="M2.5 10.2 11.2 3a1.2 1.2 0 0 1 1.6 0l8.7 7.2v10a1.3 1.3 0 0 1-1.3 1.3H3.8a1.3 1.3 0 0 1-1.3-1.3Z" /><path d="M9 21.5v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7Z" fill="currentColor" stroke="none" /></svg>;
    case "recent": return <svg {...common}><circle cx="12" cy="12" r="9.5" /><path d="M12 5.5v7H5.5" /><path d="m7.5 10.7-2 1.8 2 1.8" /></svg>;
    case "artist": return <svg {...common}><g transform="rotate(39 12 12)"><rect x="9" y="1.5" width="6" height="11" rx="3" fill="currentColor" stroke="none" /><path d="M8.7 5.5h6.6" stroke="white" strokeWidth="1.1" /><path d="M10.4 12.5v8.6l1.6 1.4 1.6-1.4v-8.6M12 14v8" /></g><path d="M11.3 13.5v8.2" /></svg>;
    case "video": return <svg {...common}><rect x=".6" y="4" width="22.8" height="14" rx="1.5" /><path d="M7 21h10" /><path d="M12 7v6.6c-3.9-1-4 3.5-.8 2.6 1.2-.3 2.1-1.3 2.1-2.4V9.3l3-1.1V6Z" fill="currentColor" stroke="none" /></svg>;
    case "made-for-you": return <svg {...common}><rect x="3" y="2.5" width="18" height="19" rx="1.7" /><circle cx="12" cy="8.5" r="3.4" fill="currentColor" stroke="none" /><path d="M5.5 20.8v-2.2c0-6.2 13-6.2 13 0v2.2Z" fill="currentColor" stroke="none" /></svg>;
    case "favourites": return <svg {...common}><rect x="3" y="2.5" width="18" height="19" rx="1.7" /><path d="m12 5 1.9 4.1 4.5.6-3.3 3.2.8 4.5-3.9-2.1-3.9 2.1.8-4.5-3.3-3.2 4.5-.6Z" fill="currentColor" stroke="none" /></svg>;
    case "playlist": return <svg {...common}><path d="M3 6h10M3 10h10M3 14h8" /><path d="M16 3.5v13.7c-4.8-1.2-5 4.3-1.2 3.2 1.8-.5 2.8-1.7 2.8-3.1V7.6L22 6V2Z" fill="currentColor" stroke="none" /></svg>;
    default: return <Glyph name={name} size={size} />;
  }
}

export function ProfileAvatar() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.4" fill="white" stroke="currentColor" strokeWidth="2.2" /><circle cx="12" cy="8.1" r="3.3" fill="currentColor" /><path d="M3.5 18.8c2.1-6.4 14.9-6.4 17 0a10.5 10.5 0 0 1-17 0Z" fill="currentColor" /></svg>;
}
