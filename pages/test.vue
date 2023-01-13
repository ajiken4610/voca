<template lang="pug">
div
    template(v-if="list.length")
    CentorizedTitle(v-else) No item in word list.
</template>

<script setup lang="ts">
const list = useWordList()
</script>