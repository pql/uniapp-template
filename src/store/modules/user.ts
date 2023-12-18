// 文档 https://github.com/Allen-1998/pinia-plugin-persist-uni
// 通过在你的 stroe 中配置 persist, 将会通过 uniAppStorage 来持久化存储你的数据.
// 请配置 id，用于持久化存储时的 key。

import { defineStore } from "pinia";
import useUserService from "../../service/user/userService";
import useTouristService from "../../service/tourist/touristService";
import useCommonService from "../../service/common/commonService";
import type {
  ForgetPasswordForm,
  LoginForm,
  ResetPasswordForm,
} from "../../service/base-model/form";
import type { Pagination } from "../../service/base-model/baseParams";
import type {
  ModifyPasswordForm,
  MultAuthForm,
  EnablePrivacyForm,
  MultAuthPutForm,
  WXLoginForm,
} from "../../service/user/model/userModel";
const userService = useUserService();
const touristService = useTouristService();
const commonService = useCommonService();
export const useUserStore = defineStore("storeUser", {
  state: () => {
    return {
      firstName: "",
      middleName: "",
      lastName: "",
      avatar: "",
      signAvatar: "",
      email: "",
      phone: "",
      privacyStatus: 0,
      twoFaStatus: 0, // 是否开启邮箱多重验证 0 未开启  1 开启
      twoFaGoogleStatus: 0, // 是否开启谷歌多重验证 0 未开启  1 开启
      twoFaPhoneStatus: 0, // 是否开启手机多重验证 0 未开启  1 开启
      registerType: 1, // 注册类型 1-邮箱注册 2-微信 3-apple 4-google
      investorNo: "",
      bindEmail: 0, // 是否绑定邮箱 0 未绑定 1 已经绑定
      bindGoogle: 0, // 是否绑定谷歌 0 未绑定 1 已绑定
      bindPhone: 0, // 是否绑定手机 0 未绑定 1 已绑定
      token: uni.getStorageSync("token") || "",
    };
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    setPhone(value: string) {
      this.phone = value;
    },
    setBindEmail(value: number) {
      this.bindEmail = value;
    },
    setBindGoogle(value: number) {
      this.bindGoogle = value;
    },
    setBindPhone(value: number) {
      this.bindPhone = value;
    },
    setToken(value: string) {
      this.token = value;
      uni.setStorageSync("token", value);
    },
    setAvatar(value: string) {
      this.avatar = value;
    },
    setSignAvatar(value: string) {
      this.signAvatar = value;
    },
    setFirstName(value: string) {
      this.firstName = value;
    },
    setMiddleName(value: string) {
      this.middleName = value;
    },
    setLastName(value: string) {
      this.lastName = value;
    },
    setEmail(value: string) {
      this.email = value;
    },
    setPrivacyStatus(value: number) {
      this.privacyStatus = value;
    },
    setTwoFaStatus(value: number) {
      this.twoFaStatus = value;
    },
    setTwoFaGoogleStatus(value: number) {
      this.twoFaGoogleStatus = value;
    },
    setTwoFaPhoneStatus(value: number) {
      this.twoFaPhoneStatus = value;
    },
    setRegisterType(value: number) {
      this.registerType = value;
    },
    setInvestorNo(value: string) {
      this.investorNo = value;
    },
    async getUserInfo() {
      const result = await userService.getUserInfo();
      const userinfo = result.data;
      if (userinfo) {
        this.setAvatar(userinfo.avatar);
        this.setSignAvatar(userinfo.signAvatar);
        this.setFirstName(userinfo.firstName);
        this.setMiddleName(userinfo.middleName);
        this.setLastName(userinfo.lastName);
        this.setEmail(userinfo.email);
        this.setPrivacyStatus(userinfo.privacyStatus);
        this.setTwoFaStatus(userinfo.twoFaStatus);
        this.setTwoFaGoogleStatus(userinfo.twoFaGoogleStatus);
        this.setTwoFaPhoneStatus(userinfo.twoFaPhoneStatus);
        this.setRegisterType(userinfo.registerType);
        this.setInvestorNo(userinfo.investorNo);
        this.setBindEmail(userinfo.bindEmail);
        this.setBindGoogle(userinfo.bindGoogle);
        this.setBindPhone(userinfo.bindPhone);
        this.setPhone(userinfo.phone);
      }
      return userinfo;
    },
    async updateUserInfo(params: any) {
      const result = await userService.updateUserInfo(params);
      const data = result.data;
      return data;
    },
    async login() {},
    async touristLogin(params: LoginForm) {
      const result = await touristService.login(params);
      const data = result.data;
      const token = result.data.token;
      if (token) {
        this.setToken(token);
      }
      return data;
    },
    async forgetPassword(data: ForgetPasswordForm) {
      await commonService.forgetPassword(data);
    },
    async resetPassword(data: ResetPasswordForm) {
      await commonService.resetPassword(data);
    },
    async identity() {
      const result = await userService.identity();
      const data = result.data;
      return data;
    },
    async walletInfo() {
      const result = await userService.walletInfo();
      const data = result.data;
      return data;
    },
    async getCollectionList(params: Pagination) {
      const result = await userService.getCollectionList(params);
      const data = result.data;
      return data;
    },
    async deleteCollection(collectionNo: string | number) {
      await userService.deleteCollection(collectionNo);
    },
    async getLawyerList(status: number) {
      const result = await userService.getLawyerList(status);
      const data = result.data;
      return data;
    },
    async getBrokerList(status: number) {
      const result = await userService.getBrokerList(status);
      const data = result.data;
      return data;
    },
    async multiAuth(params: MultAuthForm) {
      const result = await userService.multAuth(params);
      const data = result.data;
      return data;
    },
    async multiAuthPut(params: MultAuthPutForm) {
      const result = await userService.multAuthPut(params);
      const data = result.data;
      return data;
    },
    async modifyPassword(params: ModifyPasswordForm) {
      const result = await userService.modifyPassword(params);
      const data = result.data;
      // 重置密码后，需要重新登陆，清空token
      this.token = "";
      uni.setStorageSync("token", "");
      return data;
    },
    async enablePrivacy(params: EnablePrivacyForm) {
      const result = await userService.enablePrivacy(params);
      const data = result.data;
      return data;
    },
    async wxlogin(params: WXLoginForm) {
      const result = await userService.wxlogin(params);
      const data = result.data;
      return data;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
      },
    ],
  },
});

export default useUserStore;
