export interface DepositForm {
  channel: number;
  depositAccountId?: number;
}

export interface ExtractForm {
  amount: number; // 划转金额
  projectWalletId: number; // 项目钱包id
}

export interface WithdrawForm {
  channel: number;
  amount: number;
  withdrawAccountId: string | number;
}

export interface WithdrawAccountForm {
  id?: string | number,
  bankNumber: number,
  bankName: string,
  bankUserName: string,
  bankAddress?: string,
  swiftCode?: string,
  remark?: string;
}