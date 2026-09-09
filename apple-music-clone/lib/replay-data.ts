/** Saved May 2026 Replay fixtures. These are not live account analytics. */
export const replayArtists = [
  { name: "ILLENIUM", minutes: 312 },
  { name: "Martin Garrix", minutes: 306 },
  { name: "Kygo", minutes: 161 },
  { name: "RÜFÜS DU SOL", minutes: 144 },
] as const;
export const replayAlbums = [
  { title: "Bloom", artist: "RÜFÜS DU SOL", minutes: 104, explicit: false },
  { title: "Repeat It - Single", artist: "Martin Garrix & Ed Sheeran", minutes: 71, explicit: false },
  { title: "Awake", artist: "ILLENIUM", minutes: 66, explicit: true },
  { title: "Fallen Embers (Deluxe Version)", artist: "ILLENIUM", minutes: 62, explicit: true },
  { title: "Saga", artist: "John Dahlbäck", minutes: 59, explicit: false },
] as const;
export const replayMilestones = [
  { id: "minutes-10000", value: "10,000", kind: "Minutes", detail: "Minutes Listened", date: "19 March", achieved: true },
  { id: "artists-500", value: "500", kind: "Artists", detail: "Artists Played", date: "12 March", achieved: true },
  { id: "songs-1000", value: "1,000", kind: "Songs", detail: "Songs Played", date: "12 March", achieved: true },
  { id: "minutes-7500", value: "7,500", kind: "Minutes", detail: "Minutes Listened", date: "28 February", achieved: true },
  { id: "minutes-5000", value: "5,000", kind: "Minutes", detail: "Minutes Listened", date: "12 February", achieved: true },
  { id: "songs-500", value: "500", kind: "Songs", detail: "Songs Played", date: "29 January", achieved: true },
  { id: "minutes-2500", value: "2,500", kind: "Minutes", detail: "Minutes Listened", date: "22 January", achieved: true },
  { id: "artists-250", value: "250", kind: "Artists", detail: "Artists Played", date: "22 January", achieved: true },
  { id: "artists-100", value: "100", kind: "Artists", detail: "Artists Played", date: "8 January", achieved: true },
  { id: "songs-250", value: "250", kind: "Songs", detail: "Songs Played", date: "8 January", achieved: true },
  { id: "artists-1000", value: "1,000", kind: "Artists", detail: "Artists Played", date: null, achieved: false },
  { id: "songs-2500", value: "2,500", kind: "Songs", detail: "Songs Played", date: null, achieved: false },
  { id: "minutes-25000", value: "25,000", kind: "Minutes", detail: "Minutes Listened", date: null, achieved: false },
  { id: "artists-2000", value: "2,000", kind: "Artists", detail: "Artists Played", date: null, achieved: false },
  { id: "songs-5000", value: "5,000", kind: "Songs", detail: "Songs Played", date: null, achieved: false },
] as const;
/** Only legible captured songs are transcribed; obscured ranks stay unknown. */
export const replaySongSeeds = [
  { rank: 1, title: "Repeat It", artist: "Martin Garrix & Ed Sheeran", plays: null, album: 1, explicit: false },
  { rank: 2, title: "I Want It All", artist: "Lucas & Steve", plays: 16, album: null, explicit: false },
  { rank: 3, title: "Messy", artist: "seven.pm", plays: 12, album: null, explicit: true },
  { rank: 4, title: "Drive (feat. Delilah Montagu)", artist: "Black Coffee & David Guetta", plays: 9, album: null, explicit: false },
  { rank: 6, title: "Lost", artist: "ILLENIUM & Emilie Brandt", plays: 9, album: 2, explicit: false },
  { rank: 7, title: "Where You Are (feat. Lovestarrs)", artist: "John Dahlbäck", plays: 9, album: 4, explicit: false },
  { rank: 8, title: "Fractures (feat. Nevve)", artist: "ILLENIUM", plays: 9, album: 2, explicit: false },
  { rank: 10, title: "Keep My Light On", artist: "DubVision & Raiden", plays: 8, album: null, explicit: false },
  { rank: 11, title: "Mistaken (feat. Alex Aris)", artist: "Martin Garrix & Matisse & Sadko", plays: 7, album: null, explicit: false },
  { rank: 12, title: "Free Fall (feat. RUNN)", artist: "ILLENIUM", plays: 7, album: 2, explicit: false },
] as const;
