import { useState } from "react";
import { Word } from "../../types";
import correctAudio from "../correct.mp3";
import wrongAudio from "../wrong.mp3";

export const useGame = () => {
  const [results, setResults] = useState<{ known: Word[]; unknown: Word[] }>({
    known: [],
    unknown: [],
  });
const correct = new Audio(correctAudio);
const wrong = new Audio(wrongAudio);
  return {
    results,
    setResult: (word: Word, isRight: boolean) => {
      isRight ? results.known.push(word) : results.unknown.push(word);
      setResults({ ...results });
    },
    setSound(isPlay: boolean) => {
      isPlay
    }
  };
};
