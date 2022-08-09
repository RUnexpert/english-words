import { Box, Typography } from "@mui/material";
import React from "react";
import { Word } from "../../../types";
import { WordCard } from "../WordCard";

interface Props {
  words: Word[];
  title: string;
  color: string;
}

export const ResultGroup: React.FC<Props> = ({ words, title, color }) => {
  return (
    <Box mb={5}>
      <Typography variant='h2' align='left'>
        {title}: {words.length}
      </Typography>
      {words.map((item) => (
        <WordCard word={item} color={color} key={item.id} />
      ))}
    </Box>
  );
};
