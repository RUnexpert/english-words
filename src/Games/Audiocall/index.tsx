import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { getWords, putLearnedWords } from '../../api/words';
import { Word } from '../../types';
import { Result } from '../Result';
import correctAudio from '../correct.mp3';
import wrongAudio from '../wrong.mp3';
import css from './styles.module.css';

// const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

const correct = new Audio(correctAudio);
const wrong = new Audio(wrongAudio);

interface Props {
  selectedWords: Word[];
}

export const Audiocall: React.FC<Props> = ({ selectedWords }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const eventKeyboardListenerId = useRef<
    ((event: KeyboardEvent) => void) | null
  >(null);
  const [words, setWords] = useState<Word[]>(selectedWords || []);
  const [results, setResults] = useState<{ known: Word[]; unknown: Word[] }>({
    known: [],
    unknown: [],
  });
  const [isFinish, setIsFinish] = useState(false);

  const [searchParams] = useSearchParams();

  const shuffleArray = (array: Word[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  useEffect(() => {
    if (wordIndex > 20) {
      putLearnedWords(results.known);
      setIsFinish(true);
    }
  }, [wordIndex]);
  const song = new Audio(
    `https://aelx-rmoan-unexpert-rs-lang.herokuapp.com/${words[wordIndex]?.audio}`
  );
  song?.play();
  const answers = useMemo(() => {
    if (!words.length || !words[wordIndex]) return [];
    const randomAnswers = shuffleArray(words).slice(0, 4);

    return shuffleArray(randomAnswers.concat(words[wordIndex]));
  }, [wordIndex, words]);

  const checkAnswer = (rightWord: string) => {
    wrong.pause();
    correct.pause();
    song.src = `https://aelx-rmoan-unexpert-rs-lang.herokuapp.com/${words[wordIndex].audio}`;

    if (words[wordIndex].wordTranslate === rightWord.slice(2)) {
      results.known.push(words[wordIndex]);
      correct.play();
    } else {
      results.unknown.push(words[wordIndex]);
      wrong.play();
    }
    setResults({ ...results });
  };

  const onRightClick = (event: React.MouseEvent<HTMLElement>) => {
    checkAnswer(event.currentTarget.textContent || '');
    setWordIndex(wordIndex + 1);
  };

  useEffect(() => {
    if (words.length) return;
    getWords(+(searchParams?.get('level') || 0)).then((data) => {
      setWords(shuffleArray(data));
    });
  }, []);

  useEffect(() => {
    if (eventKeyboardListenerId.current !== null) {
      window.removeEventListener('keydown', eventKeyboardListenerId.current);
    }
    if (isFinish) return;

    eventKeyboardListenerId.current = (event: KeyboardEvent) => {
      if (event.code.startsWith('Digit')) {
        const index = +event.code.replace('Digit', '');
        checkAnswer(answers[index - 1].wordTranslate || '');
        setWordIndex(wordIndex + 1);
      }
    };
    window.addEventListener('keydown', eventKeyboardListenerId.current);
    return () => {
      if (eventKeyboardListenerId.current !== null) {
        window.removeEventListener('keydown', eventKeyboardListenerId.current);
      }
    };
  }, [setWordIndex, answers, words, checkAnswer]);

  const play = () => {
    song.play();
  };

  return (
    <div className={css.area}>
      <ul className={css.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      {words.length &&
        (!isFinish ? (
          <div className={css.answers}>
            <div>
              <div>
                <Button onClick={play}>Проиграть звук</Button>
              </div>
              {answers.map((item, key) => (
                <Button className={css.button} onClick={onRightClick} key={key}>
                  {key + 1} {item.wordTranslate}
                </Button>
              ))}
            </div>
            <div>
              <Button className={''} onClick={onRightClick}>
                Не знаю
              </Button>
            </div>
          </div>
        ) : (
          <Result gameName={'audiocall'} {...results} />
        ))}
    </div>
  );
};
