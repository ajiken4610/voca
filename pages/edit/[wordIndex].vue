<template lang="pug">
div
    CentorizedTitle Edit word
    UiGrid(align="middle")
        UiGridCell
        UiGridCell
            UiForm(type="|" itemMarginBottom="16" actionAlign="center")
                UiFormField
                    UiTextfield(v-model="word.key" fullwidth) Key 
                UiFormField
                    UiTextfield(v-model="word.value" fullwidth) Value
                UiFormField
                    UiTextfield(v-model="word.ex" fullwidth inputType="textarea" rows="8") Example (use [] for hiding the word)
            UiButton(raised @click="$router.back()") Save and return
        UiGridCell
    
</template>

<script setup lang="ts">
const wordIndex = parseInt(useRoute().params.wordIndex.toString());
const list = useWordList();
const word = list[wordIndex];
if (!word) {
    goTo404();
}
</script>
