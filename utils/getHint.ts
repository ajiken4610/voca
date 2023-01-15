export default (text: string) => {
  return text.replaceAll(/(?<=[^ ])[^ ]|[^ ](?=[^ ]? )/g, "*");
};
