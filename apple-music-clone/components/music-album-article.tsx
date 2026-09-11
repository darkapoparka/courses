"use client";

import { useLayoutEffect, useRef } from "react";
import { albumTitle } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Dialog } from "./music-primitives";
import styles from "./music-album.module.css";

/** Editorial text transcribed from the two supplied article captures. */
export function AlbumArticle() {
  const m = useMusic();
  const scroll = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!m.scene.scrollOffset) return;
    // In production this layout effect can run before Dialog's showModal effect.
    // A hidden dialog has no scrollable layout; wait for its actual open state,
    // rather than relying on Strict Mode's extra development effect cycle.
    let frame = 0;
    const applyScroll = () => {
      const element = scroll.current;
      if (!element) return;
      if (!element.closest("dialog")?.open || !element.clientHeight) {
        frame = requestAnimationFrame(applyScroll);
        return;
      }
      element.scrollTop = element.scrollHeight;
    };
    frame = requestAnimationFrame(applyScroll);
    return () => cancelAnimationFrame(frame);
  }, [m.scene.scrollOffset]);
  return <Dialog title="About this album" className={styles.article} onClose={() => m.patch({ overlay: null })}>
    <header className={styles.articleHeader}><h2>{albumTitle}</h2><p>Olivia Rodrigo · 2026</p></header>
    <div ref={scroll} className={styles.articleBody} tabIndex={0} aria-label="Album editorial notes">
      <p><strong>A pop savant raises her game and her standards on her third album.</strong></p>
      <p>Olivia Rodrigo has loved and lost many times since she cried through the suburbs as the heartbroken teenager in “drivers license”. She’s grown up, and her standards have gotten higher—for a good love song, but also for what makes a good relationship.</p>
      <p>With her third album, <em>you seem pretty sad for a girl so in love</em>, Rodrigo is eager to share what she’s learned. “I found a lot of interesting pieces of myself in this album,” she tells Apple Music. “I just wanted to perfect a sad love song. All of my favourite love songs are so beautiful because there’s an element of yearning or melancholy or fear.”</p>
      <p>She’s not the first woman to fall in love while waiting in the bathroom line at the bar, as she does in <strong>“drop dead”</strong>, but you’d be hard-pressed to find someone who can voice that specific, oh-so-familiar scene so vividly.</p>
      <p>She sings of hoping to impress a boy’s sister on <strong>“u + me = &lt;3”</strong> (“I try to win her over with my cynical humour and yacht rock music taste”); she captures that moment when a love develops from new butterflies into something deeper with <strong>“purple”</strong> (“I used to visit your town like a tourist/Now I’ve got a local grocery store and a favourite florist”).</p>
      <p>It’s not all googly eyes, though: <strong>“expectations”</strong> taps into the mortification that sets in when the party goggles wear off and a dude goes from cute to cringe real fast (“I think he was on drugs/He wasn’t smart or funny/I convinced myself he was... And now his number’s blocked”), and she invokes the pop-punk snarl of Avril Lavigne and Paramore for <strong>“my way”</strong>.</p>
      <p>And even if she has fun between the ballads, the sadder, sparser songs lay out—again, in characteristically vivid detail—how Rodrigo believes the mistakes we make in the name of love are painful but effective teachers.</p>
      <p><strong>“cigarette smoke”</strong> delivers one of Rodrigo’s strongest vocal performances, as well as a one-liner you wish you thought of in that final text to an ex (“I thought that we played the perfect couple/Until you didn’t want the part”). <strong>“less”</strong>, which brings her back to the piano by herself, teaches her that love isn’t all you need to make a relationship work: “If loving me means letting go and wishing me the best/Then I guess I wish, I wish, I wish you loved me less.”</p>
      <p>Also effective teachers are the rock stars who came before her: “the cure”, a meditation on the baggage that sinks relationships, boasts a guitar riff that, let’s say, pays homage to “Everlong” as well as <em>Mellon Collie and the Infinite Sadness</em>-worthy strings, while the longing “what’s wrong with me” goes straight to the source by bringing Robert Smith of The Cure (the band, not the Olivia Rodrigo song) in for a duet.</p>
      <p>Maybe <em>you seem pretty sad for a girl so in love</em> is a collection of love notes, but not the kind you send: This is further proof of Rodrigo’s great capacity for feeling, and feeling it all—the brutal lows, sure, but also the bottomless hope that sparks with a look from a stranger in a crowded bar that could potentially change your life.</p>
    </div>
  </Dialog>;
}
