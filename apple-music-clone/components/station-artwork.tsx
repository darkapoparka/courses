import { useId } from "react";
import styles from "./station-artwork.module.css";
import { Glyph } from "./music-primitives";

/** Art-only geometry from the last visible station frame in the frozen Home
 * recording (2f5da478, 3.6–3.9s). The carousel moves this same DOM artwork
 * beneath the glass; neither a captured sidebar nor its controls are embedded. */
export function StationArtwork() {
  const gradient = useId();
  return <span className={`music-art ${styles.frame}`} role="img" aria-label="Alex’s Station"
    data-art-source="2f5da478-5817-4e12-99bd-b2df0355f896" data-art-frame="forward">
    <svg viewBox="0 0 264 353" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id={gradient} x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#e43a69" /><stop offset=".38" stopColor="#f34c1b" /><stop offset="1" stopColor="#f2571f" />
      </linearGradient><linearGradient id={`${gradient}-arrow`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#ffb80a" /><stop offset=".6" stopColor="#f58507" /><stop offset="1" stopColor="#f77e04" /></linearGradient></defs>
      <path fill={`url(#${gradient})`} d="M0 0H264V353H0Z" />
      <path fill={`url(#${gradient}-arrow)`} d="M0 0 264 176.5 0 353 142 176.5Z" />
    </svg>
    <span className={styles.brand} aria-hidden="true"><Glyph name="apple" size={13} />Music</span>
    <span className={styles.caption} aria-hidden="true"><strong>Made for You</strong><span>Alex’s Station</span></span>
  </span>;
}
