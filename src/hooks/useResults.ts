import { type } from "os";
import { Results, Word } from "../types";
const STORAGE_KEY = "results";
type WordById = Record<string, Word>;
type ResultsById = {
  unknown: WordById;
  known: WordById;
};

export const useResults = () => {
  const getResults = (): ResultsById => {
    const resultsString = localStorage.getItem(STORAGE_KEY);
    return resultsString
      ? JSON.parse(resultsString)
      : {
          unknown: {},
          known: {},
        };
  };
  const mergeResults = (words: Word[], oldWords: WordById) => {
    const wordById = words.reduce((acc: WordById, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

    return { ...oldWords, ...wordById };
  };
  return {
    saveResults: (results: Results) => {
      const oldResults = getResults();
      const newResults = {
        unknown: mergeResults(results.unknown, oldResults.unknown),
        known: mergeResults(results.known, oldResults.known),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newResults));
    },
    getResults: () => {
      const results = getResults();
      return {
        unknown: Object.values(results.unknown),
        known: Object.values(results.known),
      };
    },
  };
};
