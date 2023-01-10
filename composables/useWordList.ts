enum WordType {
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

interface WordData {
  key: string;
  value: string;
  ex: string;
  score: number;
  correctCount: number;
  type: WordType;
}

const list = JSON.parse(localStorage.getItem("words") || "[]") as WordData[];
watchEffect(() => {
  localStorage.setItem("words", JSON.stringify(list));
});

export default () => list;

export const updateWordListScore = () => {
  for (const word of list) {
    word.score += Math.pow(0.8, word.correctCount);
  }
};

export const sortWordList = () => {
  list.sort((a, b) => a.score - b.score);
};
