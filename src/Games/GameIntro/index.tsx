import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import css from './styles.module.css';

interface Props {
  title: string;
  background: string;
  gameName: string;
}

export const GameIntro: React.FC<Props> = ({
  title,
  children,
  background,
  gameName,
}) => {
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent<number>) => {
    setLevel(+event.target.value);
  };

  const startGame = () => {
    navigate(`/games/${gameName}/start?level=${level}`);
  };

  return (
    <div className={css.intro}>
      <div className={css.introContainer}>
        <h1 className={css.title}>{title}</h1>
        <h3 className={css.text}>{children}</h3>
        <FormControl fullWidth className={css.select}>
          <InputLabel id="demo-simple-select-label">Level</InputLabel>
          <Select<number>
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="level"
            onChange={handleChange}
          >
            <MenuItem value={0}>A1</MenuItem>
            <MenuItem value={1}>A2</MenuItem>
            <MenuItem value={2}>B1</MenuItem>
            <MenuItem value={3}>B2</MenuItem>
            <MenuItem value={4}>C1</MenuItem>
            <MenuItem value={5}>C2</MenuItem>
          </Select>
        </FormControl>
        <Button className={css.button} onClick={startGame}>
          Начать
        </Button>
      </div>
    </div>
  );
};
