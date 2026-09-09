"use client";

import { useState } from "react";
import { useMusic } from "./music-context";
import { Dialog } from "./music-primitives";

export function CreatePlaylistDialog() {
  const m = useMusic();
  const [name, setName] = useState(m.scene.filled ? "Emotional Songs" : "");
  const [description, setDescription] = useState(m.scene.filled ? "just in case I wanna cry" : "");
  const [visible, setVisible] = useState(Boolean(m.scene.filled && m.scene.formStep));
  const close = () => m.patch({ overlay: null, playlistSeed: undefined });
  return <Dialog title="New Playlist" className="playlist-create" onClose={close}>
    <form onSubmit={event => {
      event.preventDefault();
      if (!name.trim()) return;
      const tracks = m.scene.playlistSeed ?? (m.activeId ? [m.activeId] : []);
      m.setLibrary(data => ({ ...data, playlists: [...data.playlists, { id: crypto.randomUUID(), name: name.trim(), description: description.trim(), tracks, public: visible }] }));
      close();
      m.notify(`Created ${name.trim()}${visible ? " in this local preview" : ""}.`);
    }}>
      <h2>New Playlist</h2>
      <div className="playlist-create-fields"><input aria-label="Playlist name" placeholder="Playlist Title" value={name} onChange={e => setName(e.target.value)} maxLength={100} required /><textarea aria-label="Playlist description" placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} maxLength={1000} /><label><input type="checkbox" checked={visible} onChange={e => setVisible(e.target.checked)} />Show on My Profile and in Search</label></div>
      <footer><button type="button" onClick={close}>Cancel</button><button type="submit" disabled={!name.trim()}>Create</button></footer>
    </form>
  </Dialog>;
}
