import { getLocale } from "../locale";
import { DeviceType, PageAnim } from "../types/enum";
import type { AppConfigState } from "../types/interface";

export default {
    locale: getLocale(),
    deviceType: DeviceType.PHONE,
    pageAnim: PageAnim.OPACITY,
    actionBar: {
        isShowSearch: false,
        isShowLanguage: false,
    }
} as AppConfigState