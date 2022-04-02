export const shuffleArray = <T extends unknown[]>(array: T) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value) as T;

export const getRandomNumber = (max: number) => Math.floor(Math.random() * max);
