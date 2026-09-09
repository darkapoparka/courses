"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
export function Disclosure({
  title,
  description,
  trigger,
  children,
  className = "",
  buttonClass = "text-link",
}: {
  title: string;
  description: string;
  trigger: ReactNode;
  children?: ReactNode;
  className?: string;
  buttonClass?: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className={buttonClass}>
          {trigger}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className={`dialog-content flow-dialog ${className}`}>
          <Dialog.Close asChild>
            <button
              className="icon-button dialog-close"
              aria-label="Close dialog"
            >
              <X aria-hidden="true" />
            </button>
          </Dialog.Close>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
