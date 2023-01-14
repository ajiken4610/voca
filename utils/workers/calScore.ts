import type { WordData } from "~~/composables/useWordList";
import { sortArgumentWordList } from "~~/composables/useWordList";

addEventListener("message", (ev) => {
  const wordList = ev.data as WordData[];
  sortArgumentWordList(wordList);
  postMessage(wordList);
});
