<template lang="pug">
div
  Head
    Title Home
  .title-wrapper
    CentorizedTitle.title Welcome to
      br
      | Yuki Voca Learn
  UiDivider
  UiButton(raised @click="add") add
  UiButton(raised @click="update") Update
  UiTextfield(v-model="textA") A
  UiTextfield(v-model="textB") B
  //- UiButton(raised @click="calcDistance") calc
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
const genRandomString = (length: number) => {
  const ret: string[] = []
  for (var i = 0; i < length; i++) {
    ret.push(Math.random().toString(36).substring(2))
  }
  return ret.join("")
}
const textA = ref(genRandomString(40));
const textB = ref(genRandomString(40));
const distance = computed(() => calNgramDistance(textA.value, textB.value))
const update = async () => {
  console.log(useWordList().value = (await updateScoreOnBackground())[0])
}
// watchEffect(() => {
//   distance.value = calculateDistanceBetweenSentence(textA.value, textB.value)
// })
// const calcDistance = () => {
//   console.log(textA.value.length, textB.value.length)

//   const start = performance.now()
//   distance.value = calculateDistanceBetweenSentence(textA.value, textB.value)
//   const end = performance.now()
//   // console.log(useCDBSMemoForDebug().memoIndex.length)
//   console.log(end - start)
// }
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
