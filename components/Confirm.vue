<template lang="pug">
UiDialog(v-model="isConfirmShowing" @confirm="useConfirmResult().value = $event")
    UiDialogTitle(v-if="confirmTitle") {{ confirmTitle }}
    UiDialogContent {{ confirmMessage }}
    UiDialogActions
</template>

<script setup lang="ts">
const isConfirmShowing = useIsConfirmShowing()
const confirmMessage = useConfirmMessage()
const confirmTitle = useConfirmTitle()
</script>