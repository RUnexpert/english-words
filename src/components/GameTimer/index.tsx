import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';

interface Props {
  onEndGame: () => void;
}

export const GameTimer: React.FC<Props> = ({ onEndGame }) => {
  const [time, setTime] = useState(60);
  const timeRef = useRef<number | null>(null);
  useEffect(() => {
    timeRef.current = window.setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    if (time === 1) {
      onEndGame();
    }
    return () => { timeRef.current && clearTimeout(timeRef.current) };
  }, [onEndGame, time]);

  return <Typography variant='h2'>{time}</Typography>;
};
