<template lang="pug">
div 
  |
  |
  |
  Head
    Title Add
  CentorizedTitle Add word
  WordEditor(v-model="data")
  UiButton.center(raised, @click="addWord") Add
</template>

<script setup lang="ts">
import type { WordData } from "~~/composables/useWordList";

const data = ref<WordData>({
  key: "",
  value: "",
  ex: "",
  score: 0,
  correctCount: 0,
  type: WordType.NONE,
  hideHint: false,
});

const addWord = () => {
  if (!data.value.key || !data.value.value) {
    showToast("Key and Value is required.");
  } else {
    useWordList().value.push(data.value);
    showToast("Added " + data.value.key);
    data.value = {
      key: "",
      value: "",
      ex: "",
      score: 0,
      correctCount: 0,
      type: WordType.NONE,
      hideHint: false,
    };
  }
};
</script>

<style scoped lang="scss">
.center {
  margin: auto;
  display: block;
}
</style>
