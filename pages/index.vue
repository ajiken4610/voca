<template lang="pug">
div
  Head
    Title Home
  .title-wrapper
    CentorizedTitle.title Welcome to
      br
      | Yuki Voca Learn
  UiDivider
  UiTextfield(v-model="inputA")
  UiTextfield(v-model="inputB")
  div {{ result }}
</template>

<script setup lang="ts">
import { calDiffInfo } from '~~/utils/DiffUtils';

const inputA = ref("aaa")
const inputB = ref("aba")
const result = ref()
watchEffect(() => {
  result.value = calDiffInfo(inputA.value, inputB.value)
  // console.log(toRaw(result.value))
})
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
