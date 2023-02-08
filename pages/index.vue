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
  DiffView(:src="inputA",:dst="inputB" style="font-size:2rem;")
</template>

<script setup lang="ts">
const inputA = ref("acbdeacbed")
const inputB = ref("acebdabbabed")
const result = ref<ReturnType<typeof calDiffInfo>>()
watchEffect(() => {
  result.value = calDiffInfo(inputA.value, inputB.value)
  // console.log(toRaw(result.value))
})
useFirebaseApp()
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

.add {
  background-color: rgba(0, 255, 26, 0.5);
  // border-radius: 5px;
}

.delete {
  background-color: rgba(255, 0, 128, 0.5);
  // border-radius: 5px;
}
</style>
