export const systemInfo = uni.getSystemInfoSync();

export const isAndroid: boolean = systemInfo.platform.toLowerCase() === "android";

export const isIOS: boolean = systemInfo.platform.toLowerCase() === "ios";

export const isMpWeixin: boolean = systemInfo.uniPlatform.toLowerCase() === "uniPlatform";

export const isApp: boolean = systemInfo.uniPlatform.toLowerCase() === "app";

export const isWeb: boolean = systemInfo.uniPlatform.toLowerCase() === "web";

export const deviceType = systemInfo.deviceType;
