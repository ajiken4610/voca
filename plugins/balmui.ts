import BalmUI from "balm-ui";
import BalmUIPlus from "balm-ui/dist/balm-ui-plus";
import "balm-ui/dist/balm-ui.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(BalmUI);
  nuxtApp.vueApp.use(BalmUIPlus);
});
