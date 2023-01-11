<template lang="pug">
div
  UiTopAppBar(content-selector="#content-main" type="standard" title="Voca" @nav="openDrawer = true")
    template(#toolbar="{ toolbarItemClass }")
      UiIconButton(:class="toolbarItemClass" icon="share")
  UiDrawer(v-model="openDrawer" type="modal")
    UiDrawerHeader
      UiDrawerTitle Voca
    UiDrawerContent
      UiList
        NuxtLink(to="/")
          UiNavItem(href="javascript:void(0)" :active="$route.path === '/'")
            UiItemFirstContent
              UiIcon home
            UiItemTextContent Home
        NuxtLink(to="/list")
          UiNavItem(href="javascript:void(0)" :active="$route.path === '/list'")
            UiItemFirstContent
              UiIcon list
            UiItemTextContent WordList
        UiListDivider
  UiGrid#content-main
    UiGridCell(:columns="{desktop: 12,tablet: 8,phone: 4}")
      NuxtPage
</template>

<script setup lang="ts">
const openDrawer = ref(false)
watchEffect(() => {
  if (useRoute().fullPath) {
    openDrawer.value = false
  }
})
</script>

<style lang="scss">
* {
  margin: 0
}

a {
  text-decoration: none;
}
</style>