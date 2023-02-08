<template lang="pug">
div
  Head
    Title Home
  .title-wrapper
    CentorizedTitle.title Welcome to
      br
      | Yuki Voca Learn
  UiDivider
  UiButton(@click="ex") export
  UiTextfield(v-model="importData")
  UiButton(@click="im") import
  div {{validation}}
</template>

<script setup lang="ts">
const ex = () => {
  console.log(exportWord())
}
const im = () => {
  console.log(importWord(importData.value))
}
const importData = ref("")
const validation = computed(() => isImportableWord(importData.value))
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
