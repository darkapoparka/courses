export type CompactPlayerIconName = "player-lyrics" | "player-queue" | "player-volume" | "player-muted";

/** Native compact-control geometry. Expanded controls keep their own glyphs. */
export function CompactPlayerIcon({ name, size }: { name: CompactPlayerIconName; size: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const, "data-player-glyph": name };
  if (name === "player-lyrics") return <svg {...common} viewBox="0 0 16 16" strokeWidth="1.4">
    <path d="M3 2.5h9A2.5 2.5 0 0 1 14.5 5v5a2.5 2.5 0 0 1-2.5 2.5H7.6l-3.1 3v-3H3A2.5 2.5 0 0 1 .5 10V5A2.5 2.5 0 0 1 3 2.5Z" />
    <path d="M4.4 6h2a.4.4 0 0 1 .4.4v1.7c0 .8-.5 1.5-1.4 1.7L5 9.2c.5-.1.7-.5.7-.8H4.4A.4.4 0 0 1 4 8V6.4a.4.4 0 0 1 .4-.4Zm4 0h2a.4.4 0 0 1 .4.4v1.7c0 .8-.5 1.5-1.4 1.7L9 9.2c.5-.1.7-.5.7-.8H8.4A.4.4 0 0 1 8 8V6.4a.4.4 0 0 1 .4-.4Z" fill="currentColor" stroke="none" />
  </svg>;
  if (name === "player-queue") return <svg {...common} stroke="none" fill="currentColor">
    {[5.6, 11.8, 18].map(y => <g key={y}><circle cx="4.2" cy={y} r=".93" /><rect x="8.3" y={y - .85} width="13.5" height="1.7" rx=".5" /></g>)}
  </svg>;
  return <svg {...common} strokeWidth="1.8">
    <path d="M3.8 9h3.4l5.4-4.3c.6-.5 1.1-.2 1.1.6v13.8c0 .8-.5 1.1-1.1.6l-5.4-4.4H3.8c-.6 0-1-.4-1-1V10c0-.6.4-1 1-1Z" fill="currentColor" stroke="none" />
    {name === "player-muted" ? <path d="m17 9 5 6m0-6-5 6" /> : <path d="M17.7 8.6c2.3 1.9 2.3 4.9 0 6.8M20.7 5.4c3.1 3.5 3.1 9.7 0 13.2" />}
  </svg>;
}
