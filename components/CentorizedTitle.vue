<template lang="pug">
h3.centorized-title
  slot
</template>

<style scoped lang="scss">
.centorized-title {
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: 0.2rem;
  font-size: calc(1.5rem + 2.5vw);
}
</style>
