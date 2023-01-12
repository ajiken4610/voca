<template lang="pug">
div
  UiTopAppBar(
    content-selector="#content-main",
    type="fixed",
    title="Voca",
    @nav="openDrawer = true"
  )
    template(#toolbar="{ toolbarItemClass }")
      UiIconButton(:class="toolbarItemClass", icon="share" @click="shareApp" v-if="shareButtonAvailable")
  UiDrawer(v-model="openDrawer", type="modal")
    UiDrawerHeader
      UiDrawerTitle Voca
    UiDrawerContent
      UiList
        NuxtLink(to="/")
          UiNavItem(href="javascript:void(0)", :active="$route.path === '/'")
            UiItemFirstContent
              UiIcon home
            UiItemTextContent Home
        NuxtLink(to="/list/1")
          UiNavItem(
            href="javascript:void(0)",
            :active="!!$route.path.match(listMatcher)"
          )
            UiItemFirstContent
              UiIcon list
            UiItemTextContent WordList
        UiListDivider
  UiGrid#content-main
    UiGridCell(:columns="{ desktop: 12, tablet: 8, phone: 4 }")
      NuxtPage
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - YukiVocaLearn` : 'YukiVocaLearn';
  }
})

const openDrawer = ref(false);
watchEffect(() => {
  if (useRoute().fullPath) {
    openDrawer.value = false;
  }
});

const shareApp = () => {
  navigator.share({ title: "", text: "", url: "https://ykvocl.web.app" })
}
const shareButtonAvailable = computed(() => !!navigator.share)
const listMatcher = /\/list\/.*/
</script>

<style lang="scss">
* {
  margin: 0;
}

a {
  text-decoration: none;
}
</style>
