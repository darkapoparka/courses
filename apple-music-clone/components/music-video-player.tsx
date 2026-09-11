"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { videoArt } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Art, Glyph, IconButton } from "./music-primitives";

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
const progress = (value: number, maximum: number) => ({ background: `linear-gradient(to right, #fff ${value / maximum * 100}%, #20202099 ${value / maximum * 100}%)` });

export function VideoPlayer() {
  const m = useMusic();
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const source = m.audio.current?.getAttribute("src") || undefined;
  const albumVideo = m.activeId === "album-video" && m.active;
  const duration = albumVideo ? albumVideo.duration : 224;
  // Freeze the saved still until interaction. Live opening starts a silent UI
  // transport at zero; no recording is streamed or falsely represented as media.
  const [elapsed, setElapsed] = useState(m.scene.source && !albumVideo ? 6 : 0);
  const [playing, setPlaying] = useState(true);
  const [running, setRunning] = useState(!m.scene.source);
  const seek = (position: number) => setElapsed(Math.max(0, Math.min(duration, position)));
  const toggle = () => {
    if (!playing && elapsed >= duration) setElapsed(0);
    setPlaying(!playing);
    setRunning(true);
  };

  useEffect(() => {
    if (!playing || !running || source) return;
    const timer = window.setInterval(() => setElapsed(value => Math.min(duration, value + .25)), 250);
    return () => window.clearInterval(timer);
  }, [playing, running, source, duration]);
  useEffect(() => { if (elapsed >= duration) setPlaying(false); }, [elapsed, duration]);
  useEffect(() => {
    const element = video.current;
    if (!element || !source) return;
    m.audio.current?.pause();
    element.src = source;
    void element.play().catch(() => m.notify("Press Play to start the local video."));
    return () => element.pause();
  }, [source, m.audio, m.notify]);
  useEffect(() => {
    if (video.current) { video.current.volume = m.volume; video.current.muted = m.muted; }
  }, [m.volume, m.muted, source]);
  useEffect(() => {
    // Capture the opener before making its region inert; inert itself blurs it.
    const previous = document.activeElement;
    const background = Array.from(document.querySelectorAll<HTMLElement>(".music-sidebar, .music-main, .mobile-header"));
    const prior = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
    host.current?.focus({ preventScroll: true });
    return () => {
      background.forEach((element, index) => { element.inert = prior[index]!; });
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);

  const close = () => {
    if (document.fullscreenElement === host.current) void document.exitFullscreen().catch(() => {});
    m.patch({ video: false });
  };
  const fullscreen = async () => {
    try {
      if (document.fullscreenElement === host.current) await document.exitFullscreen();
      else if (host.current?.requestFullscreen) await host.current.requestFullscreen();
      else m.notify("Fullscreen is unavailable in this browser.");
    } catch { m.notify("The browser could not enter fullscreen. Try again from the video control."); }
  };
  const keyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Do not start the underlying audio player's transport.
    if (event.key === "Escape") { event.preventDefault(); close(); return; }
    if (event.key === "Tab") {
      const controls = Array.from(host.current?.querySelectorAll<HTMLElement>("button:not([disabled]), input, video[controls]") ?? []).filter(element => element.getClientRects().length > 0);
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === host.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === host.current)) { event.preventDefault(); first?.focus(); }
    }
    if (event.code === "Space" && !(event.target as HTMLElement).closest("button, input, video")) { event.preventDefault(); toggle(); }
  };

  return <div ref={host} className="video-player" role="dialog" aria-modal="true" aria-label="Video player" tabIndex={-1} style={{ outline: "none" }} onKeyDown={keyboard}>
    <IconButton icon="close" label="Close video" className="video-close" onClick={close} />
    {source ? <video ref={video} controls playsInline aria-label="Local video playback" /> : <>
      <Art art={albumVideo ? albumVideo.art : videoArt} label="Begged lyric video frame" className="video-reference-frame" />
      <button type="button" className="video-poster-action" aria-label="Choose local media to play" onClick={() => m.patch({ overlay: "media" })}><span className="sr-only">Choose local media to play</span></button>
      <div className="video-reference-controls" aria-label="Video controls">
        <div className="video-progress-row"><span aria-label="Elapsed video time">{clock(elapsed)}</span><input type="range" aria-label="Video position" min="0" max={duration} step="0.25" value={elapsed} style={progress(elapsed, duration)} onChange={event => seek(Number(event.target.value))} /><span>-{clock(duration - elapsed)}</span></div>
        <div className="video-control-row">
          <label className="video-volume-control"><Glyph name="volume" size={12} /><input type="range" aria-label="Video volume" min="0" max="1" step="0.01" value={m.volume} style={progress(m.volume, 1)} onChange={event => m.setVolume(Number(event.target.value))} /></label>
          <div className="video-center-controls">
            <IconButton icon="rewind-10" label="Back 10 seconds" onClick={() => seek(elapsed - 10)} />
            <IconButton icon={playing ? "pause" : "play"} label={playing ? "Pause video" : "Play video"} onClick={toggle} />
            <IconButton icon="forward-10" label="Forward 10 seconds" onClick={() => seek(elapsed + 10)} />
          </div>
          <IconButton icon="expand" label="Toggle video fullscreen" onClick={() => void fullscreen()} />
        </div>
      </div>
    </>}
  </div>;
}
