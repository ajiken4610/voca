export default () => {
  useRouter().replace({ path: "/404", query: { path: useRoute().fullPath } });
};
