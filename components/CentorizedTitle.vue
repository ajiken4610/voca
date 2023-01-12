<template lang="pug">
.title(:class="$tt('headline3')")
    slot
</template>

<style scoped lang="scss">
.title {
    text-align: center;
    margin-bottom: 1rem
}
</style>