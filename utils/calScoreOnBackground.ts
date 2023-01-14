import CalScoreWorker from "utils/workers/calScore?worker";
import type { WordData } from "~~/composables/useWordList";

export default () => {
  return new Promise((resolve) => {
    const worker = new CalScoreWorker();
    worker.addEventListener("message", (e) => {
      const data = e.data as WordData[];
      worker.terminate();
      resolve(data);
    });
    worker.postMessage(useWordList().value);
  });
};
