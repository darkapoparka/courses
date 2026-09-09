/** Visible lyric lines transcribed from the owner's frozen player references.
 * These are reference UI content, not a lyric-provider or streaming integration.
 * Only recorded anchors have timing; intervening lines remain scrollable text. */
export const capturedLyrics = [
  "new york city's never looked so blue",
  "my friends are smoking blunts in the bathroom",
  "they say that honest love is a cage that makes you feel free",
  "and all the girls at this party are cool",
  "that's never been the thing that i could do",
  "but i can't help but imagine",
  "what you say when you speak with me",
  "you're a spark in the dark, and my clothes all caught aflame",
  "you should feel how i feel when somebody says your name",
  "and i'm speeding down the road without a brake",
  "and i want you more than any stupid song could ever say",
  "i'm a heart made of wax, and i'm melting in the sun",
  "i'm a thread on your shirt and it's coming undone",
  "i feel right, i feel wrong, i feel totally insane",
  "and i want you more than any stupid song could ever say",
  "walking through the park with my head high",
  "past all the college girls and the drunk guys",
  "and if there is a god, he's the bond that's between us two",
  "seven nights alone and a skipped meal",
  "i'm sleeping in my dress and my high heels",
  "and i'm too shy to say what i see when i dream of you",
  "you're a spark in the dark, and my clothes all caught aflame",
  "you should feel how i feel when somebody says your name",
  "and i'm speeding down the road without a brake",
  "and i want you more than any stupid song could ever say",
  "i'm a heart made of wax, and i'm melting in the sun",
  "i'm a thread on your shirt and it's coming undone",
  "i feel right, i feel wrong, i feel totally insane",
  "and i want you more than any stupid song could ever say",
  "… and truly sure",
  "nobody's wanted somebody more",
  "and it's a thing that i can't ignore",
  "tell your friends that you're mine, i'm yours",
  "with a hand on my heart, i swore",
  "i'm going crazy, i'm going mad",
  "i want you, baby, so bad",
  "you're a spark in the dark, and my clothes all caught aflame",
  "you should feel how i feel when somebody says your name",
] as const;
export const lyricAnchors = [
  { time: 11, index: 0 }, { time: 19, index: 2 }, { time: 54, index: 11 },
  { time: 73, index: 15 }, { time: 81, index: 17 }, { time: 101, index: 20 },
  { time: 110, index: 23 }, { time: 141, index: 29 }, { time: 151, index: 31 },
  { time: 167, index: 34 },
];
export function lyricAt(time: number) {
  return [...lyricAnchors].reverse().find(anchor => anchor.time <= time)?.index ?? 0;
}
