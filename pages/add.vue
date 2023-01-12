<template lang="pug">
div 
    Head
        Title Add
    CentorizedTitle Add word
    WordEditor(v-model="data")
    UiButton.center(raised @click="addWord") Add
</template>

<script setup lang="ts">
import type { WordData } from '~~/composables/useWordList';
import { useToast } from 'balm-ui';

const data = ref<WordData>({
    key: '',
    value: '',
    ex: '',
    score: 0,
    correctCount: 0,
    type: WordType.NONE
})

const addWord = () => {
    if (!data.value.key || !data.value.value) {
        useToast()({ message: "Key and Value is required." })
    } else {
        useWordList().push(data.value);
        useToast()({ message: "Added " + data.value.key })
        data.value = {
            key: '',
            value: '',
            ex: '',
            score: 0,
            correctCount: 0,
            type: WordType.NONE
        }
    }
}
</script>

<style scoped lang="scss">
.center {
    margin: auto;
    display: block
}
</style>