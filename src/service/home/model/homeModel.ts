export interface NewsListForm {
  pageNum?: number;
  pageSize?: number;
  title?: string;
  type: number; // 1 转载 0 原创
}

export interface LiveListForm {
  pageNum?: number;
  pageSize?: number;
  title?: string;
}

export interface LiveRecordForm {
  liveId: number;
  phone: string;
  email: string;
  name?: string;
  memo?: string;
}

export interface GetLiveRecordForm {
  pageNum?: number;
  pageSize?: number;
}

export interface AppointWithConsultantForm {
  liveId: number;
  type: number; // 0是直播预约，1是获取回放,3获取资料 ，9其他
  name: string;
  phone: string;
  email?: string;
  source?: string; //	来源 如：official_home,official_project,wxapp_about
  memo?: string; // 在那个页面进来
}
