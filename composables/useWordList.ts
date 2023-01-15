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
  hideHint: boolean;
}

const list = useState<WordData[]>(() =>
  JSON.parse(localStorage.getItem("words") || "[]")
);
watchEffect(() => {
  localStorage.setItem("words", JSON.stringify(list.value));
});

export default () => list;

export const updateWordListScore = () => {
  updateArgumentWordListScore(list.value);
};

export const sortWordList = () => {
  sortArgumentWordList(list.value);
};
