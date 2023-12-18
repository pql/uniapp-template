import http from "../http";

import type {
  NewsListForm,
  LiveListForm,
  LiveRecordForm,
  GetLiveRecordForm,
  AppointWithConsultantForm
} from "./model/homeModel";

export default function () {
  const bannerList = () => {
    return http.get({
      url: "/common/banner/list",
    });
  };
  const newsList = (data: NewsListForm) => {
    return http.get({
      url: "/common/news/list",
      data: data,
    });
  };
  const liveList = (data: LiveListForm) => {
    return http.get({
      url: "/common/live/list",
      data: data,
    });
  };
  const appointWithConsultant = (data: AppointWithConsultantForm) => {
    return http.post({
      url: "/publish/live/record",
      data: data,
    });
  };
  const getLiveRecord = (data: GetLiveRecordForm) => {
    return http.get({
      url: "/publish/live/record",
      data: data,
    });
  };
  const liveRecord = (data: LiveRecordForm) => {
    return http.post({
      url: "/publish/live/record",
      data: data,
    });
  };
  return {
    bannerList,
    newsList,
    liveList,
    liveRecord,
    appointWithConsultant,
    getLiveRecord,
  };
}
