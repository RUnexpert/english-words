import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, CircularProgress, Typography, LinearProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { getWords } from "../../api/words";
import { Word } from "../../types";
import css from "./styles.module.css";
import { Result } from "../../components/Result";
import { GameTimer } from "../../components/GameTimer";
import { Background } from "../../components/Background";
import { COMPLETE_WORDS } from "../../constants";
import { KeyboardHandler } from "./KeyboardHandler";
import { shuffleArray, getRandomNumber } from "../../utils";
import { useGame } from "./useGame";
import { useResults } from "../../hooks/useResults";

export const Sprint: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [words, setWords] = useState<Word[]>([]);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const { results, setResult, setSound } = useGame();
  const [searchParams] = useSearchParams();
  const { saveResults } = useResults();

  const onEndGame = () => {
    setGameFinished(true);
    saveResults(results);
  };

  const currentWord = useMemo(() => {
    if (!words.length || !words[wordIndex]) return "";
    const coin = getRandomNumber(2);

    if (coin === 0) {
      return words[wordIndex].wordTranslate;
    }
    const randomIndex = getRandomNumber(words.length);
    return words[randomIndex].wordTranslate;
  }, [wordIndex, words]);

  const checkAnswer = useCallback(
    (answer: boolean) => {
      const isRight = (words[wordIndex].wordTranslate === currentWord) === answer;
      if (isRight) {
        setScore((score) => score + 20);
      }
      setSound(isRight);
      setResult(words[wordIndex], isRight);
      if (wordIndex + 1 >= COMPLETE_WORDS) {
        onEndGame();
      } else {
        setWordIndex((currentWordIndex) => currentWordIndex + 1);
      }
    },
    [currentWord, setResult, wordIndex, words, setSound]
  );

  const onRightClick = useCallback(() => {
    checkAnswer(true);
  }, [checkAnswer]);

  const onWrongClick = useCallback(() => {
    checkAnswer(false);
  }, [checkAnswer]);

  useEffect(() => {
    getWords(+(searchParams?.get("level") || 0)).then((data) => {
      setWords(shuffleArray(data).slice(0, 20));
    });
  }, [searchParams]);

  return (
    <div className={css.area}>
      <Background />
      {words.length ? (
        <div className={css.container}>
          {!gameFinished ? (
            <>
              <KeyboardHandler onRightClick={onRightClick} onWrongClick={onWrongClick} />
              <LinearProgress
                variant='determinate'
                value={(wordIndex / COMPLETE_WORDS) * 100}
              />
              <div className={css.score}>
                <Typography variant='h3'>
                  Очки:
                  {score}
                </Typography>
              </div>
              <GameTimer onEndGame={onEndGame}></GameTimer>
              <Typography variant='h1'>{words[wordIndex].word}</Typography>
              <Typography variant='h2' mb={12}>
                {currentWord}
              </Typography>
              <div>
                <Button className={css.btn} onClick={onRightClick}>
                  Верно
                </Button>
                <Button className={css.btn} onClick={onWrongClick}>
                  Неверно
                </Button>
              </div>
            </>
          ) : (
            <Result {...results} />
          )}
        </div>
      ) : (
        <CircularProgress color='warning' />
      )}
    </div>
  );
};
