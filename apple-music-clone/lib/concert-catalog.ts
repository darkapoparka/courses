import { crop, type Artwork } from "./music-catalog";

export type Concert = { id: string; artist: string; city: string; venue: string; date: string; time: string; day: number; month: string; art: Artwork; poster?: Artwork; genre?: string; address?: string };
const localDate = (date: string) => new Date(`${date}T12:00:00Z`);
export function concertDate(date: string, long = false) {
  return new Intl.DateTimeFormat("en-US", { weekday: long ? "long" : "short", month: "short", day: "numeric", timeZone: "UTC" }).format(localDate(date));
}
const austin = [
  ["Don Toliver", "2026-08-09", "7:30 PM", "Aug", "10"], ["Ella Langley", "2026-08-13", "7 PM", "Aug", "14"],
  ["J. Cole", "2026-09-14", "8 PM", "Sep", "15"], ["Rod Wave", "2026-09-23", "8:30 PM", "Sep", "24"], ["Riley Green", "2026-10-01", "7 PM", "Oct", "2"],
].map(([artist, date, time, month, day], i): Concert => ({ id: `austin-${i}`, artist, date, time, month, day: Number(day), city: "Austin", venue: "Moody Center", art: crop("a0809fad",286+i*227,429,208,208) } as Concert));
const nashville = [
  ["Post Malone", "Nissan Stadium", "2026-06-30", "7:30 PM", "Jul", "1"], ["Chris Brown", "Nissan Stadium", "2026-07-25", "7 PM", "Jul", "26"],
  ["Don Toliver", "Bridgestone Arena", "2026-08-19", "7:30 PM", "Aug", "20"], ["Rod Wave", "Bridgestone Arena", "2026-10-14", "8:30 PM", "Oct", "15"],
  ["Olivia Rodrigo", "Bridgestone Arena", "2026-11-23", "7 PM", "Nov", "24"],
].map(([artist,venue,date,time,month,day], i): Concert => ({ id:`nashville-${i}`,artist,venue,date,time,month,day:Number(day),city:"Nashville",art:crop("70566e85",286+i*227,61,208,208) } as Concert));
const chicago = [
  ["Chris Brown", "Soldier Field", "2026-08-21", "7 PM", "Aug", "22"], ["Kanye West", "Soldier Field", "2026-09-03", "8 PM", "Sep", "4"],
  ["Olivia Rodrigo", "United Center", "2026-10-11", "7 PM", "Oct", "12"], ["Rod Wave", "United Center", "2026-10-31", "8:30 PM", "Nov", "1"],
].map(([artist,venue,date,time,month,day], i): Concert => ({ id:`chicago-${i}`,artist,venue,date,time,month,day:Number(day),city:"Chicago",address:i===2?"1901 W Madison St, Chicago IL":undefined,art:crop("70566e85",286+i*227,394,208,208) } as Concert));
export const cityConcerts = [{ city:"Austin", shows:austin },{ city:"Nashville",shows:nashville },{ city:"Chicago",shows:chicago }];
const popularRows = [
  ["Noah Kahan","Wrigley Field","2026-07-14","6:30 PM","15"],
  ["Moneybagg Yo","The Pavilion at Wolf Lake Memorial Park","2026-07-15","5 PM","16"],
  ["Kevin Gates","The Pavilion at Wolf Lake Memorial Park","2026-07-15","5 PM","16"],
  ["Noah Kahan","Wrigley Field","2026-07-15","6:30 PM","16"],
];
const rangedRows = [
  ["Wale","The Salt Shed Fairgrounds","2026-07-01","7 PM","2"], ["Don Trip","Lincoln Hall","2026-07-02","7 PM","3"],
  ["Treaty Oak Revival","United Center","2026-07-08","1 PM","9"], ["Braxton Keith","United Center","2026-07-08","1 PM","9"],
];
const soulRows = [
  ["Universal Togetherness Band","Empty Bottle","2026-07-01","8 PM","2"], ["Leon Timbo","FitzGerald's","2026-07-02","7 PM","3"],
  ["Les Greene","FitzGerald's","2026-07-02","7 PM","3"], ["Ariella & Nicolaas","Village of Round Lake Beach Cultural and Civic Center","2026-07-03","7 PM","4"],
];
function posters(rows: string[][], source: string, prefix: string, genre?: string): Concert[] {
  return rows.map(([artist,venue,date,time,day],i) => ({ id:`${prefix}-${i}`,artist:artist!,venue:venue!,date:date!,time:time!,day:Number(day),month:"Jul",city:"Chicago",genre,
    art:crop(source,286+i*284,181,264,290), poster:crop(source,286+i*284,181,264,353) }));
}
export const popularConcerts = posters(popularRows,"84b9db6f","popular");
export const rangedConcerts = posters(rangedRows,"83bba8fd","range");
export const soulConcerts = posters(soulRows,"d6b9a1a7","soul","R&B/Soul");
export const weeklyConcerts: Concert[] = [
  {id:"week-0",artist:"Madison Beer",venue:"Aragon Ballroom",date:"2026-06-29",time:"6:30 PM",month:"Jun",day:30,city:"Chicago",art:crop("84b9db6f",286,628,92,92)},
  {id:"week-1",artist:"Alex Warren",venue:"United Center",date:"2026-06-29",time:"7 PM",month:"Jun",day:30,city:"Chicago",art:crop("84b9db6f",286,740,92,92)},
  {id:"week-2",artist:"Noah Cyrus",venue:"United Center",date:"2026-06-29",time:"7 PM",month:"Jun",day:30,city:"Chicago",art:crop("84b9db6f",286,851,92,52)},
  {id:"week-3",artist:"CA7RIEL & Paco Amoroso",venue:"Aragon Ballroom",date:"2026-06-30",time:"7 PM",month:"Jul",day:1,city:"Chicago",art:crop("84b9db6f",853,628,92,92)},
  {id:"week-4",artist:"The Guess Who",venue:"Huntington Bank Pavilion at Northerly Island",date:"2026-06-30",time:"7:30 PM",month:"Jul",day:1,city:"Chicago",art:crop("84b9db6f",853,740,92,92)},
];
export const oliviaPortrait = crop("9105a602",286,37,108,108);
const tourRows: [string,string,string,number,string][] = [
  ["Irvine","Great Park","2026-08-29",30,"Aug"], ["Hartford","XL Center","2026-09-25",26,"Sep"],
  ["Hartford","XL Center","2026-09-26",27,"Sep"], ["Pittsburgh","PPG Paints Arena","2026-09-29",30,"Sep"],
  ["Pittsburgh","PPG Paints Arena","2026-09-30",1,"Oct"], ["Washington","Capital One Arena","2026-10-03",4,"Oct"],
  ["Washington","Capital One Arena","2026-10-04",5,"Oct"], ["Charlotte","Spectrum Center","2026-10-07",8,"Oct"],
  ["Charlotte","Spectrum Center","2026-10-08",9,"Oct"], ["Chicago","United Center","2026-10-11",12,"Oct"],
  ["Chicago","United Center","2026-10-12",13,"Oct"], ["Boston","TD Garden","2026-10-15",16,"Oct"],
  ["Boston","TD Garden","2026-10-17",18,"Oct"], ["Boston","TD Garden","2026-10-18",19,"Oct"],
  ["Montréal","Centre Bell","2026-10-21",22,"Oct"], ["Montréal","Centre Bell","2026-10-22",23,"Oct"],
  ["Toronto","Scotiabank Arena","2026-10-26",27,"Oct"], ["Toronto","Scotiabank Arena","2026-10-27",28,"Oct"],
  ["Columbus","Schottenstein Center","2026-10-29",30,"Oct"], ["Columbus","Schottenstein Center","2026-10-30",31,"Oct"],
  ["Philadelphia","Xfinity Mobile Arena","2026-11-07",8,"Nov"], ["Philadelphia","Xfinity Mobile Arena","2026-11-08",9,"Nov"],
  ["Atlanta","State Farm Arena","2026-11-11",12,"Nov"], ["Atlanta","State Farm Arena","2026-11-12",13,"Nov"],
  ["Orlando","Kia Center","2026-11-15",16,"Nov"],
];
export const oliviaTour: Concert[] = tourRows.map(([city,venue,date,day,month],i) => ({ id:`olivia-${i}`,artist:"Olivia Rodrigo",city,venue,date,day,month,time:i===0?"12 PM":"7 PM",art:oliviaPortrait,address:city==="Chicago"?"1901 W Madison St, Chicago IL":undefined }));
export const extraRanged: Concert[] = [{id:"evanescence",artist:"Evanescence",city:"Chicago",venue:"Credit Union 1 Amphitheatre",date:"2026-07-08",day:9,month:"Jul",time:"7 PM",art:crop("83bba8fd",853,740,92,92)}];
export const extraSoul: Concert[] = [{id:"lou-astro",artist:"Lou Astro",city:"Chicago",venue:"Bookclub",date:"2026-07-03",day:4,month:"Jul",time:"11 PM",genre:"R&B/Soul",art:crop("d6b9a1a7",853,740,92,92)}];
export const concertCatalog = [...austin,...nashville,...chicago,...popularConcerts,...rangedConcerts,...soulConcerts,...weeklyConcerts,...oliviaTour,...extraRanged,...extraSoul];
export function concertById(id?: string) { return concertCatalog.find(show => show.id === (!id || id === "Olivia Rodrigo" ? "chicago-2" : id)) ?? concertCatalog.find(show => show.artist === id); }
export const concertGenres = ["All","Alternative","Blues","Christian","Classical","Country","Dance","Electronic","Hip-Hop/Rap","Holiday","Jazz","K-Pop","Children's Music","Latin","Metal","Pop","R&B/Soul","Reggae","Rock","Singer/Songwriter","Soundtrack","Worldwide"];
