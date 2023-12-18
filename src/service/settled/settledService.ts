import http from "../http";
import type { QueryListParams } from "./model/settledModel";

export default function () {
  const queryList = (data: QueryListParams) => {
    return http.get({
      url: "/common/product/list",
      data: data,
    });
  };
  return {
    queryList,
  };
}
