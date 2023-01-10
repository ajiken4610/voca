const list = JSON.parse(localStorage.getItem("words") || "[]");
watchEffect(() => {
  localStorage.setItem("words", JSON.stringify(list));
});

export default () => {};
