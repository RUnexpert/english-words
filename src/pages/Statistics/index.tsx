import { useResults } from "../../hooks/useResults";
import { useMemo } from "react";
import { WordCard } from "./WordCard";
import { Word } from "../../types";

export const Statistics = () => {
  const { getResults } = useResults();
  const results = useMemo(() => getResults(), [getResults]);

  return (
    <>
      <div>
        {results.known.map((item: Word) => (
          <WordCard word={item}></WordCard>
        ))}
      </div>
      <hr style={{
        border: "1px solid black",
      width: "100%"}} />
      <div>
        {results.unknown.map((item: Word) => (
          <WordCard word={item}></WordCard>
        ))}
      </div>
      ;
    </>
  );
};
