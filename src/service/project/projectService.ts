import http from "../http";
import type { ProductListForm } from "./model/projectModel";

export default function () {
  const productList = (data: ProductListForm) => {
    return http.get({
      url: "/common/product/list",
      data: data,
    });
  };
  return {
    productList,
  };
}
