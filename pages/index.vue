<template lang="pug">
div
  WordList
  button(@click="add") add
</template>

<script setup lang="ts">
const add = () => {
  useWordList().push({
    key: "aa",
    value: "bb",
    score: 0,
    correctCount: 0,
    ex: "hello world",
    type: WordType.NONE,
  });
};
</script>
