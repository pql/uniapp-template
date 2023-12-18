export interface NewsListForm {
  pageNum?: number;
  pageSize?: number;
  title?: string;
  type?: number; // 0 原创  1 转载  2 直播  3  项目更新
}
