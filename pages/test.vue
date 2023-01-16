<template lang="pug">
div
  template(v-if="word")
    | {{ word }}
    CentorizedTitle {{ word.key }}
    .centorize
      | {{ word.ex }}
      UiTextfield(v-model="answer", @enter="confirmAnswer") Value
      UiTextfieldHelper(v-if="settings.showHint && !word.hideHint", visible) {{ getHint(word.value) }}
      .mlauto
        UiButton(@click="confirmAnswer", raised) Confirm
  template(v-else)
    .title-wrapper
      CentorizedTitle.title No item in word list.
    UiDivider
</template>

<script setup lang="ts">
import getHint from "@/utils/getHint";
const list = useWordList();
const word = computed(() =>
  list.value.length ? list.value[list.value.length - 1] : null
);
const settings = useSettings();
const answer = ref("");
const confirmAnswer = () => {
  console.log(
    calculateDistanceBetweenSentence(answer.value, word.value?.value || "")
  );
};
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

.centorize {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

.mlauto {
  margin-left: auto;
}
</style>
