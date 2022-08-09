import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { Word } from "../../types";
import { ResultGroup } from "./ResultGroup";
import css from "./styles.module.css";
interface Props {
  known: Word[];
  unknown: Word[];
}

export const Result: React.FC<Props> = ({ known, unknown }) => {
  const navigate = useNavigate();
  const toPlay = useCallback(() => navigate(`/`), [navigate]);
  return (
    <div className={css.results}>
      <ResultGroup title='Знаю' words={known} color='#16bb24' />
      <ResultGroup title='Не знаю' words={unknown} color='#e53434' />
      <Button onClick={toPlay}>Играть еще раз</Button>
    </div>
  );
};
