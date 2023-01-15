<template lang="pug">
div
  UiTopAppBar(
    content-selector="#content-main",
    type="fixed",
    title="Voca",
    @nav="onTopAppBarButtonPushed",
    :navIcon="$route.meta.useBackButton ? 'arrow_back' : 'menu'"
  )
    template(#toolbar="{ toolbarItemClass }")
      NuxtLink(to="/settings")
        UiIconButton(:class="toolbarItemClass", icon="settings")
      UiIconButton(
        :class="toolbarItemClass",
        icon="share",
        @click="shareApp",
        v-if="shareButtonAvailable"
      )
  UiDrawer(v-model="openDrawer", type="modal")
    UiDrawerHeader
      UiDrawerTitle Voca
    UiDrawerContent
      UiList
        NuxtLink(to="/")
          UiNavItem(href="javascript:void(0)", :active="matchPath('/?')")
            UiItemFirstContent
              UiIcon home
            UiItemTextContent Home
        NuxtLink(to="/list/1")
          UiNavItem(href="javascript:void(0)", :active="matchPath('/list/.*')")
            UiItemFirstContent
              UiIcon list
            UiItemTextContent WordList
        NuxtLink(to="/add")
          UiNavItem(href="javascript:void(0)", :active="matchPath('/add/?')")
            UiItemFirstContent
              UiIcon add
            UiItemTextContent Add
        NuxtLink(to="/test")
          UiNavItem(href="javascript:void(0)", :active="matchPath('/test/?')")
            UiItemFirstContent
              UiIcon quiz
            UiItemTextContent Test
        UiListDivider
        NuxtLink(to="/settings")
          UiNavItem(
            href="javascript:void(0)",
            :active="matchPath('/settings/?')"
          )
            UiItemFirstContent
              UiIcon settings
            UiItemTextContent Settings
        UiListDivider
  UiGrid#content-main
    UiGridCell(:columns="{ desktop: 12, tablet: 8, phone: 4 }")
      NuxtPage
  Toast
  Confirm
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - YukiVocaLearn` : "YukiVocaLearn";
  },
});

const openDrawer = ref(false);
watchEffect(() => {
  if (useRoute().fullPath) {
    openDrawer.value = false;
  }
});

const onTopAppBarButtonPushed = () => {
  if (useRoute().meta.useBackButton) {
    useRouter().back();
  } else {
    openDrawer.value = true;
  }
};

const shareApp = () => {
  navigator.share({ title: "", text: "", url: "https://ykvocl.page.link/app" });
};
const shareButtonAvailable = computed(() => !!navigator.share);
const matchPath = (exp: string) => {
  return !!useRoute().path.match(new RegExp("^" + exp + "$"));
};
</script>

<style lang="scss">
* {
  margin: 0;
}

a {
  text-decoration: none;
}

#content-main {
  max-width: 1280px;
}
</style>
