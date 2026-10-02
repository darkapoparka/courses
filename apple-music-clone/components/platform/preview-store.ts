"use client";
import { useSyncExternalStore } from "react";
import { decodePreview, emptyState, STORAGE_KEY } from "../../lib/platform/preview-state";
import type { PreviewState } from "../../lib/platform/types";
type Snapshot = { state: PreviewState; issue: string | null; writable: boolean; ready: boolean };
const serverSnapshot: Snapshot = { state: emptyState(), issue: null, writable: false, ready: false };
let current = serverSnapshot;
let rawCache: string | null | undefined;
let memoryOnly = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach(listener => listener());
function getSnapshot(): Snapshot {
  if (typeof window === "undefined") return serverSnapshot;
  if (memoryOnly) return current;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw !== rawCache || !current.ready) { rawCache = raw; current = { ...decodePreview(raw), ready: true }; }
  } catch {
    memoryOnly = true;
    current = { ...current, ready: true, writable: true, issue: "Browser storage is unavailable. Changes last only while this page stays open." };
  }
  return current;
}
function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_KEY || event.key === null) { getSnapshot(); listener(); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(listener); window.removeEventListener("storage", onStorage); };
}
export function usePreview() { return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot); }
export function updatePreview(update: (state: PreviewState) => PreviewState): boolean {
  const snapshot = getSnapshot();
  if (!snapshot.ready || !snapshot.writable) return false;
  const state = update(snapshot.state);
  const raw = JSON.stringify(state);
  const checked = decodePreview(raw);
  if (!checked.writable) return false;
  // Browser state is not authentication, purchase permission, or a backend write.
  if (!memoryOnly) {
    try { window.localStorage.setItem(STORAGE_KEY, raw); rawCache = raw; }
    catch {
      current = { ...snapshot, issue: "Your browser could not save this change. Your previous data is unchanged. Copy notes before closing this page." };
      notify(); return false;
    }
  }
  current = { state: checked.state, issue: memoryOnly ? snapshot.issue : null, writable: true, ready: true };
  notify(); return true;
}
