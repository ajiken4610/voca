import type { WordData } from "./useWordList";

const ratio = 0.8;
const correct = 1;
const wrong = 2;

export const updateArgumentWordListScore = (list: WordData[]) => {
  for (const word of list) {
    word.score += Math.pow(ratio, word.correctCount);
  }
  sortArgumentWordList(list);
  const minScore = list[0].score;
  for (const word of list) {
    word.score -= minScore;
  }
};

export const sortArgumentWordList = (list: WordData[]) => {
  for (var i = 0; i < list.length; i++) {
    const ri = Math.floor(Math.random() * list.length);
    [list[i], list[ri]] = [list[ri], list[i]];
  }
  list.sort((a, b) => a.score - b.score);
};

export const updateCorrectCount = (
  list: WordData[],
  index: number,
  isCorrect: boolean
) => {
  const current = list[index];
  if (isCorrect) {
    current.correctCount + correct;
  } else {
    current.correctCount = Math.min(current.correctCount - wrong, 0);
  }
};
