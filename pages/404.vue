<template lang="pug">
div
    div(:class="$tt('headline1')") 404 Not found
    div(:class="$tt('headline6')") {{ path }} : not exist or deleted
</template>

<script setup lang="ts">
const path = useRoute().query.path || useRoute().fullPath
</script>