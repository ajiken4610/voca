<template lang="pug">
div
    Head
        Title Edit {{ word.key }}
    CentorizedTitle Edit word
    WordEditor(v-model="word")
    UiButton.center(raised @click="$router.back()") Save and return
</template>

<script setup lang="ts">
definePageMeta({ useBackButton: true })
const wordIndex = parseInt(useRoute().params.wordIndex.toString());
const list = useWordList();
const word = list[wordIndex];
if (!word) {
    goTo404();
}
</script>
<style scoped lang="scss">
.center {
    margin: auto;
    display: block
}
</style>