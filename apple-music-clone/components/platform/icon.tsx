import type { SVGProps } from "react";
type Name = "discover" | "search" | "library" | "saved" | "community" | "arrow" | "check" | "book" | "lock" | "person" | "grid" | "list" | "home";
const paths: Record<Name, string> = {
  home: "M3 11 12 3l9 8v10h-6v-7H9v7H3V11Z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.1M3 12h.1M3 18h.1",
  discover: "m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z",
  search: "M17 17l4 4M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z",
  library: "M4 4v16M9 4v16m5-15 5-1 3 15-5 1-3-15Z",
  saved: "M6 3h12v18l-6-4-6 4V3Z",
  community: "M8 10h8m-8 4h5M21 11c0 5-4 8-9 8H7l-4 3v-6a8 8 0 0 1-1-5c0-5 4-8 10-8s9 3 9 8Z",
  arrow: "m9 5 7 7-7 7", check: "m5 12 4 4L19 6",
  book: "M12 5c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15",
  person: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2",
  grid: "M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z",
  lock: "M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5V10Z",
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: Name }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>;
}
