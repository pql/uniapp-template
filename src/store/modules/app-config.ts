// 文档 https://github.com/Allen-1998/pinia-plugin-persist-uni

import { defineStore } from "pinia";
import type { Locale, PageAnim } from "../../types/enum";
import defaultSettings from "../../setting";

export const useAppConfigStore = defineStore("storeAppConfig", {
  state: () => {
    return defaultSettings;
  },
  getters: {
    getLocale(state) {
      return state.locale;
    },
    getDeviceType(state) {
      return state.deviceType;
    },
  },
  actions: {
    changeLocale(locale: Locale) {
      this.locale = locale;
    },
    changePageAnim(pageAnim: PageAnim) {
      this.pageAnim = pageAnim;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "app-config",
      },
    ],
  },
});

export default useAppConfigStore;
