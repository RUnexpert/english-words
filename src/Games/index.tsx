import React from 'react';
import css from './styles.css';
import { useNavigate } from 'react-router';

export const Games = () => {
  const navigate = useNavigate();
  const openGame = (gameName: string) => () => {
    navigate(gameName);
  };
  return (
    <div className={`${css.gameWrapper}`}>
      <div className={`${css.gameMenu}`}>
        <div
          className={`${css.game} ${css.sprint}`}
          onClick={openGame('/games/sprint')}
        >
          Sprint
        </div>
        <div
          className={`${css.game} ${css.audiocall}`}
          onClick={openGame('/games/audiocall')}
        >
          Audicall
        </div>
      </div>
    </div>
  );
};
