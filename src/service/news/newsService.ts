import http from "../http";
import type { NewsListForm } from "./model/newsModel";

export default function () {
  const newsDetail = (id: number | string) => {
    return http.get({
      url: "/common/news/" + id,
    });
  };
  const newsList = (data: NewsListForm) => {
    return http.get({
      url: "/common/news/list",
      data: data,
    });
  };
  return {
    newsDetail,
    newsList,
  };
}
