"use client";

import { useMusic } from "./music-context";
import { PasscodeDialog, CancellationDialog } from "./music-account-dialogs";
import { AuthenticationDialog, CheckoutDialog } from "./music-auth";
import { MusicDialogs } from "./music-dialogs";

export function MusicOverlays() {
  const { scene } = useMusic();
  if (scene.overlay === "passcode") return <PasscodeDialog />;
  if (scene.overlay === "cancel-trial" || scene.overlay === "cancelled") return <CancellationDialog />;
  if (["signin", "signup", "verify"].includes(scene.overlay ?? "")) return <AuthenticationDialog />;
  if (scene.overlay === "payment") return <CheckoutDialog />;
  return <MusicDialogs />;
}
