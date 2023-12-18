import { Ref } from "vue";
import { $u } from "../vk-uview";
export const isEmailPassed = (email: Ref<string>) => {
  return (!$u.test.isEmpty(email) && $u.test.email(email)) as boolean;
};

export const isChineseNamePassed = (name: string) => {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{2,6}$/;
  return !$u.test.isEmpty(name) && reg.test(name);
};

export const isPhoneNumberPassed = (phone: string) => {
  const reg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  return !$u.test.isEmpty(phone) && reg.test(phone);
};
