"use client";

import { useMusic } from "./music-context";
import { PasscodeDialog, CancellationDialog } from "./music-account-dialogs";
import { AuthenticationDialog, CheckoutDialog } from "./music-auth";
import { MusicDialogs } from "./music-dialogs";
import { CreatePlaylistDialog } from "./music-create-playlist";
import { ConcertDatesDialog } from "./music-concert-dates";
import { AlbumArticle } from "./music-album-article";

export function MusicOverlays() {
  const { scene } = useMusic();
  if (scene.overlay === "article") return <AlbumArticle />;
  if (scene.overlay === "dates") return <ConcertDatesDialog />;
  if (scene.overlay === "new-playlist") return <CreatePlaylistDialog />;
  if (scene.overlay === "passcode") return <PasscodeDialog />;
  if (scene.overlay === "cancel-trial" || scene.overlay === "cancelled") return <CancellationDialog />;
  if (["signin", "signup", "verify"].includes(scene.overlay ?? "")) return <AuthenticationDialog />;
  if (scene.overlay === "payment") return <CheckoutDialog />;
  return <MusicDialogs />;
}
