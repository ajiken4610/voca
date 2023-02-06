export default (text: string) => {
  const replaced = text.replaceAll(/(?<=\S)\S|\S(?=(\S?\b))/g, "*");
  return replaced.replaceAll(/(?<= |^)\*(?= |$)/g, (_match, offset) =>
    text.charAt(offset)
  );
};
