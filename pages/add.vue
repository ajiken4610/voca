<template lang="pug">
div 
    Head
        Title Add
    WordEditor(v-model="data")
</template>

<script setup lang="ts">
import type { WordData } from '~~/composables/useWordList';

const data: WordData = reactive({
    key: '',
    value: '',
    ex: '',
    score: 0,
    correctCount: 0,
    type: WordType.NONE
})
</script>