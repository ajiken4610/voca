<template lang="pug">
div
  Head
    Title Settings
  CentorizedTitle Settings
  UiList.wa(:type="2")
    template(to="/home", v-for="(_setting, key, index) in settings")
      UiItemDivider.m(v-if="index !== 0")
      UiItem
        UiItemTextContent.w-100(@click="$router.push(`/settings/${key}`)")
          UiItemText1 {{ hint[key].name }}
          UiItemText2 {{ hint[key].desc }}
        UiItemLastContent
          .border-left
            UiSwitch(v-model="settings[key]")
  UiDialog(
    v-model="showDescriptionDialog",
    fullscreen,
    @close="$route.path !== '/settings' && $router.back()"
  )
    UiDialogTitle {{ hint[descriptionKey]?.name || "Settings" }}
    UiDialogContent
      NuxtPage
      SettingDescription(:settingKey="descriptionKey")
    UiDialogActions
      UiButton(@click="showDescriptionDialog = false") Save and close
  .login-ui(ref="loginDiv")
  .align-center(v-if="isAuthReady&&auth?.currentUser")
    | Logged in as {{ auth.currentUser.displayName }}
    UiButton.ms(outlined @click="logout") Logout
</template>

<script setup lang="ts">
import { GoogleAuthProvider } from '@firebase/auth';

definePageMeta({ useBackButton: true });
const settings = useSettings();
const hint = useSettingsHint();

const showDescriptionDialog = ref(false);
let descriptionKey = ref("");
onMounted(() => {
  watchEffect(() => {
    const key = useRoute().params.settingItem?.toString();
    if (key) descriptionKey.value = key;
    showDescriptionDialog.value = !!key;
  });
});
const loginDiv = ref<HTMLDivElement>()
onMounted(() => {
  const authui = useAuthUI()
  authui.start(loginDiv.value!, { signInOptions: [GoogleAuthProvider.PROVIDER_ID], signInSuccessUrl: "/" })
})
const auth = useAuth()
const isAuthReady = useAuthIsReady()
const logout = () => {
  auth.signOut()
}
</script>

<style scoped lang="scss">
.wa {
  max-width: 480px;
  margin: auto;
}

.border-left {
  padding-left: 0.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}

.w-100 {
  width: 100%;
}

.align-center {
  text-align: center;
}

.ms {
  margin-left: 1rem;
}
</style>

<style lang="scss">
@use "firebaseui/dist/firebaseui.css";
</style>