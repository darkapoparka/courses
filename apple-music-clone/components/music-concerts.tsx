"use client";

import { useEffect, useRef, useState } from "react";
import { allTracks } from "../lib/music-catalog";
import { cityConcerts, concertById, concertCatalog, concertDate, concertGenres, extraRanged, extraSoul, oliviaPortrait, oliviaTour, popularConcerts, rangedConcerts, soulConcerts, weeklyConcerts, type Concert } from "../lib/concert-catalog";
import { useMusic } from "./music-context";
import { Art, EmptyState, Footer, Glyph, IconButton, Section } from "./music-primitives";
import { Rail } from "./music-rail";

export function DateBadge({ show, dark = false }: { show: Pick<Concert,"month"|"day">; dark?: boolean }) {
  return <span className={`concert-date-badge ${dark ? "dark-date" : ""}`}><small>{show.month}</small><strong>{show.day}</strong></span>;
}
function ConcertCard({ show, poster = false }: { show: Concert; poster?: boolean }) {
  const m=useMusic();
  return <article className={`media-card event-card ${poster ? "event-poster" : ""}`}>
    <button type="button" className="card-art-button" aria-label={`${show.artist}, ${show.venue}, ${concertDate(show.date)} at ${show.time}`} onClick={() => m.go(`concert:${show.id}`)}>
      <Art art={poster && show.poster ? show.poster : show.art} label={show.artist} />
      <DateBadge show={show} />
    </button>
    {poster ? <span className="sr-only">{show.artist}. {show.venue}. {concertDate(show.date)} at {show.time}.</span> : <div className="event-caption"><button type="button" onClick={() => m.go(`concert:${show.id}`)}>{show.artist}</button><p>{show.venue}</p><p>{concertDate(show.date)} · {show.time}</p></div>}
  </article>;
}
function EventRow({ show }: { show: Concert }) {
  const m=useMusic();
  return <div className="event-row"><button type="button" className="event-row-art" aria-label={`Open ${show.artist} concert`} onClick={() => m.go(`concert:${show.id}`)}><Art art={show.art} label={show.artist}/><DateBadge show={show}/></button><button type="button" className="event-row-copy" onClick={() => m.go(`concert:${show.id}`)}><strong>{show.artist}</strong><span>{show.venue}</span><span>{concertDate(show.date,true)} · {show.time}</span></button><IconButton icon="more" label={`Details for ${show.artist} concert`} onClick={() => m.go(`concert:${show.id}`)}/></div>;
}
export function ConcertsView() {
  const m=useMusic();
  const editing=m.scene.menu === "location";
  const selected=Boolean(m.scene.location) && !editing;
  const [query,setQuery]=useState(editing ? (m.scene.location ?? "").toLowerCase() : "");
  const [highlight,setHighlight]=useState(0);
  const input=useRef<HTMLInputElement>(null);
  const filters=useRef<HTMLDivElement>(null);
  const lastLocation=useRef<string|undefined>(editing ? undefined : m.scene.location);
  const suggestions=query.trim().toLowerCase().includes("chicago") ? ["Chicago, IL","Chicago Hts, IL","North Chicago, IL","East Chicago, IN","Chicago Ridge, IL","Chicago Heights, IL","West Chicago, IL"] : [];
  useEffect(() => {
    if (editing) input.current?.focus({preventScroll:true});
    if (!editing && m.scene.menu !== "genres") return;
    const dismiss=(event:PointerEvent) => { if (event.target instanceof Node && !filters.current?.contains(event.target)) m.patch({ menu:null, location:lastLocation.current }); };
    document.addEventListener("pointerdown",dismiss);
    return () => document.removeEventListener("pointerdown",dismiss);
  },[editing,m.scene.menu,m.patch]);
  const choose=(city:string) => { lastLocation.current=city; m.patch({location:city,menu:null,dateRange:undefined,dateStart:undefined,dateEnd:undefined,genre:undefined}); document.getElementById("music-main")?.scrollTo({top:0}); };
  const range=Boolean(m.scene.dateRange);
  const pool=m.scene.genre === "R&B/Soul" ? soulConcerts : range ? rangedConcerts : popularConcerts;
  const extras=m.scene.genre === "R&B/Soul" ? extraSoul : extraRanged;
  const all=range ? [...pool,...extras] : [...weeklyConcerts];
  const filter=(show:Concert) => (!m.scene.genre || show.genre===m.scene.genre) && (!m.scene.dateStart || show.date>=m.scene.dateStart) && (!m.scene.dateEnd || show.date<=m.scene.dateEnd);
  const local=selected && m.scene.location!=="Chicago, IL" ? concertCatalog.filter(show => show.city===m.scene.location?.split(",")[0]) : null;
  const posters=(local ?? pool).filter(filter);
  const rows=(local ?? all).filter(filter);
  return <div className={`page-content faithful-concerts ${selected ? "location-selected" : ""}`}>
    <h1>Concerts</h1><div ref={filters} className="concert-filters">
      {editing ? <label className="concert-city-input"><Glyph name="location" size={16}/><input ref={input} aria-label="Find a city" role="combobox" aria-expanded={Boolean(query)} aria-controls="concert-city-results" aria-activedescendant={suggestions[highlight] ? `city-${highlight}` : undefined} value={query} onChange={event => {setQuery(event.target.value);setHighlight(0);}} onKeyDown={event => { if(event.key==="ArrowDown"){event.preventDefault();setHighlight(i=>Math.min(i+1,suggestions.length-1));} if(event.key==="ArrowUp"){event.preventDefault();setHighlight(i=>Math.max(0,i-1));} if(event.key==="Enter" && suggestions[highlight]){event.preventDefault();choose(suggestions[highlight]!);} if(event.key==="Escape") m.patch({menu:null,location:lastLocation.current});}}/></label> : <button type="button" className={`pill ${selected ? "primary" : "outline"}`} onClick={() => {lastLocation.current=m.scene.location;setQuery(m.scene.location?.toLowerCase() ?? "");m.patch({menu:"location"});}}>{selected && <Glyph name="location" size={15}/ >}{selected ? m.scene.location : "Set Location"}</button>}
      <button type="button" className={`pill ${range ? "primary" : "outline"}`} disabled={!selected} onClick={() => m.patch({overlay:"dates",formStep:0,filled:false})}>{m.scene.dateRange ?? "Dates"}</button>
      <button type="button" className={`pill ${m.scene.genre ? "primary" : "outline"}`} disabled={!selected} aria-haspopup="menu" aria-expanded={m.scene.menu==="genres"} onClick={() => m.patch({menu:m.scene.menu==="genres"?null:"genres"})}>{m.scene.genre ?? "Genres"}</button>
      {editing && query && <div id="concert-city-results" className="concert-city-results" role="listbox" aria-label="City suggestions"><h3>Suggestions</h3>{suggestions.length ? suggestions.map((city,i)=><button type="button" id={`city-${i}`} role="option" aria-selected={highlight===i} key={city} onMouseDown={event=>event.preventDefault()} onClick={()=>choose(city)}><Glyph name="location" size={16}/><span>{city}<small>United States</small></span></button>) : <p>No cities found</p>}</div>}
      {m.scene.menu==="genres" && <div className="concert-genre-menu" role="menu" aria-label="Concert genres" onKeyDown={event => {const buttons=Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));const index=buttons.indexOf(document.activeElement as HTMLButtonElement);if(event.key==="Escape")m.patch({menu:null});else if(event.key==="ArrowDown"||event.key==="ArrowUp"){event.preventDefault();buttons[(index+(event.key==="ArrowDown"?1:buttons.length-1))%buttons.length]?.focus();}}}>{concertGenres.map(genre=><button type="button" role="menuitemradio" aria-checked={(m.scene.genre ?? "All")===genre} key={genre} onClick={()=>m.patch({genre:genre==="All"?undefined:genre,menu:null})}><span>{(m.scene.genre ?? "All")===genre && <Glyph name="check" size={15}/>}</span>{genre}</button>)}</div>}
    </div>
    {!selected ? <><div className="discover-concerts"><div className="music-badge"><Glyph name="ticket" size={35}/></div><h2>Discover Concerts</h2><p>Set a location to discover concerts nearby</p></div>{cityConcerts.map(group=><Section key={group.city} title={`Concerts in ${group.city}`} id={group.city.toLowerCase()}><Rail label={`${group.city} concerts`} className="square-rail">{group.shows.map(show=><ConcertCard key={show.id} show={show}/>)}</Rail></Section>)}</> : posters.length || rows.length ? <><Section title="Popular" onMore={()=>m.go(`category:Concerts in ${m.scene.location}`)}><Rail label="Popular concerts" className="poster-rail">{posters.map(show=><ConcertCard key={show.id} show={show} poster/>)}</Rail></Section><Section title={range ? "All Upcoming" : "This Week"} id="all-upcoming"><Rail label="Upcoming concerts" className="events-rail"><div className="event-row-grid">{rows.map(show=><EventRow key={show.id} show={show}/>)}</div></Rail></Section></> : <EmptyState icon="ticket" title="No concerts found" description="No concerts in the saved collection match these filters." action="Clear filters" onAction={()=>m.patch({dateRange:undefined,dateStart:undefined,dateEnd:undefined,genre:undefined})}/>}
    <Footer/>
  </div>;
}
export function TourRow({ show, dark = false, compactTime = false }: { show: Concert; dark?: boolean; compactTime?: boolean }) {
  const m=useMusic();
  const date=compactTime ? new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"}).format(new Date(`${show.date}T12:00:00Z`)) : concertDate(show.date);
  return <button type="button" className="tour-row" onClick={()=>m.go(`concert:${show.id}`)}><DateBadge show={show} dark={dark}/><span><strong>{show.city}</strong><small>{show.venue} · {date} · {compactTime ? show.time==="12 PM"?"12":"19" : show.time}</small></span><Glyph name="chevron" size={17}/></button>;
}
export function NearbyView() {
  return <div className="page-content faithful-nearby"><header><Art art={oliviaPortrait} label="Olivia Rodrigo"/><div><p>Upcoming Concerts</p><h1>Olivia Rodrigo</h1></div></header><Section title="Nearby Concerts"><div className="tour-grid">{oliviaTour.filter(show=>show.city==="Chicago").map(show=><TourRow key={show.id} show={show} compactTime/>)}</div></Section><Section title="All Upcoming Concerts" id="more-concerts"><div className="tour-grid">{oliviaTour.map(show=><TourRow key={show.id} show={show} compactTime/>)}</div></Section><Footer/></div>;
}
export function ConcertView() {
  const m=useMusic();
  const show=concertById(m.scene.category);
  if(!show) return <div className="page-content"><EmptyState icon="ticket" title="Concert not found" description="This event is not in the saved reference collection." action="Browse concerts" onAction={()=>m.go("concerts")}/></div>;
  const calendar=()=>{
    const safe=(value:string)=>value.replace(/[\r\n]/g," ").replace(/\\/g,"\\\\").replace(/,/g,"\\,").replace(/;/g,"\\;");
    const hour=show.time==="12 PM"?12:show.time==="8:30 PM"?20:show.time==="8 PM"?20:show.time==="5 PM"?17:show.time==="6:30 PM"?18:19;
    const minute=show.time.includes(":30")?"30":"00";
    const dtstart=`${show.date.replaceAll("-","")}T${hour}${minute}00`;
    const ics=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Courses//Reference Preview//EN\r\nBEGIN:VEVENT\r\nUID:${show.id}@example.test\r\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}\r\nDTSTART;TZID=America/Chicago:${dtstart}\r\nSUMMARY:${safe(show.artist)} — reference event\r\nLOCATION:${safe(show.venue)}\r\nDESCRIPTION:Saved reference fixture. Confirm current event details with the venue.\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const url=URL.createObjectURL(new Blob([ics],{type:"text/calendar;charset=utf-8"}));const link=document.createElement("a");link.href=url;link.download=`${show.id}.ics`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  const share=async()=>{const link=new URL(`/?view=concert&category=${encodeURIComponent(show.id)}`,window.location.origin).href;try{if(navigator.share)await navigator.share({title:show.artist,url:link});else{await navigator.clipboard.writeText(link);m.notify("Concert link copied.");}}catch(e){if(!(e instanceof DOMException&&e.name==="AbortError"))m.notify("Sharing could not be opened.");}};
  const tracks=allTracks.filter(track=>track.artist===show.artist&&!track.unavailable);
  const fullDate=new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"}).format(new Date(`${show.date}T12:00:00Z`));
  const weekday=new Intl.DateTimeFormat("en-US",{weekday:"long",timeZone:"UTC"}).format(new Date(`${show.date}T12:00:00Z`));
  return <div className="faithful-concert-detail"><IconButton icon="share" label="Share concert" className="concert-share" onClick={()=>void share()}/><div className="concert-detail-body">
    <div className="concert-portrait"><Art art={show.artist==="Olivia Rodrigo"?oliviaPortrait:show.art} label={show.artist}/><DateBadge show={show} dark/></div><h1>{show.artist}</h1>
    <div className="concert-detail-actions"><a href="https://www.bandsintown.com/" target="_blank" rel="noreferrer" title="Open the ticket provider and confirm current details"><Glyph name="ticket" size={15}/>Get Tickets</a><button type="button" onClick={()=>{if(tracks[0]){m.setQueue(tracks.slice(1).map(t=>t.id));m.play(tracks[0]);}else m.notify("This artist’s recordings are not included in the local reference catalog.");}}><Glyph name="play" size={15}/>Artist Station</button></div>
    <div className="concert-venue"><div><span><strong>{fullDate} · {weekday}</strong><small>{show.time.replace(/^7 PM$/,"7:00 PM")}</small></span><IconButton icon="calendar" label="Add reference concert to calendar" onClick={calendar}/></div><div><span><strong>{show.venue}</strong><small>{show.address ?? show.city}</small></span><a className="icon-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(show.address ?? `${show.venue} ${show.city}`)}`} target="_blank" rel="noreferrer" aria-label="Open venue map"><Glyph name="location" size={17}/></a></div></div>
    <p className="bandsintown-credit">Powered by Bandsintown</p>
    <Section title="More Upcoming Concerts" id="more-concerts" onMore={()=>m.go("nearby")}><div className="tour-list">{(show.artist==="Olivia Rodrigo"?oliviaTour:concertCatalog.filter(item=>item.artist===show.artist&&item.id!==show.id)).slice(0,5).map(item=><TourRow key={item.id} show={item} dark/>)}</div></Section>
    </div><Footer/>
  </div>;
}
