import React, { useCallback } from "react";
import { Word } from "../../../types";
import { Box, Typography } from "@mui/material";
import { SoundIcon } from "../../../components/SoundIcon";
import { SERVER_URL } from "../../../api/base";

interface Props {
  word: Word;
}

export const WordCard: React.FC<Props> = ({ word }) => {
  const playAudio = useCallback(() => {
    const audio = new Audio(`${SERVER_URL}/${word.audio}`);
    audio.play();
  }, [word.audio]);
  return (
    <Box mt={2}>
      <SoundIcon onClick={playAudio} />
      <Typography variant='body1' align='left' fontWeight={700}>
        {word.word} - {word.wordTranslate}
      </Typography>
    </Box>
  );
};
