export interface ConfirmSignForm {
  channel: number;
  componentList: Array<any>;
  id: number;
  payBrokerFee: boolean;
  payLawyerFee: boolean;
  payManageFee: boolean;
}

export interface PlaceAnOrderBeforeConditionForm {
  channel: number;
  id: number;
  payBrokerFee: boolean;
  payLawyerFee: boolean;
  payManageFee: boolean;
}

export interface OrderPayForm {
  channel: number;
  id: string | number; // 订单id
}

export interface QueryListForm {
  orderNo: string;
}

export interface OrderFileForm {
  id: number; // 订单id
  type?: number; // 文件类型 1-投资文件 2-律师文件 3-中介文件
}

export interface ToDoListForm {
  orderId: number;
  operatorType?: string;
  pageNum?: number;
  pageSize?: number;
  status?: number; // 状态 0-未办理 1-已办理
}

export interface InfoListForm {
  orderId: number;
  operatorType?: string;
  pageNum?: number;
  pageSize?: number;
  productId?: number;
}

export interface PostInvestorOrderDataForm {
  id: number;
  investorForm: string;
}
