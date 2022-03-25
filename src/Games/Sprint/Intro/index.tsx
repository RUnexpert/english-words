import React from 'react';
import { GameIntro } from '../../GameIntro';

export const Intro = () => {
  return (
    <GameIntro title="Спринт" gameName="sprint">
      «Спринт» - это тренировка для повторения заученных слов из вашего словаря.
      <br />
      Используйте мышь, чтобы выбрать. Используйте клавиши влево или вправо
    </GameIntro>
  );
};
