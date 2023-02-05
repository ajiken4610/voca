import type { WordData } from "~~/composables/useWordList";
import { updateArgumentWordListScore } from "~~/composables/wordList";

addEventListener("message", (ev) => {
  const wordList = ev.data as WordData[];
  const ret = updateArgumentWordListScore(wordList);
  postMessage([wordList, ret]);
});
