<template lang="pug">
div
  UiForm(itemMarginBottom="16", actionAlign="center")
    UiFormField
      UiTextfield(v-model="word.key", fullwidth) Key
    UiFormField
      UiTextfield(v-model="word.value", fullwidth) Value
    UiFormField
      UiSelect(v-model="word.type", :options="selectOptions", fullwidth) Type
    UiFormField
      UiTextfield(v-model="word.ex", fullwidth, inputType="textarea", rows="8") Example
    UiFormField
      UiCheckbox(v-model="word.hideHint", input-id="hide-hint")
      label(for="hide-hint") Hide hint
</template>

<script setup lang="ts">
import type { WordData } from "~~/composables/useWordList";

const props = defineProps<{ modelValue: WordData }>();
const word = toRef(props, "modelValue");
const emit = defineEmits<(e: "update:modelValue", val: WordData) => void>();
watchEffect(() => {
  emit("update:modelValue", word.value);
});

const selectOptions: { label: string; value: number }[] = [];
for (var i = 0; i < 11; i++) {
  selectOptions.push({ label: WordType[i], value: i });
}
</script>
