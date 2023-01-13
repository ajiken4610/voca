<template lang="pug">
UiSnackbar(v-model="isToastShowing" :message="toastMessage")
</template>

<script setup lang="ts">
const isToastShowing = useIsToastShowing()
const toastMessage = useToastMessage()
</script>