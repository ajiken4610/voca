const exExp = /\[[^\]]*\]/g;
export const getExample = (template: string, word: string) => {
  return template.replaceAll(
    exExp,
    (match) => match.split("|")[1]?.replace("]", "") || "-"
  );
};
const ansExp = /(?<=\[)[^\]]*(?=\])/g;
export const getExAnswer = (template: string, word: string) => {
  return template.replaceAll(ansExp, (match) => match.split("|")[0] || word);
};
// console.log(getExample("[Hello] is []."));
// console.log(getExAnswer("[Hello] is [].", "hello"));
