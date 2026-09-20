import { Fragment } from "react";
import { expandedLyricBreaks, expandedLyricEmphasis } from "../lib/expanded-presentation";

/** Keep the lyric as selectable, accessible text. Word spans preserve the
 * captured sung/unsung distinction without duplicating accessible content. */
export function LyricText({ line, index, active }: {
  line: string; index: number; active: boolean;
}) {
  const words = line.split(" ");
  const breakAfter = expandedLyricBreaks[index];
  const sung = active ? expandedLyricEmphasis[index] : undefined;
  return <>{words.map((word, offset) => <Fragment key={offset}>
    <span className="lyric-word" data-unsung={sung !== undefined && offset >= sung || undefined}>
      {word}{offset < words.length - 1 ? " " : ""}
    </span>
    {offset + 1 === breakAfter && <span className="expanded-lyric-break" aria-hidden="true" />}
  </Fragment>)}</>;
}
