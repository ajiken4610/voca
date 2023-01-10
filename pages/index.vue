<template lang="pug">
.container.my-4
    input.form-control(v-model="a")
    input.form-control(v-model="b")
    span {{ r}}
</template>

<script setup lang="ts">
const a = ref("hello")
const b = ref("hallo")
const r = ref(0)
watchEffect(() => {
    r.value = calculateDistanceBetweenSentence(a.value, b.value)
})
</script>