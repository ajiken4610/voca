<template lang="pug">
div
    Head
        Title Home
    .title-wrapper
        CentorizedTitle.title Welcome to YukiVocaLearn
    UiDivider
    button(@click="add") add
</template>

<script setup lang="ts">
const add = () => {
    useWordList().push({
        key: "aa",
        value: "bb",
        score: 0,
        correctCount: 0,
        ex: "hello world",
        type: WordType.NONE,
    });
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
</style>