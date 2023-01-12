<template lang="pug">
div
    Head
        Title Words list
    CentorizedTitle Words
    div
        WordList(v-model:page="page")
</template>

<script setup lang="ts">
const page = useState<number>("wordListPage", () => 1)
watch(page, () => {
    history.pushState(history.state, "", `/list/${page.value}`)
}, { immediate: true })
</script>