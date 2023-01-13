<template lang="pug">
.flexbox
    template(v-if="key")
        .flex-left {{ hint[key].desc }}
        UiSwitch.flex-right(v-model="settings[key]")
</template>

<script setup lang="ts">
const props = defineProps<{ settingKey: string }>()
const key = toRef(props, "settingKey")
const hint = useSettingsHint()
const settings = useSettings()
</script>

<style scoped lang="scss">
.flexbox {
    display: flex;
}

.flex-right {
    margin-left: auto;
}
</style>