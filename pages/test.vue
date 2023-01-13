<template lang="pug">
div
    template(v-if="list.length")
    template(v-else)
        .title-wrapper
            CentorizedTitle.title No item in word list.
        UiDivider
</template>

<script setup lang="ts">
const list = useWordList()
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