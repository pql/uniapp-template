export interface ProductListForm {
  pageNum?: number;
  pageSize?: number;
  name?: string;
  country?: number; // 0 us  1 canada
  isTop?: number; // 0 不置顶  1 置顶
  isHot?: number; // 0 非热门  1 热门
}
