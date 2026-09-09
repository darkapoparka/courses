"use client";
import { useSyncExternalStore } from "react";
// Explicit tab-only preview state. Never identity, entitlement, or a server record.
const eventName = "courses:preview-change";
function subscribe(listener: () => void) {
  window.addEventListener(eventName, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(eventName, listener);
    window.removeEventListener("storage", listener);
  };
}
export function readPreview(key: string) {
  try {
    return sessionStorage.getItem(`courses-preview:${key}`) ?? "";
  } catch {
    return "";
  }
}
export function writePreview(key: string, value: string): boolean {
  try {
    sessionStorage.setItem(`courses-preview:${key}`, value);
    window.dispatchEvent(new Event(eventName));
    return true;
  } catch {
    return false;
  }
}
export function usePreviewValue(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => readPreview(key),
    () => "",
  );
}
export function savedIds(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value || "[]");
    return Array.isArray(parsed)
      ? parsed
          .filter(
            (id): id is string =>
              typeof id === "string" && /^[a-z0-9-]{1,50}$/.test(id),
          )
          .slice(0, 100)
      : [];
  } catch {
    return [];
  }
}
