export enum DeviceType {
  PC = "pc",
  PAD = "pad",
  PHONE = "phone",
}

export enum PageAnim {
  FADE = "fade",
  OPACITY = "opacity",
  DOWN = "down",
  SCALE = "scale",
}

export type Locale = "en" | "zh-Hans";

export enum InvestorIdentityType {
  RegS = 1,
  RegD = 2,
  UNSELECTED = 3,
}

export enum RegDVerifyStatus {
  CHECKPENGDING = 0, // 待审核
  REJECTED = 1, // 已驳回
  PASSED = 2, // 已通过
  TOBESBUMITTED = 3, // 待提交
}

export enum UserOperatorType {
  INVESTOR = "INVESTOR",
}

export enum GenderType {
  MALE = 1, // 男
  FEMALE = 0, // 女
  UNKNOW = 2, // 未知
}

export enum MultiAuthType {
  EMAIL = "email",
  PHONE = "phone",
  GOOGLE = "google",
}

export enum GoogleAction {
  INIT = "init",
  RESET = "reset",
}

// 项目状态 1-即将开始 2-申购中 3-已过户 4-暂停 5-终止
export enum ProjectStatus {
  ABOUNT_TO_BEGIN = 1,
  APPLICATION_FOR_PURCHASE = 2,
  TRANSFER_OF_ACCOUNT = 3,
  PAUSE = 4,
  BREAK_UP = 5,
}
