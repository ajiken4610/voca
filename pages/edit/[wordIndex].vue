<template lang="pug">
div
    Head
        Title Edit {{ word.key }}
    CentorizedTitle Edit word
    WordEditor(v-model="word")
</template>

<script setup lang="ts">
const wordIndex = parseInt(useRoute().params.wordIndex.toString());
const list = useWordList();
const word = list[wordIndex];
if (!word) {
    goTo404();
}
</script>
