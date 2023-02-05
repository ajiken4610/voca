<template lang="pug">
div
  Head
    Title Home
  .title-wrapper
    CentorizedTitle.title Welcome to
      br
      | Yuki Voca Learn
  UiDivider
</template>

<script setup lang="ts">

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
