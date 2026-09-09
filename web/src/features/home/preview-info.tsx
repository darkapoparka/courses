"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Info, X, ArrowUpRight } from "lucide-react";
import type { SampleView } from "./fixtures";

export function PreviewInfo({ sample }: { sample: SampleView }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="icon-button preview-info"
          aria-label="About this preview"
        >
          <Info aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">COURSES / UI PREVIEW</p>
              <Dialog.Title>A first look, not a live marketplace.</Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                className="icon-button"
                type="button"
                aria-label="Close preview information"
              >
                <X aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description>
            Courses, creator names, USD prices and progress are fictional
            samples. No real accounts, purchases or enrollments are created. Preview saves, notes, lists and player positions stay only in this browser tab.
          </Dialog.Description>
          <p>
            Browse, search, course pages, creators, sample lessons, Library and account-interface states are implemented. Real authentication, enrollment, payments and support submission are not connected.
          </p>
          <div className="preview-states">
            <h3>Review a Home state</h3>
            <a href={`/?sample=${sample}`}>
              Populated Home
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={`/?sample=${sample}&state=empty`}>
              Empty catalog
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={`/?sample=${sample}&state=loading`}>
              Slow loading (2 seconds)
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={`/?sample=${sample}&state=error`}>
              Simulated load failure
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <p className="asset-note">
            Photography is licensed via Unsplash. Exact photographer credits and
            source links are recorded with the local assets. People pictured are
            not the fictional instructors and do not endorse these sample
            courses.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
