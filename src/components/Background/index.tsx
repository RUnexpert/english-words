import React from 'react';
import css from './styles.module.css';

export const Background = () => (
  <ul className={css.circles}>
    {new Array(10).fill('').map(() => (
      <li />
    ))}
  </ul>
);
