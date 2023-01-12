import BalmUI from "balm-ui";
import BalmUIPlus from "balm-ui/dist/balm-ui-plus";
import "balm-ui/dist/balm-ui.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(BalmUI, { $theme: { primary: "#0088cc" } });
  nuxtApp.vueApp.use(BalmUIPlus);
});
