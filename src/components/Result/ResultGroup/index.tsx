import { Box, Typography } from '@mui/material';
import React from 'react';
import { Word } from '../../../types';

interface Props {
  words: Word[];
  title: string;
  color: string;
}

export const ResultGroup: React.FC<Props> = ({ words, title, color }) => (
  <Box mb={5}>
    <Typography variant="h2" align="left">
      {title}: {words.length}
    </Typography>
    {words.map((item) => (
      <Typography variant="body1" key={item.id} align="left" color={color} fontWeight={700}>
        {item.word} - {item.wordTranslate}
      </Typography>
    ))}
  </Box>
);
