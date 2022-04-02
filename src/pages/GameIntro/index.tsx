import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import css from './styles.module.css';
import { LEVELS } from '../../constants';

export const GameIntro: React.FC = () => {
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();

  const handleChange = useCallback(
    () => (event: SelectChangeEvent<number>) => {
      setLevel(+event.target.value);
    },
    [setLevel],
  );

  const startGame = useCallback(() => navigate(`/play/?level=${level}`), [level, navigate]);

  return (
    <div className={css.intro}>
      <div className={css.introContainer}>
        <h1 className={css.title}>Спринт</h1>
        <h3 className={css.text}>
          «Спринт» - это тренировка для повторения заученных слов из вашего словаря.
          <br />
          Используйте мышь, чтобы выбрать. Используйте клавиши влево или вправо
        </h3>
        <FormControl fullWidth className={css.select}>
          <InputLabel id="select-label">Level</InputLabel>
          <Select<number> labelId="select-label" label="level" onChange={handleChange}>
            {LEVELS.map((value, index) => (
              <MenuItem value={index}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button className={css.button} onClick={startGame}>
          Начать
        </Button>
      </div>
    </div>
  );
};
