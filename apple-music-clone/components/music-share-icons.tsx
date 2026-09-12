"use client";

/** Small vector illustrations for the captured system-share preview. They are
 * DOM icons, not cropped interface pixels or embedded proprietary font glyphs. */
export function SystemShareIcon({ target }: { target: string }) {
  const common = { width: 15, height: 15, viewBox: "0 0 24 24", "aria-hidden": true as const };
  switch (target) {
    case "Page": return <svg {...common} fill="none" stroke="#747474" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /><path d="m15.7 8.3-2.5 4.9-4.9 2.5 2.5-4.9Z" /><path d="m11 11 2 2" /></svg>;
    case "Add to Reading List": return <svg {...common}><rect x="1" y="1" width="22" height="22" rx="5" fill="#999a9f" /><g fill="none" stroke="white" strokeWidth="1.3"><circle cx="7" cy="12" r="3.6" /><circle cx="17" cy="12" r="3.6" /><path d="M10.5 11.5h3M2 11H1m22 0h-1" /></g></svg>;
    case "AirDrop": return <svg {...common}><rect x="1" y="1" width="22" height="22" rx="5" fill="#279cfa" /><g fill="none" stroke="white" strokeWidth="1.2"><path d="M5 16a8 8 0 1 1 14 0M7.7 14.5a5 5 0 1 1 8.6 0" /><circle cx="12" cy="12" r="1.5" /></g><path d="m12 15-3.5 6h7Z" fill="white" /></svg>;
    case "Mail": return <svg {...common}><rect x="1" y="1" width="22" height="22" rx="5" fill="#e4eff0" /><g fill="none" stroke="white" strokeWidth="1.4"><rect x="4" y="6" width="16" height="12" rx="1" /><path d="m4 7 8 6 8-6M4 18l5-6m11 6-5-6" /></g></svg>;
    case "Messages": return <svg {...common}><rect x="1" y="1" width="22" height="22" rx="5" fill="#37d347" /><ellipse cx="12" cy="11" rx="8" ry="6" fill="white" /><path d="m7 14-2 6 7-4" fill="white" /></svg>;
    case "Notes": return <svg {...common}><rect x="1" y="1" width="22" height="22" rx="5" fill="#f7f7f6" stroke="#dededc" strokeWidth=".6" /><path d="M6 1h12a5 5 0 0 1 5 5v2H1V6a5 5 0 0 1 5-5" fill="#ffdc4a" /><path d="M3 12h18M3 16h18M3 20h18" stroke="#e7e7e7" strokeWidth=".7" /></svg>;
    case "Open in News": return <svg {...common}><rect x="1" y="1" width="22" height="22" rx="5" fill="#fcf7f7" /><path d="M5 5h5l9 14h-5ZM14 5h5v8ZM5 11v8h5Z" fill="#df6280" /></svg>;
    case "Reminders": return <svg {...common}><rect x="1" y="1" width="22" height="22" rx="5" fill="#fafafa" stroke="#dedede" strokeWidth=".6" /><circle cx="6" cy="6" r="1.1" fill="#ec6552" /><circle cx="6" cy="12" r="1.1" fill="#4aa2d7" /><circle cx="6" cy="18" r="1.1" fill="#e89e48" /><path d="M10 6h9M10 12h9M10 18h9" stroke="#dedede" strokeWidth="1.2" /></svg>;
    case "Freeform": return <svg {...common}><rect x="1" y="1" width="22" height="22" rx="5" fill="#f4f3ed" /><circle cx="8" cy="15" r="6" fill="#ecaa62" /><rect x="9" y="5" width="12" height="12" rx="3" fill="#63c8d7" /><path d="m7 6 5 11 8-8-6 13Z" fill="#245570" opacity=".85" /></svg>;
    case "Journal": return <svg {...common}><rect x="1" y="1" width="22" height="22" rx="5" fill="#393154" /><path d="M3 6h5v15H3Z" fill="#677ec4" /><path d="M11 9 20 3v11l-9 7Z" fill="#e5868e" /><path d="m13 10 5-3v7l-5 3Z" fill="#efd5cd" /></svg>;
    case "Copy": return <svg {...common} fill="none" stroke="#696464" strokeWidth="1.4" strokeLinejoin="round"><path d="M8 8H4v13h10v-3M9 3h6l5 5v10H9Z" /><path d="M15 3v5h5" /></svg>;
    case "Edit Extensions…": return <svg {...common} fill="none" stroke="#696464" strokeWidth="1.4" strokeLinejoin="round"><path d="M3 5h6c-2 5 6 5 4 0h5v6c5-2 5 6 0 4v5H3v-6c5 2 5-6 0-4Z" /></svg>;
    default: return <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="8" /></svg>;
  }
}
