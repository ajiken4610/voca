const exExp = /\[[^\]]*\]/g;
export const getExample = (template: string) => {
  return template.replaceAll(exExp, () => "-");
};
const ansExp = /(?<=\[)[^\]]*(?=\])/g;
export const getExAnswer = (template: string, word: string) => {
  return template.replaceAll(ansExp, (match) => match || word);
};
// console.log(getExample("[Hello] is []."));
// console.log(getExAnswer("[Hello] is [].", "hello"));
