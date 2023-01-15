<template lang="pug">
div
  template(v-if="word")
    | {{ word }}
  template(v-else)
    .title-wrapper
      CentorizedTitle.title No item in word list.
    UiDivider
</template>

<script setup lang="ts">
const list = useWordList();
const word = computed(() => (list.value.length ? list.value[list.value.length - 1] : null));
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
