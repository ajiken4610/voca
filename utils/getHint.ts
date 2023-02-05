export default (text: string) => {
  return text.replaceAll(/(?<=\S)\S|\S(?=\S?\b)/g, "*");
};
