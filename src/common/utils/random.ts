/**
 * @description Returns a random number between min and max
 * @return { number } A random number
 */

export function randomUrls(): number {
  return 0.5 - Math.random();
}

/**
 * @description Get a random number between two numbers
 * @param tags - The tags to filter
 * @returns { number } - A random number
 */

export function randomTag(tags: number): number {
  return Math.floor(Math.random() * tags) + 1;
}
