import type { GoogleAction } from "../../../types/enum";

export interface MultAuthForm {
  emailCode?: string;
  googleCode?: string;
  phoneCode?: string;
}

export interface ModifyPasswordForm {
  oldPassword: string;
  newPassword: string;
}

export interface EnablePrivacyForm {
  status: number;
}

export interface UploadVerifyFileForm {
  fileList: Array<string>;
}

export interface UnBindEmailForm {
  code: string;
}

export interface BindEmailForm {
  code: string;
  newEmail: string;
}

export interface MultAuthPutForm {
  status: number;
  type: string;
}

export interface GoogleForm {
  action: GoogleAction;
  oldGoogleCode?: string;
}

export interface BindGoogleForm {
  gaToken: string;
  googleCode: string;
  emailCode: string;
  action: GoogleAction;
}

export interface UnbindGoogleForm {
  oldGoogleCode: string;
}

export interface CreateSealForm {
  holder: string;
  imgUrl: String;
}

export interface RevokeSealForm {
  id: number;
}

export interface BindPhoneForm {
  phone: string;
  phoneCode: string;
  phoneAreaCode: string;
}

export interface BindPhoneSendCodeForm {
  phone: string;
  phoneAreaCode: string;
}

export interface UnbindPhoneForm {
  phoneCode: string;
}

export interface WXLoginForm {
  phoneCode: string;
  loginCode: string;
}
