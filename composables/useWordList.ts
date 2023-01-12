export enum WordType {
  /**
   * なし
   */
  NONE,
  /**
   * 名詞
   */
  NOUN,
  /**
   * 代名詞
   */
  PRONOUN,
  /**
   * 動詞
   */
  VERB,
  /**
   * 形容詞
   */
  ADJECTIVE,
  /**
   * 福祉
   */
  ADVERB,
  /**
   * 助動詞
   */
  AUXILIARY_VERB,
  /**
   * 前置詞
   */
  PREPOSITION,
  /**
   * 冠詞
   */
  ARTICLE,
  /**
   * 接続詞
   */
  CONJUNCTION,
  /**
   * 間投詞
   */
  INTERJECTION,
}

export interface WordData {
  key: string;
  value: string;
  ex: string;
  score: number;
  correctCount: number;
  type: WordType;
}

const ratio = 0.8;
const correct = 1;
const wrong = 2;

const list = reactive(
  JSON.parse(localStorage.getItem("words") || "[]") as WordData[]
);
watchEffect(() => {
  localStorage.setItem("words", JSON.stringify(list));
});

export default () => list;

export const updateWordListScore = () => {
  for (const word of list) {
    word.score += Math.pow(ratio, word.correctCount);
  }
  sortWordList();
  const minScore = list[0].score;
  for (const word of list) {
    word.score -= minScore;
  }
};

export const sortWordList = () => {
  for (var i = 0; i < list.length; i++) {
    const ri = Math.floor(Math.random() * list.length);
    [list[i], list[ri]] = [list[ri], list[i]];
  }
  list.sort((a, b) => a.score - b.score);
};

export const updateCorrectCount = (index: number, isCorrect: boolean) => {
  const current = list[index];
  if (isCorrect) {
    current.correctCount + correct;
  } else {
    current.correctCount = Math.min(current.correctCount - wrong, 0);
  }
};
