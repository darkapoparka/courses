import { crop, radioStations } from "./music-catalog";

/** Local station metadata, shared by compact and expanded players. It is not a
 * streaming endpoint; the saved Hits broadcast is a silent playback fixture. */
export function stationPlayback(id: string | undefined) {
  const station = radioStations.find(item => item.id === id);
  if (!station) return undefined;
  if (id === "station-1") return {
    station, title: "Gorgeous", subtitle: "Doja Cat — Vie — Apple Music Hits",
    compactArt: crop("47a07865", 704, 842, 33, 33),
    expandedArt: crop("7bd2ef54", 461, 106, 518, 519),
    hasCapturedBroadcast: true,
  };
  return { station, title: station.title, subtitle: "Live Radio",
    compactArt: station.art, expandedArt: station.art, hasCapturedBroadcast: false };
}
