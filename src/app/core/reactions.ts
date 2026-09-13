export const SILLY_REACTION_MS = 2000;

export const sillyMessages = [
  'Nice try, explorer!',
  'Roar harder next time!',
  'That dino is hiding somewhere else!',
  'Stomp stomp — not that one!',
  'Fossil fumble! Pick again!',
  'The museum gift shop says nope!',
  'Almost… but not quite!',
  'Wrong dino den!',
];

export const sillyFaces = ['🤪', '🦴', '🐊', '🌋', '🥚', '🦤', '🪨', '🌿'];

export const yayMessages = [
  'Roarsome!',
  'Dino-mite!',
  'You got it!',
  'Super star!',
  'Fossil finder!',
  'Jurassic genius!',
];

export function pick<T>(items: readonly T[]): T {
  const item = items[Math.floor(Math.random() * items.length)];
  if (item === undefined) {
    throw new Error('Cannot pick from an empty list');
  }
  return item;
}
