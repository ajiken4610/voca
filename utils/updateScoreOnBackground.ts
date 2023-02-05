import CalScoreWorker from "@/utils/workers/updateScore?worker";
import type { WordData } from "~~/composables/useWordList";

export default () => {
  return new Promise<[WordData[], number]>((resolve) => {
    const worker = new CalScoreWorker();
    worker.addEventListener("message", (e) => {
      const data = e.data as [WordData[], number];
      worker.terminate();
      resolve(data);
    });
    worker.postMessage(toRaw(useWordList().value));
  });
};
