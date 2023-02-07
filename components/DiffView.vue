<template lang="pug">
div
  template(v-for="ses of result.ses" v-if="result")
    del.delete(v-if="ses.t===Operation.DELETE") {{ses.e}}
    span.add(v-else-if="ses.t===Operation.ADD") {{ ses.e }}
    span.common(v-else) {{ ses.e }}
</template>

<script setup lang="ts">
const props = defineProps<{ src: string, dst: string }>()
const result = ref((props.src && props.dst && calDiffInfo(props.src, props.dst)) || null)
watch(props, () => {
  result.value = (props.src && props.dst && calDiffInfo(props.src, props.dst)) || null
})
</script>
<style scoped lang="scss">
.add {
  background-color: rgba(0, 255, 26, 0.5);
  border-radius: 5px;
}

.delete {
  background-color: rgba(255, 0, 128, 0.5);
  border-radius: 5px;
}
</style>