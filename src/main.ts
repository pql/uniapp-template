// #ifdef VUE3
import { createSSRApp } from "vue";
import App from "./App.vue";
import useI18n from "./locale/index";
import useAppPinia from "./store/index";
import useVkUView from "./vk-uview";

export const app = createSSRApp(App);
useI18n(app);
useAppPinia(app);
useVkUView(app);
export function createApp() {
  return {
    app,
  };
}
// #endif
