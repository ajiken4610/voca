<template lang="pug">
div
  template(v-if="word")
    //- | {{ list }}
    Title Testing {{ word.key }}
    CentorizedTitle {{ word.key }}
    .centorize
      | {{ confirmable ? getExample(word.ex, word.value) : getExAnswer(word.ex, word.value) }}
      div(ref="textfield")
        UiTextfield.w-100(
          v-model="answer",
          :disabled="!confirmable"
        ) Value
      UiTextfieldHelper(v-if="settings.showHint && !word.hideHint", visible) {{ getHint(word.value) }}
      h4(v-if="!confirmable")
        template(v-if="result===ProblemResult.CORRECT") Correct!
        template(v-else-if="result===ProblemResult.PROBABLY_CORRECT") Probably correct.
        template(v-else) Wrong...
      DiffView(v-if="!confirmable&&result!==ProblemResult.CORRECT" :src="answer" :dst="word.value")
      .mlauto
        //- UiButton(@click="confirmAnswer" :disabled="result===JudgeResult.CALCULATING", raised) {{nextButtonText}}
        UiButton(raised, :disabled="calculating", @click="onButtonClick")
          template(v-if="confirmable") Confirm
          template(v-else-if="calculating") Calculating
          template(v-else) Next
  template(v-else)
    Title Test
    .title-wrapper
      CentorizedTitle.title No item in word list.
    UiDivider
</template>

<script setup lang="ts">
import { getExample, getExAnswer } from "~~/utils/getExample";
import getHint from "~~/utils/getHint";
const list = useWordList();
const word = computed(() =>
  list.value.length ? list.value[list.value.length - 1] : null
);
const settings = useSettings();
const answer = ref("");
const confirmable = ref(true);
const calculating = ref(false);
const textfield = ref<HTMLDivElement>()
let inputElement: HTMLInputElement
onMounted(() => {
  inputElement = textfield.value?.querySelector("input.mdc-text-field__input") as HTMLInputElement
  inputElement.focus()
})
const onButtonClick = () => {
  if (confirmable.value) {
    confirmAnswer();
  } else if (!calculating.value) {
    goNext();
  }
};
const onKeyUpListener = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    onButtonClick()
  }
}
window.addEventListener("keyup", onKeyUpListener)
onUnmounted(() => {
  window.removeEventListener("keyup", onKeyUpListener)
})
const result = ref(ProblemResult.CORRECT);
const confirmAnswer = () => {
  confirmable.value = false;
  const distance = calNgramDistance(answer.value, word.value?.value || "");
  if (distance > 0.9999) {
    // ??????
    result.value = ProblemResult.CORRECT;
    // console.log("correct");
  } else if (distance > 0.9) {
    // ?????????
    result.value = ProblemResult.PROBABLY_CORRECT;
    // console.log("pro correct");
  } else {
    // ?????????
    result.value = ProblemResult.WRONG;
    // console.log("wr");
  }
};
const goNext = async () => {
  calculating.value = true;
  const next = await updatingPromise;
  const nextList = next[0];
  const lastIndex = next[1];
  updateCorrectCount(nextList, lastIndex, result.value);
  list.value = nextList;
  updatingPromise = updateScoreOnBackground();
  answer.value = "";
  calculating.value = false;
  confirmable.value = true;
  nextTick(() => { inputElement.focus() })
};

let updatingPromise = updateScoreOnBackground();
// console.log(calculateDistanceBetweenSentence("abcd", "abce"))
// console.time("calDistInfo")
// console.log(calStringDistInfos("hello", "world"))
// console.timeEnd("calDistInfo")
// enum JudgeResult {
//   CORRECT,
//   PROBABLY_CORRECT,
//   WRONG,
//   ANSWERING,
//   CALCULATING
// }
// const result = ref(JudgeResult.ANSWERING)
// const confirmAnswer = () => {
//   const distance = calNgramDistance(answer.value, word.value?.value || "")
//   if (result.value !== JudgeResult.ANSWERING) {
//     nextProblem()
//   }
//   if (distance > .9999) {
//     // ??????
//     result.value = JudgeResult.CORRECT
//     updateCorrectCount(list.value, list.value.length - 1, CorrectState.CORRECT)
//   } else if (distance > .9) {
//     // ?????????
//     result.value = JudgeResult.PROBABLY_CORRECT
//     updateCorrectCount(list.value, list.value.length - 1, CorrectState.PROBABLY_CORRECT)
//   } else {
//     // ?????????
//     result.value = JudgeResult.WRONG
//     updateCorrectCount(list.value, list.value.length - 1, CorrectState.WRONG)
//   }
// };
// const nextProblem = () => {
//   result.value = JudgeResult.ANSWERING
// }
// const nextButtonText = computed(() => ["Next", "Next", "Next", "Confirm", "Calculating..."][result.value])

// console.log(getHint("hello , this is in the book of the of !"))
</script>

<style scoped lang="scss">
.w-100 {
  width: 100%;
}

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
