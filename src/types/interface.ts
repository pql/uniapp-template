import type { DeviceType, Locale, PageAnim } from "./enum";

export interface AppConfigState {
  projectName: string;
  locale: Locale;
  deviceType: DeviceType;
  pageAnim: PageAnim;
  actionBar: {
    isShowSearch: false;
    isShowLanguage: false;
  };
}