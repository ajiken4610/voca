import CalScoreWorker from "@/utils/workers/updateScore?worker";
import type { WordData } from "~~/composables/useWordList";

export default () => {
  return new Promise<WordData[]>((resolve) => {
    const worker = new CalScoreWorker();
    worker.addEventListener("message", (e) => {
      const data = e.data as WordData[];
      worker.terminate();
      resolve(data);
    });
    worker.postMessage(toRaw(useWordList().value));
  });
};
