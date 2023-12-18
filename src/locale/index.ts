import type { App } from "vue";
import { createI18n } from "vue-i18n";
import type { Locale } from "../types/enum";
import en from "./en";
import zhHans from "./zh-Hans";

let i18nConfig = {
  // locale: uni.getLocale(),
  locale: "zh-Hans",
  messages: {
    en,
    "zh-Hans": zhHans,
  },
};

export const i18n = createI18n(i18nConfig);
function useI18n(app: App) {
  app.use(i18n);
}

export const t = i18n.global.t;

export function getLocale(): string {
  return uni.getLocale();
}

export function onLocaleChange(locale: Locale) {
  const systemInfo = uni.getSystemInfoSync();
  const isAndroid = systemInfo.platform.toLowerCase() === "android";
  if (isAndroid) {
    uni.showModal({
      content: t("common.language-change-confirm"),
      success: (res) => {
        if (res.confirm) {
          setLocale(locale);
        }
      },
    });
  } else {
    i18n.global.locale = locale;
    setLocale(locale);
  }
}

export function setLocale(locale: string) {
  uni.setLocale(locale);
}

export default useI18n;
