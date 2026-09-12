import { crop, features, trackById, type Card } from "./music-catalog";

export const localizedPicks: Card[] = [
  ["乐享悠闲", "category:Chill"], ["音乐新发现", "new"], ["Billie Eilish与类似艺人", "artist:Billie Eilish"], ["Alex的电台", "station:1"],
].map(([title,destination],index) => ({ id:`zh-pick-${index}`,title:title!,destination:destination!,art:crop("468b0465",286+index*284,135,264,353) }));
export const localizedRecents: Card[] = [
  ["爱情", "徜徉于浪漫旋律，营造理想心境。", "category:Love"],
  ["Apple Music Hits", "直播电台节目。", "station:1"],
  ["Live at Apple Music Radio", "Joseph Lawrence", "radio"],
  ["Takeover: Parris Goebel (DJ Mix)", "Parris Goebel", "radio"],
  ["流行乐电台", "Apple Music 电台", "station:6"],
].map(([title,subtitle,destination],index) => ({ id:`zh-recent-${index}`,title:title!,subtitle,destination:destination!,art:crop("468b0465",286+index*227,571,208,208) }));
export const localizedFeatures: Card[] = [
  { id:"global-hits",kicker:"歌单已更新",title:"全球热歌",subtitle:"Apple Music 热门",destination:"chart",art:crop("be864051",286,167,548,314) },
  { id:"june-replay",kicker:"每月音乐回忆",title:"在这里倒带 6 月时光，重温你最爱的艺人、歌曲和专辑，回顾聆听轨迹",destination:"replay",art:crop("be864051",854,167,548,314) },
  features[4]!,
];
export const localizedSongs = ["album-1","august","chart-9","album-2","chart-8","viral-10","elizabeth-taylor","chart-4","chart-11","chart-7","library-4","chart-5"].map((id,index) => ({ ...trackById(id)!, art:crop("be864051",286+Math.floor(index/4)*378.5,564+(index%4)*52.3,38,38) }));
export const finalLoginSongs = ["album-1","album-2","chart-2","chart-3","chart-4","chart-5","library-4","chart-7","chart-8","chart-9","chart-10","chart-11"].map((id,index) => ({ ...trackById(id)!, art:crop("e027fe6d",286+Math.floor(index/4)*378.5,564+(index%4)*52.3,38,38) }));
export const homeAdditions: Card[] = [
  ["you seem pretty sad for a girl so in love","Olivia Rodrigo","album"], ["ICEMAN","Drake","album:ICEMAN"],
  ["Dandelion","Ella Langley","album:Dandelion"], ["The Great Divide","Noah Kahan","album:The Great Divide"], ["Big Mama","Latto","album:Big Mama"],
].map(([title,subtitle,destination],index) => ({ id:`home-add-${index}`,title:title!,subtitle,destination:destination!,explicit:[0,1,3,4].includes(index),art:crop("42098642",286+index*227,222,208,208) }));
