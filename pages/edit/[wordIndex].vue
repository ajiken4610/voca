<template lang="pug">
div {{ wordIndex }}
</template>

<script setup lang="ts">
const wordIndex = parseInt(useRoute().params.wordIndex.toString())
const list = useWordList()
const word = list[wordIndex]
if (!word) {
    goTo404()
}
</script>