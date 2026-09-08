import type { SVGProps } from "react";

export type IconName =
  | "search"
  | "home"
  | "sparkle"
  | "radio"
  | "clock"
  | "user"
  | "disc"
  | "music"
  | "video"
  | "heart"
  | "playlist"
  | "external"
  | "play"
  | "pause"
  | "previous"
  | "next"
  | "volume"
  | "queue"
  | "shuffle"
  | "repeat"
  | "more"
  | "close"
  | "chevron"
  | "calendar"
  | "ticket"
  | "check"
  | "arrow-left"
  | "arrow-right"
  | "lock";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 17, ...props }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };

  switch (name) {
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>;
    case "home":
      return <svg {...common}><path d="m3 10.8 9-7.3 9 7.3" /><path d="M5.5 9.5v10h13v-10M9.4 19.5v-5.7h5.2v5.7" /></svg>;
    case "sparkle":
      return <svg {...common}><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></svg>;
    case "radio":
      return <svg {...common}><circle cx="12" cy="12" r="2.2" /><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.5 4.5a10.7 10.7 0 0 0 0 15M19.5 4.5a10.7 10.7 0 0 1 0 15" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="3.3" /><path d="M5.3 20c.5-3.2 2.8-5 6.7-5s6.2 1.8 6.7 5" /></svg>;
    case "disc":
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="2" /><path d="M12 3.5v2M20.5 12h-2" /></svg>;
    case "music":
      return <svg {...common}><path d="M9 18V5l10-2v13" /><circle cx="6.5" cy="18" r="3" /><circle cx="16.5" cy="16" r="3" /></svg>;
    case "video":
      return <svg {...common}><rect x="3" y="5" width="13" height="14" rx="2" /><path d="m16 10 5-3v10l-5-3" /></svg>;
    case "heart":
      return <svg {...common}><path d="M20.5 8.5c0 5-8.5 10-8.5 10s-8.5-5-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5Z" /></svg>;
    case "playlist":
      return <svg {...common}><path d="M4 6h12M4 11h12M4 16h7" /><path d="M18 13v6M15.5 16.5H20.5" /></svg>;
    case "external":
      return <svg {...common}><path d="M14 4h6v6M20 4l-9 9" /><path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" /></svg>;
    case "play":
      return <svg {...common} fill="currentColor" stroke="none"><path d="m8 5 11 7-11 7V5Z" /></svg>;
    case "pause":
      return <svg {...common} fill="currentColor" stroke="none"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>;
    case "previous":
      return <svg {...common} fill="currentColor" stroke="none"><path d="M6 5h2v14H6zM18 5 9 12l9 7V5Z" /></svg>;
    case "next":
      return <svg {...common} fill="currentColor" stroke="none"><path d="M16 5h2v14h-2zM6 5l9 7-9 7V5Z" /></svg>;
    case "volume":
      return <svg {...common}><path d="M4 10h4l4-4v12l-4-4H4v-4Z" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" /></svg>;
    case "queue":
      return <svg {...common}><path d="M4 6h11M4 11h11M4 16h7" /><path d="M18 15v5M15.5 17.5h5" /></svg>;
    case "shuffle":
      return <svg {...common}><path d="M4 7h2.5c3.5 0 5 10 9 10H20M17 14l3 3-3 3M4 17h2.5c1.2 0 2.2-1.3 3.1-2.8M14.5 9C15.5 7.8 16.1 7 17.5 7H20M17 4l3 3-3 3" /></svg>;
    case "repeat":
      return <svg {...common}><path d="M4 8h13l-2.5-2.5M20 16H7l2.5 2.5M17 8l3-3M7 16l-3 3" /></svg>;
    case "more":
      return <svg {...common}><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></svg>;
    case "close":
      return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
    case "chevron":
      return <svg {...common}><path d="m8 10 4 4 4-4" /></svg>;
    case "calendar":
      return <svg {...common}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 9h16" /></svg>;
    case "ticket":
      return <svg {...common}><path d="M4 7a2 2 0 0 0 0 4v2a2 2 0 0 0 0 4h16v-4a2 2 0 0 0 0-4V7H4Z" /><path d="M13 7v10" /></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    case "arrow-left":
      return <svg {...common}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;
    case "arrow-right":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "lock":
      return <svg {...common}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
  }
}
