<template lang="pug">
div
    Head
        Title Words list
    CentorizedTitle Words
    div
        WordList(v-model:page="page")
</template>

<script setup lang="ts">
const page = ref(parseInt(useRoute().params.pageIndex.toString()))
watch(page, () => {
    history.replaceState(null, "", `/list/${page.value}`)
})
</script>