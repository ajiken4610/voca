<template lang="pug">
div
  Head
    Title Home
  .title-wrapper
    CentorizedTitle.title Welcome to
      br
      | Yuki Voca Learn
  UiDivider
  UiButton(@click="up") upload
</template>

<script setup lang="ts">
import uploadString from '~~/utils/uploadString';
const path = computed(() => "word/" + (useIsAuthReady() && useAuth().currentUser?.uid) + "/helloworld.json")
const up = () => {
  uploadString(path.value, exportWord())
}
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
