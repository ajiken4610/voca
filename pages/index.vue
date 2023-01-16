<template lang="pug">
div
  Head
    Title Home
  .title-wrapper
    CentorizedTitle.title Welcome to
      br
      | Yuki Voca Learn
  UiDivider
  button(@click="add") add
  UiTextfield(v-model="textA") A
  UiTextfield(v-model="textB") B
  div {{ distance }}
</template>

<script setup lang="ts">
const add = () => {
  useWordList().value.push({
    key: "aa",
    value: "bb",
    score: 0,
    correctCount: 0,
    ex: "hello world",
    type: WordType.NONE,
    hideHint: false,
  });
};
const textA = ref("");
const textB = ref("");
const distance = computed(() => calNgramDistance(textA.value, textB.value));
</script>

<style scoped lang="scss">
.title {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
}

.title-wrapper {
  height: 33vh;
  position: relative;
}
</style>
