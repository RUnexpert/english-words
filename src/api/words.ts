import { baseFetch } from './base';
import { Word } from '../types';

export const getWords = async (group: number): Promise<Word[]> => {
  const words: Word[] = [];
  for (let i = 0; i < 3; i++) {
    words.push(
      ...(await baseFetch(`/words?group=${group}&page=${i}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }))
    );
  }

  return words;
};

export const putLearnedWords = async (learnedWords: Word[]): Promise<void> => {
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  baseFetch(`/users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      learnedWords: learnedWords.length,
      optional: {
        learnedWords: learnedWords.map((item) => item.word).join(','),
      },
    }),
  });
};
