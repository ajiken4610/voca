import type { WordData } from "./useWordList";

const ratio = 0.8;
const correct = 1;
const wrong = 2;

export const updateArgumentWordListScore = (list: WordData[]) => {
  for (const word of list) {
    word.score += Math.pow(ratio, word.correctCount);
    word.score > 1 && (word.score = word.score ** 0.3);
  }
  const oldLast = list[list.length - 1];
  sortArgumentWordList(list);
  const oldLastIndex = list.indexOf(oldLast);
  const minScore = list[0].score;
  for (const word of list) {
    word.score -= minScore;
  }
  return oldLastIndex;
};

export const sortArgumentWordList = (list: WordData[]) => {
  for (var i = 0; i < list.length; i++) {
    const ri = Math.floor(Math.random() * list.length);
    [list[i], list[ri]] = [list[ri], list[i]];
  }
  list.sort((a, b) => a.score - b.score);
};
export enum ProblemResult {
  CORRECT,
  PROBABLY_CORRECT,
  WRONG,
}
export const updateCorrectCount = (list: WordData[], index: number, state: ProblemResult) => {
  const current = list[index];
  if (state === ProblemResult.CORRECT) {
    current.correctCount += correct;
  } else if (state === ProblemResult.WRONG) {
    current.correctCount = Math.min(current.correctCount - wrong, 0);
  }
};
