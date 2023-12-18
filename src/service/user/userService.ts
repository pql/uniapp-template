import http from "../http";
import type { LoginForm } from "../base-model/form";
import type { Pagination } from "../base-model/baseParams";
import type {
  MultAuthForm,
  ModifyPasswordForm,
  EnablePrivacyForm,
  UploadVerifyFileForm,
  UnBindEmailForm,
  MultAuthPutForm,
  BindEmailForm,
  GoogleForm,
  BindGoogleForm,
  UnbindGoogleForm,
  CreateSealForm,
  RevokeSealForm,
  BindPhoneForm,
  BindPhoneSendCodeForm,
  UnbindPhoneForm,
  WXLoginForm
} from "./model/userModel";

export default function () {
  const login = (data: LoginForm) => {
    return http.post({
      url: "/login",
      data: data,
    });
  };
  const wxlogin = (data: WXLoginForm) => {
    return http.post({
      url: "/investor/wxapp/login",
      data: data
    })
  }
  const logout = () => {
    return http.post({
      url: "/logout",
    });
  };
  const getUserInfo = () => {
    return http.get({
      url: "/investor/profile/detail",
    });
  };
  const updateUserInfo = (data: any) => {
    return http.post({
      url: "/investor/profile/modify",
      data: data,
    });
  };
  const confirmRegSOrRegDIdentity = (type: number) => {
    return http.post({
      url: "/investor/chooseIdentity",
      data: { type: type },
    });
  };
  const identity = () => {
    return http.post({
      url: "/investor/identity",
    });
  };
  const walletInfo = () => {
    return http.get({
      url: "/publish/wallet/info",
    });
  };
  const getCollectionList = (data: Pagination) => {
    return http.get({
      url: "/investor/collection/list",
      data: data,
    });
  };
  const deleteCollection = (collectionNo: string | number) => {
    return http.delete({
      url: "/investor/collection/" + collectionNo,
    });
  };
  const getLawyerList = (status: number) => {
    return http.get({
      url: "/investor/lawyer/list",
      data: { status: status },
    });
  };
  const getBrokerList = (status: number) => {
    return http.get({
      url: "/investor/broker/list",
      data: { status: status },
    });
  };
  const multAuthEmailCode = () => {
    // 获取多重验证邮箱验证码
    return http.get({
      url: "/investor/multi/auth/email/code",
    });
  };
  const multAuthGoogleCode = () => {
    return http.post({
      url: "/publish/bind/google/email/code",
    });
  };
  const multAuthPhoneCode = () => {
    return http.get({
      url: "/investor/multi/auth/phone/code",
    });
  };
  const multAuth = (data: MultAuthForm) => {
    return http.post({
      url: "/investor/multi/auth",
      data: data,
    });
  };
  const multAuthPut = (data: MultAuthPutForm) => {
    return http.put({
      url: "/investor/multi/auth",
      data: data,
    });
  };
  const modifyPassword = (data: ModifyPasswordForm) => {
    return http.post({
      url: "/investor/modifyPassword",
      data: data,
    });
  };
  const enablePrivacy = (data: EnablePrivacyForm) => {
    return http.put({
      url: "/investor/privacy",
      data: data,
    });
  };
  const uploadVerifyFile = (data: UploadVerifyFileForm) => {
    return http.post({
      url: "/investor/uploadVerifyFile",
      data: data,
    });
  };
  const unbindEmail = (data: UnBindEmailForm) => {
    //解绑邮箱,需先关闭2FA  investor/unbindEmail
    return http.post({
      url: "/investor/unbindEmail",
      data: data,
    });
  };
  const bindEmail = (data: BindEmailForm) => {
    return http.post({
      url: "/investor/bindEmail",
      data: data,
    });
  };
  const google = (data: GoogleForm) => {
    return http.get({
      url: "/publish/google",
      data: data,
    });
  };
  const bindGoogle = (data: BindGoogleForm) => {
    return http.post({
      url: "/publish/bind/google",
      data: data,
    });
  };
  const unBindGoogle = (data: UnbindGoogleForm) => {
    return http.post({
      url: "/publish/unbind/google",
      data: data,
    });
  };
  const getSealList = () => {
    return http.get({
      url: "/investor/seal/list",
    });
  };
  const createSeal = (data: CreateSealForm) => {
    return http.post({
      url: "/investor/seal/create",
      data: data,
    });
  };
  const revokeSeal = (params: RevokeSealForm) => {
    return http.post({
      url: "/investor/seal/record/withdraw",
      data: params,
    });
  };
  const getPhoneCodeList = () => {
    return http.get({
      url: "/common/phone/code/list",
    });
  };
  const bindPhoneSendCode = (params: BindPhoneSendCodeForm) => {
    return http.post({
      url: "/publish/bind/phone/code",
      data: params,
    });
  };
  const unbindPhoneSendCode = () => {
    return http.post({
      url: "/publish/unbind/phone/code",
    });
  };
  const bindPhone = (params: BindPhoneForm) => {
    return http.post({
      url: "/publish/bind/phone",
      data: params,
    });
  };
  const unbindPhone = (params: UnbindPhoneForm) => {
    return http.post({
      url: "/publish/unbind/phone",
      data: params,
    });
  };
  return {
    login,
    logout,
    getUserInfo,
    updateUserInfo,
    confirmRegSOrRegDIdentity,
    identity,
    walletInfo,
    getCollectionList,
    deleteCollection,
    getLawyerList,
    getBrokerList,
    multAuthEmailCode,
    multAuthPhoneCode,
    multAuth,
    multAuthPut,
    modifyPassword,
    enablePrivacy,
    uploadVerifyFile,
    unbindEmail,
    bindEmail,
    google,
    bindGoogle,
    multAuthGoogleCode,
    unBindGoogle,
    getSealList,
    createSeal,
    revokeSeal,
    getPhoneCodeList,
    bindPhone,
    bindPhoneSendCode,
    unbindPhoneSendCode,
    unbindPhone,
    wxlogin,
  };
}
