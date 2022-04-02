import { baseFetch } from "./base";
import { Word } from "../types";

export const getWords = async (group: number): Promise<Word[]> => {
  const words: Word[] = [];
  for (let i = 0; i < 3; i++) {
    words.push(...(await baseFetch(`/words?group=${group}&page=${i}`)));
  }

  return words;
};
