export function randomUrls(): number {
  return 0.5 - Math.random();
}

export function randomTag(tags: number): number {
  return Math.floor(Math.random() * tags) + 1;
}
