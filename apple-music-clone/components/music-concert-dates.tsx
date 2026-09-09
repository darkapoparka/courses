"use client";

// Local date-filter UI for a frozen reference catalog; no reservations or billing.
import { useState } from "react";
import { useMusic } from "./music-context";
import { Dialog, Glyph, IconButton } from "./music-primitives";

const dayMs = 86400000;
const capturedToday = Date.UTC(2026, 5, 29);
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);
export function ConcertDatesDialog() {
  const m = useMusic();
  const [month, setMonth] = useState(m.scene.formStep || m.scene.dateRange ? 6 : 5);
  const [start, setStart] = useState<number | null>(m.scene.filled || m.scene.dateRange ? Date.UTC(2026, 6, 1) : null);
  const [end, setEnd] = useState<number | null>(m.scene.filled || m.scene.dateRange ? Date.UTC(2026, 6, 12) : null);
  const [picker, setPicker] = useState(false);
  const close = () => m.patch({ overlay: null });
  const choose = (time: number) => {
    if (start === null || end !== null || time < start) { setStart(time); setEnd(null); }
    else setEnd(time);
  };
  const quick = (kind: number) => {
    const times = [[capturedToday, capturedToday], [capturedToday + dayMs, capturedToday + dayMs],
      [Date.UTC(2026, 6, 4), Date.UTC(2026, 6, 5)], [Date.UTC(2026, 6, 11), Date.UTC(2026, 6, 12)],
      [capturedToday, Date.UTC(2026, 5, 30)]];
    const pair = times[kind]!;
    setStart(pair[0]!); setEnd(pair[1]!); setMonth(new Date(pair[0]!).getUTCMonth());
  };
  const first = new Date(Date.UTC(2026, month, 1)).getUTCDay();
  const days = new Date(Date.UTC(2026, month + 1, 0)).getUTCDate();
  const label = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(2026, month, 1)));
  const submit = () => {
    if (start === null) return;
    const format = (value: number) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(value));
    m.patch({ overlay: null, dateStart: iso(start), dateEnd: iso(end ?? start), dateRange: end && end !== start ? `${format(start)} - ${format(end)}` : format(start) });
  };
  return <Dialog title="Dates" className="concert-dates-dialog" onClose={close}>
    <h2>Dates</h2>{start !== null && <button type="button" className="date-clear" onClick={() => { setStart(null); setEnd(null); }}>Clear</button>}
    <div className="date-quick-pills">{["Today", "Tomorrow", "This Weekend", "Next Weekend", "This Month"].map((title, i) => <button type="button" key={title} onClick={() => quick(i)}>{title}</button>)}</div>
    <div className="concert-calendar-heading"><button type="button" onClick={() => setPicker(!picker)} aria-expanded={picker}>{label}<Glyph name="chevron" size={14} /></button><span>{month > 5 && <IconButton icon="back" label="Previous month" onClick={() => setMonth(value => value - 1)} />}<IconButton icon="chevron" label="Next month" disabled={month === 11} onClick={() => setMonth(value => value + 1)} /></span></div>
    {picker ? <div className="concert-month-picker">{Array.from({ length: 7 }, (_, i) => i + 5).map(value => <button type="button" key={value} onClick={() => { setMonth(value); setPicker(false); }}>{new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2026, value, 1)))}</button>)}</div> : <div className="concert-calendar">
      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => <span className="calendar-weekday" key={day}>{day}</span>)}
      {Array.from({ length: first }, (_, i) => <span key={`empty-${i}`} />)}
      {Array.from({ length: days }, (_, i) => i + 1).map(day => {
        const time = Date.UTC(2026, month, day);
        const selected = start !== null && time >= start && time <= (end ?? start);
        return <button type="button" key={day} aria-label={`Select ${day} ${label}`} aria-pressed={selected} disabled={time < capturedToday} data-start={time === start || undefined} data-end={time === (end ?? start) || undefined} data-today={time === capturedToday || undefined} onClick={() => choose(time)}>{day}</button>;
      })}
    </div>}
    <footer><button type="button" disabled={start === null} onClick={submit}>Show Concerts</button></footer>
  </Dialog>;
}
