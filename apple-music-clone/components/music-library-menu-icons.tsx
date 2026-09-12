"use client";

import { Glyph, type GlyphName } from "./music-primitives";

/** Compact library action symbols, distinct from sidebar and player glyphs. */
export function LibraryMenuGlyph({ name }: { name: GlyphName }) {
  const common = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  switch (name) {
    case "playlist": return <svg {...common}><path d="M10 2.5h4M10 6h4M2 10h12M2 13.5h12" /><circle cx="4.5" cy="4.5" r="3.3" fill="currentColor" stroke="none" /><path d="M4.5 2.9v3.2M2.9 4.5h3.2" stroke="white" strokeWidth="1.2" /></svg>;
    case "play-next": return <svg {...common}><path d="M10 2h4M10 5.5h4M2 9h12M2 12.5h12M2.5 5.7V4.2h4M5 2.5l2 1.7L5 6" /></svg>;
    case "play-last": return <svg {...common}><path d="M2 2.5h12M2 6h12M10 9.5h4M10 13h4M2.5 10.3v1.5h4M5 10l2 1.8L5 13.5" /></svg>;
    case "radio": return <svg {...common}><circle cx="3.2" cy="8" r="2" /><path d="M7 5.5a4.5 4.5 0 0 1 0 5M10 3.5a8 8 0 0 1 0 9M13 1a12 12 0 0 1 0 14" /></svg>;
    case "info": return <svg {...common}><circle cx="8" cy="8" r="7" /><path d="M7 7h1.5v5M6.5 12h4" strokeWidth="1.4" /><circle cx="8" cy="4.5" r=".8" fill="currentColor" stroke="none" /></svg>;
    default: return <Glyph name={name} size={16} />;
  }
}
