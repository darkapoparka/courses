"use client";

import { allTracks, crop, emotionalArt, favouriteArt, libraryCovers, trackById, type Card } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, EmptyState, Footer, Glyph, IconButton } from "./music-primitives";
import { CardTile } from "./music-browse";
import { MusicTrackTable } from "./music-track-table";

const artists = ["Ariana Grande", "Billie Eilish", "Olivia Dean", "Olivia Rodrigo", "Taylor Swift"];
const albums = [7, 4, 5, 1, 6, 9].map(i => libraryCovers[i]!);
const videos: Card[] = [
  { id: "begged", title: "Begged (Lyric Video)", subtitle: "Olivia Rodrigo", art: crop("4e857921", 286, 35, 208, 117), destination: "video:begged" },
  { id: "birds", title: "BIRDS OF A FEATHER", subtitle: "Billie Eilish", art: crop("4e857921", 513, 35, 208, 117), destination: "video:birds" },
  { id: "calm-down", title: "You Need To Calm Down", subtitle: "Taylor Swift", art: crop("4e857921", 740, 35, 208, 117), destination: "video:calm-down" },
];
const mixes: Card[] = ["Chill", "Get Up!", "Heavy Rotation", "New Music", "Your Essentials"].map((title, i) => ({
  id: `mix-${i}`, title, subtitle: `Updated ${["Sunday", "Monday", "Today", "Today", "Tuesday"][i]}`,
  destination: `category:${title}`, art: crop("e379e3fe", 286 + i * 227, 64, 208, 208),
}));
export function LibraryView() {
  const m = useMusic();
  const page = m.scene.page;
  const artist = m.scene.selectedArtist ?? "Ariana Grande";
  const title = ({ library: "Recently Added", artists: "Artists", albums: "Albums", songs: "Songs", videos: "Music Videos", "made-for-you": "Made for You", playlists: "All Playlists" } as Record<string, string>)[page]!;
  const allowed = (id: string) => !m.scene.favouritesOnly || m.library.favourites.includes(id);
  let tracks = m.library.songs.flatMap(id => { const t = trackById(id); return t && allowed(id) && (!m.library.restrictions || m.library.musicRating === "Explicit" || !t.explicit) ? [t] : []; });
  const field = m.scene.sortField ?? "title";
  if (field !== "recent") tracks.sort((a, b) => field === "duration" ? a.duration - b.duration : String(a[field]).localeCompare(String(b[field]), "en", { numeric: true, sensitivity: "base" }));
  if (m.scene.sort === "descending") tracks.reverse();
  const playlists: Card[] = m.library.playlists.map(p => ({ id: p.id, title: p.name, art: emotionalArt, destination: `playlist:${p.id}` }));
  const favouriteCard: Card = { id: "favourites", title: "Favourite Songs", subtitle: "Apple Music", art: favouriteArt, destination: "favourites" };
  let cards = page === "albums" ? albums : page === "videos" ? videos : page === "made-for-you" ? mixes : page === "playlists" ? [...playlists, favouriteCard] : [...libraryCovers.map(card => card.id === "cover-8" ? { ...card, subtitle: undefined, destination: "playlist:emotional" } : card), favouriteCard];
  if (page !== "library" && m.scene.sort === "descending") cards = [...cards].reverse();
  const empty = page === "library" ? m.library.songs.length === 0 : page === "made-for-you" && m.scene.empty;
  const showTitle = ["artists", "albums", "songs", "videos"].includes(page);
  const artistAlbums = albums.filter(card => card.subtitle === artist).sort((a, b) => (b.year ?? "").localeCompare(a.year ?? ""));
  const artistTracks = allTracks.filter(t => t.artist === artist && m.library.songs.includes(t.id));
  return <div className={`library-page faithful-library library-${page}`}>
    <div className="library-topbar" data-visible={showTitle || undefined}>
      {showTitle && <h1>{title}</h1>}
      {page !== "library" && !empty && <button type="button" className="library-sort" aria-label={`Sort ${title}`} aria-haspopup="menu" onClick={event => m.openMenu("sort", event)}>{page === "made-for-you" || page === "playlists" ? "Playlist Type" : <Glyph name="sort" size={16} />}<Glyph name="down" size={12} /></button>}
    </div>
    {empty ? <EmptyState icon={page === "library" ? "music" : "person"} title={page === "library" ? "Add music to your library" : undefined} description={page === "library" ? "Browse millions of songs and collect your favourite here." : "Personal mixes that you add will appear here."} action={page === "library" ? "Browse Apple Music" : undefined} onAction={() => m.go("new")} /> : page === "songs" ? <MusicTrackTable tracks={tracks} compact /> : page === "artists" ? <div className="artist-library-split">
      <nav className="library-artist-list" aria-label="Library artists">{artists.map((name, i) => <button type="button" key={name} aria-current={name === artist ? "page" : undefined} onClick={() => m.patch({ selectedArtist: name })}><Art art={crop("0df0d2a2", 256, 44 + i * 51.5, 34, 34)} label={name} /><span>{name}{m.library.favouriteArtists.includes(name) && <span className="small-star" aria-label="Favourite">★</span>}</span></button>)}</nav>
      <div className="library-artist-content">
        <header><h2><button type="button" onClick={() => m.go(`artist:${artist}`)}>{artist}<Glyph name="chevron" size={14} /></button></h2><div className="artist-library-actions">
          <IconButton icon="play" label={`Play ${artist}`} onClick={() => artistTracks[0] && m.play(artistTracks[0])} />
          <IconButton icon="shuffle" label={`Shuffle ${artist}`} onClick={() => { m.setShuffle(true); if (artistTracks[0]) m.play(artistTracks[0]); }} />
          <IconButton icon="star" label={`Favourite ${artist}`} aria-pressed={m.library.favouriteArtists.includes(artist)} onClick={() => m.favouriteArtist(artist)} />
          <IconButton icon="more" label={`More actions for ${artist}`} onClick={event => m.openMenu("artist", event, artist)} />
        </div></header>
        <div className="library-grid">{artistAlbums.map(card => <CardTile key={card.id} card={{ ...card, subtitle: card.year }} />)}</div>
      </div>
    </div> : <div className="library-grid">{cards.map(card => <CardTile key={card.id} card={card} />)}</div>}
    <Footer compact={page !== "made-for-you" && page !== "playlists"} />
  </div>;
}
