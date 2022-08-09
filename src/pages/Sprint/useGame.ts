import { useState } from "react";
import { Word } from "../../types";
import correctAudio from "../correct.mp3";
import wrongAudio from "../wrong.mp3";
import { Results } from "../../types";

const correct = new Audio(correctAudio);
const wrong = new Audio(wrongAudio);

export const useGame = () => {
  const [results, setResults] = useState<Results>({
    known: [],
    unknown: [],
  });

  return {
    results,
    setResult: (word: Word, isRight: boolean) => {
      isRight ? results.known.push(word) : results.unknown.push(word);
      setResults({ ...results });
    },
    setSound: (isRight: boolean) => {
      wrong.pause();
      correct.pause();
      isRight ? correct.play() : wrong.play();
    },
  };
};
