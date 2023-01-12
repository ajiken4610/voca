<template lang="pug">
div
    CentorizedTitle Add word
    UiForm(type="|" itemMarginBottom="16" actionAlign="center")
        UiFormField
            UiTextfield(v-model="word.key" fullwidth) Key 
        UiFormField
            UiTextfield(v-model="word.value" fullwidth) Value
        UiFormField
            UiTextfield(v-model="word.ex" fullwidth inputType="textarea" rows="8") Example (use [] for hiding the word)

</template>

<script setup lang="ts">
import type { WordData } from '~~/composables/useWordList';

const props = defineProps<{ modelValue: WordData }>()
const word = props.modelValue
const emit = defineEmits<(e: "update:modelValue", val: WordData) => void>()
watchEffect(() => {
    emit("update:modelValue", word)
})
</script>